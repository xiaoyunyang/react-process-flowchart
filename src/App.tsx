import React from 'react';
import classNames from "classnames";

import logo from './logo.svg';

// Styles
import './App.css';
import styles from "./components/styles/workflowVis.module.css";

// Data
import { AA, AB, BA, BB, BC, MockWorkflowsData } from "./components/spec/mockWorkflowsData";

import { workflowVisData, matrices } from "./components/spec/mockMatrices";

// Components
import WorkflowContainer from "./components/WorkflowContainer";
import WorkflowVis from "./components/WorkflowVis";


const workflows: any = [AA, AB, BA, BB, BC];
// TODO: there's something wrong with visualizing B-D
// Cannot read property 'id' of undefined
// It doesn't work because a workflow step is placed in the wrong row
// of a column that only has one workflow step

const noop = () => () => () => { };

const App = () => (
    <div>
        <div className={classNames(styles.flowchartContainer, styles.debug)}>
            {
                workflows.map((workflow: MockWorkflowsData) =>
                    <WorkflowContainer key={workflow.workflowUid} workflow={workflow} />
                )
            }
        </div>
        <div className={styles.flowchartContainer}>
            <h1>Vis Demo</h1>
            {
                matrices.map((matrix, i) =>
                    // eslint-disable-next-line react/no-array-index-key
                    <WorkflowVis key={`test-layout-${i}`} matrix={matrix} workflowVisData={workflowVisData} editMode={false} addNodeToVis={noop} />
                )
            }
        </div>
    </div>
);

export default App;
