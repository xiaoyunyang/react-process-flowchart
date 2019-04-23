/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Components
import WorkflowVis from "./WorkflowVis";

// Types
import { WorkflowStepT } from "../types/workflow";
import { AddNode, AddChildNodeCommand, WorkflowStepNodes } from "../types/workflowVisTypes";
import { EndomorphDict, PolymorphDict } from '../types/generic';

// Utils
import { createWorkflowVisData, populateMatrix, invertKeyVal } from "../utils/workflowVisUtils";

export const addNode: AddNode = ({
    coordToNodeId, workflowStepNodes, nodeIdToParentNodeIds
}: {
    coordToNodeId: EndomorphDict;
    workflowStepNodes: WorkflowStepNodes;
    nodeIdToParentNodeIds: PolymorphDict;
}) =>
    (parentCoord: string | undefined) =>
        ({ left, top }: { left: number; top: number }): AddChildNodeCommand => {
            if (parentCoord) {
                // The command to add new child node is set to this string as a placeholder.
                // You can set it to whatever string or data structure you want
                const parentNodeId = coordToNodeId[parentCoord];
                const prevNodeIds = nodeIdToParentNodeIds[parentNodeId];
                const nextNodeIds = workflowStepNodes[parentNodeId].nextSteps;

                const addChildNodeCommand: AddChildNodeCommand =
                    `User clicked plus sign following nodeId = ${parentNodeId} with prevNodeIds = ${String(prevNodeIds)} nextNodeIds = ${String(nextNodeIds)}. Draw popover modal at left=${left}, top=${top}`;

                console.log(addChildNodeCommand);
                return addChildNodeCommand;
            }
            return "";
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

    const { matrix, nodeIdToCoord, nodeIdToParentNodeIds } = populateMatrix({
        workflowVisData, initialMatrix, decisionStepCols
    });
    console.log("matrix", matrix);
    console.log("nodeCoord", matrix);

    // pass matrix cols (array length) and height (inner array length) to workflowVis
    // matrix cols is based on the largest workflowStepOrder seen
    // matrix rows is based on the greatest number of occurrences of a workflowStepOrder

    const coordToNodeId = invertKeyVal(nodeIdToCoord);

    console.log("coordToNodeId", coordToNodeId);
    const { workflowStepNodes } = workflowVisData;
    return (
        <WorkflowVis
            workflowVisData={workflowVisData}
            matrix={matrix}
            editMode={editMode}
            addNodeToVis={addNode({ coordToNodeId, workflowStepNodes, nodeIdToParentNodeIds })}
        />
    );
};

export default WorkflowVisContainer;