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

const WorkflowStep = ({ name, type }: PropsT) => {
    const { icon, theme } = workflowStepConfig[type];

    // truncate name if too long
    const displayName = name.length > TRUNCATE_WORDS_CUTOFF
        ? `${name.substring(0, TRUNCATE_WORDS_CUTOFF)}...` : name;

    // TODO: We would like to pass down a noDropDown from props to specify all the workflow
    // types that don't want have dropdown
    const arrowHeadDown = type === WorkflowStepTypeT.AUTHORIZE ? null : <span className={classNames(styles.caret, styles.caretDown)} />;

    return (
        <div className={styles.boxContainer}>
            <div className={classNames(styles.box, styles.flexContainer, styles[`theme${theme}`])}>
                <Icon icon={icon} />
                <div className={styles.workflowStepDisplayName}>
                    <p>
                        {displayName}
                        {arrowHeadDown}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WorkflowStep;