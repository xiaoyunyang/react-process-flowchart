/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import './styles/workflowVis2D.css';

// Types
import { WorkflowStepType } from "../types/workflow";

// Components
import { RightUpArrow, ArrowRight, ArrowRightEditable, Connector } from "./connectors";
import WorkflowStep, { uiElement } from "./WorkflowStep";

import { iconClassName, workflowStepConfig } from "../constants/workflowStepConfig";
import { createGrid, NodeT, WorkflowVisDataT } from "../utils/workflowVizUtils";


const DiamondIcon = ({ icon }: { icon: string }) => {
    return (
        <div className="iconContainerDiamond">
            <i className={iconClassName[icon]} />
        </div>
    );
}

const DecisionStep = ({ node }: { node: any }) => {
    const { icon, theme } = workflowStepConfig[WorkflowStepType.DECISION];
    console.log(node)
    if (uiElement[node.id]) {
        return <Connector id={node.id} />;
    }
    return (
        <div className={`diamond flexContainer theme${theme}`}>
            <DiamondIcon icon={icon} />
        </div>
    );
}


const TwoRowBox = (
    { leftNode, rightEdge = false, editMode }: {
        leftNode: NodeT; rightEdge: boolean; editMode: boolean;
    }) => {
    const { name, type } = leftNode;

    return (
        <div className="twoRowWrapper">
            <WorkflowStep node={leftNode} />
            {rightEdge && (
                <div className="twoRowRight">
                    {
                        editMode ? <ArrowRightEditable /> : <ArrowRight />
                    }
                </div>)
            }
        </div>
    );
};


const TwoRowDiamond = ({ node, editMode }: { node: NodeT; editMode: boolean }) => (
    <div className="twoRowWrapperDiamond">
        <div className="twoRowLeftDiamond">
            <DecisionStep node={node} />
        </div>

        <div className="twoRowRight">
            {
                editMode ? <ArrowRightEditable /> : <ArrowRight />
            }
        </div>
    </div>
);

const Column = ({ nodes, hasNext, editMode }: {
    nodes: any; hasNext: boolean; editMode: boolean;
}) => nodes.map((node: NodeT) => (
    <div key={node.id}>
        {
            node.type === WorkflowStepType.DECISION ?
                <TwoRowDiamond node={node} editMode={editMode} />
                :
                <TwoRowBox leftNode={node} rightEdge={hasNext} editMode={editMode} />
        }
    </div>
));

const WorkflowsVis = ({ workflowVisData, editMode }: {
    workflowVisData: WorkflowVisDataT; editMode: boolean;
}) => {
    // const grid = createGrid(data);

    // Each element of grid is a col.
    const grid = [
        ["1111-auth"],
        ["1111-decision", "downRightArrowDecision"],
        ["3902", "e5d2"],
        ["2910", "rightUpArrow"],
        ["3bb4"],
        ["51fa"]
    ];

    console.log("grid", grid);

    // TODO: Each elem of the inner array should be a pair {left, right}
    // This is better at describing the Column left and right than using hasNext.
    const { workflows } = workflowVisData;
    let cols = grid.map(colNodes =>
        colNodes.map(node => workflows[node] ? workflows[node] : uiElement[node])
    );

    const offset = 1;
    return (
        <div className="wrapperWithDecisionStep">
            {
                cols.map((col, i) => (
                    <div key={`col-${offset + i}`} className={`col${offset + i}`}>
                        <Column nodes={col} editMode={editMode} hasNext={i === cols.length - 1 ? false : true} />
                    </div>)
                )
            }
        </div>

    )
}

export default WorkflowsVis;