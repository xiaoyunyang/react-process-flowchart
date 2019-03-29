import React from 'react';
import './workflowViz.css';
import {
    DECISION, AUTHORIZE
} from "../types/workflowTypes";

import { iconClassName, workflowStepDisplay } from "../constants/workflowStepDisplay";
import { createGrid } from "../utils/workflowVizUtils";


const uiElement = {
    "elbow-sw-decision": { id: "elbow-sw-decision", type: DECISION },
    "elbow-se-box": { id: "elbow-se-box", type: "BOX" },
    "elbow-se-arrow-box": { id: "elbow-se-arrow-box", type: "BOX" }
};

const Connector = ({ id }) => {
    const mapping = {
        "elbow-sw-decision": <div className="elbow-sw-decision" />,
        "elbow-se-box": <div className="elbow-se-box" />,
        "elbow-se-arrow-box": <ElbowSeArrowBox />,
        "arrow-right": <Arrow />
    };
    return mapping[id];
}


const ElbowSeArrowBox = () => (
    <div className="flex-container elbow-se-arrow-box">
        <div className="elbow-se-box" />
        <i className="arrow-head-up" />
    </div>
);

const Arrow = () => (
    <div className="arrow flex-container">
        <div className="line" />
        <i className="arrow-head-right" />
    </div>
);

const Icon = ({ icon }) => {
    return (
        <div className="icon-container">
            <i className={iconClassName[icon]} />
        </div>
    );
}

const DiamondIcon = ({ icon }) => {
    return (
        <div className="icon-container-diamond">
            <i className={iconClassName[icon]} />
        </div>
    );
}

const DecisionStep = ({ node }) => {
    const { icon, theme } = workflowStepDisplay[DECISION];
    console.log(node)
    if (uiElement[node.id]) {
        return <Connector id={node.id} />;
    }
    return (
        <div className={`diamond flex-container theme-${theme}`}>
            <DiamondIcon icon={icon} />
        </div>
    );
}
const WorkflowStep = ({ node }) => {
    const { name, type } = node;
    if (uiElement[node.id]) {
        console.log("node.id is ", node.id)
        return <Connector id={node.id} />;
    }

    const { icon, theme } = workflowStepDisplay[type];

    // truncate name if too long
    const displayName = name.length > 10 ? `${name.substring(0, 10)}...` : name;

    // TODO: We would like to pass down a noDropDown from props to specify all the workflow
    // types that don't want have dropdown
    const arrowHeadDown = type === AUTHORIZE ? null : <span className="arrow-head-down" />;

    return (
        <div className={`box flex-container theme-${theme}`}>
            <Icon icon={icon} />
            <p>{displayName}{arrowHeadDown}</p>
        </div>
    );
}

const TwoRowBox = ({ leftNode, rightEdge = false }) => {
    return (
        <div className="two-row-wrapper">
            <div className="two-row-left-box">
                {
                    <WorkflowStep node={leftNode} />
                }

            </div>
            <div className="two-row-right">
                {rightEdge &&

                    <Arrow />
                }
            </div>
        </div>
    );

};

const TwoRowDiamond = ({ node }) => (
    <div className="two-row-wrapper-diamond">
        <div className="two-row-left-diamond">
            <DecisionStep node={node} />
        </div>

        <div className="two-row-right">
            <Arrow />
        </div>
    </div>
);

const Column = ({ nodes, hasNext }) => nodes.map(node => (
    <div key={node.id}>
        {
            node.type === DECISION ?
                <TwoRowDiamond node={node} />
                :
                <TwoRowBox leftNode={node} rightEdge={hasNext} />
        }
    </div>
));

const WorkflowsViz = ({ data }) => {
    // const grid = createGrid(data);

    const grid = [
        ["1111-auth"],
        ["1111-decision", "elbow-sw-decision"],
        ["3902", "e5d2"],
        ["2910", "elbow-se-arrow-box"],
        ["3bb4"],
        ["51fa"]
    ];

    console.log("grid", grid);

    // TODO: Each elem of the inner array should be a pair {left, right}
    // This is better at describing the Column left and right than using hasNext.
    const { workflows } = data;
    let cols = grid.map(colNodes =>
        colNodes.map(node => workflows[node] ? workflows[node] : uiElement[node])
    );

    console.log("cols", cols);

    const offset = 1;
    return (
        <div id="flowchart-container">
            <div className="wrapper">
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

export default WorkflowsViz;