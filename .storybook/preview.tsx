// .storybook/preview.tsx
import { defineCustomElements } from '../loader/index.js';
import { setCustomElementsManifest } from '@stencil/storybook-plugin';
import customElements from '../custom-elements.json';

// Import the bundled theme CSS (same as end users will import)
import '../dist/theme.css';

/**
 * Registers all custom elements in the Storybook preview.
 */
defineCustomElements();

/**
 * Loads and registers component metadata for Storybook.
 * This enables automatic generation of props, methods, events, slots, shadow parts, and CSS variables tables.
 */
setCustomElementsManifest(customElements);