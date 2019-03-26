import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { data1, data12, data2 } from './data/mock';
import WorkflowsViz from "./components/workflowViz";

class App extends Component {
  render() {
    return (
      <div>
        <WorkflowsViz data={data1} />
        <WorkflowsViz data={data12} />
        <WorkflowsViz data={data2} />
      </div>

    );
  }
}

export default App;
