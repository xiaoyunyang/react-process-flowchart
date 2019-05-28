// Utils
import { clone, chain, sort } from "ramda";
import MinHeap from "./MinHeap";


// Types
import {
    WorkflowVisDataT, WorkflowStepNodeT, WorkflowStepNodes, Matrix,
    MatrixCoord, ConnectorToPlace, ColType, CoordPairT, ConnectorName,
    GenericTileType, ConnectorTypeT, NextNode
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
 * Determines the rowNum of the first unoccupied (empty) tile
 *
 * @param {string[]} col
 * @return {number} rowNum
 */
export const isPlaceholder = (matrixEntry: string): boolean => {
    const { tileType, tileName } = decodeMatrixEntry(matrixEntry);
    return isConnector(tileType) && tileName === MATRIX_PLACEHOLDER_NAME;
};

/**
 * Determines the rowNum of the first empty slot in a column
 * @param {string[]} col
 * @return {number} rowNum
 */
export const firstUnoccupiedInCol = (col: string[]): number =>
    col.findIndex((matrixEntry: string) => isPlaceholder(matrixEntry));

/**
 * Determines the rowNum of the last non-empty slot in a column that's a node
 * @param {string[]} col
 * @return {number} rowNum
 */
export const lastNodeInCol = (col: string[]): number => {
    for (let i = col.length - 1; i >= 0; i -= 1) {
        const matrixEntry = col[i];
        const { tileType } = decodeMatrixEntry(matrixEntry);

        if (!isConnector(tileType)) return i;
    }
    return -1;
};

/**
 * Determines the rowNum of the last non-empty slot in a column
 * @param {string[]} col
 * @return {number} rowNum
 */
export const lastOccupiedInCol = (col: string[]): number => {
    for (let i = col.length - 1; i >= 0; i -= 1) {
        const matrixEntry = col[i];

        if (!isPlaceholder(matrixEntry)) return i;
    }
    return -1;
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
 * @returns {string[]} an array of matrixEntries
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
    let authorizeNextNodes: { id: string; primary: boolean }[] = [];
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
            authorizeNextNodes = [{ id: workflowStepUid, primary: true }];
        }

        // Not sure if we need prevSteps...?
        const prevSteps = getPrevSteps({ workflowSteps, workflowStepOrder });

        const nextNodes = actions
            .filter(action => action.actionType !== "REJECT")
            .map(action => ({ id: action.nextWorkflowStepUid, primary: action.primary }));

        workflowStepNodes[workflowStepUid] = {
            id: workflowStepUid,
            name: workflowStepName,
            type: workflowStepType,
            workflowStepOrder,
            nextNodes,
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
            nextNodes: authorizeNextNodes,
            prevSteps: []
        }
    };

    return { firstStepId, workflowStepNodes, workflowStepOrderOccur, decisionStepCols };
};


/**
 * Creates the workflowVisData and initial matrix
 *
 * @param {string[]} workflowSteps 
 * @param {string} workflowUid 
 * @returns {WorkflowVisDataT} workflowVisData
 * @returns {Matrix} initialMatrix
 * @returns {number[]} decisionStepCols - the colNums where decision steps are
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

/**
 * Adds a new Node to the matrix. Mutates the original matrix. 
 *
 * @param {Matrix} matrix
 * @param {number} colNum
 * @param {string} newNodeId
 * @returns {MatrixCoord} { rowNum, colNum } of the newly added Node in the matrix
 */
export const addNodeToMatrix = (
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
    // If has parent, rowNum is parent rowNum or first unoccupied, whichever is greater
    // Note, in this iteration, we are assuming that the tile at parent's rowNum is unoccupied
    // but that's not necessarily true. In a future iteration, we want to also check that the
    // tile at parent's rowNum is unoccupied. If it's occupied, we want to change the size of
    // of the matrix.
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
 * get rightUpCoords from connectors to place
 * 
 * @param {ConnectorToPlace} connectorToPlace
 * @returns {MatrixCoord[]} rightUpCoords - coords for where all the rightUp connectors go
 */
export const getRightUpCoords = (connectorsToPlace: ConnectorToPlace[]): MatrixCoord[] =>
    connectorsToPlace
        .filter(({ connectorName }) => connectorName === ConnectorName.RIGHT_UP)
        .map(({ ownCoord }) => decodeMatrixCoord(ownCoord));

/**
 * Mutates the matrix by replacing tiles with connectors
 *
 * @param {Matrix} matrix initial matrix with workflowSteps already placed
 * @param {ConnectorToPlace} connectorToPlace instruction for how to place a connectors into matrix
 * @param {string[]} nodeCoords an array of matrix coords for all the nodes (i.e., workflowSteps)
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
 * @returns {CoordPairT[]} an array of pairs of coords (parentNode and childNode)
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
 * @returns {ConnectorToPlace[]} lines - an array of ConnectorToPlace for lineHoriz
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
 * Only in the horizontal direction
 *
 * @param {MatrixCoord} parentCoord
 * @param {MatrixCoord} childCoord
 * @returns {ConnectorToPlace[]} an array of ConnectorToPlace for between the colNums of parent and child nodes
 */
export const createHorizConnectorsBetweenNodes = (coordPair: CoordPairT): ConnectorToPlace[] => {
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

    const lastConnectorName = ((fromRow - toRow) > 1) ? ConnectorName.RIGHT_UP :
        ConnectorName.RIGHT_UP_ARROW;
    const lastEntry = {
        ownCoord: encodeMatrixCoord({ colNum: endCol, rowNum }),
        connectorName: lastConnectorName,
        parentCoord: lastLineCoord
    };

    return lines.concat(lastEntry);
};

/**
 * Adds vertical line and up arrow to a column in the matrix beginning from startCoord
 *
 * @param {Matrix} matrix
 * @param {MatrixCoord} startCoord
 * @returns void - mutates the matrix
 */
export const addVertConnectorsToMatrix = (
    { matrix, startCoord }: { matrix: Matrix; startCoord: MatrixCoord }
) => {
    const { colNum, rowNum } = startCoord;
    const col = clone(matrix[colNum]); // we elems of col in the loop

    for (let i = rowNum - 1; i >= 1; i -= 1) {
        const curr = col[i];
        const above = col[i - 1];
        if (!isPlaceholder(curr)) {
            break;
        }

        const { tileType, encodedOwnCoord, encodedParentNodeCoord } = decodeMatrixEntry(curr);
        const { tileType: aboveTileType } = decodeMatrixEntry(above);

        const entryName = (isPlaceholder(above) || isConnector(aboveTileType)) ? ConnectorName.LINE_VERT : ConnectorName.ARROW_UP;

        const replaceBy = encodeMatrixEntry({
            colType: tileType,
            entryName: entryName,
            encodedOwnCoord: encodedOwnCoord as string,
            encodedParentCoord: encodedParentNodeCoord as string
        });
        col[i] = replaceBy;
    }

    // mutate matrix
    matrix[colNum] = col;
};

/**
 * Takes a dictionary and returns a new dictionary with the key and value swapped
 *
 * @param {EndomorphDict} keyToVal 
 * @param {EndomorphDict} valToKey
 */
export const invertKeyVal = (keyToVal: EndomorphDict): EndomorphDict =>
    Object.keys(keyToVal).map(key => [key, keyToVal[key]]).reduce((acc, curr) => {
        const [key, val] = curr;
        const valToKey = { [val]: key };
        return { ...acc, ...valToKey };
    }, {});


/**
 * Provides instruction for where to place a dash line forking from decision step
 *
 * @param {Matrix} matrix
 * @param {number[]} decisionStepCols
 * @returns {Array} {replaceBy, coord}[]
 */
export const downRightDashesToPlace = (
    { matrix, decisionStepCols }: { matrix: Matrix; decisionStepCols: number[] }
): { replaceBy: string; coord: MatrixCoord }[] => decisionStepCols.map(colNum => {
    const col = matrix[colNum];
    const parentRowNum = lastNodeInCol(col);
    const rowNum = lastOccupiedInCol(col) + 1;
    const encodedOwnCoord = encodeMatrixCoord({ colNum, rowNum });
    const encodedParentNodeCoord = encodeMatrixCoord({ colNum, rowNum: parentRowNum });

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


const getPath = ({ node, graph }: { node: string; graph: PolymorphDict }) => {
    // An important assumption here is all the descendants of
    // node only has one child
    let path = [node];
    let children = graph[node];
    while (children.length > 0) {
        const child = children[0];
        path = path.concat(child);
        children = graph[child];
    }
    return path;
};

// Find closest point of convergence
const findClosestCommonDescendant = (
    { currPath, nodesToSort, paths }: {
        currPath: string[]; nodesToSort: string[]; paths: PolymorphDict;
    }
) => {
    for (let i = 1; i < currPath.length; i += 1) {
        const unsortedCandidatePaths = nodesToSort.map(node => ({
            head: node,
            commonAncestorIndex: paths[node].indexOf(currPath[i])
        })
        ).filter(
            ({ commonAncestorIndex }) => (commonAncestorIndex > 0)
        );

        const candidatePaths = sort(
            (a, b) => (a.commonAncestorIndex - b.commonAncestorIndex),
            unsortedCandidatePaths
        );

        if (candidatePaths.length > 0) {
            const nodeToAdd = candidatePaths[0].head;
            const newNodesToSort = nodesToSort.filter(
                node => node !== nodeToAdd
            );
            return { nodeToAdd, newNodesToSort };
        }
    }
    // TODO: Do we ever expect to get here?
    return {
        nodeToAdd: "",
        newNodesToSort: nodesToSort
    };
};

const closestCommonDescendantSort = (
    { primaryNode, nodes, graph }: { primaryNode: string; nodes: string[]; graph: PolymorphDict }
) => {
    // Step 1:
    // create decendent arrays for all the nodes
    const paths: PolymorphDict = {};
    const pathsArr = nodes.map(node => getPath({ node, graph }));
    pathsArr.forEach((path) => {
        const head = path[0];
        paths[head] = path;
    });

    let sortedNodes = [primaryNode];
    let currPath = paths[primaryNode];
    let nodesToSort = nodes.filter(n => n !== primaryNode);

    while (nodesToSort.length > 0) {
        const {
            nodeToAdd, newNodesToSort
        } = findClosestCommonDescendant({ currPath, nodesToSort, paths });

        sortedNodes = sortedNodes.concat(nodeToAdd);
        nodesToSort = newNodesToSort;

        currPath = paths[nodeToAdd];
    }

    return sortedNodes;
};

/**
 * sort by closest common descendant
 *
 * @param {Array} nextNodes 
 * @param {Object} WorkflowStepNodes
 * @param {Array<string>} sortedNextNodeIds
 */
const getSortedNextNodeIds = (
    { nextNodes, workflowStepNodes }: {
        nextNodes: NextNode[]; workflowStepNodes: WorkflowStepNodes;
    }
): string[] => {
    if (nextNodes.length < 2) return nextNodes.map(n => n.id);
    const primaryNode = nextNodes[
        nextNodes.findIndex(nextNode => nextNode.primary)
    ].id;

    const nodes: string[] = nextNodes.map(nextNode => nextNode.id);

    const graph: PolymorphDict = {};

    const nodeIds = Object.keys(workflowStepNodes);
    for (let i = 0; i < nodeIds.length; i += 1) {
        const nodeId = nodeIds[i];
        graph[nodeId] = workflowStepNodes[nodeId].nextNodes.map(n => n.id);
    }

    // const { id, primary } = nextNodes[i];
    console.log("FOOO", nextNodes);
    console.log("primaryNode:", primaryNode);
    console.log("nodes", nodes);
    console.log("graph", JSON.stringify(graph, null, 2));
    return closestCommonDescendantSort({ primaryNode, nodes, graph });
};

/**
 * Uses workflowVisData to populate initialMatrix with workflow steps and connectors
 *
 * @param {WorkflowVisDataT} workflowVisData
 * @param {Matrix} initialMatrix
 * @param {number[]} decisionStepCols - the columns where decision steps reside
 * @returns {Matrix} matrix - populated matrix (may be a different size than initialMatrix)
 * @returns {EndomorphDict} nodeIdToCoord - a hashmap of nodeId to its matrix coord
 * @returns {PolymorphDict} nodeIdToParentNodeIds
 */
export const populateMatrix = (
    { workflowVisData, initialMatrix, decisionStepCols }: {
        workflowVisData: WorkflowVisDataT;
        initialMatrix: Matrix;
        decisionStepCols: number[];
    }
): { matrix: Matrix; nodeIdToCoord: EndomorphDict; nodeIdToParentNodeIds: PolymorphDict } => {
    console.log("Populate Matrix...");

    const matrix = clone(initialMatrix);

    // Step 1 - Traverse graph (BFS) and generate nodeIdToParentCoords and nodeIdToCoord
    // together, these hash maps tell us how tiles in the matrix are connected

    const { firstStep, workflowStepNodes } = workflowVisData;

    const toExplore: MinHeap = new MinHeap();
    // NOTE: Priority is between 0 and 1
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

    let offset = 0; // TODO: addWorkflowStepToMatrix will modify offset

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

        // console.log(">>>>>>> newNodeId", id);
        // console.log("prevStepIds", parentIds);

        // sort parentIds by rowNum in ascending order
        const orderedParentIds = parentIds && sort(parentIdSortBy(nodeIdToCoord), parentIds);
        const parentId = parentIds ? orderedParentIds[0] : "";
        const encodedParentCoord = nodeIdToCoord[parentId]; // smallest rowNum

        // console.log("orderedParentIds", orderedParentIds);
        // console.log("parentId", parentId);
        // console.log("encodedParentCoord", nodeIdToCoord[parentId]);

        const coord = addNodeToMatrix({
            matrix,
            colNum: (workflowStepOrder * 2) + offset,
            newNodeId: id,
            encodedParentCoord
        });

        // Add current node's coord into nodeIdToCoord
        nodeIdToCoord[id] = encodeMatrixCoord(coord);
        // console.log("visiting id ---> ", id);

        // TODO: nextNodes - if we are currently looking at a decision step,
        // there will be multiple steps. we want to sort the nextNodes here or sort it
        // in createWorkflowVisData to explore it in this order
        const sortedNextNodeIds = getSortedNextNodeIds({ nextNodes, workflowStepNodes });

        for (let i = 0; i < sortedNextNodeIds.length; i += 1) {
            const nextStepId = sortedNextNodeIds[i];


            // Update nodeIdToParentCoords here using nodeIdToCoord.
            // We are guaranteed that nextStep's parent's coord  is in nodeIdToCoord
            // because nextStep's parent is current node, which we just added to nodeIdToCoord above
            const parentCoordsEntry = nodeIdToParentCoords[nextStepId];
            nodeIdToParentCoords[nextStepId] = (parentCoordsEntry || []).concat(nodeIdToCoord[id]);

            const parentNodeIds = nodeIdToParentNodeIds[nextStepId];
            nodeIdToParentNodeIds[nextStepId] = (parentNodeIds || []).concat(id);
            // console.log("nodeIdToParentNodeIds = ", JSON.stringify(nodeIdToParentNodeIds, null, 2));
            if (!explored[nextStepId]) {
                // toExplore maintains the nodeIds in ascending order based on workflowStepOrder
                // Inefficient to sort everytime for an insert. We can do better on performance by
                // maintaining toExplore as a priority queue
                console.log("inserting next step", workflowStepNodes[nextStepId]);

                // TODO: Create a function for calculating the priority.
                // If next step is primary, nextStepPriority will be a number between 0 and 1.
                // We want to explore all the nodes from the primnary branch from left to
                // right first. Then we want to explore the non-primary branches from left to right.
                // NOTE, the node with the smaller priority get explored first


                const childOrder = +`${0}.${i}`;
                const priority = workflowStepNodes[nextStepId].workflowStepOrder + childOrder;

                toExplore.insert({
                    val: nextStepId,
                    priority
                });
                explored[nextStepId] = true;
            }
            // console.log("toExplore", toExplore);
            // console.log("toExplore workflowStepOrder", toExplore.map(nodeId => workflowStepNodes[nodeId].workflowStepOrder));
        }
    }

    // Step 2 - Use parentCoords and nodeCoord to populate the matrix with connectors
    // console.log("--nodeIdToCoord", nodeIdToCoord);
    // console.log("--nodeToParentCoords", nodeIdToParentCoords);
    // console.log("--nodeIdToParentNodeIds", nodeIdToParentNodeIds);

    // Step 2.1 - place connectors horizontally
    const coordPairs: CoordPairT[] = createCoordPairs({ nodeIdToCoord, nodeIdToParentCoords });
    const connectorsToPlace: ConnectorToPlace[] = chain(
        createHorizConnectorsBetweenNodes, coordPairs
    );

    // TODO: we may need to place connectors into matrix first because that's when we find out if we have a collision?
    // The addConnectorToMatrix function should return a new matrix
    const nodeCoords: string[] = Object.values(nodeIdToCoord);

    // Populate matrix with regular connectors
    connectorsToPlace
        .forEach(
            connectorToPlace => addConnectorToMatrix({ matrix, connectorToPlace, nodeCoords })
        );


    // Step 2.2 - If there are right up connectors in the matrix, we want to draw vertLine and arrowUp
    // above them while the tile is empty.

    // TODO: We will cache the coord of all the rightUp connectors in the matrix
    // during createHorizConnectorsBetweenNodes. After that's implemented, we can get rid
    // of the nested for loop below

    // console.log(matrix);
    getRightUpCoords(connectorsToPlace)
        .forEach(
            rightUpCoord => addVertConnectorsToMatrix({ matrix, startCoord: rightUpCoord })
        );

    // Step 2.3 - Decision Step Dashed line

    // Add the decision step dashline plus sign placeholder into the matrix where the decision
    // steps are
    // Populate matrix with downRight dash line connectors branching from diamond
    downRightDashesToPlace({ matrix, decisionStepCols })
        .forEach(downRightDashToPlace => replaceTile({
            matrix,
            replaceBy: downRightDashToPlace.replaceBy,
            coord: downRightDashToPlace.coord
        }));

    return { matrix, nodeIdToCoord, nodeIdToParentNodeIds };
};

/**
 * Given plusBtn coordinate and a list of candidate coordinates for where the next nodes could be,
 * determine the next node (there can only be one next node)
 * 
 * @param {MatrixCoord} plusBtnCoord
 * @param {EndomorphDict} coordToNodeId
 * @param {string[]} candidateNodeIds 
 */
export const findNextNode = ({
    plusBtnCoord, coordToNodeId, candidateNextNodeIds
}: { plusBtnCoord: MatrixCoord; coordToNodeId: EndomorphDict; candidateNextNodeIds: string[] }
): string => {
    // NOTE: It's assumed all candidateNextNodeIds are to the right of the plus button so their
    // colNum is irrelevant
    const { rowNum: plusBtnRowNum } = plusBtnCoord;

    const nodeIdToCoord = invertKeyVal(coordToNodeId);
    // keep going to the right until you see empty. Then go up.
    const candidateCoords: MatrixCoord[] = candidateNextNodeIds
        .map((nodeId: string) => nodeIdToCoord[nodeId])
        .map((encodedCoord: string) => decodeMatrixCoord(encodedCoord));
    const nextNodeCoord = candidateCoords
        .filter(({ rowNum }: { rowNum: number }) => rowNum <= plusBtnRowNum)
        .sort((a: MatrixCoord, b: MatrixCoord) => b.rowNum - a.rowNum)[0];

    return coordToNodeId[encodeMatrixCoord(nextNodeCoord)];
};

