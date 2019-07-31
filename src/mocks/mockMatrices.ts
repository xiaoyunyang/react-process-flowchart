import { encodedWorkflowStepType } from "../config";
import { WorkflowVisDataT } from "../lib/types/workflowVisTypes";

// NOTE
// matrices A through BF correspond to workflowVisData in this file.
// matrices DA through DB correspond to DA and DB in mockWorkflowsData

export const workflowVisData = {
    firstStep: "node-start",
    workflowStepNodes: {
        "node-start": {
            id: "node-start",
            name: encodedWorkflowStepType["start"],
            type: encodedWorkflowStepType["start"],
            workflowStepOrder: 0,
            nextNodes: [
                { id: "node-fork", primary: true }
            ],
            prevSteps: []
        },
        "node-fork": {
            id: "node-fork",
            name: encodedWorkflowStepType["fork"],
            type: encodedWorkflowStepType["fork"],
            workflowStepOrder: 1,
            nextNodes: [
                { id: "node-1A", primary: true },
                { id: "node-2A", primary: false }
            ],
            prevSteps: []
        },
        "node-1A": {
            id: "node-1A",
            name: `${encodedWorkflowStepType[2].toLocaleLowerCase()}1`,
            type: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            nextNodes: [
                { id: "node-1B", primary: true }
            ],
            prevSteps: []
        },
        "node-2A": {
            id: "node-2A",
            name: `${encodedWorkflowStepType[2].toLocaleLowerCase()}2`,
            type: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            nextNodes: [
                { id: "node-1B", primary: true }
            ],
            prevSteps: []
        },
        "node-3A": {
            id: "node-3A",
            name: `${encodedWorkflowStepType[2].toLocaleLowerCase()}3`,
            type: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            nextNodes: [
                { id: "node-1B", primary: true }
            ],
            prevSteps: []
        },
        "node-4A": {
            id: "node-4A",
            name: `${encodedWorkflowStepType[2].toLocaleLowerCase()}4`,
            type: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            nextNodes: [
                { id: "node-1B", primary: true }
            ],
            prevSteps: []
        },
        "node-1B": {
            id: "node-1B",
            name: `${encodedWorkflowStepType[3].toLocaleLowerCase()}1`,
            type: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            nextNodes: [
                { id: "node-1C", primary: true }
            ],
            prevSteps: []
        },
        "node-1C": {
            id: "node-1C",
            name: `${encodedWorkflowStepType[4].toLocaleLowerCase()}2`,
            type: encodedWorkflowStepType[4],
            workflowStepOrder: 4,
            nextNodes: [
                { id: "node-finish", primary: true }
            ],
            prevSteps: []
        },
        "node-finish": {
            id: "node-finish",
            name: encodedWorkflowStepType["finish"].toLocaleLowerCase(),
            type: encodedWorkflowStepType["finish"],
            workflowStepOrder: 5,
            nextNodes: [],
            prevSteps: []
        },
        "m-long": {
            id: "m-long",
            name: "MMMMMMMMMMMMMM", // 14 chars
            type: encodedWorkflowStepType[4],
            workflowStepOrder: 1,
            nextNodes: [
                { id: "node-fork", primary: true }
            ],
            prevSteps: []
        },
        "a-long": {
            id: "a-long",
            name: "AAA AAAAAAAAAAA", // 14 chars
            type: encodedWorkflowStepType[4],
            workflowStepOrder: 2,
            nextNodes: [
                { id: "i-long", primary: true }
            ],
            prevSteps: []
        },
        "i-long": {
            id: "i-long",
            name: "iiiiiiiiiiiiii", // 14 chars
            type: encodedWorkflowStepType[4],
            workflowStepOrder: 3,
            nextNodes: [],
            prevSteps: []
        }
    }
} as any as WorkflowVisDataT;


export const matrixTruncateNameTest = [
    ["node-start", "box|empty|0,1"],
    ["standard|arrowRight|1,0", "standard|empty|1,1"],
    ["m-long|2,0", "standard|empty|2,1"],
    ["standard|arrowRight|3,0", "standard|empty|3,1"],
    ["a-long", "box|empty|4,1"],
    ["standard|arrowRight|5,0", "standard|empty|5,1"],
    ["i-long", "box|empty|6,1"]
];

export const matrixAA = [
    ["node-start", "box|empty|0,1"],
    ["standard|arrowRight|1,0", "standard|empty|1,1"],
    ["node-fork", "diamond|downRightDash|2.1"],
    ["standard|arrowRight|3,0", "standard|empty|3,1"],
    ["node-1A", "box|empty|4,1"],
    ["standard|arrowRight|5,0", "standard|empty|5,1"],
    ["node-finish", "box|empty|6,1"]
];

export const matrixAB = [
    ["node-start", "box|empty|0,1"],
    ["standard|arrowRight|1,0|0,0", "standard|empty|1,1"],
    ["node-fork", "diamond|downRight|2,1"],
    ["standard|arrowRight|3,0", "standard|arrowRight|3,1|2,0"],
    ["node-1A", "node-2A"],
    ["standard|arrowRight|5,0|4,0", "standard|lineHoriz|5,1|4,1"],
    ["node-finish", "box|rightUpArrow|6,1"]
];


export const matrixAC = [
    ["node-start", "box|empty|0,1", "box|empty|0,2", "box|empty|0,3"],
    ["standard|arrowRight|1,0|0,0", "standard|empty|1,1", "standard|empty|1,2", "standard|empty|1,3"],
    ["node-fork", "diamond|downRight|2,1", "diamond|downRight|2,2", "diamond|downRight|2,3"],
    ["standard|arrowRight|3,0|2,0", "standard|arrowRight|3,1|2,0", "standard|arrowRight|3,2|2,0", "standard|arrowRight|3,3|2,0"],
    ["node-1A", "node-2A", "node-3A", "node-4A"],
    ["standard|arrowRight|5,0|4,0", "standard|lineHoriz|5,1|4,1", "standard|lineHoriz|5,2|4,2", "standard|lineHoriz|5,3|4,3"],
    ["node-finish", "box|rightUpArrow|6,1", "box|rightUp|6,2", "box|rightUp|6,3"]
];

export const matrixAD = [
    ["node-start", "box|empty|0,1", "box|empty|0,2"],
    ["standard|arrowRight|1,0|0,0", "standard|empty|1,1", "standard|empty|1,2"],
    ["node-fork", "diamond|downRight|2,1", "diamond|downRight|2,2"],
    ["standard|arrowRight|3,0|2,0", "standard|arrowRight|3,1|2,0", "standard|arrowRight|3,2|2,0"],
    ["node-1A", "node-2A", "node-3A"],
    ["standard|arrowRight|5,0|4,0", "standard|lineHoriz|5,1|4,1", "standard|lineHoriz|5,2|4,2"],
    ["node-1B", "box|rightUpArrow|6,1", "box|lineHoriz|6,2"],
    ["standard|arrowRight|7,0|6,0", "standard|empty|7,1", "standard|lineHoriz|7,2"],
    ["node-1C", "box|arrowUp|8,1", "box|rightUp|8,2"],
    ["standard|arrowRight|9,0|8,0", "standard|empty|9,1", "standard|empty|9,2"],
    ["node-finish", "box|empty|10,1", "box|empty|10,2"]
];

export const matrixAE = [
    ["node-start", "box|empty|0,1", "box|empty|0,2", "box|empty|0,3"],
    ["standard|arrowRight|1,0|0,0", "standard|empty|1,1", "standard|empty|1,2", "standard|empty|1,3"],
    ["node-fork", "diamond|downRight|2,1", "diamond|downRight|2,2", "diamond|downRight|2,3"],
    ["standard|arrowRight|3,0|2,0", "standard|arrowRight|3,1|2,0", "standard|arrowRight|3,2|2,0", "standard|arrowRight|3,3|2,0"],
    ["node-1A", "node-2A", "node-3A", "node-4A"],
    ["standard|arrowRight|5,0|4,0", "standard|lineHoriz|5,1|4,1", "standard|lineHoriz|5,2|4,2", "standard|lineHoriz|5,3|3,3"],
    ["node-1B", "box|rightUpArrow|6,1", "box|rightUp|6,2", "box|lineHoriz|6,3"],
    ["standard|arrowRight|7,0|6,0", "standard|empty|7,1", "standard|empty|7,2", "standard|lineHoriz|7,2"],
    ["node-1C", "box|arrowUp|8,1", "box|lineVert|8,2", "box|rightUp|8,3"],
    ["standard|arrowRight|9,0|8,0", "standard|empty|9,1", "standard|empty|9,2"],
    ["node-finish", "box|empty|10,1", "box|empty|10,2", "box|empty|10,3"]
];

export const matrixBA = [
    ["node-start", "box|empty|0,0"],
    ["standard|arrowRight|1,0", "standard|empty|1,1"],
    ["node-fork", "diamond|downRight|2,1"],
    ["standard|arrowRight|3,0", "standard|arrowRight|3,1"],
    ["node-1A", "node-2A"],
    ["standard|arrowRight|5,0", "standard|lineHoriz|5,1"],
    ["node-1B", "box|rightUpArrow|6,1"],
    ["standard|arrowRight|7,0", "standard|empty|7,1"],
    ["node-1C", "box|empty|8,1"],
    ["standard|arrowRight|9,0", "standard|empty|9,1"],
    ["node-finish", "box|empty|10,1"]
];

export const matrixBB = [
    ["node-start", "box|empty|0,1"],
    ["standard|arrowRight|1,0", "standard|empty|1,1"],
    ["node-fork", "diamond|downRight|2,1"],
    ["standard|arrowRight|3,0", "standard|arrowRight|3,1"],
    ["node-1A", "node-2A"],
    ["standard|arrowRight|5,0", "standard|lineHoriz|5,1"],
    ["node-1B", "box|lineHoriz|6,1"],
    ["standard|arrowRight|7,0", "standard|lineHoriz|7,1"],
    ["node-1C", "box|rightUpArrow|8,1"],
    ["standard|arrowRight|9,0", "standard|empty|9,1"],
    ["node-finish", "box|empty|10,1"]
];

const matrixBC = [
    ["node-start", "box|empty|0,1"],
    ["standard|arrowRight|1,0", "standard|empty|1,1"],
    ["node-fork", "diamond|downRight|2,1"],
    ["standard|arrowRight|3,0", "standard|arrowRight|3,1"],
    ["node-1A", "node-2A"],
    ["standard|arrowRight|5,0", "standard|lineHoriz|5,1"],
    ["node-1B", "box|lineHoriz|6,1"],
    ["standard|arrowRight|7,0", "standard|lineHoriz|7,1"],
    ["node-1C", "box|lineHoriz|8,1"],
    ["standard|arrowRight|9,0", "standard|lineHoriz|9,1"],
    ["node-finish", "box|rightUpArrow|10,1"]
];

export const matrixBD = [
    ["node-start", "box|empty|0,1"],
    ["standard|arrowRight|1,0", "standard|empty|1,1"],
    ["node-fork", "diamond|downRight|2,1"],
    ["standard|arrowRight|3,0", "standard|arrowRight|3,1"],
    ["node-1A", "node-2A"],
    ["standard|lineHoriz|5,0", "standard|arrowRight|5,1"],
    ["box|lineHoriz|6,0", "node-1B"],
    ["standard|lineHoriz|7,0", "standard|lineHoriz|7,1"],
    ["node-1C", "box|lineHoriz|8,1"],
    ["standard|arrowRight|9,0", "standard|lineHoriz|9,1"],
    ["node-finish", "box|rightUpArrow|10,1"]
];

const matrixBE = [
    ["node-start", "box|empty|0,1"],
    ["standard|arrowRight|1,0", "standard|empty|1,1"],
    ["node-fork", "diamond|downRight|2,1"],
    ["standard|arrowRight|3,0", "standard|arrowRight|3,1"],
    ["node-1A", "node-2A"],
    ["standard|lineHoriz|5,0", "standard|arrowRight|5,1"],
    ["box|lineHoriz|6,0", "node-1B"],
    ["standard|lineHoriz|7,0", "standard|arrowRight|7,1"],
    ["box|lineHoriz|8,0", "node-1C"],
    ["standard|arrowRight|9,0", "standard|lineHoriz|9,1"],
    ["node-finish", "box|rightUpArrow|10,1"]
];

export const matrixBF = [
    ["node-start", "box|empty|0,1", "box|empty|0,2"],
    ["standard|arrowRight|1,0", "standard|empty|1,1", "standard|empty|1,2"],
    ["node-fork", "diamond|downRight|2,1", "diamond|downRight|2,2"],
    ["standard|arrowRight|3,0", "standard|arrowRight|3,1", "standard|arrowRight|3,2"],
    ["node-1A", "node-2A", "node-3A"],
    ["standard|lineHoriz|5,0", "standard|arrowRight|5,1", "standard|lineHoriz|5,2"],
    ["box|lineHoriz|6,0", "node-1B", "box|lineHoriz|6,2"],
    ["standard|lineHoriz|7,0", "standard|arrowRight|7,1", "standard|lineHoriz|7,2"],
    ["box|lineHoriz|8,0", "node-1C", "box|rightUpArrow|8,2"],
    ["standard|arrowRight|9,0", "standard|lineHoriz|9,1", "standard|empty|9,2"],
    ["node-finish", "box|rightUpArrow|10,1", "box|empty|10,2"]
];

// const gridTestBP = [
//     ["node-start", "box.downRight"],
//     ["standard.lineHoriz", "standard.arrowRight"],
//     ["diamond.lineHoriz", "node-fork", "diamond.downRight"],
//     ["standard.arrowRight", "standard.arrowRight", "standard.lineHoriz"],
//     ["node-1A", "node-2A", "rightUpArrow"],
//     ["standard.arrowRight", "standard.arrowRight"],
//     ["node-finish", "box.lineHoriz"]
// ];

export const matrixDA = [
    [
        "wf-da-auth",
        "box|empty|0,1",
        "box|empty|0,2",
        "box|empty|0,3",
        "box|empty|0,4"
    ],
    [
        "standard|arrowRight|1,0|0,0",
        "standard|empty|1,1",
        "standard|empty|1,2",
        "standard|empty|1,3",
        "standard|empty|1,4"
    ],
    [
        "da-d1",
        "diamond|downRight|2,1",
        "diamond|downRight|2,2",
        "diamond|downRight|2,3",
        "diamond|downRightDash|2,4|2,0"
    ],
    [
        "standard|arrowRight|3,0|2,0",
        "standard|arrowRight|3,1|2,0",
        "standard|arrowRight|3,2|2,0",
        "standard|arrowRight|3,3|2,0",
        "standard|empty|3,4"
    ],
    [
        "pretrans1",
        "trans4",
        "trans2",
        "trans3",
        "box|empty|4,4"
    ],
    [
        "standard|arrowRight|5,0|4,0",
        "standard|lineHoriz|5,1|4,1",
        "standard|lineHoriz|5,2|4,2",
        "standard|lineHoriz|5,3|4,3",
        "standard|empty|5,4"
    ],
    [
        "trans1",
        "box|rightUpArrow|6,1",
        "box|lineHoriz|6,2",
        "box|lineHoriz|6,3",
        "box|empty|6,4"
    ],
    [
        "standard|arrowRight|7,0|6,0",
        "standard|empty|7,1",
        "standard|lineHoriz|7,2",
        "standard|lineHoriz|7,3",
        "standard|empty|7,4"
    ],
    [
        "review1",
        "box|arrowUp|8,1",
        "box|rightUp|8,2",
        "box|lineHoriz|8,3",
        "box|empty|8,4"
    ],
    [
        "standard|arrowRight|9,0|8,0",
        "standard|empty|9,1",
        "standard|empty|9,2",
        "standard|lineHoriz|9,3",
        "standard|empty|9,4"
    ],
    [
        "published",
        "box|arrowUp|10,1",
        "box|lineVert|10,2",
        "box|rightUp|10,3",
        "box|empty|10,4"
    ]
];

export const matrixDB = [
    [
        "wf-db-auth",
        "box|empty|0,1",
        "box|empty|0,2",
        "box|empty|0,3",
        "box|empty|0,4",
        "box|empty|0,5"
    ],
    [
        "standard|arrowRight|1,0|0,0",
        "standard|empty|1,1",
        "standard|empty|1,2",
        "standard|empty|1,3",
        "standard|empty|1,4",
        "standard|empty|1,5"
    ],
    [
        "db-d1",
        "diamond|downRight|2,1",
        "diamond|downRight|2,2",
        "diamond|downRight|2,3",
        "diamond|downRight|2,4",
        "diamond|downRightDash|2,5|2,0"
    ],
    [
        "standard|arrowRight|3,0|2,0",
        "standard|arrowRight|3,1|2,0",
        "standard|arrowRight|3,2|2,0",
        "standard|arrowRight|3,3|2,0",
        "standard|arrowRight|3,4|2,0",
        "standard|empty|3,5"
    ],
    [
        "trans0",
        "trans2",
        "trans4",
        "trans1",
        "trans3",
        "box|empty|4,5"
    ],
    [
        "standard|lineHoriz|5,0|4,0",
        "standard|arrowRight|5,1|4,1",
        "standard|lineHoriz|5,2|4,2",
        "standard|arrowRight|5,3|4,3",
        "standard|lineHoriz|5,4|4,4",
        "standard|empty|5,5"
    ],
    [
        "box|lineHoriz|6,0",
        "review2",
        "box|rightUpArrow|6,2",
        "edit1",
        "box|rightUpArrow|6,4",
        "box|empty|6,5"
    ],
    [
        "standard|arrowRight|7,0",
        "standard|lineHoriz|7,1|6,1",
        "standard|empty|7,2",
        "standard|lineHoriz|7,3|6,3",
        "standard|empty|7,4",
        "standard|empty|7,5"
    ],
    [
        "review0",
        "box|rightUpArrow|8,1",
        "box|empty|8,2",
        "box|lineHoriz|8,3",
        "box|empty|8,4",
        "box|empty|8,5"
    ],
    [
        "standard|arrowRight|9,0|8,0",
        "standard|empty|9,1",
        "standard|empty|9,2",
        "standard|lineHoriz|9,3",
        "standard|empty|9,4",
        "standard|empty|9,5"
    ],
    [
        "published",
        "box|arrowUp|10,1",
        "box|lineVert|10,2",
        "box|rightUp|10,3",
        "box|empty|10,4",
        "box|empty|10,5"
    ]
];

export const matrixDC = [
    [
        "wf-dc-auth",
        "box|empty|0,1",
        "box|empty|0,2",
        "box|empty|0,3",
        "box|empty|0,4",
        "box|empty|0,5"
    ],
    [
        "standard|arrowRight|1,0|0,0",
        "standard|empty|1,1",
        "standard|empty|1,2",
        "standard|empty|1,3",
        "standard|empty|1,4",
        "standard|empty|1,5"
    ],
    [
        "dc-d1",
        "diamond|downRight|2,1",
        "diamond|downRight|2,2",
        "diamond|downRight|2,3",
        "diamond|downRight|2,4",
        "diamond|downRightDash|2,5|2,0"
    ],
    [
        "standard|arrowRight|3,0|2,0",
        "standard|arrowRight|3,1|2,0",
        "standard|arrowRight|3,2|2,0",
        "standard|arrowRight|3,3|2,0",
        "standard|arrowRight|3,4|2,0",
        "standard|empty|3,5"
    ],
    [
        "trans0",
        "trans1",
        "trans3",
        "trans2",
        "trans4",
        "box|empty|4,5"
    ],
    [
        "standard|lineHoriz|5,0|4,0",
        "standard|arrowRight|5,1|4,1",
        "standard|lineHoriz|5,2|4,2",
        "standard|arrowRight|5,3|4,3",
        "standard|lineHoriz|5,4|4,4",
        "standard|empty|5,5"
    ],
    [
        "box|lineHoriz|6,0",
        "edit1",
        "box|rightUpArrow|6,2",
        "review2",
        "box|rightUpArrow|6,4",
        "box|empty|6,5"
    ],
    [
        "standard|arrowRight|7,0",
        "standard|lineHoriz|7,1|6,1",
        "standard|empty|7,2",
        "standard|lineHoriz|7,3|6,3",
        "standard|empty|7,4",
        "standard|empty|7,5"
    ],
    [
        "published",
        "box|rightUpArrow|8,1",
        "box|lineVert|8,2",
        "box|rightUp|8,3",
        "box|empty|8,4",
        "box|empty|8,5"
    ]
];

export const matrixDD = [
    [
        "wf-dd-auth",
        "box|empty|0,1",
        "box|empty|0,2",
        "box|empty|0,3",
        "box|empty|0,4"
    ],
    [
        "standard|arrowRight|1,0|0,0",
        "standard|empty|1,1",
        "standard|empty|1,2",
        "standard|empty|1,3",
        "standard|empty|1,4"
    ],
    [
        "dd-d1",
        "diamond|downRight|2,1",
        "diamond|downRight|2,2",
        "diamond|downRight|2,3",
        "diamond|downRightDash|2,4|2,0"
    ],
    [
        "standard|arrowRight|3,0|2,0",
        "standard|arrowRight|3,1|2,0",
        "standard|arrowRight|3,2|2,0",
        "standard|arrowRight|3,3|2,0",
        "standard|empty|3,4"
    ],
    [
        "trans0",
        "trans2",
        "trans3",
        "trans1",
        "box|empty|4,4"
    ],
    [
        "standard|lineHoriz|5,0|4,0",
        "standard|lineHoriz|5,1|4,1",
        "standard|arrowRight|5,2|4,2",
        "standard|arrowRight|5,3|4,3",
        "standard|empty|5,4"
    ],
    [
        "box|lineHoriz|6,0",
        "box|lineHoriz|6,1",
        "review3",
        "review1",
        "box|empty|6,4"
    ],
    [
        "standard|lineHoriz|7,0",
        "standard|arrowRight|7,1",
        "standard|lineHoriz|7,2|6,2",
        "standard|lineHoriz|7,3|6,3",
        "standard|empty|7,4"
    ],
    [
        "box|lineHoriz|8,0",
        "edit3",
        "box|rightUpArrow|8,2",
        "box|lineHoriz|8,3",
        "box|empty|8,4"
    ],
    [
        "standard|arrowRight|9,0",
        "standard|lineHoriz|9,1|8,1",
        "standard|empty|9,2",
        "standard|lineHoriz|9,3",
        "standard|empty|9,4"
    ],
    [
        "edit0",
        "box|rightUpArrow|10,1",
        "box|empty|10,2",
        "box|lineHoriz|10,3",
        "box|empty|10,4"
    ],
    [
        "standard|arrowRight|11,0|10,0",
        "standard|empty|11,1",
        "standard|empty|11,2",
        "standard|lineHoriz|11,3",
        "standard|empty|11,4"
    ],
    [
        "review0",
        "box|empty|12,1",
        "box|empty|12,2",
        "box|lineHoriz|12,3",
        "box|empty|12,4"
    ],
    [
        "standard|arrowRight|13,0|12,0",
        "standard|empty|13,1",
        "standard|empty|13,2",
        "standard|lineHoriz|13,3",
        "standard|empty|13,4"
    ],
    [
        "published",
        "box|arrowUp|14,1",
        "box|lineVert|14,2",
        "box|rightUp|14,3",
        "box|empty|14,4"
    ]
];

export const matrices = [
    { name: "Truncate Name", matrix: matrixTruncateNameTest },
    { name: "A-A", matrix: matrixAA },
    { name: "A-B", matrix: matrixAB },
    { name: "A-C", matrix: matrixAC },
    { name: "A-D", matrix: matrixAD },
    { name: "A-E", matrix: matrixAE },
    { name: "B-A", matrix: matrixBA },
    { name: "B-B", matrix: matrixBB },
    { name: "B-C", matrix: matrixBC },
    { name: "B-D", matrix: matrixBD },
    { name: "B-E", matrix: matrixBE },
    { name: "B-F", matrix: matrixBF }
];