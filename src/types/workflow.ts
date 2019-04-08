type AutoPrePublishType = "NONE" | "SUBMIT" | "SAVE";

type ActionType =
    | "TRANSLATION_SUBMITTED"
    | "EDIT"
    | "REVIEW"
    | "MOVE"
    | "REJECT"
    | "POST_MACHINE_REVISION"
    | "DECISION";

interface WorkflowActionT {
    primary: boolean;
    actionType: ActionType;
    nextWorkflowStepUid: string;
}

export enum WorkflowStepTypeT {
    AUTHORIZE = "AUTHORIZE",
    DECISION = "DECISION",
    ADMIN_APPROVAL = "ADMIN_APPROVAL",
    PRE_TRANSLATION = "PRE_TRANSLATION",
    TRANSLATION = "TRANSLATION",
    POST_TRANSLATION = "POST_TRANSLATION",
    REVIEW = "REVIEW",
    WORKFLOW_HOLD = "WORKFLOW_HOLD",
    PUBLISH = "PUBLISH",
    ANALYSIS = "ANALYSIS"
}

export interface WorkflowStepT {
    workflowStepUid: string;
    workflowStepName: string;
    workflowStepType: WorkflowStepTypeT;
    workflowStepOrder: number;
    actions: WorkflowActionT[];
}