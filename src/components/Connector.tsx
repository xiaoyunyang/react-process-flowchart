import React from 'react';

// Styles
import './styles/workflowVis.css';

// Types
import { ConnectorT, ConnectorTypeT } from "../types/workflowVis";

export const ArrowRight = () => (
    <div className="arrowRight flexContainer">
        <div className="line lineLong" />
        <i className="caret caretRight" />
    </div>
);

export const ArrowRightEditable = () => (
    <div className="arrowRight flexContainer">
        <div className="line lineShort" />
        <span className="circle">
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
        <span className="circle">
            <i className="fas fa-plus" />
        </span>
        <div className="line lineShort" />
    </div>
);

export const RightUpArrow = () => (
    <div className="flexContainer rightUpArrow">
        <div className="rightUp" />
        <i className="caret caretUp" />
    </div>
);

export const connectors: { [id: string]: ConnectorT } = {
    "diamond.downRight": {
        id: "diamond.downRight",
        name: "downRight",
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "box.downRight": {
        id: "box.downRight",
        name: "downRight",
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "box.rightUpArrow": {
        id: "box.rightUpArrow",
        name: "rightUpArrow",
        containerName: "connectorContainerBox",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "standard.arrowRight": {
        id: "standard.arrowRight",
        name: "arrowRight",
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "standard.arrowRight.edit": {
        id: "standard.arrowRight.edit",
        name: "arrowRight.edit",
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "box.arrowRight": {
        id: "box.arrowRight",
        name: "arrowRight",
        containerName: "connectorContainerBox",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "box.lineHoriz": {
        id: "box.lineHoriz",
        name: "lineHoriz",
        containerName: "connectorContainerBox",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "standard.lineHoriz": {
        id: "standard.lineHoriz",
        name: "lineHoriz",
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "standard.lineHoriz.edit": {
        id: "standard.lineHoriz.edit",
        name: "lineHoriz.edit",
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR,
    },
    "diamond.lineHoriz": {
        id: "diamond.lineHoriz",
        name: "lineHoriz",
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR,
    },
    "diamond.lineHoriz.edit": {
        id: "diamond.lineHoriz.edit",
        name: "lineHoriz.edit",
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR,
    },
    "diamond.empty": {
        id: "diamond.empty",
        name: "empty",
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR,
    },
    "box.empty": {
        id: "box.empty",
        name: "empty",
        containerName: "connectorContainerBox",
        type: ConnectorTypeT.BOX_CONNECTOR,
    },
    "standard.empty": {
        id: "standard.empty",
        name: "empty",
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR,
    },
    "standard.empty.edit": {
        id: "standard.empty",
        name: "empty",
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR,
    }
};

export const connectorComponent: { [id: string]: JSX.Element } = {
    "downRight": <div className="downRight" />,
    "rightUpArrow": <RightUpArrow />,
    "arrowRight": <ArrowRight />,
    "arrowRight.edit": <ArrowRightEditable />,
    "lineHoriz": <LineHoriz />,
    "lineHoriz.edit": <LineHorizEditable />,
    "empty": <div className="empty" />
};

const Connector = ({ id }: { id: string }) => {
    const { name, containerName } = connectors[id];
    return (
        <div className={containerName}>
            {connectorComponent[name]}
        </div>
    );
};

export default Connector;