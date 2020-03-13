import { createContext } from "react";

// UIC
import {
    DefaultWarningIcon,
    DefaultWorkflowStepIcon,
    DefaultForkIcon,
    DefaultDropdown,
    DefaultDropdownMenu,
    DefaultAddWorkflowStepIcon,
    DefaultTooltip
} from "../defaultUIC";

const UicContext = createContext({
    warningIcon: DefaultWarningIcon,
    workflowStepIcon: DefaultWorkflowStepIcon,
    forkIcon: DefaultForkIcon,
    dropdown: DefaultDropdown,
    dropdownMenu: DefaultDropdownMenu,
    addWorkflowStepIcon: DefaultAddWorkflowStepIcon,
    tooltip: DefaultTooltip
});

export default UicContext;
