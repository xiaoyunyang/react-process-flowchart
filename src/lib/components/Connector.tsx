import React from 'react';
import classNames from "classnames";

// Components
import EditButton from "./EditButton";

// Styles
import styles from "../styles/workflowVis.module.css";

// Types
import {
    ContainerNameT,
    ConnectorT, ConnectorTypeT, ConnectorName, CreateAddChildNodeCommand
} from "../types/workflowVisTypes";

export const ArrowRight = () => (
    <div className={classNames(styles.arrowRight, styles.flexContainer)}>
        <div className={classNames(styles.line, styles.lineLong)} />
        <i className={classNames(styles.caret, styles.caretRight)} />
    </div>
);

export const ArrowRightEditable = (
    { createAddChildNodeCommand }: { createAddChildNodeCommand: CreateAddChildNodeCommand }
) =>
    (
        <div className={classNames(styles.arrowRight, styles.flexContainer)}>
            <div className={classNames(styles.line, styles.lineShort)} />
            <EditButton createAddChildNodeCommand={createAddChildNodeCommand} />
            <div className={classNames(styles.line, styles.lineShortArrow)} />
            <i className={classNames(styles.caret, styles.caretRight)} />
        </div>
    );

export const LineHoriz = () => <div className={classNames(styles.line, styles.lineLong)} />;

export const LineVert = () => (
    <div className={styles.lineVertContainer}>
        <div className={styles.lineVert} />
    </div>
);

export const LineHorizEditable = (
    { createAddChildNodeCommand }: { createAddChildNodeCommand: CreateAddChildNodeCommand }
) =>
    (
        <div className={classNames(styles.lineHoriz, styles.flexContainer)}>
            <div className={classNames(styles.line, styles.lineShort)} />
            <EditButton createAddChildNodeCommand={createAddChildNodeCommand} />
            <div className={classNames(styles.line, styles.lineShort)} />
        </div>
    );

export const RightUpArrow = () => (
    <div className={classNames(styles.flexContainer, styles.rightUpArrow)}>
        <div className={styles.rightUp} />
        <i className={classNames(styles.caret, styles.caretUp)} />
    </div>
);

export const RightUp = () => (
    <div className={classNames(styles.rightUpContainer)}>
        <div className={styles.rightUp} />
    </div>
);

export const ArrowUp = () => (
    <div className={classNames(styles.flexContainer, styles.arrowUp)}>
        <div className={styles.lineVert} />
        <i className={classNames(styles.caret, styles.caretUp)} />
    </div>
);

export const DownRightDashEditable = ({ createAddChildNodeCommand }: { createAddChildNodeCommand: CreateAddChildNodeCommand }) => (
    <div className={classNames(styles.flexContainer, styles.downRightDash)}>
        <div className={classNames(styles.downRight)} />
        <EditButton createAddChildNodeCommand={createAddChildNodeCommand} isEmptyBranch />
    </div>
);

// TODO: type's value is irrelevant as long as they come from a ConnectorTypeT.
// Can we simplify this?
export const connectors: { [id: string]: ConnectorT } = {
    "diamond|downRight": {
        id: "diamond|downRight",
        name: ConnectorName.DOWN_RIGHT,
        containerName: ContainerNameT.DIAMOND,
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "box|downRight": { // Not used
        id: "box|downRight",
        name: ConnectorName.DOWN_RIGHT,
        containerName: ContainerNameT.BOX,
        type: ConnectorTypeT.BOX_CONNECTOR
    },
    "diamond|downRightDash": {
        id: "diamond|downRightDash",
        name: ConnectorName.DOWN_RIGHT_DASH,
        containerName: ContainerNameT.DIAMOND,
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "diamond|downRightDash.edit": {
        id: "diamond|downRightDash.edit",
        name: ConnectorName.DOWN_RIGHT_DASH_EDIT,
        containerName: ContainerNameT.DIAMOND,
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "box|rightUpArrow": {
        id: "box|rightUpArrow",
        name: ConnectorName.RIGHT_UP_ARROW,
        containerName: ContainerNameT.BOX,
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "box|rightUp": {
        id: "box|rightUp",
        name: ConnectorName.RIGHT_UP,
        containerName: ContainerNameT.BOX,
        type: ConnectorTypeT.BOX_CONNECTOR
    },
    "box|arrowUp": {
        id: "box|arrowUp",
        name: ConnectorName.ARROW_UP,
        containerName: ContainerNameT.BOX,
        type: ConnectorTypeT.BOX_CONNECTOR
    },
    "standard|arrowRight": {
        id: "standard|arrowRight",
        name: ConnectorName.ARROW_RIGHT,
        containerName: ContainerNameT.STANDARD,
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "standard|arrowRight.edit": {
        id: "standard|arrowRight.edit",
        name: ConnectorName.ARROW_RIGHT_EDIT,
        containerName: ContainerNameT.STANDARD,
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "box|arrowRight": {
        id: "box|arrowRight",
        name: ConnectorName.ARROW_RIGHT,
        containerName: ContainerNameT.BOX,
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "box|lineHoriz": {
        id: "box|lineHoriz",
        name: ConnectorName.LINE_HORIZ,
        containerName: ContainerNameT.BOX,
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "box|lineVert": {
        id: "box|lineVert",
        name: ConnectorName.LINE_VERT,
        containerName: ContainerNameT.BOX,
        type: ConnectorTypeT.BOX_CONNECTOR
    },
    "standard|lineHoriz": {
        id: "standard|lineHoriz",
        name: ConnectorName.LINE_HORIZ,
        containerName: ContainerNameT.STANDARD,
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "standard|lineHoriz.edit": {
        id: "standard|lineHoriz.edit",
        name: ConnectorName.LINE_HORIZ_EDIT,
        containerName: ContainerNameT.STANDARD,
        type: ConnectorTypeT.STANDARD_CONNECTOR
    },
    "diamond|lineHoriz": {
        id: "diamond|lineHoriz",
        name: ConnectorName.LINE_HORIZ,
        containerName: ContainerNameT.DIAMOND,
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "diamond|lineHoriz.edit": {
        id: "diamond|lineHoriz.edit",
        name: ConnectorName.LINE_HORIZ_EDIT,
        containerName: ContainerNameT.DIAMOND,
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "diamond|lineVert": {
        id: "diamond|lineVert",
        name: ConnectorName.LINE_VERT,
        containerName: ContainerNameT.DIAMOND,
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "diamond|upRight": { // Not used
        id: "diamond|upRight",
        name: ConnectorName.UP_RIGHT,
        containerName: ContainerNameT.DIAMOND,
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "diamond|empty": {
        id: "diamond|empty",
        name: ConnectorName.EMPTY,
        containerName: ContainerNameT.DIAMOND,
        type: ConnectorTypeT.DIAMOND_CONNECTOR
    },
    "box|empty": {
        id: "box|empty",
        name: ConnectorName.EMPTY,
        containerName: ContainerNameT.BOX,
        type: ConnectorTypeT.BOX_CONNECTOR
    },
    "standard|empty": {
        id: "standard|empty",
        name: ConnectorName.EMPTY,
        containerName: ContainerNameT.STANDARD,
        type: ConnectorTypeT.STANDARD_CONNECTOR
    }
};

export const connectorComponent = (createAddChildNodeCommand: CreateAddChildNodeCommand
): { [name in ConnectorName]: JSX.Element } => {
    const component: { [name in ConnectorName]: JSX.Element } = {
        downRight: <div className={styles.downRight} />,
        upRight: <div className={styles.upRight} />,
        downRightDash: <div />,
        "downRightDash.edit": <DownRightDashEditable createAddChildNodeCommand={createAddChildNodeCommand} />,
        rightUpArrow: <RightUpArrow />,
        rightUp: <RightUp />,
        arrowUp: <ArrowUp />,
        arrowRight: <ArrowRight />,
        "arrowRight.edit": <ArrowRightEditable createAddChildNodeCommand={createAddChildNodeCommand} />,
        lineHoriz: <LineHoriz />,
        "lineHoriz.edit": <LineHorizEditable createAddChildNodeCommand={createAddChildNodeCommand} />,
        lineVert: <LineVert />,
        empty: <div />
    };

    return component;
};

const Connector = ({ id, createAddChildNodeCommand }: { id: string; createAddChildNodeCommand: CreateAddChildNodeCommand }) => {
    const { name, containerName } = connectors[id];
    return (
        <div className={styles[containerName]}>
            {connectorComponent(createAddChildNodeCommand)[name]}
        </div>
    );
};

export default Connector;
