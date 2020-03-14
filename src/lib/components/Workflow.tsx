// Libraries
import React, { useState } from "react";

// Styles
import style from "../styles/workflowVis.module.css";

// Components
import WorkflowVisContainer from "../WorkflowVisContainer";

// UIC
import {
    DefaultWarningIcon,
    DefaultWorkflowStepIcon,
    DefaultForkIcon,
    DefaultDropdownMenu,
    DefaultAddWorkflowStepIcon,
    DefaultDropdown,
    DefaultTooltip
} from "../../defaultUIC";

// Context
import UicContext from "../../context/uic";

// Types
import { WorkflowStep } from "../../config";
import { WorkflowConfig } from "../types";
import ConfigContext from "../../context/config";

interface WorkflowT {
    workflowUid: string;
    workflowName: string;
    workflowSteps: WorkflowStep[];
}

export interface OverwriteProps {
    forkIcon?: typeof DefaultForkIcon;
    warningIcon?: typeof DefaultWarningIcon;
    workflowStepIcon?: typeof DefaultWorkflowStepIcon;
    dropdown?: typeof DefaultDropdown;
    dropdownMenu?: typeof DefaultDropdownMenu;
    tooltip?: typeof DefaultTooltip;
}

interface Props extends OverwriteProps {
    workflow: WorkflowT;
    workflowConfig: WorkflowConfig;
}

const Workflow = ({
    workflow, workflowConfig,
    warningIcon, workflowStepIcon, forkIcon, dropdown, dropdownMenu, tooltip
}: Props) => {
    const [editMode, setEditMode] = useState(false);
    const { workflowUid, workflowName, workflowSteps } = workflow;

    const toggleEditModeLabel = editMode ? "Done" : "Edit";
    const toggleEditClassName = editMode ? "toggleEditHighlight" : "toggleEdit";
    const toggleEditMode = () => setEditMode(!editMode);
    return (
        <div>
            <div className={style.flexContainer}>
                <h1 style={{ maxWidth: 200 }}>{workflowName}</h1>
                <button type="button" className={style[toggleEditClassName]} onClick={toggleEditMode}>
                    {toggleEditModeLabel}
                </button>
            </div>
            <UicContext.Provider value={{
                addWorkflowStepIcon: DefaultAddWorkflowStepIcon,
                warningIcon: warningIcon || DefaultWarningIcon,
                workflowStepIcon: workflowStepIcon || DefaultWorkflowStepIcon,
                forkIcon: forkIcon || DefaultForkIcon,
                dropdown: dropdown || DefaultDropdown,
                dropdownMenu: dropdownMenu || DefaultDropdownMenu,
                tooltip: tooltip || DefaultTooltip
            }}
            >
                <ConfigContext.Provider value={{
                    workflowConfig, workflowId: workflowUid
                }}
                >
                    <WorkflowVisContainer
                        workflowSteps={workflowSteps}
                        editMode={editMode}
                    />
                </ConfigContext.Provider>
            </UicContext.Provider>
        </div>
    );
};

export default Workflow;
