import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'refactico-ds',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'theme', dest: 'theme' },
      ],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: 'theme', dest: 'build/theme' },
      ],
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
  globalStyle: 'src/theme/theme.css',
};
