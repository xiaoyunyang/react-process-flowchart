// Libraries
import React from "react";
import { Tooltip as UITooltip } from "@material-ui/core";

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

export const DefaultWarningIcon = (
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

export const DefaultAddWorkflowStepIcon = () => (
    <i className="fas fa-plus" />
);


export const DefaultWorkflowStepIcon = (_: string) => <></>;

export const DefaultForkIcon = <i className={iconClassName.branch} />;


export const DefaultTooltip = (
    { children, tooltipContent, placement }: any
) => (
    <UITooltip
        title={tooltipContent}
        placement={placement}
    >
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            { children }
        </div>
    </UITooltip>
);


export * from "./dropdownMenu";
