/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Components
import WorkflowVis from "./WorkflowVis";

// Types
import { WorkflowStepT } from "../types/workflow";

// Utils
import { createWorkflowVisData, populateMatrix } from "../utils/workflowVisUtils";

const WorkflowVisContainer = (
    { workflowUid, workflowSteps, editMode }: {
        workflowUid: string; workflowSteps: WorkflowStepT[]; editMode: boolean;
    }
) => {
    const { workflowVisData, initialMatrix } = createWorkflowVisData({ workflowSteps, workflowUid });

    console.log("workflowVisData", workflowVisData);
    // console.log("workflowVisData", JSON.stringify(workflowVisData, null, 2))
    console.log("initMatrix", initialMatrix);

    let matrix = populateMatrix({ workflowVisData, initialMatrix });
    console.log("matrix", matrix);

    // pass matrix cols (array length) and height (inner array length) to workflowVis
    // matrix cols is based on the largest workflowStepOrder seen
    // matrix rows is based on the greatest number of occurrences of a workflowStepOrder

    return <WorkflowVis matrix={matrix} workflowVisData={workflowVisData} editMode={editMode} />;
};

export default WorkflowVisContainer;