/* eslint-disable import/prefer-default-export */
// Libraries
import React, { ReactNode } from "react";
import { MenuItem } from "@material-ui/core";

// Types
import { StyledMenu } from "../../defaultUIC";

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


const iconClassName: {[id: string]: string} = {
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
const type2IconMapping: { [type: string]: string } = {
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


// OVERWRITES =============================================
// TODO: decouple color of warning icon from lib
export const WarningIcon = (
    <div style={{
        textAlign: "center",
        top: 3,
        position: "relative",
        fontSize: "inherit"

    }}
    >
        <i className="fas fa-bell" />
    </div>
);

export const ForkIcon = <i className="far fa-check-circle" />;


export const WorkflowStepIcon = (type: string) => (
    <div style={{ textAlign: "center" }}>
        <i className={iconClassName[type2IconMapping[type]]} />
    </div>
);

// Components


export const DropdownMenu = ({
    closeOnClick, onOpen, onClose, children
}: {
    closeOnClick: any; onOpen: any; onClose: any; children: ReactNode;
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
        onOpen();
    };
    const handleClose = () => {
        setAnchorEl(null);
        onClose();
    };

    return (
        <div>
            <div onClick={handleClick}>
                {children}
            </div>
            <StyledMenu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                keepMounted
                onClose={handleClose}
            >
                <MenuItem>FOO</MenuItem>
                <MenuItem>BAR</MenuItem>
            </StyledMenu>
        </div>
    );
};
// ===========================================================
