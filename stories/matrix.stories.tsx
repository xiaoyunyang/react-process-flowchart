import React from 'react';
import classNames from "classnames";
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

// import WorkflowVis from "../src/lib/components/WorkflowVis";
import Workflow from "../src/lib/components/Workflow";
import { encodedWorkflowStepType } from "../src/config/examples/workflowTypes.cicd";

// Mocks
// import {
//   workflowVisData, matrices,
//   matrixAA, matrixAD
// } from "../src/mocks/mockMatrices";
import {
  AA, AB, AC, AD, AE,
  BA, BB, BC, BD, BE, BF,
  CD,
  DA, DB, DC, DD, DE,
  MockWorkflowsData
} from "../src/mocks/mockWorkflowsData";




// Styles
// TS complains about module not found when we try to import
// the css modules without the .d.ts files present. The workaround
// is to use require.
const styles = require<any>('../src/lib/styles/workflowVis.module.css');
const storyBoookStyles = require<any>('./storybook.module.css');

// const { matrix : linear } = matrices[0];
// const linearWithFork = matrixAA;
// const forked = matrixAD;


const workflows: any = [
  AA, AB, DB
];

storiesOf("WorkflowVis", module)
  .add("Linear", () => (
    <div
      style={{marginLeft: -20}}
      className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper, styles.flowchartContainer)}>
      <Workflow
        key={workflows[0].workflowUid}
        workflow={workflows[0]}
      />
    </div>
  ))
  .add("Linear with Decision", () => (
    <div
      style={{marginLeft: -20}}
      className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper, styles.flowchartContainer)}>
      <Workflow
        key={workflows[1].workflowUid}
        workflow={workflows[1]}
      />
    </div>
  ))
  .add("Forked", () => (
    <div
      style={{marginLeft: -20}}
      className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper, styles.flowchartContainer)}>
      <Workflow
        key={workflows[2].workflowUid}
        workflow={workflows[2]}
      />
    </div>
  ));


// storiesOf("WorkflowVis", module)
  // .add("Linear", () => (
  //   <div className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper)}>
  //     <WorkflowVis
  //       matrix={linear}
  //       workflowVisData={workflowVisData}
  //       editMode={boolean("editMode", false)}
  //       addNodeParams={noop}
  //     />
  //   </div>
  // ));
  // .add("Linear with Fork Step", () => (
  //   <div className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper)}>
  //     <WorkflowVis
  //       matrix={linearWithFork}
  //       workflowVisData={workflowVisData}
  //       editMode={boolean("editMode", false)}
  //       addNodeParams={noop}
  //     />
  //   </div>
  // ))
  // .add("Forked", () => (
  //   <div className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper)}>
  //     <WorkflowVis
  //       matrix={forked}
  //       workflowVisData={workflowVisData}
  //       editMode={boolean("editMode", false)}
  //       addNodeParams={noop}
  //     />
  //   </div>
  // ));