// Libraries
import React from "react";

const iconClassName = {
    pencil: "fas fa-pencil-alt",
    eye: "far fa-eye",
    check: "far fa-check-circle",
    comment: "fas fa-comment",
    inbox: "fas fa-inbox",
    branch: "fas fa-code-branch",
    pause: "fas fa-pause-circle",
    wrench: "fas fa-wrench",
    upload: "fas fa-upload",
    playCircle: "far fa-play-circle",
    vial: "fas fa-vial"
};

export const WarningIcon = (
    <div style={{
        textAlign: "center",
        top: 3,
        position: "relative",
        fontSize: "inherit"

    }}
    >
        <i className="fas fa-exclamation-circle" />
    </div>
);

export const AddWorkflowStepIcon = () => (
    <i className="fas fa-plus" />
);


export const WorkflowStepIcon = (_: string) => <></>;

export const ForkIcon = <i className={iconClassName.branch} />;
