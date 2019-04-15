// Utils
import { clone, chain } from "ramda";

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
 * @param {number} colNum
 * @param {number} rowNum
 * @param {string} entryName
 * @param {ColType} colType
 * @return {string} matrixEntry - a period delimited string that encodes all the params
 */
export const encodeMatrixEntry = (
    { colNum, rowNum, entryName, colType }: {
        colNum: number;
        rowNum: number;
        entryName: string;
        colType: ColType;
    }
): string => {
    const encodedOwnCoord = encodeMatrixCoord({ colNum, rowNum });
    return `${colType}.${entryName}.${encodedOwnCoord}`;
};

/**
 * Get info about the tile from the matrixEntry string
 *
 * @param {string} matrixEntry
 * @returns {string} tileType
 * @returns {string} tileId
 * @returns {(string|undefined)} tileName
 * @returns {(string|undefined)} encodedOwnCoord
 * @returns {(string|undefined)} encodedParentNodeCoord - coord of a workflowStep
 */
export const decodeMatrixEntry = (matrixEntry: string): {
    tileType: string;
    tileId: string;
    tileName: string | undefined;
    encodedOwnCoord: string | undefined;
    encodedParentNodeCoord: string | undefined;
} => {
    const [tileType, tileName, encodedOwnCoord, encodedParentNodeCoord] = matrixEntry.split(".");

    // If matrixEntry is a workflowStep, nodeType is the id because matrixEntry for 
    // a workflowStep is simply the workflowStepUid
    const tileId = isConnector(tileType) ? `${tileType}.${tileName}` : tileType;

    return { tileType, tileId, tileName, encodedOwnCoord, encodedParentNodeCoord };
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
        colNum, rowNum, entryName: MATRIX_PLACEHOLDER_NAME, colType
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
        // const prevSteps = getPrevSteps({ workflowSteps, workflowStepOrder });

        const nextSteps = actions
            .filter(action => action.actionType !== "REJECT")
            .map(action => action.nextWorkflowStepUid);

        workflowStepNodes[workflowStepUid] = {
            id: workflowStepUid,
            name: workflowStepName,
            type: workflowStepType,
            workflowStepOrder,
            nextSteps
        };
    }

    workflowStepNodes = {
        ...workflowStepNodes,
        [firstStepId]: {
            id: firstStepId,
            name: "Authorize",
            type: WorkflowStepTypeT.AUTHORIZE,
            nextSteps: authorizeNextSteps,
            workflowStepOrder: 0
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
    const numRows = Math.max(...Object.values(workflowStepOrderOccur)) + (+(decisionStepCols.length > 0));

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

const addWorkflowStepToMatrix = (
    { matrix, colNum, newStepId }: { matrix: Matrix; colNum: number; newStepId: string }
): MatrixCoord => {
    const col = matrix[colNum];

    // Determine rowNum

    // Naive: rowNum is the first unoccupied
    // Better: If no parent, rowNum is the first unoccupied. If has parent, rowNum is parent rowNum

    // TODO:
    // Best: if no parent, rowNum is the first unoccupied. If has parent, rowNum is parent rowNum but if that is occupied, then
    // we shift col 2 places to the right
    // Also need to consider if the step is primary. If it is primary, it has to be in the first place in col
    // TODO: Need to have a function for replace col type
    // We also need to change the size of the matrix and shift all the nodes to the right and down
    const rowNum = col.findIndex((matrixEntry: string) => isPlaceholder(matrixEntry));

    replaceTile({
        coord: { colNum, rowNum },
        matrix,
        replaceBy: newStepId
    });
    return { rowNum, colNum };
};

/**
 * Mutates the matrix by replacing tiles with connectors
 *
 * @param {Matrix} matrix initial matrix with workflowSteps already placed
 * @param {ConnectorToPlace} connectorToPlace instruction for how to place a connectors into matrix
 * @param {Array} nodeCoords an array of matrix coords for all the nodes (i.e., workflowSteps) are
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

    const parentNodeCoord: string = nodeCoords.includes(parentCoord) ?
        `.${parentCoord}` : "";

    const replaceBy = `${tileType}.${connectorName}.${ownCoord}${parentNodeCoord}`;

    replaceTile({
        matrix,
        replaceBy,
        coord: { colNum, rowNum }
    });

    return { replaceBy };
};

// TODO: rename parentCoord -> node2ParentCoords because plural and dict
/**
 * Creates an array of parentCoord/childCoord pairs for use by connectorBetweenNodes
 *
 * @param {EndomorphDict} nodeCoord
 * @param {PolymorphDict} nodeToParentCoords
 * @returns {Array} an array of pairs of coords (parentNode and childNode)
 */
export const createCoordPairs = (
    { nodeCoord, nodeToParentCoords }: {
        nodeCoord: EndomorphDict;
        nodeToParentCoords: PolymorphDict;
    }
): CoordPairT[] => {
    const nodeIds = Object.keys(nodeToParentCoords);

    const newCoord = (nodeId: string): CoordPairT[] => nodeToParentCoords[nodeId].map(colRow => ({
        parentCoord: decodeMatrixCoord(colRow),
        childCoord: decodeMatrixCoord(nodeCoord[nodeId])
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

        console.log("Case 2....parentNodeCoord", parentNodeCoord);
        console.log("Case 2....lastLineCoord", lastLineCoord);


        const lastEntry = {
            ownCoord: encodeMatrixCoord({ colNum: endCol, rowNum }),
            parentCoord: lastLineCoord,
            connectorName: ConnectorName.ARROW_RIGHT
        };
        console.log("Case 2....lastEntry", lastEntry);

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


// TODO: We might not need BFS to place the workflowStep into the matrix

/**
 * Uses workflowVisData to populate initialMatrix with workflow steps and connectors
 *
 * @param {WorkflowVisDataT} workflowVisData
 * @param {Matrix} initialMatrix
 * @returns {Matrix} matrix - populated matrix (may be a different size than initialMatrix)
 *
 */
export const populateMatrix = (
    { workflowVisData, initialMatrix, decisionStepCols }: {
        workflowVisData: WorkflowVisDataT;
        initialMatrix: Matrix;
        decisionStepCols: number[];
    }
): Matrix => {
    console.log("Populate Matrix...");

    const matrix = clone(initialMatrix);

    // Step 1 - Traverse graph (BFS) and generate parentCoords and nodeCoord
    // together, these hash maps tell us how tiles in the matrix are connected

    const { firstStep, workflowStepNodes } = workflowVisData;

    let toExplore = [firstStep];
    const explored: ExistentialDict = {};

    // id -> (colNum,rowNum)
    const nodeCoord: EndomorphDict = {};

    // connectedNodes is a mapping from (colNum,rowNum) of a node to (colNum, rowNum)[] to its children nodes
    const nodeToParentCoords: PolymorphDict = {};

    while (toExplore.length > 0) {
        const [id, ...rest] = toExplore;
        toExplore = rest;
        const workflowStepNode = workflowStepNodes[id];
        const { nextSteps, workflowStepOrder } = workflowStepNode;

        // Place the workflow step id into the matrix
        // TODO: We need to account for the coord of the parent node when placing a new
        // node into the matrix
        const coord = addWorkflowStepToMatrix({
            matrix,
            colNum: workflowStepOrder * 2,
            newStepId: id
        });

        // Add current node'd coord into nodeCoord
        nodeCoord[id] = encodeMatrixCoord(coord);

        let nextStepId = null;
        for (let i = 0; i < nextSteps.length; i += 1) {
            nextStepId = nextSteps[i];

            // Update parentCoord here using nodeCoord.
            // We are guaranteed that nextStep's parent's coord  is in nodeCoord
            // because nextStep's parent is current node, which we just added to nodeCoord above
            const nodeToParentCoordsEntry = nodeToParentCoords[nextStepId];
            nodeToParentCoords[nextStepId] = (nodeToParentCoordsEntry ? nodeToParentCoordsEntry : []).concat([nodeCoord[id]]);

            if (!explored[nextStepId]) {
                toExplore = toExplore.concat(nextStepId);
                explored[nextStepId] = true;
            }
        }
    }

    // Step 2 - Use parentCoords and nodeCoord to populate the matrix with connectors
    console.log("--nodeCoord", nodeCoord);
    console.log("--nodeToParentCoords", nodeToParentCoords);

    const coordPairs: CoordPairT[] = createCoordPairs({ nodeCoord, nodeToParentCoords });
    const connectorsToPlace: ConnectorToPlace[] = chain(createConnectorsBetweenNodes, coordPairs);

    // TODO: we may need to place connectors into matrix first because that's when we find out if we have a collision?
    // The addConnectorToMatrix function should return a new matrix
    const nodeCoords: string[] = Object.values(nodeCoord);
    connectorsToPlace.forEach(
        connectorToPlace => addConnectorToMatrix({ matrix, connectorToPlace, nodeCoords })
    );

    // Add the decision step dashline plus sign placeholder into the matrix where the decision
    // steps are
    // TODO: Need to write a helper function to determine the rowNum of the first unoccupied (empty) tile
    const downRightDashesToPlace = decisionStepCols.map(colNum => {
        const rowNum = matrix[0].length - 1;
        const encodedOwnCoord = encodeMatrixCoord({ colNum, rowNum });
        const encodedParentNodeCoord = encodeMatrixCoord({ colNum, rowNum: 0 });
        return {
            replaceBy: `diamond.downRightDash.${encodedOwnCoord}.${encodedParentNodeCoord}`,
            coord: { rowNum, colNum }
        };
    });

    console.log("decisionStepCols", decisionStepCols);
    console.log("FOOOOO", downRightDashesToPlace);

    downRightDashesToPlace.forEach(downRightDashToPlace => replaceTile({
        matrix,
        replaceBy: downRightDashToPlace.replaceBy,
        coord: downRightDashToPlace.coord
    }));


    return matrix;
};