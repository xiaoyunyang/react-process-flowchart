import { configure, setAddon, addDecorator } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

// Add ons
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from "@storybook/addon-a11y";

addDecorator(withKnobs);
addDecorator(withA11y);

setAddon(JSXAddon);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.(t|j)sx?$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);