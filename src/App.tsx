import React from "react";
import classNames from "classnames";

import logo from "./logo.svg";

// Styles
import "./App.css";
import styles from "./lib/styles/workflowVis.module.css";

// Config
import { iconClassName, DropdownMenu } from "./config/uic";
import { type2IconMapping } from "./config/examples/workflowTypes.cicd";
// Data
import {
    AA, AB, AC, AD, AE,
    BA, BB, BC, BD, BE, BF,
    CD,
    DA, DB, DC, DD, DE,
    MockWorkflowsData
} from "./mocks/mockWorkflowsData";

import { workflowVisData, matrices } from "./mocks/mockMatrices";

// Components
import Workflow, { OverwriteProps } from "./lib/components/Workflow";
import WorkflowVis from "./lib/components/WorkflowVis";

// OVERWRITES =============================================
// TODO: decouple color of warning icon from lib
const WarningIcon = (
    <div style={{
        textAlign: "center",
        top: 3,
        position: "relative",
        fontSize: "inherit"

    }}
    >
        <i className="fas fa-bell" />
    </div>
);

const ForkIcon = <i className="far fa-check-circle" />;
const WorkflowStepIcon = (type: string) => (
    <div style={{ textAlign: "center" }}>
        <i className={iconClassName[type2IconMapping[type]]} />
    </div>
);

// ===========================================================

const workflows: any = [
    AA,
    AB, AC, AD, AE,
    BA, BB, BC, BD, BE, BF,
    DA, DB, DC, DD, DE
    // CD
];

const enableMatrixUnitTest = false;
const enableMatrixUnitTestEditMode = true;
const enableAcceptanceTest = true;
const debugModeOn = false;
const useDefault = false;

// TODO: there's something wrong with visualizing B-D
// Cannot read property 'id' of undefined
// It doesn't work because a workflow step is placed in the wrong row
// of a column that only has one workflow step

const noop = () => () => "foo";

// const addNodeParams = ({}) => ({ workflowStepNodes, coordToNodeId }) => noop;


const overwriteProps: OverwriteProps = useDefault ? {} : {
    warningIcon: WarningIcon,
    forkIcon: ForkIcon,
    workflowStepIcon: WorkflowStepIcon,
    dropdownMenu: DropdownMenu
};

const App = () => (
    <div>
        {enableAcceptanceTest && (
            <div className={
                classNames(
                    styles.flowchartContainer,
                    { [styles.debug]: debugModeOn }
                )
            }
            >
                {
                    workflows.map((
                        workflow: MockWorkflowsData
                    ) => (
                        <Workflow
                            key={workflow.workflowUid}
                            workflow={workflow}
                            {...overwriteProps}
                        />
                    ))
                }
            </div>
        )}
        <div className={styles.flowchartContainer}>
            <h1>WorkflowVis Unit Test</h1>
            {enableMatrixUnitTest
                && matrices.map(({ name, matrix }) => (
                    <div key={`test-layout-${name}`}>
                        <h2>{name}</h2>
                        <WorkflowVis
                            matrix={matrix}
                            // workflowVisData={workflowVisData} // TODO: fix unit test?
                            editMode={enableMatrixUnitTestEditMode}
                            addNodeParams={noop}
                        />
                    </div>
                ))}
        </div>
    </div>
);

export default App;
