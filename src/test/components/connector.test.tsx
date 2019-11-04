import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import Connector, { connectors, connectorComponent } from "../../lib/components/Connector";
import { createAddNodeParams } from "../../config";

configure({ adapter: new Adapter() });

describe("Connector Spec", () => {
    const coordToNodeId = { "0,0": "123" };
    const createAddChildNodeCommand = createAddNodeParams({
        coordToNodeId,
        workflowStepNodes: {},
        nodeIdToParentNodeIds: {},
        updatePlusBtnClickParams: () => { }
    })({ parentCoord: "0,0", ownCoord: "1,0" });

    let connector: any;
    let props;

    beforeEach(() => {
        props = {
            id: "diamond|empty",
            createAddChildNodeCommand
        };

        connector = shallow(<Connector {...props} />);
    });

    describe("render", () => {
        test.each(
            Object.keys(connectors)
        )("renders correct connector for id = %s", (id) => {
            connector.setProps({ id });
            const { containerName, name } = connectors[id];
            expect(connector.hasClass(containerName)).toBe(true);
            expect(connector.contains(
                connectorComponent(createAddChildNodeCommand)[name]
            )).toBe(true);
        });
    });
});
