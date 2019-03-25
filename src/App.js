import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { data1, data12, data2 } from './data/mock';
import {
  DECISION
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
  AUTHORIZE: { icon: "inbox", theme: "dark" },
  DECISION: { icon: "branch", theme: "light" },
  ADMIN_APPROVAL: { icon: "inbox", theme: "light" },
  PRE_TRANSLATION: { icon: "pause", theme: "light" },
  TRANSLATION: { icon: "comment", theme: "light" },
  POST_TRANSLATION: { icon: "pencil", theme: "light" },
  REVIEW: { icon: "eye", theme: "light" },
  WORKFLOW_HOLD: { icon: "pause", theme: "light" },
  PUBLISH: { icon: "check", theme: "dark" },
}

const Icon = ({ icon }) => {
  return (
    <div className="icon-container">
      <i className={iconClassName[icon]} />
    </div>
  );
}

const DiamondIcon = ({ icon }) => {
  return (
    <div className="icon-container-diamond">
      <i className={iconClassName[icon]} />
    </div>
  );
}

const DecisionStep = () => {
  const { icon, theme } = workflowStepDisplay[DECISION];
  return (
    <div className={`diamond flex-container theme-${theme}`}>
      <DiamondIcon icon={icon} />
    </div>
  );
}
const WorkflowStep = ({ name, type }) => {
  const { icon, theme } = workflowStepDisplay[type];

  return (
    <div className={`box flex-container theme-${theme}`}>
      <Icon icon={icon} />
      <p>{name}<span className="arrow-head-down" /></p>
    </div>
  )
}

const Arrow = () => (
  <div className="arrow flex-container">
    <div className="line" />
    <i className="arrow-head-right" />
  </div>
);


const TwoRowBox = ({ leftNode, rightEdge = false }) => {
  const { name, type } = leftNode;

  return (
    <div className="two-row-wrapper">
      <div className="two-row-left-box">
        <WorkflowStep name={name} type={type} />
      </div>
      {rightEdge && (
        <div className="two-row-right">
          <Arrow />
        </div>)
      }
    </div>
  );
};

const TwoRowDiamond = () => (
  <div className="two-row-wrapper-diamond">
    <div className="two-row-left-diamond">
      <DecisionStep />
    </div>

    <div className="two-row-right">
      <Arrow />
    </div>
  </div>
);

const Column = ({ nodes, hasNext }) => nodes.map(node => (
  <div key={node.id}>
    {
      node.type === DECISION ?
        <TwoRowDiamond />
        :
        <TwoRowBox leftNode={node} rightEdge={hasNext} />
    }
  </div>
));

// TODO: works for Not totally correct. Need to increase depth
// of level based on branching
const createGrid = ({ firstStep, workflows }) => {
  let grid = [[firstStep]];
  let toExplore = [firstStep];
  let explored = {};
  while (toExplore.length > 0) {
    const [id, ...rest] = toExplore;
    toExplore = rest;
    const workflow = workflows[id];
    const { children } = workflow;

    grid = grid.concat([[]]);

    // eslint-disable-next-line no-loop-func
    children.forEach((child) => {
      if (!explored[child]) {
        toExplore = toExplore.concat(child);
        explored[child] = true;
        grid[grid.length - 1] = grid[grid.length - 1].concat(child);
      }
    });

    if (grid[grid.length - 1].length === 0) {
      grid = grid.slice(0, -1);
    }
  }
  return grid;
}

const WorkflowsViz = ({ data }) => {
  const grid = createGrid(data);

  const { workflows } = data;
  let cols = grid.map(colNodes =>
    colNodes.map(node => workflows[node])
  );

  const offset = 1;
  return (
    <div id="flowchart-container">
      <div className="wrapper">
        {
          cols.map((col, i) => (
            <div key={`col-${offset + i}`} className={`col${offset + i}`}>
              <Column nodes={col} hasNext={i === cols.length - 1 ? false : true} />
            </div>)
          )
        }
      </div>
    </div>
  )
}

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
