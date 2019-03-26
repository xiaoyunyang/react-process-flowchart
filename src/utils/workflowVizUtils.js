// TODO: works for Not totally correct. Need to increase depth
// of level based on branching
export const createGrid = ({ firstStep, workflows }) => {
    let grid = [[firstStep]];
    let toExplore = [firstStep];
    let explored = {};
    while (toExplore.length > 0) {
        const [id, ...rest] = toExplore;
        toExplore = rest;
        const workflow = workflows[id];
        const { children } = workflow;

        grid = grid.concat([[]]);

        // eslint-disable-next-line no-loop-func
        children.forEach((child) => {
            if (!explored[child]) {
                toExplore = toExplore.concat(child);
                explored[child] = true;
                grid[grid.length - 1] = grid[grid.length - 1].concat(child);
            }
        });

        if (grid[grid.length - 1].length === 0) {
            grid = grid.slice(0, -1);
        }
    }
    return grid;
}