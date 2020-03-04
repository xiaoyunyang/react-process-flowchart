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
export enum NodeType {
    START = "START",
    FORK = "FORK",
    CHECKOUT = "CHECKOUT",
    DEPENDENCIES = "DEPENDENCIES",
    BUILD = "BUILD",
    TEST = "TEST",
    UPLOAD_ASSETS = "UPLOAD_ASSETS",
    DEPLOY_STG = "DEPLOY_STG",
    APPROVE = "APPROVE",
    DEPLOY_PROD = "DEPLOY_PROD"
}

export const encodedNodeType: { [key: string]: NodeType } = {
    start: NodeType.START,
    fork: NodeType.FORK,
    0: NodeType.CHECKOUT,
    1: NodeType.DEPENDENCIES,
    2: NodeType.BUILD,
    3: NodeType.TEST,
    4: NodeType.UPLOAD_ASSETS,
    5: NodeType.DEPLOY_STG,
    6: NodeType.APPROVE,
    finish: NodeType.DEPLOY_PROD
};

export const type2IconMapping: { [type: string]: string } = {
    AUTHORIZE: "check",
    DECISION: "branch",
    CHECKOUT: "eye",
    DEPENDENCIES: "check",
    BUILD: "wrench",
    TEST: "vial",
    TYPE_CHECK: "check",
    UPLOAD_ASSETS: "upload",
    DEPLOY_STG: "pause",
    APPROVE: "check",
    DEPLOY_PROD: "check",
    FORK: "branch",
    START: "playCircle"
};
