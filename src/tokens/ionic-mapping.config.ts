/**
 * Configuration for mapping Ionic CSS variables to our design system tokens
 * This file defines how to generate ionic-bridge.css
 * 
 * To modify mappings, edit this file and run: npm run generate:ionic-mapping
 */

/**
 * Maps an Ionic color name to our design system token name.
 * Used to translate Ionic's color system to our semantic token names.
 * 
 * @example
 * { ionic: 'primary', rToken: 'interactive-primary' }
 * { ionic: 'success', rToken: 'success' }
 */
export interface ColorMapping {
  /** Ionic color name (e.g., 'primary', 'secondary', 'success') */
  ionic: string;
  /** Our design system token name (e.g., 'interactive-primary', 'success') */
  rToken: string;
}

/**
 * Defines a pattern-based mapping that generates multiple CSS variable mappings.
 * Uses {name} placeholder to generate mappings for multiple colors at once.
 * 
 * @example
 * {
 *   ionicPattern: '--ion-color-{name}',
 *   rTokenPattern: '--r-color-{name}',
 *   colors: ['primary', 'secondary']
 * }
 * // Generates:
 * // --ion-color-primary: var(--r-color-primary);
 * // --ion-color-secondary: var(--r-color-secondary);
 */
export interface MappingPattern {
  /** Pattern for Ionic variable with {name} placeholder */
  ionicPattern: string;
  /** Pattern for our token with {name} placeholder */
  rTokenPattern: string;
  /** Optional: Apply pattern to these specific colors. If omitted, applies to all colors. */
  colors?: string[];
}

/**
 * Direct mapping from an Ionic CSS variable to our design system token.
 * Used for one-to-one mappings that don't follow a pattern.
 * 
 * @example
 * { ionic: '--ion-background-color', rToken: '--r-color-bg-surface' }
 * { ionic: '--ion-text-color', rToken: '--r-color-text-primary' }
 */
export interface DirectMapping {
  /** Exact Ionic CSS variable name (e.g., '--ion-background-color') */
  ionic: string;
  /** Exact our design system token name (e.g., '--r-color-bg-surface') */
  rToken: string;
}

// Export for ES modules
export const ionicMappingConfig = {
  // Pattern-based mappings (auto-generate for each variable)
  // Maps --ion-* to --r-* with exact same names
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
      rTokenPattern: '--r-color-{name}-contrast',
      colors: ['primary', 'secondary', 'dark', 'light', 'medium'],
    },
    {
      ionicPattern: '--ion-color-{name}-contrast-rgb',
      rTokenPattern: '--r-color-{name}-contrast-rgb',
      colors: ['primary', 'secondary', 'dark', 'light', 'medium'],
    },
  ] as MappingPattern[],

  // Direct mappings (special cases, no pattern)
  // Maps --ion-* to --r-* with exact same names (replacing ion- with r-)
  // NOTE: --ion-color-base and --ion-color-contrast are INTERNAL Ionic variables
  // They are automatically set by Ionic's .ion-color-* classes and should NOT be mapped
  directMappings: [
    // Background
    { ionic: '--ion-background-color', rToken: '--r-background-color' },
    { ionic: '--ion-background-color-rgb', rToken: '--r-background-color-rgb' },
    
    // Text colors
    { ionic: '--ion-text-color', rToken: '--r-text-color' },
    { ionic: '--ion-text-color-rgb', rToken: '--r-text-color-rgb' },
    
    // Text color steps (Ionic's opacity system)
    { ionic: '--ion-text-color-step-50', rToken: '--r-text-color-step-50' },
    { ionic: '--ion-text-color-step-100', rToken: '--r-text-color-step-100' },
    { ionic: '--ion-text-color-step-150', rToken: '--r-text-color-step-150' },
    { ionic: '--ion-text-color-step-200', rToken: '--r-text-color-step-200' },
    { ionic: '--ion-text-color-step-250', rToken: '--r-text-color-step-250' },
    { ionic: '--ion-text-color-step-300', rToken: '--r-text-color-step-300' },
    { ionic: '--ion-text-color-step-350', rToken: '--r-text-color-step-350' },
    { ionic: '--ion-text-color-step-400', rToken: '--r-text-color-step-400' },
    { ionic: '--ion-text-color-step-450', rToken: '--r-text-color-step-450' },
    { ionic: '--ion-text-color-step-500', rToken: '--r-text-color-step-500' },
    { ionic: '--ion-text-color-step-550', rToken: '--r-text-color-step-550' },
    { ionic: '--ion-text-color-step-600', rToken: '--r-text-color-step-600' },
    { ionic: '--ion-text-color-step-650', rToken: '--r-text-color-step-650' },
    { ionic: '--ion-text-color-step-700', rToken: '--r-text-color-step-700' },
    { ionic: '--ion-text-color-step-750', rToken: '--r-text-color-step-750' },
    { ionic: '--ion-text-color-step-800', rToken: '--r-text-color-step-800' },
    { ionic: '--ion-text-color-step-850', rToken: '--r-text-color-step-850' },
    { ionic: '--ion-text-color-step-900', rToken: '--r-text-color-step-900' },
    { ionic: '--ion-text-color-step-950', rToken: '--r-text-color-step-950' },
    
    // Typography
    { ionic: '--ion-font-family', rToken: '--r-font-family' },
    { ionic: '--ion-font-size-base', rToken: '--r-font-size-base' },
    
    // Spacing/Layout
    { ionic: '--ion-padding', rToken: '--r-padding' },
    { ionic: '--ion-margin', rToken: '--r-margin' },
    
    // Borders
    { ionic: '--ion-border-color', rToken: '--r-border-color' },
    { ionic: '--ion-border-width', rToken: '--r-border-width' },
    { ionic: '--ion-border-radius', rToken: '--r-border-radius' },
    { ionic: '--ion-border-style', rToken: '--r-border-style' },
  ] as DirectMapping[],
};

// CommonJS export for ts-node compatibility (when loaded via require)
// This allows the file to work with both ES modules and CommonJS
declare const module: any;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ionicMappingConfig };
  module.exports.ionicMappingConfig = ionicMappingConfig;
}

