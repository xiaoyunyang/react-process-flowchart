# css-grid-flowchart

> A lean process flowchart generator built with based on CSS Grid and React

![css-grid-flowchart demo of permuations](/resource/04-04-demo-permutations.gif)

![css-grid-flowchart demo for plus sign](/resource/04-04-demo-plus-sign.gif)

![css-grid-flowchart demo for plus sign](/resource/reveal-plus-sign.gif)

![css-grid-flowchart demo for plus sign](/resource/reveal-plus-sign-with-clicking.gif)


## Data-driven Visualization

```javascript
data = {
    firstStep: "b1fe-auth",
    workflows: {
        "b1fe-auth": { id: "b1fe-auth", name: "Authorize", type: AUTHORIZE, children: ["b1fe"] },
        "b1fe": { id: "b1fe", name: "Decision", type: DECISION, children: ["3902", "e5d2"] },
        "3902": { id: "3902", name: "Human", type: TRANSLATION, children: [ "2910"] },
        "e5d2": { id: "e5d2", name: "MachineMachine", type: TRANSLATION, children: ["3bb4"] },
        "2910": { id: "2910", name: "Edit", type: POST_TRANSLATION, children: ["3bb4"] },
        "3bb4": { id: "3bb4", name: "Review", type: REVIEW, children: ["51fa"] },
        "51fa": { id: "51fa", name: "Published", type: PUBLISH, children: [] }
    }
}
```

becomes

![css-grid-flowchart example workflow](/resource/example-workflow.png)

### Design Approach

#### Layout

![css-grid-flowchart design approach](/resource/designApproach.png)

The visualization component ([`WorkflowVis`](/src/components/WorkflowVis.tsx)) takes as inputs

- `matrix` - A N x M matrix where N is the number of columns and M is the number of rows. Each element of the matrix specifies the i of building block to render.
- `workflowVisData` - A datastructure that represents the graph of all the workflow steps with information on how they are connected and the distance between the node and the root of the graph (assumed to be a directed acyclic graph (DAG)).

`matrix` is created from `workflowVisData`. ([WorkflowVisContainer](/src/components/WorkflowVisContainer.tsx)) creates `matrix` as follows:

1. Initialize a N x M `matrix`. N is longest path in the DAG (`workflowStepOrder` is pre-calculated for each node in the graph which provides the path of the node from the root node). M is calculated from the largest frequency of `workflowStepOrder`. `matrix` is initialized with `empty`.
2. Populate `matrix` with nodes (BFS of on the `workflowVisData`). The column number of the node is `workflowStepOrder * 2`. The row number of the node is determined as follows:

    - Naive: `rowNum` is the first unoccupied
    - Better: If no parent, `rowNum` is the first unoccupied. If has parent, `rowNum` is parent `rowNum`
    - Even Better: If no parent, rowNum is the first unoccupied. If has parent, rowNum is parent rowNum but if that is occupied, then we shift col 2 places to the right.

    currently, the naive approach is implemented whereby each node is placed into the next empty spot in the column array.  During this process, two hash maps are created:
        - `nodeIdToCoord` maps nodeId to its encoded `colNum, rowNum` string representing the node's position in the matrix.  
        - `nodeToParentCoords` maps nodeId of a node to an array of the coordinates (encoded `colNum, rowNum` string) of all the node's parents in the matrix.
3. Populate `matrix` with [connectors](/src/components/connectors.tsx) using the hash map generated from the previous step.

#### Interaction

You can add a new node to the flowchart by clicking the plus button. `WorkflowVisContainer` passes a function down to the visualization that gets called when a plus sign is clicked.

### Limitations of this visualization engine

- The flowchart has to be a DAG
- The longest path cannot be greater than **1000** (limitation of the grid column template [specified in the css](https://github.com/xiaoyunyang/css-grid-flowchart/blob/994b5842a214cd0d57046239c8dce69ec69e87d5/src/components/styles/workflowVis.module.css#L13))

### Run the Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

`npm start` runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test` launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.