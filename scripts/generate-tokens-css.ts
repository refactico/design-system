/**
 * Generates CSS variables from TypeScript token definitions
 * Uses naming conventions to automatically generate CSS without manual mapping
 * Outputs to src/themes/tokens.css (generated file)
 * Run: npm run generate:tokens-css
 * 
 * Color variables follow Ionic's exact naming: --r-color-* (replacing --ion-color-*)
 */

import * as fs from 'fs';
import * as path from 'path';

// Import token definitions
const { colors } = require('../src/tokens/colors');
const { spacing } = require('../src/tokens/spacing');
const { typography } = require('../src/tokens/typography');
const { borders } = require('../src/tokens/borders');
const { shadows } = require('../src/tokens/shadows');

const outputPath = path.join(__dirname, '../src/themes/tokens.css');

/**
 * Converts camelCase to kebab-case
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generates CSS variables from a flat object using naming convention
 * Convention: key → --r-{prefix}-{key}
 */
function generateFromObject(obj: Record<string, any>, prefix: string): string {
  let css = '';
  Object.entries(obj).forEach(([key, value]) => {
    const cssVar = `--r-${prefix}-${toKebabCase(key)}`;
    css += `  ${cssVar}: ${value};\n`;
  });
  return css;
}

/**
 * Generates color CSS variables matching Ionic's exact naming
 * Convention: Follows Ionic's --ion-color-* pattern but with --r- prefix
 * Examples:
 *   primary → --r-color-primary
 *   background.surface → --r-background-color
 *   text.primary → --r-text-color
 */
function generateColorVariables(): string {
  let css = '';
  
  // Color system (matches Ionic exactly)
  css += `  /* Color System - matches Ionic naming */\n`;
  css += `  --r-color-primary: ${colors.interactive.primaryHex};\n`;
  css += `  --r-color-primary-rgb: ${colors.interactive.primary.replace(/ /g, ', ')};\n`;
  css += `  --r-color-primary-shade: ${colors.interactive.primaryShadeHex};\n`;
  css += `  --r-color-primary-tint: ${colors.interactive.primaryTintHex};\n`;
  css += `  --r-color-primary-contrast: ${colors.text.onInteractiveHex};\n`;
  css += `  --r-color-primary-contrast-rgb: ${colors.text.onInteractive.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  css += `  --r-color-secondary: ${colors.interactive.secondaryHex};\n`;
  css += `  --r-color-secondary-rgb: ${colors.interactive.secondary.replace(/ /g, ', ')};\n`;
  css += `  --r-color-secondary-shade: ${colors.interactive.secondaryShadeHex};\n`;
  css += `  --r-color-secondary-tint: ${colors.interactive.secondaryTintHex};\n`;
  css += `  --r-color-secondary-contrast: ${colors.text.onInteractiveHex};\n`;
  css += `  --r-color-secondary-contrast-rgb: ${colors.text.onInteractive.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  css += `  --r-color-success: ${colors.success.baseHex};\n`;
  css += `  --r-color-success-rgb: ${colors.success.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-success-shade: ${colors.success.shadeHex};\n`;
  css += `  --r-color-success-tint: ${colors.success.tintHex};\n`;
  css += `\n`;
  
  css += `  --r-color-warning: ${colors.warning.baseHex};\n`;
  css += `  --r-color-warning-rgb: ${colors.warning.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-warning-shade: ${colors.warning.shadeHex};\n`;
  css += `  --r-color-warning-tint: ${colors.warning.tintHex};\n`;
  css += `\n`;
  
  css += `  --r-color-danger: ${colors.error.baseHex};\n`;
  css += `  --r-color-danger-rgb: ${colors.error.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-danger-shade: ${colors.error.shadeHex};\n`;
  css += `  --r-color-danger-tint: ${colors.error.tintHex};\n`;
  css += `\n`;
  
  css += `  --r-color-dark: ${colors.text.primaryHex};\n`;
  css += `  --r-color-dark-rgb: ${colors.text.primary.replace(/ /g, ', ')};\n`;
  css += `  --r-color-dark-shade: ${colors.text.primaryHex};\n`;
  css += `  --r-color-dark-tint: ${colors.text.primaryHex};\n`;
  css += `  --r-color-dark-contrast: ${colors.background.surfaceHex};\n`;
  css += `  --r-color-dark-contrast-rgb: ${colors.background.surface.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  css += `  --r-color-light: ${colors.background.surfaceSecondaryHex};\n`;
  css += `  --r-color-light-rgb: ${colors.background.surfaceSecondary.replace(/ /g, ', ')};\n`;
  css += `  --r-color-light-shade: ${colors.background.surfaceSecondaryHex};\n`;
  css += `  --r-color-light-tint: ${colors.background.surfaceSecondaryHex};\n`;
  css += `  --r-color-light-contrast: ${colors.text.primaryHex};\n`;
  css += `  --r-color-light-contrast-rgb: ${colors.text.primary.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  css += `  --r-color-medium: ${colors.text.secondaryHex};\n`;
  css += `  --r-color-medium-rgb: ${colors.text.secondary.replace(/ /g, ', ')};\n`;
  css += `  --r-color-medium-shade: ${colors.text.secondaryHex};\n`;
  css += `  --r-color-medium-tint: ${colors.text.secondaryHex};\n`;
  css += `  --r-color-medium-contrast: ${colors.background.surfaceHex};\n`;
  css += `  --r-color-medium-contrast-rgb: ${colors.background.surface.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  // Background (matches Ionic exactly)
  css += `  /* Background - matches Ionic naming */\n`;
  css += `  --r-background-color: ${colors.background.surfaceHex};\n`;
  css += `  --r-background-color-rgb: ${colors.background.surface.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  // Text colors (matches Ionic exactly)
  css += `  /* Text Colors - matches Ionic naming */\n`;
  css += `  --r-text-color: ${colors.text.primaryHex};\n`;
  css += `  --r-text-color-rgb: ${colors.text.primary.replace(/ /g, ', ')};\n`;
  css += `  --r-text-color-step-50: ${colors.text.secondaryHex};\n`;
  css += `  --r-text-color-step-100: ${colors.text.disabledHex};\n`;
  css += `  --r-text-color-step-150: ${colors.text.disabledHex};\n`;
  css += `  --r-text-color-step-200: ${colors.text.disabledHex};\n`;
  css += `  --r-text-color-step-250: ${colors.text.disabledHex};\n`;
  css += `  --r-text-color-step-300: ${colors.text.disabledHex};\n`;
  css += `  --r-text-color-step-350: ${colors.text.disabledHex};\n`;
  css += `  --r-text-color-step-400: ${colors.text.disabledHex};\n`;
  css += `  --r-text-color-step-450: ${colors.text.disabledHex};\n`;
  css += `  --r-text-color-step-500: ${colors.text.secondaryHex};\n`;
  css += `  --r-text-color-step-550: ${colors.text.secondaryHex};\n`;
  css += `  --r-text-color-step-600: ${colors.text.secondaryHex};\n`;
  css += `  --r-text-color-step-650: ${colors.text.secondaryHex};\n`;
  css += `  --r-text-color-step-700: ${colors.text.primaryHex};\n`;
  css += `  --r-text-color-step-750: ${colors.text.primaryHex};\n`;
  css += `  --r-text-color-step-800: ${colors.text.primaryHex};\n`;
  css += `  --r-text-color-step-850: ${colors.text.primaryHex};\n`;
  css += `  --r-text-color-step-900: ${colors.text.primaryHex};\n`;
  css += `  --r-text-color-step-950: ${colors.text.primaryHex};\n`;
  css += `\n`;
  
  // Border colors (matches Ionic exactly)
  css += `  /* Border Colors - matches Ionic naming */\n`;
  css += `  --r-border-color: ${colors.border.defaultHex};\n`;
  css += `\n`;

  return css;
}

function generateTokensCSS(): string {
  let css = `/* Auto-generated Tokens CSS - DO NOT EDIT MANUALLY */
/* Generated from: src/tokens/*.ts */
/* To regenerate: npm run generate:tokens-css */

/* Base tokens (spacing, typography, borders, shadows) - same for all themes */
:root {
`;

  // Spacing tokens - automatic generation
  css += `  /* Spacing Scale (4px base) */\n`;
  css += generateFromObject(spacing, 'spacing');
  css += `\n`;

  // Typography tokens - automatic generation
  css += `  /* Typography */\n`;
  css += generateFromObject(typography.fontFamily, 'typography-font-family');
  css += generateFromObject(typography.fontSize, 'typography-font-size');
  css += generateFromObject(typography.fontWeight, 'typography-font-weight');
  css += generateFromObject(typography.lineHeight, 'typography-line-height');
  css += `\n`;

  // Border tokens - automatic generation
  css += `  /* Borders */\n`;
  css += generateFromObject(borders.radius, 'border-radius');
  css += generateFromObject(borders.width, 'border-width');
  css += `\n`;

  // Shadow tokens - automatic generation
  css += `  /* Shadows */\n`;
  css += generateFromObject(shadows, 'shadow');
  css += `\n`;

  // Color tokens - matches Ionic naming exactly
  css += generateColorVariables();

  // Typography (matches Ionic exactly)
  css += `  /* Typography - matches Ionic naming */\n`;
  css += `  --r-font-family: ${typography.fontFamily.primary};\n`;
  css += `  --r-font-size-base: ${typography.fontSize.base};\n`;
  css += `\n`;

  // Spacing (matches Ionic exactly)
  css += `  /* Spacing - matches Ionic naming */\n`;
  css += `  --r-padding: ${spacing[4]};\n`;
  css += `  --r-margin: ${spacing[4]};\n`;
  css += `\n`;

  // Borders (matches Ionic exactly)
  css += `  /* Borders - matches Ionic naming */\n`;
  css += `  --r-border-width: ${borders.width.base};\n`;
  css += `  --r-border-radius: ${borders.radius.base};\n`;
  css += `  --r-border-style: solid;\n`;

  css += `}\n\n`;

  return css;
}

// Generate and write file
const css = generateTokensCSS();
fs.writeFileSync(outputPath, css, 'utf-8');

const variableCount = css.split('--r-').length - 1;

console.log('✅ Generated tokens.css');
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 Total CSS variables: ${variableCount}`);
