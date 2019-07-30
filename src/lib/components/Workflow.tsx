/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import style from '../styles/workflowVis.module.css';

// Components
import WorkflowVisContainer from "../WorkflowVisContainer";

// Types
import { WorkflowStepT } from "../../config";


interface StateT {
    editMode: boolean;
}

interface WorkflowT {
    workflowUid: string;
    workflowName: string;
    workflowSteps: WorkflowStepT[];
}

interface PropsT {
    workflow: WorkflowT;
}

export default class Workflow extends React.PureComponent<PropsT, StateT> {
    constructor(props: PropsT) {
        super(props);
        this.state = {
            editMode: false
        };
        this.boundToggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode() {
        const { editMode } = this.state;
        this.setState({ editMode: !editMode });
    }

    boundToggleEditMode: () => void;

    render() {
        const { workflow } = this.props;
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
                    workflowSteps={workflowSteps}
                    editMode={editMode}
                />
            </div>
        );
    }
}
