import { createContext, ReactNode } from "react";
// UIC
import {
    WarningIcon as DefaultWarningIcon,
    WorkflowStepIcon as DefaultWorkflowStepIcon,
    ForkIcon as DefaultForkIcon
} from "../defaultUIC";

const UicContext = createContext({
    warningIcon: DefaultWarningIcon as ReactNode,
    workflowStepIcon: DefaultWorkflowStepIcon as (type: string) => ReactNode,
    forkIcon: DefaultForkIcon as ReactNode
});

export default UicContext;
