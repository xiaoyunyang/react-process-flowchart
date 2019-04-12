import { WorkflowStepTypeT } from "../../types/workflow";

export const workflowVisData = {
    "firstStep": "5890236e433b-auth",
    "workflowStepNodes": {
        "ba322565b1bf": {
            "id": "ba322565b1bf",
            "name": "D",
            "type": WorkflowStepTypeT.DECISION,
            "workflowStepOrder": 1,
            "nextSteps": [
                "09e6110fda58",
                "b2b5c4c7cfd7"
            ]
        },
        "297786162f15": {
            "id": "297786162f15",
            "name": "E",
            "type": WorkflowStepTypeT.POST_TRANSLATION,
            "workflowStepOrder": 3,
            "nextSteps": [
                "492b709fc90a"
            ]
        },
        "a3135bdf3aa3": {
            "id": "a3135bdf3aa3",
            "name": "Published",
            "type": WorkflowStepTypeT.PUBLISH,
            "workflowStepOrder": 5,
            "nextSteps": []
        },
        "492b709fc90a": {
            "id": "492b709fc90a",
            "name": "R",
            "type": WorkflowStepTypeT.POST_TRANSLATION,
            "workflowStepOrder": 4,
            "nextSteps": [
                "a3135bdf3aa3"
            ]
        },
        "09e6110fda58": {
            "id": "09e6110fda58",
            "name": "Translation",
            "type": WorkflowStepTypeT.TRANSLATION,
            "workflowStepOrder": 2,
            "nextSteps": [
                "297786162f15"
            ]
        },
        "b2b5c4c7cfd7": {
            "id": "b2b5c4c7cfd7",
            "name": "Translation2",
            "type": WorkflowStepTypeT.TRANSLATION,
            "workflowStepOrder": 2,
            "nextSteps": [
                "297786162f15"
            ]
        },
        "b2b5c4c7cfd8": {
            "id": "b2b5c4c7cfd7",
            "name": "Translation2",
            "type": WorkflowStepTypeT.TRANSLATION,
            "workflowStepOrder": 2,
            "nextSteps": [
                "297786162f15"
            ]
        },
        "5890236e433b-auth": {
            "id": "5890236e433b-auth",
            "name": "Authorize",
            "type": WorkflowStepTypeT.AUTHORIZE,
            "nextSteps": [
                "ba322565b1bf"
            ],
            "workflowStepOrder": 0
        }
    }
};

export const matrixA = [
    ["5890236e433b-auth", "box.empty.0,1"],
    ["standard.arrowRight.1,0", "standard.empty.1,1"],
    ["ba322565b1bf", "diamond.downRight.2.1"],
    ["standard.arrowRight.3,0", "standard.arrowRight.3,1"],
    ["09e6110fda58", "b2b5c4c7cfd7"],
    ["standard.arrowRight.5,0", "standard.lineHoriz.5,1"],
    ["a3135bdf3aa3", "box.rightUpArrow.6,1"]
];

export const matrixBA = [
    ["5890236e433b-auth", "box.empty.0,0"],
    ["standard.arrowRight.1,0", "standard.empty.1,1"],
    ["ba322565b1bf", "diamond.downRight.2,1"],
    ["standard.arrowRight.3,0", "standard.arrowRight.3,1"],
    ["09e6110fda58", "b2b5c4c7cfd7"],
    ["standard.arrowRight.5,0", "standard.lineHoriz.5,1"],
    ["297786162f15", "box.rightUpArrow.6,1"],
    ["standard.arrowRight.7,0", "standard.empty.7,1"],
    ["492b709fc90a", "box.empty.8,1"],
    ["standard.arrowRight.9,0", "standard.empty.9,1"],
    ["a3135bdf3aa3", "box.empty.10,1"]
];

export const matrixBB = [
    ["5890236e433b-auth", "box.empty.0,1"],
    ["standard.arrowRight.1,0", "standard.empty.1,1"],
    ["ba322565b1bf", "diamond.downRight.2,1"],
    ["standard.arrowRight.3,0", "standard.arrowRight.3,1"],
    ["09e6110fda58", "b2b5c4c7cfd7"],
    ["standard.arrowRight.5,0", "standard.lineHoriz.5,1"],
    ["297786162f15", "box.lineHoriz.6,1"],
    ["standard.arrowRight.7,0", "standard.lineHoriz.7,1"],
    ["492b709fc90a", "box.rightUpArrow.8,1"],
    ["standard.arrowRight.9,0", "standard.empty.9,1"],
    ["a3135bdf3aa3", "box.empty.10,1"]
];
const matrixBC = [
    ["5890236e433b-auth", "box.empty.0,1"],
    ["standard.arrowRight.1,0", "standard.empty.1,1"],
    ["ba322565b1bf", "diamond.downRight.2,1"],
    ["standard.arrowRight.3,0", "standard.arrowRight.3,1"],
    ["09e6110fda58", "b2b5c4c7cfd7"],
    ["standard.arrowRight.5,0", "standard.lineHoriz.5,1"],
    ["297786162f15", "box.lineHoriz.6,1"],
    ["standard.arrowRight.7,0", "standard.lineHoriz.7,1"],
    ["492b709fc90a", "box.lineHoriz.8,1"],
    ["standard.arrowRight.9,0", "standard.lineHoriz.9,1"],
    ["a3135bdf3aa3", "box.rightUpArrow.10,1"]
];

export const matrixBD = [
    ["5890236e433b-auth", "box.empty.0,1"],
    ["standard.arrowRight.1,0", "standard.empty.1,1"],
    ["ba322565b1bf", "diamond.downRight.2,1"],
    ["standard.arrowRight.3,0", "standard.arrowRight.3,1"],
    ["09e6110fda58", "b2b5c4c7cfd7"],
    ["standard.lineHoriz.5,0", "standard.arrowRight.5,1"],
    ["box.lineHoriz.6,0", "297786162f15"],
    ["standard.lineHoriz.7,0", "standard.lineHoriz.7,1"],
    ["492b709fc90a", "box.lineHoriz.8,1"],
    ["standard.arrowRight.9,0", "standard.lineHoriz.9,1"],
    ["a3135bdf3aa3", "box.rightUpArrow.10,1"]
];
const matrixBE = [
    ["5890236e433b-auth", "box.empty.0,1"],
    ["standard.arrowRight.1,0", "standard.empty.1,1"],
    ["ba322565b1bf", "diamond.downRight.2,1"],
    ["standard.arrowRight.3,0", "standard.arrowRight.3,1"],
    ["09e6110fda58", "b2b5c4c7cfd7"],
    ["standard.lineHoriz.5,0", "standard.arrowRight.5,1"],
    ["box.lineHoriz.6,0", "297786162f15"],
    ["standard.lineHoriz.7,0", "standard.arrowRight.7,1"],
    ["box.lineHoriz.8,0", "492b709fc90a"],
    ["standard.arrowRight.9,0", "standard.lineHoriz.9,1"],
    ["a3135bdf3aa3", "box.rightUpArrow.10,1"]
];

export const matrixBF = [
    ["5890236e433b-auth", "box.empty.0,1", "box.empty.0,2"],
    ["standard.arrowRight.1,0", "standard.empty.1,1", "standard.empty.1,2"],
    ["ba322565b1bf", "diamond.downRight.2,1", "diamond.downRight.2,2"],
    ["standard.arrowRight.3,0", "standard.arrowRight.3,1", "standard.arrowRight.3,2"],
    ["09e6110fda58", "b2b5c4c7cfd7", "b2b5c4c7cfd8"],
    ["standard.lineHoriz.5,0", "standard.arrowRight.5,1", "standard.lineHoriz.5,2"],
    ["box.lineHoriz.6,0", "297786162f15", "box.lineHoriz.6,2"],
    ["standard.lineHoriz.7,0", "standard.arrowRight.7,1", "standard.lineHoriz.7,2"],
    ["box.lineHoriz.8,0", "492b709fc90a", "box.rightUpArrow.8,2"],
    ["standard.arrowRight.9,0", "standard.lineHoriz.9,1", "standard.empty.9,2"],
    ["a3135bdf3aa3", "box.rightUpArrow.10,1", "box.empty.10,2"]
];

// const gridTestBP = [
//     ["5890236e433b-auth", "box.downRight"],
//     ["standard.lineHoriz", "standard.arrowRight"],
//     ["diamond.lineHoriz", "ba322565b1bf", "diamond.downRight"],
//     ["standard.arrowRight", "standard.arrowRight", "standard.lineHoriz"],
//     ["09e6110fda58", "b2b5c4c7cfd7", "rightUpArrow"],
//     ["standard.arrowRight", "standard.arrowRight"],
//     ["a3135bdf3aa3", "box.lineHoriz"]
// ];

export const matrices = [matrixA, matrixBA, matrixBB, matrixBC, matrixBD, matrixBE, matrixBF];