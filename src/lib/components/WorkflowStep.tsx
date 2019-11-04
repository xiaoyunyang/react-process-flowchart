// Libraries
import React, { ReactNode } from 'react';
import classNames from "classnames";
import Truncate from "react-truncate";

// Config
import {
    Tooltip, Dropdown,
    WorkflowStepEditMenu,
    WorkflowStepTypeT, ThemeT, WorkflowStepIcon, workflowStepConfig,
    messages,
    ExclamationIcon
} from "../../config";

// Style
import styles from "../styles/workflowVis.module.css";

export const WarningIcon = () => (
    <div className={styles.iconContainerWarning}>
        <ExclamationIcon />
    </div>
);

// TODO: different from project code
const DropdownComponent = WorkflowStepEditMenu;

// TODO: different from project code
export const Icon = ({ type }: { type: string }) => (
    <div className={styles.iconContainer}>
        <WorkflowStepIcon type={type} />
    </div>
);

interface PropsT {
    name: string;
    type: WorkflowStepTypeT;
    isDisabled: boolean;
    stepDisabledMessage?: string;
    shouldHighlight: boolean;
    displayWarning?: ReactNode;
    theme?: ThemeT;
}
interface State {
    dropdownMenuOpened: boolean;
    displayTooltip: boolean;
}

export default class WorkflowStep extends React.PureComponent<PropsT, State>  {
    private displayNameRef: React.RefObject<HTMLInputElement> = React.createRef();

    constructor(props: PropsT) {
        super(props);

        this.state = {
            dropdownMenuOpened: false,
            displayTooltip: false
        };
        this.boundOpenDropdownMenu = this.toggleDropdownMenu.bind(this, true);
        this.boundCloseDropdownMenu = this.toggleDropdownMenu.bind(this, false);
        this.boundHandleTruncate = this.handleTruncate.bind(this);
    }

    boundHandleTruncate: (truncated: boolean) => void;

    handleTruncate(truncated: boolean) {
        this.setState({ displayTooltip: truncated });
    }

    boundOpenDropdownMenu: () => void;
    boundCloseDropdownMenu: () => void;
    toggleDropdownMenu(dropdownMenuOpened: boolean) {
        this.setState({ dropdownMenuOpened });
    }
    renderDisplayName({ displayName, isClickable }: { displayName: string; isClickable: boolean }) {
        const { dropdownMenuOpened } = this.state;

        const caretUpClassName = classNames(
            styles.caret, styles.caretUp, styles.active,
            { [styles.hidden]: !dropdownMenuOpened }
        );

        const caretDownClassName = classNames(
            styles.caret, styles.caretDown,
            { [styles.hidden]: dropdownMenuOpened }
        );

        return (
            <div className={classNames(styles.workflowStepDisplayName, styles.flexContainer)}>
                <Truncate onTruncate={this.boundHandleTruncate}>
                    {displayName}
                </Truncate>
                {
                    isClickable && (
                        <span className={styles.carets}>
                            <span className={styles.caretsWrapper}>
                                <span className={caretDownClassName} />
                                <span className={caretUpClassName} />
                            </span>
                        </span>
                    )
                }
            </div>
        );
    }
    renderTooltippedDisplayName(
        { name, isClickable }: { name: string; isClickable: boolean }) {
        const { displayTooltip } = this.state;

        return displayTooltip ?
            (
                <Tooltip
                    className={styles.boxTooltip}
                    placement="top"
                    tooltipContent={name}
                >
                    {this.renderDisplayName({ displayName: name, isClickable })}
                </Tooltip>
            ) : this.renderDisplayName({ displayName: name, isClickable });
    }

    renderWorkflowStep({
        isClickable,
        isDisabled
    }: {
        isClickable: boolean;
        isDisabled?: boolean;
    }) {
        const { name, type, shouldHighlight, displayWarning } = this.props;

        const theme = this.props.theme || workflowStepConfig[type].theme; // TODO: need to test this

        const renderedName: string = (messages as {[key: string]: string})[type] 
            ? (messages as {[key: string]: string})[type] : name;

        const boxContainerClassName = isClickable ?
            classNames(styles.boxContainer, styles.hoverable) : styles.boxContainer;

        return (
            <div className={boxContainerClassName}>
                <div
                    className={classNames(
                        { [styles.workflowStepDisabled]: isDisabled },
                        { [styles.highlighted]: shouldHighlight },
                        styles.box,
                        styles.flexContainer,
                        styles[`theme${theme}`]
                    )}
                >
                    {displayWarning && <WarningIcon />}
                    <Icon type={type} />
                    {this.renderTooltippedDisplayName({ name: renderedName, isClickable })}
                </div>
            </div>
        );
    }
    renderInDropdownConditionally(children: ReactNode, isClickable: boolean) {
        const { type, } = this.props;
        const { canEdit, canDelete, canManageUsers } = workflowStepConfig[type];

        // TODO: the following is different from project code
        const editMenuProps = {
            closeOnClick: false,
            onOpen: this.boundOpenDropdownMenu,
            onClose: this.boundCloseDropdownMenu
        };

        return isClickable ? (
            <Dropdown
                closeOnClick={false}
                onOpen={this.boundOpenDropdownMenu}
                onClose={this.boundCloseDropdownMenu}
                component={DropdownComponent}
            >
                {children}
            </Dropdown>
        ) : children;
    }
    renderInTooltipConditionally(children: ReactNode, condition: boolean) {
        const { displayWarning, stepDisabledMessage } = this.props;
        const tooltipContent = displayWarning || stepDisabledMessage || messages.stepIsDisabled;
        return condition ? (
            <Tooltip
                placement="top"
                tooltipContent={tooltipContent}
                tooltipTitleClassName={styles.boxContainerTooltip}
            >
                {children}
            </Tooltip>
        ) : children;
    }
    
    render() {
        const { type, isDisabled, displayWarning } = this.props;
        const { canEdit, canDelete, canManageUsers } = workflowStepConfig[type];

        // TODO: need to change the config so it doesn't explicitly identify what the options are
        const isClickable = !isDisabled && (canEdit || canDelete || canManageUsers);
        
        return this.renderInTooltipConditionally(
            this.renderInDropdownConditionally(
                this.renderWorkflowStep({ isClickable, isDisabled }),
                isClickable
            ),
            !!displayWarning || isDisabled
        );
    };
}
