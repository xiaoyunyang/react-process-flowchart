// Components
import React from 'react';

// Styles
import './styles/workflowVis.css';

// Types
import { WorkflowStepType } from "../types/workflow";

import { iconClassName, workflowStepConfig } from "../constants/workflowStepConfig";

const DiamondIcon = ({ icon }: { icon: string }) => {
    return (
        <div className="iconContainerDiamond">
            <i className={iconClassName[icon]} />
        </div>
    );
}

const DecisionStep = () => {
    const { icon, theme } = workflowStepConfig[WorkflowStepType.DECISION];
    return (
        <div className="diamondContainer">
            <div className={`diamond flexContainer theme${theme}`}>
                <DiamondIcon icon={icon} />
            </div>
        </div>

    );
}

export default DecisionStep;