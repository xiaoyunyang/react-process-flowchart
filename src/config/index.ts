/* eslint-disable import/no-cycle */
// TODO: Need to refactor createAddNodeParams to incorporate
// decorator pattern to avoid dependency cycles

// Types
import { encodedNodeType } from "./workflowTypes";
import { EndomorphDict, PolymorphDict } from "../lib/types/generic";

import {
    CreateAddNodeParams, AddChildNodeCommand, WorkflowStepNodes
} from "../lib/types/workflowVisTypes";

// Utils
import {
    decodeMatrixCoord,
    findNextNode
} from "../lib/utils";

import * as Utils from "./utils";


// TODO: exporting enum as a module is not working
export enum ThemeT {
    LIGHT = "Light",
    DARK = "Dark"
}

interface StepBaseOptions {
    canEdit: boolean;
    canDelete: boolean;
}

interface StepOptions extends StepBaseOptions {
    canManageUsers: boolean; // put optional options here
}

interface StepConfig {
    theme: ThemeT;
    options: StepOptions;
}

const workflowStepConfig: {[stepType: string]: StepConfig} = {
    [encodedNodeType.start]: {
        theme: ThemeT.DARK, options: { canEdit: false, canDelete: false, canManageUsers: false }
    },
    [encodedNodeType.fork]: {
        theme: ThemeT.LIGHT, options: { canEdit: true, canDelete: true, canManageUsers: false }
    },
    [encodedNodeType[0]]: {
        theme: ThemeT.LIGHT, options: { canEdit: true, canDelete: true, canManageUsers: false }
    },
    [encodedNodeType[1]]: {
        theme: ThemeT.LIGHT, options: { canEdit: true, canDelete: true, canManageUsers: false }
    },
    [encodedNodeType[2]]: {
        theme: ThemeT.LIGHT, options: { canEdit: true, canDelete: true, canManageUsers: false }
    },
    [encodedNodeType[3]]: {
        theme: ThemeT.LIGHT, options: { canEdit: true, canDelete: true, canManageUsers: false }
    },
    [encodedNodeType[4]]: {
        theme: ThemeT.LIGHT, options: { canEdit: true, canDelete: true, canManageUsers: false }
    },
    [encodedNodeType[5]]: {
        theme: ThemeT.LIGHT, options: { canEdit: true, canDelete: true, canManageUsers: false }
    },
    [encodedNodeType[6]]: {
        theme: ThemeT.DARK, options: { canEdit: true, canDelete: false, canManageUsers: false }
    },
    [encodedNodeType.finish]: {
        theme: ThemeT.DARK, options: { canEdit: true, canDelete: false, canManageUsers: false }
    }
};

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
export * from "./uic";
export { default as messages } from "./messages";

export {
    workflowStepConfig,
    createAddNodeParams,
    Utils
};
