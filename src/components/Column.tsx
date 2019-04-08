// Libraries
import React from "react";

// Components
import WorkflowStep from "./WorkflowStep";
import DecisionStep from "./DecisionStep";
import Connector from "./Connector";

// Types
import { WorkflowStepTypeT } from "../types/workflow";
import { ConnectorTypeT, GenericNodeT } from "../types/workflowVis";

interface PropsT {
    nodes: GenericNodeT[];
    editMode: boolean;
    colNum: number;
}

export default class Column extends React.PureComponent<PropsT> {
    renderNode({ node, editMode }: {
        node: GenericNodeT; editMode: boolean;
    }) {
        if (Object.values(ConnectorTypeT).includes(node.type)) {
            const id = (editMode && node.id.split(".")[0] === "standard")
                ? `${node.id}.edit` : node.id;
            return (
                <Connector id={id} />
            );
        }

        if (node.type === WorkflowStepTypeT.DECISION) {
            return <DecisionStep />;
        }

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
