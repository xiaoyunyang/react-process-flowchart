// Libraries
import React, { ReactNode, useState } from "react";

// Styles
import style from "../styles/workflowVis.module.css";

// Components
import WorkflowVisContainer from "../WorkflowVisContainer";
// UIC
import {
    WarningIcon as DefaultWarningIcon,
    WorkflowStepIcon as DefaultWorkflowStepIcon,
    ForkIcon as DefaultForkIcon
} from "../../defaultUIC";

// Context
import UicContext from "../../context/uic";

// Types
import { WorkflowStep } from "../../config";

interface WorkflowT {
    workflowUid: string;
    workflowName: string;
    workflowSteps: WorkflowStep[];
}

export interface OverwriteProps {
    forkIcon?: ReactNode;
    warningIcon?: ReactNode;
    workflowStepIcon?: (type: string) => ReactNode;
}

interface Props extends OverwriteProps {
    workflow: WorkflowT;
}

const Workflow = ({
    workflow, warningIcon, workflowStepIcon, forkIcon
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
                warningIcon: warningIcon || DefaultWarningIcon,
                workflowStepIcon: workflowStepIcon || DefaultWorkflowStepIcon,
                forkIcon: forkIcon || DefaultForkIcon
            }}
            >
                <WorkflowVisContainer
                    workflowUid={workflowUid}
                    workflowSteps={workflowSteps}
                    editMode={editMode}
                />
            </UicContext.Provider>


        </div>
    );
};

export default Workflow;
