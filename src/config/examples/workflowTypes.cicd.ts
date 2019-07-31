// TODO: move this type to workflowStepConfig
type AutoPrePublishType = "NONE" | "SUBMIT" | "SAVE";

// TODO: move this type to workflowStepConfig
export enum ActionTypeT {
    BUILT = "BUILT",
    DEPLOY = "DEPLOY",
    REVIEW = "REVIEW",
    MOVE = "MOVE",
    REJECT = "REJECT",
    PROD_DEPLOY = "PROD_DEPLOY",
    DECISION = "DECISION"
}

// TODO: AUTHORIZE and DECISION are hard coded and must be included in the WF step Definition
// Can we create  a factory function to take in addition types for config?
export enum WorkflowStepTypeT {
    AUTHORIZE = "AUTHORIZE",
    DECISION = "DECISION",
    CHECKOUT = "CHECKOUT",
    DEPENDENCIES = "DEPENDENCIES",
    BUILD = "BUILD",
    TEST = "TEST",
    UPLOAD_ASSETS = "UPLOAD_ASSETS",
    DEPLOY_STG = "DEPLOY_STG",
    APPROVE = "APPROVE",
    DEPLOY_PROD = "DEPLOY_PROD"
}

export const encodedWorkflowStepType: { [key: string]: WorkflowStepTypeT } = {
    start: WorkflowStepTypeT.AUTHORIZE,
    fork: WorkflowStepTypeT.DECISION,
    0: WorkflowStepTypeT.CHECKOUT,
    1: WorkflowStepTypeT.DEPENDENCIES,
    2: WorkflowStepTypeT.BUILD,
    3: WorkflowStepTypeT.TEST,
    4: WorkflowStepTypeT.UPLOAD_ASSETS,
    5: WorkflowStepTypeT.DEPLOY_STG,
    6: WorkflowStepTypeT.APPROVE,
    finish: WorkflowStepTypeT.DEPLOY_PROD
};

export const type2IconMapping: { [type: string]: string } = {
    AUTHORIZE: "check",
    DECISION: "branch",
    CHECKOUT: "check",
    DEPENDENCIES: "check",
    BUILD: "check",
    TEST: "eye",
    TYPE_CHECK: "check",
    UPLOAD_ASSETS: "inbox",
    DEPLOY_STG: "check",
    APPROVE: "check",
    DEPLOY_PROD: "check"
};
