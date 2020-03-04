import React from "react";
import classNames from "classnames";

// Components
import EditButton from "./EditButton";

// Styles
import styles from "../styles/workflowVis.module.css";

// Types
import { CreateAddChildNodeCommand, TileContainer, ConnectorName } from "../types/workflowVisTypes";

export const ArrowRight = () => (
    <div className={classNames(styles.arrowRight, styles.flexContainer)}>
        <div className={classNames(styles.line, styles.lineLong)} />
        <i className={classNames(styles.caret, styles.caretRight)} />
    </div>
);

export const ArrowRightEditable = (
    { createAddChildNodeCommand }: { createAddChildNodeCommand: CreateAddChildNodeCommand }
) => (
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
) => (
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

export const DownRightDashEditable = ({ createAddChildNodeCommand }: {
    createAddChildNodeCommand: CreateAddChildNodeCommand;
}) => (
    <div className={classNames(styles.flexContainer, styles.downRightDash)}>
        <div className={classNames(styles.downRight)} />
        <EditButton createAddChildNodeCommand={createAddChildNodeCommand} isEmptyBranch />
    </div>
);

export const connectorComponent = (
    createAddChildNodeCommand: CreateAddChildNodeCommand
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

const containerName = {
    [TileContainer.DIAMOND]: "connectorContainerDiamond",
    [TileContainer.BOX]: "connectorContainerBox",
    [TileContainer.STANDARD]: "connectorContainerStandard"
};
const Connector = ({
    name, container, createAddChildNodeCommand, editMode, encodedParentNodeCoord
}: {
    name: string;
    container: TileContainer;
    createAddChildNodeCommand: CreateAddChildNodeCommand;
    editMode: boolean;
    encodedParentNodeCoord: string | undefined;
}) => {
    const shouldRenderEditButton = editMode && !!encodedParentNodeCoord;
    const connectorName = (shouldRenderEditButton ? `${name}.edit` : name) as ConnectorName;

    return (
        <div className={styles[containerName[container]]}>
            {connectorComponent(createAddChildNodeCommand)[connectorName]}
        </div>
    );
};

export default Connector;
