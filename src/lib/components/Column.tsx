// Libraries
import React, { useContext } from "react";

// Components
import WorkflowStep from "./WorkflowStep";
import ForkStep from "./ForkStep";
import Connector from "./Connector";

// Types
import { AddNodeParams, TileType } from "../types";

// Utils
import { decodeMatrixEntry } from "../utils";

// Context
import WorkflowVisContext from "../../context/workflowVis";


const Tile = ({
    matrixEntry, editMode, addNodeParams
}: {
    matrixEntry: string;
    editMode: boolean; addNodeParams: AddNodeParams;
}) => {
    const { workflowStepNodes } = useContext(WorkflowVisContext);
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
        return <ForkStep workflowStepNode={workflowStepNodes[tileId]} />;
    case TileType.NODE:
        return (
            <WorkflowStep
                shouldHighlight={false}
                workflowStepNode={workflowStepNodes[tileId]}
            />
        );
    default:
        return <></>;
    }
};

const Column = ({
    matrixCol, editMode, addNodeParams
}: {
    matrixCol: string[];
    editMode: boolean;
    addNodeParams: AddNodeParams;
}) => (
    <>
        {

            matrixCol.map((matrixEntry: string) => (
                <div key={matrixEntry}>
                    <Tile
                        matrixEntry={matrixEntry}
                        editMode={editMode}
                        addNodeParams={addNodeParams}
                    />
                </div>
            ))
        }
    </>
);

export default Column;
