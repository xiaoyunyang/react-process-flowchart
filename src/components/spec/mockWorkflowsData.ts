/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import { WorkflowStepT } from "../../config";

export interface MockWorkflowsData {
    workflowUid: string;
    workflowName: string;
    workflowSteps: WorkflowStepT[];
}

export const AA = {
    workflowUid: "8e00dae32eb6",
    workflowName: "A-A",
    workflowSteps: [
        {
            workflowStepUid: "6473fda8a603",
            workflowStepName: "Editing",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: false,
                    actionType: "REJECT",
                    nextWorkflowStepUid: "64735f9f64c8"
                },
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "647384536514"
                }
            ]
        },
        {
            workflowStepUid: "6473f65c98fe",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 4,
            actions: []
        },
        {
            workflowStepUid: "647384536514",
            workflowStepName: "Review",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "6473f65c98fe"
                },
                {
                    primary: false,
                    actionType: "REJECT",
                    nextWorkflowStepUid: "6473fda8a603"
                }
            ]
        },
        {
            workflowStepUid: "64735f9f64c8",
            workflowStepName: "Translation",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "6473fda8a603"
                }
            ]
        }
    ]
} as MockWorkflowsData;


export const AB = {
    workflowUid: "8e00dae32eb7",
    workflowName: "A-B",
    workflowSteps: [
        {
            workflowStepUid: "6473fda8a603",
            workflowStepName: "Editing",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: false,
                    actionType: "REJECT",
                    nextWorkflowStepUid: "64735f9f64c8"
                },
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "647384536514"
                }
            ]
        },
        {
            workflowStepUid: "6473f65c98fe",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 4,
            actions: []
        },
        {
            workflowStepUid: "647384536514",
            workflowStepName: "Review",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "6473f65c98fe"
                },
                {
                    primary: false,
                    actionType: "REJECT",
                    nextWorkflowStepUid: "6473fda8a603"
                }
            ]
        },
        {
            workflowStepUid: "64735f9f64c8",
            workflowStepName: "Decision",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "6473fda8a603"
                }
            ]
        }
    ]
} as MockWorkflowsData;


export const AC = {
    workflowUid: "28fb8c360359",
    workflowName: "A-C",
    workflowSteps: [
        {
            workflowStepUid: "b5e96430cba5",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "863319b51a3f"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "cb12d6198c7c"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "e0405f577ddb"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "e0405f577ddc"
                }
            ]
        },
        {
            workflowStepUid: "41d3942a7566",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 3,
            actions: []
        },
        {
            workflowStepUid: "863319b51a3f",
            workflowStepName: "Translation",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        },
        {
            workflowStepUid: "cb12d6198c7c",
            workflowStepName: "T2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        },
        {
            workflowStepUid: "e0405f577ddb",
            workflowStepName: "T3",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        },
        {
            workflowStepUid: "e0405f577ddc",
            workflowStepName: "T4",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const AD = {
    workflowUid: "28fb8c360359",
    workflowName: "A-D",
    workflowSteps: [
        {
            workflowStepUid: "b5e96430cba5",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans1"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans4"
                }
            ]
        },
        {
            workflowStepUid: "c1f18b8739ab",
            workflowStepName: "R",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "edit1",
            workflowStepName: "E",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: "T1",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "c1f18b8739ab"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: "T2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "c1f18b8739ab"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: "T3",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans4",
            workflowStepName: "T4",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "published"
                }
            ]
        }
    ]
} as MockWorkflowsData;

// AE is for testing that primary branch is always kept at the top
export const AE = {
    workflowUid: "ae",
    workflowName: "A-E",
    workflowSteps: [
        {
            workflowStepUid: "ae-d1",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "pretrans1"
                },
            ]
        },
        {
            workflowStepUid: "review1",
            workflowStepName: "R",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "pretrans1",
            workflowStepName: "PT",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "trans1"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: "T1",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: "T2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: "T3",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
    ]
} as MockWorkflowsData;

export const BA = {
    workflowUid: "5890236e433b",
    workflowName: "B-A",
    workflowSteps: [
        {
            workflowStepUid: "ba322565b1bf",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "09e6110fda58"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "b2b5c4c7cfd7"
                }
            ]
        },
        {
            workflowStepUid: "297786162f15",
            workflowStepName: "E",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "492b709fc90a"
                }
            ]
        },
        {
            workflowStepUid: "a3135bdf3aa3",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "492b709fc90a",
            workflowStepName: "R",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "a3135bdf3aa3"
                }
            ]
        },
        {
            workflowStepUid: "09e6110fda58",
            workflowStepName: "Translation",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "297786162f15"
                }
            ]
        },
        {
            workflowStepUid: "b2b5c4c7cfd7",
            workflowStepName: "Translation2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "297786162f15"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BB = {
    workflowUid: "6a000972b9b4",
    workflowName: "B-B",
    workflowSteps: [
        {
            workflowStepUid: "cd9bc63c262d",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "7ee144915e8c"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "9c39ebe89888"
                }
            ]
        },
        {
            workflowStepUid: "c97272b8e6be",
            workflowStepName: "E",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "c1f18b8739ab"
                }
            ]
        },
        {
            workflowStepUid: "f13b94b131fb",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "c1f18b8739ab",
            workflowStepName: "R",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "f13b94b131fb"
                }
            ]
        },
        {
            workflowStepUid: "7ee144915e8c",
            workflowStepName: "Translation",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "c97272b8e6be"
                }
            ]
        },
        {
            workflowStepUid: "9c39ebe89888",
            workflowStepName: "Translation2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "c1f18b8739ab"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BC = {
    workflowUid: "ced08d24af21",
    workflowName: "B-C",
    workflowSteps: [
        {
            workflowStepUid: "0839ff2c552a",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "0fc524233120"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "a565cf48051d"
                }
            ]
        },
        {
            workflowStepUid: "9768e7a2faf6",
            workflowStepName: "E",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "3681192441e5"
                }
            ]
        },
        {
            workflowStepUid: "d965cb873e4c",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "3681192441e5",
            workflowStepName: "R",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "d965cb873e4c"
                }
            ]
        },
        {
            workflowStepUid: "0fc524233120",
            workflowStepName: "Translation",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "9768e7a2faf6"
                }
            ]
        },
        {
            workflowStepUid: "a565cf48051d",
            workflowStepName: "Translation2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "d965cb873e4c"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BD = {
    workflowUid: "34779d99f25d",
    workflowName: "B-D",
    workflowSteps: [
        {
            workflowStepUid: "694f1ab5da72",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "545d1240c3f5"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "099b821803b1"
                }
            ]
        },
        {
            workflowStepUid: "96e54d0aca1e",
            workflowStepName: "E",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "ce31ae78ef65"
                }
            ]
        },
        {
            workflowStepUid: "b36696d03ae1",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "ce31ae78ef65",
            workflowStepName: "R",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "b36696d03ae1"
                }
            ]
        },
        {
            workflowStepUid: "545d1240c3f5",
            workflowStepName: "Translation",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "ce31ae78ef65"
                }
            ]
        },
        {
            workflowStepUid: "099b821803b1",
            workflowStepName: "Translation2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "96e54d0aca1e"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BE = {
    workflowUid: "c26dfe7f5a1a",
    workflowName: "B-E",
    workflowSteps: [
        {
            workflowStepUid: "eba3f5263651",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "8dc5752dad3c"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "dd3e9bf3e0ea"
                }
            ]
        },
        {
            workflowStepUid: "66da7510548b",
            workflowStepName: "E",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "2fc061474e7d"
                }
            ]
        },
        {
            workflowStepUid: "c4f14340ebb6",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "2fc061474e7d",
            workflowStepName: "R",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "c4f14340ebb6"
                }
            ]
        },
        {
            workflowStepUid: "8dc5752dad3c",
            workflowStepName: "Translation",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "c4f14340ebb6"
                }
            ]
        },
        {
            workflowStepUid: "dd3e9bf3e0ea",
            workflowStepName: "Translation2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "66da7510548b"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const BF = {
    workflowUid: "28fb8c360358",
    workflowName: "B-F",
    workflowSteps: [
        {
            workflowStepUid: "b5e96430cba5",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "863319b51a3f"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "cb12d6198c7c"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "e0405f577ddb"
                }
            ]
        },
        {
            workflowStepUid: "42457e581a54",
            workflowStepName: "E",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "b1909eacb5ce"
                }
            ]
        },
        {
            workflowStepUid: "41d3942a7566",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "b1909eacb5ce",
            workflowStepName: "R",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        },
        {
            workflowStepUid: "863319b51a3f",
            workflowStepName: "Translation",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "41d3942a7566"
                }
            ]
        },
        {
            workflowStepUid: "cb12d6198c7c",
            workflowStepName: "Translation2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "42457e581a54"
                }
            ]
        },
        {
            workflowStepUid: "e0405f577ddb",
            workflowStepName: "Translation3",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "b1909eacb5ce"
                }
            ]
        }
    ]
} as MockWorkflowsData;

export const CD = {
    workflowUid: "670086456c82",
    workflowName: "C-D",
    workflowSteps: [
        {
            workflowStepUid: "7dbc1ae9cde2",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "f7aabbca784e"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "9dc9981a9955"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "1a83641d9fc0"
                }
            ]
        },
        {
            workflowStepUid: "12b6090d92b7",
            workflowStepName: "D2",
            workflowStepType: "DECISION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "b5df7d26284c"
                },
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "7a6054af88e8"
                }
            ]
        },
        {
            workflowStepUid: "b5df7d26284c",
            workflowStepName: "E",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "4b4484c2cfea"
                }
            ]
        },
        {
            workflowStepUid: "8a1cafced3b4",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 6,
            actions: []
        },
        {
            workflowStepUid: "4b4484c2cfea",
            workflowStepName: "R",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 5,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "8a1cafced3b4"
                }
            ]
        },
        {
            workflowStepUid: "7a6054af88e8",
            workflowStepName: "R2",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "8a1cafced3b4"
                }
            ]
        },
        {
            workflowStepUid: "f7aabbca784e",
            workflowStepName: "Translation",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "b5df7d26284c"
                }
            ]
        },
        {
            workflowStepUid: "9dc9981a9955",
            workflowStepName: "Translation2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "7a6054af88e8"
                }
            ]
        },
        {
            workflowStepUid: "1a83641d9fc0",
            workflowStepName: "Translation3",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "12b6090d92b7"
                }
            ]
        }
    ]
} as MockWorkflowsData;


// Group D mock data is for testing that we can sort the branches based on merge distance
export const DA = {
    workflowUid: "da",
    workflowName: "D-A",
    workflowSteps: [
        {
            workflowStepUid: "da-d1",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans4"
                },
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "pretrans1"
                },
            ]
        },
        {
            workflowStepUid: "review1",
            workflowStepName: "R",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 5,
            actions: []
        },
        {
            workflowStepUid: "pretrans1",
            workflowStepName: "PT",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "trans1"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: "T1",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: "T2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review1"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: "T3",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "trans4",
            workflowStepName: "T4",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "trans1"
                }
            ]
        },
    ]
} as MockWorkflowsData;


export const DB = {
    workflowUid: "db",
    workflowName: "D-B",
    workflowSteps: [
        {
            workflowStepUid: "db-d1",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans1"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans0"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans4"
                }
            ]
        },
        {
            workflowStepUid: "trans0",
            workflowStepName: "T0",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: "T1",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: "T2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review2"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: "T3",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans4",
            workflowStepName: "T4",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review2"
                }
            ]
        },
        {
            workflowStepUid: "review2",
            workflowStepName: "R2",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "edit1",
            workflowStepName: "E1",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "review0",
            workflowStepName: "R0",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 5,
            actions: []
        }
    ]
} as MockWorkflowsData;

export const DC = {
    workflowUid: "dc",
    workflowName: "D-C",
    workflowSteps: [
        {
            workflowStepUid: "dc-d1",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans0"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans1"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans4"
                }
            ]
        },
        {
            workflowStepUid: "trans0",
            workflowStepName: "T0",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: "T1",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: "T2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review2"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: "T3",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans4",
            workflowStepName: "T4",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review2"
                }
            ]
        },
        {
            workflowStepUid: "review2",
            workflowStepName: "R2",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "edit1",
            workflowStepName: "E1",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 4,
            actions: []
        }
    ]
} as MockWorkflowsData;

export const DD = {
    workflowUid: "dd",
    workflowName: "D-D",
    workflowSteps: [
        {
            workflowStepUid: "dd-d1",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans0"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans1"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans3"
                }
            ]
        },
        {
            workflowStepUid: "trans0",
            workflowStepName: "T0",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit0"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: "T1",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: "T2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit3"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: "T3",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review3"
                }
            ]
        },
        {
            workflowStepUid: "review3",
            workflowStepName: "R3",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "edit3"
                }
            ]
        },
        {
            workflowStepUid: "edit3",
            workflowStepName: "E3",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "edit0"
                }
            ]
        },
        {
            workflowStepUid: "edit0",
            workflowStepName: "E0",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 5,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "review0",
            workflowStepName: "R0",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 6,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "review1",
            workflowStepName: "R0",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 7,
            actions: []
        }
    ]
} as MockWorkflowsData;

export const DE = {
    workflowUid: "de",
    workflowName: "D-E",
    workflowSteps: [
        {
            workflowStepUid: "de-d1",
            workflowStepName: "D",
            workflowStepType: "DECISION",
            workflowStepOrder: 1,
            actions: [
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans0"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans1"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans2"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans3"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans4"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans5"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans6"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans7"
                },
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "trans8"
                }
            ]
        },
        {
            workflowStepUid: "trans0",
            workflowStepName: "T0",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit0"
                }
            ]
        },
        {
            workflowStepUid: "trans1",
            workflowStepName: "T1",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit1"
                }
            ]
        },
        {
            workflowStepUid: "trans2",
            workflowStepName: "T2",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit2"
                }
            ]
        },
        {
            workflowStepUid: "trans3",
            workflowStepName: "T3",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit0"
                }
            ]
        },
        {
            workflowStepUid: "trans4",
            workflowStepName: "T4",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "trans5",
            workflowStepName: "T5",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "pmr0"
                }
            ]
        },
        {
            workflowStepUid: "trans6",
            workflowStepName: "T6",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit2"
                }
            ]
        },
        {
            workflowStepUid: "trans7",
            workflowStepName: "T7",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "edit2"
                }
            ]
        },
        {
            workflowStepUid: "trans8",
            workflowStepName: "T8",
            workflowStepType: "TRANSLATION",
            workflowStepOrder: 2,
            actions: [
                {
                    primary: true,
                    actionType: "TRANSLATION_SUBMITTED",
                    nextWorkflowStepUid: "review1"
                }
            ]
        },
        {
            workflowStepUid: "edit2",
            workflowStepName: "E3",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "edit0"
                }
            ]
        },
        {
            workflowStepUid: "edit1",
            workflowStepName: "E1",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 3,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "edit0",
            workflowStepName: "E0",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "pmr0"
                }
            ]
        },
        {
            workflowStepUid: "review1",
            workflowStepName: "R1",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 4,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "pmr0",
            workflowStepName: "PMR0",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 5,
            actions: [
                {
                    primary: true,
                    actionType: "EDIT",
                    nextWorkflowStepUid: "review0"
                }
            ]
        },
        {
            workflowStepUid: "review0",
            workflowStepName: "R0",
            workflowStepType: "POST_TRANSLATION",
            workflowStepOrder: 6,
            actions: [
                {
                    primary: true,
                    actionType: "REVIEW",
                    nextWorkflowStepUid: "published"
                }
            ]
        },
        {
            workflowStepUid: "published",
            workflowStepName: "Published",
            workflowStepType: "PUBLISH",
            workflowStepOrder: 7,
            actions: []
        }
    ]
} as MockWorkflowsData;
