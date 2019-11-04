// Libraries
import React, { useState } from 'react';

import {
    Tooltip as UITooltip,
    Menu, MenuItem,
    withStyles
} from '@material-ui/core';

import { type2IconMapping } from "./workflowTypes";
import { render } from 'enzyme';

// Types
import { TooltipProps } from '@material-ui/core/Tooltip';
import any from 'ramda/es/any';

// Components
export const Tooltip = React.forwardRef(
    ({ children, tooltipContent, placement }: any,
    ref: any
) => (
    <UITooltip
        title={tooltipContent}
        placement={placement}
    >
        <div ref={ref}>
            { children }
        </div>
    </UITooltip>
));

// Icons
interface IconClassName {
    [id: string]: string;
}

// TODO: move this into the same file as type2IconMapping
const iconClassName: IconClassName = {
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


export const WorkflowStepIcon = ({ type }: { type: string }) => (
    <div style= {{ textAlign: "center"}}>
        <i className={ iconClassName[type2IconMapping[type]] } />
    </div>
);

export const ExclamationIcon = () => (
    <div style= {{ 
        textAlign: "center",
        top: 3,
        position: "relative",
        fontSize: "inherit"

    }}>
        <i className= "fas fa-exclamation-circle" />
    </div>
);

export const ForkIcon = () => (
    <i className= { iconClassName["branch"]} />
);

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      marginTop: "5px"
    },
  })((props: {
      open: boolean;
      anchorEl: any;
      keepMounted: boolean;
      onClose: () => void;
    }) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
        }}
        {...props}
    />
  ));


export const Dropdown = (props: any) => {
    return <props.component {...props}/>
};

export const WorkflowStepEditMenu = ({
    closeOnClick, onOpen, onClose, children
}: any) => {
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
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </StyledMenu>
        </div>
    );

};