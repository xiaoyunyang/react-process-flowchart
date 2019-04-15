import { WorkflowStepTypeT } from "./workflow";

export interface WorkflowStepNodeT {
    id: string;
    name: string;
    type: WorkflowStepTypeT | string;
    nextSteps: string[];
    workflowStepOrder: number;
}

export interface WorkflowStepNodes { [id: string]: WorkflowStepNodeT }

export interface WorkflowVisDataT {
    firstStep: string;
    workflowStepNodes: { [id: string]: WorkflowStepNodeT };
}

export enum ColType {
    BOX = "box",
    DIAMOND = "diamond",
    STANDARD = "standard"
}

export interface CoordPairT {
    parentCoord: MatrixCoord;
    childCoord: MatrixCoord;
}

export enum ConnectorTypeT {
    BOX_CONNECTOR = "box",
    DIAMOND_CONNECTOR = "diamond",
    STANDARD_CONNECTOR = "standard"
}

export enum ConnectorName {
    DOWN_RIGHT = "downRight",
    DOWN_RIGHT_DASH = "downRightDash",
    DOWN_RIGHT_DASH_EDIT = "downRightDash.edit",
    RIGHT_UP_ARROW = "rightUpArrow",
    ARROW_RIGHT = "arrowRight",
    ARROW_RIGHT_EDIT = "arrowRight.edit",
    LINE_HORIZ = "lineHoriz",
    LINE_HORIZ_EDIT = "lineHoriz.edit",
    EMPTY = "empty"
}

export interface ConnectorT {
    id: string;
    containerName: string;
    type: ConnectorTypeT;
    name: ConnectorName;
}

export type GenericTileType = ConnectorTypeT | WorkflowStepTypeT | string;

export interface GenericTile {
    type: GenericTileType;
    name: string;
    id: string;
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

export interface ColEntry {
    tile: GenericTile;
    matrixEntry: string;
}