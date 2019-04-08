/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import './styles/workflowVis.css';

// Components
import WorkflowVis from "./WorkflowVis";

// Types
import { WorkflowStepT } from "../types/workflow";

// Utils
import { generateWorkflowVisData, populateMatrix } from "../utils/workflowVisUtils";

const WorkflowVisContainer = (
    { workflowUid, workflowSteps, editMode }: {
        workflowUid: string; workflowSteps: WorkflowStepT[]; editMode: boolean;
    }
) => {
    const { workflowVisData, initMatrix } = generateWorkflowVisData(workflowSteps, workflowUid);

    console.log("workflowVisData", workflowVisData, null, 2);
    // console.log("workflowVisData", JSON.stringify(workflowVisData, null, 2))
    console.log("initMatrix", initMatrix);

    let matrix = populateMatrix({ workflowVisData, initMatrix });
    console.log("matrix", matrix);

    // pass matrix cols (array length) and height (inner array length) to workflowVis
    // matrix cols is based on the largest workflowStepOrder seen
    // matrix rows is based on the greatest number of occurrences of a workflowStepOrder

    return <WorkflowVis matrix={matrix} workflowVisData={workflowVisData} editMode={editMode} />;
};

export default WorkflowVisContainer;