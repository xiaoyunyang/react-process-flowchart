import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import WorkflowContainer from "../WorkflowContainer";

configure({ adapter: new Adapter() });

describe("WorkflowContainer Spec", () => {
    let workflowContainer: any;
    let props;

    beforeEach(() => {
        props = {
            workflowUid: ""
        };

        // workflowContainer = shallow(<WorkflowContainer {...props} />);
    });

    describe("render", () => {
        it("should do something", () => {
            expect(1).toBe(1);
        });
    });
});
