# Refactico Design System - Theme Implementation Plan

## 🎯 Overview

This plan outlines the implementation strategy for creating a custom theming system that:
1. **Maps Ionic CSS variables** (`--ion-*`) to our design system tokens (`--r-*`)
2. **Maintains compatibility** with Ionic components while using our own design tokens
3. **Provides a bridge layer** that translates our tokens to Ionic variables
4. **Uses `--r-*` prefix** for all public tokens (since "r" is our brand prefix)

## 📋 Current State Analysis

### What We Have:
- ✅ Components using Ionic (`<ion-button>`, `<ion-input>`)
- ✅ Comprehensive theming plan in `THEMING_PLAN.md`
- ✅ Architecture recommendations in `ARCHITECTURE_RECOMMENDATIONS.md`
- ✅ Components with `r-*` prefix (r-button, r-input)
- ✅ No shadow DOM (allows global CSS variable access)

### What We Need:
- ❌ Token definitions (TypeScript)
- ❌ Theme files (light/dark)
- ❌ Ionic variable mapping
- ❌ Component token system
- ❌ Theme injection utilities

## 🏗️ Architecture Strategy

### Three-Layer Token System

```
┌─────────────────────────────────────────┐
│ Layer 1: Semantic Tokens (--r-*)        │
│ - Public API for apps                   │
│ - Semantic tokens (colors, spacing)     │
│ - All use --r-* prefix (our brand)      │
│ - Apps can override these               │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Layer 2: Component Tokens (--r-internal-*)│
│ - Component-specific tokens            │
│ - Maps to --r-* semantic tokens        │
│ - Private/internal use only             │
│ - Clear distinction with "internal"     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Layer 3: Ionic Bridge (--ion-*)        │
│ - Maps --r-* to --ion-* variables      │
│ - Maintains Ionic compatibility         │
└─────────────────────────────────────────┘
```

## 📐 Implementation Structure

### File Organization

```
src/
├── tokens/
│   ├── colors.ts                    # Color palette (TypeScript)
│   ├── spacing.ts                   # Spacing scale (4px base)
│   ├── typography.ts                # Font families, sizes, weights
│   ├── shadows.ts                   # Box shadows (elevation)
│   ├── borders.ts                   # Border radius, widths
│   ├── breakpoints.ts               # Responsive breakpoints
│   ├── ionic-mapping.ts             # Maps --r-* to --ion-* variables
│   ├── index.ts                     # Export all tokens
│   └── tokens.config.json           # Style Dictionary config
├── themes/
│   ├── base.css                     # Base theme (spacing, typography)
│   ├── light.css                    # Light theme colors
│   ├── dark.css                     # Dark theme colors
│   ├── ionic-bridge.css             # Maps --r-* to --ion-* variables
│   ├── theme-validator.ts            # Runtime validation
│   └── index.ts                     # Theme utilities
├── global/
│   └── theme.css                    # Global theme injection
└── components/
    ├── r-button/
    │   └── r-button.css              # Uses --r-internal-button-* tokens
    └── r-input/
        └── r-input.css               # Uses --r-internal-input-* tokens
```

## 🎨 Token Naming Convention

### Semantic Tokens (Public API - `--r-*`)
- **Format**: `--r-{category}-{purpose}-{variant?}`
- **Purpose**: Public API - apps can override these
- **Examples**:
  - `--r-color-text-primary`
  - `--r-color-bg-surface`
  - `--r-color-interactive-primary`
  - `--r-spacing-4`
  - `--r-typography-font-size-base`
- **Rule**: These are the only tokens apps should override

### Component Tokens (Private - `--r-internal-{component}-*`)
- **Format**: `--r-internal-{component}-{property}`
- **Purpose**: Internal/private - component-specific tokens
- **Examples**:
  - `--r-internal-button-bg` (maps to `--r-color-interactive-primary`)
  - `--r-internal-button-text` (maps to `--r-color-text-on-interactive`)
  - `--r-internal-button-padding-x` (maps to `--r-spacing-4`)
  - `--r-internal-input-border-color` (maps to `--r-color-border-default`)
- **Rule**: Apps should NEVER override these. Use semantic tokens instead.

### Ionic Bridge Variables
- **Format**: Maps `--r-*` → `--ion-*`
- **Purpose**: Maintains Ionic component compatibility
- **Note**: Apps should never override `--ion-*` directly

### Why `--r-internal-*`?
- ✅ **Clear distinction**: Obviously private/internal
- ✅ **No naming conflicts**: Can't accidentally create ambiguous tokens
- ✅ **Easy enforcement**: Lint rules can check for `--r-internal-*`
- ✅ **Future-proof**: Works with any component or semantic token name
- ✅ **Self-documenting**: Naming makes intent clear

## 🔄 Ionic Variable Mapping Strategy

### Mapping Approach

Since we're using Ionic components (`<ion-button>`, `<ion-input>`), we need to map our design system tokens to Ionic's CSS variables. We'll create a bridge layer that:

1. **Defines our tokens** (`--r-*` for semantic tokens, `--r-internal-{component}-*` for component tokens)
2. **Maps to Ionic variables** (`--ion-*`) in a bridge CSS file
3. **Allows apps to override** only `--r-*` semantic tokens (public API)
4. **Component tokens** (`--r-internal-{component}-*`) are private and should not be overridden

### Example Mapping

```css
/* themes/ionic-bridge.css */

/* Color Mappings - Semantic tokens (--r-*) to Ionic */
:root {
  /* Background Colors */
  --ion-background-color: var(--r-color-bg-surface);
  --ion-background-color-rgb: var(--r-color-bg-surface-rgb);
  
  /* Text Colors */
  --ion-text-color: var(--r-color-text-primary);
  --ion-text-color-rgb: var(--r-color-text-primary-rgb);
  --ion-text-color-step-50: var(--r-color-text-secondary);
  --ion-text-color-step-100: var(--r-color-text-disabled);
  
  /* Primary Colors */
  --ion-color-primary: var(--r-color-interactive-primary);
  --ion-color-primary-rgb: var(--r-color-interactive-primary-rgb);
  --ion-color-primary-contrast: var(--r-color-text-on-interactive);
  --ion-color-primary-contrast-rgb: var(--r-color-text-on-interactive-rgb);
  --ion-color-primary-shade: var(--r-color-interactive-primary-shade);
  --ion-color-primary-tint: var(--r-color-interactive-primary-tint);
  
  /* Secondary Colors */
  --ion-color-secondary: var(--r-color-interactive-secondary);
  --ion-color-secondary-rgb: var(--r-color-interactive-secondary-rgb);
  
  /* Spacing */
  --ion-padding: var(--r-spacing-4);
  --ion-margin: var(--r-spacing-4);
  
  /* Typography */
  --ion-font-family: var(--r-typography-font-family-primary);
  --ion-font-size-base: var(--r-typography-font-size-base);
}
```

### Component-Specific Mappings

```css
/* Component tokens map to Ionic variables */
r-button {
  /* Our component tokens (private - internal use only) */
  --r-internal-button-bg: var(--r-color-interactive-primary);
  --r-internal-button-text: var(--r-color-text-on-interactive);
  --r-internal-button-padding-x: var(--r-spacing-4);
  --r-internal-button-padding-y: var(--r-spacing-3);
  
  /* Map to Ionic button variables */
  --ion-button-background: var(--r-internal-button-bg);
  --ion-button-color: var(--r-internal-button-text);
  --ion-button-padding-start: var(--r-internal-button-padding-x);
  --ion-button-padding-end: var(--r-internal-button-padding-x);
  --ion-button-padding-top: var(--r-internal-button-padding-y);
  --ion-button-padding-bottom: var(--r-internal-button-padding-y);
}
```

## 📝 Implementation Phases

### Phase 1: Foundation Setup (Week 1)

#### 1.1 Create Token Definitions

**File: `src/tokens/colors.ts`**
```typescript
export const colors = {
  // Base color palette
  primary: {
    base: '0 102 204',           // RGB values (space-separated for alpha)
    baseHex: '#0066cc',
    baseRgb: 'rgb(0, 102, 204)',
    shade: '0 82 163',           // Darker variant
    tint: '26 115 217',          // Lighter variant
  },
  secondary: {
    base: '88 86 214',
    baseHex: '#5856d6',
    // ... more variants
  },
  // Semantic colors
  text: {
    primary: '33 33 33',         // Dark text on light bg
    secondary: '102 102 102',
    disabled: '153 153 153',
    onInteractive: '255 255 255', // Light text on primary bg
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
  // 4px base scale
  0: '0px',
  1: '4px',    // --r-spacing-1
  2: '8px',    // --r-spacing-2
  3: '12px',   // --r-spacing-3
  4: '16px',   // --r-spacing-4
  5: '20px',   // --r-spacing-5
  6: '24px',   // --r-spacing-6
  8: '32px',   // --r-spacing-8
  10: '40px',  // --r-spacing-10
  12: '48px',  // --r-spacing-12
  16: '64px',  // --r-spacing-16
  20: '80px',  // --r-spacing-20
  24: '96px',  // --r-spacing-24
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

#### 1.2 Create Ionic Mapping

**File: `src/tokens/ionic-mapping.ts`**
```typescript
/**
 * Maps our design system tokens to Ionic CSS variables
 * This ensures Ionic components use our design tokens
 */

export const ionicVariableMap = {
  // Background
  '--ion-background-color': '--r-color-bg-surface',
  '--ion-background-color-rgb': '--r-color-bg-surface-rgb',
  
  // Text
  '--ion-text-color': '--r-color-text-primary',
  '--ion-text-color-rgb': '--r-color-text-primary-rgb',
  '--ion-text-color-step-50': '--r-color-text-secondary',
  '--ion-text-color-step-100': '--r-color-text-disabled',
  
  // Primary Color
  '--ion-color-primary': '--r-color-interactive-primary',
  '--ion-color-primary-rgb': '--r-color-interactive-primary-rgb',
  '--ion-color-primary-contrast': '--r-color-text-on-interactive',
  '--ion-color-primary-contrast-rgb': '--r-color-text-on-interactive-rgb',
  '--ion-color-primary-shade': '--r-color-interactive-primary-shade',
  '--ion-color-primary-tint': '--r-color-interactive-primary-tint',
  
  // Secondary Color
  '--ion-color-secondary': '--r-color-interactive-secondary',
  '--ion-color-secondary-rgb': '--r-color-interactive-secondary-rgb',
  '--ion-color-secondary-contrast': '--r-color-text-on-interactive',
  
  // Success, Warning, Error, Info
  '--ion-color-success': '--r-color-success',
  '--ion-color-warning': '--r-color-warning',
  '--ion-color-danger': '--r-color-error',
  '--ion-color-medium': '--r-color-text-secondary',
  
  // Typography
  '--ion-font-family': '--r-typography-font-family-primary',
  '--ion-font-size-base': '--r-typography-font-size-base',
  
  // Spacing (used in Ionic components)
  '--ion-padding': '--r-spacing-4',
  '--ion-margin': '--r-spacing-4',
  
  // Border
  '--ion-border-color': '--r-color-border-default',
  '--ion-border-width': '1px',
  '--ion-border-radius': '--r-border-radius-base',
  
  // Button specific
  '--ion-button-background': '--r-internal-button-bg',
  '--ion-button-color': '--r-internal-button-text',
  '--ion-button-padding-start': '--r-internal-button-padding-x',
  '--ion-button-padding-end': '--r-internal-button-padding-x',
  '--ion-button-padding-top': '--r-internal-button-padding-y',
  '--ion-button-padding-bottom': '--r-internal-button-padding-y',
  '--ion-button-border-radius': '--r-internal-button-border-radius',
  
  // Input specific
  '--ion-input-background': '--r-internal-input-bg',
  '--ion-input-color': '--r-internal-input-text',
  '--ion-input-border-color': '--r-internal-input-border-color',
  '--ion-input-padding-start': '--r-internal-input-padding-x',
  '--ion-input-padding-end': '--r-internal-input-padding-x',
};
```

#### 1.3 Create Theme Files

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
  --r-color-warning: #ffc107;
  --r-color-warning-rgb: 255, 193, 7;
  --r-color-error: #dc3545;
  --r-color-error-rgb: 220, 53, 69;
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
  --r-color-warning: #ffb300;
  --r-color-warning-rgb: 255, 179, 0;
  --r-color-error: #f44336;
  --r-color-error-rgb: 244, 67, 54;
  --r-color-info: #2196f3;
  --r-color-info-rgb: 33, 150, 243;
}
```

**File: `src/themes/ionic-bridge.css`**
```css
/* Ionic Bridge - Maps our tokens to Ionic variables */
:root {
  /* Background */
  --ion-background-color: var(--r-color-bg-surface);
  --ion-background-color-rgb: var(--r-color-bg-surface-rgb);
  
  /* Text */
  --ion-text-color: var(--r-color-text-primary);
  --ion-text-color-rgb: var(--r-color-text-primary-rgb);
  --ion-text-color-step-50: var(--r-color-text-secondary);
  --ion-text-color-step-100: var(--r-color-text-disabled);
  
  /* Primary Color */
  --ion-color-primary: var(--r-color-interactive-primary);
  --ion-color-primary-rgb: var(--r-color-interactive-primary-rgb);
  --ion-color-primary-contrast: var(--r-color-text-on-interactive);
  --ion-color-primary-contrast-rgb: var(--r-color-text-on-interactive-rgb);
  --ion-color-primary-shade: var(--r-color-interactive-primary-shade);
  --ion-color-primary-tint: var(--r-color-interactive-primary-tint);
  
  /* Secondary Color */
  --ion-color-secondary: var(--r-color-interactive-secondary);
  --ion-color-secondary-rgb: var(--r-color-interactive-secondary-rgb);
  --ion-color-secondary-contrast: var(--r-color-text-on-interactive);
  
  /* Status Colors */
  --ion-color-success: var(--r-color-success);
  --ion-color-success-rgb: var(--r-color-success-rgb);
  --ion-color-warning: var(--r-color-warning);
  --ion-color-warning-rgb: var(--r-color-warning-rgb);
  --ion-color-danger: var(--r-color-error);
  --ion-color-danger-rgb: var(--r-color-error-rgb);
  --ion-color-medium: var(--r-color-text-secondary);
  
  /* Typography */
  --ion-font-family: var(--r-typography-font-family-primary);
  --ion-font-size-base: var(--r-typography-font-size-base);
  
  /* Spacing */
  --ion-padding: var(--r-spacing-4);
  --ion-margin: var(--r-spacing-4);
  
  /* Border */
  --ion-border-color: var(--r-color-border-default);
  --ion-border-width: var(--r-border-width-base);
  --ion-border-radius: var(--r-border-radius-base);
}

/* Component-specific mappings */
r-button {
  /* Our component tokens (private - internal use only) */
  --r-internal-button-bg: var(--r-color-interactive-primary);
  --r-internal-button-text: var(--r-color-text-on-interactive);
  --r-internal-button-padding-x: var(--r-spacing-4);
  --r-internal-button-padding-y: var(--r-spacing-3);
  --r-internal-button-border-radius: var(--r-border-radius-base);
  
  /* Map to Ionic button variables */
  --ion-button-background: var(--r-internal-button-bg);
  --ion-button-color: var(--r-internal-button-text);
  --ion-button-padding-start: var(--r-internal-button-padding-x);
  --ion-button-padding-end: var(--r-internal-button-padding-x);
  --ion-button-padding-top: var(--r-internal-button-padding-y);
  --ion-button-padding-bottom: var(--r-internal-button-padding-y);
  --ion-button-border-radius: var(--r-internal-button-border-radius);
}

r-input {
  /* Our component tokens (private - internal use only) */
  --r-internal-input-bg: var(--r-color-bg-surface);
  --r-internal-input-text: var(--r-color-text-primary);
  --r-internal-input-border-color: var(--r-color-border-default);
  --r-internal-input-padding-x: var(--r-spacing-4);
  --r-internal-input-padding-y: var(--r-spacing-3);
  
  /* Map to Ionic input variables */
  --ion-input-background: var(--r-internal-input-bg);
  --ion-input-color: var(--r-internal-input-text);
  --ion-input-border-color: var(--r-internal-input-border-color);
  --ion-input-padding-start: var(--r-internal-input-padding-x);
  --ion-input-padding-end: var(--r-internal-input-padding-x);
}
```

**File: `src/global/theme.css`**
```css
/* Global theme injection - Import all theme files */
@import '../themes/base.css';
@import '../themes/light.css';
@import '../themes/dark.css';
@import '../themes/ionic-bridge.css';
```

### Phase 2: Update Components (Week 2)

#### 2.1 Update r-button Component

**File: `src/components/r-button/r-button.css`**
```css
:host {
  display: inline-block;
  
  /* Component tokens (PRIVATE - do not override) */
  --r-internal-button-bg: var(--r-color-interactive-primary);
  --r-internal-button-text: var(--r-color-text-on-interactive);
  --r-internal-button-padding-x: var(--r-spacing-4);
  --r-internal-button-padding-y: var(--r-spacing-3);
  --r-internal-button-border-radius: var(--r-border-radius-base);
  --r-internal-button-font-size: var(--r-typography-font-size-base);
  --r-internal-button-font-weight: var(--r-typography-font-weight-medium);
}

/* Map component tokens to Ionic button */
r-button ion-button {
  --background: var(--r-internal-button-bg);
  --color: var(--r-internal-button-text);
  --padding-start: var(--r-internal-button-padding-x);
  --padding-end: var(--r-internal-button-padding-x);
  --padding-top: var(--r-internal-button-padding-y);
  --padding-bottom: var(--r-internal-button-padding-y);
  --border-radius: var(--r-internal-button-border-radius);
  font-size: var(--r-internal-button-font-size);
  font-weight: var(--r-internal-button-font-weight);
}

/* Size variants */
r-button[size="small"] {
  --r-internal-button-padding-x: var(--r-spacing-2);
  --r-internal-button-padding-y: var(--r-spacing-2);
  --r-internal-button-font-size: var(--r-typography-font-size-sm);
}

r-button[size="large"] {
  --r-internal-button-padding-x: var(--r-spacing-6);
  --r-internal-button-padding-y: var(--r-spacing-4);
  --r-internal-button-font-size: var(--r-typography-font-size-lg);
}
```

#### 2.2 Update r-input Component

**File: `src/components/r-input/r-input.css`**
```css
:host {
  display: block;
  width: 100%;
  
  /* Component tokens (PRIVATE - do not override) */
  --r-internal-input-bg: var(--r-color-bg-surface);
  --r-internal-input-text: var(--r-color-text-primary);
  --r-internal-input-border-color: var(--r-color-border-default);
  --r-internal-input-border-focus: var(--r-color-border-focus);
  --r-internal-input-padding-x: var(--r-spacing-4);
  --r-internal-input-padding-y: var(--r-spacing-3);
  --r-internal-input-border-radius: var(--r-border-radius-base);
  --r-internal-input-font-size: var(--r-typography-font-size-base);
}

/* Map component tokens to Ionic input */
r-input ion-input {
  --background: var(--r-internal-input-bg);
  --color: var(--r-internal-input-text);
  --border-color: var(--r-internal-input-border-color);
  --padding-start: var(--r-internal-input-padding-x);
  --padding-end: var(--r-internal-input-padding-x);
  --padding-top: var(--r-internal-input-padding-y);
  --padding-bottom: var(--r-internal-input-padding-y);
  --border-radius: var(--r-internal-input-border-radius);
  font-size: var(--r-internal-input-font-size);
}

r-input ion-input:focus-within {
  --border-color: var(--r-internal-input-border-focus);
}
```

### Phase 3: Theme Utilities (Week 2)

#### 3.1 Create Theme Manager

**File: `src/themes/index.ts`**
```typescript
/**
 * Theme management utilities
 */

export type Theme = 'light' | 'dark';

export class ThemeManager {
  private currentTheme: Theme = 'light';
  
  /**
   * Initialize theme from localStorage or system preference
   */
  init(): void {
    const saved = localStorage.getItem('refactico-theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (saved) {
      this.switchTheme(saved);
    } else if (systemPrefersDark) {
      this.switchTheme('dark');
    } else {
      this.switchTheme('light');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('refactico-theme')) {
        this.switchTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  /**
   * Switch theme
   */
  switchTheme(theme: Theme): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('refactico-theme', theme);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('refactico-theme-change', { detail: { theme } }));
  }
  
  /**
   * Get current theme
   */
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }
  
  /**
   * Toggle between light and dark
   */
  toggleTheme(): void {
    this.switchTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }
}

// Singleton instance
export const themeManager = new ThemeManager();

// Auto-initialize on load
if (typeof window !== 'undefined') {
  themeManager.init();
}
```

### Phase 4: Integration (Week 3)

#### 4.1 Update Stencil Config

**File: `stencil.config.ts`**
```typescript
import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'refactico',
  globalStyle: 'src/global/theme.css', // Add global theme
  outputTargets: [
    // ... existing targets
  ],
  // ... rest of config
};
```

#### 4.2 Update Index Files

**File: `src/index.ts`**
```typescript
// Export theme utilities
export { themeManager, ThemeManager, type Theme } from './themes';
export * from './tokens';
```

## 🎯 Migration Strategy

### Step 1: Add Theme Files
1. Create token definitions
2. Create theme CSS files
3. Create Ionic bridge

### Step 2: Update Components
1. Update r-button to use tokens
2. Update r-input to use tokens
3. Test components visually

### Step 3: Integration
1. Add global theme to Stencil config
2. Import theme in index.html
3. Test theme switching

### Step 4: Documentation
1. Document public tokens (`--ds-*`)
2. Document private tokens (`--r-*`)
3. Create migration guide

## 📚 Usage Examples

### For Apps (Public API)

```css
/* Apps can override public --r-* semantic tokens */
:root {
  --r-color-interactive-primary: #ff0000; /* Custom primary color */
  --r-spacing-4: 20px; /* Custom spacing */
}
```

### For Components (Internal)

```css
/* Components use --r-internal-* tokens internally */
r-button {
  --r-internal-button-bg: var(--r-color-interactive-primary);
}
```

## ✅ Success Criteria

1. ✅ All Ionic variables mapped to design system tokens (`--r-*`)
2. ✅ Components use `--r-internal-{component}-*` tokens (private)
3. ✅ Apps can override `--r-*` semantic tokens only (not `--r-internal-*` tokens)
4. ✅ Theme switching works (light/dark)
5. ✅ No hard-coded colors in components
6. ✅ Documentation complete

## 🚀 Next Steps

1. **Start with Phase 1**: Create token definitions
2. **Test incrementally**: Add one component at a time
3. **Validate**: Ensure Ionic components still work
4. **Document**: Update README with token usage

---

This plan provides a clear path to implement the theming system while maintaining compatibility with Ionic components and following the architecture defined in your existing documentation.

