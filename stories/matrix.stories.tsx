import React from 'react';
import classNames from "classnames";
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import WorkflowVis from "../src/lib/components/WorkflowVis";
import { encodedWorkflowStepType } from "../src/config/examples/workflowTypes.cicd";

// Mocks
import { workflowVisData, matrices } from "../src/mocks/mockMatrices";

// Styles
import styles from "../src/lib/styles/workflowVis.module.css";
import storyBoookStyles from "./storybook.module.css";


const {matrix} = matrices[0];

export const Button = ({text}: {text: string}) => <button>{text}</button>;
const noop = () => () => "foo";

storiesOf("Workflow Matrix", module)
  .add("with text", () => (
    <div className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper)}>
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