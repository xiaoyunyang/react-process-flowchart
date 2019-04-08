/* eslint-disable import/named */
// Utils
import { clone } from "ramda";

// Types
import { WorkflowVisDataT, WorkflowStepNodeT, Matrix, MatrixCoord, ConnectorsToPlace } from "../types/workflowVis";
import { WorkflowStepT, WorkflowStepType } from "../types/workflow";
import { OccurenceDict, ExistentialDict, EndomorphDict, PolymorphDict } from "../types/generic";

// Constants
const MATRIX_PLACEHOLDER = "empty";

// Utils
const isPlaceholder = (id: string): boolean => (id.split(".")[1] === MATRIX_PLACEHOLDER);

// Mutable function (mutates matrix) instead of returning
// a new matrix for performance reasons
const replaceTile = ({ matrix, replaceBy, coord }: { matrix: Matrix; replaceBy: string; coord: MatrixCoord }): void => {
    const { rowNum, colNum } = coord;

    const newCol = clone(matrix[colNum]);
    newCol[rowNum] = replaceBy;
    matrix[colNum] = newCol;
};

const initializeMatrix = ({ cols, rows, colTypes }: { cols: number; rows: number; colTypes: string[] }) => {
    const innerArray: {
        [id: string]: string[];
    } = {
        box: Array(rows).fill(`box.${MATRIX_PLACEHOLDER}`),
        diamond: Array(rows).fill(`diamond.${MATRIX_PLACEHOLDER}`),
        standard: Array(rows).fill(`standard.${MATRIX_PLACEHOLDER}`)
    };

    let matrix = Array(cols)
        .fill([])
        .map((col, i) => innerArray[colTypes[i]]);

    return matrix;
};

export const generateWorkflowVisData = (
    workflowSteps: WorkflowStepT[], workflowUid: string
): { workflowVisData: WorkflowVisDataT; initMatrix: string[][] } => {
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

        if (workflowStepType === WorkflowStepType.DECISION) {
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
            type: WorkflowStepType.AUTHORIZE,
            nextSteps: authorizeNextSteps,
            workflowStepOrder: 0
        }
    };

    const workflowVisData = {
        firstStep: firstStepId,
        workflowStepNodes
    };

    const cols = Math.max(...Object.keys(workflowStepOrderOccur).map(id => +id)) * 2 + 1;
    const rows = Math.max(...Object.values(workflowStepOrderOccur));
    const colTypes = Array(cols).fill("standard").map((colType: string, i) => {
        if (i % 2 === 1) return colType;
        return decisionStepCols.includes(i) ? "diamond" : "box";
    });

    const initMatrix = initializeMatrix({ cols, rows, colTypes });

    return {
        workflowVisData,
        initMatrix
    };
};

const addWorkflowStepToMatrix = ({ matrix, colNum, newStepId }: { matrix: Matrix; colNum: number; newStepId: string }): MatrixCoord => {
    const col = matrix[colNum];

    // Determine rowNum
    // Naive: rowNum is the first unoccupied
    // Better: If no parent, rowNum is the first unoccupied. If has parent, rowNum is parent rowNum
    // Best: if no parent, rowNum is the first unoccupied. If has parent, rowNum is parent rowNum but if that is occupied, then
    // we shift col 2 places to the right
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

const encodeMatrixCoord = ({ colNum, rowNum }: MatrixCoord): string => `${colNum},${rowNum}`;

const decodeMatrixCoord = (colRow: string): MatrixCoord => {
    const [colNum, rowNum] = colRow.split(",").map(s => +s);
    return { colNum, rowNum };
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

const createConnectorsBetweenNodes = (
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

/** createCoordPairs
 * Creates an array of fromCoord and toCoord pairs for use by connectorBetweenNodes
 *
 */
const createCoordPairs = (
    { nodeCoord, parentCoords }: { nodeCoord: EndomorphDict; parentCoords: PolymorphDict }
): { toCoord: MatrixCoord; fromCoord: MatrixCoord }[] => {
    const nodeIds = Object.keys(parentCoords);
    let res: { toCoord: MatrixCoord; fromCoord: MatrixCoord }[] = [];
    for (let i = 0; i < nodeIds.length; i += 1) {
        const toCoord = decodeMatrixCoord(nodeCoord[nodeIds[i]]);
        const coords = parentCoords[nodeIds[i]].map(colRow => ({
            toCoord,
            fromCoord: decodeMatrixCoord(colRow)
        }));
        res = res.concat(coords);
    }

    return res;
};

// TODO: We might not need BFS to place the workflowStep into the matrix
export const populateMatrix = (
    { workflowVisData, initMatrix }: { workflowVisData: WorkflowVisDataT; initMatrix: string[][] }
): Matrix => {
    console.log("Populate Matrix...");

    const matrix = clone(initMatrix);

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
            // because nextStep's parent is current node
            const parentCoordsEntry = parentCoords[nextStepId];
            parentCoords[nextStepId] = (parentCoordsEntry ? parentCoordsEntry : []).concat([nodeCoord[id]]);

            if (!explored[nextStepId]) {
                toExplore = toExplore.concat(nextStepId);
                explored[nextStepId] = true;
            }
        }
    }

    // Step 2 - Use parentCoords and nodeCoord to populate the matrix with connectors
    console.log("--nodeCoord", nodeCoord);
    console.log("--parentCoords", parentCoords);
    const coordPairs = createCoordPairs({ nodeCoord, parentCoords });
    const connectorsToPlace = coordPairs.map(coordPair => createConnectorsBetweenNodes(coordPair)).flat();
    connectorsToPlace.forEach(connectorToPlace => addConnectorToMatrix({ matrix, connectorToPlace }));

    return matrix;
};