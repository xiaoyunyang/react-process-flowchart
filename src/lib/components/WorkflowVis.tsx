// Libraries
import React from "react";

// Styles
import style from "../styles/workflowVis.module.css";

// Components
import Column from "./Column";

// Types
import {
    Matrix, AddNodeParams
} from "../types";

const CSS_GRID_OFFSET = 1;

const getStyleForCol = (i: number) => ({
    gridColumn: CSS_GRID_OFFSET + i,
    gridRow: 1
});

interface Props {
    matrix: Matrix;
    editMode: boolean;
    addNodeParams: AddNodeParams;
}
// TODO: className is not necessary. Inline style determines row and col.
// Only there for debugging
const WorkflowVis = ({ matrix, editMode, addNodeParams }: Props) => (
    <div className={style.wrapper}>
        {
            matrix.map((matrixCol, i) => (
                <div key={`col-${CSS_GRID_OFFSET + i}`} style={getStyleForCol(i)} className={style[`col${CSS_GRID_OFFSET + i}`]}>
                    <Column
                        matrixCol={matrixCol}
                        editMode={editMode}
                        addNodeParams={addNodeParams}
                    />
                </div>
            ))
        }
    </div>
);
export default WorkflowVis;
