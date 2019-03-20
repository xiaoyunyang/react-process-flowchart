import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



const step = name => ({ name });
const grid = [
  [step("authorize"), null, null, null],
  [step("agency translate"), step("MT translate"), null, null],
  [null, step("review"), null, null],
  [null, null, step("publish"), null]
];

const Column = ({ data }) => {
  return data.map((step, i) => {
    return step ? (
      <div className={`grid-${i}`}>{step.name}</div>
    ) : (
      <div className={`grid-${i} hidden`}>hidden</div>
    );
  });
};
class App extends Component {
  render() {
    return (
      <div className="wrapper">
      <div className="one subgrid">
        <Column data={grid[0]} />
      </div>
      <div className="two subgrid">
        <Column data={grid[1]} />
      </div>
      <div className="three subgrid">
        <Column data={grid[2]} />
      </div>
      <div className="four subgrid">
        <Column data={grid[3]} />
      </div>
    </div>
    );
  }
}

export default App;
