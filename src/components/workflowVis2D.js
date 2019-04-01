import React from 'react';
import './styles/workflowVis2D.css';
import {
    DECISION, AUTHORIZE
} from "../types/workflowTypes";

import { iconClassName, workflowStepDisplay } from "../constants/workflowStepDisplay";
import { createGrid } from "../utils/workflowVizUtils";


const uiElement = {
    "downRightArrowDecision": { id: "downRightArrowDecision", type: DECISION },
    "elbowSeBox": { id: "elbowSeBox", type: "BOX" },
    "rightUpArrow": { id: "rightUpArrow", type: "BOX" }
};

const Connector = ({ id }) => {
    const mapping = {
        "downRightArrowDecision": <div className="downRightArrowDecision" />,
        "rightUpBox": <div className="rightUpBox" />,
        "rightUpArrow": <RightUpArrow />,
        "arrowRight": <Arrow />
    };
    return mapping[id];
}


const RightUpArrow = () => (
    <div className="flexContainer rightUpArrow">
        <div className="rightUpBox" />
        <i className="caret caretUp" />
    </div>
);

const Arrow = () => (
    <div className="arrowRight flexContainer">
        <div className="line" />
        <i className="caret caretRight" />
    </div>
);

const Icon = ({ icon }) => {
    return (
        <div className="iconContainer">
            <i className={iconClassName[icon]} />
        </div>
    );
}

const DiamondIcon = ({ icon }) => {
    return (
        <div className="iconContainerDiamond">
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
        <div className={`diamond flexContainer theme${theme}`}>
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
    const arrowHeadDown = type === AUTHORIZE ? null : <span className="caret caretDown" />;

    return (
        <div className={`box flexContainer theme${theme}`}>
            <Icon icon={icon} />
            <p>{displayName}{arrowHeadDown}</p>
        </div>
    );
}

const TwoRowBox = ({ leftNode, rightEdge = false }) => {
    return (
        <div className="twoRowWrapper">
            <div className="twoRowLeftBox">
                {
                    <WorkflowStep node={leftNode} />
                }

            </div>
            <div className="twoRowRight">
                {rightEdge &&
                    <Arrow />
                }
            </div>
        </div>
    );

};

const TwoRowDiamond = ({ node }) => (
    <div className="twoRowWrapperDiamond">
        <div className="twoRowLeftDiamond">
            <DecisionStep node={node} />
        </div>

        <div className="twoRowRight">
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

const WorkflowsVis = ({ data }) => {
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
    const { workflows } = data;
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