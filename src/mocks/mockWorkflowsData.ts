/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import { encodedWorkflowStepType, ActionTypeT, WorkflowStepT } from "../config";

const actionTypes = Object.keys(ActionTypeT);

export interface MockWorkflowsData {
    workflowUid: string;
    workflowName: string;
    workflowSteps: WorkflowStepT[];
}

export const AA = {
    workflowUid: "wf-aa",
    workflowName: "A-A",
    workflowSteps: [
        {
            workflowStepUid: "6473fda8a603",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: false,
                    actionType: actionTypes[4],
                    nextWorkflowStepUid: "64735f9f64c8"
                },
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "647384536514"
                }
            ]
        },
        {
            workflowStepUid: "6473f65c98fe",
            workflowStepName: encodedWorkflowStepType.finish.toLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 4,
            actions: []
        },
        {
            workflowStepUid: "647384536514",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "6473f65c98fe"
                },
                {
                    primary: false,
                    actionType: actionTypes[4],
                    nextWorkflowStepUid: "6473fda8a603"
                }
            ]
        },
        {
            workflowStepUid: "64735f9f64c8",
            workflowStepName: encodedWorkflowStepType[2].toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "6473fda8a603"
                }
            ]
        }
    ]
} as MockWorkflowsData;


export const AB = {
    workflowUid: "wf-ab",
    workflowName: "A-B",
    workflowSteps: [
        {
            workflowStepUid: "6473fda8a603",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: false,
                    actionType: actionTypes[4],
                    nextWorkflowStepUid: "64735f9f64c8"
                },
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "647384536514"
                }
            ]
        },
        {
            workflowStepUid: "6473f65c98fe",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 4,
            actions: []
        },
        {
            workflowStepUid: "647384536514",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "6473f65c98fe"
                },
                {
                    primary: false,
                    actionType: actionTypes[4],
                    nextWorkflowStepUid: "6473fda8a603"
                }
            ]
        },
        {
            workflowStepUid: "64735f9f64c8",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "6473fda8a603"
                }
            ]
        }
    ]
} as MockWorkflowsData;


export const AC = {
    workflowUid: "wf-ac",
    workflowName: "A-C",
    workflowSteps: [
        {
            workflowStepUid: "b5e96430cba5",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "863319b51a3f"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "cb12d6198c7c"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "e0405f577ddb"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "e0405f577ddc"
                }
            ]
        },
        {
            workflowStepUid: "41d3942a7566",
            workflowStepName: encodedWorkflowStepType.finish,
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 3,
            actions: []
        },
        {
            workflowStepUid: "863319b51a3f",
            workflowStepName: `${encodedWorkflowStepType[2].toLowerCase()}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        },
        {
            workflowStepUid: "cb12d6198c7c",
            workflowStepName: `${encodedWorkflowStepType[2].toLowerCase()}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        },
        {
            workflowStepUid: "e0405f577ddb",
            workflowStepName: `${encodedWorkflowStepType[2].toLowerCase()}3`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        },
        {
            workflowStepUid: "e0405f577ddc",
            workflowStepName: `${encodedWorkflowStepType[2].toLowerCase()}4`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const AD = {
    workflowUid: "wf-ad",
    workflowName: "A-D",
    workflowSteps: [
        {
            workflowStepUid: "b5e96430cba5",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans1"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans4"
                }
            ]
        },
        {
            workflowStepUid: "c1f18b8739ab",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "edit1",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: encodedWorkflowStepType.finish.toLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "c1f18b8739ab"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "c1f18b8739ab"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans4",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}4`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "published"
                }
            ]
        }
    ]
} as MockWorkflowsData;

// AE is for testing that primary branch is always kept at the top
export const AE = {
    workflowUid: "wf-ae",
    workflowName: "A-E",
    workflowSteps: [
        {
            workflowStepUid: "ae-d1",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "pretrans1"
                }
            ]
        },
        {
            workflowStepUid: "review1",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 4)}`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "pretrans1",
            workflowStepName: encodedWorkflowStepType[1].toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType[1],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "trans1"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "published"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BA = {
    workflowUid: "wf-ba",
    workflowName: "B-A",
    workflowSteps: [
        {
            workflowStepUid: "ba322565b1bf",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "09e6110fda58"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "b2b5c4c7cfd7"
                }
            ]
        },
        {
            workflowStepUid: "297786162f15",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "492b709fc90a"
                }
            ]
        },
        {
            workflowStepUid: "a3135bdf3aa3",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "492b709fc90a",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "a3135bdf3aa3"
                }
            ]
        },
        {
            workflowStepUid: "09e6110fda58",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "297786162f15"
                }
            ]
        },
        {
            workflowStepUid: "b2b5c4c7cfd7",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "297786162f15"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BB = {
    workflowUid: "wf-bb",
    workflowName: "B-B",
    workflowSteps: [
        {
            workflowStepUid: "cd9bc63c262d",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "7ee144915e8c"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "9c39ebe89888"
                }
            ]
        },
        {
            workflowStepUid: "c97272b8e6be",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "c1f18b8739ab"
                }
            ]
        },
        {
            workflowStepUid: "f13b94b131fb",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "c1f18b8739ab",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "f13b94b131fb"
                }
            ]
        },
        {
            workflowStepUid: "7ee144915e8c",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "c97272b8e6be"
                }
            ]
        },
        {
            workflowStepUid: "9c39ebe89888",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "c1f18b8739ab"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BC = {
    workflowUid: "wf-bc",
    workflowName: "B-C",
    workflowSteps: [
        {
            workflowStepUid: "0839ff2c552a",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "0fc524233120"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "a565cf48051d"
                }
            ]
        },
        {
            workflowStepUid: "9768e7a2faf6",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "3681192441e5"
                }
            ]
        },
        {
            workflowStepUid: "d965cb873e4c",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "3681192441e5",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "d965cb873e4c"
                }
            ]
        },
        {
            workflowStepUid: "0fc524233120",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "9768e7a2faf6"
                }
            ]
        },
        {
            workflowStepUid: "a565cf48051d",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "d965cb873e4c"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BD = {
    workflowUid: "wf-bd",
    workflowName: "B-D",
    workflowSteps: [
        {
            workflowStepUid: "694f1ab5da72",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "545d1240c3f5"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "099b821803b1"
                }
            ]
        },
        {
            workflowStepUid: "96e54d0aca1e",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "ce31ae78ef65"
                }
            ]
        },
        {
            workflowStepUid: "b36696d03ae1",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "ce31ae78ef65",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "b36696d03ae1"
                }
            ]
        },
        {
            workflowStepUid: "545d1240c3f5",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "ce31ae78ef65"
                }
            ]
        },
        {
            workflowStepUid: "099b821803b1",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "96e54d0aca1e"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BE = {
    workflowUid: "wf-be",
    workflowName: "B-E",
    workflowSteps: [
        {
            workflowStepUid: "eba3f5263651",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "8dc5752dad3c"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "dd3e9bf3e0ea"
                }
            ]
        },
        {
            workflowStepUid: "66da7510548b",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "2fc061474e7d"
                }
            ]
        },
        {
            workflowStepUid: "c4f14340ebb6",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "2fc061474e7d",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "c4f14340ebb6"
                }
            ]
        },
        {
            workflowStepUid: "8dc5752dad3c",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "c4f14340ebb6"
                }
            ]
        },
        {
            workflowStepUid: "dd3e9bf3e0ea",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "66da7510548b"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BF = {
    workflowUid: "wf-bf",
    workflowName: "B-F",
    workflowSteps: [
        {
            workflowStepUid: "b5e96430cba5",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "863319b51a3f"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "cb12d6198c7c"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "e0405f577ddb"
                }
            ]
        },
        {
            workflowStepUid: "42457e581a54",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "b1909eacb5ce"
                }
            ]
        },
        {
            workflowStepUid: "41d3942a7566",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "b1909eacb5ce",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        },
        {
            workflowStepUid: "863319b51a3f",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        },
        {
            workflowStepUid: "cb12d6198c7c",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "42457e581a54"
                }
            ]
        },
        {
            workflowStepUid: "e0405f577ddb",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "b1909eacb5ce"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const CD = {
    workflowUid: "wf-cd",
    workflowName: "C-D",
    workflowSteps: [
        {
            workflowStepUid: "7dbc1ae9cde2",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "f7aabbca784e"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "9dc9981a9955"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "1a83641d9fc0"
                }
            ]
        },
        {
            workflowStepUid: "12b6090d92b7",
            workflowStepName: `${encodedWorkflowStepType.fork.slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "b5df7d26284c"
                },
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "7a6054af88e8"
                }
            ]
        },
        {
            workflowStepUid: "b5df7d26284c",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "4b4484c2cfea"
                }
            ]
        },
        {
            workflowStepUid: "8a1cafced3b4",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 6,
            actions: []
        },
        {
            workflowStepUid: "4b4484c2cfea",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 5,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "8a1cafced3b4"
                }
            ]
        },
        {
            workflowStepUid: "7a6054af88e8",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "8a1cafced3b4"
                }
            ]
        },
        {
            workflowStepUid: "f7aabbca784e",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "b5df7d26284c"
                }
            ]
        },
        {
            workflowStepUid: "9dc9981a9955",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "7a6054af88e8"
                }
            ]
        },
        {
            workflowStepUid: "1a83641d9fc0",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "12b6090d92b7"
                }
            ]
        }
    ]
} as MockWorkflowsData;


// Group D mock data is for testing that we can sort the branches based on merge distance
export const DA = {
    workflowUid: "wf-da",
    workflowName: "D-A",
    workflowSteps: [
        {
            workflowStepUid: "da-d1",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans4"
                },
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "pretrans1"
                }
            ]
        },
        {
            workflowStepUid: "review1",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 4)}`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "pretrans1",
            workflowStepName: encodedWorkflowStepType[1].slice(0, 3),
            workflowStepType: encodedWorkflowStepType[1],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "trans1"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review1"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "trans4",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}4`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "trans1"
                }
            ]
        }
    ]
} as MockWorkflowsData;


export const DB = {
    workflowUid: "wf-db",
    workflowName: "D-B",
    workflowSteps: [
        {
            workflowStepUid: "db-d1",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans1"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans0"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans4"
                }
            ]
        },
        {
            workflowStepUid: "trans0",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}0`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review2"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans4",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}4`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review2"
                }
            ]
        },
        {
            workflowStepUid: "review2",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "edit1",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "review0",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 5,
            actions: []
        }
    ]
} as MockWorkflowsData;

export const DC = {
    workflowUid: "wf-dc",
    workflowName: "D-C",
    workflowSteps: [
        {
            workflowStepUid: "dc-d1",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans0"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans1"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans4"
                }
            ]
        },
        {
            workflowStepUid: "trans0",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}0`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review2"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans4",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}4`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review2"
                }
            ]
        },
        {
            workflowStepUid: "review2",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "edit1",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 4,
            actions: []
        }
    ]
} as MockWorkflowsData;

export const DD = {
    workflowUid: "wf-dd",
    workflowName: "D-D",
    workflowSteps: [
        {
            workflowStepUid: "dd-d1",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans0"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans1"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans3"
                }
            ]
        },
        {
            workflowStepUid: "trans0",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}0`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit0"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit3"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review3"
                }
            ]
        },
        {
            workflowStepUid: "review3",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "edit3"
                }
            ]
        },
        {
            workflowStepUid: "edit3",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}4`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "edit0"
                }
            ]
        },
        {
            workflowStepUid: "edit0",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 5,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "review0",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}0`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 6,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "review1",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 7,
            actions: []
        }
    ]
} as MockWorkflowsData;

export const DE = {
    workflowUid: "wf-de",
    workflowName: "D-E",
    workflowSteps: [
        {
            workflowStepUid: "de-d1",
            workflowStepName: encodedWorkflowStepType.fork,
            workflowStepType: encodedWorkflowStepType.fork,
            dynamicRules: [],
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans0"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans1"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans4"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans5"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans6"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans7"
                },
                {
                    primary: false,
                    actionType: actionTypes[6],
                    nextWorkflowStepUid: "trans8"
                }
            ]
        },
        {
            workflowStepUid: "trans0",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}0`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit0"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit2"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit0"
                }
            ]
        },
        {
            workflowStepUid: "trans4",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}4`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "trans5",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}5`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "pmr0"
                }
            ]
        },
        {
            workflowStepUid: "trans6",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}6`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit2"
                }
            ]
        },
        {
            workflowStepUid: "trans7",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}7`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "edit2"
                }
            ]
        },
        {
            workflowStepUid: "trans8",
            workflowStepName: `${encodedWorkflowStepType[2].slice(0, 1)}8`,
            workflowStepType: encodedWorkflowStepType[2],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[0],
                    nextWorkflowStepUid: "review1"
                }
            ]
        },
        {
            workflowStepUid: "edit2",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}0`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "edit0"
                }
            ]
        },
        {
            workflowStepUid: "edit1",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}1`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "edit0",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}2`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "pmr0"
                }
            ]
        },
        {
            workflowStepUid: "review1",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}3`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "pmr0",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}4`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 5,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[1],
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "review0",
            workflowStepName: `${encodedWorkflowStepType[3].slice(0, 1)}5`,
            workflowStepType: encodedWorkflowStepType[3],
            workflowStepOrder: 6,
            actions: [
                {
                    primary: true,
                    actionType: actionTypes[2],
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: encodedWorkflowStepType.finish.toLocaleLowerCase(),
            workflowStepType: encodedWorkflowStepType.finish,
            workflowStepOrder: 7,
            actions: []
        }
    ]
} as MockWorkflowsData;
