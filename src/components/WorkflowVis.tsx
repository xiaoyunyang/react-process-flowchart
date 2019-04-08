/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import './styles/workflowVis.css';

// Components
import { connectors } from "./Connector";
import Column from "./Column";

// Types
import { Matrix, WorkflowVisDataT } from "../types/workflowVis";

const CSS_GRID_OFFSET = 1;

const WorkflowsVis = ({
    workflowVisData, matrix, editMode }: { workflowVisData: WorkflowVisDataT; matrix: Matrix; editMode: boolean }
) => {
    const { workflowStepNodes } = workflowVisData;
    let cols = matrix.map(colNodes =>
        colNodes.map(node => workflowStepNodes[node] ? workflowStepNodes[node] : connectors[node])
    );

    return (
        <div className="wrapper">
            {
                cols.map((col, i) =>
                    (
                        <div key={`col-${CSS_GRID_OFFSET + i}`} className={`col${CSS_GRID_OFFSET + i}`}>
                            <Column colNum={CSS_GRID_OFFSET + i} nodes={col} editMode={editMode} />
                        </div>
                    )
                )
            }
        </div>
    );
};

export default WorkflowsVis;