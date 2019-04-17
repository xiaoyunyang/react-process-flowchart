// Libraries
import React from "react";

// Components
import WorkflowStep from "./WorkflowStep";
import DecisionStep from "./DecisionStep";
import Connector from "./Connector";

// Types
import { WorkflowStepTypeT } from "../types/workflow";
import { ColEntry, AddNodeToVis } from "../types/workflowVisTypes";

// Utils
import { decodeMatrixEntry, isConnector } from "../utils/workflowVisUtils";

interface PropsT {
    colEntries: ColEntry[];
    editMode: boolean;
    addNodeToVis: AddNodeToVis;
}

export default class Column extends React.PureComponent<PropsT> {
    static renderTile({ colEntry, editMode, addNodeToVis }: {
        colEntry: ColEntry; editMode: boolean; addNodeToVis: AddNodeToVis;
    }) {
        const { matrixEntry, tile } = colEntry;
        const connectorId = tile.id;

        // Connector
        if (isConnector(tile.type)) {
            const { encodedParentNodeCoord } = decodeMatrixEntry(matrixEntry);
            const shouldRenderEditButton = editMode && !!encodedParentNodeCoord;
            const id = shouldRenderEditButton ? `${connectorId}.edit` : connectorId;

            // The matrixEntry of a connector can encode its own coordinate and its parent's coordinate.
            // The matrixEntry for a connector is unique because it consists of
            // ${connectorType}.${connectorName}.${encodedOwnCoord}.${encodedParentNodeCoord}
            // So we are guaranteed to have unique keys for each column item
            // TODO: We want to pass some information about prev workstep to EditButton so when the EditButton is clicked,
            // the parent's workflowStepUid can be retrieved from performing a lookup of the 
            // in nodeCoord using encodedParentNodeCoord. Therefore, we want to pass encodedParentNodeCoord to EditButton
            // When EditButton is clicked, it emits an event and the reducer can act on. If the encodedParentNodeCoord belongs
            // to a workflowStep (i.e., the encodedParentNodeCoord lookup in nodeCoord yields a workflowStepUid), then we will
            // bring up a form
            return (
                <Connector id={id} addChildNode={addNodeToVis(encodedParentNodeCoord)} />
            );
        }

        // Decision Step
        if (tile.type === WorkflowStepTypeT.DECISION) {
            return <DecisionStep />;
        }

        // WorkflowStep
        return <WorkflowStep name={tile.name} type={tile.type} />;
    }
    render() {
        const { colEntries, editMode, addNodeToVis } = this.props;

        return colEntries.map((colEntry: ColEntry) => (
            <div key={colEntry.matrixEntry}>
                {Column.renderTile({ colEntry, editMode, addNodeToVis })}
            </div>
        ));
    }
}
