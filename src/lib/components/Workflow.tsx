/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from "react";

// Styles
import style from "../styles/workflowVis.module.css";

// Components
import WorkflowVisContainer from "../WorkflowVisContainer";
// UIC
import { WarningIcon as DefaultWarningIcon } from "../../defaultUIC";

// Types
import { WorkflowStep } from "../../config";


interface StateT {
    editMode: boolean;
}

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

export default class Workflow extends React.PureComponent<Props, StateT> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editMode: false
        };
        this.boundToggleEditMode = this.toggleEditMode.bind(this);
    }

    boundToggleEditMode: () => void;

    toggleEditMode() {
        const { editMode } = this.state;
        this.setState({ editMode: !editMode });
    }


    render() {
        const { workflow, warningIcon } = this.props;
        const { workflowUid, workflowName, workflowSteps } = workflow;

        const { editMode } = this.state;
        const toggleEditModeLabel = editMode ? "Done" : "Edit";
        const toggleEditClassName = editMode ? "toggleEditHighlight" : "toggleEdit";
        return (
            <div>
                <div className={style.flexContainer}>
                    <h1 style={{ maxWidth: 200 }}>{workflowName}</h1>
                    <button type="button" className={style[toggleEditClassName]} onClick={this.boundToggleEditMode}>
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
    }
}
