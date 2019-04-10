// Utils
import { clone, chain } from "ramda";

// Types
import {
    WorkflowVisDataT, WorkflowStepNodeT, Matrix, MatrixCoord, ConnectorsToPlace, ColType
} from "../types/workflowVis";
import { WorkflowStepT, WorkflowStepTypeT } from "../types/workflow";
import { OccurenceDict, ExistentialDict, EndomorphDict, PolymorphDict } from "../types/generic";

// Constants
const MATRIX_PLACEHOLDER = "empty";

export const isPlaceholder = (id: string): boolean =>
    (Object.values(ColType).includes(id.split(".")[0])) && (id.split(".")[1] === MATRIX_PLACEHOLDER);


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

export const initCol = (
    { numRows, colType }: { numRows: number; colType: ColType }
): string[] => Array(numRows).fill(`${colType}.${MATRIX_PLACEHOLDER}`);

/**
 * Creates a numCols x numRows matrix initalized with placeholders (box.empty, diamond.empty, or standard.empty)
 * 
 * @param numCols number
 * @param numRows number
 * @param colTypes array of ColTypes (string) - box, diamond, or standard
 * @returns { matrix }
 */
export const initMatrix = (
    { numCols, numRows, colTypes }: { numCols: number; numRows: number; colTypes: ColType[] }
): Matrix => {
    return Array.from(Array(numCols).keys())
        .map(i => initCol({ numRows, colType: colTypes[i] }));
};

/**
 * creates the workflowVisData and initial matrix
 *
 * @param workflowSteps 
 * @param workflowUid 
 * @returns { WorkflowVisData, initialMatrix }
 */
export const createWorkflowVisData = (
    { workflowSteps, workflowUid }: { workflowSteps: WorkflowStepT[]; workflowUid: string }
): { workflowVisData: WorkflowVisDataT; initialMatrix: string[][] } => {
    const firstStepId = `${workflowUid}-auth`;

    let workflowStepNodes: { [id: string]: WorkflowStepNodeT } = {};
    let authorizeNextSteps: string[] = [];
    let decisionStepCols: number[] = [];

    let workflowStepOrderOccur: OccurenceDict = {};
    for (let i = 0; i < workflowSteps.length; i += 1) {
        const workflowStep = workflowSteps[i];

        const { workflowStepOrder, workflowStepUid, workflowStepName, workflowStepType, actions } = workflowStep;

        workflowStepOrderOccur[String(workflowStepOrder)] = (
            workflowStepOrderOccur[String(workflowStepOrder)] ? workflowStepOrderOccur[String(workflowStepOrder)] : 0
        ) + 1;

        if (workflowStepType === WorkflowStepTypeT.DECISION) {
            decisionStepCols = decisionStepCols.concat(workflowStepOrder * 2);
        }

        if (workflowStepOrder === 1) {
            authorizeNextSteps = [workflowStepUid];
        }

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

    const workflowVisData = {
        firstStep: firstStepId,
        workflowStepNodes
    };

    // TODO: add no-mixed type rule to eslint
    const numCols = (Math.max(...Object.keys(workflowStepOrderOccur).map(id => +id)) * 2) + 1;
    const numRows = Math.max(...Object.values(workflowStepOrderOccur));
    const colTypes = Array(numCols).fill("standard").map((colType: ColType, i) => {
        if (i % 2 === 1) return colType;
        return decisionStepCols.includes(i) ? ColType.DIAMOND : ColType.BOX;
    });

    const initialMatrix = initMatrix({ numCols, numRows, colTypes });

    return {
        workflowVisData,
        initialMatrix
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
    let rowNum = 0;
    for (rowNum = 0; rowNum < col.length; rowNum += 1) {
        if (isPlaceholder(col[rowNum])) {
            break;
        }
    }

    replaceTile({
        coord: { colNum, rowNum },
        matrix,
        replaceBy: newStepId
    });
    return { rowNum, colNum };
};

const addConnectorToMatrix = (
    { matrix, connectorToPlace }: { matrix: Matrix; connectorToPlace: ConnectorsToPlace }
): void => {
    const { colNum, rowNum, connectorId } = connectorToPlace;
    const columnType = matrix[colNum][rowNum].split(".")[0];

    replaceTile({
        matrix,
        replaceBy: `${columnType}.${connectorId}`,
        coord: { colNum, rowNum }
    });
};

export const encodeMatrixCoord = ({ colNum, rowNum }: MatrixCoord): string => `${colNum},${rowNum}`;

export const decodeMatrixCoord = (colRow: string): MatrixCoord => {
    const [colNum, rowNum] = colRow.split(",").map(s => +s);
    return { colNum, rowNum };
};

/**
 * Creates an array of fromCoord and toCoord pairs for use by connectorBetweenNodes
 * 
 * @param nodeCoord
 * @param parentCoord
 */
export const createCoordPairs = (
    { nodeCoord, parentCoords }: { nodeCoord: EndomorphDict; parentCoords: PolymorphDict }
): { fromCoord: MatrixCoord; toCoord: MatrixCoord }[] => {
    const nodeIds = Object.keys(parentCoords);
    let res: { toCoord: MatrixCoord; fromCoord: MatrixCoord }[] = [];
    for (let i = 0; i < nodeIds.length; i += 1) {
        const toCoord = decodeMatrixCoord(nodeCoord[nodeIds[i]]);
        const coords = parentCoords[nodeIds[i]].map(colRow => ({
            fromCoord: decodeMatrixCoord(colRow),
            toCoord

        }));
        res = res.concat(coords);
    }
    return res;
};

const lineHorizes = (
    { startCol, endCol, rowNum }: { startCol: number; endCol: number; rowNum: number }
): ConnectorsToPlace[] => {

    let res: ConnectorsToPlace[] = [];
    for (let colNum = startCol; colNum < endCol; colNum += 1) {
        const newEntry = { colNum, rowNum, connectorId: "lineHoriz" };
        res = res.concat(newEntry);
    }

    return res;
};

/**
 * Creates an array of connectors to place with specific values and locations in the matrix
 *
 * @param fromCoord
 * @param toCoord
 */
export const createConnectorsBetweenNodes = (
    { fromCoord, toCoord }: { fromCoord: MatrixCoord; toCoord: MatrixCoord }
): ConnectorsToPlace[] => {
    const { colNum: fromCol, rowNum: fromRow } = fromCoord;
    const { colNum: toCol, rowNum: toRow } = toCoord;

    // Case 1: fromRow = toRow
    // should be lineHoriz, ..., arrowRight
    // row should be fromRow.
    // fill connectors at: fromCol+1 until toCol-1
    if (fromRow === toRow) {
        const startCol = fromCol + 1;
        const endCol = toCol - 1;
        const rowNum = fromRow;
        const lastEntry = { colNum: endCol, rowNum, connectorId: "arrowRight" };

        return lineHorizes({ startCol, endCol, rowNum }).concat(lastEntry);
    }

    // Case 2: fromRow < toRow
    // should be downRight, lineHoriz, ..., arrowRight
    // row should be toRow.
    // fill connectors at: fromCol until toCol-1
    if (fromRow < toRow) {
        const startCol = fromCol;
        const endCol = toCol - 1;
        const rowNum = toRow;
        const firstEntry = { colNum: startCol, rowNum, connectorId: "downRight" };
        const lastEntry = { colNum: endCol, rowNum, connectorId: "arrowRight" };

        return [firstEntry].concat(lineHorizes({ startCol: startCol + 1, endCol, rowNum })).concat(lastEntry);
    }

    // Case 3: fromRow > toRow
    // should be lineHoriz, ..., rightUpArrow
    // row should be fromRow.
    // fill connectors at: fromCol+1 until toCol
    const startCol = fromCol + 1;
    const endCol = toCol;
    const rowNum = fromRow;
    const lastEntry = { colNum: endCol, rowNum, connectorId: "rightUpArrow" };

    return lineHorizes({ startCol, endCol, rowNum }).concat(lastEntry);
};



// TODO: We might not need BFS to place the workflowStep into the matrix

/**
 * Uses workflowVisData to populate initialMatrix with workflow steps and connectors
 * 
 * @param workflowVisData
 * @param initialMatrix
 * @param matrix - populated matrix (may be a different size than initialMatrix)
 *  
 */
export const populateMatrix = (
    { workflowVisData, initialMatrix }: { workflowVisData: WorkflowVisDataT; initialMatrix: string[][] }
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
    const parentCoords: PolymorphDict = {};

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
            const parentCoordsEntry = parentCoords[nextStepId];
            parentCoords[nextStepId] = (parentCoordsEntry ? parentCoordsEntry : []).concat([nodeCoord[id]]);

            if (!explored[nextStepId]) {
                toExplore = toExplore.concat(nextStepId);
                explored[nextStepId] = true;
            }
        }
    }

    // Step 2 - Use parentCoords and nodeCoord to populate the matrix with connectors
    console.log("--nodeCoord", JSON.stringify(nodeCoord));
    console.log("--parentCoords", JSON.stringify(parentCoords));

    const coordPairs = createCoordPairs({ nodeCoord, parentCoords });

    // console.log("--coordPairs", coordPairs);
    console.log("============> FOO ....", JSON.stringify(coordPairs));

    const connectorsToPlace = chain(createConnectorsBetweenNodes, coordPairs);

    connectorsToPlace.forEach(connectorToPlace => addConnectorToMatrix({ matrix, connectorToPlace }));

    return matrix;
};