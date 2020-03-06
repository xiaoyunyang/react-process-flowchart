// Utils
import { clone, chain } from "ramda";

// Types
// eslint-disable-next-line import/no-cycle
import {
    ConnectorName, Matrix,
    MatrixCoord, ConnectorToPlace, CoordPairT, TileContainer, TileType
} from "../types/workflowVisTypes";
import {
    EndomorphDict, PolymorphDict
} from "../types/generic";
// Constants
const MATRIX_PLACEHOLDER_NAME = ConnectorName.EMPTY;

/**
 * Encodes colNum and rowNum as comma delimited string
 *
 * @param {number} colNum
 * @param {number} rowNum
 * @returns {string} a comma delimited string encoding colNum and rowNum
 */
export const encodeMatrixCoord = ({ colNum, rowNum }: MatrixCoord): string => `${colNum},${rowNum}`;

/**
 * Decodes colNum and rowNum from comma delimited string
 *
 * @param {string} colRow a comma delimited string encoding colNum and rowNum
 * @returns {number} colNum
 * @returns {number} rowNum
 */
export const decodeMatrixCoord = (colRow: string): MatrixCoord => {
    const [colNum, rowNum] = colRow.split(",").map((s) => +s);
    return { colNum, rowNum };
};

/**
 * Creates a string from the given parameters encoding information about the matrix entry
 *
 * @param {ColType} colType
 * @param {string} entryName
 * @param {string} encodedOwnCoord
 * @param {string} encodedParentCoord
 * @return {string} matrixEntry - a period delimited string that encodes all the params
 */
export const encodeMatrixEntry = (
    {
        tileType, tileContainer, tileId, encodedOwnCoord, encodedParentCoord
    }: {
      tileType: TileType;
      tileContainer: TileContainer;
      tileId: string;
      encodedOwnCoord: string;
      encodedParentCoord?: string;
  }
): string => {
    const parentCoord = encodedParentCoord ? `|${encodedParentCoord}` : "";
    return `${tileType}|${tileContainer}|${tileId}|${encodedOwnCoord}${parentCoord}`;
};

/**
 * Get info about the tile from the matrixEntry string
 *
 * @param {string} matrixEntry
 * @returns {ColType} tileType
 * @returns {string} tileId
 * @returns {(string|undefined)} tileName
 * @returns {(string|undefined)} encodedOwnCoord
 * @returns {(string|undefined)} encodedParentNodeCoord - coord of a workflowStep
 */
export const decodeMatrixEntry = (matrixEntry: string): {
  tileType: TileType;
  tileContainer: TileContainer;
  tileId: string;
  encodedOwnCoord: string;
  encodedParentNodeCoord: string | undefined;
} => {
    const [tileType, tileContainer, tileId, encodedOwnCoord, encodedParentNodeCoord] = matrixEntry.split("|");

    return {
        tileType: tileType as TileType,
        tileContainer: tileContainer as TileContainer,
        tileId,
        encodedOwnCoord,
        encodedParentNodeCoord
    };
};

/**
 * Determines the rowNum of the first unoccupied (empty) tile
 *
 * @param {string[]} col
 * @return {number} rowNum
 */
export const isPlaceholder = (matrixEntry: string): boolean => {
    const { tileType, tileId } = decodeMatrixEntry(matrixEntry);
    return tileType === TileType.CONNECTOR && tileId === MATRIX_PLACEHOLDER_NAME;
};

/**
 * Determines the rowNum of the first empty slot in a column
 * @param {string[]} col
 * @returns {number} rowNum
 */
export const firstUnoccupiedInCol = (
    col: string[]
): number => col.findIndex((matrixEntry: string) => isPlaceholder(matrixEntry));

/**
 * Determines the rowNum of the last non-empty slot in a column that's a node
 * @param {string[]} col
 * @returns {number} rowNum
 */
export const lastNodeInCol = (col: string[]): number => {
    for (let i = col.length - 1; i >= 0; i -= 1) {
        const matrixEntry = col[i];
        const { tileType } = decodeMatrixEntry(matrixEntry);

        if (tileType !== TileType.CONNECTOR) return i;
    }
    return -1;
};

/**
 * Determines the rowNum of the last non-empty slot in a column
 * @param {string[]} col
 * @returns {number} rowNum
 */
export const lastOccupiedInCol = (col: string[]): number => {
    for (let i = col.length - 1; i >= 0; i -= 1) {
        const matrixEntry = col[i];

        if (!isPlaceholder(matrixEntry)) return i;
    }
    return -1;
};

// Mutable function (mutates matrix) instead of returning
// a new matrix for performance reasons
export const replaceTile = (
    { matrix, replaceBy, coord }: { matrix: Matrix; replaceBy: string; coord: MatrixCoord }
): void => {
    const { rowNum, colNum } = coord;

    const newCol = clone(matrix[colNum]);
    newCol[rowNum] = replaceBy;
    // eslint-disable-next-line no-param-reassign
    matrix[colNum] = newCol;
};

/**
 *
 * @param {number} numRows number of rows
 * @param {number} colNum column number
 * @param {tileContainer} tileContainer
 * @returns {string[]} an array of matrixEntries
 */
export const initCol = ({
    numRows, colNum, tileContainer
}: {
  numRows: number; colNum: number; tileContainer: TileContainer;
}): string[] => Array.from(Array(numRows).keys())
    .map((rowNum) => encodeMatrixEntry({
        tileType: TileType.CONNECTOR,
        tileContainer,
        tileId: MATRIX_PLACEHOLDER_NAME,
        encodedOwnCoord: encodeMatrixCoord({ colNum, rowNum })
    }));

/**
 * Creates a numCols x numRows matrix initialized with placeholders
 * (box.empty, diamond.empty, or standard.empty)
 *
 * @param {number} numRows
 * @param {tileContainers} tileContainers array of TileContainers - box, diamond, or standard
 * @returns {Matrix} a 2D array of matrixEntries
 */
export const initMatrix = (
    { numRows, tileContainers }: { numRows: number; tileContainers: TileContainer[] }
): Matrix => tileContainers.map((tileContainer: TileContainer, i: number) => initCol({
    numRows, colNum: i, tileContainer
}));

/**
 * Adds a new Node to the matrix. Mutates the original matrix.
 *
 * @param {Matrix} matrix
 * @param {number} colNum
 * @param {string} newNodeId
 * @returns {MatrixCoord} { rowNum, colNum } of the newly added Node in the matrix
 */
export const addNodeToMatrix = (
    {
        matrix, colNum, newNodeId, encodedParentCoord
    }: {
      matrix: Matrix;
      colNum: number;
      newNodeId: string;
      encodedParentCoord: string | undefined;
  }
): MatrixCoord => {
    // console.log("encodedParentCoord: ", encodedParentCoord);
    const col = matrix[colNum];

    // Determine rowNum
    // Naive: rowNum is the first unoccupied
    // Better: If no parent, rowNum is the first unoccupied.
    // If has parent, rowNum is parent rowNum or first unoccupied, whichever is greater
    // Note, in this iteration, we are assuming that the tile at parent's rowNum is unoccupied
    // but that's not necessarily true. In a future iteration, we want to also check that the
    // tile at parent's rowNum is unoccupied. If it's occupied, we want to change the size of
    // of the matrix.
    const firstUnoccupiedRowNum = firstUnoccupiedInCol(col);
    let rowNum: number;
    if (encodedParentCoord) {
        const { rowNum: parentRowNum } = decodeMatrixCoord(encodedParentCoord);
        rowNum = Math.max(parentRowNum, firstUnoccupiedRowNum);
    } else {
        rowNum = firstUnoccupiedRowNum;
    }

    // TODO:
    // Best: if no parent, rowNum is the first unoccupied. If has parent, rowNum is parent rowNum
    // but if that is occupied, then we shift col 2 places to the right
    // Also need to consider if the step is primary. If it is primary, it has to be in the first
    // place in col
    // TODO: Need to have a function for replace col type
    // We also need to change the size of the matrix and shift all the nodes to the right and down

    const { tileContainer, encodedOwnCoord } = decodeMatrixEntry(col[0]);
    const tileType = tileContainer === TileContainer.DIAMOND ? TileType.FORK : TileType.NODE;
    const replaceBy = encodeMatrixEntry({
        tileType,
        tileContainer,
        tileId: newNodeId,
        encodedOwnCoord
    });

    replaceTile({
        coord: { colNum, rowNum },
        matrix,
        replaceBy
    });
    return { rowNum, colNum };
};

/**
* Mutates the matrix by replacing tiles with connectors
*
* @param {Matrix} matrix initial matrix with workflowSteps already placed
* @param {ConnectorToPlace} connectorToPlace instruction for how to place a connectors into matrix
* @param {string[]} nodeCoords an array of matrix coords for all the nodes (i.e., workflowSteps)
* @returns {string} replaceBy - string for the new connector matrixEntry
*/
export const addConnectorToMatrix = (
    { matrix, connectorToPlace, nodeCoords }: {
      matrix: Matrix; connectorToPlace: ConnectorToPlace; nodeCoords: string[];
  }
): { replaceBy: string } => {
    const { ownCoord, parentCoord, connectorName } = connectorToPlace;
    const { colNum, rowNum } = decodeMatrixCoord(ownCoord);
    const { tileType, tileContainer } = decodeMatrixEntry(matrix[colNum][rowNum]);

    const parentNodeCoord: string | undefined = nodeCoords.includes(parentCoord)
        ? parentCoord : undefined;

    const replaceBy = encodeMatrixEntry({
        tileType,
        tileContainer,
        tileId: connectorName,
        encodedOwnCoord: ownCoord,
        encodedParentCoord: parentNodeCoord
    });

    replaceTile({
        matrix,
        replaceBy,
        coord: { colNum, rowNum }
    });

    return { replaceBy };
};

/**
 * Creates an array of parentCoord/childCoord pairs for use by connectorBetweenNodes
 *
 * @param {EndomorphDict} nodeIdToCoord
 * @param {PolymorphDict} nodeToParentCoords
 * @returns {CoordPairT[]} an array of pairs of coords (parentNode and childNode)
 */
export const createCoordPairs = (
    { nodeIdToCoord, nodeIdToParentCoords }: {
      nodeIdToCoord: EndomorphDict;
      nodeIdToParentCoords: PolymorphDict;
  }
): CoordPairT[] => {
    const nodeIds = Object.keys(nodeIdToParentCoords);

    const newCoord = (
        nodeId: string
    ): CoordPairT[] => nodeIdToParentCoords[nodeId].map((colRow: string) => ({
        parentCoord: decodeMatrixCoord(colRow),
        childCoord: decodeMatrixCoord(nodeIdToCoord[nodeId])
    }));

    return chain((nodeId) => newCoord(nodeId), nodeIds);
};

/**
* Create a sequence of LineHoriz and returns the coordinate of the last LineHoriz
*
* @param {number} startCol
* @param {number} endCol
* @param {number} rowNum
* @param {string} parentCoord
* @returns {ConnectorToPlace[]} lines - an array of ConnectorToPlace for lineHoriz
* @returns {string} lastLineCoord - the coord of the last lineHoriz in the series
*/
export const createLineHorizes = (
    {
        startCol, endCol, rowNum, parentCoord
    }: {
      startCol: number; endCol: number; rowNum: number; parentCoord: string;
  }
): { lines: ConnectorToPlace[]; lastLineCoord: string } => {
    let lines: ConnectorToPlace[] = [];
    let currParentCoord = parentCoord;
    for (let colNum = startCol; colNum < endCol; colNum += 1) {
        const ownCoord = encodeMatrixCoord({ colNum, rowNum });
        const newEntry = {
            ownCoord,
            parentCoord: currParentCoord,
            connectorName: ConnectorName.LINE_HORIZ
        };
        lines = lines.concat(newEntry);
        currParentCoord = encodeMatrixCoord({ colNum, rowNum });
    }

    return { lines, lastLineCoord: currParentCoord };
};


/**
* Creates an array of connectors to place with specific values and locations in the matrix
* Only in the horizontal direction
*
* @param {MatrixCoord} parentCoord
* @param {MatrixCoord} childCoord
* @returns {ConnectorToPlace[]} an array of ConnectorToPlace for between the
* colNums of parent and child nodes
*/
export const createHorizConnectorsBetweenNodes = (coordPair: CoordPairT): ConnectorToPlace[] => {
    const { parentCoord, childCoord } = coordPair;
    const { colNum: fromCol, rowNum: fromRow } = parentCoord;
    const { colNum: toCol, rowNum: toRow } = childCoord;

    const parentNodeCoord = encodeMatrixCoord({ colNum: fromCol, rowNum: fromRow });

    // Case 1: fromRow = toRow
    // should be lineHoriz, ..., arrowRight
    // row should be fromRow.
    // fill connectors at: fromCol+1 until toCol-1
    if (fromRow === toRow) {
        const startCol = fromCol + 1;
        const endCol = toCol - 1;
        const rowNum = fromRow;

        const { lines, lastLineCoord } = createLineHorizes({
            startCol, endCol, rowNum, parentCoord: parentNodeCoord
        });

        const lastEntry = {
            ownCoord: encodeMatrixCoord({ colNum: endCol, rowNum }),
            connectorName: ConnectorName.ARROW_RIGHT,
            parentCoord: lastLineCoord
        };

        return lines.concat(lastEntry);
    }

    // Case 2: fromRow < toRow
    // should be downRight, lineHoriz, ..., arrowRight
    // row should be toRow.
    // fill connectors at: fromCol until toCol-1
    if (fromRow < toRow) {
        const startCol = fromCol;
        const endCol = toCol - 1;
        const rowNum = toRow;

        // NOTE: Although downRight's parent is really the node, parentCoord is used to
        // Support rendering of the plus sign. Only the connector that renders the plus sign
        // can have its parentCol to be the parent node's col. Since we don't want to render
        // the plus sign on the downRight connector, we need to make sure this connector's
        // parentCoord is pointing to an empty slot in the matrix
        const firstEntry = {
            ownCoord: encodeMatrixCoord({ colNum: startCol, rowNum }),
            parentCoord: encodeMatrixCoord({ colNum: fromCol - 1, rowNum }),
            connectorName: ConnectorName.DOWN_RIGHT
        };
        const { lines, lastLineCoord } = createLineHorizes({
            startCol: startCol + 1, endCol, rowNum, parentCoord: parentNodeCoord
        });

        const lastEntry = {
            ownCoord: encodeMatrixCoord({ colNum: endCol, rowNum }),
            parentCoord: lastLineCoord,
            connectorName: ConnectorName.ARROW_RIGHT
        };

        return [firstEntry].concat(lines).concat(lastEntry);
    }

    // Case 3: fromRow > toRow
    // should be lineHoriz, ..., rightUpArrow
    // row should be fromRow.
    // fill connectors at: fromCol+1 until toCol
    const startCol = fromCol + 1;
    const endCol = toCol;
    const rowNum = fromRow;
    const { lines, lastLineCoord } = createLineHorizes({
        startCol, endCol, rowNum, parentCoord: parentNodeCoord
    });

    const lastConnectorName = ((fromRow - toRow) > 1) ? ConnectorName.RIGHT_UP
        : ConnectorName.RIGHT_UP_ARROW;
    const lastEntry = {
        ownCoord: encodeMatrixCoord({ colNum: endCol, rowNum }),
        connectorName: lastConnectorName,
        parentCoord: lastLineCoord
    };

    return lines.concat(lastEntry);
};

/**
 * Get coords of rightUp connectors in the matrix
 *
 * @param {ConnectorToPlace} connectorToPlace
 * @returns {MatrixCoord[]} rightUpCoords - coords for where all the rightUp connectors go
 */
export const getRightUpCoords = (
    connectorsToPlace: ConnectorToPlace[]
): MatrixCoord[] => connectorsToPlace
    .filter(({ connectorName }) => connectorName === ConnectorName.RIGHT_UP)
    .map(({ ownCoord }) => decodeMatrixCoord(ownCoord));


/**
 * Adds vertical line and up arrow to a column in the matrix beginning from startCoord
 *
 * @param {Matrix} matrix
 * @param {MatrixCoord} startCoord
 * @returns void - mutates the matrix
 */
export const addVertConnectorsToMatrix = (
    { matrix, startCoord }: { matrix: Matrix; startCoord: MatrixCoord }
) => {
    const { colNum, rowNum } = startCoord;
    const col = clone(matrix[colNum]);

    for (let currentRowIndex = rowNum - 1; currentRowIndex >= 1; currentRowIndex -= 1) {
        const curr = col[currentRowIndex];
        const above = col[currentRowIndex - 1];
        if (!isPlaceholder(curr)) {
            break;
        }

        const {
            tileType, tileContainer, encodedOwnCoord, encodedParentNodeCoord
        } = decodeMatrixEntry(curr);
        const { tileType: aboveTileType } = decodeMatrixEntry(above);

        const connectorName = (isPlaceholder(above) || aboveTileType === TileType.CONNECTOR)
            ? ConnectorName.LINE_VERT : ConnectorName.ARROW_UP;

        const replaceBy = encodeMatrixEntry({
            tileType,
            tileContainer,
            tileId: connectorName,
            encodedOwnCoord: encodedOwnCoord as string,
            encodedParentCoord: encodedParentNodeCoord as string
        });
        col[currentRowIndex] = replaceBy;
    }

    // mutate matrix
    // eslint-disable-next-line no-param-reassign
    matrix[colNum] = col;
};


/**
 * Provides instruction for where to place a dash line forking from decision step
 *
 * @param {Matrix} matrix
 * @param {number[]} forkStepCols
 * @returns {Array} {replaceBy, coord}[]
 */
export const downRightDashesToPlace = (
    { matrix, forkStepCols }: { matrix: Matrix; forkStepCols: number[] }
): { replaceBy: string; coord: MatrixCoord }[] => forkStepCols.map((colNum) => {
    const col = matrix[colNum];
    const parentRowNum = lastNodeInCol(col);
    const rowNum = lastOccupiedInCol(col) + 1;
    const encodedOwnCoord = encodeMatrixCoord({ colNum, rowNum });
    const encodedParentNodeCoord = encodeMatrixCoord({ colNum, rowNum: parentRowNum });

    const tileContainer = TileContainer.DIAMOND;

    const replaceBy = encodeMatrixEntry({
        tileType: TileType.CONNECTOR,
        tileContainer,
        tileId: ConnectorName.DOWN_RIGHT_DASH,
        encodedOwnCoord,
        encodedParentCoord: encodedParentNodeCoord
    });
    return {
        replaceBy,
        coord: { colNum, rowNum }
    };
});


/**
* Takes a dictionary and returns a new dictionary with the key and value swapped
*
* @param {EndomorphDict} keyToVal
* @param {EndomorphDict} valToKey
*/
export const invertKeyVal = (
    keyToVal: EndomorphDict
): EndomorphDict => Object.keys(keyToVal).map((key) => [key, keyToVal[key]]).reduce((acc, curr) => {
    const [key, val] = curr;
    const valToKey = { [val]: key };
    return { ...acc, ...valToKey };
}, {});

/**
 * Given plusBtn coordinate and a list of candidate coordinates for where the next nodes could be,
 * determine the next node (there can only be one next node)
 *
 * @param {MatrixCoord} plusBtnCoord
 * @param {EndomorphDict} coordToNodeId
 * @param {string[]} candidateNodeIds
 */
export const findNextNode = ({
    plusBtnCoord, coordToNodeId, candidateNextNodeIds
}: {
plusBtnCoord: MatrixCoord; coordToNodeId: EndomorphDict; candidateNextNodeIds: string[];
}): string => {
    // NOTE: It's assumed all candidateNextNodeIds are to the right of the plus button so their
    // colNum is irrelevant
    const { rowNum: plusBtnRowNum } = plusBtnCoord;

    const nodeIdToCoord = invertKeyVal(coordToNodeId);
    // keep going to the right until you see empty. Then go up.
    const candidateCoords: MatrixCoord[] = candidateNextNodeIds
        .map((nodeId: string) => nodeIdToCoord[nodeId])
        .map((encodedCoord: string) => decodeMatrixCoord(encodedCoord));
    const nextNodeCoord = candidateCoords
        .filter(({ rowNum }: { rowNum: number }) => rowNum <= plusBtnRowNum)
        .sort((a: MatrixCoord, b: MatrixCoord) => b.rowNum - a.rowNum)[0];

    return coordToNodeId[encodeMatrixCoord(nextNodeCoord)];
};
