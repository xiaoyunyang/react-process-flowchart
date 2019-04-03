import React, { Component } from 'react';
import logo from './logo.svg';

// Styles
import './App.css';

// Data
import { data1, data12, data2 } from './data/mock';
import workflowsDataMock from "./data/workflowsData";

// Components
import WorkflowViz from "./components/workflowViz";
import WorkflowContainer from "./components/WorkflowContainer";

const workflowsData: any = workflowsDataMock;
const workflowUids = Object.keys(workflowsData);

const App = () => (
    <div id="flowchartContainer">
        {
            workflowUids.map(workflowUid =>
                <WorkflowContainer key={workflowUid} workflowUid={workflowUid} />
            )
        }
        <WorkflowViz data={data1} />
        <WorkflowViz data={data12} />
        <WorkflowViz data={data2} />
    </div>

);

export default App;
