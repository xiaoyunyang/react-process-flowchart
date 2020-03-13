/* eslint-disable import/no-cycle */
// Utils
import { clone, chain, sort } from "ramda";
import MinHeap from "./MinHeap";

// Types
import {
    WorkflowVisData, Matrix, ConnectorToPlace, CoordPairT, TileContainer
} from "../types";
import { WorkflowStep } from "../../config";
import {
    ExistentialDict, EndomorphDict, PolymorphDict
} from "../types/generic";

// Utils
import { createWorkflowStepNodes, getSortedNextNodes } from "./stepNodesUtils";
import {
    initMatrix, downRightDashesToPlace, getRightUpCoords,
    addVertConnectorsToMatrix, addConnectorToMatrix,
    encodeMatrixCoord, addNodeToMatrix, decodeMatrixCoord,
    createHorizConnectorsBetweenNodes,
    createCoordPairs,
    replaceTile
} from "./matrixUtils";

/**
 * Creates the workflowVisData and initial matrix
 *
 * @param {string[]} workflowSteps
 * @param {string} workflowUid
 * @returns {WorkflowVisData} workflowVisData
 * @returns {Matrix} initialMatrix
 * @returns {number[]} forkStepCols - the colNums where decision steps are
 */
export const createWorkflowVisData = (
    { workflowSteps, workflowUid }: { workflowSteps: WorkflowStep[]; workflowUid: string }
): { workflowVisData: WorkflowVisData; initialMatrix: Matrix; forkStepCols: number[] } => {
    const {
        firstStepId, workflowStepNodes, workflowStepOrderOccur, forkStepCols
    } = createWorkflowStepNodes({ workflowSteps, workflowUid });
    const workflowVisData = {
        firstStep: firstStepId,
        workflowStepNodes
    };

    const numCols = (Math.max(...Object.keys(workflowStepOrderOccur).map((id) => +id)) * 2) + 1;

    // Naive: if we see at least one decision step, we want to add an additional row to the matrix
    // to accommodate the dash line add button
    const numRows = Math.max(...Object.values(workflowStepOrderOccur))
        + (+(forkStepCols.length > 0));

    const tileContainers = Array(numCols).fill(TileContainer.STANDARD).map((tileContainer, i) => {
        if (i % 2 === 1) return tileContainer;
        return forkStepCols.includes(i) ? TileContainer.DIAMOND : TileContainer.BOX;
    });

    const initialMatrix = initMatrix({ numRows, tileContainers });

    return {
        workflowVisData,
        initialMatrix,
        forkStepCols
    };
};

const getRowNum = (
    { nodeId, nodeIdToCoord }: { nodeId: string; nodeIdToCoord: EndomorphDict }
) => decodeMatrixCoord(nodeIdToCoord[nodeId]).rowNum;

const parentIdSortBy = (nodeIdToCoord: EndomorphDict) => (
    a: string, b: string
) => getRowNum({ nodeId: a, nodeIdToCoord }) - getRowNum({ nodeId: b, nodeIdToCoord });

/**
 * Uses workflowVisData to populate initialMatrix with workflow steps and connectors
 *
 * @param {WorkflowVisData} workflowVisData
 * @param {Matrix} initialMatrix
 * @param {number[]} forkStepCols - the columns where decision steps reside
 * @returns {Matrix} matrix - populated matrix (may be a different size than initialMatrix)
 * @returns {EndomorphDict} nodeIdToCoord - a hashmap of nodeId to its matrix coord
 * @returns {PolymorphDict} nodeIdToParentNodeIds
 */
export const populateMatrix = (
    { workflowVisData, initialMatrix, forkStepCols }: {
      workflowVisData: WorkflowVisData;
      initialMatrix: Matrix;
      forkStepCols: number[];
  }
): { matrix: Matrix; nodeIdToCoord: EndomorphDict; nodeIdToParentNodeIds: PolymorphDict } => {
    const matrix = clone(initialMatrix);

    // Step 1 - Traverse graph (BFS) and generate nodeIdToParentCoords and nodeIdToCoord
    // together, these hash maps tell us how tiles in the matrix are connected

    const { firstStep, workflowStepNodes } = workflowVisData;

    const toExplore: MinHeap = new MinHeap();
    toExplore.insert({ val: firstStep, priority: 0 });

    const explored: ExistentialDict = {};

    // nodeId -> `${colNum},${rowNum}`
    const nodeIdToCoord: EndomorphDict = {};

    // nodeId -> `${colNum},${rowNum}`[]
    // nodeIdToParentCoords is a mapping from the id of a
    // node to an array of (colNum, rowNum) of its parent nodes
    const nodeIdToParentCoords: PolymorphDict = {};

    // nodeId -> nodeId[]
    const nodeIdToParentNodeIds: PolymorphDict = {};

    const offset = 0; // TODO: Does this ever change?

    // BFS with Min Heap to keep track of toExplore
    while (!toExplore.isEmpty()) {
        const min = toExplore.deleteMin();
        const id = min ? min.val : "";
        const workflowStepNode = workflowStepNodes[id];
        const { nextNodes, workflowStepOrder } = workflowStepNode;

        // Place the workflow step id into the matrix
        // We need to account for the coord of the parent node when placing a new
        // node into the matrix
        // Get Parents' Ids
        const parentIds = nodeIdToParentNodeIds[id];

        // sort parentIds by rowNum in ascending order
        const orderedParentIds = parentIds && sort(parentIdSortBy(nodeIdToCoord), parentIds);
        const parentId = parentIds ? orderedParentIds[0] : "";
        const encodedParentCoord = nodeIdToCoord[parentId]; // smallest rowNum

        const coord = addNodeToMatrix({
            matrix,
            colNum: (workflowStepOrder * 2) + offset,
            newNodeId: id,
            encodedParentCoord
        });

        // Add current node's coord into nodeIdToCoord
        nodeIdToCoord[id] = encodeMatrixCoord(coord);

        // TODO: nextNodes - if we are currently looking at a decision step,
        // there will be multiple steps. we want to sort the nextNodes here or sort it
        // in createWorkflowVisData to explore it in this order
        const sortedNextNodes = getSortedNextNodes({ nextNodes, workflowStepNodes });

        for (let i = 0; i < sortedNextNodes.length; i += 1) {
            const nextStepId = sortedNextNodes[i];

            // Update nodeIdToParentCoords here using nodeIdToCoord.
            // We are guaranteed that nextStep's parent's coord  is in nodeIdToCoord
            // because nextStep's parent is current node, which we just added to nodeIdToCoord above
            const parentCoordsEntry = nodeIdToParentCoords[nextStepId];
            nodeIdToParentCoords[nextStepId] = (parentCoordsEntry || []).concat(nodeIdToCoord[id]);

            const parentNodeIds = nodeIdToParentNodeIds[nextStepId];
            nodeIdToParentNodeIds[nextStepId] = (parentNodeIds || []).concat(id);
            if (!explored[nextStepId]) {
                // toExplore maintains the nodeIds in ascending order based on workflowStepOrder
                // Inefficient to sort everytime for an insert. We can do better on performance by
                // maintaining toExplore as a priority queue
                // console.log("inserting next step", workflowStepNodes[nextStepId]);
                // TODO: Create a function for calculating the priority.
                // If next step is primary, nextStepPriority will be a number between 0 and 1.
                // We want to explore all the nodes from the primnary branch from left to
                // right first. Then we want to explore the non-primary branches from left to right.
                // NOTE, the node with the smaller priority get explored first

                const childOrder = i / sortedNextNodes.length;
                const priority = workflowStepNodes[nextStepId].workflowStepOrder + childOrder;

                toExplore.insert({
                    val: nextStepId,
                    priority
                });
                explored[nextStepId] = true;
            }
        }
    }

    // Step 2 - Use parentCoords and nodeCoord to populate the matrix with connectors
    // Step 2.1 - place connectors horizontally
    const coordPairs: CoordPairT[] = createCoordPairs({ nodeIdToCoord, nodeIdToParentCoords });
    const connectorsToPlace: ConnectorToPlace[] = chain(
        createHorizConnectorsBetweenNodes, coordPairs
    );

    // TODO: we may need to place connectors into matrix first because that's when we find out
    // if we have a collision? The addConnectorToMatrix function should return a new matrix
    const nodeCoords: string[] = Object.values(nodeIdToCoord);
    // Populate matrix with regular connectors
    connectorsToPlace
        .forEach(
            (connectorToPlace) => addConnectorToMatrix({ matrix, connectorToPlace, nodeCoords })
        );


    // Step 2.2 - If there are right up connectors in the matrix, we want to draw
    // vertLine and arrowUp above them while the tile is empty.

    // TODO: We will cache the coord of all the rightUp connectors in the matrix
    // during createHorizConnectorsBetweenNodes. After that's implemented, we can get rid
    // of the nested for loop below

    getRightUpCoords(connectorsToPlace)
        .forEach(
            (rightUpCoord) => addVertConnectorsToMatrix({ matrix, startCoord: rightUpCoord })
        );

    // Step 2.3 - Decision Step Dashed line

    // Add the decision step dashline plus sign placeholder into the matrix where the decision
    // steps are
    // Populate matrix with downRight dash line connectors branching from diamond
    downRightDashesToPlace({ matrix, forkStepCols })
        .forEach((downRightDashToPlace) => replaceTile({
            matrix,
            replaceBy: downRightDashToPlace.replaceBy,
            coord: downRightDashToPlace.coord
        }));

    return { matrix, nodeIdToCoord, nodeIdToParentNodeIds };
};

export {
    decodeMatrixEntry,
    decodeMatrixCoord,
    findNextNode,
    invertKeyVal
} from "./matrixUtils";

export * from "./stepNodesUtils";
