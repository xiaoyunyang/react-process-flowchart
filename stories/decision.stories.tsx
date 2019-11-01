import React from 'react';
import classNames from "classnames";
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import DecisionStep from "../src/lib/components/DecisionStep";

// Styles
// TS complains about module not found when we try to import
// the css modules without the .d.ts files present. The workaround
// is to use require.
const styles = require<any>('../src/lib/styles/workflowVis.module.css');
const storyBoookStyles = require<any>('./storybook.module.css');



const storyWrapperClass = classNames(
  styles.flowchart,
  storyBoookStyles.storybookWrapper,
  storyBoookStyles.workflowStepWrapper
);

storiesOf("DecisionStep", module)
  .add("DecisionStep", () => (
    <div className={storyWrapperClass}>
      <DecisionStep />
    </div>
  ))
  