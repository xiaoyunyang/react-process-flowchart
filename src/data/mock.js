import {
    DECISION, TRANSLATION, POST_TRANSLATION, REVIEW, PUBLISH, AUTHORIZE
} from "../types/workflowTypes";

// NOTE: Don't add to the children array if the id is an acestor of the current node
export const data1 = {
    firstStep: "1111-auth",
    workflows: {
        "1111-auth": { id: "1111-auth", name: "Authorize", type: AUTHORIZE, children: ["1111-decision"] },
        "1111-decision": { id: "b1fe", name: "Decision", type: DECISION, children: ["3902", "e5d2"] },
        "3902": { id: "3902", name: "Human", type: TRANSLATION, children: ["2910"] },
        "e5d2": { id: "e5d2", name: "MachineMachineMachine", type: TRANSLATION, children: ["3bb4"] },
        "2910": { id: "2910", name: "Edit", type: POST_TRANSLATION, children: ["3bb4"] },
        "3bb4": { id: "3bb4", name: "Review", type: REVIEW, children: ["51fa"] },
        "51fa": { id: "51fa", name: "Published", type: PUBLISH, children: [] }
    }
}
export const data12 = {
    firstStep: "b1fe-auth",
    workflows: {
        "b1fe-auth": { id: "b1fe-auth", name: "Authorize", type: AUTHORIZE, children: ["b1fe"] },
        "b1fe": { id: "b1fe", name: "Decision", type: DECISION, children: ["3bb4"] },
        "3bb4": { id: "3bb4", name: "Review", type: REVIEW, children: ["51fa"] },
        "51fa": { id: "51fa", name: "Published", type: PUBLISH, children: [] }
    }
}

export const data2 = {
    firstStep: "b1fe-auth",
    workflows: {
        "b1fe-auth": { id: "b1fe-auth", name: "Authorize", type: AUTHORIZE, children: ["b1fe"] },
        "b1fe": { id: "b1fe", name: "Decision", type: "DECISION", children: ["3902", "e5d2"] },
        "3902": { id: "3902", name: "Human", type: "TRANSLATION", children: ["2910"] },
        "e5d2": { id: "e5d2", name: "Machine", type: "TRANSLATION", children: ["e5d3"] },
        "e5d3": { id: "e5d3", name: "Machine2", type: "TRANSLATION", children: ["3bb4"] },
        "2910": { id: "2910", name: "Edit", type: "POST_TRANSLATION", children: ["3bb4"] },
        "3bb4": { id: "3bb4", name: "Review", type: "REVIEW", children: ["51fa"] },
        "51fa": { id: "51fa", name: "Published", type: "PUBLISH", children: [] }
    }
}

// Generate this ordered list of workflowStepIds based on workflowStepOrder
const data3 = {
    workflowStepIds: ["b1fe", "3902", "e5d2", "51fa"],
    firstStep: "b1fe",
    workflows: {
        "b1fe": { name: "Translation", children: ["3902"] },
        "3902": { name: "Editing", children: ["e5d2", "b1fe"] },
        "e5d2": { name: "Internal Review", children: ["51fa", "3902"] },
        "51fa": { name: "Published", children: [] }
    }
}

const data4 = {
    workflowStepIds: ["66e7", "8db1", "2910", "6272", "a265", "3bb4", "a8c0"],
    firstStep: "66e7",
    workflows: {
        "66e7": { name: "Estimate", children: ["8d1b"] },
        "8db1": { name: "Translation", children: ["2910"] },
        "2910": { name: "Proofreading", children: ["6272"] },
        "6272": { name: "In-country Review", children: ["a265", "8d1b"] },
        "a265": { name: "Agency Review", children: ["3bb4"] },
        "3bb4": { name: "Legal Review", children: ["a8c0"] },
        "a8c0": { name: "Published", children: [] },
    }
}
