/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import style from './styles/workflowVis.module.css';

// Components
import { connectors } from "./Connector";
import Column from "./Column";

// Types
import { Matrix, WorkflowVisDataT } from "../types/workflowVis";

const CSS_GRID_OFFSET = 1;
const getStyleForCol = (i: number) => ({
    gridColumn: CSS_GRID_OFFSET + i,
    gridRow: 1
});

const WorkflowsVis = ({
    workflowVisData, matrix, editMode }: { workflowVisData: WorkflowVisDataT; matrix: Matrix; editMode: boolean }
) => {
    const { workflowStepNodes } = workflowVisData;
    let cols = matrix.map(colNodes =>
        colNodes.map(node => workflowStepNodes[node] ? workflowStepNodes[node] : connectors[node])
    );

    // TODO: className is not necessary. Inline style determines row and col. Only there for debugging
    return (
        <div className={style.wrapper}>
            {
                cols.map((col, i) =>
                    (
                        <div key={`col-${CSS_GRID_OFFSET + i}`} style={getStyleForCol(i)} className={style[`col${CSS_GRID_OFFSET + i}`]}>
                            <Column colNum={CSS_GRID_OFFSET + i} nodes={col} editMode={editMode} />
                        </div>
                    )
                )
            }
        </div>
    );
};

export default WorkflowsVis;