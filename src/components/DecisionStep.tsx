// Components
import React from 'react';
import classNames from "classnames";

// Styles
import styles from './styles/workflowVis.module.css';

// Types
import { WorkflowStepTypeT } from "../types/workflow";

import { iconClassName, workflowStepConfig } from "../constants/workflowStepConfig";

const DiamondIcon = ({ icon }: { icon: string }) => {
    return (
        <div className={styles.iconContainerDiamond}>
            <i className={iconClassName[icon]} />
        </div>
    );
};

const DecisionStep = () => {
    const { icon, theme } = workflowStepConfig[WorkflowStepTypeT.DECISION];
    return (
        <div className={styles.diamondContainer}>
            <div className={classNames(styles.diamond, styles.flexContainer, styles[`theme${theme}`])}>
                <DiamondIcon icon={icon} />
            </div>
        </div>
    );
};

export default DecisionStep;