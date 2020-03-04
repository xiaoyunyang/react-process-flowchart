// Components
import React from "react";
import classNames from "classnames";

// Styles
import styles from "../styles/workflowVis.module.css";

// Types
import { encodedNodeType, workflowStepConfig, ForkIcon } from "../../config";

export const DiamondIcon = () => (
    <div className={styles.iconContainerDiamond}>
        <ForkIcon />
    </div>
);

const ForkStep = () => {
    const { theme } = workflowStepConfig[encodedNodeType.fork];
    return (
        <div className={classNames(styles.diamondContainer, styles.hoverable)}>
            <div className={classNames(styles.diamond, styles.flexContainer, styles[`theme${theme}`])}>
                <DiamondIcon />
            </div>
        </div>
    );
};

export default ForkStep;
