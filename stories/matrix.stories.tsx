import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import WorkflowVis from "../src/lib/components/WorkflowVis";
import { encodedWorkflowStepType } from "../src/config/examples/workflowTypes.cicd";

import { workflowVisData, matrices } from "../src/mocks/mockMatrices";
import styles from "../src/lib/styles/workflowVis.module.css";


const {matrix} = matrices[0];

export const Button = ({text}: {text: string}) => <button>{text}</button>;
const noop = () => () => "foo";

storiesOf("Workflow Matrix", module)
  .add("with text", () => (
    <div className={styles.flowchart}>
      <WorkflowVis
        matrix={matrix}
        workflowVisData={workflowVisData}
        editMode={false}
        addNodeParams={noop}
      />
    </div>
  ))
  .add("with some emoji", () => (
    <Button text="😀 😎 👍 💯" />
  ));