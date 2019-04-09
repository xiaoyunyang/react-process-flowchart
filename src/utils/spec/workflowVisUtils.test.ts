import {
    isPlaceholder,
    initCol,
    initMatrix,
    createWorkflowVisData,
    encodeMatrixCoord,
    decodeMatrixCoord,
    createCoordPairs,
    createConnectorsBetweenNodes,
    populateMatrix
} from "../workflowVisUtils";

// Types
import { ColType } from "../../types/workflowVis";

// Mocks
import { AA, BA } from "../../components/spec/mockWorkflowsData";

describe("WorkflowVisUtils", () => {
    // Not individually testing void functions but void functions are tested in their parent's unit test
    describe("#isPlaceholder", () => {
        it("should return true for placeholders", () => {
            expect(isPlaceholder("standard.empty")).toBe(true);
            expect(isPlaceholder("box.empty")).toBe(true);
            expect(isPlaceholder("diamond.empty")).toBe(true);
        });
        it("should return false for not placeholders", () => {
            expect(isPlaceholder("foo.empty")).toBe(false);
            expect(isPlaceholder("box.1234")).toBe(false);
            expect(isPlaceholder("empty")).toBe(false);
        });
    });

    describe("#initCol", () => {
        it("should initialize an array with placeholders with the right colType", () => {
            const col = initCol({ numRows: 3, colType: ColType.BOX });
            expect(col).toEqual(["box.empty", "box.empty", "box.empty"]);
        });
    });

    describe("#initMatrix", () => {
        it("should initialize a matrix of the right size with the right placeholdeers", () => {
            const matrix = initMatrix({ numCols: 3, numRows: 2, colTypes: [ColType.BOX, ColType.DIAMOND, ColType.STANDARD] });
            expect(matrix).toEqual([
                ["box.empty", "box.empty"],
                ["diamond.empty", "diamond.empty"],
                ["standard.empty", "standard.empty"],
            ]);
        });
    });

    describe("#generateWorkflowVisData", () => {
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

    describe("#createCoordPairs", () => {
        it("should create an array of pairs of coordinates between parent and child nodes using two hash tables", () => {
            const nodeCoord = {
                "5890236e433b-auth": "0,0",
                "ba322565b1bf": "2,0",
                "09e6110fda58": "4,0",
                "b2b5c4c7cfd7": "4,1",
                "297786162f15": "6,0",
                "492b709fc90a": "8,0",
                "a3135bdf3aa3": "10,0",

            };
            const parentCoords = {
                "ba322565b1bf": ["0,0"],
                "09e6110fda58": ["2,0"],
                "b2b5c4c7cfd7": ["2,0"],

                "297786162f15": ["4,0", "4,1"],
                "492b709fc90a": ["6,0"],
                "a3135bdf3aa3": ["8,0"]
            };

            const res = createCoordPairs({ nodeCoord, parentCoords });
            const expected = [
                { fromCoord: { colNum: 0, rowNum: 0 }, toCoord: { colNum: 2, rowNum: 0 } },
                { fromCoord: { colNum: 2, rowNum: 0 }, toCoord: { colNum: 4, rowNum: 0 } },
                { fromCoord: { colNum: 2, rowNum: 0 }, toCoord: { colNum: 4, rowNum: 1 } },
                { fromCoord: { colNum: 4, rowNum: 0 }, toCoord: { colNum: 6, rowNum: 0 } },
                { fromCoord: { colNum: 4, rowNum: 1 }, toCoord: { colNum: 6, rowNum: 0 } },
                { fromCoord: { colNum: 6, rowNum: 0 }, toCoord: { colNum: 8, rowNum: 0 } },
                { fromCoord: { colNum: 8, rowNum: 0 }, toCoord: { colNum: 10, rowNum: 0 } }
            ];
            expect(res).toEqual(expected);
        });
    });

    describe("#createConnectorsBetweenNodes", () => {
        it("creates correct connectors for when parent node is in the same row as child node", () => {
            const fromCoord = { colNum: 0, rowNum: 0 };
            const toCoord = { colNum: 3, rowNum: 0 };
            const res = createConnectorsBetweenNodes({ fromCoord, toCoord });
            const expected = [
                { colNum: 1, rowNum: 0, connectorId: "lineHoriz" },
                { colNum: 2, rowNum: 0, connectorId: "arrowRight" },
            ];
            expect(res).toEqual(expected);
        });
        it("creates correct connectors for when parent node is above child node", () => {
            const fromCoord = { colNum: 2, rowNum: 0 };
            const toCoord = { colNum: 6, rowNum: 2 };
            const res = createConnectorsBetweenNodes({ fromCoord, toCoord });
            const expected = [
                { colNum: 2, rowNum: 2, connectorId: "downRight" },
                { colNum: 3, rowNum: 2, connectorId: "lineHoriz" },
                { colNum: 4, rowNum: 2, connectorId: "lineHoriz" },
                { colNum: 5, rowNum: 2, connectorId: "arrowRight" },
            ];
            expect(res).toEqual(expected);
        });
        it("creates correct connectors for when parent node is below child node", () => {
            const fromCoord = { colNum: 2, rowNum: 4 };
            const toCoord = { colNum: 5, rowNum: 0 };
            const res = createConnectorsBetweenNodes({ fromCoord, toCoord });
            const expected = [
                { colNum: 3, rowNum: 4, connectorId: "lineHoriz" },
                { colNum: 4, rowNum: 4, connectorId: "lineHoriz" },
                { colNum: 5, rowNum: 4, connectorId: "rightUpArrow" }
            ];
            expect(res).toEqual(expected);
        });
    });

    describe("#populateMatrix", () => {
        it("should handle linear workflow case", () => {
            const { workflowSteps, workflowUid } = BA;
            const { workflowVisData, initialMatrix } = createWorkflowVisData({ workflowSteps, workflowUid });

            // Results in an error if the following line is run.... flatMap does not
            // work on arrays of more complex types. See
            // https://github.com/wmonk/create-react-app-typescript/issues/254
            // 
            // const res = populateMatrix({ workflowVisData, initialMatrix });

            const expected = [
                ["8e00dae32eb6-auth"],
                ["standard.arrowRight"],
                ["64735f9f64c8"],
                ["standard.arrowRight"],
                ["6473fda8a603"],
                ["standard.arrowRight"],
                ["647384536514"],
                ["standard.arrowRight"],
                ["6473f65c98fe"]
            ];

        });
        it("should handle simple branching workflow", () => {

        });
    });
});