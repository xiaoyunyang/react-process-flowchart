import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import EditButton from "../EditButton";
import { createAddNodeParams } from "../WorkflowVisContainer";

// Type
import { WorkflowStepTypeT } from "../../types/workflow";

configure({ adapter: new Adapter() });

const mockWorkflowStepNode = {
    id: "123",
    workflowUid: "JjY1Zwp5i8Royl0ojwk",
    name: "lWveC",
    type: WorkflowStepTypeT.ADMIN_APPROVAL,
    workflowStepOrder: 2,
    nextSteps: ["456"],
    prevSteps: []
};

describe("EditButton Spec", () => {
    const createAddChildNodeCommand = createAddNodeParams({
        workflowStepNodes: {
            123: { ...mockWorkflowStepNode, nextSteps: ["456"] },
            456: { ...mockWorkflowStepNode, nextSteps: ["789"] }
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
