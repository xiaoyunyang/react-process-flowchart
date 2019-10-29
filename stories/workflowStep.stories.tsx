import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

import WorkflowStep from "../src/lib/components/WorkflowStep";
import { encodedWorkflowStepType, ThemeT } from "../src/config";
import styles from "../src/lib/styles/workflowVis.module.css";

export const Button = ({text}: {text: string}) => <button>{text}</button>;

const themeOptions = {
  DARK: ThemeT.DARK,
  LIGHT: ThemeT.LIGHT
}

const nodeTypeOptions = encodedWorkflowStepType;

storiesOf("WorkflowStep", module)
  .add("No Popover", () => (
    <div className={styles.flowchart}>
      <WorkflowStep 
        name={text("name", "Translation")}
        type={select("Node Type", nodeTypeOptions, encodedWorkflowStepType[0])}
        theme={select("Theme", themeOptions, ThemeT.LIGHT)}
      />
    </div>
  ));