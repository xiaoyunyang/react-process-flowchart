import { WorkflowStepType } from "./workflow";

export interface WorkflowStepNodeT {
    id: string;
    name: string;
    type: WorkflowStepType;
    nextSteps: string[];
    workflowStepOrder: number;
}

export interface WorkflowVisDataT {
    firstStep: string;
    workflowStepNodes: { [id: string]: WorkflowStepNodeT };
}

export enum ConnectorType {
    BOX_CONNECTOR = "BOX_CONNECTOR",
    DIAMOND_CONNECTOR = "DIAMOND_CONNECTOR",
    STANDARD_CONNECTOR = "STANDARD_CONNECTOR"
}
export interface ConnectorT {
    id: string;
    containerName: string;
    type: ConnectorType;
    name: string;
}

export type GenericNodeTypeT = ConnectorType | WorkflowStepType;
export interface GenericNodeT {
    type: GenericNodeTypeT;
    name: string;
    id: string;
}
