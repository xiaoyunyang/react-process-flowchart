type AutoPrePublishType = "NONE" | "SUBMIT" | "SAVE";

type ActionType =
    | "TRANSLATION_SUBMITTED"
    | "EDIT"
    | "REVIEW"
    | "MOVE"
    | "REJECT"
    | "POST_MACHINE_REVISION"
    | "DECISION";

interface WorkflowAction {
    primary: boolean;
    actionType: ActionType;
    nextWorkflowStepUid: string;
}

export enum WorkflowStepType {
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

export interface WorkflowStep {
    workflowStepUid: string;
    workflowStepName: string;
    workflowStepType: WorkflowStepType;
    workflowStepOrder: number;
    matchScore?: number;
    autoPrePublishType: AutoPrePublishType;
    claimingEnabled: boolean;
    assignmentEnabled: boolean;
    submitOnSaveEnabled: boolean;
    offlineTranslationEnabled: boolean;
    canEditPublishStepEnabled: boolean;
    configurationUid?: string;
    actions: WorkflowAction[];
}

export interface WorkflowStep {
    workflowStepUid: string;
    workflowStepName: string;
    workflowStepType: WorkflowStepType;
    workflowStepOrder: number;
    matchScore?: number;
    autoPrePublishType: AutoPrePublishType;
    claimingEnabled: boolean;
    assignmentEnabled: boolean;
    submitOnSaveEnabled: boolean;
    offlineTranslationEnabled: boolean;
    canEditPublishStepEnabled: boolean;
    configurationUid?: string;
    actions: WorkflowAction[];
}