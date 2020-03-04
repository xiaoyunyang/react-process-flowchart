// Libraries
import React from "react";

// Components
import WorkflowStep from "./WorkflowStep";
import DecisionStep from "./DecisionStep";
import Connector from "./Connector";

// Types
import {
    AddNodeParams, TileType, WorkflowStepNodes
} from "../types/workflowVisTypes";

// Utils
import { decodeMatrixEntry } from "../utils/workflowVisUtils";

// TODO: need to connect WorkflowStep component to context
const getWorkflowStepProps = ({
    tileId, workflowStepNodes
}: {
    tileId: string;
    workflowStepNodes: WorkflowStepNodes;
}) => ({
    ...workflowStepNodes[tileId],
    shouldHighlight: false // TODO: shouldHighlight is different in project
});

const Tile = ({
    matrixEntry, workflowStepNodes, editMode, addNodeParams
}: {
    matrixEntry: string;
    workflowStepNodes: WorkflowStepNodes;
    editMode: boolean; addNodeParams: AddNodeParams;
}) => {
    const {
        tileType, tileContainer, tileId, encodedOwnCoord, encodedParentNodeCoord
    } = decodeMatrixEntry(matrixEntry);
    switch (tileType) {
    case TileType.CONNECTOR:
        return (
            <Connector
                name={tileId}
                container={tileContainer}
                encodedParentNodeCoord={encodedParentNodeCoord}
                editMode={editMode}
                createAddChildNodeCommand={addNodeParams({
                    ownCoord: encodedOwnCoord,
                    parentCoord: encodedParentNodeCoord
                })}
            />
        );
    case TileType.FORK:
        return <DecisionStep />;
    case TileType.NODE:
        return (
            <WorkflowStep
                {...getWorkflowStepProps({ tileId, workflowStepNodes })}
            />
        );
    default:
        return <></>;
    }
};

const Column = ({
    matrixCol, workflowStepNodes, editMode, addNodeParams
}: {
    matrixCol: string[];
    workflowStepNodes: WorkflowStepNodes;
    editMode: boolean;
    addNodeParams: AddNodeParams;
}) => (
    <>
        {

            matrixCol.map((matrixEntry: string) => (
                <div key={matrixEntry}>
                    <Tile
                        matrixEntry={matrixEntry}
                        workflowStepNodes={workflowStepNodes}
                        editMode={editMode}
                        addNodeParams={addNodeParams}
                    />
                </div>
            ))
        }
    </>
);

export default Column;
