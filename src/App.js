import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const step = name => ({ name });
const grid = [
  [step("authorize"), null, null, null],
  [step("agency translate agency translateagency translateagency translateagency translateagency translateagency translateagency translate "), step("MT translate"), null, null],
  [null, step("review"), null, null],
  [null, null, step("publish"), null]
];

const Column = ({ data }) => {
  return data.map((step, i) => {
    return step ? (
      <div key={`column-${i}`} className={`row${i}`}>{step.name}</div>
    ) : (
      <div key={`column-${i}`} className={`row${i} hidden`}>hidden</div>
    );
  });
};

const iconClassName = {
  pencil: "fas fa-pencil-alt",
  eye: "far fa-eye",
  check: "far fa-check-circle",
  comment: "fas fa-comment",
  inbox: "fas fa-inbox"
};

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
const TwoRow = ({ leftNode, rightEdge = false, theme = "light", type}) => {
  return (
    <div className="two-row-wrapper">
      <div className="two-row-left">
        <WorkflowStep name={leftNode.name} theme={theme} type={type} />
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

class App extends Component {
  render() {
    return (
      <div id="flowchart-container">
        <div className="wrapper">
          <div className="col1">
            <TwoRow leftNode={{name: "Authorize"}} rightEdge={true} theme={"dark"} type={"inbox"}/>
            <TwoRow leftNode={{name: "foo"}} rightEdge={true} theme={"dark"} />
            <TwoRow leftNode={{name: "foo"}} rightEdge={true} theme={"dark"} />
          </div>
          <div className="col2">
            <TwoRow leftNode={{name: "Agency Transl."}} rightEdge={true} type={"comment"}/>
            <TwoRow leftNode={{name: "Agency Transl."}} rightEdge={true} type={"pencil"}/>
          </div>
          <div className="col3">
            <TwoRow leftNode={{name: "Edit"}} rightEdge={true} type={"pencil"}/>
          </div>
          <div className="col4">
            <TwoRow leftNode={{name: "Review"}} rightEdge={true} type={"eye"}/>
          </div>
          <div className="col5">
            <TwoRow leftNode={{name: "Publish"}} theme={"dark"} type={"check"}/>
          </div>
      </div>
    </div>
    );
  }
}

export default App;
