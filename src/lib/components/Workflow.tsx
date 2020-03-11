// Libraries
import React, { ReactNode, useState } from "react";

// Styles
import style from "../styles/workflowVis.module.css";

// Components
import WorkflowVisContainer from "../WorkflowVisContainer";
// UIC
import { WarningIcon as DefaultWarningIcon } from "../../defaultUIC";

// Types
import { WorkflowStep } from "../../config";

interface WorkflowT {
    workflowUid: string;
    workflowName: string;
    workflowSteps: WorkflowStep[];
}

export interface OverwriteProps {
    warningIcon?: ReactNode;
}

interface Props extends OverwriteProps {
    workflow: WorkflowT;
}

const Workflow = ({ workflow, warningIcon }: Props) => {
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

            <WorkflowVisContainer
                workflowUid={workflowUid}
                warningIcon={warningIcon || DefaultWarningIcon}
                workflowSteps={workflowSteps}
                editMode={editMode}
            />
        </div>
    );
};

export default Workflow;
