import React from 'react';

// Styles
import './styles/workflowVis2D.css';

export const ArrowRight = () => (
    <div className="arrowRight flexContainer">
        <div className="line lineLong" />
        <i className="caret caretRight" />
    </div>
);

export const ArrowRightEditable = () => (
    <div className="arrowRight flexContainer">
        <div className="line lineShort" />
        <span className="circle" >
            <i className="fas fa-plus" />
        </span>
        <div className="line lineShort" />
        <i className="caret caretRight" />
    </div>
);

export const Line = () => <div className="line lineLong" />;

export const LineEditable = () => (
    <div className="arrowRight flexContainer">
        <div className="line lineShort" />
        <span className="circle" >
            <i className="fas fa-plus" />
        </span>
        <div className="line lineShort" />
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
        "arrowRight": <ArrowRight />,
        "arrowRightEditable": <ArrowRightEditable />,
        "line": <Line />,
        "lineEditable": <LineEditable />
    };
    return mapping[id];
}