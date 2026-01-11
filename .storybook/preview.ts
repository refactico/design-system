import type { Preview } from '@storybook/web-components-vite';
import '../src/theme/theme.css';

// Dynamically set the asset path before loading components
const script = document.createElement('script');
script.type = 'module';

const basePath = window.location.hostname === 'localhost' 
  ? '/build/' 
  : '/design-system/build/';

script.textContent = `
  import { defineCustomElements } from '${basePath}refactico-ds.esm.js';
  defineCustomElements();
`;
document.head.appendChild(script);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f9fafb' },
        { name: 'dark', value: '#111827' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme;
      document.documentElement.classList.toggle('dark', theme === 'dark');
      return story();
    },
  ],
  // Automatically log args that start with "on" as actions
  argTypesEnhancers: [
    (context) => {
      const argTypes = context.argTypes;
      Object.keys(argTypes).forEach((key) => {
        if (key.startsWith('on')) {
          argTypes[key] = {
            ...argTypes[key],
            action: key,
          };
        }
      });
      return argTypes;
    },
  ],
};

export default preview;
