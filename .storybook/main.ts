const config = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-docs',
    ],
    framework: {
      name: '@stencil/storybook-plugin',
    },
    // Disable auto-generating docs for components without stories
    docs: {
      autodocs: 'tag',
    },
  };
  
  export default config;