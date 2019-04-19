// Utils
import { clone, chain, sort } from "ramda";

// Types
import {
    WorkflowVisDataT, WorkflowStepNodeT, WorkflowStepNodes, Matrix,
    MatrixCoord, ConnectorToPlace, ColType, CoordPairT, ConnectorName,
    GenericTileType, ConnectorTypeT
} from "../types/workflowVisTypes";
import { WorkflowStepT, WorkflowStepTypeT } from "../types/workflow";
import { OccurenceDict, ExistentialDict, EndomorphDict, PolymorphDict } from "../types/generic";

// Constants
const MATRIX_PLACEHOLDER_NAME = ConnectorName.EMPTY;

/**
 * Determines if a tileType is a member of ConnectorTypeT
 *
 * @param {GenericTileType} tileType
 * @return {boolean} true if tileType is a member of ConnectorTypeT
 */
export const isConnector = (tileType: GenericTileType): tileType is ConnectorTypeT =>
    Object.values(ConnectorTypeT).includes(tileType);

/**
 * Encodes colNum and rowNum as comma delimited string
 *
 * @param {number} colNum
 * @param {number} rowNum
 * @returns {string} a comma delimited string encoding colNum and rowNum
 */
export const encodeMatrixCoord = ({ colNum, rowNum }: MatrixCoord): string => `${colNum},${rowNum}`;

/**
 * Decodes colNum and rowNum from comma delimited string
 *
 * @param {string} colRow a comma delimited string encoding colNum and rowNum
 * @returns {number} colNum
 * @returns {number} rowNum
 */
export const decodeMatrixCoord = (colRow: string): MatrixCoord => {
    const [colNum, rowNum] = colRow.split(",").map(s => +s);
    return { colNum, rowNum };
};

/**
 * Creates a string from the given parameters encoding information about the matrix entry
 *
 * @param {ColType} colType
 * @param {string} entryName
 * @param {string} encodedOwnCoord
 * @param {string} encodedParentCoord
 * @return {string} matrixEntry - a period delimited string that encodes all the params
 */
export const encodeMatrixEntry = (
    { colType, entryName, encodedOwnCoord, encodedParentCoord }: {
        colType: ColType;
        entryName: string;
        encodedOwnCoord: string;
        encodedParentCoord?: string;
    }
): string => {
    const parentCoord = encodedParentCoord ? `|${encodedParentCoord}` : "";
    return `${colType}|${entryName}|${encodedOwnCoord}${parentCoord}`;
};

/**
 * Get info about the tile from the matrixEntry string
 *
 * @param {string} matrixEntry
 * @returns {ColType} tileType
 * @returns {string} tileId
 * @returns {(string|undefined)} tileName
 * @returns {(string|undefined)} encodedOwnCoord
 * @returns {(string|undefined)} encodedParentNodeCoord - coord of a workflowStep
 */
export const decodeMatrixEntry = (matrixEntry: string): {
    tileType: ColType;
    tileId: string;
    tileName: string | undefined;
    encodedOwnCoord: string | undefined;
    encodedParentNodeCoord: string | undefined;
} => {
    const [tileType, tileName, encodedOwnCoord, encodedParentNodeCoord] = matrixEntry.split("|");

    // If matrixEntry is a workflowStep, nodeType is the id because matrixEntry for
    // a workflowStep is simply the workflowStepUid
    const tileId = isConnector(tileType) ? `${tileType}|${tileName}` : tileType;

    return {
        tileType: tileType as ColType, tileId, tileName, encodedOwnCoord, encodedParentNodeCoord
    };
};

/**
 * Determine if a matrixEntry string is a connector with the name "empty"
 *
 * @param {string} matrixEntry 
 * @returns {boolean} true if matrixEntry represents a placeholder
 */
export const isPlaceholder = (matrixEntry: string): boolean => {
    const { tileType, tileName } = decodeMatrixEntry(matrixEntry);
    return isConnector(tileType) && tileName === MATRIX_PLACEHOLDER_NAME;
};

// Mutable function (mutates matrix) instead of returning
// a new matrix for performance reasons
const replaceTile = (
    { matrix, replaceBy, coord }: { matrix: Matrix; replaceBy: string; coord: MatrixCoord }
): void => {
    const { rowNum, colNum } = coord;

    const newCol = clone(matrix[colNum]);
    newCol[rowNum] = replaceBy;
    matrix[colNum] = newCol;
};

/**
 *
 * @param {number} numRows number of rows
 * @param {number} colNum column number
 * @param {colType} colType
 * @returns {Array} an array of matrixEntries
 */
export const initCol = (
    { numRows, colNum, colType }: { numRows: number; colNum: number; colType: ColType }
): string[] => Array.from(Array(numRows)
    .keys())
    .map(rowNum => encodeMatrixEntry({
        colType,
        entryName: MATRIX_PLACEHOLDER_NAME,
        encodedOwnCoord: encodeMatrixCoord({ colNum, rowNum })
    }));

/**
 * Creates a numCols x numRows matrix initalized with placeholders (box.empty, diamond.empty, or standard.empty)
 * 
 * @param {number} numRows
 * @param {ColType} colTypes array of ColTypes (string) - box, diamond, or standard
 * @returns {Matrix} a 2D array of matrixEntries
 */
export const initMatrix = (
    { numRows, colTypes }: { numRows: number; colTypes: ColType[] }
): Matrix => colTypes.map((colType: ColType, i: number) => initCol({
    numRows, colNum: i, colType
}));

// TODO: test getPrevSteps
const getPrevSteps = ({
    workflowSteps, workflowStepOrder
}: { workflowSteps: WorkflowStepT[]; workflowStepOrder: number }
): WorkflowStepT[] => workflowSteps.filter(wfStep =>
    wfStep.workflowStepType !== WorkflowStepTypeT.DECISION &&
    wfStep.workflowStepOrder < workflowStepOrder
);

const createWorkflowStepNodes = (
    { workflowSteps, workflowUid }: {
        workflowUid: string; workflowSteps: WorkflowStepT[];
    }
): {
    workflowStepNodes: WorkflowStepNodes;
    workflowStepOrderOccur: OccurenceDict;
    firstStepId: string;
    decisionStepCols: number[];
} => {
    const firstStepId = `${workflowUid}-auth`;

    let workflowStepNodes: { [id: string]: WorkflowStepNodeT } = {};
    let authorizeNextSteps: string[] = [];
    let decisionStepCols: number[] = [];

    const workflowStepOrderOccur: OccurenceDict = {};
    for (let i = 0; i < workflowSteps.length; i += 1) {
        const workflowStep = workflowSteps[i];

        const {
            workflowStepOrder,
            workflowStepUid,
            workflowStepName,
            workflowStepType,
            actions
        } = workflowStep;

        // We need to convert all keys for dictionaries to a string because key of a dictionary
        // must be string as we defined it in types/generics
        const stringifiedWorkflowStepOrder = String(workflowStepOrder);

        workflowStepOrderOccur[stringifiedWorkflowStepOrder] = (
            workflowStepOrderOccur[stringifiedWorkflowStepOrder]
                ? workflowStepOrderOccur[stringifiedWorkflowStepOrder]
                : 0) + 1;

        if (workflowStepType === WorkflowStepTypeT.DECISION) {
            decisionStepCols = decisionStepCols.concat(workflowStepOrder * 2);
        }

        if (workflowStepOrder === 1) {
            authorizeNextSteps = [workflowStepUid];
        }

        // Not sure if we need prevSteps...?
        const prevSteps = getPrevSteps({ workflowSteps, workflowStepOrder });

        const nextSteps = actions
            .filter(action => action.actionType !== "REJECT")
            .map(action => action.nextWorkflowStepUid);

        workflowStepNodes[workflowStepUid] = {
            id: workflowStepUid,
            name: workflowStepName,
            type: workflowStepType,
            workflowStepOrder,
            nextSteps,
            prevSteps
        };
    }

    workflowStepNodes = {
        ...workflowStepNodes,
        [firstStepId]: {
            id: firstStepId,
            name: "Authorize",
            type: WorkflowStepTypeT.AUTHORIZE,
            workflowStepOrder: 0,
            nextSteps: authorizeNextSteps,
            prevSteps: []
        }
    };

    return { firstStepId, workflowStepNodes, workflowStepOrderOccur, decisionStepCols };
};


/**
 * Creates the workflowVisData and initial matrix
 *
 * @param {Array} workflowSteps 
 * @param {string} workflowUid 
 * @returns {WorkflowVisDataT} workflowVisData
 * @returns {Matrix} initialMatrix
 * @returns {Array} decisionStepCols - the colNums where decision steps are
 */
export const createWorkflowVisData = (
    { workflowSteps, workflowUid }: { workflowSteps: WorkflowStepT[]; workflowUid: string }
): { workflowVisData: WorkflowVisDataT; initialMatrix: Matrix; decisionStepCols: number[] } => {
    const {
        firstStepId, workflowStepNodes, workflowStepOrderOccur, decisionStepCols
    } = createWorkflowStepNodes({ workflowSteps, workflowUid });
    const workflowVisData = {
        firstStep: firstStepId,
        workflowStepNodes
    };

    const numCols = (Math.max(...Object.keys(workflowStepOrderOccur).map(id => +id)) * 2) + 1;

    // Naive: if we see at least one decision step, we want to add an additional row to the matrix
    // to accomodate the dash line add button
    const numRows = Math.max(...Object.values(workflowStepOrderOccur))
        + (+(decisionStepCols.length > 0));

    const colTypes = Array(numCols).fill("standard").map((colType: ColType, i) => {
        if (i % 2 === 1) return colType;
        return decisionStepCols.includes(i) ? ColType.DIAMOND : ColType.BOX;
    });

    const initialMatrix = initMatrix({ numRows, colTypes });

    return {
        workflowVisData,
        initialMatrix,
        decisionStepCols
    };
};

// TODO: test and JSDocs
export const firstUnoccupiedInCol = (col: string[]) =>
    col.findIndex((matrixEntry: string) => isPlaceholder(matrixEntry));

/**
 * Adds a new Node to the matrix. Mutates the original matrix. 
 *
 * @param {Matrix} matrix
 * @param {number} colNum
 * @param {string} newNodeId
 * @returns {MatrixCoord} { rowNum, colNum } of the newly added Node in the matrix
 */
export const addWorkflowStepToMatrix = (
    { matrix, colNum, newNodeId, encodedParentCoord }: {
        matrix: Matrix;
        colNum: number;
        newNodeId: string;
        encodedParentCoord: string | undefined;
    }
): MatrixCoord => {
    // console.log("encodedParentCoord: ", encodedParentCoord);
    const col = matrix[colNum];

    // Determine rowNum
    // Naive: rowNum is the first unoccupied
    // Better: If no parent, rowNum is the first unoccupied.
    // If has parent, rowNum is parent rowNum or firstt unoccupied, whichever is greater
    const firstUnoccupiedRowNum = firstUnoccupiedInCol(col);
    let rowNum: number;
    if (encodedParentCoord) {
        const { rowNum: parentRowNum } = decodeMatrixCoord(encodedParentCoord);
        rowNum = Math.max(parentRowNum, firstUnoccupiedRowNum);
    } else {
        rowNum = firstUnoccupiedRowNum;
    }

    // TODO:
    // Best: if no parent, rowNum is the first unoccupied. If has parent, rowNum is parent rowNum but if that is occupied, then
    // we shift col 2 places to the right
    // Also need to consider if the step is primary. If it is primary, it has to be in the first place in col
    // TODO: Need to have a function for replace col type
    // We also need to change the size of the matrix and shift all the nodes to the right and down

    replaceTile({
        coord: { colNum, rowNum },
        matrix,
        replaceBy: newNodeId
    });
    return { rowNum, colNum };
};

/**
 * Mutates the matrix by replacing tiles with connectors
 *
 * @param {Matrix} matrix initial matrix with workflowSteps already placed
 * @param {ConnectorToPlace} connectorToPlace instruction for how to place a connectors into matrix
 * @param {Array} nodeCoords an array of matrix coords for all the nodes (i.e., workflowSteps)
 * @returns {string} replaceBy - string for the new connector matrixEntry
 */
export const addConnectorToMatrix = (
    { matrix, connectorToPlace, nodeCoords }: {
        matrix: Matrix; connectorToPlace: ConnectorToPlace; nodeCoords: string[];
    }
): { replaceBy: string } => {
    const { ownCoord, parentCoord, connectorName } = connectorToPlace;
    const { colNum, rowNum } = decodeMatrixCoord(ownCoord);
    const { tileType } = decodeMatrixEntry(matrix[colNum][rowNum]);

    const parentNodeCoord: string | undefined = nodeCoords.includes(parentCoord) ?
        parentCoord : undefined;

    const replaceBy = encodeMatrixEntry({
        colType: tileType,
        entryName: connectorName,
        encodedOwnCoord: ownCoord,
        encodedParentCoord: parentNodeCoord
    });

    replaceTile({
        matrix,
        replaceBy,
        coord: { colNum, rowNum }
    });

    return { replaceBy };
};

/**
 * Creates an array of parentCoord/childCoord pairs for use by connectorBetweenNodes
 *
 * @param {EndomorphDict} nodeIdToCoord
 * @param {PolymorphDict} nodeToParentCoords
 * @returns {Array} an array of pairs of coords (parentNode and childNode)
 */
export const createCoordPairs = (
    { nodeIdToCoord, nodeIdToParentCoords }: {
        nodeIdToCoord: EndomorphDict;
        nodeIdToParentCoords: PolymorphDict;
    }
): CoordPairT[] => {
    const nodeIds = Object.keys(nodeIdToParentCoords);

    const newCoord = (nodeId: string): CoordPairT[] => nodeIdToParentCoords[nodeId].map((colRow: string) => ({
        parentCoord: decodeMatrixCoord(colRow),
        childCoord: decodeMatrixCoord(nodeIdToCoord[nodeId])
    }));

    return chain(nodeId => newCoord(nodeId), nodeIds);
};

/**
 * Create a sequence of LineHoriz and returns the coordinate of the last LineHoriz 
 *
 * @param {number} startCol
 * @param {number} endCol
 * @param {number} rowNum
 * @param {string} parentCoord
 * @returns {Array} lines - an array of ConnectorToPlace for lineHoriz
 * @returns {string} lastLineCoord - the coord of the last lineHoriz in the series
 */
export const createLineHorizes = (
    { startCol, endCol, rowNum, parentCoord }: {
        startCol: number; endCol: number; rowNum: number; parentCoord: string;
    }
): { lines: ConnectorToPlace[]; lastLineCoord: string } => {
    let lines: ConnectorToPlace[] = [];
    let currParentCoord = parentCoord;
    for (let colNum = startCol; colNum < endCol; colNum += 1) {
        const ownCoord = encodeMatrixCoord({ colNum, rowNum });
        const newEntry = {
            ownCoord,
            parentCoord: currParentCoord,
            connectorName: ConnectorName.LINE_HORIZ
        };
        lines = lines.concat(newEntry);
        currParentCoord = encodeMatrixCoord({ colNum, rowNum });
    }

    return { lines, lastLineCoord: currParentCoord };
};


/**
 * Creates an array of connectors to place with specific values and locations in the matrix
 *
 * @param {MatrixCoord} parentCoord
 * @param {MatrixCoord} childCoord
 * @returns {Array} an array of ConnectorToPlace for between the colNums of parent and child nodes
 */
export const createConnectorsBetweenNodes = (coordPair: CoordPairT): ConnectorToPlace[] => {
    const { parentCoord, childCoord } = coordPair;
    const { colNum: fromCol, rowNum: fromRow } = parentCoord;
    const { colNum: toCol, rowNum: toRow } = childCoord;

    const parentNodeCoord = encodeMatrixCoord({ colNum: fromCol, rowNum: fromRow });

    // Case 1: fromRow = toRow
    // should be lineHoriz, ..., arrowRight
    // row should be fromRow.
    // fill connectors at: fromCol+1 until toCol-1
    if (fromRow === toRow) {
        const startCol = fromCol + 1;
        const endCol = toCol - 1;
        const rowNum = fromRow;

        const { lines, lastLineCoord } = createLineHorizes({
            startCol, endCol, rowNum, parentCoord: parentNodeCoord
        });

        const lastEntry = {
            ownCoord: encodeMatrixCoord({ colNum: endCol, rowNum }),
            connectorName: ConnectorName.ARROW_RIGHT,
            parentCoord: lastLineCoord
        };

        return lines.concat(lastEntry);
    }

    // Case 2: fromRow < toRow
    // should be downRight, lineHoriz, ..., arrowRight
    // row should be toRow.
    // fill connectors at: fromCol until toCol-1
    if (fromRow < toRow) {
        const startCol = fromCol;
        const endCol = toCol - 1;
        const rowNum = toRow;

        // NOTE: Although downRight's parent is really the node, parentCoord is used to
        // Support rendering of the plus sign. Only the connector that renders the plus sign
        // can have its parentCol to be the parent node's col. Since we don't want to render
        // the plus sign on the downRight connector, we need to make sure this connector's
        // parentCoord is pointing to an empty slot in the matrix
        const firstEntry = {
            ownCoord: encodeMatrixCoord({ colNum: startCol, rowNum }),
            parentCoord: encodeMatrixCoord({ colNum: fromCol - 1, rowNum: rowNum }),
            connectorName: ConnectorName.DOWN_RIGHT
        };
        const { lines, lastLineCoord } = createLineHorizes({
            startCol: startCol + 1, endCol, rowNum, parentCoord: parentNodeCoord
        });

        const lastEntry = {
            ownCoord: encodeMatrixCoord({ colNum: endCol, rowNum }),
            parentCoord: lastLineCoord,
            connectorName: ConnectorName.ARROW_RIGHT
        };

        return [firstEntry].concat(lines).concat(lastEntry);
    }

    // Case 3: fromRow > toRow
    // should be lineHoriz, ..., rightUpArrow
    // row should be fromRow.
    // fill connectors at: fromCol+1 until toCol
    const startCol = fromCol + 1;
    const endCol = toCol;
    const rowNum = fromRow;
    const { lines, lastLineCoord } = createLineHorizes({
        startCol, endCol, rowNum, parentCoord: parentNodeCoord
    });

    const lastEntry = {
        ownCoord: encodeMatrixCoord({ colNum: endCol, rowNum }),
        connectorName: ConnectorName.RIGHT_UP_ARROW,
        parentCoord: lastLineCoord
    };

    return lines.concat(lastEntry);
};


/**
 * Takes a dictionary and returns a new dictionary with the key and value swapped
 *
 * @param {EndomorphDict} keyToVal 
 * @param {EndomorphDict} valToKey
 */
export const invertKeyVal = (keyToVal: EndomorphDict) =>
    Object.keys(keyToVal).map(key => [key, keyToVal[key]]).reduce((acc, curr) => {
        const [key, val] = curr;
        const valToKey = { [val]: key };
        return { ...acc, ...valToKey };
    }, {});


/**
 * Provides instruction for where to place a dash line forking from decision step
 *
 * @param {Matrix} matrix
 * @param {Array} decisionStepCols
 * @returns {Array} {replaceBy, coord}
 */
export const downRightDashesToPlace = (
    { matrix, decisionStepCols }: { matrix: Matrix; decisionStepCols: number[] }
): { replaceBy: string; coord: MatrixCoord }[] => decisionStepCols.map(colNum => {
    const rowNum = firstUnoccupiedInCol(matrix[colNum]);
    const encodedOwnCoord = encodeMatrixCoord({ colNum, rowNum });
    const encodedParentNodeCoord = encodeMatrixCoord({ colNum, rowNum: 0 });
    const replaceBy = encodeMatrixEntry({
        colType: ColType.DIAMOND,
        entryName: ConnectorName.DOWN_RIGHT_DASH,
        encodedOwnCoord,
        encodedParentCoord: encodedParentNodeCoord
    });
    return {
        replaceBy,
        coord: { colNum, rowNum }
    };
});

const getRowNum = ({ nodeId, nodeIdToCoord }: { nodeId: string; nodeIdToCoord: EndomorphDict }) =>
    decodeMatrixCoord(nodeIdToCoord[nodeId]).rowNum;

const parentIdSortBy = (nodeIdToCoord: EndomorphDict) => (a: string, b: string) =>
    getRowNum({ nodeId: a, nodeIdToCoord }) - getRowNum({ nodeId: b, nodeIdToCoord });

const toExploreSortBy = (workflowStepNodes: WorkflowStepNodes) => (a: string, b: string) => {
    const { workflowStepOrder: aOrder } = workflowStepNodes[a];
    const { workflowStepOrder: bOrder } = workflowStepNodes[b];
    return bOrder - aOrder;
};

// TODO: Implement priority queue to keep track of toExplore
// export function PriorityQueue() {
//     this.front = null;
//     this.insert = (priority: number) => {

//     };
//     this.peek = () => {};
//     this.pull = () => {};
//     this.isEmpty = () => {};
// };


/**
 * Uses workflowVisData to populate initialMatrix with workflow steps and connectors
 *
 * @param {WorkflowVisDataT} workflowVisData
 * @param {Matrix} initialMatrix
 * @param {Array} decisionStepCols - the columns where decision steps reside
 * @returns {Matrix} matrix - populated matrix (may be a different size than initialMatrix)
 * @returns {EndomorphDict} nodeIdToCoord - a hashmap of nodeId to its matrix coord
 */
export const populateMatrix = (
    { workflowVisData, initialMatrix, decisionStepCols }: {
        workflowVisData: WorkflowVisDataT;
        initialMatrix: Matrix;
        decisionStepCols: number[];
    }
): { matrix: Matrix; nodeIdToCoord: EndomorphDict } => {
    console.log("Populate Matrix...");

    const matrix = clone(initialMatrix);

    // Step 1 - Traverse graph (BFS) and generate nodeIdToParentCoords and nodeIdToCoord
    // together, these hash maps tell us how tiles in the matrix are connected

    const { firstStep, workflowStepNodes } = workflowVisData;

    let toExplore = [firstStep];
    const explored: ExistentialDict = {};

    // nodeId -> `${colNum},${rowNum}`
    const nodeIdToCoord: EndomorphDict = {};

    // nodeId -> `${colNum},${rowNum}`[]
    // nodeIdToParentCoords is a mapping from the id of a
    // node to an array of (colNum, rowNum) of its parent nodes
    const nodeIdToParentCoords: PolymorphDict = {};

    // nodeId -> nodeId[]
    const nodeIdToParentNodeIds: PolymorphDict = {};

    let offset = 0; // TODO: addWorkflowStepToMatrix will modify offset
    while (toExplore.length > 0) {
        const [id, ...rest] = toExplore; // toExplore needs to be a priority queue
        toExplore = rest;
        const workflowStepNode = workflowStepNodes[id];
        const { nextSteps, workflowStepOrder } = workflowStepNode;

        // Place the workflow step id into the matrix
        // We need to account for the coord of the parent node when placing a new
        // node into the matrix
        // Get Parents' Ids
        const parentIds = nodeIdToParentNodeIds[id];

        // console.log(">>>>>>> newNodeId", id);
        // console.log("prevStepIds", parentIds);

        // sort parentIds from smallest rowNum to largest rowNum
        const orderedParentIds = parentIds && sort(parentIdSortBy(nodeIdToCoord), parentIds);
        const parentId = parentIds ? orderedParentIds[0] : "";
        const encodedParentCoord = nodeIdToCoord[parentId];

        // console.log("orderedParentIds", orderedParentIds);
        // console.log("parentId", parentId);
        // console.log("encodedParentCoord", nodeIdToCoord[parentId]);

        const coord = addWorkflowStepToMatrix({
            matrix,
            colNum: workflowStepOrder * 2 + offset,
            newNodeId: id,
            encodedParentCoord
        });

        // Add current node's coord into nodeIdToCoord
        nodeIdToCoord[id] = encodeMatrixCoord(coord);

        let nextStepId = null;
        for (let i = 0; i < nextSteps.length; i += 1) {
            nextStepId = nextSteps[i];

            // Update nodeToParentCoords here using nodeIdToCoord.
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
                toExplore = sort(
                    toExploreSortBy(workflowStepNodes),
                    toExplore.concat(nextStepId)
                );
                explored[nextStepId] = true;
            }
            // console.log("toExplore", toExplore);
            // console.log("toExplore workflowStepOrder", toExplore.map(nodeId => workflowStepNodes[nodeId].workflowStepOrder));
        }
    }

    // Step 2 - Use parentCoords and nodeCoord to populate the matrix with connectors
    console.log("--nodeIdToCoord", nodeIdToCoord);
    console.log("--nodeToParentCoords", nodeIdToParentCoords);
    console.log("--nodeIdToParentNodeIds", nodeIdToParentNodeIds);

    const coordPairs: CoordPairT[] = createCoordPairs({ nodeIdToCoord, nodeIdToParentCoords });
    const connectorsToPlace: ConnectorToPlace[] = chain(createConnectorsBetweenNodes, coordPairs);

    // TODO: we may need to place connectors into matrix first because that's when we find out if we have a collision?
    // The addConnectorToMatrix function should return a new matrix
    const nodeCoords: string[] = Object.values(nodeIdToCoord);

    // Populate matrix with regular connectors
    connectorsToPlace
        .forEach(
            connectorToPlace => addConnectorToMatrix({ matrix, connectorToPlace, nodeCoords })
        );

    // Add the decision step dashline plus sign placeholder into the matrix where the decision
    // steps are
    // TODO: Need to write a helper function to determine the rowNum of the first unoccupied (empty) tile

    // Populate matrix with downRight dash line connectors branching from diamond
    downRightDashesToPlace({ matrix, decisionStepCols })
        .forEach(downRightDashToPlace => replaceTile({
            matrix,
            replaceBy: downRightDashToPlace.replaceBy,
            coord: downRightDashToPlace.coord
        }));

    return { matrix, nodeIdToCoord };
};