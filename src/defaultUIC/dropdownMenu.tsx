// Libraries
import React, { ReactNode } from "react";
import {
    Menu, MenuItem,
    withStyles
} from "@material-ui/core";


export const DefaultDropdown = (props: any) => <props.component {...props} />;


export const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
        marginTop: "5px"
    }
})(
    (props: {
      open: boolean;
      anchorEl: any;
      keepMounted: boolean;
      onClose: () => void;
    }) => (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            {...props}
        />
    )
);

export const DefaultDropdownMenu = ({
    closeOnClick, onOpen, onClose, children
}: {
    closeOnClick: boolean; onOpen: any; onClose: any; children: ReactNode;
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
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </StyledMenu>
        </div>
    );
};

// export const DropdownComponent = ({
//     canEdit, canDelete, canManageUsers,
//     type, workflowStepUid, workflowUid,
//     nextSteps, prevSteps,
//     onOpen, onClose, children
// }: any) => (
//     <DropdownMenu
//         onClose={onClose}
//         onOpen={onOpen}
//     >
//         {children}
//     </DropdownMenu>
// );
