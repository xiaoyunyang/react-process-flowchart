/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { clone } from "ramda";

// Components
import WorkflowVis from "./components/WorkflowVis";
import WorkflowStepAddPopover from "./components/WorkflowStepAddPopover";

import WorkflowVisContext from "../context/workflowVis";

// TODO: deprecate config
import {
    WorkflowStep,
    createAddNodeParams
} from "../config";

// Utils
import {
    createWorkflowVisData,
    populateMatrix,
    invertKeyVal
} from "./utils/workflowVisUtils";

// Styles
import styles from "./styles/workflowVis.module.css";


interface PropsT {
    workflowUid: string;
    workflowSteps: WorkflowStep[];
    editMode: boolean;
}

interface StateT {
    plusBtnClickPos: { left: number; top: number };
    tetheredNodeId: string;
    nextNodeId: string;
}

export default class WorkflowVisContainer extends React.PureComponent<PropsT, StateT> {
    constructor(props: PropsT) {
        super(props);
        this.state = {
            plusBtnClickPos: { left: 0, top: 0 },
            tetheredNodeId: "",
            nextNodeId: ""
        };
        this.updatePlusBtnClickParamsBound = this.updatePlusBtnClickParams.bind(this);
    }

    updatePlusBtnClickParamsBound: ({
        left, top, tetheredNodeId, nextNodeId
    }: {
        left: number; top: number;
        tetheredNodeId: string; nextNodeId: string;
    }) => void;

    updatePlusBtnClickParams({
        left, top, tetheredNodeId, nextNodeId
    }: {
        left: number; top: number;
        tetheredNodeId: string; nextNodeId: string;
    }) {
        this.setState({
            plusBtnClickPos: { left, top },
            tetheredNodeId,
            nextNodeId
        });
    }

    render() {
        const { workflowUid, workflowSteps, editMode } = this.props;
        const {
            workflowVisData, initialMatrix, forkStepCols
        } = createWorkflowVisData({ workflowSteps, workflowUid });

        // TODO: remove block ----
        // const bottomMatrix = clone(initialMatrix);
        // bottomMatrix[6][1] = encodeMatrixEntry({
        //     colType: ColType.DIAMOND,
        //     entryName: "lineVert",
        //     encodedOwnCoord: "6,1"
        // });

        // bottomMatrix[6][0] = encodeMatrixEntry({
        //     colType: ColType.DIAMOND,
        //     entryName: "upRight",
        //     encodedOwnCoord: "6,0"
        // });
        // bottomMatrix[6][3] = encodeMatrixEntry({
        //     colType: ColType.DIAMOND,
        //     entryName: "lineVert",
        //     encodedOwnCoord: "6,0"
        // });
        // bottomMatrix[7][0] = encodeMatrixEntry({
        //     colType: ColType.STANDARD,
        //     entryName: "arrowRight",
        //     encodedOwnCoord: "7,0"
        // });
        // console.log(bottomMatrix);


        // -----------------------

        const { matrix, nodeIdToCoord, nodeIdToParentNodeIds } = populateMatrix({
            workflowVisData, initialMatrix, forkStepCols
        });

        // pass matrix cols (array length) and height (inner array length) to workflowVis
        // matrix cols is based on the largest workflowStepOrder seen
        // matrix rows is based on the greatest number of occurrences of a workflowStepOrder

        const coordToNodeId = invertKeyVal(nodeIdToCoord);
        const { workflowStepNodes } = workflowVisData;
        // console.log("workflowStepNodes", workflowStepNodes);

        const { tetheredNodeId, nextNodeId, plusBtnClickPos } = this.state;
        const { left, top } = plusBtnClickPos;

        return (
            <div style={{ position: "relative" }}>
                <div className={styles.top}>
                    <div className={styles.wrapperContainer}>
                        <WorkflowVisContext.Provider value={{ workflowStepNodes }}>
                            <WorkflowVis
                                matrix={matrix}
                                editMode={editMode}
                                addNodeParams={createAddNodeParams({
                                    coordToNodeId,
                                    workflowStepNodes,
                                    nodeIdToParentNodeIds,
                                    updatePlusBtnClickParams: this.updatePlusBtnClickParamsBound
                                })}
                            />
                        </WorkflowVisContext.Provider>
                    </div>
                </div>
                {/* <div className={styles.bottom}>
                    <div className={styles.wrapperContainer}>
                        <WorkflowVis
                            workflowVisData={workflowVisData}
                            matrix={bottomMatrix}
                            editMode={editMode}
                            addNodeParams={createAddNodeParams({
                                coordToNodeId,
                                workflowStepNodes,
                                nodeIdToParentNodeIds,
                                updatePlusBtnClickParams: this.updatePlusBtnClickParamsBound
                            })}
                        />
                    </div>
                </div> */}

                <div className={styles.foundation}>
                    <div className={styles.wrapperContainer}>
                        <WorkflowVisContext.Provider value={{ workflowStepNodes }}>
                            <WorkflowVis
                                matrix={initialMatrix}
                                editMode={false}
                                addNodeParams={createAddNodeParams({
                                    coordToNodeId,
                                    workflowStepNodes,
                                    nodeIdToParentNodeIds,
                                    updatePlusBtnClickParams: this.updatePlusBtnClickParamsBound
                                })}
                            />
                        </WorkflowVisContext.Provider>
                    </div>
                </div>
                {
                    // <WorkflowStepAddPopover
                    //     left={left}
                    //     top={top}
                    //     tetheredNodeId={tetheredNodeId}
                    //     nextNodeId={nextNodeId}
                    // />
                }
            </div>

        );
    }
}
