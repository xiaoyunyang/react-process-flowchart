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
    fromCoord: MatrixCoord;
    toCoord: MatrixCoord;
}

export enum ConnectorTypeT {
    BOX_CONNECTOR = "BOX_CONNECTOR",
    DIAMOND_CONNECTOR = "DIAMOND_CONNECTOR",
    STANDARD_CONNECTOR = "STANDARD_CONNECTOR"
}

export enum ConnectorName {
    DOWN_RIGHT = "downRight",
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

export type GenericNodeTypeT = ConnectorTypeT | WorkflowStepTypeT | string;

export interface GenericNodeT {
    type: GenericNodeTypeT;
    name: string;
    id: string;
}

export type Matrix = string[][];

export interface MatrixCoord {
    colNum: number;
    rowNum: number;
}

export interface ConnectorsToPlace {
    rowNum: number;
    colNum: number;
    connectorName: ConnectorName;
    parentCoord: MatrixCoord;
}

export interface ColEntry {
    node: GenericNodeT;
    matrixEntry: string;
}
