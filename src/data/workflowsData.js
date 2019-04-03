export default { // <== mapping from workflowUid to workflowSteps
    "5890236e433b": [ // <== B-A
        {
            "workflowStepUid": "ba322565b1bf",
            "workflowStepName": "D",
            "workflowStepType": "DECISION",
            "workflowStepOrder": 1, // <== *
            "actions": [
                {
                    "primary": true,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "09e6110fda58"
                },
                {
                    "primary": false,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "b2b5c4c7cfd7"
                }
            ]
        },
        {
            "workflowStepUid": "297786162f15",
            "workflowStepName": "E",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 3, // <== *
            "actions": [
                {
                    "primary": true,
                    "actionType": "EDIT",
                    "nextWorkflowStepUid": "492b709fc90a"
                }
            ]
        },
        {
            "workflowStepUid": "a3135bdf3aa3",
            "workflowStepName": "Published",
            "workflowStepType": "PUBLISH",
            "workflowStepOrder": 5, // <== *
            "actions": []
        },
        {
            "workflowStepUid": "492b709fc90a",
            "workflowStepName": "R",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 4, // <== *
            "actions": [
                {
                    "primary": true,
                    "actionType": "REVIEW",
                    "nextWorkflowStepUid": "a3135bdf3aa3"
                }
            ]
        },
        {
            "workflowStepUid": "09e6110fda58",
            "workflowStepName": "Translation",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2, // <== *
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "297786162f15"
                }
            ]
        },
        {
            "workflowStepUid": "b2b5c4c7cfd7",
            "workflowStepName": "Translation2",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "297786162f15"
                }
            ]
        }
    ],
    "6a000972b9b4": [ // <== B-B
        {
            "workflowStepUid": "cd9bc63c262d",
            "workflowStepName": "D",
            "workflowStepType": "DECISION",
            "workflowStepOrder": 1,
            "actions": [
                {
                    "primary": true,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "7ee144915e8c"
                },
                {
                    "primary": false,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "9c39ebe89888"
                }
            ]
        },
        {
            "workflowStepUid": "c97272b8e6be",
            "workflowStepName": "E",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 3,
            "actions": [
                {
                    "primary": true,
                    "actionType": "EDIT",
                    "nextWorkflowStepUid": "c1f18b8739ab"
                }
            ]
        },
        {
            "workflowStepUid": "f13b94b131fb",
            "workflowStepName": "Published",
            "workflowStepType": "PUBLISH",
            "workflowStepOrder": 5,
            "actions": []
        },
        {
            "workflowStepUid": "c1f18b8739ab",
            "workflowStepName": "R",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 4,
            "actions": [
                {
                    "primary": true,
                    "actionType": "REVIEW",
                    "nextWorkflowStepUid": "f13b94b131fb"
                }
            ]
        },
        {
            "workflowStepUid": "7ee144915e8c",
            "workflowStepName": "Translation",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "c97272b8e6be"
                }
            ]
        },
        {
            "workflowStepUid": "9c39ebe89888",
            "workflowStepName": "Translation2",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "c1f18b8739ab"
                }
            ]
        }
    ],
    "ced08d24af21": [ // <== B-C
        {
            "workflowStepUid": "0839ff2c552a",
            "workflowStepName": "D",
            "workflowStepType": "DECISION",
            "workflowStepOrder": 1,
            "actions": [
                {
                    "primary": true,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "0fc524233120"
                },
                {
                    "primary": false,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "a565cf48051d"
                }
            ]
        },
        {
            "workflowStepUid": "9768e7a2faf6",
            "workflowStepName": "E",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 3,
            "actions": [
                {
                    "primary": true,
                    "actionType": "EDIT",
                    "nextWorkflowStepUid": "3681192441e5"
                }
            ]
        },
        {
            "workflowStepUid": "d965cb873e4c",
            "workflowStepName": "Published",
            "workflowStepType": "PUBLISH",
            "workflowStepOrder": 5,
            "actions": []
        },
        {
            "workflowStepUid": "3681192441e5",
            "workflowStepName": "R",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 4,
            "actions": [
                {
                    "primary": true,
                    "actionType": "REVIEW",
                    "nextWorkflowStepUid": "d965cb873e4c"
                }
            ]
        },
        {
            "workflowStepUid": "0fc524233120",
            "workflowStepName": "Translation",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "9768e7a2faf6"
                }
            ]
        },
        {
            "workflowStepUid": "a565cf48051d",
            "workflowStepName": "Translation2",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "d965cb873e4c"
                }
            ]
        }
    ],
    "34779d99f25d": [ // <== B-D
        {
            "workflowStepUid": "694f1ab5da72",
            "workflowStepName": "D",
            "workflowStepType": "DECISION",
            "workflowStepOrder": 1,
            "actions": [
                {
                    "primary": true,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "545d1240c3f5"
                },
                {
                    "primary": false,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "099b821803b1"
                }
            ]
        },
        {
            "workflowStepUid": "96e54d0aca1e",
            "workflowStepName": "E",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 3,
            "actions": [
                {
                    "primary": true,
                    "actionType": "EDIT",
                    "nextWorkflowStepUid": "ce31ae78ef65"
                }
            ]
        },
        {
            "workflowStepUid": "b36696d03ae1",
            "workflowStepName": "Published",
            "workflowStepType": "PUBLISH",
            "workflowStepOrder": 5,
            "actions": []
        },
        {
            "workflowStepUid": "ce31ae78ef65",
            "workflowStepName": "R",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 4,
            "actions": [
                {
                    "primary": true,
                    "actionType": "REVIEW",
                    "nextWorkflowStepUid": "b36696d03ae1"
                }
            ]
        },
        {
            "workflowStepUid": "545d1240c3f5",
            "workflowStepName": "Translation",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "ce31ae78ef65"
                }
            ]
        },
        {
            "workflowStepUid": "099b821803b1",
            "workflowStepName": "Translation2",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "96e54d0aca1e"
                }
            ]
        }
    ],
    "c26dfe7f5a1a": [ // <== B-E
        {
            "workflowStepUid": "eba3f5263651",
            "workflowStepName": "D",
            "workflowStepType": "DECISION",
            "workflowStepOrder": 1,
            "actions": [
                {
                    "primary": true,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "8dc5752dad3c"
                },
                {
                    "primary": false,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "dd3e9bf3e0ea"
                }
            ]
        },
        {
            "workflowStepUid": "66da7510548b",
            "workflowStepName": "E",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 3,
            "actions": [
                {
                    "primary": true,
                    "actionType": "EDIT",
                    "nextWorkflowStepUid": "2fc061474e7d"
                }
            ]
        },
        {
            "workflowStepUid": "c4f14340ebb6",
            "workflowStepName": "Published",
            "workflowStepType": "PUBLISH",
            "workflowStepOrder": 5,
            "actions": []
        },
        {
            "workflowStepUid": "2fc061474e7d",
            "workflowStepName": "R",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 4,
            "actions": [
                {
                    "primary": true,
                    "actionType": "REVIEW",
                    "nextWorkflowStepUid": "c4f14340ebb6"
                }
            ]
        },
        {
            "workflowStepUid": "8dc5752dad3c",
            "workflowStepName": "Translation",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "c4f14340ebb6"
                }
            ]
        },
        {
            "workflowStepUid": "dd3e9bf3e0ea",
            "workflowStepName": "Translation2",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "66da7510548b"
                }
            ]
        }
    ],
    "28fb8c360358": [ // <== B-F
        {
            "workflowStepUid": "b5e96430cba5",
            "workflowStepName": "D",
            "workflowStepType": "DECISION",
            "workflowStepOrder": 1,
            "actions": [
                {
                    "primary": true,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "863319b51a3f"
                },
                {
                    "primary": false,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "cb12d6198c7c"
                },
                {
                    "primary": false,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "e0405f577ddb"
                }
            ]
        },
        {
            "workflowStepUid": "42457e581a54",
            "workflowStepName": "E",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 3,
            "actions": [
                {
                    "primary": true,
                    "actionType": "EDIT",
                    "nextWorkflowStepUid": "b1909eacb5ce"
                }
            ]
        },
        {
            "workflowStepUid": "41d3942a7566",
            "workflowStepName": "Published",
            "workflowStepType": "PUBLISH",
            "workflowStepOrder": 5,
            "actions": []
        },
        {
            "workflowStepUid": "b1909eacb5ce",
            "workflowStepName": "R",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 4,
            "actions": [
                {
                    "primary": true,
                    "actionType": "REVIEW",
                    "nextWorkflowStepUid": "41d3942a7566"
                }
            ]
        },
        {
            "workflowStepUid": "863319b51a3f",
            "workflowStepName": "Translation",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "41d3942a7566"
                }
            ]
        },
        {
            "workflowStepUid": "cb12d6198c7c",
            "workflowStepName": "Translation2",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "42457e581a54"
                }
            ]
        },
        {
            "workflowStepUid": "e0405f577ddb",
            "workflowStepName": "Translation3",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "b1909eacb5ce"
                }
            ]
        }
    ],
    "670086456c82": [ // <== C-D
        {
            "workflowStepUid": "7dbc1ae9cde2",
            "workflowStepName": "D",
            "workflowStepType": "DECISION",
            "workflowStepOrder": 1,
            "actions": [
                {
                    "primary": true,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "f7aabbca784e",
                },
                {
                    "primary": false,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "9dc9981a9955",
                },
                {
                    "primary": false,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "1a83641d9fc0",
                }
            ]
        },
        {
            "workflowStepUid": "12b6090d92b7",
            "workflowStepName": "D2",
            "workflowStepType": "DECISION",
            "workflowStepOrder": 3,
            "actions": [
                {
                    "primary": false,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "b5df7d26284c"
                },
                {
                    "primary": true,
                    "actionType": "DECISION",
                    "nextWorkflowStepUid": "7a6054af88e8"
                }
            ]
        },
        {
            "workflowStepUid": "b5df7d26284c",
            "workflowStepName": "E",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 4,
            "actions": [
                {
                    "primary": true,
                    "actionType": "EDIT",
                    "nextWorkflowStepUid": "4b4484c2cfea"
                }
            ]
        },
        {
            "workflowStepUid": "8a1cafced3b4",
            "workflowStepName": "Published",
            "workflowStepType": "PUBLISH",
            "workflowStepOrder": 6,
            "actions": []
        },
        {
            "workflowStepUid": "4b4484c2cfea",
            "workflowStepName": "R",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 5,
            "actions": [
                {
                    "primary": true,
                    "actionType": "REVIEW",
                    "nextWorkflowStepUid": "8a1cafced3b4"
                }
            ]
        },
        {
            "workflowStepUid": "7a6054af88e8",
            "workflowStepName": "R2",
            "workflowStepType": "POST_TRANSLATION",
            "workflowStepOrder": 4,
            "actions": [
                {
                    "primary": true,
                    "actionType": "REVIEW",
                    "nextWorkflowStepUid": "8a1cafced3b4"
                }
            ]
        },
        {
            "workflowStepUid": "f7aabbca784e",
            "workflowStepName": "Translation",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "b5df7d26284c"
                }
            ]
        },
        {
            "workflowStepUid": "9dc9981a9955",
            "workflowStepName": "Translation2",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "7a6054af88e8"
                }
            ]
        },
        {
            "workflowStepUid": "1a83641d9fc0",
            "workflowStepName": "Translation3",
            "workflowStepType": "TRANSLATION",
            "workflowStepOrder": 2,
            "actions": [
                {
                    "primary": true,
                    "actionType": "TRANSLATION_SUBMITTED",
                    "nextWorkflowStepUid": "12b6090d92b7"
                }
            ]
        }
    ]
}