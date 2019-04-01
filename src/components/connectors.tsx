import React from 'react';

// Styles
import './styles/workflowVis2D.css';

export const ArrowRight = () => (
    <div className="arrowRight flexContainer">
        <div className="line" />
        <i className="caret caretRight" />
    </div>
);

export const RightUpArrow = () => (
    <div className="flexContainer rightUpArrow">
        <div className="rightUpBox" />
        <i className="caret caretUp" />
    </div>
);


export const Connector = ({ id }: { id: string }) => {
    const mapping: { [id: string]: JSX.Element } = {
        "downRightArrowDecision": <div className="downRightArrowDecision" />,
        "rightUpBox": <div className="rightUpBox" />,
        "rightUpArrow": <RightUpArrow />,
        "arrowRight": <ArrowRight />
    };
    return mapping[id];
}