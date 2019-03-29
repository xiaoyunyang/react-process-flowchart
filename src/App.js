import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { data1, data12, data2 } from './data/mock';
import WorkflowsViz from "./components/workflowViz";
import WorkflowsViz2D from "./components/workflowViz2D";

class App extends Component {
  render() {
    return (
      <div>
        <WorkflowsViz2D data={data1} />
        <WorkflowsViz data={data1} />
        <WorkflowsViz data={data12} />
        <WorkflowsViz data={data2} />
      </div>

    );
  }
}

export default App;
