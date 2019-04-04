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
const workflowUids = Object.keys(workflowsData);

const App = () => (
    <div id="flowchartContainer">
        {
            workflowUids.map(workflowUid =>
                <WorkflowContainer key={workflowUid} workflowUid={workflowUid} />
            )
        }
        <h1>Vis Demo</h1>
        {
            matrices.map((matrix, i) =>
                <WorkflowVis key={`test-layout-${i}`} matrix={matrix} workflowVisData={workflowVisData} editMode={false} />
            )
        }
    </div>
);

export default App;
