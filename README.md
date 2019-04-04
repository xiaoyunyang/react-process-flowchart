# css-grid-flowchart

> A lean process flowchart generator built with based on CSS Grid and React

![](/resource/04-04-demo-permutations.gif)

![](/resource/04-04-demo-plus-sign.gif)

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

![](/resource/example-workflow.png)


### Run the Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

`npm start` runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test` launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.