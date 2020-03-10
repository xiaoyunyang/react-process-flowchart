// Libraries
import React, {
    createContext, useContext, ReactNode, useState
} from "react";
import classNames from "classnames";
import Truncate from "react-truncate";

// Config
import {
    Tooltip, Dropdown,
    WorkflowStepEditMenu,
    // DropdownComponent
    Theme,
    WorkflowStepIcon, workflowStepConfig,
    messages,
    NodeType
} from "../../config";

// Style
import styles from "../styles/workflowVis.module.css";

// Types
import { WorkflowStepNode } from "../types/workflowVisTypes";
import UicContext from "../../context/uic";


interface Props {
    stepDisabledMessage?: string;
    shouldHighlight: boolean;
    theme?: Theme;
    workflowStepNode: WorkflowStepNode;
}

interface State {
    dropdownMenuOpened: boolean;
}
const initialState: State = {
    dropdownMenuOpened: false
};

const WorkflowStepContext = createContext(initialState);


// TODO: different from project code
export const Icon = ({ type }: { type: string }) => (
    <div className={styles.iconContainer}>
        <WorkflowStepIcon type={type} />
    </div>
);

const ConditionalTooltip = ({
    children, renderTooltip, tooltipContent
}: {
    children: JSX.Element;
    renderTooltip: boolean;
    tooltipContent: ReactNode;
}) => (renderTooltip ? (
    <Tooltip
        placement="top"
        tooltipContent={tooltipContent}
        tooltipTitleClassName={styles.boxContainerTooltip}
    >
        {children}
    </Tooltip>
) : children);

const ConditionalDropdown = ({
    children, renderDropdown, onOpen, onClose, dropdownMenu
}: {
    children: JSX.Element;
    renderDropdown: boolean;
    onOpen: () => void;
    onClose: () => void;
    dropdownMenu: ReactNode;
}) => (renderDropdown ? (
    <Dropdown
        closeOnClick={false}
        onOpen={onOpen}
        onClose={onClose}
        component={dropdownMenu}
    >
        {children}
    </Dropdown>
) : children);

const DisplayName = ({
    displayName, isClickable, setRenderTooltip
}: { displayName: string; isClickable: boolean; setRenderTooltip: (truncated: boolean) => void}) => {
    const { dropdownMenuOpened } = useContext(WorkflowStepContext);

    const caretUpClassName = classNames(
        styles.caret, styles.caretUp, styles.active,
        { [styles.hidden]: !dropdownMenuOpened }
    );

    const caretDownClassName = classNames(
        styles.caret, styles.caretDown,
        { [styles.hidden]: dropdownMenuOpened }
    );
    return (
        <div className={classNames(styles.workflowStepDisplayName, styles.flexContainer)}>
            <Truncate onTruncate={setRenderTooltip}>
                {displayName}
            </Truncate>
            {
                isClickable && (
                    <span className={styles.carets}>
                        <span className={styles.caretsWrapper}>
                            <span className={caretDownClassName} />
                            <span className={caretUpClassName} />
                        </span>
                    </span>
                )
            }
        </div>
    );
};

// TODO: Storybook should test this only
const WorkflowStep = ({
    name, displayWarning, nodeType, isDisabled, shouldHighlight, theme, isClickable
}: {
    name: string; displayWarning: ReactNode; nodeType: NodeType;
    isDisabled: boolean; shouldHighlight: boolean; theme: Theme; isClickable: boolean;
}) => {
    const { warningIcon } = useContext(UicContext);
    const boxContainerClassName = isClickable
        ? classNames(styles.boxContainer, styles.hoverable) : styles.boxContainer;

    const [renderTooltip, setRenderTooltip] = useState(false);

    return (
        <div className={boxContainerClassName}>
            <div
                className={classNames(
                    { [styles.workflowStepDisabled]: isDisabled },
                    { [styles.highlighted]: shouldHighlight },
                    styles.box,
                    styles.flexContainer,
                    styles[`theme${theme}`]
                )}
            >
                {displayWarning && (
                    <div className={styles.iconContainerWarning}>
                        {warningIcon}
                    </div>
                )}
                <Icon type={nodeType} />
                <ConditionalTooltip
                    renderTooltip={renderTooltip}
                    tooltipContent={name}
                >
                    <DisplayName
                        displayName={name}
                        isClickable={isClickable}
                        setRenderTooltip={setRenderTooltip}
                    />
                </ConditionalTooltip>
            </div>
        </div>
    );
};


const WorkflowStepContainer = ({
    workflowStepNode, shouldHighlight,
    stepDisabledMessage // TODO: deprecate
}: Props) => {
    const [dropdownMenuOpened, setDropdownMenuOpened] = useState(false);
    const onClose = () => setDropdownMenuOpened(false);
    const onOpen = () => setDropdownMenuOpened(true);
    const {
        id, name,
        nodeType, isDisabled, displayWarning,
        workflowUid, nextSteps, prevSteps
    } = workflowStepNode;

    // TODO: reduce hasOption into workflowStepNode
    const hasOption = Object.values(workflowStepConfig[nodeType].options).reduce(
        (acc: boolean, curr: boolean) => acc || curr,
        false
    );

    // TODO: need to change the config so it doesn't explicitly identify what the options are
    const isClickable = !isDisabled && hasOption;
    const renderTooltip = !!displayWarning || isDisabled;
    const tooltipContent = displayWarning || stepDisabledMessage || messages.stepIsDisabled;

    const editMenuProps = {
        ...workflowStepConfig[nodeType].options,
        type: nodeType,
        workflowStepUid: id,
        workflowUid,
        nextSteps,
        prevSteps
    };

    // TODO: dropdownMenu needs to contain options from workflowStepNodes
    const dropdownMenu = WorkflowStepEditMenu;
    const { theme } = workflowStepConfig[nodeType];

    return (
        <ConditionalTooltip tooltipContent={tooltipContent} renderTooltip={renderTooltip}>
            <WorkflowStepContext.Provider
                value={{ dropdownMenuOpened }}
            >
                <ConditionalDropdown
                    renderDropdown={isClickable}
                    onOpen={onOpen}
                    onClose={onClose}
                    dropdownMenu={dropdownMenu}
                >
                    <WorkflowStep
                        name={name}
                        displayWarning={displayWarning}
                        nodeType={nodeType}
                        isDisabled={isDisabled}
                        shouldHighlight={shouldHighlight}
                        theme={theme}
                        isClickable={isClickable}
                    />
                </ConditionalDropdown>
            </WorkflowStepContext.Provider>
        </ConditionalTooltip>
    );
};

export default WorkflowStepContainer;
