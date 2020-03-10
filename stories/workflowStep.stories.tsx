// Libraries
import React from 'react';
import classNames from "classnames";
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

// Components
import WorkflowStep from "../src/lib/components/WorkflowStep";

// Config
import { 
  encodedNodeType, Theme,
  messages
} from "../src/config";


// Styles
// TS complains about module not found when we try to import
// the css modules without the .d.ts files present. The workaround
// is to use require.
const styles = require<any>('../src/lib/styles/workflowVis.module.css');
const storyBoookStyles = require<any>('./storybook.module.css');


export const Button = ({text}: {text: string}) => <button>{text}</button>;

const themeOptions = {
  DARK: Theme.DARK,
  LIGHT: Theme.LIGHT
}

const nodeTypeOptions = encodedNodeType;

const storyWrapperClass = classNames(
  styles.flowchart,
  storyBoookStyles.storybookWrapper,
  storyBoookStyles.workflowStepWrapper
);

storiesOf("WorkflowStep", module)
  .add("WorkflowStep", () => (
    <div className={storyWrapperClass}>
      <WorkflowStep 
        name={text("name", "Translation")}
        type={select("Node Type", nodeTypeOptions, encodedNodeType[0])}
        workflowUid="foo"
        workflowStepUid="fooStep"
        nextSteps={[]}
        prevSteps={[]}
        theme={select("Theme", themeOptions, Theme.LIGHT)}
        isDisabled={boolean("isDisabled", false)}
        stepDisabledMessage={text("disabledMessage", "Step is disabled")}
        shouldHighlight={boolean("shouldHighlight", false)}
        displayWarning={text("Display Warning", "This step has warning")}
      />
    </div>
  ));