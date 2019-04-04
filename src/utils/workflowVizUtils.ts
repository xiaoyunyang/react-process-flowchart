// Types
import { WorkflowVisDataT, WorkflowStepNodeT } from "../types/workflowVis";
import { WorkflowStepT, WorkflowStepType } from "../types/workflow";

// Utils
import { clone } from "ramda";

interface OccurenceDict {
    [id: string]: number;
}

interface ExistentialDict {
    [id: string]: boolean;
}

const initializeMatrix = ({ cols, rows }: { cols: number; rows: number }) => {
    const innerArray = Array(rows).fill("");
    const matrix = Array(cols).fill(innerArray);
    return matrix;
}

const addToColumn = (col: string[], newItem: string): string[] => {
    // Immutable....but we may change that for efficiency
    const colCpy = clone(col);
    for (let i = 0; i < col.length; i += 1) {
        if (col[i] === "") {
            colCpy[i] = newItem;
            break;
        }
    }
    return colCpy;

}

export const generateWorkflowVisData = (
    workflowSteps: WorkflowStepT[], workflowUid: string
): { workflowVisData: WorkflowVisDataT; initMatrix: string[][] } => {
    const firstStepId = `${workflowUid}-auth`;

    let workflowStepNodes: { [id: string]: WorkflowStepNodeT } = {};
    let authorizeNextSteps: string[] = [];

    let workflowStepOrderOccur: OccurenceDict = {};
    for (let i = 0; i < workflowSteps.length; i += 1) {
        const workflowStep = workflowSteps[i];

        const { workflowStepOrder, workflowStepUid,
            workflowStepName, workflowStepType, actions } = workflowStep;

        workflowStepOrderOccur[String(workflowStepOrder)] = (
            workflowStepOrderOccur[String(workflowStepOrder)] ? workflowStepOrderOccur[String(workflowStepOrder)] : 0
        ) + 1;

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
    const initMatrix = initializeMatrix({ cols, rows });

    return {
        workflowVisData,
        initMatrix
    }
};

// TODO: We might not need BFS to place the workflowStep into the matrix
export const populateMatrix = ({ workflowVisData, initMatrix }: {
    workflowVisData: WorkflowVisDataT; initMatrix: string[][];
}) => {
    const matrix = clone(initMatrix);
    const { firstStep, workflowStepNodes } = workflowVisData;

    let toExplore = [firstStep];
    const explored: ExistentialDict = {};

    while (toExplore.length > 0) {
        const [id, ...rest] = toExplore;
        toExplore = rest;
        const workflowStepNode = workflowStepNodes[id];
        const { nextSteps, workflowStepOrder } = workflowStepNode;

        // Place the workflow step id into the matrix
        const col = matrix[workflowStepOrder * 2];
        matrix[workflowStepOrder * 2] = addToColumn(col, id)


        let nextStep = null;
        for (let i = 0; i < nextSteps.length; i += 1) {
            nextStep = nextSteps[i];
            if (!explored[nextStep]) {
                toExplore = toExplore.concat(nextStep);
                explored[nextStep] = true;
            }
        }

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