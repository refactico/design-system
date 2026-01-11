import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/web-components-vite',
  staticDirs: [
    { from: '../dist/refactico-ds', to: '/build' },
  ],
  viteFinal: async (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.base = '/design-system/';
    }
    return config;
  },
};
export default config;