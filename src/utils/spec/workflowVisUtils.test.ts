import {
    isConnector,
    encodeMatrixCoord,
    decodeMatrixCoord,
    encodeMatrixEntry,
    decodeMatrixEntry,
    isPlaceholder,
    initCol,
    initMatrix,
    createWorkflowVisData,
    createCoordPairs,
    createLineHorizes,
    createConnectorsBetweenNodes,
    invertKeyVal,
    downRightDashesToPlace,
    populateMatrix,
    addConnectorToMatrix
} from "../workflowVisUtils";

// Types
import { ColType, ConnectorName, Matrix, ConnectorTypeT } from "../../types/workflowVisTypes";
import { WorkflowStepTypeT } from "../../types/workflow";

// Mocks
import { AA, BA } from "../../components/spec/mockWorkflowsData";

describe("WorkflowVisUtils", () => {

    describe("#isConnector", () => {
        test.each(
            Object.values(ConnectorTypeT)
        )("returns true for type = %s", (type) => {
            expect(isConnector(type)).toBe(true);
        });
        test.each(
            Object.values(WorkflowStepTypeT)
        )("returns false for type = %s", (type) => {
            expect(isConnector(type)).toBe(false);
        });
    });

    describe("#isPlaceholder", () => {
        it("should return true for placeholders", () => {
            expect(isPlaceholder("standard|empty")).toBe(true);
            expect(isPlaceholder("box|empty")).toBe(true);
            expect(isPlaceholder("diamond|empty")).toBe(true);
        });
        it("should return false for not placeholders", () => {
            expect(isPlaceholder("foo|empty")).toBe(false);
            expect(isPlaceholder("box|1234")).toBe(false);
            expect(isPlaceholder("empty")).toBe(false);
        });
    });

    describe("#initCol", () => {
        it("should initialize an array with placeholders with the right colType and own matrix coordinate", () => {
            const col = initCol({ numRows: 3, colNum: 0, colType: ColType.BOX });
            expect(col).toEqual(["box|empty|0,0", "box|empty|0,1", "box|empty|0,2"]);
        });
    });

    describe("#initMatrix", () => {
        it("should initialize a matrix of the right size with the right placeholdeers", () => {
            const matrix = initMatrix({
                numRows: 2,
                colTypes: [ColType.BOX, ColType.DIAMOND, ColType.STANDARD]
            });
            expect(matrix).toEqual([
                ["box|empty|0,0", "box|empty|0,1"],
                ["diamond|empty|1,0", "diamond|empty|1,1"],
                ["standard|empty|2,0", "standard|empty|2,1"]
            ]);
        });
    });

    // TODO: #addWorkflowStepToMatrix - later

    describe("#encodeMatrixCoord", () => {
        it("should encode row and column number into a string", () => {
            const encoded = encodeMatrixCoord({ colNum: 1, rowNum: 2 });
            expect(encoded).toEqual("1,2");
        });
    });

    describe("#decodeMatrixCoord", () => {
        it("should decode a rowcolumn number into a string", () => {
            const encoded = decodeMatrixCoord("1,2");
            expect(encoded).toEqual({ colNum: 1, rowNum: 2 });
        });
    });

    describe("#encodeMatrixEntry", () => {
        it("should encode matrix entry information into a string when encodedParentCoord is undefined", () => {
            const matrixEntry = encodeMatrixEntry({
                colType: ColType.STANDARD,
                entryName: ConnectorName.EMPTY,
                encodedOwnCoord: "2,3"
            });
            expect(matrixEntry).toBe("standard|empty|2,3");
        });
        it("should encode matrix entry information into a string when encodedParentCoord is defined", () => {
            const matrixEntry = encodeMatrixEntry({
                colType: ColType.STANDARD,
                entryName: ConnectorName.EMPTY,
                encodedOwnCoord: "2,3",
                encodedParentCoord: "1,3"
            });
            expect(matrixEntry).toBe("standard|empty|2,3|1,3");
        });
    });

    describe("#decodeMatrixEntry", () => {
        it("should decode workflowStepUid from a matrixEntry representing a workflowStep", () => {
            const matrixEntry = "1234";
            const decodedMatrixEntry = decodeMatrixEntry(matrixEntry);
            expect(decodedMatrixEntry).toEqual({
                tileType: "1234",
                tileId: "1234",
                tileName: undefined,
                encodedOwnCoord: undefined,
                encodedParentNodeCoord: undefined
            });
        });
        it("should decode connector from a matrixEntry representing a connector with no parent", () => {
            const matrixEntry = "standard|lineHoriz|1,1";
            const decodedMatrixEntry = decodeMatrixEntry(matrixEntry);
            expect(decodedMatrixEntry).toEqual({
                tileType: "standard",
                tileId: "standard|lineHoriz",
                tileName: "lineHoriz",
                encodedOwnCoord: "1,1",
                encodedParentNodeCoord: undefined
            });
        });
        it("should decode connector from a matrixEntry representing a connector with a parent node", () => {
            const matrixEntry = "standard|lineHoriz|1,1|2,2";
            const decodedMatrixEntry = decodeMatrixEntry(matrixEntry);
            expect(decodedMatrixEntry).toEqual({
                tileType: "standard",
                tileId: "standard|lineHoriz",
                tileName: "lineHoriz",
                encodedOwnCoord: "1,1",
                encodedParentNodeCoord: "2,2"
            });
        });
    });

    describe("#createCoordPairs", () => {
        it("should create an array of pairs of coordinates between parent and child nodes using two hash tables", () => {
            const nodeIdToCoord = {
                "5890236e433b-auth": "0,0",
                "ba322565b1bf": "2,0",
                "09e6110fda58": "4,0",
                "b2b5c4c7cfd7": "4,1",
                "297786162f15": "6,0",
                "492b709fc90a": "8,0",
                "a3135bdf3aa3": "10,0",
            };
            const nodeToParentCoords = {
                "ba322565b1bf": ["0,0"],
                "09e6110fda58": ["2,0"],
                "b2b5c4c7cfd7": ["2,0"],
                "297786162f15": ["4,0", "4,1"],
                "492b709fc90a": ["6,0"],
                "a3135bdf3aa3": ["8,0"]
            };

            const res = createCoordPairs({ nodeIdToCoord, nodeToParentCoords });
            const expected = [
                { parentCoord: { colNum: 0, rowNum: 0 }, childCoord: { colNum: 2, rowNum: 0 } },
                { parentCoord: { colNum: 2, rowNum: 0 }, childCoord: { colNum: 4, rowNum: 0 } },
                { parentCoord: { colNum: 2, rowNum: 0 }, childCoord: { colNum: 4, rowNum: 1 } },
                { parentCoord: { colNum: 4, rowNum: 0 }, childCoord: { colNum: 6, rowNum: 0 } },
                { parentCoord: { colNum: 4, rowNum: 1 }, childCoord: { colNum: 6, rowNum: 0 } },
                { parentCoord: { colNum: 6, rowNum: 0 }, childCoord: { colNum: 8, rowNum: 0 } },
                { parentCoord: { colNum: 8, rowNum: 0 }, childCoord: { colNum: 10, rowNum: 0 } }
            ];
            expect(res).toEqual(expected);
        });
    });

    describe("#createLineHorizes", () => {
        it("creates correct lineHorizes to place and the last line's matrixCoord", () => {
            const { lines, lastLineCoord } = createLineHorizes({
                startCol: 1,
                endCol: 4,
                rowNum: 1,
                parentCoord: "0,0"
            });
            expect(lines).toEqual([
                { ownCoord: "1,1", parentCoord: "0,0", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "2,1", parentCoord: "1,1", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "3,1", parentCoord: "2,1", connectorName: ConnectorName.LINE_HORIZ },
            ]);
            expect(lastLineCoord).toBe("3,1");
        });
    });

    describe("#createConnectorsBetweenNodes", () => {
        it("creates correct connectors for when parent node is in the same row as child node", () => {
            const parentCoord = { colNum: 0, rowNum: 0 };
            const childCoord = { colNum: 3, rowNum: 0 };
            const res = createConnectorsBetweenNodes({ parentCoord, childCoord });
            const expected = [
                { ownCoord: "1,0", parentCoord: "0,0", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "2,0", parentCoord: "1,0", connectorName: ConnectorName.ARROW_RIGHT }
            ];
            expect(res).toEqual(expected);
        });
        it("creates correct connectors for when parent node is above child node", () => {
            const parentCoord = { colNum: 2, rowNum: 0 };
            const childCoord = { colNum: 6, rowNum: 2 };
            const res = createConnectorsBetweenNodes({ parentCoord, childCoord });
            const expected = [
                { ownCoord: "2,2", parentCoord: "1,2", connectorName: ConnectorName.DOWN_RIGHT },
                { ownCoord: "3,2", parentCoord: "2,0", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "4,2", parentCoord: "3,2", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "5,2", parentCoord: "4,2", connectorName: ConnectorName.ARROW_RIGHT }
            ];
            expect(res).toEqual(expected);
        });
        it("creates correct connectors for when parent node is below child node", () => {
            const parentCoord = { colNum: 2, rowNum: 4 };
            const childCoord = { colNum: 5, rowNum: 0 };
            const res = createConnectorsBetweenNodes({ parentCoord, childCoord });
            const expected = [
                { ownCoord: "3,4", parentCoord: "2,4", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "4,4", parentCoord: "3,4", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "5,4", parentCoord: "4,4", connectorName: ConnectorName.RIGHT_UP_ARROW }
            ];
            expect(res).toEqual(expected);
        });
    });

    describe("#createWorkflowVisData", () => {
        it("should create worlflowVisData and initial matrix", () => {
            const { workflowSteps, workflowUid } = BA;
            const { initialMatrix } = createWorkflowVisData({
                workflowSteps, workflowUid
            });
            expect(initialMatrix).toEqual(
                [
                    ["box|empty|0,0", "box|empty|0,1", "box|empty|0,2"],
                    ["standard|empty|1,0", "standard|empty|1,1", "standard|empty|1,2"],
                    ["diamond|empty|2,0", "diamond|empty|2,1", "diamond|empty|2,2"],
                    ["standard|empty|3,0", "standard|empty|3,1", "standard|empty|3,2"],
                    ["box|empty|4,0", "box|empty|4,1", "box|empty|4,2"],
                    ["standard|empty|5,0", "standard|empty|5,1", "standard|empty|5,2"],
                    ["box|empty|6,0", "box|empty|6,1", "box|empty|6,2"],
                    ["standard|empty|7,0", "standard|empty|7,1", "standard|empty|7,2"],
                    ["box|empty|8,0", "box|empty|8,1", "box|empty|8,2"],
                    ["standard|empty|9,0", "standard|empty|9,1", "standard|empty|9,2"],
                    ["box|empty|10,0", "box|empty|10,1", "box|empty|10,2"]
                ]
            );
        });
    });

    test("#invertKeyVal", () => {
        const dict = {
            "a": "1", "b": "2", "c": "3"
        };
        expect(invertKeyVal(dict)).toEqual({
            "1": "a", "2": "b", "3": "c"
        });
    });

    test("#downRightDashesToPlace", () => {
        const decisionStepCols = [2, 4];
        const matrix = [
            ["5890236e433b-auth", "box|empty|0,1", "box|empty|0,2"],
            ["standard|arrowRight|1,0|0,0", "standard|empty|1,1", "standard|empty|1,2"],
            ["ba322565b1bf", "diamond|downRight|2,1", "diamond|empty|2,2"],
            ["standard|arrowRight|3,0|2,0", "standard|arrowRight|3,1|2,0", "standard|empty|3,2"],
            ["09e6110fda58", "diamond|empty|4,1", "diamond|empty|4,2"],
        ];
        const expected = [
            { replaceBy: "diamond|downRightDash|2,2|2,0", coord: { colNum: 2, rowNum: 2 } },
            { replaceBy: "diamond|downRightDash|4,1|4,0", coord: { colNum: 4, rowNum: 1 } }
        ];
        expect(downRightDashesToPlace({ matrix, decisionStepCols })).toEqual(expected);
    });

    describe("#populateMatrix", () => {
        it("should handle linear workflow case", () => {
            const { workflowSteps, workflowUid } = AA;
            const {
                workflowVisData, initialMatrix
            } = createWorkflowVisData({ workflowSteps, workflowUid });
            const decisionStepCols: number[] = [];
            const res = populateMatrix({ workflowVisData, initialMatrix, decisionStepCols });

            const expectedMatrix = [
                ["8e00dae32eb6-auth"],
                ["standard|arrowRight|1,0|0,0"],
                ["64735f9f64c8"],
                ["standard|arrowRight|3,0|2,0"],
                ["6473fda8a603"],
                ["standard|arrowRight|5,0|4,0"],
                ["647384536514"],
                ["standard|arrowRight|7,0|6,0"],
                ["6473f65c98fe"]
            ];
            const expectedNodeIdToCoord = {
                "8e00dae32eb6-auth": "0,0",
                "64735f9f64c8": "2,0",
                "6473fda8a603": "4,0",
                "647384536514": "6,0",
                "6473f65c98fe": "8,0"
            };
            const expected = {
                matrix: expectedMatrix,
                nodeIdToCoord: expectedNodeIdToCoord
            };
            expect(res).toEqual(expected);
        });
        it("should handle simple branching workflow", () => {
            const { workflowSteps, workflowUid } = BA;
            const {
                workflowVisData, initialMatrix
            } = createWorkflowVisData({ workflowSteps, workflowUid });
            const decisionStepCols: number[] = [2];
            const res = populateMatrix({ workflowVisData, initialMatrix, decisionStepCols });

            const expectedMatrix = [
                ["5890236e433b-auth", "box|empty|0,1", "box|empty|0,2"],
                ["standard|arrowRight|1,0|0,0", "standard|empty|1,1", "standard|empty|1,2"],
                ["ba322565b1bf", "diamond|downRight|2,1", "diamond|downRightDash|2,2|2,0"],
                ["standard|arrowRight|3,0|2,0", "standard|arrowRight|3,1|2,0", "standard|empty|3,2"],
                ["09e6110fda58", "b2b5c4c7cfd7", "box|empty|4,2"],
                ["standard|arrowRight|5,0|4,0", "standard|lineHoriz|5,1|4,1", "standard|empty|5,2"],
                ["297786162f15", "box|rightUpArrow|6,1", "box|empty|6,2"],
                ["standard|arrowRight|7,0|6,0", "standard|empty|7,1", "standard|empty|7,2"],
                ["492b709fc90a", "box|empty|8,1", "box|empty|8,2"],
                ["standard|arrowRight|9,0|8,0", "standard|empty|9,1", "standard|empty|9,2"],
                ["a3135bdf3aa3", "box|empty|10,1", "box|empty|10,2"]
            ];
            const expectedNodeIdToCoord = {
                "5890236e433b-auth": "0,0",
                "ba322565b1bf": "2,0",
                "09e6110fda58": "4,0",
                "b2b5c4c7cfd7": "4,1",
                "297786162f15": "6,0",
                "492b709fc90a": "8,0",
                "a3135bdf3aa3": "10,0"
            };
            const expected = {
                matrix: expectedMatrix,
                nodeIdToCoord: expectedNodeIdToCoord
            };
            expect(res).toEqual(expected);
        });
    });

    describe("#addConnectorToMatrix", () => {
        let matrix: Matrix;
        const nodeCoords = ["0,0", "4,0"];
        beforeEach(() => {
            matrix = [
                ["1234"],
                ["standard|empty|1,0"],
                ["box|empty|2,0"],
                ["standard|empty|3,0"],
                ["5678"]
            ];
        });
        it("should replace the tile of the matrix with connector whose parent is a workflowStep", () => {
            const connectorToPlace = {
                ownCoord: "1,0",
                parentCoord: "0,0",
                connectorName: ConnectorName.LINE_HORIZ
            };

            const { replaceBy } = addConnectorToMatrix({ matrix, connectorToPlace, nodeCoords });
            const expectedReplaceBy = "standard|lineHoriz|1,0|0,0";
            expect(matrix).toEqual([
                ["1234"],
                [expectedReplaceBy],
                ["box|empty|2,0"],
                ["standard|empty|3,0"],
                ["5678"]
            ]);
            expect(replaceBy).toBe(expectedReplaceBy);
        });
        it("should replace the tile of the matrix with connector whose parent is another connector", () => {
            const connectorToPlace = {
                ownCoord: "3,0",
                parentCoord: "2,0",
                connectorName: ConnectorName.ARROW_RIGHT
            };
            const { replaceBy } = addConnectorToMatrix({ matrix, connectorToPlace, nodeCoords });
            const expectedReplaceBy = "standard|arrowRight|3,0";
            expect(matrix).toEqual([
                ["1234"],
                ["standard|empty|1,0"],
                ["box|empty|2,0"],
                [expectedReplaceBy],
                ["5678"]
            ]);
            expect(replaceBy).toBe(expectedReplaceBy);
        });
    });
});