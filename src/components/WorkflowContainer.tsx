/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import './styles/workflowVis2D.css';
import './styles/workflowViz.css';

// Components
import WorkflowVisContainer from "./WorkflowVisContainer";

// Data
import workflowsDataMock from "../data/workflowsData";

// Constants - Temp. Dummy Data
const workflowNameLUT: { [id: string]: string } = {
    "5890236e433b": "B-A",
    "6a000972b9b4": "B-B",
    "ced08d24af21": "B-C",
    "34779d99f25d": "B-D",
    "c26dfe7f5a1a": "B-E",
    "28fb8c360358": "B-F",
    "670086456c82": "C-D",
}

const workflowsData: any = workflowsDataMock;


interface StateT {
    editMode: boolean;
}

interface PropsT {
    workflowUid: string;
}

export default class WorkflowContainer extends React.PureComponent<PropsT, StateT> {
    constructor(props: PropsT) {
        super(props);
        this.state = {
            editMode: false
        }
        this.boundToggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode() {
        this.setState({ editMode: !this.state.editMode });
    }

    boundToggleEditMode: () => void;

    render() {
        const { workflowUid } = this.props;
        const workflowSteps = workflowsData[workflowUid];
        const workflowName = workflowNameLUT[workflowUid];

        const { editMode } = this.state;
        const toggleEditModeLabel = editMode ? "Done" : "Edit";
        const toggleEditClassName = editMode ? "toggleEditHighlight" : "toggleEdit";

        return (
            <div>
                <div className="flexContainer">
                    <h1 style={{ maxWidth: 200 }}>{workflowName}</h1>
                    <button className={toggleEditClassName} onClick={this.boundToggleEditMode}>
                        {toggleEditModeLabel}
                    </button>
                </div>

                <WorkflowVisContainer
                    workflowUid={workflowUid}
                    workflowSteps={workflowSteps}
                    editMode={editMode}
                />
            </div>
        )
    }
}
