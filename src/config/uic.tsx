// Libraries
import React, { ReactNode } from "react";
import { MenuItem } from "@material-ui/core";

// Types
import { StyledMenu } from "../defaultUIC";

// Components


interface IconClassName {
    [id: string]: string;
}

// TODO: move this into the same file as type2IconMapping
export const iconClassName: IconClassName = {
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
