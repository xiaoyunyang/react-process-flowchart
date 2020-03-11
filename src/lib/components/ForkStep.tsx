// Components
import React, { useContext } from "react";
import classNames from "classnames";

// Styles
import styles from "../styles/workflowVis.module.css";

// Context
import UicContext from "../../context/uic";

// Types
import { encodedNodeType, workflowStepConfig } from "../../config";

const ForkStep = () => {
    const { forkIcon } = useContext(UicContext);
    const { theme } = workflowStepConfig[encodedNodeType.fork];
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
