// Libraries
import React from "react";

// Components
import WorkflowStep from "./WorkflowStep";
import DecisionStep from "./DecisionStep";
import Connector from "./Connector";

// Types
import { WorkflowStepTypeT } from "../types/workflow";
import { ConnectorTypeT, ColEntry } from "../types/workflowVis";

// Utils
import { getConnectorInfo } from "../utils/workflowVisUtils";

interface PropsT {
    col: ColEntry[];
    editMode: boolean;
}
export default class Column extends React.PureComponent<PropsT> {
    static renderNode({ colEntry, editMode }: {
        colEntry: ColEntry; editMode: boolean;
    }) {
        const { matrixEntry, node } = colEntry;
        const connectorId = node.id;

        // Connector
        // TODO: Use typescript's user defined type guard to check if the connector type is a member of ConnectorType
        if (Object.values(ConnectorTypeT).includes(node.type)) {
            const { encodedParentCoord } = getConnectorInfo({ matrixEntry });
            const shouldRenderEditButton = editMode && !!encodedParentCoord;
            const id = shouldRenderEditButton ? `${connectorId}.edit` : connectorId;

            // The matrixEntry of a connector can encode its own coordinate and its parent's coordinate.
            // The matrixEntry for a connector is unique because it consists of
            // ${connectorType}.${connectorName}.${encodedOwnCoord}.${encodedParentCoord} 
            // So we are guaranteed to have unique keys for each column item
            // TODO: We want to pass some information about prev workstep to EditButton so when the EditButton is clicked,
            // the parent's workflowStepUid can be retrieved from performing a lookup of the 
            // in nodeCoord using encodedParentCoord. Therefore, we want to pass encodedParentCoord to EditButton
            // When EditButton is clicked, it emits an event and the reducer can act on. If the encodedParentCoord belongs
            // to a workflowStep (i.e., the encodedParentCoord lookup in nodeCoord yields a workflowStepUid), then we will
            // bring up a form
            return (
                <Connector id={id} />
            );
        }

        // Decision Step
        if (node.type === WorkflowStepTypeT.DECISION) {
            return <DecisionStep />;
        }

        // WorkflowStep
        return <WorkflowStep name={node.name} type={node.type} />;
    }
    render() {
        const { col, editMode } = this.props;

        return col.map((colEntry: ColEntry) => (
            <div key={colEntry.matrixEntry}>
                {Column.renderNode({ colEntry, editMode })}
            </div>
        ));
    }
}
