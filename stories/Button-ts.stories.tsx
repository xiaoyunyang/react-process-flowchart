import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

export const Button = ({text}: {text: string}) => <button>{text}</button>;

storiesOf("Button-ts", module)
  .add("with text", () => (
    <Button text={text("label", "Label")} />
  ))
  .add("with some emoji", () => (
    <Button text="😀 😎 👍 💯" />
  ));