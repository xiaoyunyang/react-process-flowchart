
import React, { PureComponent, ReactNode } from "react";



const WorkflowStepAddPopover = ({
    left, top, tetheredNodeId, nextNodeIds, prevNodeIds
}: {
    left: number; top: number;
    tetheredNodeId: string; nextNodeIds: string[]; prevNodeIds: string[];
}) =>
    (
        <div style={{ position: "absolute", left, top }}>
            <div style={{ width: 300, height: 20, backgroundColor: "red", color: "white" }}>
                <p>{`tetheredNodeId: ${tetheredNodeId}`}</p>
            </div>
            <div style={{ width: 300, height: 50, marginTop: -15, backgroundColor: "blue", color: "white" }}>
                <p>{`prevNodeId: ${String(prevNodeIds)}`}</p>
                <p>{`nextNodeId: ${String(nextNodeIds)}`}</p>
            </div>
        </div>
    );

export default WorkflowStepAddPopover;
