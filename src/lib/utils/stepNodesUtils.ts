/* eslint-disable import/no-cycle */
// Utils
import { sort } from "ramda";

// Types
import {
    WorkflowStepNodes, NextNode
} from "../types";
import {
    OccurrenceDict, PolymorphDict
} from "../types/generic";

// TODO: Deprecate config
import {
    WorkflowStep, Utils, messages
} from "../../config";


// TODO: test getPrevSteps
// getPrevSteps and get NextSteps are utils
export const getPrevSteps = ({ workflowSteps, workflowStepOrder }: {
  workflowSteps: readonly WorkflowStep[]; workflowStepOrder: number;
}): WorkflowStep[] => workflowSteps.filter(
    (wfStep) => wfStep.workflowStepType !== "FORK"
  && wfStep.workflowStepOrder < workflowStepOrder
);

export const getNextSteps = ({ workflowSteps, workflowStepOrder }: {
  workflowSteps: readonly WorkflowStep[]; workflowStepOrder: number;
}): WorkflowStep[] => workflowSteps
    .filter((wfStep) => wfStep.workflowStepOrder > workflowStepOrder);


const getFirstStep = ({
    id, workflowUid, nextSteps, nextNodes
}: {
    id: string; workflowUid: string; nextSteps: WorkflowStep[]; nextNodes: any[];
}) => ({
    [id]: {
        id,
        workflowUid, // TODO:
        name: messages.START,
        nodeType: "START",
        workflowStepOrder: 0,
        nextNodes,
        nextSteps,
        prevSteps: [],
        isDisabled: Utils.getIsDisabled({} as WorkflowStep),
        displayWarning: null
    }
});

// TODO: Need a huge refactor of this function
export const createWorkflowStepNodes = ({ workflowSteps, workflowUid }: {
  workflowUid: string;
  workflowSteps: readonly WorkflowStep[];
}): {
    workflowStepNodes: WorkflowStepNodes;
    workflowStepOrderOccur: OccurrenceDict;
    firstStepId: string;
    forkStepCols: number[];
} => {
    // TODO: need to move this out of the function
    const firstStepId = `${workflowUid}-auth`;

    let workflowStepNodes: WorkflowStepNodes = {};
    let authorizeNextNodes: { id: string; primary: boolean }[] = [];
    let forkStepCols: number[] = [];

    const workflowStepOrderOccur: OccurrenceDict = {};
    for (let i = 0; i < workflowSteps.length; i += 1) {
        const workflowStep = workflowSteps[i];

        // TODO: remove destructuring here
        // Create a function called `getNodeFromStep` which takes workflowStep
        // Create a function called `getWorkflowStepOrder` which takes workflowStep
        const {
            workflowStepOrder,
            workflowStepUid,
            workflowStepName
        } = workflowStep;

        // We need to convert all keys for dictionaries to a string because key of a dictionary
        // must be string as we defined it in types/generics
        const stringifiedWorkflowStepOrder = String(workflowStepOrder);

        workflowStepOrderOccur[stringifiedWorkflowStepOrder] = (
            workflowStepOrderOccur[stringifiedWorkflowStepOrder]
                ? workflowStepOrderOccur[stringifiedWorkflowStepOrder]
                : 0) + 1;

        const nodeType = Utils.getNodeType({ workflowStep });
        if (nodeType === "FORK") {
            forkStepCols = forkStepCols.concat(workflowStepOrder * 2);
        }

        // TODO: authorizeNextNodes is the next node of `authorize` step
        // This logic should not be in the visualization lib.
        if (workflowStepOrder === 1) {
            authorizeNextNodes = [{ id: workflowStepUid, primary: true }];
        }

        // Not sure if we need prevSteps...?
        const prevSteps = getPrevSteps({ workflowSteps, workflowStepOrder });

        workflowStepNodes[workflowStepUid] = {
            id: workflowStepUid,
            workflowUid, // TODO: this can be in context?
            name: workflowStepName,
            nodeType,
            workflowStepOrder,
            nextNodes: Utils.getNextNodes(workflowStep),
            nextSteps: getNextSteps({ workflowSteps, workflowStepOrder }),
            prevSteps,
            isDisabled: Utils.getIsDisabled(workflowStep),
            displayWarning: Utils.getDisplayWarning(workflowStep)
        };
    }

    // TODO: We should append authorize to the workflowVisData before we go into this function
    // to derive nodes from workflowVis Data
    const firstStep = getFirstStep({
        id: firstStepId,
        workflowUid,
        nextNodes: authorizeNextNodes,
        nextSteps: getNextSteps({ workflowSteps, workflowStepOrder: 0 })
    });
    workflowStepNodes = {
        ...workflowStepNodes,
        ...firstStep
    };

    return {
        firstStepId, workflowStepNodes, workflowStepOrderOccur, forkStepCols
    };
};

/**
* Get an array of nodeIds starting from given starting node until the sink node in the given graph
* NOTE: An important assumption here is all the descendants of
* node only has one child. This is fine for now as we limit ourselves to
* only one decision step per visualization.
*
* @param {string} node - the starting node's id
* @param {WorkflowStepNodes} workflowStepNodes - mapping from nodeId to an array children's nodeIds
* @param {Array<string>} path - array of nodeIds beginning with given node
* @returns {Array<string>} path - array of nodeIds beginning with given node
*/
export const getPath = ({
    node, workflowStepNodes, path
}: { node: string; workflowStepNodes: WorkflowStepNodes; path: string[] }): string[] => {
    const children = workflowStepNodes[node].nextNodes.map((n) => n.id);

    if (children.length === 0) {
        return path;
    }
    const [child] = children;
    return getPath({
        node: child,
        workflowStepNodes,
        path: path.concat(child)
    });
};

/**
 * Find path with the closest common descendant to to the currPrimaryPath
 * common descendant marks the point of convergence into the currPrimaryPath
 *
 * @param {Array<string>} currPrimaryPath
 * @param {Array<string>} nodesToSort - nodeIds of nodes left to sort
 * @param {Object} paths - mapping from nodeId of members of nodeToSort to their paths in the graph
 * @returns {string} nodeToAdd
 */
export const findNodeWithClosestCommonDescendant = (
    { currPrimaryPath, nodesToSort, paths }: {
      currPrimaryPath: string[]; nodesToSort: string[]; paths: PolymorphDict;
  }
): string => {
    for (let i = 1; i < currPrimaryPath.length; i += 1) {
        const unsortedCandidatePaths = nodesToSort.map((node) => ({
            head: node,
            commonAncestorIndex: paths[node].indexOf(currPrimaryPath[i])
        })).filter(
            ({ commonAncestorIndex }) => (commonAncestorIndex > 0)
        );

        const candidatePaths = sort(
            (a, b) => (a.commonAncestorIndex - b.commonAncestorIndex),
            unsortedCandidatePaths
        );

        if (candidatePaths.length > 0) {
            const nodeToAdd = candidatePaths[0].head;
            return nodeToAdd;
        }
    }
    // TODO: Do we ever expect to get here?
    // We don't expect to ever get here but in case we do, we want to reduce the length of
    // nodesToSort to prevent infinite recursion.
    return nodesToSort[0];
};

/**
 * Given a collection of nodes to be sorted, paths drawn from these nodes until the sink node of
 * the graph, and an initial primaryPath, recursively find the next primaryPath based on closest
 * point of convergence of the path beginning from the node into the currPrimaryPath.
 * Designate the next node and as the new primary node and remove the next node from the
 * collection of nodes to be sorted.
 *
 * @param {Array<string>} currPrimaryPath
 * @param {Array<string>} sortedNodes
 * @param {Array<string>} nodesToSort
 * @param {Object} paths
 * @param {Array<string>} sortedNodes - includes the primaryNode as head of array
 * @returns {Array<string>} sortedNodes - updated sortedNodes
 */
export const closestCommonDescendantSort = (
    {
        currPrimaryPath, sortedNodes, nodesToSort, paths
    }: {
      currPrimaryPath: string[];
      sortedNodes: string[];
      nodesToSort: string[];
      paths: PolymorphDict;
  }
): string[] => {
    if (nodesToSort.length === 0) {
        return sortedNodes;
    }

    const nodeToAdd = findNodeWithClosestCommonDescendant({ currPrimaryPath, nodesToSort, paths });

    return closestCommonDescendantSort({
        currPrimaryPath: paths[nodeToAdd],
        sortedNodes: sortedNodes.concat(nodeToAdd),
        nodesToSort: nodesToSort.filter((node) => node !== nodeToAdd),
        paths
    });
};
/**
 * sort nodes which share common parent by closest common descendant
 *
 * @param {Array<{id, primary}>} nextNodes - the nodes which share common parent
 * @param {Object} WorkflowStepNodes
 * @returns {Array<string>} sortedNextNodes
 */
export const getSortedNextNodes = (
    { nextNodes, workflowStepNodes }: {
      nextNodes: NextNode[]; workflowStepNodes: WorkflowStepNodes;
  }
): string[] => {
    if (nextNodes.length < 2) return nextNodes.map((node) => node.id);
    const primaryNode = nextNodes.find((nextNode: NextNode) => nextNode.primary);
    const primaryNodeId: string = primaryNode ? primaryNode.id : nextNodes[0].id;

    const nodes: string[] = nextNodes.map((nextNode) => nextNode.id);

    const paths: PolymorphDict = nodes.reduce((acc: PolymorphDict, node: string) => (
        {
            ...acc,
            [node]: getPath({
                node,
                workflowStepNodes,
                path: [node]
            })
        }
    ), {});

    return closestCommonDescendantSort({
        currPrimaryPath: paths[primaryNodeId],
        sortedNodes: [primaryNodeId],
        nodesToSort: nodes.filter((node) => node !== primaryNodeId),
        paths
    });
};
