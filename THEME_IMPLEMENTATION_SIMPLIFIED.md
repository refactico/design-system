# Refactico Design System - Simplified Theme Implementation Plan

## 🎯 Overview

This plan uses **automated code generation** to map Ionic variables to our design system tokens, reducing manual work from 100+ mappings to a simple config file.

## 📋 What We Actually Need

### Essential (Must Have)
1. ✅ **Token definitions** (TypeScript) - Colors, spacing, typography
2. ✅ **Theme files** (CSS) - Light/dark themes
3. ✅ **Ionic bridge generator** (TypeScript script) - Auto-generates mappings
4. ✅ **Mapping config** (JSON/TS) - Defines how to map Ionic → Our tokens
5. ✅ **Global theme injection** - One CSS file that imports everything

### Optional (Nice to Have)
- ❌ Style Dictionary (not needed - we're generating CSS directly)
- ❌ Theme validator (can add later)
- ❌ ESLint/Stylelint plugins (can add later)
- ❌ Contrast checker (can add later)

## 📁 Folder Structure

```
src/
├── tokens/
│   ├── colors.ts                    # Color palette definitions
│   ├── spacing.ts                   # Spacing scale (4px base)
│   ├── typography.ts                # Font families, sizes, weights
│   ├── borders.ts                   # Border radius, widths
│   ├── shadows.ts                   # Box shadows
│   ├── index.ts                     # Export all tokens
│   └── ionic-mapping.config.ts      # Mapping configuration (NEW)
│
├── themes/
│   ├── base.css                     # Base theme (spacing, typography) - Static
│   ├── light.css                    # Light theme colors
│   ├── dark.css                     # Dark theme colors
│   ├── ionic-bridge.css              # Auto-generated Ionic mappings (GENERATED)
│   └── index.ts                     # Theme utilities (theme manager)
│
├── scripts/
│   └── generate-ionic-mapping.ts    # Generator script (NEW)
│
└── global/
    └── theme.css                    # Global theme injection (imports all themes)
```

## 🔧 Implementation Steps

### Step 1: Create Token Definitions

**File: `src/tokens/colors.ts`**
```typescript
export const colors = {
  // Base color palette
  primary: {
    base: '0 102 204',           // RGB values (space-separated for alpha)
    baseHex: '#0066cc',
    baseRgb: 'rgb(0, 102, 204)',
    shade: '0 82 163',
    tint: '26 115 217',
  },
  secondary: {
    base: '88 86 214',
    baseHex: '#5856d6',
    // ... more variants
  },
  // Semantic colors
  text: {
    primary: '33 33 33',
    secondary: '102 102 102',
    disabled: '153 153 153',
    onInteractive: '255 255 255',
  },
  background: {
    surface: '255 255 255',
    surfaceSecondary: '245 245 245',
  },
  interactive: {
    primary: '0 102 204',
    secondary: '88 86 214',
    hover: '0 82 163',
    active: '0 61 122',
  },
  border: {
    default: '224 224 224',
    focus: '0 102 204',
  },
  // Status colors
  success: { base: '40 167 69', /* ... */ },
  warning: { base: '255 193 7', /* ... */ },
  error: { base: '220 53 69', /* ... */ },
  info: { base: '0 123 255', /* ... */ },
};
```

**File: `src/tokens/spacing.ts`**
```typescript
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
};
```

**File: `src/tokens/typography.ts`**
```typescript
export const typography = {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: 'Georgia, serif',
    mono: '"Courier New", monospace',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.6',
  },
};
```

### Step 2: Create Mapping Configuration

**File: `src/tokens/ionic-mapping.config.ts`**
```typescript
/**
 * Configuration for mapping Ionic CSS variables to our design system tokens
 * This file defines how to generate ionic-bridge.css
 */

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
```

### Step 3: Create Generator Script

**File: `scripts/generate-ionic-mapping.ts`**
```typescript
/**
 * Generates ionic-bridge.css from mapping configuration
 * Run: npm run generate:ionic-mapping
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { ionicMappingConfig } from '../src/tokens/ionic-mapping.config';

function getRTokenName(ionicColorName: string): string {
  const mapping = ionicMappingConfig.colorMappings.find(m => m.ionic === ionicColorName);
  return mapping ? mapping.rToken : ionicColorName;
}

function generateCSS(): string {
  let css = `/* Auto-generated Ionic Bridge CSS - DO NOT EDIT MANUALLY */\n`;
  css += `/* Generated from: src/tokens/ionic-mapping.config.ts */\n`;
  css += `/* To regenerate: npm run generate:ionic-mapping */\n\n`;
  css += `:root {\n`;

  // Generate from patterns
  ionicMappingConfig.patterns.forEach(pattern => {
    const colors = pattern.colors || [];
    colors.forEach(ionicColor => {
      const rTokenName = getRTokenName(ionicColor);
      const ionicVar = pattern.ionicPattern.replace('{name}', ionicColor);
      const rToken = pattern.rTokenPattern.replace('{name}', rTokenName);
      css += `  ${ionicVar}: var(${rToken});\n`;
    });
  });

  // Add direct mappings
  ionicMappingConfig.directMappings.forEach(mapping => {
    css += `  ${mapping.ionic}: var(${mapping.rToken});\n`;
  });

  css += `}\n`;
  return css;
}

// Generate and write file
const outputPath = join(__dirname, '../src/themes/ionic-bridge.css');
const css = generateCSS();
writeFileSync(outputPath, css, 'utf-8');

console.log('✅ Generated ionic-bridge.css');
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 Total mappings: ${css.split('\n').filter(l => l.includes(': var(')).length}`);
```

### Step 4: Add Build Script

**File: `package.json`** (add to scripts)
```json
{
  "scripts": {
    "generate:ionic-mapping": "ts-node scripts/generate-ionic-mapping.ts",
    "prebuild": "npm run generate:ionic-mapping",
    "build": "stencil build"
  }
}
```

### Step 5: Create Theme Files

**File: `src/themes/base.css`**
```css
/* Base theme - Static values (spacing, typography) */
:root {
  /* Spacing Scale (4px base) */
  --r-spacing-0: 0px;
  --r-spacing-1: 4px;
  --r-spacing-2: 8px;
  --r-spacing-3: 12px;
  --r-spacing-4: 16px;
  --r-spacing-5: 20px;
  --r-spacing-6: 24px;
  --r-spacing-8: 32px;
  --r-spacing-10: 40px;
  --r-spacing-12: 48px;
  --r-spacing-16: 64px;
  --r-spacing-20: 80px;
  --r-spacing-24: 96px;
  
  /* Typography */
  --r-typography-font-family-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --r-typography-font-family-secondary: Georgia, serif;
  --r-typography-font-family-mono: "Courier New", monospace;
  
  --r-typography-font-size-xs: 12px;
  --r-typography-font-size-sm: 14px;
  --r-typography-font-size-base: 16px;
  --r-typography-font-size-lg: 18px;
  --r-typography-font-size-xl: 20px;
  --r-typography-font-size-2xl: 24px;
  --r-typography-font-size-3xl: 30px;
  --r-typography-font-size-4xl: 36px;
  
  --r-typography-font-weight-light: 300;
  --r-typography-font-weight-normal: 400;
  --r-typography-font-weight-medium: 500;
  --r-typography-font-weight-semibold: 600;
  --r-typography-font-weight-bold: 700;
  
  --r-typography-line-height-tight: 1.2;
  --r-typography-line-height-normal: 1.5;
  --r-typography-line-height-relaxed: 1.6;
  
  /* Borders */
  --r-border-radius-sm: 4px;
  --r-border-radius-base: 8px;
  --r-border-radius-lg: 12px;
  --r-border-radius-xl: 16px;
  --r-border-radius-full: 9999px;
  --r-border-width-base: 1px;
  --r-border-width-thick: 2px;
  
  /* Shadows */
  --r-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --r-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --r-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --r-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
```

**File: `src/themes/light.css`**
```css
/* Light Theme - Color tokens */
:root[data-theme="light"],
:root:not([data-theme]) {
  /* Background Colors */
  --r-color-bg-surface: #ffffff;
  --r-color-bg-surface-rgb: 255, 255, 255;
  --r-color-bg-surface-secondary: #f5f5f5;
  --r-color-bg-surface-secondary-rgb: 245, 245, 245;
  
  /* Text Colors */
  --r-color-text-primary: #212121;
  --r-color-text-primary-rgb: 33, 33, 33;
  --r-color-text-secondary: #666666;
  --r-color-text-secondary-rgb: 102, 102, 102;
  --r-color-text-disabled: #999999;
  --r-color-text-disabled-rgb: 153, 153, 153;
  --r-color-text-on-interactive: #ffffff;
  --r-color-text-on-interactive-rgb: 255, 255, 255;
  
  /* Interactive Colors */
  --r-color-interactive-primary: #0066cc;
  --r-color-interactive-primary-rgb: 0, 102, 204;
  --r-color-interactive-primary-shade: #0052a3;
  --r-color-interactive-primary-tint: #1a73d9;
  --r-color-interactive-secondary: #5856d6;
  --r-color-interactive-secondary-rgb: 88, 86, 214;
  --r-color-interactive-secondary-shade: #4543b0;
  --r-color-interactive-secondary-tint: #6a68da;
  --r-color-interactive-hover: #0052a3;
  --r-color-interactive-active: #003d7a;
  
  /* Border Colors */
  --r-color-border-default: #e0e0e0;
  --r-color-border-default-rgb: 224, 224, 224;
  --r-color-border-focus: #0066cc;
  --r-color-border-focus-rgb: 0, 102, 204;
  
  /* Status Colors */
  --r-color-success: #28a745;
  --r-color-success-rgb: 40, 167, 69;
  --r-color-success-shade: #20943a;
  --r-color-success-tint: #3eb052;
  --r-color-warning: #ffc107;
  --r-color-warning-rgb: 255, 193, 7;
  --r-color-warning-shade: #e0a906;
  --r-color-warning-tint: #ffca2c;
  --r-color-error: #dc3545;
  --r-color-error-rgb: 220, 53, 69;
  --r-color-error-shade: #c22e3b;
  --r-color-error-tint: #e04a58;
  --r-color-info: #007bff;
  --r-color-info-rgb: 0, 123, 255;
}
```

**File: `src/themes/dark.css`**
```css
/* Dark Theme - Color tokens */
:root[data-theme="dark"] {
  /* Background Colors */
  --r-color-bg-surface: #1a1a1a;
  --r-color-bg-surface-rgb: 26, 26, 26;
  --r-color-bg-surface-secondary: #2d2d2d;
  --r-color-bg-surface-secondary-rgb: 45, 45, 45;
  
  /* Text Colors */
  --r-color-text-primary: #ffffff;
  --r-color-text-primary-rgb: 255, 255, 255;
  --r-color-text-secondary: #b3b3b3;
  --r-color-text-secondary-rgb: 179, 179, 179;
  --r-color-text-disabled: #808080;
  --r-color-text-disabled-rgb: 128, 128, 128;
  --r-color-text-on-interactive: #ffffff;
  --r-color-text-on-interactive-rgb: 255, 255, 255;
  
  /* Interactive Colors */
  --r-color-interactive-primary: #3388dd;
  --r-color-interactive-primary-rgb: 51, 136, 221;
  --r-color-interactive-primary-shade: #2a6db3;
  --r-color-interactive-primary-tint: #4d99e6;
  --r-color-interactive-secondary: #7a78e6;
  --r-color-interactive-secondary-rgb: 122, 120, 230;
  --r-color-interactive-secondary-shade: #6361c0;
  --r-color-interactive-secondary-tint: #8a88ea;
  --r-color-interactive-hover: #2a6db3;
  --r-color-interactive-active: #1f5288;
  
  /* Border Colors */
  --r-color-border-default: #404040;
  --r-color-border-default-rgb: 64, 64, 64;
  --r-color-border-focus: #3388dd;
  --r-color-border-focus-rgb: 51, 136, 221;
  
  /* Status Colors */
  --r-color-success: #4caf50;
  --r-color-success-rgb: 76, 175, 80;
  --r-color-success-shade: #409944;
  --r-color-success-tint: #5eb862;
  --r-color-warning: #ffb300;
  --r-color-warning-rgb: 255, 179, 0;
  --r-color-warning-shade: #e09f00;
  --r-color-warning-tint: #ffbc1a;
  --r-color-error: #f44336;
  --r-color-error-rgb: 244, 67, 54;
  --r-color-error-shade: #d73a2e;
  --r-color-error-tint: #f55a4e;
  --r-color-info: #2196f3;
  --r-color-info-rgb: 33, 150, 243;
}
```

**File: `src/themes/ionic-bridge.css`** (AUTO-GENERATED - Don't edit manually)
```css
/* This file is auto-generated by scripts/generate-ionic-mapping.ts */
/* To modify mappings, edit: src/tokens/ionic-mapping.config.ts */
/* Then run: npm run generate:ionic-mapping */
```

### Step 6: Create Global Theme Injection

**File: `src/global/theme.css`**
```css
/* Global theme injection - Import all theme files */
@import '../themes/base.css';
@import '../themes/light.css';
@import '../themes/dark.css';
@import '../themes/ionic-bridge.css';
```

### Step 7: Update Stencil Config

**File: `stencil.config.ts`**
```typescript
import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'refactico',
  globalStyle: 'src/global/theme.css', // Add this line
  // ... rest of config
};
```

## 🚀 Usage

### Generate Ionic Bridge
```bash
npm run generate:ionic-mapping
```

### Build (auto-generates before build)
```bash
npm run build
```

### Add New Mapping
1. Edit `src/tokens/ionic-mapping.config.ts`
2. Run `npm run generate:ionic-mapping`
3. Done!

## 📊 What Gets Generated

From ~30 config entries, the generator creates ~80-100 CSS variable mappings automatically.

## ✅ Advantages

1. **Maintainable**: Update config, regenerate
2. **Scalable**: Easy to add new mappings
3. **Less Error-Prone**: No manual copy-paste
4. **Documented**: Config serves as documentation
5. **Version Control Friendly**: Track config changes

## 🎯 Summary

**What we need:**
- ✅ Token definitions (TypeScript)
- ✅ Theme files (CSS)
- ✅ Mapping config (TypeScript)
- ✅ Generator script (TypeScript)
- ✅ Global theme injection (CSS)

**What we DON'T need (for now):**
- ❌ Style Dictionary
- ❌ Theme validator
- ❌ ESLint/Stylelint plugins
- ❌ Contrast checker

**Result:**
- Simple, maintainable structure
- Automated mapping generation
- Easy to extend
- ~80-100 Ionic variables mapped automatically

