// Components
import React, { useContext } from "react";
import classNames from "classnames";

// Styles
import styles from "../styles/workflowVis.module.css";

// Context
import UicContext from "../../context/uic";
import ConfigContext from "../../context/config";

// Types
import { WorkflowStepNode } from "../types";

const ForkStep = ({ workflowStepNode }: {workflowStepNode: WorkflowStepNode}) => {
    const { workflowConfig } = useContext(ConfigContext);
    const { forkIcon } = useContext(UicContext);
    const { nodeType } = workflowStepNode;
    const { theme } = workflowConfig[nodeType];
    return (
        <div className={classNames(styles.diamondContainer, styles.hoverable)}>
            <div className={classNames(styles.diamond, styles.flexContainer, styles[`theme${theme}`])}>
                <div className={styles.iconContainerDiamond}>
                    {forkIcon}
                </div>
            </div>
        </div>
    );
};

export default ForkStep;
