/* eslint-disable import/no-cycle */
import { ReactNode } from "react";
import { WorkflowStep } from "../../config";
import { EndomorphDict, PolymorphDict } from "./generic";

export type Theme = "Light" | "Dark"

export interface WorkflowConfig {
    [nodeType: string]: {
        theme: string; // Theme
        options: {[optionName: string]: boolean};
    };
}

export interface NextNode {
    id: string;
    primary: boolean;
}

export interface WorkflowStepNode {
    id: string;
    name: string;
    nodeType: string;
    isDisabled: boolean;
    workflowStepOrder: number;
    nextNodes: NextNode[];
    nextSteps: WorkflowStep[];
    prevSteps: WorkflowStep[];
    displayWarning?: ReactNode;
}

export interface WorkflowStepNodes { [id: string]: WorkflowStepNode }

export interface WorkflowVisData {
    firstStep: string;
    workflowStepNodes: WorkflowStepNodes;
}

export interface CoordPairT {
    parentCoord: MatrixCoord;
    childCoord: MatrixCoord;
}

export enum TileContainer {
    BOX = "box",
    DIAMOND = "diamond",
    STANDARD = "standard"
}

export enum TileType {
    CONNECTOR = "CONNECTOR",
    FORK = "FORK",
    NODE = "NODE"
}

export enum ConnectorName {
    DOWN_RIGHT = "downRight",
    DOWN_RIGHT_DASH = "downRightDash",
    DOWN_RIGHT_DASH_EDIT = "downRightDash.edit",
    RIGHT_UP = "rightUp",
    RIGHT_UP_ARROW = "rightUpArrow",
    ARROW_UP = "arrowUp",
    ARROW_RIGHT = "arrowRight",
    ARROW_RIGHT_EDIT = "arrowRight.edit",
    LINE_HORIZ = "lineHoriz",
    LINE_HORIZ_EDIT = "lineHoriz.edit",
    LINE_VERT = "lineVert",
    UP_RIGHT = "upRight",
    EMPTY = "empty"
}
export interface ConnectorTile {
    type: TileType.CONNECTOR;
    id: string;
    name: ConnectorName;
    containerName: TileContainer;
}

export type Matrix = string[][];

export interface MatrixCoord {
    colNum: number;
    rowNum: number;
}

export interface ConnectorToPlace {
    connectorName: ConnectorName;
    ownCoord: string;
    parentCoord: string;
}

export type AddChildNodeCommand = string;

export type CreateAddChildNodeCommand = ({ left, top, isEmptyBranch }: {
    left: number; top: number; isEmptyBranch: boolean;
}) => AddChildNodeCommand;


export type AddNodeParams = ({ ownCoord, parentCoord }: {
    ownCoord: string | undefined; parentCoord: string | undefined;
}) => CreateAddChildNodeCommand;

export type CreateAddNodeParams = ({
    coordToNodeId, workflowStepNodes, nodeIdToParentNodeIds
}: {
    coordToNodeId: EndomorphDict;
    workflowStepNodes: WorkflowStepNodes;
    nodeIdToParentNodeIds: PolymorphDict;
    updatePlusBtnClickParams: Function;
}) => AddNodeParams;
