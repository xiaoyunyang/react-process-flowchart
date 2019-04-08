import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import Connector, { connectors, connectorComponent } from "../Connector";

// Types
import { WorkflowStepTypeT } from "../../types/workflow";
import { ConnectorTypeT } from "../../types/workflowVis";

configure({ adapter: new Adapter() });

describe("Column Spec", () => {
    let connector: any;
    let id = "diamond.empty";

    let props;

    beforeEach(() => {
        props = { id };

        connector = shallow(<Connector {...props} />);
    });

    describe("render", () => {
        test.each(
            Object.keys(connectors)
        )("renders correct connector for id = %s", id => {
            connector.setProps({ id });
            const { containerName, name } = connectors[id];
            expect(connector.hasClass(containerName)).toBe(true);
            expect(connector.contains(connectorComponent[name])).toBe(true);
        });
    });
});
