import {
    WorkflowStepTypeT
} from "../../types/workflow";

// NOTE: Don't add to the children array if the id is an acestor of the current node
export const data0 = {
    firstStep: "1111-auth",
    workflows: {
        "1111-auth": { id: "1111-auth", name: "Authorize", type: WorkflowStepTypeT.AUTHORIZE, nextSteps: ["3902"] },
        "3902": { id: "3902", name: "Translation", type: WorkflowStepTypeT.TRANSLATION, nextSteps: ["2910"] },
        "2910": { id: "2910", name: "Edit", type: WorkflowStepTypeT.POST_TRANSLATION, nextSteps: ["3bb4"] },
        "3bb4": { id: "3bb4", name: "Review", type: WorkflowStepTypeT.REVIEW, nextSteps: ["51fa"] },
        "51fa": { id: "51fa", name: "Published", type: WorkflowStepTypeT.PUBLISH, nextSteps: [] }
    }
};
export const data1 = {
    firstStep: "1111-auth",
    workflows: {
        "1111-auth": { id: "1111-auth", name: "Authorize", type: WorkflowStepTypeT.AUTHORIZE, nextSteps: ["1111-decision"] },
        "1111-decision": { id: "b1fe", name: "Decision", type: WorkflowStepTypeT.DECISION, nextSteps: ["3902", "e5d2"] },
        "3902": { id: "3902", name: "Human", type: WorkflowStepTypeT.TRANSLATION, nextSteps: ["2910"] },
        "e5d2": { id: "e5d2", name: "MachineMachineMachine", type: WorkflowStepTypeT.TRANSLATION, nextSteps: ["3bb4"] },
        "2910": { id: "2910", name: "Edit", type: WorkflowStepTypeT.POST_TRANSLATION, nextSteps: ["3bb4"] },
        "3bb4": { id: "3bb4", name: "Review", type: WorkflowStepTypeT.REVIEW, nextSteps: ["51fa"] },
        "51fa": { id: "51fa", name: "Published", type: WorkflowStepTypeT.PUBLISH, nextSteps: [] }
    }
};
export const data12 = {
    firstStep: "b1fe-auth",
    workflows: {
        "b1fe-auth": { id: "b1fe-auth", name: "Authorize", type: WorkflowStepTypeT.AUTHORIZE, nextSteps: ["b1fe"] },
        "b1fe": { id: "b1fe", name: "Decision", type: WorkflowStepTypeT.DECISION, nextSteps: ["3bb4"] },
        "3bb4": { id: "3bb4", name: "Review", type: WorkflowStepTypeT.REVIEW, nextSteps: ["51fa"] },
        "51fa": { id: "51fa", name: "Published", type: WorkflowStepTypeT.PUBLISH, nextSteps: [] }
    }
};

export const data2 = {
    firstStep: "b1fe-auth",
    workflows: {
        "b1fe-auth": { id: "b1fe-auth", name: "Authorize", type: WorkflowStepTypeT.AUTHORIZE, nextSteps: ["b1fe"] },
        "b1fe": { id: "b1fe", name: "Decision", type: WorkflowStepTypeT.DECISION, nextSteps: ["3902", "e5d2"] },
        "3902": { id: "3902", name: "Human", type: WorkflowStepTypeT.TRANSLATION, nextSteps: ["2910"] },
        "e5d2": { id: "e5d2", name: "Machine", type: WorkflowStepTypeT.TRANSLATION, nextSteps: ["e5d3"] },
        "e5d3": { id: "e5d3", name: "Machine2", type: WorkflowStepTypeT.TRANSLATION, nextSteps: ["3bb4"] },
        "2910": { id: "2910", name: "Edit", type: WorkflowStepTypeT.POST_TRANSLATION, nextSteps: ["3bb4"] },
        "3bb4": { id: "3bb4", name: "Review", type: WorkflowStepTypeT.REVIEW, nextSteps: ["51fa"] },
        "51fa": { id: "51fa", name: "Published", type: WorkflowStepTypeT.PUBLISH, nextSteps: [] }
    }
};

// Generate this ordered list of workflowStepIds based on workflowStepOrder
const data3 = {
    workflowStepIds: ["b1fe", "3902", "e5d2", "51fa"],
    firstStep: "b1fe",
    workflows: {
        "b1fe": { name: "Translation", nextSteps: ["3902"] },
        "3902": { name: "Editing", nextSteps: ["e5d2", "b1fe"] },
        "e5d2": { name: "Internal Review", nextSteps: ["51fa", "3902"] },
        "51fa": { name: "Published", nextSteps: [] }
    }
};

const data4 = {
    workflowStepIds: ["66e7", "8db1", "2910", "6272", "a265", "3bb4", "a8c0"],
    firstStep: "66e7",
    workflows: {
        "66e7": { name: "Estimate", nextSteps: ["8d1b"] },
        "8db1": { name: "Translation", nextSteps: ["2910"] },
        "2910": { name: "Proofreading", nextSteps: ["6272"] },
        "6272": { name: "In-country Review", nextSteps: ["a265", "8d1b"] },
        "a265": { name: "Agency Review", nextSteps: ["3bb4"] },
        "3bb4": { name: "Legal Review", nextSteps: ["a8c0"] },
        "a8c0": { name: "Published", nextSteps: [] },
    }
};
