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

const TwoRow = ({ leftNode, rightEdge = false}) => {
  return (
    <div className="two-row-wrapper">
      <div className="col1-inner">
          <div className="box">
            {leftNode.name}
          </div>
      </div>
      { rightEdge && (
          <div className="col2-inner">
            <Arrow />
          </div>
        )
      }
    </div>
  );
};

const Arrow = () => (
  <div className="arrow">
    <div className="line"/>
    <i class="arrow-head-right"/>
  </div>
)

class App extends Component {
  render() {
    return (
      <div id="flowchart-container">
        <div className="wrapper">
          <div className="col1">
            <TwoRow leftNode={{name: "foo"}} rightEdge={true}/>
            <TwoRow leftNode={{name: "foo"}} rightEdge={true}/>
            <TwoRow leftNode={{name: "foo"}} rightEdge={true}/>
          </div>
          <div className="col2">
            <TwoRow leftNode={{name: "foo"}} rightEdge={true}/>
            <TwoRow leftNode={{name: "foo"}} rightEdge={true}/>
          </div>
          <div className="col3">
            <TwoRow leftNode={{name: "foo"}} rightEdge={true}/>
          </div>
          <div className="col4">
            <TwoRow leftNode={{name: "foo"}}/>
          </div>
      </div>
    </div>
    );
  }
}

export default App;
