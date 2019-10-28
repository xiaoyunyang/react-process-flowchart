import React from 'react';
import { storiesOf } from '@storybook/react';


export const Button = ({text}: {text: string}) => <button>{text}</button>;


storiesOf("Button-ts", module)
  .add("with text", () => (
    <Button text="Hello Button" />
  ))
  .add("with some emoji", () => (
    <Button text="😀 😎 👍 💯" />
  ));