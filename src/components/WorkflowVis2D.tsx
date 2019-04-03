/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import './styles/workflowVis2D.css';

// Components
import { connectors } from "./connectors";
import Column from "./Column";

import { WorkflowVisDataT } from "../types/workflowVis";

// Utils
import { createGrid } from "../utils/workflowVizUtils";

const CSS_GRID_OFFSET = 1;

const WorkflowsVis = ({ workflowVisData, editMode }: {
    workflowVisData: WorkflowVisDataT; editMode: boolean;
}) => {
    const grid = createGrid(workflowVisData);

    // Each element of grid is a col.

    const grid0 = [
        ["1111-auth"],
        ["standard.arrowRight"],
        ["3902"],
        ["arrowRight"],
        ["51fa"]
    ];
    const grid1 = [
        ["1111-auth"],
        ["standard.arrowRight"],
        ["1111-decision"],
        ["standard.arrowRight"],
        ["3902"],
        ["standard.arrowRight"],
        ["51fa"]
    ];

    const grid2 = [
        ["1111-auth"],
        ["standard.arrowRight"],
        ["3902"],
        ["standard.arrowRight"],
        ["2910"],
        ["standard.arrowRight"],
        ["3bb4"],
        ["standard.arrowRight"],
        ["51fa"]
    ];
    const grid3 = [
        ["1111-auth"],
        ["standard.arrowRight"],
        ["1111-decision", "downRightDiamond"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["3902", "e5d2"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["2910", "rightUpArrow"],
        ["standard.arrowRight"],
        ["3bb4"],
        ["standard.arrowRight"],
        ["51fa"]
    ];

    // const grid = grid3;
    console.log("grid", grid);

    const { workflows } = workflowVisData;
    let cols = grid.map(colNodes =>
        colNodes.map(node => workflows[node] ? workflows[node] : connectors[node])
    );

    console.log(cols);

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