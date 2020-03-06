// Libraries
import React, {
    createContext, useContext, useReducer, useCallback, ReactNode
} from "react";
import classNames from "classnames";
import Truncate from "react-truncate";

// Config
import {
    Tooltip, Dropdown,
    WorkflowStepEditMenu,
    // DropdownComponent
    ThemeT,
    WorkflowStepIcon, workflowStepConfig,
    messages,
    ExclamationIcon
} from "../../config";

// Style
import styles from "../styles/workflowVis.module.css";
import WorkflowVisContext from "../../context/workflowVis";
import { WorkflowStepNode } from "../types/workflowVisTypes";

export const WarningIcon = () => (
    <div className={styles.iconContainerWarning}>
        <ExclamationIcon />
    </div>
);

// TODO: different from project code
const DropdownComponent = WorkflowStepEditMenu;

// TODO: different from project code
export const Icon = ({ type }: { type: string }) => (
    <div className={styles.iconContainer}>
        <WorkflowStepIcon type={type} />
    </div>
);

interface Props {
    stepDisabledMessage?: string;
    shouldHighlight: boolean;
    theme?: ThemeT;
    workflowStepNode: WorkflowStepNode;
}

interface State {
    dropdownMenuOpened: boolean;
    displayTooltip: boolean;
}

class WorkflowStep extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            dropdownMenuOpened: false,
            displayTooltip: false
        };
        this.boundOpenDropdownMenu = this.toggleDropdownMenu.bind(this, true);
        this.boundCloseDropdownMenu = this.toggleDropdownMenu.bind(this, false);
        this.boundHandleTruncate = this.handleTruncate.bind(this);
    }

    boundHandleTruncate: (truncated: boolean) => void;

    handleTruncate(truncated: boolean) {
        this.setState({ displayTooltip: truncated });
    }

    boundOpenDropdownMenu: () => void;

    boundCloseDropdownMenu: () => void;

    toggleDropdownMenu(dropdownMenuOpened: boolean) {
        this.setState({ dropdownMenuOpened });
    }

    renderDisplayName({ displayName, isClickable }: { displayName: string; isClickable: boolean }) {
        const { dropdownMenuOpened } = this.state;

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
                <Truncate onTruncate={this.boundHandleTruncate}>
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
    }

    renderTooltippedDisplayName(
        { name, isClickable }: { name: string; isClickable: boolean }
    ) {
        const { displayTooltip } = this.state;

        return displayTooltip
            ? (
                <Tooltip
                    className={styles.boxTooltip}
                    placement="top"
                    tooltipContent={name}
                >
                    {this.renderDisplayName({ displayName: name, isClickable })}
                </Tooltip>
            ) : this.renderDisplayName({ displayName: name, isClickable });
    }

    renderWorkflowStep({
        isClickable,
        isDisabled
    }: {
        isClickable: boolean;
        isDisabled?: boolean;
    }) {
        const { theme: propsTheme, shouldHighlight, workflowStepNode } = this.props;
        const { name, nodeType, displayWarning } = workflowStepNode;

        const theme = propsTheme || workflowStepConfig[nodeType].theme; // TODO: need to test this

        const renderedName: string = (messages as {[key: string]: string})[nodeType]
            ? (messages as {[key: string]: string})[nodeType] : name;

        const boxContainerClassName = isClickable
            ? classNames(styles.boxContainer, styles.hoverable) : styles.boxContainer;

        // TODO: the outer div seems to be missing a lot of properties, like role="button"
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
                    {displayWarning && <WarningIcon />}
                    <Icon type={nodeType} />
                    {this.renderTooltippedDisplayName({ name: renderedName, isClickable })}
                </div>
            </div>
        );
    }

    renderInDropdownConditionally(children: ReactNode, isClickable: boolean) {
        const { workflowStepNode } = this.props;
        const {
            nodeType, id, workflowUid, nextSteps, prevSteps
        } = workflowStepNode;


        // TODO: the following is different from project code
        const editMenuProps = {
            ...workflowStepConfig[nodeType].options,
            type: nodeType,
            workflowStepUid: id,
            workflowUid,
            nextSteps,
            prevSteps
        };

        return isClickable ? (
            <Dropdown
                closeOnClick={false}
                onOpen={this.boundOpenDropdownMenu}
                onClose={this.boundCloseDropdownMenu}
                component={DropdownComponent}
            >
                {children}
            </Dropdown>
        ) : children;
    }

    renderInTooltipConditionally(children: ReactNode, condition: boolean) {
        const { workflowStepNode, stepDisabledMessage } = this.props;
        const { displayWarning } = workflowStepNode;
        const tooltipContent = displayWarning || stepDisabledMessage || messages.stepIsDisabled;
        return condition ? (
            <Tooltip
                placement="top"
                tooltipContent={tooltipContent}
                tooltipTitleClassName={styles.boxContainerTooltip}
            >
                {children}
            </Tooltip>
        ) : children;
    }

    render() {
        const { workflowStepNode } = this.props;
        const { nodeType, isDisabled, displayWarning } = workflowStepNode;
        const hasOption = Object.values(workflowStepConfig[nodeType].options).reduce(
            (acc: boolean, curr: boolean) => acc || curr,
            false
        );

        // TODO: need to change the config so it doesn't explicitly identify what the options are
        const isClickable = !isDisabled && hasOption;

        return this.renderInTooltipConditionally(
            this.renderInDropdownConditionally(
                this.renderWorkflowStep({ isClickable, isDisabled }),
                isClickable
            ),
            !!displayWarning || isDisabled
        );
    }
}


const initialState: State = {
    dropdownMenuOpened: false,
    displayTooltip: false
};
const reducer = (state: State, action: any) => {
    switch (action.type) {
    case "CLOSE_DROPDOWN_MENU":
        return { ...state, dropdownMenuOpened: false };
    case "OPEN_DROPDOWN_MENU":
        return { ...state, dropdownMenuOpened: true };
    case "HIDE_TOOLTIP":
        return { ...state, displayTooltip: false };
    case "DISPLAY_TOOLTIP":
        return { ...state, dropdownMenuOpened: true };
    default:
        return state;
    }
};

const WorkflowStepContext = createContext({
    dispatch: ({ type }: {type: string}) => {},
    dropdownMenuOpened: initialState.dropdownMenuOpened,
    displayTooltip: initialState.displayTooltip
});


const DisplayName = ({
    displayName, isClickable
}: {
    displayName: string;
    isClickable: boolean;
}) => {
    const { dispatch, dropdownMenuOpened } = useContext(WorkflowStepContext);

    const handleTruncate = useCallback(
        (truncated: boolean) => {
            const type = truncated ? "DISPLAY_TOOLTIP" : "HIDE_TOOLTIP";
            dispatch({ type });
        },
        [dispatch]
    );
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
            <Truncate onTruncate={handleTruncate}>
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


const TooltipedDisplayName = (
    { name, isClickable }: { name: string; isClickable: boolean }
) => {
    const { displayTooltip } = useContext(WorkflowStepContext);

    return displayTooltip ? (
        <Tooltip
            className={styles.boxTooltip}
            placement="top"
            tooltipContent={name}
        >
            <DisplayName
                displayName={name}
                isClickable={isClickable}
            />
        </Tooltip>
    ) : (
        <DisplayName
            displayName={name}
            isClickable={isClickable}
        />
    );
};


const WorkflowStepNew = ({
    tileId, stepDisabledMessage, shouldHighlight, theme
}: any) => {
    const { workflowStepNodes } = useContext(WorkflowVisContext);
    const workflowStepNode = workflowStepNodes[tileId];

    const [state, dispatch] = useReducer(reducer, initialState);
    const { dropdownMenuOpened, displayTooltip } = state;
    const {
        name, nodeType, displayWarning, isDisabled
    } = workflowStepNode;
    const actualTheme = theme || workflowStepConfig[nodeType].theme; // TODO: need to test this
    const renderedName: string = (messages as {[key: string]: string})[nodeType]
        ? (messages as {[key: string]: string})[nodeType] : name;

    // TODO: need to change the config so it doesn't explicitly identify what the options are
    const hasOption = Object.values(workflowStepConfig[nodeType].options).reduce(
        (acc: boolean, curr: boolean) => acc || curr,
        false
    );
    const isClickable = !isDisabled && hasOption;
    const boxContainerClassName = isClickable
        ? classNames(styles.boxContainer, styles.hoverable) : styles.boxContainer;

    // TODO: the outer div seems to be missing a lot of properties, like role="button"
    return (
        <div className={boxContainerClassName}>
            <div
                className={classNames(
                    { [styles.workflowStepDisabled]: isDisabled },
                    { [styles.highlighted]: shouldHighlight },
                    styles.box,
                    styles.flexContainer,
                    styles[`theme${actualTheme}`]
                )}
            >
                {displayWarning && <WarningIcon />}
                <Icon type={nodeType} />
                <WorkflowStepContext.Provider
                    value={{ dispatch, dropdownMenuOpened, displayTooltip }}
                >
                    <TooltipedDisplayName
                        name={renderedName}
                        isClickable={isClickable}
                    />
                </WorkflowStepContext.Provider>
            </div>
        </div>
    );
};

export default WorkflowStep;
