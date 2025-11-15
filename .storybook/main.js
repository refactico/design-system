/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../www'],
  typescript: {
    check: false,
  },
  webpackFinal: async (config) => {
    // Find the existing TypeScript rule and update it
    const tsRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('tsx?')
    );
    
    if (tsRule) {
      // Update existing rule
      tsRule.use = [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
            compilerOptions: {
              jsx: 'react',
            },
          },
        },
      ];
    } else {
      // Add new rule if not found
      config.module.rules.push({
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
              compilerOptions: {
                jsx: 'react',
              },
            },
          },
        ],
      });
    }
    
    return config;
  },
};

export default config;

