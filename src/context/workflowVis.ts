import { createContext } from "react";
import { WorkflowStepNodes } from "../lib/types";

const WorkflowVisContext = createContext({
    workflowStepNodes: {} as WorkflowStepNodes
});

export default WorkflowVisContext;
