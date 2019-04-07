// Types
import { clone } from "ramda";
import { WorkflowVisDataT, WorkflowStepNodeT } from "../types/workflowVis";
import { WorkflowStepT, WorkflowStepType } from "../types/workflow";
import { connectors } from "../components/connectors";
import { encode } from "punycode";

// Utils

interface OccurenceDict {
    [id: string]: number;
}

interface ExistentialDict {
    [id: string]: boolean;
}

interface EndomorphDict {
    [id: string]: string;
}

interface PolymorphDict {
    [id: string]: string[];
}

const MATRIX_PLACEHOLDER = "empty";

const isPlaceholder = (id: string): boolean => (id.split(".")[1] === MATRIX_PLACEHOLDER);

const initializeMatrix = ({ cols, rows, colTypes }: { cols: number; rows: number; colTypes: string[] }) => {
    // TODO: the placeholder has to be pre-pended with "box.", "diamond.", or "standard."
    const innerArray: {
        [id: string]: string[];
    } = {
        "box": Array(rows).fill(`box.${MATRIX_PLACEHOLDER}`),
        "diamond": Array(rows).fill(`diamond.${MATRIX_PLACEHOLDER}`),
        "standard": Array(rows).fill(`standard.${MATRIX_PLACEHOLDER}`),
    };

    let matrix = Array(cols).fill([]).map((col, i) => innerArray[colTypes[i]]);
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

        const { workflowStepOrder, workflowStepUid,
            workflowStepName, workflowStepType, actions } = workflowStep;

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

const addToColumn = (col: string[], newItem: string): string[] => {
    // Immutable....but we may change that for efficiency
    const colCpy = clone(col);
    for (let i = 0; i < col.length; i += 1) {
        if (isPlaceholder(col[i])) {
            colCpy[i] = newItem;
            break;
        }
    }
    return colCpy;

};

const addWorkflowStepToColumn = ({ col, newItem }: {
    col: string[]; colNum: number; newItem: string;
}): {
    updatedCol: string[]; rowNum: number;
} => {
    // Add to column
    // Immutable....but we may change that for efficiency
    const updatedCol = clone(col);
    let rowNum = 0;
    for (rowNum = 0; rowNum < col.length; rowNum += 1) {
        if (isPlaceholder(col[rowNum])) {
            updatedCol[rowNum] = newItem;
            break;
        }
    }
    return {
        updatedCol,
        rowNum,
    };
};
interface MatrixCoord {
    col: number;
    row: number;
}
interface ConnectorsToPlace {
    row: number;
    col: number;
    connectorId: string;
}

const encodeMatrixCoord = ({ col, row }: MatrixCoord): string => `${col},${row}`;

const decodeMatrixCoord = (colRow: string): MatrixCoord => {
    const [col, row] = colRow.split(",").map(s => +s);
    return { col, row };
};

const lineHorizes = ({ startCol, endCol, row }: {
    startCol: number; endCol: number; row: number;
}): ConnectorsToPlace[] => {
    let res = [];
    for (let col = startCol; col < endCol; col += 1) {
        const newEntry = { col, row, connectorId: "lineHoriz" };
        res.push(newEntry);
    }

    return res;
};

const createConnectorsBetweenNodes = ({ fromCoord, toCoord }: {
    fromCoord: MatrixCoord;
    toCoord: MatrixCoord;
}): ConnectorsToPlace[] => {
    const { col: fromCol, row: fromRow } = fromCoord;
    const { col: toCol, row: toRow } = toCoord;

    // Case 1: fromRow = toRow 
    // should be lineHoriz, ..., arrowRight
    // row should be fromRow.
    // fill connectors at: fromCol+1 until toCol-1
    if (fromRow === toRow) {
        const startCol = fromCol + 1;
        const endCol = toCol - 1;
        const row = fromRow;

        let res = lineHorizes({ startCol, endCol, row });

        const lastEntry = { col: endCol, row, connectorId: "arrowRight" };
        res.push(lastEntry);
        return res;
    }


    // Case 2: fromRow < toRow
    // should be downRight, lineHoriz, ..., arrowRight
    // row should be toRow.
    // fill connectors at: fromCol until toCol-1
    if (fromRow < toRow) {
        const startCol = fromCol;
        const endCol = toCol - 1;
        const row = toRow;
        const firstEntry = { col: startCol, row, connectorId: "downRight" };
        let res = [firstEntry];
        res = res.concat(lineHorizes({ startCol: startCol + 1, endCol, row }));
        const lastEntry = { col: endCol, row, connectorId: "arrowRight" };
        res.push(lastEntry);
        return res;
    }

    // Case 3: fromRow > toRow
    // should be lineHoriz, ..., rightUpArrow
    // row should be fromRow.
    // fill connectors at: fromCol+1 until toCol
    const startCol = fromCol + 1;
    const endCol = toCol;
    const row = fromRow;
    let res = lineHorizes({ startCol, endCol, row });
    const lastEntry = { col: endCol, row, connectorId: "rightUpArrow" };
    res.push(lastEntry);

    return res;
};

/** createCoordPairs
 * Creates an array of fromCoord and toCoord pairs for use by connectorBetweenNodes
 *
*/
const createCoordPairs = ({ nodeCoord, parentCoords }: {
    nodeCoord: EndomorphDict;
    parentCoords: PolymorphDict;
}): { toCoord: MatrixCoord; fromCoord: MatrixCoord }[] => {
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
export const populateMatrix = ({ workflowVisData, initMatrix }: {
    workflowVisData: WorkflowVisDataT; initMatrix: string[][];
}) => {
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
        const colNum = workflowStepOrder * 2;
        const col = matrix[colNum];

        // TODO: We need to account for the coord of the parent node when placing a new
        // node into the matrix
        const { updatedCol, rowNum } = addWorkflowStepToColumn({ col, colNum, newItem: id });
        matrix[workflowStepOrder * 2] = updatedCol;

        nodeCoord[id] = encodeMatrixCoord({ col: colNum, row: rowNum });


        let nextStepId = null;
        for (let i = 0; i < nextSteps.length; i += 1) {
            nextStepId = nextSteps[i];

            // TODO: update the parentCoord here using nodeCoord.
            // We are guaranteed that nextStep's parent's coord is in nodeCoord
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
    // get { fromCoord, toCoord }[] from nodeCoord and parentCoords
    Object.keys(parentCoords);
    const coordPairs = createCoordPairs({ nodeCoord, parentCoords });
    const connectorsToPlace = coordPairs
        .map(coordPair => createConnectorsBetweenNodes(coordPair))
        .flat();

    console.log("connectorsToPlace", connectorsToPlace);

    // place connectors into the matrix
    for (let i = 0; i < connectorsToPlace.length; i += 1) {
        const { col: colNum, row: rowNum, connectorId } = connectorsToPlace[i];

        const columnType = matrix[colNum][rowNum].split(".")[0];
        // TODO: create a helper function to replace a tile in a matrix
        const newCol = clone(matrix[colNum]);
        newCol[rowNum] = `${columnType}.${connectorId}`;
        matrix[colNum] = newCol;
    }

    return matrix;
};





// TODO: works for Not totally correct. Need to increase depth
// of level based on branching
export const createGrid = (workflowVisData: WorkflowVisDataT) => {
    const { firstStep, workflowStepNodes } = workflowVisData;
    let grid = [[firstStep]];
    let toExplore = [firstStep];
    const explored: { [id: string]: boolean | undefined } = {};
    while (toExplore.length > 0) {
        const [id, ...rest] = toExplore;
        toExplore = rest;
        const workflowStepNode = workflowStepNodes[id];
        const { nextSteps } = workflowStepNode;

        grid = grid.concat([[]]);

        let nextStep = null;
        for (let i = 0; i < nextSteps.length; i += 1) {
            nextStep = nextSteps[i];
            if (!explored[nextStep]) {
                toExplore = toExplore.concat(nextStep);
                explored[nextStep] = true;
                grid[grid.length - 1] = grid[grid.length - 1].concat(nextStep);
            }
        }

        if (grid.slice(-1)[0].length === 0) {
            grid = grid.slice(0, -1);
        }
    }
    return grid;
};