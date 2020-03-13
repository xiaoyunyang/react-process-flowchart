/* eslint-disable import/no-cycle */
// TODO: Need to refactor createAddNodeParams to incorporate
// decorator pattern to avoid dependency cycles

// Types
import { EndomorphDict, PolymorphDict } from "../lib/types/generic";

import {
    CreateAddNodeParams, AddChildNodeCommand, WorkflowStepNodes
} from "../lib/types";

// Utils
import {
    decodeMatrixCoord,
    findNextNode
} from "../lib/utils";

import * as Utils from "./utils";


const createAddNodeParams: CreateAddNodeParams = ({
    coordToNodeId, workflowStepNodes, nodeIdToParentNodeIds, updatePlusBtnClickParams
}: {
    coordToNodeId: EndomorphDict;
    workflowStepNodes: WorkflowStepNodes;
    nodeIdToParentNodeIds: PolymorphDict;
    updatePlusBtnClickParams: Function;
}) => ({ ownCoord = "", parentCoord }: { ownCoord: string | undefined; parentCoord: string | undefined }) => ({ left, top, isEmptyBranch }: { left: number; top: number; isEmptyBranch: boolean }): AddChildNodeCommand => {
    if (!parentCoord) return "";
    if (parentCoord) {
        // The command to add new child node is set to this string as a placeholder.
        // You can set it to whatever string or data structure you want
        // parentNode = the node that's tethered to the plus sign
        const parentNodeId = coordToNodeId[parentCoord];
        const prevNodeIds = nodeIdToParentNodeIds[parentNodeId];
        const { nextNodes } = workflowStepNodes[parentNodeId];

        const candidateNextNodeIds = nextNodes.map((nextNode: any) => nextNode.id);

        const addChildNodeCommand: AddChildNodeCommand = `User clicked plus sign tethered to nodeId=${parentNodeId} with prevNodeIds = ${String(prevNodeIds)} candidateNextNodes= ${String(candidateNextNodeIds)}. Draw popover modal at left=${left}, top=${top}`;

        // console.log("MOOOOOOOOOOOOOOOOOO\n", addChildNodeCommand);

        const ownMatrixCoord = decodeMatrixCoord(ownCoord);

        const nextNodeId = isEmptyBranch ? null : findNextNode({
            plusBtnCoord: ownMatrixCoord,
            coordToNodeId,
            candidateNextNodeIds
        });

        // console.log("tetheredNodeId", parentNodeId);
        // console.log("nextNodeId", nextNodeId);

        updatePlusBtnClickParams({
            left,
            top,
            tetheredNodeId: parentNodeId,
            prevNodeIds,
            nextNodeId
        });
        return addChildNodeCommand;
    }
    return "";
};


export * from "./workflowTypes";
export { default as messages } from "./messages";

export {
    createAddNodeParams,
    Utils
};
