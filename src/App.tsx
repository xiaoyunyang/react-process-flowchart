import React from 'react';
import logo from './logo.svg';

// Styles
import './App.css';

// Data
import { AA, BA, BB, BC } from "./components/spec/mockWorkflowsData";

import { workflowVisData, matrices } from "./components/spec/mockMatrices";

// Components
import WorkflowContainer from "./components/WorkflowContainer";
import WorkflowVis from "./components/WorkflowVis";


const workflows: any = [AA, BA, BB, BC];
// TODO: there's something wrong with visualizing B-D
// Cannot read property 'id' of undefined
// It doesn't work because a workflow step is placed in the wrong row
// of a column that only has one workflow step

const App = () => (
    <div>
        <div className="flowchartContainer debug">
            {
                workflows.map((workflow: any) =>
                    <WorkflowContainer workflow={workflow} />
                )
            }
        </div>
        <div className="flowchartContainer">
            <h1>Vis Demo</h1>
            {
                matrices.map((matrix, i) =>
                    <WorkflowVis key={`test-layout-${i}`} matrix={matrix} workflowVisData={workflowVisData} editMode={false} />
                )
            }
        </div>
    </div>
);

export default App;
