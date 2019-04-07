// Libraries
import React from "react";

// Components
import WorkflowStep from "./WorkflowStep";
import DecisionStep from "./DecisionStep";
import { Connector } from "./connectors";

// Types
import { WorkflowStepType } from "../types/workflow";
import { ConnectorType, GenericNodeT } from "../types/workflowVis";

interface PropsT {
    nodes: GenericNodeT[];
    editMode: boolean;
    colNum: number;
}


export default class Column extends React.PureComponent<PropsT> {
    renderNode({ node, editMode }: {
        node: GenericNodeT; editMode: boolean;
    }) {
        // Connector
        if (Object.values(ConnectorType).includes(node.type)) {
            const id = (editMode && node.id.split(".")[0] === "standard")
                ? `${node.id}.edit` : node.id;
            return (
                <Connector id={id} />
            );
        }

        // Decision Step
        if (node.type === WorkflowStepType.DECISION) {
            return <DecisionStep />;
        }

        // Workflow Step
        return <WorkflowStep name={node.name} type={node.type} />;
    }
    render() {
        const { nodes, editMode, colNum } = this.props;
        return nodes.map((node: GenericNodeT, i: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${node.id}-${colNum}-${i}`}>
                {this.renderNode({ node, editMode })}
            </div>
        ));
    }
}
