import React from 'react';

// Styles
import './styles/workflowVis2D.css';

// Types
import { ConnectorT, ConnectorType } from "../types/workflowVis";

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

export const LineHoriz = () => <div className="line lineLong" />;

export const LineHorizEditable = () => (
    <div className="lineHoriz flexContainer">
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

export const connectors: { [id: string]: ConnectorT } = {
    "downRightDiamond": {
        id: "downRightDiamond",
        name: "connectorContainerDiamond",
        type: ConnectorType.DIAMOND_CONNECTOR
    },
    "elbowSeBox": {
        id: "elbowSeBox",
        name: "connectorContainerBox",
        type: ConnectorType.BOX_CONNECTOR
    },
    "rightUpArrow": {
        id: "rightUpArrow",
        name: "connectorContainerBox",
        type: ConnectorType.BOX_CONNECTOR
    },
    "standard.arrowRight": {
        id: "standard.arrowRight",
        name: "connectorContainerStandard",
        type: ConnectorType.STANDARD_CONNECTOR
    },
    "standard.arrowRight.edit": {
        id: "standard.arrowRight.edit",
        name: "connectorContainerStandard",
        type: ConnectorType.STANDARD_CONNECTOR
    },
    "box.arrowRight": {
        id: "box.arrowRight",
        name: "connectorContainerBox",
        type: ConnectorType.STANDARD_CONNECTOR
    },
    "standard.lineHoriz": {
        id: "standard.lineHoriz",
        name: "connectorContainerStandard",
        type: ConnectorType.STANDARD_CONNECTOR
    },
    "standard.lineHoriz.edit": {
        id: "standard.lineHoriz.edit",
        name: "connectorContainerStandard",
        type: ConnectorType.STANDARD_CONNECTOR,
    },
};

export const Connector = ({ id }: { id: string }) => {
    const mapping: { [id: string]: JSX.Element } = {
        "downRightDiamond": <div className="downRightDiamond" />,
        "rightUpArrow": <RightUpArrow />,
        "standard.arrowRight": <ArrowRight />,
        "box.arrowRight": <ArrowRight />,
        "standard.arrowRight.edit": <ArrowRightEditable />,
        "standard.lineHoriz": <LineHoriz />,
        "standard.lineHoriz.edit": <LineHorizEditable />
    };

    return (
        <div className={connectors[id].name}>
            {mapping[id]}
        </div>
    );
}