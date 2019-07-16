import React from 'react';
import classNames from "classnames";

import logo from './logo.svg';

// Styles
import './App.css';
import styles from "./components/styles/workflowVis.module.css";

// Data
import {
    AA, AB, AC, AD, AE,
    BA, BB, BC, BD, BE, BF,
    CD,
    DA, DB, DC, DD, DE,
    MockWorkflowsData
} from "./components/spec/mockWorkflowsData";

import { workflowVisData, matrices } from "./components/spec/mockMatrices";

// Components
import Workflow from "./components/Workflow";
import WorkflowVis from "./components/WorkflowVis";

const workflows: any = [AA, AB, AC, AD, AE, BA, BB, BC, BD, BE, BF, CD, DA, DB, DC, DD, DE];
// const workflows: any = [DE];

const enableMatrixUnitTest = true;
const enableMatrixUnitTestEditMode = true;
const enableAcceptanceTest = true;
const debugModeOn = false;

// TODO: there's something wrong with visualizing B-D
// Cannot read property 'id' of undefined
// It doesn't work because a workflow step is placed in the wrong row
// of a column that only has one workflow step

const noop = () => () => "foo";

const App = () => (
    <div>
        {enableAcceptanceTest && (
            <div className={
                classNames(
                    styles.flowchartContainer,
                    { [styles.debug]: debugModeOn }
                )}
            >
                {
                    workflows.map((workflow: MockWorkflowsData) =>
                        <Workflow key={workflow.workflowUid} workflow={workflow} />
                    )
                }
            </div>
        )}
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
                                editMode={enableMatrixUnitTestEditMode}
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
