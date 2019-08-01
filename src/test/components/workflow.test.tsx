import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import Workflow from "../../lib/components/Workflow";

configure({ adapter: new Adapter() });

// TODO: Create test files for workflowStep
// It should support two modes for messages - one that includes intl and one that does not
// Both cases need to be tested.

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
