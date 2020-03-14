import { createContext } from "react";
import { WorkflowConfig } from "../lib/types";

const ConfigContext = createContext({
    workflowConfig: {} as WorkflowConfig,
    workflowId: ""
});

export default ConfigContext;
