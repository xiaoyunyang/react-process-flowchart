import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import WorkflowVisContainer, { addNode } from "../WorkflowVisContainer";
import WorkflowVis from "../WorkflowVis";

// Mock
import { BA } from "./mockWorkflowsData";

configure({ adapter: new Adapter() });

describe("WorkflowVisContainer Spec", () => {
    let workflowVisContainer: any;
    let props;
    const workflow = BA;
    const { workflowUid, workflowSteps } = workflow;

    beforeEach(() => {
        props = {
            workflowUid,
            workflowSteps,
            editMode: true
        };

        workflowVisContainer = shallow(<WorkflowVisContainer {...props} />);
    });

    describe("render", () => {
        it("should render workflowVis with the right addNodeToVis prop", () => {
            // NOTE: We are not testing the other props like workflowVisData
            // and matrix because those are already covered by the test for
            // populateMatrix and createWorkflowVisData
            const workflowVis = workflowVisContainer.find(WorkflowVis);
            expect(workflowVis).toHaveLength(1);
            const coordToNodeId = {
                "2,0": "ba322565b1bf",
                "4,0": "09e6110fda58",
                "4,1": "b2b5c4c7cfd7",
                "6,0": "297786162f15",
                "8,0": "492b709fc90a",
                "10,0": "a3135bdf3aa3"
            };
            const addNodeToVis = addNode(coordToNodeId);
            expect(workflowVis.prop("addNodeToVis").toString()).toBe(addNodeToVis.toString());
        });
    });
});
