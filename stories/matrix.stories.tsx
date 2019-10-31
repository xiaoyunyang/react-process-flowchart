import React from 'react';
import classNames from "classnames";
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import WorkflowVis from "../src/lib/components/WorkflowVis";
import { encodedWorkflowStepType } from "../src/config/examples/workflowTypes.cicd";

// Mocks
import { workflowVisData, matrices } from "../src/mocks/mockMatrices";

// Styles
// TS complains about module not found when we try to import
// the css modules without the .d.ts files present. The workaround
// is to use require.
const styles = require<any>('../src/lib/styles/workflowVis.module.css');
const storyBoookStyles = require<any>('./storybook.module.css');

const { matrix } = matrices[0];

export const Button = ({text}: {text: string}) => <button>{text}</button>;
const noop = () => () => "foo";

storiesOf("WorkflowVis", module)
  .add("Linear", () => (
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