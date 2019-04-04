/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import './styles/workflowVis.css';

// Components
import { connectors } from "./connectors";
import Column from "./Column";

import { WorkflowVisDataT } from "../types/workflowVis";

const CSS_GRID_OFFSET = 1;

const WorkflowsVis = ({ workflowVisData, matrix, editMode }: {
    workflowVisData: WorkflowVisDataT; matrix: string[][]; editMode: boolean;
}) => {
    const { workflowStepNodes } = workflowVisData;
    let cols = matrix.map(colNodes =>
        colNodes.map(node => workflowStepNodes[node] ? workflowStepNodes[node] : connectors[node])
    );

    console.log("====> cols", cols);

    return (
        <div className="wrapper">
            {
                cols.map((col, i) => (
                    <div key={`col-${CSS_GRID_OFFSET + i}`} className={`col${CSS_GRID_OFFSET + i}`}>
                        <Column colNum={CSS_GRID_OFFSET + i} nodes={col} editMode={editMode} />
                    </div>)
                )
            }
        </div>

    )
}

export default WorkflowsVis;