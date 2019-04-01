interface WorkflowStepConfig {
    [id: string]: { icon: string; theme: string; canEdit: boolean; canDelete: boolean };
}

interface IconClassName {
    [id: string]: string;
}

export const workflowStepConfig: WorkflowStepConfig = {
    AUTHORIZE: { icon: "inbox", theme: "Dark", canEdit: false, canDelete: false },
    DECISION: { icon: "branch", theme: "Light", canEdit: true, canDelete: true },
    ADMIN_APPROVAL: { icon: "inbox", theme: "Light", canEdit: true, canDelete: true },
    PRE_TRANSLATION: { icon: "pause", theme: "Light", canEdit: true, canDelete: true },
    TRANSLATION: { icon: "comment", theme: "Light", canEdit: true, canDelete: true },
    POST_TRANSLATION: { icon: "pencil", theme: "Light", canEdit: true, canDelete: true },
    REVIEW: { icon: "eye", theme: "Light", canEdit: true, canDelete: true },
    WORKFLOW_HOLD: { icon: "pause", theme: "Light", canEdit: true, canDelete: true },
    ANALYSIS: { icon: "eye", theme: "Light", canEdit: true, canDelete: true },
    PUBLISH: { icon: "check", theme: "Dark", canEdit: true, canDelete: false }
};

export const iconClassName: IconClassName = {
    pencil: "fas fa-pencil-alt",
    eye: "far fa-eye",
    check: "far fa-check-circle",
    comment: "fas fa-comment",
    inbox: "fas fa-inbox",
    branch: "fas fa-code-branch",
    pause: "fas fa-pause-circle"
};
