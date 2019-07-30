import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import WorkflowVisContainer from "../lib/WorkflowVisContainer";
import WorkflowVis from "../lib/components/WorkflowVis";

import { createAddNodeParams } from "../config";

// Mock
import { BA } from "../mocks/mockWorkflowsData";

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
        it("should render two workflowVis layers with the right addNodeToVis prop", () => {
            // NOTE: We are not testing the other props like workflowVisData
            // and matrix because those are already covered by the test for
            // populateMatrix and createWorkflowVisData
            const workflowVis = workflowVisContainer.find(WorkflowVis);
            expect(workflowVis).toHaveLength(2);
            const coordToNodeId = {
                "2,0": "ba322565b1bf",
                "4,0": "09e6110fda58",
                "4,1": "b2b5c4c7cfd7",
                "6,0": "297786162f15",
                "8,0": "492b709fc90a",
                "10,0": "a3135bdf3aa3"
            };
            const addNodeToVis = createAddNodeParams({
                coordToNodeId,
                workflowStepNodes: {},
                nodeIdToParentNodeIds: {},
                updatePlusBtnClickParams: () => { }
            });
            expect(workflowVis.at(0).prop("addNodeParams").toString()).toBe(addNodeToVis.toString());
        });
    });
});
