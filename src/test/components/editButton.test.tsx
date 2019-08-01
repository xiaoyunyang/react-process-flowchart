import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import EditButton from "../../lib/components/EditButton";

import { createAddNodeParams, encodedWorkflowStepType, AddWorkflowStepIcon } from "../../config";

configure({ adapter: new Adapter() });

const mockWorkflowStepNode = {
    id: "123",
    workflowUid: "JjY1Zwp5i8Royl0ojwk",
    name: "lWveC",
    type: encodedWorkflowStepType[0],
    workflowStepOrder: 2,
    nextNodes: [{ id: "456", primary: false }],
    prevSteps: []
};

describe("EditButton Spec", () => {
    const createAddChildNodeCommand = createAddNodeParams({
        workflowStepNodes: {
            123: { ...mockWorkflowStepNode, nextNodes: [{ id: "456", primary: false }] },
            456: { ...mockWorkflowStepNode, nextNodes: [{ id: "789", primary: false }] }
        },
        coordToNodeId: { "0,0": "123", "2,0": "456" },
        nodeIdToParentNodeIds: {},
        updatePlusBtnClickParams: () => { }
    })({ parentCoord: "0,0", ownCoord: "1,0" });

    let editButton: any;
    let props: any;
    let createAddChildNodeCommandSpy: any;
    
    beforeEach(() => {
        props = {
            createAddChildNodeCommand
        };
        editButton = shallow(<EditButton {...props} />);
        createAddChildNodeCommandSpy = jest.spyOn(EditButton.prototype, "addNodeWithLocation");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("It should render icon for adding a workflow step", () => {
        const plusIcon = editButton.find(AddWorkflowStepIcon);
        expect(plusIcon).toHaveLength(1);
    });

    test("It should call addNode with the right event params applied if EditButton is clicked", () => {
        editButton = shallow(<EditButton {...props} />);
        const event = {
            currentTarget: {
                getBoundingClientRect: () => { return { left: 2, top: 4 }; }
            }
        };

        editButton.simulate("click", event);
        expect(createAddChildNodeCommandSpy).toHaveBeenCalledTimes(1);

        const mock = {
            addChildNodeMock: createAddChildNodeCommand,
            isEmptyBranch: false,
        };
        expect(
            createAddChildNodeCommandSpy(event, mock)
        ).toEqual(
            createAddChildNodeCommand({ left: 2, top: 4, isEmptyBranch: false })
        );
    });
});
