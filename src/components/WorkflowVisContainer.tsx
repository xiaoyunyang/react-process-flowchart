/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Components
import WorkflowVis from "./WorkflowVis";

// Types
import { WorkflowStepT } from "../types/workflow";
import { AddNode } from "../types/workflowVisTypes";
import { EndomorphDict } from '../types/generic';

// Utils
import { createWorkflowVisData, populateMatrix, invertKeyVal } from "../utils/workflowVisUtils";

export const addNode: AddNode = (coordToNodeId: EndomorphDict) =>
    (parentCoord: string | undefined) =>
        ({ left, top }: { left: number; top: number }): void => {
            if (parentCoord) {
                console.log(`add child node to parentNodeId=${coordToNodeId[parentCoord]}. Draw popover modal at left=${left}, top=${top}`);
            }
        };
const WorkflowVisContainer = (
    { workflowUid, workflowSteps, editMode }: {
        workflowUid: string; workflowSteps: WorkflowStepT[]; editMode: boolean;
    }
) => {
    const {
        workflowVisData, initialMatrix, decisionStepCols
    } = createWorkflowVisData({ workflowSteps, workflowUid });

    console.log("workflowVisData", workflowVisData);
    // console.log("workflowVisData", JSON.stringify(workflowVisData, null, 2))
    console.log("initMatrix", initialMatrix);

    const { matrix, nodeIdToCoord } = populateMatrix({
        workflowVisData, initialMatrix, decisionStepCols
    });
    console.log("matrix", matrix);
    console.log("nodeCoord", matrix);

    // pass matrix cols (array length) and height (inner array length) to workflowVis
    // matrix cols is based on the largest workflowStepOrder seen
    // matrix rows is based on the greatest number of occurrences of a workflowStepOrder

    const coordToNodeId = invertKeyVal(nodeIdToCoord);

    console.log("coordToNodeId", coordToNodeId);

    return (
        <WorkflowVis
            workflowVisData={workflowVisData}
            matrix={matrix}
            editMode={editMode}
            addNodeToVis={addNode(coordToNodeId)}
        />
    );
};

export default WorkflowVisContainer;