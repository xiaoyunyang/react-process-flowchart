// import { ActionTypeT, WorkflowStepTypeT } from "./examples/workflowTypes.smartling";
// export * from "./examples/workflowTypes.smartling";
import { ActionTypeT } from "./examples/workflowTypes.cicd";

export * from "./examples/workflowTypes.cicd";

export interface WorkflowActionT {
    primary: boolean;
    actionType: ActionTypeT | string;
    nextWorkflowStepUid: string;
}

export interface WorkflowStep {
    workflowStepUid: string;
    workflowStepName: string;
    workflowStepType: string;
    workflowStepOrder: number;
    actions: WorkflowActionT[];
}
