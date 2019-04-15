import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import Connector, { connectors, connectorComponent } from "../Connector";

configure({ adapter: new Adapter() });

describe("Connector Spec", () => {
    let connector: any;
    let props;

    beforeEach(() => {
        props = { id: "diamond|empty" };

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
