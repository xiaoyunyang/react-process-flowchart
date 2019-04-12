// Utils
import { clone, chain } from "ramda";

// Types
import {
    WorkflowVisDataT, WorkflowStepNodeT, WorkflowStepNodes, Matrix,
    MatrixCoord, ConnectorsToPlace, ColType, CoordPairT, ConnectorName
} from "../types/workflowVis";
import { WorkflowStepT, WorkflowStepTypeT } from "../types/workflow";
import { OccurenceDict, ExistentialDict, EndomorphDict, PolymorphDict } from "../types/generic";

// Constants
const MATRIX_PLACEHOLDER = "empty";

export const encodeMatrixCoord = ({ colNum, rowNum }: MatrixCoord): string => `${colNum},${rowNum}`;

export const decodeMatrixCoord = (colRow: string): MatrixCoord => {
    const [colNum, rowNum] = colRow.split(",").map(s => +s);
    return { colNum, rowNum };
};

export const isPlaceholder = (id: string): boolean =>
    (Object.values(ColType).includes(id.split(".")[0])) && (id.split(".")[1] === MATRIX_PLACEHOLDER);


/**
 * Decodes connector info from the matrixEntry string for a conenctor
 * @param matrixEntry
 * @returns {connectorType, connectorId, encodedOwnCoord, encodedParentCoord }
 */
export const getConnectorInfo = ({ matrixEntry }: { matrixEntry: string }
): { connectorType: string; connectorId: string; encodedOwnCoord: string; encodedParentCoord: string } => {
    const [connectorType, connectorName, encodedOwnCoord, encodedParentCoord] = matrixEntry.split(".");
    const connectorId = `${connectorType}.${connectorName}`;
    return { connectorType, connectorId, encodedOwnCoord, encodedParentCoord };
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

const emptyMatrixEntry = (
    { colNum, rowNum, colType }: { colNum: number; rowNum: number; colType: ColType }
) => {
    const encodedOwnCoord = encodeMatrixCoord({ colNum, rowNum });
    return `${colType}.${MATRIX_PLACEHOLDER}.${encodedOwnCoord}`;
};

export const initCol = (
    { numRows, colNum, colType }: { numRows: number; colNum: number; colType: ColType }
): string[] => Array.from(Array(numRows)
    .keys())
    .map(rowNum => emptyMatrixEntry({ colNum, rowNum, colType }));

/**
 * Creates a numCols x numRows matrix initalized with placeholders (box.empty, diamond.empty, or standard.empty)
 * 
 * @param numRows number
 * @param colTypes array of ColTypes (string) - box, diamond, or standard
 * @returns { matrix }
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

const createWorkflowStepNodes = ({ workflowSteps, workflowUid }: {
    workflowUid: string; workflowSteps: WorkflowStepT[];
}): {
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
        const prevSteps = getPrevSteps({ workflowSteps, workflowStepOrder });

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
 * creates the workflowVisData and initial matrix
 *
 * @param workflowSteps 
 * @param workflowUid 
 * @returns { WorkflowVisData, initialMatrix }
 */
export const createWorkflowVisData = (
    { workflowSteps, workflowUid }: { workflowSteps: WorkflowStepT[]; workflowUid: string }
): { workflowVisData: WorkflowVisDataT; initialMatrix: string[][] } => {
    const {
        firstStepId, workflowStepNodes, workflowStepOrderOccur, decisionStepCols
    } = createWorkflowStepNodes({ workflowSteps, workflowUid });
    const workflowVisData = {
        firstStep: firstStepId,
        workflowStepNodes
    };

    const numCols = (Math.max(...Object.keys(workflowStepOrderOccur).map(id => +id)) * 2) + 1;
    const numRows = Math.max(...Object.values(workflowStepOrderOccur));
    const colTypes = Array(numCols).fill("standard").map((colType: ColType, i) => {
        if (i % 2 === 1) return colType;
        return decisionStepCols.includes(i) ? ColType.DIAMOND : ColType.BOX;
    });

    const initialMatrix = initMatrix({ numRows, colTypes });

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
    const rowNum = col.findIndex((matrixElem: string) => isPlaceholder(matrixElem));

    replaceTile({
        coord: { colNum, rowNum },
        matrix,
        replaceBy: newStepId
    });
    return { rowNum, colNum };
};

const addConnectorToMatrix = (
    { matrix, connectorToPlace, nodeCoord }: {
        matrix: Matrix; connectorToPlace: ConnectorsToPlace; nodeCoord: EndomorphDict;
    }
): void => {
    const { colNum, rowNum, connectorName, parentCoord } = connectorToPlace;

    const { connectorType } = getConnectorInfo({ matrixEntry: matrix[colNum][rowNum] });

    const nodeCoords: string[] = Object.values(nodeCoord);

    // TODO: verify that you are in path of the connected nodes

    const encodedParentCoord = encodeMatrixCoord(parentCoord);
    const encodedOwnCoord: string = encodeMatrixCoord({ colNum, rowNum });

    const encodedParentNodeCoord: string = nodeCoords.includes(encodedParentCoord) ?
        `.${encodedParentCoord}` : "";

    replaceTile({
        matrix,
        replaceBy: `${connectorType}.${connectorName}.${encodedOwnCoord}${encodedParentNodeCoord}`,
        coord: { colNum, rowNum }
    });
};

/**
 * Creates an array of fromCoord and toCoord pairs for use by connectorBetweenNodes
 * 
 * @param nodeCoord
 * @param parentCoord
 */
export const createCoordPairs = (
    { nodeCoord, parentCoords }: { nodeCoord: EndomorphDict; parentCoords: PolymorphDict }
): CoordPairT[] => {
    const nodeIds = Object.keys(parentCoords);

    const newCoord = (nodeId: string): CoordPairT[] => parentCoords[nodeId].map(colRow => ({
        fromCoord: decodeMatrixCoord(colRow),
        toCoord: decodeMatrixCoord(nodeCoord[nodeId])
    }));

    return chain(nodeId => newCoord(nodeId), nodeIds);
};

const lineHorizes = (
    { startCol, endCol, rowNum, parentCoord }: {
        startCol: number; endCol: number; rowNum: number; parentCoord: MatrixCoord;
    }
): { lines: ConnectorsToPlace[]; lastLineCoord: MatrixCoord } => {
    let lines: ConnectorsToPlace[] = [];
    let currParentCoord = parentCoord;
    for (let colNum = startCol; colNum < endCol; colNum += 1) {
        const newEntry = { colNum, rowNum, connectorName: ConnectorName.LINE_HORIZ, parentCoord: currParentCoord };
        lines = lines.concat(newEntry);
        currParentCoord = { colNum, rowNum };
    }

    return { lines, lastLineCoord: currParentCoord };
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
    const parentNodeCoord = { colNum: fromCol, rowNum: fromRow };

    // Case 1: fromRow = toRow
    // should be lineHoriz, ..., arrowRight
    // row should be fromRow.
    // fill connectors at: fromCol+1 until toCol-1
    if (fromRow === toRow) {
        const startCol = fromCol + 1;
        const endCol = toCol - 1;
        const rowNum = fromRow;

        const { lines, lastLineCoord } = lineHorizes({
            startCol, endCol, rowNum, parentCoord: parentNodeCoord
        });

        const lastEntry = {
            colNum: endCol,
            rowNum,
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
            colNum: startCol,
            rowNum,
            connectorName: ConnectorName.DOWN_RIGHT,
            parentCoord: { colNum: fromCol - 1, rowNum: rowNum }
        };
        const { lines, lastLineCoord } = lineHorizes({
            startCol: startCol + 1, endCol, rowNum, parentCoord: parentNodeCoord
        });

        console.log("Case 2....parentNodeCoord", parentNodeCoord);
        console.log("Case 2....lastLineCoord", lastLineCoord);


        const lastEntry = {
            colNum: endCol,
            rowNum,
            connectorName: ConnectorName.ARROW_RIGHT,
            parentCoord: lastLineCoord
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
    const { lines, lastLineCoord } = lineHorizes({
        startCol, endCol, rowNum, parentCoord: parentNodeCoord
    });

    const lastEntry = {
        colNum: endCol,
        rowNum,
        connectorName: ConnectorName.RIGHT_UP_ARROW,
        parentCoord: lastLineCoord
    };

    return lines.concat(lastEntry);
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
    console.log("--nodeCoord", nodeCoord);
    console.log("--parentCoords", parentCoords);

    const coordPairs: CoordPairT[] = createCoordPairs({ nodeCoord, parentCoords });
    const connectorsToPlace: ConnectorsToPlace[] = chain(createConnectorsBetweenNodes, coordPairs);

    // TODO: we may need to place connectors into matrix first because that's when we find out if we have a collision?
    // The addConnectorToMatrix function should return a new matrix
    connectorsToPlace.forEach(connectorToPlace => addConnectorToMatrix({ matrix, connectorToPlace, nodeCoord }));

    return matrix;
};