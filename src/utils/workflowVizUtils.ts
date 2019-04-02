// Types
import { WorkflowStepType } from "../types/workflow";
import { WorkflowStepNodeT, WorkflowVisDataT } from "../types/workflowVis";

// TODO: works for Not totally correct. Need to increase depth
// of level based on branching
export const createGrid = (workflowVisData: WorkflowVisDataT) => {
    const { firstStep, workflows } = workflowVisData;
    let grid = [[firstStep]];
    let toExplore = [firstStep];
    const explored: { [id: string]: boolean | undefined } = {};
    while (toExplore.length > 0) {
        const [id, ...rest] = toExplore;
        toExplore = rest;
        const workflow = workflows[id];
        const { children } = workflow;

        grid = grid.concat([[]]);

        let child = null;
        for (let i = 0; i < children.length; i += 1) {
            child = children[i];
            if (!explored[child]) {
                toExplore = toExplore.concat(child);
                explored[child] = true;
                grid[grid.length - 1] = grid[grid.length - 1].concat(child);
            }
        }

        if (grid.slice(-1)[0].length === 0) {
            grid = grid.slice(0, -1);
        }
    }
    return grid;
};