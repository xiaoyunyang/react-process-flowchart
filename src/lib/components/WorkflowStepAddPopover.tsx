
import React, { PureComponent, ReactNode } from "react";

const WorkflowStepAddPopover = ({
    left, top, tetheredNodeId, nextNodeId
}: {
    left: number; top: number;
    tetheredNodeId: string; nextNodeId: string;
}) =>
    (
        <div style={{ position: "absolute", left, top, zIndex: 4 }}>
            <div style={{ width: 300, height: 20, backgroundColor: "red", color: "white" }}>
                <p>{`tetheredNodeId: ${tetheredNodeId}`}</p>
            </div>
            <div style={{ width: 300, height: 50, marginTop: -15, backgroundColor: "blue", color: "white" }}>
                <p>{`nextNodeId: ${String(nextNodeId)}`}</p>
            </div>
        </div>
    );

export default WorkflowStepAddPopover;
