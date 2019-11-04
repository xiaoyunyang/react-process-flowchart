import React, { ReactNode } from "react";
import {
    WorkflowStepT,
    NodeTypeT
} from "./workflowTypes";

export const getDisplayWarning = (workflowStep: WorkflowStepT): ReactNode => false;

export const getNodeType = ({ workflowStep }: { workflowStep: WorkflowStepT }): NodeTypeT => {
    const { workflowStepType } = workflowStep;
    return workflowStepType;
};

export const getNextNodes = ({ actions }: WorkflowStepT) => actions
    .filter((action) => action.actionType !== "REJECT")
    .map((action) => ({ id: action.nextWorkflowStepUid, primary: action.primary }));

export const getIsDisabled = (workflowStep: WorkflowStepT) => false;
