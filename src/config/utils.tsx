import { ReactNode } from "react";
import {
    WorkflowStep,
    NodeType
} from "./workflowTypes";

export const getDisplayWarning = (workflowStep: WorkflowStep): ReactNode => false;

export const getNodeType = ({ workflowStep }: { workflowStep: WorkflowStep }): NodeType => {
    const { workflowStepType } = workflowStep;
    return workflowStepType;
};

export const getNextNodes = ({ actions }: WorkflowStep) => actions
    .filter((action) => action.actionType !== "REJECT")
    .map((action) => ({ id: action.nextWorkflowStepUid, primary: action.primary }));

export const getIsDisabled = (workflowStep: WorkflowStep) => false;
