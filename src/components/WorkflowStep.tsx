// Components
import React from 'react';
import { Connector } from "./connectors";

// Style
import './styles/workflowVis2D.css';

// Types
import { WorkflowStepType } from "../types/workflow";

// Constants
import { iconClassName, workflowStepConfig } from "../constants/workflowStepConfig";


const TRUNCATE_WORDS_CUTOFF = 14;

export const uiElement: { [id: string]: { id: string; type: string } } = {
    "downRightArrowDecision": { id: "downRightArrowDecision", type: WorkflowStepType.DECISION },
    "elbowSeBox": { id: "elbowSeBox", type: "BOX" },
    "rightUpArrow": { id: "rightUpArrow", type: "BOX" }
};


const Icon = ({ icon }: { icon: string }) => (
    <div className="iconContainer">
        <i className={iconClassName[icon]} />
    </div>
);

interface PropsT {
    name: string;
    type: WorkflowStepType;
}
interface State {
    dropdownMenuOpened: boolean;
}

class WorkflowStep2 extends React.PureComponent<PropsT, State> {
    constructor(props: PropsT) {
        super(props);

        this.state = {
            dropdownMenuOpened: false
        };

        this.boundOpenDropdownMenu = this.openDropdownMenu.bind(this);
        this.boundCloseDropdownMenu = this.closeDropdownMenu.bind(this);
    }

    openDropdownMenu() {
        this.setState({ dropdownMenuOpened: true });
    }

    closeDropdownMenu() {
        this.setState({ dropdownMenuOpened: false });
    }

    boundOpenDropdownMenu: () => void;
    boundCloseDropdownMenu: () => void;

    renderWorkflowStep({ displayName, type, isClickable }: {
        displayName: string; type: WorkflowStepType; isClickable: boolean;
    }) {
        const { icon, theme } = workflowStepConfig[type];
        const { dropdownMenuOpened } = this.state;

        if (!isClickable) {
            return (
                <div className="twoRowLeftBox">
                    <div className={`box flexContainer theme${theme}`}>
                        <Icon icon={icon} />
                        <div className="workflowStepDisplayName">
                            <p>{displayName}</p>
                        </div>
                    </div>
                </div>
            );
        }

        const caretDirClassName = dropdownMenuOpened
            ? "caretUp highlighted"
            : "caretDown";

        return (
            <div className="twoRowLeftBox">
                <div style={{ cursor: "pointer" }} className={`box flexContainer theme${theme}`}>
                    <Icon icon={icon} />
                    <div className="workflowStepDisplayName" >
                        <p>
                            {displayName}
                            <span className={`caret ${caretDirClassName}`} />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        const { name, type } = this.props;
        const { canEdit, canDelete } = workflowStepConfig[type];
        let displayName;
        if (type === WorkflowStepType.AUTHORIZE) {
            displayName = "Authorize";
        } else {
            // truncate name if too long
            displayName = name.length > TRUNCATE_WORDS_CUTOFF ? `${name.substring(0, TRUNCATE_WORDS_CUTOFF)}...` : name;
        }
        if (!canEdit && !canDelete) {
            return this.renderWorkflowStep({
                displayName,
                type,
                isClickable: false
            });
        }

        return this.renderWorkflowStep({ displayName, type, isClickable: true });
    }

}



const WorkflowStep = ({ node }: { node: any }) => {
    const { name, type } = node;
    if (uiElement[node.id]) {
        console.log("node.id is ", node.id)
        return (
            <div className="twoRowLeftBox">
                <Connector id={node.id} />
            </div>
        );
    }

    const { icon, theme } = workflowStepConfig[type];

    // truncate name if too long
    const displayName = name.length > 10 ? `${name.substring(0, 10)}...` : name;

    // TODO: We would like to pass down a noDropDown from props to specify all the workflow
    // types that don't want have dropdown
    const arrowHeadDown = type === WorkflowStepType.AUTHORIZE ? null : <span className="caret caretDown" />;

    return (
        <div className="twoRowLeftBox">
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