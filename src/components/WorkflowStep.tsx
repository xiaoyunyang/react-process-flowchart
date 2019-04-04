// Components
import React from 'react';

// Style
import './styles/workflowVis.css';

// Types
import { WorkflowStepType } from "../types/workflow";

// Constants
import { iconClassName, workflowStepConfig } from "../constants/workflowStepConfig";
import { GenericNodeTypeT } from "../types/workflowVis";

const TRUNCATE_WORDS_CUTOFF = 10;

const Icon = ({ icon }: { icon: string }) => (
    <div className="iconContainer">
        <i className={iconClassName[icon]} />
    </div>
);

interface PropsT {
    name: string;
    type: GenericNodeTypeT;
}
interface State {
    dropdownMenuOpened: boolean;
}

const WorkflowStep = ({ name, type }: PropsT) => {
    const { icon, theme } = workflowStepConfig[type];

    // truncate name if too long
    const displayName = name.length > TRUNCATE_WORDS_CUTOFF
        ? `${name.substring(0, TRUNCATE_WORDS_CUTOFF)}...` : name;

    // TODO: We would like to pass down a noDropDown from props to specify all the workflow
    // types that don't want have dropdown
    const arrowHeadDown = type === WorkflowStepType.AUTHORIZE ? null : <span className="caret caretDown" />;

    return (
        <div className="boxContainer">
            <div className={`box flexContainer theme${theme}`}>
                <Icon icon={icon} />
                <div className="workflowStepDisplayName" >
                    <p>{displayName}{arrowHeadDown}</p>
                </div>
            </div>
        </div>
    );
}

export default WorkflowStep;