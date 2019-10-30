
// Libraries
import React from 'react';
import classNames from "classnames";
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

// Components
import WorkflowStep from "../src/lib/components/WorkflowStep";

// Config
import { encodedWorkflowStepType, ThemeT } from "../src/config";

// Styles
import styles from "../src/lib/styles/workflowVis.module.css";
import storyBoookStyles from "./storybook.module.css";

export const Button = ({text}: {text: string}) => <button>{text}</button>;

const themeOptions = {
  DARK: ThemeT.DARK,
  LIGHT: ThemeT.LIGHT
}

const nodeTypeOptions = encodedWorkflowStepType;

storiesOf("WorkflowStep", module)
  .add("No Popover", () => (
    <div className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper)}>
      <WorkflowStep 
        name={text("name", "Translation")}
        type={select("Node Type", nodeTypeOptions, encodedWorkflowStepType[0])}
        theme={select("Theme", themeOptions, ThemeT.LIGHT)}
      />
    </div>
  ));