import { ReactNode } from "react";
import {
    WorkflowStep
} from "./workflowTypes";

const displayWarning = false;
const isDisabled = false;
export const getDisplayWarning = (workflowStep: WorkflowStep): ReactNode => (displayWarning ? "Oops! Something is wrong" : null);

export const getNodeType = ({ workflowStep }: { workflowStep: WorkflowStep }): string => {
    const { workflowStepType } = workflowStep;
    return workflowStepType;
};

export const getNextNodes = ({ actions }: WorkflowStep) => actions
    .filter((action) => action.actionType !== "REJECT")
    .map((action) => ({ id: action.nextWorkflowStepUid, primary: action.primary }));

export const getIsDisabled = (workflowStep: WorkflowStep) => isDisabled;
