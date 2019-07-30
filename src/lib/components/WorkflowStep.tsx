// Libraries
import React from 'react';
import classNames from "classnames";
import Truncate from "react-truncate";

// Types
import { WorkflowStepTypeT, WorkflowStepIcon, workflowStepConfig } from "../../config";

// Style
import styles from './styles/workflowVis.module.css';

const Tooltip = ({ children }: any) => (
    <div className={styles.tooltip}>
        {children}
    </div>
);

export const Icon = ({ type }: { type: string }) => (
    <div className={styles.iconContainer}>
        <WorkflowStepIcon type={type} />
    </div>
);

interface PropsT {
    name: string;
    type: WorkflowStepTypeT;
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
        this.boundToggleDropdownMenu = this.toggleDropdownMenu.bind(this);
        this.boundHandleTruncate = this.handleTruncate.bind(this);
    }

    boundHandleTruncate: (truncated: boolean) => void;

    handleTruncate(truncated: boolean) {
        this.setState({ displayTooltip: truncated });
    }

    boundToggleDropdownMenu: () => void;
    toggleDropdownMenu() {
        this.setState((state: State) => ({ dropdownMenuOpened: !state.dropdownMenuOpened }));
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
                {isClickable && (
                    <span className={styles.carets}>
                        <span className={styles.caretsWrapper}>
                            <span className={caretDownClassName} />
                            <span className={caretUpClassName} />
                        </span>
                    </span>
                )}
            </div>
        );
    }
    renderTooltippedDisplayName(
        { name, isClickable }: { name: string; isClickable: boolean }) {
        const { displayTooltip } = this.state;

        return displayTooltip ?
            (
                <Tooltip>
                    {this.renderDisplayName({ displayName: name, isClickable })}
                </Tooltip>
            ) : this.renderDisplayName({ displayName: name, isClickable });
    }

    renderWorkflowStep({
        name,
        type,
        isClickable
    }: {
        name: string;
        type: WorkflowStepTypeT; // TODO: there's a subtype in actual WF DataStructure
        isClickable: boolean;
    }) {
        const { theme } = workflowStepConfig[type];
        const boxContainerClassName = isClickable ?
            classNames(styles.boxContainer, styles.hoverable) : styles.boxContainer;


        return (
            <div
                role="button"
                tabIndex={-1}
                onKeyPress={() => { }}
                className={boxContainerClassName}
                onClick={this.boundToggleDropdownMenu}
            >
                <div
                    className={classNames(
                        styles.box,
                        styles.flexContainer,
                        styles[`theme${theme}`]
                    )}
                >
                    <Icon type={type} />
                    {this.renderTooltippedDisplayName({ name, isClickable })}
                </div>
            </div>
        );
    }
    render() {
        const { name, type } = this.props;
        const { canEdit, canDelete } = workflowStepConfig[type];

        if (!canEdit && !canDelete) {
            return this.renderWorkflowStep({ name, type, isClickable: false });
        }

        return this.renderWorkflowStep({ name, type, isClickable: true });
    }
}
