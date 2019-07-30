// Libraries
import React from 'react';

// Types
import { WorkflowStepTypeT } from "./workflowTypes";

export * from "./workflowTypes";

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

export const workflowStepConfig: {[stepType in WorkflowStepTypeT]: StepOptions} = {
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

export const iconClassName: IconClassName = {
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

export const WorkflowStepIcon = ({ type }: { type: string }) => (
    <i className={iconClassName[type2IconMapping[type]]} />
);

export const ForkIcon = () => (
    <i className={iconClassName["branch"]} />
);
