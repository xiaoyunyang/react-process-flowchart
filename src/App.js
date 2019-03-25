import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { data1 } from './data/mock';
import {
  AUTHORIZE
} from "./types/workflowTypes";

const iconClassName = {
  pencil: "fas fa-pencil-alt",
  eye: "far fa-eye",
  check: "far fa-check-circle",
  comment: "fas fa-comment",
  inbox: "fas fa-inbox",
  branch: "fas fa-code-branch",
  pause: "fas fa-pause-circle"
};

const workflowStepDisplay = {
  AUTHORIZE: { icon: "", theme: "dark" },
  DECISION: { icon: "branch", theme: "light" },
  ADMIN_APPROVAL: { icon: "inbox", theme: "light" },
  PRE_TRANSLATION: { icon: "pause", theme: "light" },
  TRANSLATION: {icon: "comment", theme: "light" },
  POST_TRANSLATION: { icon: "pencil", theme: "light" },
  REVIEW: { icon: "eye", theme: "light" },
  WORKFLOW_HOLD: { icon: "pause", theme: "light" },
  PUBLISH: { icon: "check", theme: "dark" },
}

const Icon = ({ type }) => {   
    return (
      <div className="icon-container">
        <i className={iconClassName[type]}/>
      </div>
    )
}
const WorkflowStep = ({ name, iconName, theme, type }) => {
  return (
    <div className={`box flex-container theme-${theme}`}>
      <Icon type={type} />
      <p>{name}<span className="arrow-head-down"/></p>
    </div>
  )
}
const TwoRow = ({ leftNode, rightEdge = false }) => {
  const {icon, theme} = workflowStepDisplay[leftNode.type];
  return (
    <div className="two-row-wrapper">
      <div className="two-row-left">
        <WorkflowStep name={leftNode.name} theme={theme} type={icon} />
      </div>
      { rightEdge && (
          <div className="two-row-right">
            <Arrow />
          </div>
        )
      }
    </div>
  );
};

const Arrow = () => (
  <div className="arrow flex-container">
    <div className="line"/>
    <i className="arrow-head-right"/>
  </div>
)

const Column = ({ nodes, hasNext }) => {
  return nodes.map((node, i) => {
    return <TwoRow key={node.id} leftNode={node} rightEdge={hasNext} />
  });
};

// TODO: works for Not totally correct. Need to increase depth
// of level based on branching
const createGrid = ({firstStep, workflows}) => {
  let grid = [[firstStep]];
  let toExplore = [firstStep];
  let explored = {};
  while (toExplore.length > 0) {
    const id = toExplore.shift();
    const workflow = workflows[id];
    const children = workflow.children;

    grid.push([]);
    const lastLevelGrid = grid[grid.length-1];

    children.forEach((child) => {
      if(!explored[child]) {
        toExplore.push(child);
        explored[child] = true;
        lastLevelGrid.push(child);
      }
    })

    if(lastLevelGrid.length === 0) {
      grid.pop();
    }
  }
  return grid;
}

class App extends Component {
  render() {
    const data = data1;

    const grid = createGrid(data);

    const { workflows, firstStep } = data;
    let cols = grid.map(colNodes => 
      colNodes.map(node => workflows[node])
    );

    const authorizeStep = {id: "authorize", name: "Authorize", type: AUTHORIZE, children: [firstStep] };
    cols = [[authorizeStep]].concat(cols)

    const offset = 1;
    
    return (
      <div id="flowchart-container">
        <div className="wrapper">
          {
            cols.map((col, i) => (
              <div key={`col-${offset+i}`} className={`col${offset+i}`}>
                <Column nodes={col} hasNext={i===cols.length-1 ? false : true} />
              </div>)
            )
          }
      </div>
    </div>
    );
  }
}

export default App;
