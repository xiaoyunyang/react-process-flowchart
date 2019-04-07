import React, { Component } from 'react';
import logo from './logo.svg';

// Styles
import './App.css';

// Data
import workflowsDataMock from "./data/workflowsData";
import { workflowVisData, matrices } from "./components/test/workflowVisMock";

// Components
import WorkflowContainer from "./components/WorkflowContainer";
import WorkflowVis from "./components/WorkflowVis";


const workflowsData: any = workflowsDataMock;
// TODO: there's something wrong with visualizing B-D .slice(3,4)
// Cannot read property 'id' of undefined
// It doesn't work because a workflow step is placed in the wrong row
// of a column that only has one workflow step
const workflowUids = Object.keys(workflowsData).slice(0, 3);

const App = () => (
    <div>
        <div className="flowchartContainer debug">
            {
                workflowUids.map(workflowUid =>
                    <WorkflowContainer key={workflowUid} workflowUid={workflowUid} />
                )
            }
        </div>
        <div className="flowchartContainer" >
            <h1>Vis Demo</h1>
            {
                matrices.map((matrix, i) =>
                    <WorkflowVis key={`test-layout-${i}`} matrix={matrix} workflowVisData={workflowVisData} editMode={false} />
                )
            }
        </div >
    </div >
);

export default App;
