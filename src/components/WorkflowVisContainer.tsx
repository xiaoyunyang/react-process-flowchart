/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { clone } from "ramda";

// Components
import WorkflowVis from "./WorkflowVis";
import WorkflowStepAddPopover from "./WorkflowStepAddPopover";

// Types
import { WorkflowStepT } from "../types/workflow";
import { CreateAddNodeParams, AddChildNodeCommand, WorkflowStepNodes, MatrixCoord, ColType } from "../types/workflowVisTypes";
import { EndomorphDict, PolymorphDict } from '../types/generic';

// Utils
import {
    createWorkflowVisData,
    populateMatrix,
    invertKeyVal,
    decodeMatrixCoord,
    findNextNode,
    encodeMatrixEntry
} from "../utils/workflowVisUtils";

// Styles
import styles from "./styles/workflowVis.module.css";

export const createAddNodeParams: CreateAddNodeParams = ({
    coordToNodeId, workflowStepNodes, nodeIdToParentNodeIds, updatePlusBtnClickParams
}: {
    coordToNodeId: EndomorphDict;
    workflowStepNodes: WorkflowStepNodes;
    nodeIdToParentNodeIds: PolymorphDict;
    updatePlusBtnClickParams: Function;
}) =>
    ({ ownCoord = "", parentCoord }: { ownCoord: string | undefined; parentCoord: string | undefined }) =>
        ({ left, top, isEmptyBranch }: { left: number; top: number; isEmptyBranch: boolean }): AddChildNodeCommand => {
            if (!parentCoord) return "";
            if (parentCoord) {
                // The command to add new child node is set to this string as a placeholder.
                // You can set it to whatever string or data structure you want
                // parentNode = the node that's thethered to the plus sign
                const parentNodeId = coordToNodeId[parentCoord];
                const prevNodeIds = nodeIdToParentNodeIds[parentNodeId];
                const { nextSteps: candidateNextNodeIds } = workflowStepNodes[parentNodeId];

                const addChildNodeCommand: AddChildNodeCommand =
                    `User clicked plus sign tethered to nodeId=${parentNodeId} with prevNodeIds = ${String(prevNodeIds)} candidateNextNodes= ${String(candidateNextNodeIds)}. Draw popover modal at left=${left}, top=${top}`;

                // console.log("MOOOOOOOOOOOOOOOOOO\n", addChildNodeCommand);

                const ownMatrixCoord = decodeMatrixCoord(ownCoord);

                const nextNodeId = isEmptyBranch ? null : findNextNode({
                    plusBtnCoord: ownMatrixCoord, coordToNodeId, candidateNextNodeIds
                });

                console.log("tetheredNodeId", parentNodeId);
                console.log("nextNodeId", nextNodeId);

                updatePlusBtnClickParams({
                    left,
                    top,
                    tetheredNodeId: parentNodeId,
                    prevNodeIds,
                    nextNodeId
                });
                return addChildNodeCommand;
            }
            return "";
        };

interface PropsT {
    workflowUid: string;
    workflowSteps: WorkflowStepT[];
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
    updatePlusBtnClickParamsBound: ({ left, top, tetheredNodeId, nextNodeId }: {
        left: number; top: number;
        tetheredNodeId: string; nextNodeId: string;
    }) => void;
    updatePlusBtnClickParams({
        left, top, tetheredNodeId, nextNodeId
    }: {
        left: number; top: number;
        tetheredNodeId: string; nextNodeId: string;
    }
    ) {
        this.setState({
            plusBtnClickPos: { left, top },
            tetheredNodeId,
            nextNodeId
        });
    }
    render() {
        const { workflowUid, workflowSteps, editMode } = this.props;
        const {
            workflowVisData, initialMatrix, decisionStepCols
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
            workflowVisData, initialMatrix, decisionStepCols
        });

        // pass matrix cols (array length) and height (inner array length) to workflowVis
        // matrix cols is based on the largest workflowStepOrder seen
        // matrix rows is based on the greatest number of occurrences of a workflowStepOrder

        const coordToNodeId = invertKeyVal(nodeIdToCoord);
        const { workflowStepNodes } = workflowVisData;
        console.log("workflowStepNodes", workflowStepNodes);

        const { tetheredNodeId, nextNodeId, plusBtnClickPos } = this.state;
        const { left, top } = plusBtnClickPos;

        return (
            <div style={{ position: "relative" }}>
                {
                    <div className={styles.top}>
                        <div className={styles.wrapperContainer}>
                            <WorkflowVis
                                workflowVisData={workflowVisData}
                                matrix={matrix}
                                editMode={editMode}
                                addNodeParams={createAddNodeParams({
                                    coordToNodeId,
                                    workflowStepNodes,
                                    nodeIdToParentNodeIds,
                                    updatePlusBtnClickParams: this.updatePlusBtnClickParamsBound
                                })}
                            />
                        </div>
                    </div>
                }
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
                        <WorkflowVis
                            workflowVisData={workflowVisData}
                            matrix={initialMatrix}
                            editMode={false}
                            addNodeParams={createAddNodeParams({
                                coordToNodeId,
                                workflowStepNodes,
                                nodeIdToParentNodeIds,
                                updatePlusBtnClickParams: this.updatePlusBtnClickParamsBound
                            })}
                        />
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