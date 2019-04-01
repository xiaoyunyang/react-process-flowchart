/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import './styles/workflowVis2D.css';

// Types
import { WorkflowStepType } from "../types/workflow";

// Components
import { RightUpArrow, ArrowRight, Connector } from "./connectors";
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
    { leftNode, rightEdge = false }: { leftNode: NodeT; rightEdge: boolean }
) => {
    const { name, type } = leftNode;

    return (
        <div className="twoRowWrapper">
            <WorkflowStep node={leftNode} />
            {rightEdge && (
                <div className="twoRowRight">
                    <ArrowRight />
                </div>)
            }
        </div>
    );
};


const TwoRowDiamond = ({ node }: { node: NodeT }) => (
    <div className="twoRowWrapperDiamond">
        <div className="twoRowLeftDiamond">
            <DecisionStep node={node} />
        </div>

        <div className="twoRowRight">
            <ArrowRight />
        </div>
    </div>
);

const Column = ({ nodes, hasNext }: { nodes: any; hasNext: boolean }) => nodes.map((node: NodeT) => (
    <div key={node.id}>
        {
            node.type === WorkflowStepType.DECISION ?
                <TwoRowDiamond node={node} />
                :
                <TwoRowBox leftNode={node} rightEdge={hasNext} />
        }
    </div>
));

const WorkflowsVis = ({ workflowVisData }: { workflowVisData: WorkflowVisDataT }) => {
    // const grid = createGrid(data);

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
        <div id="flowchartContainer">
            <div className="wrapperWithDecisionStep">
                {
                    cols.map((col, i) => (
                        <div key={`col-${offset + i}`} className={`col${offset + i}`}>
                            <Column nodes={col} hasNext={i === cols.length - 1 ? false : true} />
                        </div>)
                    )
                }
            </div>
        </div>
    )
}

export default WorkflowsVis;