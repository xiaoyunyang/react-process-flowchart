import {
    isConnector,
    encodeMatrixCoord,
    decodeMatrixCoord,
    encodeMatrixEntry,
    decodeMatrixEntry,
    isPlaceholder,
    firstUnoccupiedInCol,
    lastNodeInCol,
    lastOccupiedInCol,
    initCol,
    initMatrix,
    createWorkflowVisData,
    createCoordPairs,
    createLineHorizes,
    createHorizConnectorsBetweenNodes,
    getRightUpCoords,
    addVertConnectorsToMatrix,
    invertKeyVal,
    addNodeToMatrix,
    downRightDashesToPlace,
    getPath,
    findNodeWithClosestCommonDescendant,
    closestCommonDescendantSort,
    getSortedNextNodeIds,
    populateMatrix,
    addConnectorToMatrix,
    findNextNode
} from "../workflowVisUtils";

// Types
import { ColType, ConnectorName, Matrix, ConnectorTypeT, WorkflowStepNodes } from "../../types/workflowVisTypes";
import { WorkflowStepTypeT } from "../../types/workflow";

// Mocks
import { AA, BA, DA, DB, DC, DD } from "../../components/spec/mockWorkflowsData";
import { matrixDA, matrixDB, matrixDC, matrixDD } from "../../components/spec/mockMatrices";

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

    describe("#firstUnoccupiedInCol", () => {
        it("should return the rowNum of the first placeholder empty tile", () => {
            const col = ["1234", "box|empty|0,1", "box|empty|0,2"];
            expect(firstUnoccupiedInCol(col)).toBe(1);
        });
        it("should return -1 if the column has no empty slots", () => {
            const col = ["1234", "1234", "1234"];
            expect(firstUnoccupiedInCol(col)).toBe(-1);
        });
    });

    describe("#lastNodeInCol", () => {
        it("should return the rowNum of the last Node in col", () => {
            const col = ["1234", "5678", "box|empty|0,2"];
            expect(lastNodeInCol(col)).toBe(1);
        });
        it("should return -1 if the column has no nodes", () => {
            const col = ["box|empty|0,0", "box|lineHoriz|0,1", "box|empty|0,2"];
            expect(lastNodeInCol(col)).toBe(-1);
        });
    });

    describe("#lastOccupiedInCol", () => {
        it("should return the rowNum of the last occupied (non-empty) tile in col that's a connector", () => {
            const col = ["1234", "box|lineHoriz|0,1", "box|empty|0,2"];
            expect(lastOccupiedInCol(col)).toBe(1);
        });
        it("should return the rowNum of the last occupied (non-empty) tile in col that's a node", () => {
            const col = ["box|lineHoriz|0,0", "1234", "box|empty|0,2"];
            expect(lastOccupiedInCol(col)).toBe(1);
        });
        it("should return -1 if the column is all empty", () => {
            const col = ["box|empty|0,0", "box|empty|0,1", "box|empty|0,2"];
            expect(lastOccupiedInCol(col)).toBe(-1);
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
                ba322565b1bf: "2,0",
                "09e6110fda58": "4,0",
                b2b5c4c7cfd7: "4,1",
                "297786162f15": "6,0",
                "492b709fc90a": "8,0",
                a3135bdf3aa3: "10,0",
            };
            const nodeIdToParentCoords = {
                ba322565b1bf: ["0,0"],
                "09e6110fda58": ["2,0"],
                b2b5c4c7cfd7: ["2,0"],
                "297786162f15": ["4,0", "4,1"],
                "492b709fc90a": ["6,0"],
                a3135bdf3aa3: ["8,0"]
            };

            const res = createCoordPairs({ nodeIdToCoord, nodeIdToParentCoords });
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

    describe("#createHorizConnectorsBetweenNodes", () => {
        it("creates correct connectors for when parent node is in the same row as child node", () => {
            const parentCoord = { colNum: 0, rowNum: 0 };
            const childCoord = { colNum: 3, rowNum: 0 };
            const res = createHorizConnectorsBetweenNodes({ parentCoord, childCoord });
            const expected = [
                { ownCoord: "1,0", parentCoord: "0,0", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "2,0", parentCoord: "1,0", connectorName: ConnectorName.ARROW_RIGHT }
            ];
            expect(res).toEqual(expected);
        });
        it("creates correct connectors for when parent node is above child node", () => {
            const parentCoord = { colNum: 2, rowNum: 0 };
            const childCoord = { colNum: 6, rowNum: 2 };
            const res = createHorizConnectorsBetweenNodes({ parentCoord, childCoord });
            const expected = [
                { ownCoord: "2,2", parentCoord: "1,2", connectorName: ConnectorName.DOWN_RIGHT },
                { ownCoord: "3,2", parentCoord: "2,0", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "4,2", parentCoord: "3,2", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "5,2", parentCoord: "4,2", connectorName: ConnectorName.ARROW_RIGHT }
            ];
            expect(res).toEqual(expected);
        });
        it("creates correct connectors for when parent node is one row below child node", () => {
            const parentCoord = { colNum: 2, rowNum: 4 };
            const childCoord = { colNum: 5, rowNum: 3 };
            const res = createHorizConnectorsBetweenNodes({ parentCoord, childCoord });
            const expected = [
                { ownCoord: "3,4", parentCoord: "2,4", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "4,4", parentCoord: "3,4", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "5,4", parentCoord: "4,4", connectorName: ConnectorName.RIGHT_UP_ARROW }
            ];
            expect(res).toEqual(expected);
        });
        it("creates correct connectors for when parent node is two or more rows below child node", () => {
            const parentCoord = { colNum: 2, rowNum: 4 };
            const childCoord = { colNum: 5, rowNum: 0 };
            const res = createHorizConnectorsBetweenNodes({ parentCoord, childCoord });
            const expected = [
                { ownCoord: "3,4", parentCoord: "2,4", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "4,4", parentCoord: "3,4", connectorName: ConnectorName.LINE_HORIZ },
                { ownCoord: "5,4", parentCoord: "4,4", connectorName: ConnectorName.RIGHT_UP }
            ];
            expect(res).toEqual(expected);
        });
    });

    describe("#getRightUpCoords", () => {
        test("returns coordinates of all rightUp connectors", () => {
            const connectorsToPlace = [
                { connectorName: ConnectorName.ARROW_RIGHT, ownCoord: "1,2", parentCoord: "3,4" },
                { connectorName: ConnectorName.RIGHT_UP, ownCoord: "5,6", parentCoord: "7,8" },
                { connectorName: ConnectorName.RIGHT_UP_ARROW, ownCoord: "9,10", parentCoord: "11,12" },
                { connectorName: ConnectorName.RIGHT_UP, ownCoord: "13,14", parentCoord: "15,16" },
            ];
            expect(getRightUpCoords(connectorsToPlace)).toEqual([
                { colNum: 5, rowNum: 6 },
                { colNum: 13, rowNum: 14 }
            ]);
        });
        test("returns empty array if there are no rightUp connectors", () => {
            const connectorsToPlace = [
                { connectorName: ConnectorName.ARROW_RIGHT, ownCoord: "1,2", parentCoord: "3,4" },
                { connectorName: ConnectorName.LINE_HORIZ, ownCoord: "5,6", parentCoord: "7,8" },
                { connectorName: ConnectorName.RIGHT_UP_ARROW, ownCoord: "9,10", parentCoord: "11,12" },
                { connectorName: ConnectorName.LINE_VERT, ownCoord: "13,14", parentCoord: "15,16" },
            ];
            expect(getRightUpCoords(connectorsToPlace)).toEqual([]);
        });
    });

    describe("addVertConnectorsToMatrix", () => {
        let matrix: string[][];
        beforeEach(() => {
            matrix = [
                ["1234", "box|empty|0,1", "box|empty|0,2", "box|rightUp|0,3"],
                ["5678", "box|rightUp|1,1", "box|empty|1,2", "box|rightUp|1,3"]
            ];
        });
        test("populate until node is reached", () => {
            const startCoord = { colNum: 0, rowNum: 3 };
            addVertConnectorsToMatrix({ matrix, startCoord });
            expect(matrix).toEqual([
                ["1234", "box|arrowUp|0,1", "box|lineVert|0,2", "box|rightUp|0,3"],
                matrix[1]
            ]);
        });
        test("populate until connector is reached", () => {
            const startCoord = { colNum: 1, rowNum: 3 };
            addVertConnectorsToMatrix({ matrix, startCoord });
            expect(matrix).toEqual([
                matrix[0],
                ["5678", "box|rightUp|1,1", "box|lineVert|1,2", "box|rightUp|1,3"]
            ]);
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
            a: "1", b: "2", c: "3"
        };
        expect(invertKeyVal(dict)).toEqual({
            1: "a", 2: "b", 3: "c"
        });
    });

    test("#downRightDashesToPlace", () => {
        const decisionStepCols = [2, 4];
        const matrix = [
            ["5890236e433b-auth", "box|empty|0,1", "box|empty|0,2"],
            ["standard|arrowRight|1,0|0,0", "standard|empty|1,1", "standard|empty|1,2"],
            ["ba322565b1bf", "diamond|downRight|2,1", "diamond|empty|2,2"],
            ["standard|arrowRight|3,0|2,0", "standard|arrowRight|3,1|2,0", "standard|empty|3,2"],
            ["09e6110fda58", "diamond|empty|4,1", "diamond|empty|4,2"]
        ];
        const expected = [
            { replaceBy: "diamond|downRightDash|2,2|2,0", coord: { colNum: 2, rowNum: 2 } },
            { replaceBy: "diamond|downRightDash|4,1|4,0", coord: { colNum: 4, rowNum: 1 } }
        ];
        expect(downRightDashesToPlace({ matrix, decisionStepCols })).toEqual(expected);
    });

    test("#getPath", () => {
        const workflowStepNodes = {
            a: { nextNodes: [{ id: "b", primary: true }] },
            b: { nextNodes: [{ id: "c", primary: true }] },
            c: { nextNodes: [{ id: "d", primary: true }] },
            d: { nextNodes: [] },
        } as any as WorkflowStepNodes;

        expect(getPath({ node: "a", workflowStepNodes, path: ["a"] })).toEqual(["a", "b", "c", "d"]);
        expect(getPath({ node: "d", workflowStepNodes, path: ["d"] })).toEqual(["d"]);
    });

    describe("#findNodeWithClosestCommonDescendant", () => {
        const currPrimaryPath = ["a0", "a1", "a2", "a3"];
        const nodesToSort = ["b0", "c0", "d0"];
        test("converging paths", () => {
            const paths = {
                b0: ["b0", "b1", "a3"],
                c0: ["c0", "d2"],
                d0: ["d0", "d1", "d2", "a1"]
            };
            expect(findNodeWithClosestCommonDescendant({ currPrimaryPath, nodesToSort, paths })).toBe("d0");
        });
        test("parallel paths", () => {
            const paths = {
                b0: ["b0", "b1", "b2"],
                c0: ["c0", "c1"],
                d0: ["d0", "d1", "d2", "d3"]
            };
            expect(findNodeWithClosestCommonDescendant({ currPrimaryPath, nodesToSort, paths })).toBe("b0");
        });
    });

    describe("#closestCommonDescendantSort", () => {
        const currPrimaryPath = ["a0", "a1", "a2", "a3"];
        const nodesToSort = ["b0", "c0", "d0"];
        test("converging paths", () => {
            const paths = {
                b0: ["b0", "b1", "a3"],
                c0: ["c0", "c1", "c2", "a1", "a2", "a3"],
                d0: ["d0", "c2", "a1", "a2", "a3"]
            };
            expect(
                closestCommonDescendantSort({ currPrimaryPath, sortedNodes: ["a0"], nodesToSort, paths })
            ).toEqual(["a0", "d0", "c0", "b0"]);
        });
        test("parallel paths", () => {
            const paths = {
                b0: ["b0", "b1", "b2"],
                c0: ["c0", "c1"],
                d0: ["d0", "d1", "d2", "d3"]
            };
            expect(
                closestCommonDescendantSort({ currPrimaryPath, sortedNodes: ["a0"], nodesToSort, paths })
            ).toEqual(["a0", "b0", "c0", "d0"]);
        });
    });

    describe("#getSortedNextNodeIds", () => {
        const workflowStepNodes = {
            a0: { nextNodes: [{ id: "a1", primary: true }] },
            a1: { nextNodes: [{ id: "a2", primary: true }] },
            a2: { nextNodes: [{ id: "a3", primary: true }] },
            a3: { nextNodes: [] },
            b0: { nextNodes: [{ id: "b1", primary: true }] },
            b1: { nextNodes: [{ id: "a3", primary: true }] },
            c0: { nextNodes: [{ id: "c1", primary: true }] },
            c1: { nextNodes: [{ id: "c2", primary: true }] },
            c2: { nextNodes: [{ id: "a1", primary: true }] },
            d0: { nextNodes: [{ id: "c2", primary: true }] }
        } as any as WorkflowStepNodes;

        test("Only one nextNode", () => {
            expect(
                getSortedNextNodeIds({ nextNodes: [{ id: "a", primary: true }], workflowStepNodes })
            ).toEqual(["a"]);
            expect(getSortedNextNodeIds({ nextNodes: [], workflowStepNodes })).toEqual([]);
        });
        test("Multiple nextNodes", () => {
            const nextNodes = [
                { id: "a0", primary: true },
                { id: "b0", primary: false },
                { id: "c0", primary: false },
                { id: "d0", primary: false },
            ];
            expect(
                getSortedNextNodeIds({ nextNodes, workflowStepNodes })
            ).toEqual(["a0", "d0", "c0", "b0"]);
        });
    });

    describe("#addNodeToMatrix", () => {
        let matrix: Matrix;

        beforeEach(() => {
            matrix = initMatrix({
                numRows: 3,
                colTypes: [ColType.BOX, ColType.STANDARD, ColType.DIAMOND]
            });
        });
        it("should add node to the first unoccupied position equals parent rowNum", () => {
            const newNodeId = "1234";
            const encodedParentCoord = "0,0";
            const colNum = 1;
            const { rowNum } = addNodeToMatrix({ matrix, colNum, newNodeId, encodedParentCoord });
            expect(rowNum).toBe(0);
            expect(matrix[1]).toEqual(["1234", "standard|empty|1,1", "standard|empty|1,2"]);
        });
        it("should add node to the first unoccupied position is less than the parent rowNum", () => {
            const newNodeId = "1234";
            const encodedParentCoord = "0,1";
            const colNum = 1;
            const { rowNum } = addNodeToMatrix({ matrix, colNum, newNodeId, encodedParentCoord });
            expect(rowNum).toBe(1);
            expect(matrix[1]).toEqual(["standard|empty|1,0", "1234", "standard|empty|1,2"]);
        });
    });

    describe("#populateMatrix", () => {
        test("Linear workflow", () => {
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
                647384536514: "6,0",
                "6473f65c98fe": "8,0"
            };
            const expectedNodeIdToParentNodeIds = {
                "8e00dae32eb6-auth": undefined,
                "64735f9f64c8": ["8e00dae32eb6-auth"],
                "6473fda8a603": ["64735f9f64c8"],
                647384536514: ["6473fda8a603"],
                "6473f65c98fe": ["647384536514"]
            };
            const expected = {
                matrix: expectedMatrix,
                nodeIdToCoord: expectedNodeIdToCoord,
                nodeIdToParentNodeIds: expectedNodeIdToParentNodeIds
            };
            expect(res).toEqual(expected);
        });
        test("Simple branching workflow", () => {
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
                ba322565b1bf: "2,0",
                "09e6110fda58": "4,0",
                b2b5c4c7cfd7: "4,1",
                "297786162f15": "6,0",
                "492b709fc90a": "8,0",
                a3135bdf3aa3: "10,0"
            };
            const expectedNodeIdToParentNodeIds = {
                "5890236e433b-auth": undefined,
                ba322565b1bf: ["5890236e433b-auth"],
                "09e6110fda58": ["ba322565b1bf"],
                b2b5c4c7cfd7: ["ba322565b1bf"],
                "297786162f15": ["09e6110fda58", "b2b5c4c7cfd7"],
                "492b709fc90a": ["297786162f15"],
                a3135bdf3aa3: ["492b709fc90a"]
            };

            expect(res).toEqual({
                matrix: expectedMatrix,
                nodeIdToCoord: expectedNodeIdToCoord,
                nodeIdToParentNodeIds: expectedNodeIdToParentNodeIds
            });
        });
        describe("Complex workflow with sorting", () => {
            test("DA", () => {
                const { workflowSteps, workflowUid } = DA;
                const {
                    workflowVisData, initialMatrix
                } = createWorkflowVisData({ workflowSteps, workflowUid });
                const decisionStepCols: number[] = [2];
                const res = populateMatrix({ workflowVisData, initialMatrix, decisionStepCols });
                const expectedMatrix = matrixDA;
                const expectedNodeIdToCoord = {
                    "da-auth": "0,0",
                    "da-d1": "2,0",
                    pretrans1: "4,0",
                    trans4: "4,1",
                    trans2: "4,2",
                    trans3: "4,3",
                    trans1: "6,0",
                    review1: "8,0",
                    published: "10,0"
                };

                const expectedNodeIdToParentNodeIds = {
                    "da-d1": [
                        "da-auth"
                    ],
                    pretrans1: [
                        "da-d1"
                    ],
                    trans4: [
                        "da-d1"
                    ],
                    trans2: [
                        "da-d1"
                    ],
                    trans3: [
                        "da-d1"
                    ],
                    trans1: [
                        "pretrans1",
                        "trans4"
                    ],
                    review1: [
                        "trans2",
                        "trans1"
                    ],
                    published: [
                        "trans3",
                        "review1"
                    ]
                };

                expect(res).toEqual({
                    matrix: expectedMatrix,
                    nodeIdToCoord: expectedNodeIdToCoord,
                    nodeIdToParentNodeIds: expectedNodeIdToParentNodeIds
                });
            });
            test("DB", () => {
                const { workflowSteps, workflowUid } = DB;
                const {
                    workflowVisData, initialMatrix
                } = createWorkflowVisData({ workflowSteps, workflowUid });
                const decisionStepCols: number[] = [2];
                const res = populateMatrix({ workflowVisData, initialMatrix, decisionStepCols });
                const expectedMatrix = matrixDB;
                const expectedNodeIdToCoord = {
                    "db-auth": "0,0",
                    "db-d1": "2,0",
                    trans0: "4,0",
                    trans2: "4,1",
                    trans4: "4,2",
                    trans1: "4,3",
                    trans3: "4,4",
                    review2: "6,1",
                    edit1: "6,3",
                    review0: "8,0",
                    published: "10,0"
                };

                const expectedNodeIdToParentNodeIds = {
                    "db-d1": [
                        "db-auth"
                    ],
                    trans0: [
                        "db-d1"
                    ],
                    trans2: [
                        "db-d1"
                    ],
                    trans4: [
                        "db-d1"
                    ],
                    trans1: [
                        "db-d1"
                    ],
                    trans3: [
                        "db-d1"
                    ],
                    review0: [
                        "trans0",
                        "review2"
                    ],
                    review2: [
                        "trans2",
                        "trans4"
                    ],
                    edit1: [
                        "trans1",
                        "trans3"
                    ],
                    published: [
                        "edit1",
                        "review0"
                    ]
                };

                expect(res).toEqual({
                    matrix: expectedMatrix,
                    nodeIdToCoord: expectedNodeIdToCoord,
                    nodeIdToParentNodeIds: expectedNodeIdToParentNodeIds
                });
            });
            test("DC", () => {
                const { workflowSteps, workflowUid } = DC;
                const {
                    workflowVisData, initialMatrix
                } = createWorkflowVisData({ workflowSteps, workflowUid });
                const decisionStepCols: number[] = [2];
                const res = populateMatrix({ workflowVisData, initialMatrix, decisionStepCols });
                const expectedMatrix = matrixDC;
                const expectedNodeIdToCoord = {
                    "dc-auth": "0,0",
                    "dc-d1": "2,0",
                    trans0: "4,0",
                    trans1: "4,1",
                    trans3: "4,2",
                    trans2: "4,3",
                    trans4: "4,4",
                    edit1: "6,1",
                    review2: "6,3",
                    published: "8,0"
                };

                const expectedNodeIdToParentNodeIds = {
                    "dc-d1": [
                        "dc-auth"
                    ],
                    trans0: [
                        "dc-d1"
                    ],
                    trans1: [
                        "dc-d1"
                    ],
                    trans3: [
                        "dc-d1"
                    ],
                    trans2: [
                        "dc-d1"
                    ],
                    trans4: [
                        "dc-d1"
                    ],
                    published: [
                        "trans0",
                        "edit1",
                        "review2"
                    ],
                    edit1: [
                        "trans1",
                        "trans3"
                    ],
                    review2: [
                        "trans2",
                        "trans4"
                    ]
                };

                expect(res).toEqual({
                    matrix: expectedMatrix,
                    nodeIdToCoord: expectedNodeIdToCoord,
                    nodeIdToParentNodeIds: expectedNodeIdToParentNodeIds
                });
            });
            test("DD", () => {
                const { workflowSteps, workflowUid } = DD;
                const {
                    workflowVisData, initialMatrix
                } = createWorkflowVisData({ workflowSteps, workflowUid });
                const decisionStepCols: number[] = [2];
                const res = populateMatrix({ workflowVisData, initialMatrix, decisionStepCols });
                const expectedMatrix = matrixDD;
                const expectedNodeIdToCoord = {
                    "dd-auth": "0,0",
                    "dd-d1": "2,0",
                    trans0: "4,0",
                    trans2: "4,1",
                    trans3: "4,2",
                    trans1: "4,3",
                    review3: "6,2",
                    review1: "6,3",
                    edit3: "8,1",
                    edit0: "10,0",
                    review0: "12,0",
                    published: "14,0"
                };

                const expectedNodeIdToParentNodeIds = {
                    "dd-d1": [
                        "dd-auth"
                    ],
                    trans0: [
                        "dd-d1"
                    ],
                    trans2: [
                        "dd-d1"
                    ],
                    trans3: [
                        "dd-d1"
                    ],
                    trans1: [
                        "dd-d1"
                    ],
                    edit0: [
                        "trans0",
                        "edit3"
                    ],
                    edit3: [
                        "trans2",
                        "review3"
                    ],
                    review3: [
                        "trans3"
                    ],
                    review1: [
                        "trans1"
                    ],
                    published: [
                        "review1",
                        "review0"
                    ],
                    review0: [
                        "edit0"
                    ]
                };

                expect(res).toEqual({
                    matrix: expectedMatrix,
                    nodeIdToCoord: expectedNodeIdToCoord,
                    nodeIdToParentNodeIds: expectedNodeIdToParentNodeIds
                });
            });
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
    describe("#findNextNode", () => {
        test("It should return the first node to the right and above the the plus button", () => {
            const plusBtnCoord = { colNum: 0, rowNum: 3 };
            const coordToNodeId = {
                "2,2": "789",
                "1,0": "123",
                "2,1": "456",
                "2,4": "789"
            };
            const candidateNextNodeIds = ["123", "456", "789"];
            expect(
                findNextNode({ plusBtnCoord, coordToNodeId, candidateNextNodeIds })
            ).toBe("456");
        });
    });
});