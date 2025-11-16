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
 * Converts hex color to RGB array
 */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

/**
 * Converts RGB array to hex color
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Blends two colors with given opacity
 * Formula: result = foreground * opacity + background * (1 - opacity)
 */
function blendColors(
  foregroundHex: string,
  backgroundHex: string,
  opacity: number
): string {
  const fg = hexToRgb(foregroundHex);
  const bg = hexToRgb(backgroundHex);
  
  const r = fg[0] * opacity + bg[0] * (1 - opacity);
  const g = fg[1] * opacity + bg[1] * (1 - opacity);
  const b = fg[2] * opacity + bg[2] * (1 - opacity);
  
  return rgbToHex(r, g, b);
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
 * Generates color CSS variables matching Ionic's exact naming and default values
 * Convention: Follows Ionic's --ion-color-* pattern but with --r- prefix
 */
function generateColorVariables(): string {
  let css = '';
  
  // Color system (matches Ionic defaults exactly)
  css += `  /* Color System - matches Ionic naming and defaults */\n`;
  
  // Primary
  css += `  --r-color-primary: ${colors.primary.baseHex};\n`;
  css += `  --r-color-primary-rgb: ${colors.primary.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-primary-shade: ${colors.primary.shadeHex};\n`;
  css += `  --r-color-primary-tint: ${colors.primary.tintHex};\n`;
  css += `  --r-color-primary-contrast: ${colors.primary.contrastHex};\n`;
  css += `  --r-color-primary-contrast-rgb: ${colors.primary.contrast.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  // Secondary
  css += `  --r-color-secondary: ${colors.secondary.baseHex};\n`;
  css += `  --r-color-secondary-rgb: ${colors.secondary.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-secondary-shade: ${colors.secondary.shadeHex};\n`;
  css += `  --r-color-secondary-tint: ${colors.secondary.tintHex};\n`;
  css += `  --r-color-secondary-contrast: ${colors.secondary.contrastHex};\n`;
  css += `  --r-color-secondary-contrast-rgb: ${colors.secondary.contrast.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  // Tertiary
  css += `  --r-color-tertiary: ${colors.tertiary.baseHex};\n`;
  css += `  --r-color-tertiary-rgb: ${colors.tertiary.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-tertiary-shade: ${colors.tertiary.shadeHex};\n`;
  css += `  --r-color-tertiary-tint: ${colors.tertiary.tintHex};\n`;
  css += `  --r-color-tertiary-contrast: ${colors.tertiary.contrastHex};\n`;
  css += `  --r-color-tertiary-contrast-rgb: ${colors.tertiary.contrast.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  // Success
  css += `  --r-color-success: ${colors.success.baseHex};\n`;
  css += `  --r-color-success-rgb: ${colors.success.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-success-shade: ${colors.success.shadeHex};\n`;
  css += `  --r-color-success-tint: ${colors.success.tintHex};\n`;
  css += `  --r-color-success-contrast: ${colors.success.contrastHex};\n`;
  css += `  --r-color-success-contrast-rgb: ${colors.success.contrast.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  // Warning
  css += `  --r-color-warning: ${colors.warning.baseHex};\n`;
  css += `  --r-color-warning-rgb: ${colors.warning.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-warning-shade: ${colors.warning.shadeHex};\n`;
  css += `  --r-color-warning-tint: ${colors.warning.tintHex};\n`;
  css += `  --r-color-warning-contrast: ${colors.warning.contrastHex};\n`;
  css += `  --r-color-warning-contrast-rgb: ${colors.warning.contrast.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  // Danger
  css += `  --r-color-danger: ${colors.danger.baseHex};\n`;
  css += `  --r-color-danger-rgb: ${colors.danger.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-danger-shade: ${colors.danger.shadeHex};\n`;
  css += `  --r-color-danger-tint: ${colors.danger.tintHex};\n`;
  css += `  --r-color-danger-contrast: ${colors.danger.contrastHex};\n`;
  css += `  --r-color-danger-contrast-rgb: ${colors.danger.contrast.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  // Light
  css += `  --r-color-light: ${colors.light.baseHex};\n`;
  css += `  --r-color-light-rgb: ${colors.light.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-light-shade: ${colors.light.shadeHex};\n`;
  css += `  --r-color-light-tint: ${colors.light.tintHex};\n`;
  css += `  --r-color-light-contrast: ${colors.light.contrastHex};\n`;
  css += `  --r-color-light-contrast-rgb: ${colors.light.contrast.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  // Medium
  css += `  --r-color-medium: ${colors.medium.baseHex};\n`;
  css += `  --r-color-medium-rgb: ${colors.medium.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-medium-shade: ${colors.medium.shadeHex};\n`;
  css += `  --r-color-medium-tint: ${colors.medium.tintHex};\n`;
  css += `  --r-color-medium-contrast: ${colors.medium.contrastHex};\n`;
  css += `  --r-color-medium-contrast-rgb: ${colors.medium.contrast.replace(/ /g, ', ')};\n`;
  css += `\n`;
  
  // Dark
  css += `  --r-color-dark: ${colors.dark.baseHex};\n`;
  css += `  --r-color-dark-rgb: ${colors.dark.base.replace(/ /g, ', ')};\n`;
  css += `  --r-color-dark-shade: ${colors.dark.shadeHex};\n`;
  css += `  --r-color-dark-tint: ${colors.dark.tintHex};\n`;
  css += `  --r-color-dark-contrast: ${colors.dark.contrastHex};\n`;
  css += `  --r-color-dark-contrast-rgb: ${colors.dark.contrast.replace(/ /g, ', ')};\n`;
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
  
  // Text color steps - Ionic uses opacity-based steps (50-950)
  // These represent different opacity levels of text color blended with background
  // Step number = opacity percentage (e.g., step-150 = 15% opacity, step-300 = 30% opacity)
  const textColorHex = colors.text.primaryHex;
  const backgroundColorHex = colors.background.surfaceHex;
  
  const textSteps = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950];
  
  textSteps.forEach((step) => {
    // Convert step to opacity (step-150 = 0.15, step-300 = 0.30, etc.)
    const opacity = step / 1000;
    const blendedColor = blendColors(textColorHex, backgroundColorHex, opacity);
    css += `  --r-text-color-step-${step}: ${blendedColor};\n`;
  });
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
