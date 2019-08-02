/* eslint-disable import/no-cycle */
// TODO: Need to refactor createAddNodeParams to incorporate
// decorator pattern to avoid dependency cycles

// Libraries
import React from 'react';

// Types
import { type2IconMapping, encodedWorkflowStepType } from "./workflowTypes";
import { EndomorphDict, PolymorphDict } from '../lib/types/generic';

import {
    CreateAddNodeParams, AddChildNodeCommand, WorkflowStepNodes
} from  "../lib/types/workflowVisTypes";

// Utils
import {
    decodeMatrixCoord,
    findNextNode
} from "../lib/utils/workflowVisUtils";


// TODO: exporting enum as a module is not working
export enum ThemeT {
    LIGHT = "Light",
    DARK = "Dark"
}

interface StepBaseOptions {
    theme: ThemeT;
    canEdit: boolean;
    canDelete: boolean;
}

interface StepOptions extends StepBaseOptions {
    canManageUsers: boolean; // TODO: put optional options here
}

const workflowStepConfig: {[stepType: string]: StepOptions} = {
    [encodedWorkflowStepType.start]: { theme: ThemeT.DARK, canEdit: false, canDelete: false, canManageUsers: false },
    [encodedWorkflowStepType.fork]: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    [encodedWorkflowStepType[0]]: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    [encodedWorkflowStepType[1]]: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    [encodedWorkflowStepType[2]]: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    [encodedWorkflowStepType[3]]: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    [encodedWorkflowStepType[4]]: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    [encodedWorkflowStepType[5]]: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    [encodedWorkflowStepType[6]]: { theme: ThemeT.DARK, canEdit: true, canDelete: false, canManageUsers: false },
    [encodedWorkflowStepType.finish]: { theme: ThemeT.DARK, canEdit: true, canDelete: false, canManageUsers: false }
};

interface IconClassName {
    [id: string]: string;
}

const iconClassName: IconClassName = {
    pencil: "fas fa-pencil-alt",
    eye: "far fa-eye",
    check: "far fa-check-circle",
    comment: "fas fa-comment",
    inbox: "fas fa-inbox",
    branch: "fas fa-code-branch",
    pause: "fas fa-pause-circle"
};

const WorkflowStepIcon = ({ type }: { type: string }) => (
    <i className={iconClassName[type2IconMapping[type]]} />
);

const ForkIcon = () => (
    <i className={iconClassName["branch"]} />
);

const AddWorkflowStepIcon = () => (
    <i className="fas fa-plus" />
);
const createAddNodeParams: CreateAddNodeParams = ({
    coordToNodeId, workflowStepNodes, nodeIdToParentNodeIds, updatePlusBtnClickParams
}: {
    coordToNodeId: EndomorphDict;
    workflowStepNodes: WorkflowStepNodes;
    nodeIdToParentNodeIds: PolymorphDict;
    updatePlusBtnClickParams: Function;
}) =>
    ({ ownCoord = "", parentCoord }: { ownCoord: string | undefined; parentCoord: string | undefined }) =>
        ({ left, top, isEmptyBranch }: { left: number; top: number; isEmptyBranch: boolean }): AddChildNodeCommand => {
            if (!parentCoord) return "";
            if (parentCoord) {
                // The command to add new child node is set to this string as a placeholder.
                // You can set it to whatever string or data structure you want
                // parentNode = the node that's thethered to the plus sign
                const parentNodeId = coordToNodeId[parentCoord];
                const prevNodeIds = nodeIdToParentNodeIds[parentNodeId];
                const { nextNodes } = workflowStepNodes[parentNodeId];

                const candidateNextNodeIds = nextNodes.map((nextNode: any) => nextNode.id);

                const addChildNodeCommand: AddChildNodeCommand =
                    `User clicked plus sign tethered to nodeId=${parentNodeId} with prevNodeIds = ${String(prevNodeIds)} candidateNextNodes= ${String(candidateNextNodeIds)}. Draw popover modal at left=${left}, top=${top}`;

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
    WorkflowStepIcon,
    ForkIcon,
    AddWorkflowStepIcon,
    workflowStepConfig,
    createAddNodeParams
};

