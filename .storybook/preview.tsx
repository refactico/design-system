// .storybook/preview.tsx
import { defineCustomElements } from '../loader/index.js';
import { setCustomElementsManifest } from '@stencil/storybook-plugin';
import customElements from '../custom-elements.json';

// Import the bundled theme CSS (same as end users will import)
// dist/theme.css is generated during build (npm run build or npm run bundle:theme)
import '../dist/theme.css';

/**
 * Registers all custom elements in the Storybook preview.
 */
defineCustomElements();

/**
 * Loads and registers component metadata for Storybook.
 * This enables automatic generation of props, methods, events, slots, shadow parts, and CSS variables tables.
 * Filter out any components that don't have story files (like r-action-sheet which was removed)
 */
const filteredCustomElements = {
  ...customElements,
  components: customElements.components.filter((component: any) => {
    // Only include components that have story files or are not r-action-sheet
    const tag = component.tag || '';
    return tag !== 'r-action-sheet';
  }),
};
setCustomElementsManifest(filteredCustomElements);

/**
 * Theme decorator - applies theme classes to document
 * Integrates with Storybook's background addon for light/dark themes
 * Ionic uses html.ios or html.md classes for platform themes
 * Our design system uses data-theme="light" or data-theme="dark" for color themes
 */
const themeDecorator = (storyFn: any, context: any) => {
  // Get theme from Storybook's background addon (syncs with background control)
  // Storybook stores background in globals.backgrounds.value or we can check the background name
  const backgrounds = context?.globals?.backgrounds;
  let theme = 'light';
  
  if (backgrounds) {
    // Check if background value matches dark theme color
    const bgValue = backgrounds.value || '';
    const bgName = backgrounds.name || '';
    
    // Match by color value or name
    if (bgValue === '#1a1a1a' || bgName === 'dark' || bgValue.includes('1a1a1a')) {
      theme = 'dark';
    }
  }
  
  // Get platform from our custom control
  const platform = context?.globals?.platform || 'ios';
  
  // Apply theme to html element
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    
    // Remove existing theme attributes and platform classes
    html.removeAttribute('data-theme');
    html.classList.remove('ios', 'md');
    
    // Apply color theme (light/dark) - synced with Storybook background
    html.setAttribute('data-theme', theme);
    
    // Apply platform class (ios/md) for Ionic styling
    html.classList.add(platform);
  }
  
  return storyFn();
};

export const decorators = [themeDecorator];

export const globalTypes = {
  platform: {
    name: 'Platform',
    description: 'Ionic platform theme',
    defaultValue: 'ios',
    toolbar: {
      icon: 'mobile',
      items: [
        { value: 'ios', title: 'iOS' },
        { value: 'md', title: 'Material Design' },
      ],
      showName: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#1a1a1a',
      },
    ],
  },
};