import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import Connector, { connectors, connectorComponent, EditButton } from "../Connector";
import { addNode } from "../WorkflowVisContainer";

configure({ adapter: new Adapter() });

describe("Connector Spec", () => {
    let connector: any;
    const addChildNode = addNode({ "123": "0,0" })("0,0");
    let props;

    beforeEach(() => {
        props = {
            id: "diamond|empty",
            addChildNode
        };

        connector = shallow(<Connector {...props} />);
    });

    describe("render", () => {
        test.each(
            Object.keys(connectors)
        )("renders correct connector for id = %s", id => {
            connector.setProps({ id });
            const { containerName, name } = connectors[id];
            expect(connector.hasClass(containerName)).toBe(true);
            expect(connector.contains(connectorComponent(addChildNode)[name])).toBe(true);
        });
    });

    describe("EditButton Spec", () => {
        const addChildNode = addNode({ "123": "0,0" })("0,0");
        let addChildNodeSpy: any;
        beforeEach(() => {
            addChildNodeSpy = jest.spyOn(EditButton.prototype, "addNodeWithLocation");
            // editButton.update();
        });
        afterEach(() => {
            jest.restoreAllMocks();
        });
        it("should call addNode with the right event params applied if EditButton is clicked", () => {
            const editButton = shallow(<EditButton addChildNode={addChildNode} />);

            const event = {
                currentTarget: {
                    getBoundingClientRect: () => { return { left: 2, top: 4 }; }
                }
            };

            editButton.simulate("click", event);

            expect(addChildNodeSpy).toHaveBeenCalledTimes(1);

            expect(
                addChildNodeSpy(event, addChildNode)
            ).toEqual(
                addChildNode({ left: 2, top: 4 })
            );
        });
    });
});
