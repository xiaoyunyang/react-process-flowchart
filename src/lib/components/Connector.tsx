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

// TODO: deprecate createAddChildNodeCommand in favor of context
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
        [ConnectorName.DOWN_RIGHT]: <div className={styles.downRight} />,
        [ConnectorName.UP_RIGHT]: <div className={styles.upRight} />,
        [ConnectorName.DOWN_RIGHT_DASH]: <div />,
        [ConnectorName.DOWN_RIGHT_DASH_EDIT]: <DownRightDashEditable
            createAddChildNodeCommand={createAddChildNodeCommand}
        />,
        [ConnectorName.RIGHT_UP_ARROW]: <RightUpArrow />,
        [ConnectorName.RIGHT_UP]: <RightUp />,
        [ConnectorName.ARROW_UP]: <ArrowUp />,
        [ConnectorName.ARROW_RIGHT]: <ArrowRight />,
        [ConnectorName.ARROW_RIGHT_EDIT]: <ArrowRightEditable
            createAddChildNodeCommand={createAddChildNodeCommand}
        />,
        [ConnectorName.LINE_HORIZ]: <LineHoriz />,
        [ConnectorName.LINE_HORIZ_EDIT]: <LineHorizEditable
            createAddChildNodeCommand={createAddChildNodeCommand}
        />,
        [ConnectorName.LINE_VERT]: <LineVert />,
        [ConnectorName.EMPTY]: <></>
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
