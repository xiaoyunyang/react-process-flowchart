/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import './styles/workflowVis2D.css';

// Components
import { connectors } from "./connectors";
import Column from "./Column";

import { WorkflowVisDataT } from "../types/workflowVis";

// Utils
import { createGrid, populateMatrix } from "../utils/workflowVizUtils";

const CSS_GRID_OFFSET = 1;

const WorkflowsVis = ({ workflowVisData, matrix, editMode }: {
    workflowVisData: WorkflowVisDataT; matrix: string[][]; editMode: boolean;
}) => {
    // const grid = createGrid(workflowVisData);

    // purge all the empty strings from matrix
    let grid = matrix.map(col => {
        return col.filter(tile => tile !== "")
    });
    console.log(grid)
    const gridSave = [
        ["5890236e433b-auth", "box.lineHoriz"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["ba322565b1bf", "diamond.lineHoriz"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["09e6110fda58", "b2b5c4c7cfd7"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["a3135bdf3aa3", "box.lineHoriz"]
    ];

    const gridWorking = [
        ["5890236e433b-auth"],
        ["standard.arrowRight"],
        ["ba322565b1bf", "diamond.downRight"], //TODO: change downRightDiamond to diamond.downRight
        ["standard.arrowRight", "standard.arrowRight"],
        ["09e6110fda58", "b2b5c4c7cfd7"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["a3135bdf3aa3", "box.rightUpArrow"] //TODO: change rightUpArrow to box.rightUpArrow
    ];


    const gridTest = [
        ["5890236e433b-auth", "box.lineHoriz"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["diamond.lineHoriz", "ba322565b1bf", "ba322565b1bf"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["09e6110fda58", "b2b5c4c7cfd7"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["a3135bdf3aa3", "box.lineHoriz"]
    ];

    const gridTestB0 = [
        ["5890236e433b-auth", "box.empty"],
        ["standard.arrowRight", "standard.empty"],
        ["ba322565b1bf", "diamond.downRight"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["09e6110fda58", "b2b5c4c7cfd7"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["a3135bdf3aa3", "box.rightUpArrow"]
    ];
    const gridTestBA = [
        ["5890236e433b-auth", "box.empty"],
        ["standard.arrowRight", "standard.empty"],
        ["ba322565b1bf", "diamond.downRight"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["09e6110fda58", "b2b5c4c7cfd7"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["297786162f15", "box.rightUpArrow"],
        ["standard.arrowRight", "standard.empty"],
        ["492b709fc90a", "box.empty"],
        ["standard.arrowRight", "standard.empty"],
        ["a3135bdf3aa3", "box.empty"]
    ];

    const gridTestBB = [
        ["5890236e433b-auth", "box.empty"],
        ["standard.arrowRight", "standard.empty"],
        ["ba322565b1bf", "diamond.downRight"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["09e6110fda58", "b2b5c4c7cfd7"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["297786162f15", "box.lineHoriz"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["492b709fc90a", "box.rightUpArrow"],
        ["standard.arrowRight", "standard.empty"],
        ["a3135bdf3aa3", "box.empty"]
    ];
    const gridTestBC = [
        ["5890236e433b-auth", "box.empty"],
        ["standard.arrowRight", "standard.empty"],
        ["ba322565b1bf", "diamond.downRight"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["09e6110fda58", "b2b5c4c7cfd7"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["297786162f15", "box.lineHoriz"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["492b709fc90a", "box.lineHoriz"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["a3135bdf3aa3", "box.rightUpArrow"]
    ];
    const gridTestBD = [
        ["5890236e433b-auth", "box.empty"],
        ["standard.arrowRight", "standard.empty"],
        ["ba322565b1bf", "diamond.downRight"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["09e6110fda58", "b2b5c4c7cfd7"],
        ["standard.lineHoriz", "standard.arrowRight"],
        ["box.lineHoriz", "297786162f15"],
        ["standard.lineHoriz", "standard.lineHoriz"],
        ["492b709fc90a", "box.lineHoriz"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["a3135bdf3aa3", "box.rightUpArrow"]
    ];
    const gridTestBE = [
        ["5890236e433b-auth", "box.empty"],
        ["standard.arrowRight", "standard.empty"],
        ["ba322565b1bf", "diamond.downRight"],
        ["standard.arrowRight", "standard.arrowRight"],
        ["09e6110fda58", "b2b5c4c7cfd7"],
        ["standard.lineHoriz", "standard.arrowRight"],
        ["box.lineHoriz", "297786162f15"],
        ["standard.lineHoriz", "standard.arrowRight"],
        ["box.lineHoriz", "492b709fc90a"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["a3135bdf3aa3", "box.rightUpArrow"]
    ];
    const gridTestBF = [
        ["5890236e433b-auth", "box.empty", "box.empty"],
        ["standard.arrowRight", "standard.empty", "standard.empty"],
        ["ba322565b1bf", "diamond.downRight", "diamond.downRight"], // TODO: fix style for diamond.downRight
        ["standard.arrowRight", "standard.arrowRight", "standard.arrowRight"],
        ["09e6110fda58", "b2b5c4c7cfd7", "b2b5c4c7cfd7"],
        ["standard.lineHoriz", "standard.arrowRight", "standard.lineHoriz"],
        ["box.lineHoriz", "297786162f15", "box.lineHoriz"],
        ["standard.lineHoriz", "standard.arrowRight", "standard.lineHoriz"],
        ["box.lineHoriz", "492b709fc90a", "box.rightUpArrow"],
        ["standard.arrowRight", "standard.lineHoriz"],
        ["a3135bdf3aa3", "box.rightUpArrow", "box.empty"]
    ];
    // const gridTestBP = [
    //     ["5890236e433b-auth", "box.downRight"],
    //     ["standard.lineHoriz", "standard.arrowRight"],
    //     ["diamond.lineHoriz", "ba322565b1bf", "diamond.downRight"],
    //     ["standard.arrowRight", "standard.arrowRight", "standard.lineHoriz"],
    //     ["09e6110fda58", "b2b5c4c7cfd7", "rightUpArrow"],
    //     ["standard.arrowRight", "standard.arrowRight"],
    //     ["a3135bdf3aa3", "box.lineHoriz"]
    // ];

    grid = gridTestBA;

    const { workflowStepNodes } = workflowVisData;
    let cols = grid.map(colNodes =>
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