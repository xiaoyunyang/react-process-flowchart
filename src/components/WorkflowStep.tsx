// Libraries
import React from 'react';
import classNames from "classnames";

// Types
import { WorkflowStepTypeT } from "../types/workflow";
import { GenericTileType } from "../types/workflowVisTypes";

// Constants
import { iconClassName, workflowStepConfig } from "../constants/workflowStepConfig";

// Style
import styles from './styles/workflowVis.module.css';

const TRUNCATE_WORDS_CUTOFF = 10;

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
    }

    renderWorkflowStep({
        displayName,
        type,
        isClickable
    }: {
        displayName: string;
        type: GenericTileType;
        isClickable: boolean;
    }) {
        const { icon, theme, canEdit, canDelete } = workflowStepConfig[type];
        const { dropdownMenuOpened } = this.state;


        const caretDirClassName = dropdownMenuOpened
            ? classNames(styles.caretUp, styles.highlighted)
            : styles.caretDown;

        if (!isClickable) {
            return (
                <div className={styles.boxContainer}>
                    <div
                        className={classNames(
                            styles.box,
                            styles.flexContainer,
                            styles[`theme${theme}`]
                        )}
                    >
                        <Icon icon={icon} />
                        <div className={styles.workflowStepDisplayName}>
                            <p>{displayName}</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={classNames(styles.boxContainer, styles.hoverable)}>
                <div
                    className={classNames(
                        styles.box,
                        styles.flexContainer,
                        styles[`theme${theme}`]
                    )}
                >
                    <Icon icon={icon} />
                    <div className={styles.workflowStepDisplayName}>
                        <p>
                            {displayName}
                            {(canEdit || canDelete) &&
                                <span className={classNames(styles.caret, caretDirClassName)} />
                            }
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        const { name, type } = this.props;
        const { canEdit, canDelete } = workflowStepConfig[type];

        // truncate name if too long
        const displayName = name.length > TRUNCATE_WORDS_CUTOFF
            ? `${name.substring(0, TRUNCATE_WORDS_CUTOFF)}...` : name;


        if (!canEdit && !canDelete) {
            return this.renderWorkflowStep({
                displayName,
                type,
                isClickable: false
            });
        }

        return (
            this.renderWorkflowStep({
                displayName,
                type,
                isClickable: true
            })
        );
    }
}
