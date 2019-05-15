// Libraries
import React from 'react';
import classNames from "classnames";

// Types
import { GenericTileType } from "../types/workflowVisTypes";

// Constants
import { iconClassName, workflowStepConfig } from "../constants/workflowStepConfig";

// Style
import styles from './styles/workflowVis.module.css';

const TRUNCATE_WORDS_CUTOFF = 10;

export const truncateName = (name: string, truncateCutoff: number = TRUNCATE_WORDS_CUTOFF) =>
    name.length > truncateCutoff
        ? `${name.substring(0, truncateCutoff)}...`
        : name;

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
}

export default class WorkflowStep extends React.PureComponent<PropsT, State>  {
    constructor(props: PropsT) {
        super(props);

        this.state = {
            dropdownMenuOpened: false
        };
        this.boundToggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    }
    boundToggleDropdownMenu: () => void;
    toggleDropdownMenu() {
        this.setState((state: State) => ({ dropdownMenuOpened: !state.dropdownMenuOpened }));
    }
    renderDisplayName({ name, isClickable }: { name: string; isClickable: boolean }) {
        const { dropdownMenuOpened } = this.state;
        const displayName = truncateName(name);
        const caretDirClassName = classNames(
            styles.caret,
            dropdownMenuOpened ? styles.caretUp : styles.caretDown,
            { [styles.highlighted]: dropdownMenuOpened }
        );
        return (
            <div className={styles.workflowStepDisplayName}>
                <p>
                    {displayName}
                    {isClickable &&
                        <span className={classNames(styles.caret, caretDirClassName)} />
                    }
                </p>
            </div>
        );
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
                    {this.renderDisplayName({ name, isClickable })}
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
