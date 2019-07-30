/* eslint-disable import/no-cycle */
// TODO: Need to refactor createAddNodeParams to incorporate
// decorator pattern to avoid dependency cycles

// Libraries
import React from 'react';

// Types
import { WorkflowStepTypeT } from "./workflowTypes";
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

const workflowStepConfig: {[stepType in WorkflowStepTypeT]: StepOptions} = {
    AUTHORIZE: { theme: ThemeT.DARK, canEdit: false, canDelete: false, canManageUsers: false },
    DECISION: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    ADMIN_APPROVAL: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    PRE_TRANSLATION: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    TRANSLATION: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    POST_TRANSLATION: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    REVIEW: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    WORKFLOW_HOLD: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    ANALYSIS: { theme: ThemeT.LIGHT, canEdit: true, canDelete: true, canManageUsers: false },
    PUBLISH: { theme: ThemeT.DARK, canEdit: true, canDelete: false, canManageUsers: false }
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

const type2IconMapping: {[type: string]: string} = {
    AUTHORIZE:  "inbox",
    DECISION: "branch",
    ADMIN_APPROVAL: "inbox",
    PRE_TRANSLATION: "pause",
    TRANSLATION: "comment",
    POST_TRANSLATION: "pencil",
    REVIEW: "eye",
    WORKFLOW_HOLD: "pause",
    ANALYSIS:  "eye",
    PUBLISH: "check"
};

const WorkflowStepIcon = ({ type }: { type: string }) => (
    <i className={iconClassName[type2IconMapping[type]]} />
);

const ForkIcon = () => (
    <i className={iconClassName["branch"]} />
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

                console.log("tetheredNodeId", parentNodeId);
                console.log("nextNodeId", nextNodeId);

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

export {
    WorkflowStepIcon,
    ForkIcon,
    workflowStepConfig,
    createAddNodeParams
};

