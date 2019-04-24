import React from 'react';
import classNames from "classnames";

// Components
import EditButton from "./EditButton";

// Styles
import styles from './styles/workflowVis.module.css';

// Types
import {
    ConnectorT, ConnectorTypeT, ConnectorName, AddChildNode, AddChildNodeCommand
} from "../types/workflowVisTypes";

export const ArrowRight = () => (
    <div className={classNames(styles.arrowRight, styles.flexContainer)}>
        <div className={classNames(styles.line, styles.lineLong)} />
        <i className={classNames(styles.caret, styles.caretRight)} />
    </div>
);

const noop = () => { };

export const ArrowRightEditable = ({ addChildNode }: { addChildNode: AddChildNode }) => (
    <div className={classNames(styles.arrowRight, styles.flexContainer)}>
        <div className={classNames(styles.line, styles.lineShort)} />
        <EditButton addChildNode={addChildNode} />
        <div className={classNames(styles.line, styles.lineShortArrow)} />
        <i className={classNames(styles.caret, styles.caretRight)} />
    </div>
);

export const LineHoriz = () => <div className={classNames(styles.line, styles.lineLong)} />;

export const LineHorizEditable = ({ addChildNode }: { addChildNode: AddChildNode }) => (
    <div className={classNames(styles.lineHoriz, styles.flexContainer)}>
        <div className={classNames(styles.line, styles.lineShort)} />
        <EditButton addChildNode={addChildNode} />
        <div className={classNames(styles.line, styles.lineShort)} />
    </div>
);

export const RightUpArrow = () => (
    <div className={classNames(styles.flexContainer, styles.rightUpArrow)}>
        <div className={styles.rightUp} />
        <i className={classNames(styles.caret, styles.caretUp)} />
    </div>
);

export const DownRightDashEditable = ({ addChildNode }: { addChildNode: AddChildNode }) => (
    <div className={classNames(styles.flexContainer, styles.downRightDash)}>
        <div className={classNames(styles.downRight)} />
        <EditButton addChildNode={addChildNode} isEmptyBranch />
    </div>
);

export const connectors: { [id: string]: ConnectorT } = {
    "diamond|downRight": {
        id: "diamond|downRight",
        name: ConnectorName.DOWN_RIGHT,
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "box|downRight": {
        id: "box|downRight",
        name: ConnectorName.DOWN_RIGHT,
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "diamond|downRightDash": {
        id: "diamond|downRightDash",
        name: ConnectorName.DOWN_RIGHT_DASH,
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "diamond|downRightDash.edit": {
        id: "diamond|downRightDash.edit",
        name: ConnectorName.DOWN_RIGHT_DASH_EDIT,
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "box|rightUpArrow": {
        id: "box|rightUpArrow",
        name: ConnectorName.RIGHT_UP_ARROW,
        containerName: "connectorContainerBox",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "standard|arrowRight": {
        id: "standard|arrowRight",
        name: ConnectorName.ARROW_RIGHT,
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "standard|arrowRight.edit": {
        id: "standard|arrowRight.edit",
        name: ConnectorName.ARROW_RIGHT_EDIT,
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "box|arrowRight": {
        id: "box|arrowRight",
        name: ConnectorName.ARROW_RIGHT,
        containerName: "connectorContainerBox",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "box|lineHoriz": {
        id: "box|lineHoriz",
        name: ConnectorName.LINE_HORIZ,
        containerName: "connectorContainerBox",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "standard|lineHoriz": {
        id: "standard|lineHoriz",
        name: ConnectorName.LINE_HORIZ,
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "standard|lineHoriz.edit": {
        id: "standard|lineHoriz.edit",
        name: ConnectorName.LINE_HORIZ_EDIT,
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "diamond|lineHoriz": {
        id: "diamond|lineHoriz",
        name: ConnectorName.LINE_HORIZ,
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "diamond|lineHoriz.edit": {
        id: "diamond|lineHoriz.edit",
        name: ConnectorName.LINE_HORIZ_EDIT,
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "diamond|empty": {
        id: "diamond|empty",
        name: ConnectorName.EMPTY,
        containerName: "connectorContainerDiamond",
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "box|empty": {
        id: "box|empty",
        name: ConnectorName.EMPTY,
        containerName: "connectorContainerBox",
        type: ConnectorTypeT.BOX_CONNECTOR
    },
    "standard|empty": {
        id: "standard|empty",
        name: ConnectorName.EMPTY,
        containerName: "connectorContainerStandard",
        type: ConnectorTypeT.STANDARD_CONNECTOR
    }
};


export const connectorComponent = (addChildNode: AddChildNode
): { [name in ConnectorName]: JSX.Element } => {
    const component: { [name in ConnectorName]: JSX.Element } = {
        downRight: <div className={styles.downRight} />,
        downRightDash: <div />,
        "downRightDash.edit": <DownRightDashEditable addChildNode={addChildNode} />,
        rightUpArrow: <RightUpArrow />,
        arrowRight: <ArrowRight />,
        "arrowRight.edit": <ArrowRightEditable addChildNode={addChildNode} />,
        lineHoriz: <LineHoriz />,
        "lineHoriz.edit": <LineHorizEditable addChildNode={addChildNode} />,
        empty: <div />
    };

    return component;
};

const Connector = ({ id, addChildNode }: { id: string; addChildNode: AddChildNode }) => {
    const { name, containerName } = connectors[id];
    return (
        <div className={styles[containerName]}>
            {connectorComponent(addChildNode)[name]}
        </div>
    );
};

export default Connector;
