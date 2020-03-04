// import { ActionTypeT, WorkflowStepTypeT } from "./examples/workflowTypes.smartling";
// export * from "./examples/workflowTypes.smartling";
import { ActionTypeT, NodeType } from "./examples/workflowTypes.cicd";

export * from "./examples/workflowTypes.cicd";

export interface WorkflowActionT {
    primary: boolean;
    actionType: ActionTypeT | string;
    nextWorkflowStepUid: string;
}

export interface WorkflowStep {
    workflowStepUid: string;
    workflowStepName: string;
    workflowStepType: NodeType;
    workflowStepOrder: number;
    actions: WorkflowActionT[];
}
