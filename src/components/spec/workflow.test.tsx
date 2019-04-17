import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import Workflow from "../Workflow";

configure({ adapter: new Adapter() });

describe("Workflow Spec", () => {
    let workflow: any;
    let props;

    beforeEach(() => {
        props = {
            workflowUid: ""
        };

        // workflow = shallow(<Workflow {...props} />);
    });

    describe("render", () => {
        it("should do something", () => {
            expect(1).toBe(1);
        });
    });
});
