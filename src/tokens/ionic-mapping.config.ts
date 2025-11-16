/**
 * Configuration for mapping Ionic CSS variables to our design system tokens
 * This file defines how to generate ionic-bridge.css
 * 
 * To modify mappings, edit this file and run: npm run generate:ionic-mapping
 */

// Type definitions (for TypeScript)
export interface ColorMapping {
  ionic: string;      // Ionic color name (e.g., 'primary', 'secondary')
  rToken: string;     // Our token name (e.g., 'interactive-primary', 'success')
}

export interface MappingPattern {
  ionicPattern: string;    // Pattern with {name} placeholder
  rTokenPattern: string;   // Pattern with {name} placeholder
  colors?: string[];       // Apply to these colors (if pattern-based)
}

export interface DirectMapping {
  ionic: string;      // Exact Ionic variable name
  rToken: string;     // Exact our token name
}

// Export for ES modules
export const ionicMappingConfig = {
  // Color system mappings (pattern-based)
  colorMappings: [
    { ionic: 'primary', rToken: 'interactive-primary' },
    { ionic: 'secondary', rToken: 'interactive-secondary' },
    { ionic: 'success', rToken: 'success' },
    { ionic: 'warning', rToken: 'warning' },
    { ionic: 'danger', rToken: 'error' },
    { ionic: 'dark', rToken: 'text-primary' },
    { ionic: 'light', rToken: 'bg-surface-secondary' },
    { ionic: 'medium', rToken: 'text-secondary' },
  ] as ColorMapping[],

  // Pattern-based mappings (auto-generate for each color)
  patterns: [
    {
      ionicPattern: '--ion-color-{name}',
      rTokenPattern: '--r-color-{name}',
      colors: ['primary', 'secondary', 'success', 'warning', 'danger', 'dark', 'light', 'medium'],
    },
    {
      ionicPattern: '--ion-color-{name}-rgb',
      rTokenPattern: '--r-color-{name}-rgb',
      colors: ['primary', 'secondary', 'success', 'warning', 'danger', 'dark', 'light', 'medium'],
    },
    {
      ionicPattern: '--ion-color-{name}-shade',
      rTokenPattern: '--r-color-{name}-shade',
      colors: ['primary', 'secondary', 'success', 'warning', 'danger'],
    },
    {
      ionicPattern: '--ion-color-{name}-tint',
      rTokenPattern: '--r-color-{name}-tint',
      colors: ['primary', 'secondary', 'success', 'warning', 'danger'],
    },
    {
      ionicPattern: '--ion-color-{name}-contrast',
      rTokenPattern: '--r-color-text-on-interactive',
      colors: ['primary', 'secondary'], // Only primary/secondary use text-on-interactive
    },
    {
      ionicPattern: '--ion-color-{name}-contrast-rgb',
      rTokenPattern: '--r-color-text-on-interactive-rgb',
      colors: ['primary', 'secondary'],
    },
  ] as MappingPattern[],

  // Direct mappings (special cases, no pattern)
  directMappings: [
    // Background
    { ionic: '--ion-background-color', rToken: '--r-color-bg-surface' },
    { ionic: '--ion-background-color-rgb', rToken: '--r-color-bg-surface-rgb' },
    
    // Text
    { ionic: '--ion-text-color', rToken: '--r-color-text-primary' },
    { ionic: '--ion-text-color-rgb', rToken: '--r-color-text-primary-rgb' },
    { ionic: '--ion-text-color-step-50', rToken: '--r-color-text-secondary' },
    { ionic: '--ion-text-color-step-100', rToken: '--r-color-text-disabled' },
    { ionic: '--ion-text-color-step-150', rToken: '--r-color-text-disabled' },
    { ionic: '--ion-text-color-step-200', rToken: '--r-color-text-disabled' },
    { ionic: '--ion-text-color-step-250', rToken: '--r-color-text-disabled' },
    { ionic: '--ion-text-color-step-300', rToken: '--r-color-text-disabled' },
    { ionic: '--ion-text-color-step-350', rToken: '--r-color-text-disabled' },
    { ionic: '--ion-text-color-step-400', rToken: '--r-color-text-disabled' },
    { ionic: '--ion-text-color-step-450', rToken: '--r-color-text-disabled' },
    { ionic: '--ion-text-color-step-500', rToken: '--r-color-text-secondary' },
    { ionic: '--ion-text-color-step-550', rToken: '--r-color-text-secondary' },
    { ionic: '--ion-text-color-step-600', rToken: '--r-color-text-secondary' },
    { ionic: '--ion-text-color-step-650', rToken: '--r-color-text-secondary' },
    { ionic: '--ion-text-color-step-700', rToken: '--r-color-text-primary' },
    { ionic: '--ion-text-color-step-750', rToken: '--r-color-text-primary' },
    { ionic: '--ion-text-color-step-800', rToken: '--r-color-text-primary' },
    { ionic: '--ion-text-color-step-850', rToken: '--r-color-text-primary' },
    { ionic: '--ion-text-color-step-900', rToken: '--r-color-text-primary' },
    { ionic: '--ion-text-color-step-950', rToken: '--r-color-text-primary' },
    
    // Typography
    { ionic: '--ion-font-family', rToken: '--r-typography-font-family-primary' },
    { ionic: '--ion-font-size-base', rToken: '--r-typography-font-size-base' },
    
    // Spacing/Layout
    { ionic: '--ion-padding', rToken: '--r-spacing-4' },
    { ionic: '--ion-margin', rToken: '--r-spacing-4' },
    { ionic: '--ion-border-color', rToken: '--r-color-border-default' },
    { ionic: '--ion-border-width', rToken: '--r-border-width-base' },
    { ionic: '--ion-border-radius', rToken: '--r-border-radius-base' },
    { ionic: '--ion-border-style', rToken: 'solid' },
  ] as DirectMapping[],
};

// CommonJS export for ts-node compatibility (when loaded via require)
// This allows the file to work with both ES modules and CommonJS
declare const module: any;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ionicMappingConfig };
  module.exports.ionicMappingConfig = ionicMappingConfig;
}

