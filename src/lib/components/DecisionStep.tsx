// Components
import React from 'react';
import classNames from "classnames";

// Styles
import styles from './styles/workflowVis.module.css';

// Types
import { WorkflowStepTypeT, workflowStepConfig, ForkIcon } from "../../config";

export const DiamondIcon = () => (
    <div className={styles.iconContainerDiamond}>
        <ForkIcon />
    </div>
);

const DecisionStep = () => {
    const { theme } = workflowStepConfig[WorkflowStepTypeT.DECISION];
    return (
        <div className={classNames(styles.diamondContainer, styles.hoverable)}>
            <div className={classNames(styles.diamond, styles.flexContainer, styles[`theme${theme}`])}>
                <DiamondIcon />
            </div>
        </div>
    );
};

export default DecisionStep;