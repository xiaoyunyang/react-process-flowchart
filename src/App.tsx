import React from 'react';
import classNames from "classnames";

import logo from './logo.svg';

// Styles
import './App.css';
import styles from "./components/styles/workflowVis.module.css";

// Data
import { AA, AB, BA, BB, BC, BD, BE, BF, CD, MockWorkflowsData } from "./components/spec/mockWorkflowsData";

import { workflowVisData, matrices } from "./components/spec/mockMatrices";

// Components
import Workflow from "./components/Workflow";
import WorkflowVis from "./components/WorkflowVis";

const workflows: any = [AA, AB, BA, BB, BC, BD, BE, BF, CD];
const enableMatrixUnitTest = true;

// TODO: there's something wrong with visualizing B-D
// Cannot read property 'id' of undefined
// It doesn't work because a workflow step is placed in the wrong row
// of a column that only has one workflow step

const noop = () => () => "foo";

const App = () => (
    <div>
        <div className={classNames(styles.flowchartContainer, styles.debug)}>
            {
                workflows.map((workflow: MockWorkflowsData) =>
                    <Workflow key={workflow.workflowUid} workflow={workflow} />
                )
            }
        </div>
        <div className={styles.flowchartContainer}>
            <h1>WorkflowVis Unit Test</h1>
            {enableMatrixUnitTest &&
                matrices.map(({ name, matrix }) => {
                    return (
                        <div key={`test-layout-${name}`}>
                            <h2>{name}</h2>
                            <WorkflowVis
                                matrix={matrix}
                                workflowVisData={workflowVisData}
                                editMode={false}
                                addNodeParams={noop}
                            />
                        </div>
                    );
                })
            }
        </div>
    </div>
);

export default App;
