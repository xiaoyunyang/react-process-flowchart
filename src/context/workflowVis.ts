import { createContext } from "react";
import { WorkflowStepNodes } from "../lib/types/workflowVisTypes";

const WorkflowVisContext = createContext({
    workflowStepNodes: {} as WorkflowStepNodes
});

export default WorkflowVisContext;
