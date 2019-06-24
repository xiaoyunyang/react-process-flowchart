// Libraries
import React from 'react';
import classNames from "classnames";

// Types
import { GenericTileType } from "../types/workflowVisTypes";

// Constants
import { iconClassName, workflowStepConfig } from "../constants/workflowStepConfig";

// Style
import styles from './styles/workflowVis.module.css';

const MAX_DISPLAY_NAME_WIDTH = 100;

const Icon = ({ icon }: { icon: string }) => (
    <div className={styles.iconContainer}>
        <i className={iconClassName[icon]} />
    </div>
);

interface PropsT {
    name: string;
    type: GenericTileType;
}
interface State {
    dropdownMenuOpened: boolean;
    displayTooltip: boolean;
}

export default class WorkflowStep extends React.PureComponent<PropsT, State>  {
    constructor(props: PropsT) {
        super(props);

        this.state = {
            dropdownMenuOpened: false,
            displayTooltip: false
        };
        this.boundToggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    }

    getDisplayNameWidth = (element: HTMLInputElement) => {
        if (element) {
            const { width } = element.getBoundingClientRect();
            if (width >= MAX_DISPLAY_NAME_WIDTH) {
                this.setState({ displayTooltip: true });
            }
        }
    };

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
                <span className={styles.truncatedName} ref={this.getDisplayNameWidth}>
                    {displayName}
                </span>
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
    renderTooltippedDisplayName({
        name, isClickable
    }: {
        name: string; isClickable: boolean;
    }) {

        const { displayTooltip } = this.state;
        if (displayTooltip) {
            return (
                <div style={{ color: "red" }}>
                    {
                        this.renderDisplayName({ displayName: name, isClickable })
                    }
                </div>
            );
        }

        return this.renderDisplayName({ displayName: name, isClickable });
    }

    renderWorkflowStep({
        name,
        type,
        isClickable
    }: {
        name: string;
        type: GenericTileType;
        isClickable: boolean;
    }) {
        const { icon, theme } = workflowStepConfig[type];
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
                    <Icon icon={icon} />
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
