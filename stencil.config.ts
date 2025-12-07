import { Config } from '@stencil/core';

// Disable source maps in dev mode to avoid Windows path length issues with long filenames
// Stencil config files run in Node.js, so process is available at runtime
declare const process: { argv: string[] };

const isDev = process.argv.includes('--dev') || process.argv.includes('--watch');
const enableSourceMaps = !isDev; // Only enable source maps in production builds

export const config: Config = {
  namespace: 'refactico',
  globalStyle: 'src/global/theme.css',
  sourceMap: enableSourceMaps,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
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
      serviceWorker: null, // disable service workers
    },
    {
      type: 'docs-json',
      file: './custom-elements.json',
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
};