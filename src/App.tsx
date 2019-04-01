import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { data1, data12, data2 } from './data/mock';
import WorkflowsViz from "./components/workflowViz";
import WorkflowsVis2D from "./components/WorkflowVis2D";

interface State {
    editMode: boolean;
}
type PropsT = any;

class App extends React.PureComponent<PropsT, State> {
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
        const { editMode } = this.state;
        const toggleEditModeLabel = editMode ? "Done" : "Edit";
        const toggleEditClassName = editMode ? "toggleEditHighlight" : "toggleEdit";
        return (
            <div id="flowchartContainer">
                <button className={toggleEditClassName} onClick={this.boundToggleEditMode}>
                    {toggleEditModeLabel}
                </button>
                <WorkflowsVis2D workflowVisData={data1} editMode={editMode} />
                <WorkflowsViz data={data1} />
                <WorkflowsViz data={data12} />
                <WorkflowsViz data={data2} />
            </div>

        );
    }
}

export default App;
