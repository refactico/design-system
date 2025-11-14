# Refactico Design System - Theming Implementation Plan (Revised)

## 🎯 Goals & Requirements

### Primary Goals:
1. **Consistency**: Ensure all 40 apps use the same design tokens
2. **Flexibility**: Allow customization for open source users
3. **Maintainability**: Single source of truth for design values
4. **Scalability**: Easy to add new tokens and themes
5. **Accessibility**: WCAG compliant with automated checks
6. **Performance**: Optimized theme switching and CSS variable usage
7. **Enforcement**: CI/CD validation to prevent token misuse

## 📐 Architecture Overview

### Three-Layer Theming System with Enforcement:

```
┌─────────────────────────────────────┐
│  Layer 1: Design Tokens (Base)      │
│  - TypeScript definitions            │
│  - Style Dictionary for artifacts   │
│  - Public vs Private tokens          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Layer 2: Theme Presets              │
│  - Light theme (manually crafted)    │
│  - Dark theme (rule-based + review)  │
│  - Brand presets                      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Layer 3: Component Styles            │
│  - CSS custom properties              │
│  - Shadow DOM compatible             │
│  - ::part for overrides              │
└─────────────────────────────────────┘
```

## 🏗️ Implementation Structure

### File Organization:
```
src/
├── tokens/
│   ├── colors.ts              # Color palette definitions
│   ├── spacing.ts             # Spacing scale (4px base)
│   ├── typography.ts          # Font families, sizes, weights
│   ├── shadows.ts             # Box shadows (elevation)
│   ├── borders.ts             # Border radius, widths
│   ├── breakpoints.ts         # Responsive breakpoints
│   ├── index.ts               # Export all tokens
│   └── tokens.config.json     # Style Dictionary config
├── themes/
│   ├── light.css              # Light theme (manually crafted)
│   ├── dark.css               # Dark theme (rule-based + reviewed)
│   ├── base.css               # Base theme (shared variables)
│   ├── theme-validator.ts     # Runtime validation
│   └── index.ts               # Theme utilities
├── validators/
│   ├── eslint-plugin/        # ESLint rules for token usage
│   ├── stylelint-plugin/      # Stylelint rules for CSS vars
│   └── contrast-checker.ts    # WCAG contrast validation
└── global/
    └── theme.css              # Global theme injection
```

## 🎨 Design Tokens Strategy (Revised)

### 1. Two-Tier Token System

#### Tier 1: Core Semantic Tokens (Public API)
**Purpose**: Used by all apps, enforced consistency

```typescript
// Core semantic tokens - PUBLIC API
--ds-color-text-primary
--ds-color-text-secondary
--ds-color-text-disabled
--ds-color-bg-surface
--ds-color-bg-surface-secondary
--ds-color-interactive-primary
--ds-color-interactive-secondary
--ds-color-border-default
--ds-color-divider
--ds-spacing-4, --ds-spacing-8, ... (4px base scale)
--ds-typography-font-family-primary
--ds-typography-font-size-base
```

#### Tier 2: Component Tokens (Internal)
**Purpose**: Component-specific, map to core semantics

```css
/* Component tokens - INTERNAL */
--r-button-bg: var(--ds-color-interactive-primary);
--r-button-text: var(--ds-color-text-on-interactive);
--r-button-padding-x: var(--ds-spacing-4);
--r-button-padding-y: var(--ds-spacing-3);
```

**Rules**:
- Apps can ONLY override Tier 1 (core semantic) tokens
- Component tokens are internal and read-only
- Component tokens always reference core tokens

### 2. Color System (Manual Dark Theme)

**Approach**: Candidate generation → Automated validation → Manual review → Signoff

**Why**: Rule-based transforms often fail accessibility or brand intent. We generate candidates, validate automatically, then require human signoff.

```typescript
// Step 1: Generate candidate dark theme using rules
function generateDarkThemeCandidates(lightTheme) {
  return {
    // Surfaces: Use dark-surface palette or lighten by 85-90%
    '--ds-color-bg-surface': darken(lightTheme['--ds-color-bg-surface'], 85%),
    
    // Text: Ensure contrast >= 4.5:1 (normal text) or 3.0:1 (large text)
    '--ds-color-text-primary': ensureContrast(
      lightTheme['--ds-color-text-primary'],
      darkSurface,
      { min: 4.5, minLarge: 3.0 }
    ),
    
    // Interactive: Preserve hue, reduce saturation 10-20%, raise contrast
    '--ds-color-interactive-primary': adjustInteractive(
      lightTheme['--ds-color-interactive-primary'],
      { preserveHue: true, reduceSaturation: 15%, minContrast: 4.5 }
    ),
    
    // Borders: Reduce opacity to 0.3-0.5 for subtle appearance
    '--ds-color-border-default': reduceOpacity(
      lightTheme['--ds-color-border-default'],
      { min: 0.3, max: 0.5 }
    ),
  };
}

// Step 2: Run automated contrast checks (REQUIRED)
const contrastMatrix = generateContrastMatrix(darkThemeCandidates);
const failures = contrastMatrix.filter(pair => !pair.passesAA);

if (failures.length > 0) {
  throw new Error(`Dark theme contrast failures: ${failures.length}`);
}

// Step 3: Manual review checklist (REQUIRED for brand colors)
// - [ ] Primary brand color visually approved
// - [ ] Secondary brand color visually approved
// - [ ] Text contrast verified manually
// - [ ] Interactive states clear and accessible
// - [ ] Human signoff (designer + developer)

// Step 4: Signoff before release
// Dark theme cannot be published without signoff
```

**Implementation Process**:
1. **Generate candidates** using rule-based transforms
2. **Automated validation** - Contrast matrix checks all critical pairs
3. **Manual review** - Designer reviews brand/primary tokens
4. **Human signoff** - Required before release (blocks CI if missing)
5. **Documentation** - Record all manual overrides and rationale

### 3. Spacing System (Standardized Units)

**Approach**: 4px base unit, all values in px, rem helpers exported in TS/JS

**Why**: Mixing px/rem causes inconsistent overrides. Standardize on px for tokens, provide rem helpers.

```typescript
// Token definitions (px only)
spacing: {
  // Base scale (4px increments)
  0: '0px',
  1: '4px',    // --ds-spacing-1
  2: '8px',    // --ds-spacing-2
  3: '12px',   // --ds-spacing-3
  4: '16px',   // --ds-spacing-4
  5: '20px',   // --ds-spacing-5
  6: '24px',   // --ds-spacing-6
  8: '32px',   // --ds-spacing-8
  10: '40px',  // --ds-spacing-10
  12: '48px',  // --ds-spacing-12
  16: '64px',  // --ds-spacing-16
  20: '80px',  // --ds-spacing-20
  24: '96px'   // --ds-spacing-24
}

// Rem helpers (exported in TS/JS artifacts, not CSS)
export const spacingRem = {
  1: '0.25rem',  // 4px / 16
  2: '0.5rem',   // 8px / 16
  4: '1rem',     // 16px / 16
  // ... calculated from px values
};

// Color format: Space-separated RGB for alpha usage
colors: {
  primary: {
    base: '0 102 204',      // RGB values (space-separated)
    baseHex: '#0066cc',     // Hex for CSS
    baseRgb: 'rgb(0, 102, 204)', // Full RGB
    // Allows: rgba(var(--ds-color-primary-base), 0.5)
  }
}

// Naming convention: --ds-{category}-{purpose}-{scale}
// Examples:
--ds-spacing-4
--ds-spacing-component-padding
--ds-color-text-primary
--ds-typography-font-size-base
```

### 4. Typography System

```typescript
typography: {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: 'Georgia, serif',
    mono: '"Courier New", monospace'
  },
  fontSize: {
    xs: '12px',    // --ds-typography-font-size-xs
    sm: '14px',    // --ds-typography-font-size-sm
    base: '16px',  // --ds-typography-font-size-base
    lg: '18px',    // --ds-typography-font-size-lg
    xl: '20px',    // --ds-typography-font-size-xl
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px'
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.6'
  }
}
```

## 🔒 Token Contract & Enforcement (Airtight System)

### Why This Matters:
Teams will circumvent unless CI + lint + runtime validator are airtight. Apps editing CSS or inline styles can still write raw hex values.

### 1. Public vs Private Tokens

```typescript
// Public tokens (apps can override)
export const PUBLIC_TOKENS = [
  '--ds-color-*',
  '--ds-spacing-*',
  '--ds-typography-*',
  '--ds-focus-*',
  '--ds-motion-*',
  // ... documented list (exact match, no wildcards in enforcement)
];

// Private tokens (internal only)
export const PRIVATE_TOKENS = [
  '--r-*',           // Component tokens (all)
  '--ds-internal-*', // Internal system tokens
];
```

### 2. ESLint Enforcement (Fails CI)

```javascript
// eslint-plugin-refactico-tokens
module.exports = {
  rules: {
    'no-private-token-override': {
      create(context) {
        return {
          Property(node) {
            const key = node.key.name || node.key.value;
            if (key.startsWith('--r-') || key.startsWith('--ds-internal-')) {
              context.report({
                node,
                message: `Cannot override private token "${key}". Use public --ds-* tokens only.`,
                fix: null // No auto-fix, requires manual change
              });
            }
          }
        };
      }
    },
    'use-semantic-tokens': {
      create(context) {
        return {
          Literal(node) {
            // Detect hex colors, rgb() in JS/TS
            if (typeof node.value === 'string') {
              if (node.value.match(/^#[0-9a-fA-F]{3,6}$/) || 
                  node.value.match(/^rgb\(/)) {
                context.report({
                  node,
                  message: `Use design system tokens instead of raw colors. Found: "${node.value}"`,
                  suggest: [{
                    desc: 'Use --ds-color-* token',
                    fix: null // Manual fix required
                  }]
                });
              }
            }
          }
        };
      }
    }
  }
};
```

### 3. Stylelint Enforcement (Fails CI)

```javascript
// stylelint-plugin-refactico-tokens
module.exports = {
  rules: {
    'no-raw-colors': {
      // FORBID: #xxxxxx, rgb(), rgba(), hsl() in CSS
      // ENFORCE: var(--ds-color-*) only
      check(rule) {
        const value = rule.value;
        
        // Check for hex colors
        if (value.match(/#[0-9a-fA-F]{3,6}(?!\w)/)) {
          return {
            line: rule.source.start.line,
            column: rule.source.start.column,
            message: `Raw hex color found: "${value}". Use var(--ds-color-*) token instead.`,
            severity: 'error'
          };
        }
        
        // Check for rgb/rgba/hsl
        if (value.match(/\b(rgb|rgba|hsl|hsla)\(/)) {
          return {
            line: rule.source.start.line,
            column: rule.source.start.column,
            message: `Raw color function found: "${value}". Use var(--ds-color-*) token instead.`,
            severity: 'error'
          };
        }
        
        return null; // No violation
      }
    },
    'use-semantic-tokens': {
      // Warn if not using var(--ds-*)
      check(rule) {
        if (rule.property.match(/color|background|border/) && 
            !rule.value.includes('var(--ds-')) {
          return {
            line: rule.source.start.line,
            message: `Consider using design system token: var(--ds-color-*)`,
            severity: 'warning'
          };
        }
      }
    }
  }
};
```

### 4. Runtime Validation (Fails Staging/Production)

```typescript
// theme-validator.ts
export class ThemeValidator {
  private publicTokens: Set<string>;
  private isProduction: boolean;
  
  validate(customTokens: Record<string, string>): ValidationResult {
    const violations = [];
    
    Object.keys(customTokens).forEach(token => {
      // Check private token override
      if (token.startsWith('--r-') || token.startsWith('--ds-internal-')) {
        violations.push({
          token,
          severity: 'error',
          message: `Token "${token}" is private. Use public --ds-* tokens only.`,
          file: this.getCallerFile(), // Stack trace to find source
          line: this.getCallerLine(),
          replacement: this.suggestReplacement(token)
        });
      }
      
      // Check if token exists in public API
      if (!this.publicTokens.has(token) && token.startsWith('--ds-')) {
        violations.push({
          token,
          severity: 'warning',
          message: `Token "${token}" not found in public API. Check documentation.`
        });
      }
    });
    
    // In staging/production: FAIL on errors
    if (this.isProduction && violations.some(v => v.severity === 'error')) {
      throw new Error(`Theme validation failed:\n${violations.map(v => 
        `  ${v.file}:${v.line} - ${v.message}\n    Replacement: ${v.replacement || 'N/A'}`
      ).join('\n')}`);
    }
    
    // In development: console warnings with actionable messages
    if (violations.length > 0) {
      console.group('🔒 Theme Validation Violations');
      violations.forEach(v => {
        console.error(
          `%c${v.severity.toUpperCase()}: %c${v.message}`,
          'font-weight: bold; color: red',
          'color: inherit',
          `\n  File: ${v.file}:${v.line}`,
          v.replacement ? `\n  Replacement: ${v.replacement}` : ''
        );
      });
      console.groupEnd();
    }
    
    return { valid: violations.length === 0, violations };
  }
  
  private suggestReplacement(token: string): string {
    // Suggest public token based on private token name
    if (token.startsWith('--r-button-')) {
      return 'Use --ds-color-interactive-primary or --ds-spacing-*';
    }
    return 'See token documentation for public alternatives';
  }
}
```

### 5. CI/CD Validation (Blocks PRs)

```yaml
# .github/workflows/validate-theme.yml
name: Theme Validation

on: [pull_request, push]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      - name: Lint Token Usage (ESLint)
        run: npm run lint:tokens
        # Fails PR if private tokens overridden
        
      - name: Lint CSS (Stylelint)
        run: npm run lint:css
        # Fails PR if raw colors found
        
      - name: Validate Contrast Matrix
        run: npm run validate:contrast
        # Fails PR if contrast failures
        
      - name: Accessibility Check
        run: npm run check:a11y
        # Fails PR if a11y violations
        
      - name: Runtime Theme Validation
        run: npm run validate:theme
        # Fails PR if runtime violations
```

**Enforcement Stack (All Must Pass)**:
1. ✅ ESLint - Blocks private token overrides in JS/TS
2. ✅ Stylelint - Blocks raw colors in CSS
3. ✅ Runtime Validator - Validates at runtime (fails staging/prod)
4. ✅ CI/CD - Blocks PRs with violations

## 🌓 Dark Mode Strategy (Revised)

### Manual Dark Theme (Not Auto-Generated)

**Approach**: Rule-based generation + manual review

```typescript
// Step 1: Rule-based transformation
function generateDarkTheme(lightTheme) {
  return {
    // Surfaces: Use dark-surface palette
    '--ds-color-bg-surface': darken(lightTheme['--ds-color-bg-surface'], 85%),
    
    // Text: Ensure contrast >= 4.5:1
    '--ds-color-text-primary': ensureContrast(
      lightTheme['--ds-color-text-primary'],
      darkSurface,
      { min: 4.5 }
    ),
    
    // Interactive: Preserve hue, adjust saturation/lightness
    '--ds-color-interactive-primary': adjustInteractive(
      lightTheme['--ds-color-interactive-primary'],
      { preserveHue: true, reduceSaturation: 15% }
    ),
    
    // ... more rules
  };
}

// Step 2: Automated contrast checks
await runContrastChecks(darkTheme);

// Step 3: Manual review checklist
// - [ ] Primary brand color looks good
// - [ ] Text contrast verified
// - [ ] Interactive states clear
// - [ ] Human signoff
```

### Theme Switching (Performance Optimized)

**Why**: Updating too many CSS vars causes layout/style thrash. Limit runtime swaps to ~20-30 semantic color vars.

**Strategy**: Use CSS attribute selectors, not inline style updates.

```css
/* base.css - Static (spacing, typography) - loaded once */
:root {
  --ds-spacing-4: 16px;
  --ds-typography-font-size-base: 16px;
  /* ... never changes */
}

/* light.css - Theme-specific colors */
:root[data-theme="light"],
:root:not([data-theme]) {
  --ds-color-text-primary: #333333;
  --ds-color-bg-surface: #ffffff;
  --ds-color-interactive-primary: #0066cc;
  /* ... ~20-30 color vars only */
}

/* dark.css - Theme-specific colors */
:root[data-theme="dark"] {
  --ds-color-text-primary: #ffffff;
  --ds-color-bg-surface: #1a1a1a;
  --ds-color-interactive-primary: #3388dd;
  /* ... ~20-30 color vars only */
}
```

```typescript
// Theme switching - CSS handles it, minimal JS
class ThemeManager {
  switchTheme(theme: 'light' | 'dark') {
    // Single attribute change - CSS handles the rest
    // No style recalculation, no layout thrash
    document.documentElement.setAttribute('data-theme', theme);
    
    // Optional: Persist preference
    localStorage.setItem('theme', theme);
  }
  
  // Load persisted theme on init
  init() {
    const saved = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.switchTheme(saved);
  }
}
```

**Performance Benefits**:
- ✅ No inline style updates (CSS handles via attribute selector)
- ✅ Only ~20-30 vars swapped (not 100+)
- ✅ Spacing/typography never change (static)
- ✅ Minimal layout thrashing
- ✅ Theme switch < 50ms

## 🎨 Shadow DOM Compatibility

### Current State:
- Components use `shadow: false` (no shadow DOM)
- **But**: Design for shadow DOM compatibility from day one
- **Why**: Global selectors won't reach shadow roots; apps may try to override internals and fail

### Strategy: Semantic CSS Variables + ::part

**Rule**: Components MUST use semantic CSS variables only. Never rely on global selectors.

```css
/* Component styles - Shadow DOM compatible */
:host {
  /* Component tokens (INTERNAL - documented as private) */
  --r-button-bg: var(--ds-color-interactive-primary);
  --r-button-text: var(--ds-color-text-on-interactive);
  --r-button-padding-x: var(--ds-spacing-4);
  --r-button-padding-y: var(--ds-spacing-3);
}

button {
  background: var(--r-button-bg);
  color: var(--r-button-text);
  padding: var(--r-button-padding-y) var(--r-button-padding-x);
}

/* Expose parts for styling overrides */
button::part(control) {
  /* Apps can style this via ::part */
}

/* Document which tokens are private */
/* PRIVATE TOKENS (do not override):
 * --r-button-* (all component tokens)
 * --ds-internal-* (internal system tokens)
 */
```

```html
<!-- Component markup -->
<button part="control">
  <slot></slot>
</button>
```

### Documentation Requirements:
1. **Component README**: List all private tokens (`--r-*`)
2. **Public API**: Only `--ds-*` tokens are public
3. **Override Guide**: Use `::part` for styling, not token overrides
4. **Validation**: Runtime validator warns if private tokens are overridden

## 📦 Versioning & Migration

### 1. Token Compatibility Map

```json
// tokens-compat.json
{
  "v1.0.0": {
    "deprecated": {
      "--ds-color-primary": {
        "replacement": "--ds-color-interactive-primary",
        "migration": "find-replace",
        "removedIn": "v2.0.0"
      }
    },
    "aliases": {
      "--ds-color-primary": "--ds-color-interactive-primary"
    }
  }
}
```

### 2. Migration Tooling

```typescript
// codemod for token migration
export function migrateTokens(code: string, fromVersion: string, toVersion: string) {
  const compat = loadCompatMap();
  const migrations = compat[fromVersion]?.deprecated || {};
  
  Object.entries(migrations).forEach(([old, config]) => {
    code = code.replace(new RegExp(old, 'g'), config.replacement);
  });
  
  return code;
}
```

### 3. Deprecation Strategy

- Deprecated tokens work for 1 major version
- Console warnings in dev mode
- Migration guide in CHANGELOG
- Automated codemod provided

## ♿ Accessibility Automation (Beyond Contrast)

### Why: Contrast is necessary but not sufficient. Need focus states, motion, color-only indicators.

### 1. Contrast Matrix Tool (Critical Pairs)

**Why**: Token combos explode (interactive + text + surface). Manual checks won't scale.

```typescript
// contrast-matrix.ts
import { getContrast } from 'color-contrast';

interface ContrastPair {
  foreground: string;
  background: string;
  context: 'normal-text' | 'large-text' | 'interactive';
  minRatio: number; // 4.5 for normal, 3.0 for large, 4.5 for interactive
}

export function generateContrastMatrix(theme: Theme): ContrastPair[] {
  const criticalPairs: ContrastPair[] = [
    // Text on surfaces
    {
      foreground: theme['--ds-color-text-primary'],
      background: theme['--ds-color-bg-surface'],
      context: 'normal-text',
      minRatio: 4.5
    },
    {
      foreground: theme['--ds-color-text-secondary'],
      background: theme['--ds-color-bg-surface'],
      context: 'normal-text',
      minRatio: 4.5
    },
    
    // Text on interactive
    {
      foreground: theme['--ds-color-text-on-interactive'],
      background: theme['--ds-color-interactive-primary'],
      context: 'interactive',
      minRatio: 4.5
    },
    
    // Interactive states
    {
      foreground: theme['--ds-color-interactive-primary'],
      background: theme['--ds-color-bg-surface'],
      context: 'interactive',
      minRatio: 3.0 // For focus indicators
    },
    
    // Error states
    {
      foreground: theme['--ds-color-text-on-error'],
      background: theme['--ds-color-error'],
      context: 'normal-text',
      minRatio: 4.5
    },
    
    // ... all critical combinations
  ];
  
  return criticalPairs;
}

export function validateContrastMatrix(theme: Theme): ValidationResult {
  const matrix = generateContrastMatrix(theme);
  const failures = [];
  
  matrix.forEach(pair => {
    const ratio = getContrast(pair.foreground, pair.background);
    const passes = ratio >= pair.minRatio;
    
    if (!passes) {
      failures.push({
        pair,
        ratio,
        required: pair.minRatio,
        message: `Contrast ratio ${ratio.toFixed(2)} < ${pair.minRatio} for ${pair.context}`
      });
    }
  });
  
  if (failures.length > 0) {
    throw new Error(`Contrast validation failed:\n${failures.map(f => 
      `  ${f.message} (${f.pair.foreground} on ${f.pair.background})`
    ).join('\n')}`);
  }
  
  return { valid: true, failures: [] };
}
```

### 2. Focus States & Motion Tokens

```typescript
// focus.ts - Focus ring tokens
export const focusTokens = {
  ringWidth: '2px',
  ringColor: 'var(--ds-color-interactive-primary)',
  ringOffset: '2px',
  ringOffsetColor: 'var(--ds-color-bg-surface)',
};

// motion.ts - Motion tokens (reduced motion support)
export const motionTokens = {
  durationFast: '150ms',
  durationNormal: '250ms',
  durationSlow: '350ms',
  easingStandard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easingDecelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  easingAccelerate: 'cubic-bezier(0.4, 0, 1, 1)',
};

// CSS
:root {
  --ds-focus-ring-width: 2px;
  --ds-focus-ring-color: var(--ds-color-interactive-primary);
  --ds-focus-ring-offset: 2px;
  
  --ds-motion-duration-fast: 150ms;
  --ds-motion-duration-normal: 250ms;
  --ds-motion-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  :root {
    --ds-motion-duration-fast: 0ms;
    --ds-motion-duration-normal: 0ms;
    --ds-motion-duration-slow: 0ms;
  }
}
```

### 3. Color-Only Indicator Detection

```typescript
// color-only-checker.ts
// Detect components that rely solely on color for information

export function checkColorOnlyIndicators(component: HTMLElement): ValidationResult {
  const violations = [];
  
  // Check for status indicators (error, success, warning)
  const statusElements = component.querySelectorAll('[class*="status"], [class*="error"], [class*="success"]');
  
  statusElements.forEach(el => {
    // Check if status is only indicated by color (no icon, text, pattern)
    const hasIcon = el.querySelector('svg, [class*="icon"]');
    const hasText = el.textContent.trim().length > 0;
    const hasPattern = el.style.backgroundImage || el.getAttribute('aria-label');
    
    if (!hasIcon && !hasText && !hasPattern) {
      violations.push({
        element: el,
        issue: 'Status indicated by color only',
        fix: 'Add icon, text, or pattern to indicate status',
        wcag: '1.4.1 Use of Color (Level A)'
      });
    }
  });
  
  return { valid: violations.length === 0, violations };
}
```

### 4. CI/CD Integration (Comprehensive)

```yaml
# .github/workflows/a11y-check.yml
- name: Build Storybook
  run: npm run build-storybook

- name: Contrast Matrix Validation
  run: npm run validate:contrast-matrix
  # Fails if any critical pair fails

- name: Accessibility Check (axe-core)
  run: npm run test:a11y
  # Tests Storybook pages with axe-core

- name: Keyboard Navigation Test
  run: npm run test:keyboard
  # Playwright tests for keyboard focus

- name: Color-Only Indicator Check
  run: npm run check:color-only
  # Detects color-only usage

- name: Focus States Check
  run: npm run check:focus
  # Validates focus ring visibility
```

### 5. Tokens Playground (Interactive)

```typescript
// tokens-playground.ts
export function createTokensPlayground() {
  // Interactive tool showing:
  // - All token combinations in a matrix
  // - Real-time contrast ratios
  // - WCAG compliance status (AA/AAA)
  // - Visual preview of color pairs
  // - Warnings for failing combinations
  // - Focus state preview
  // - Motion preview (with reduced motion toggle)
  // - Export validation report
}
```

## 🛠️ Tooling Stack

### 1. Style Dictionary
**Purpose**: Generate CSS/SCSS/JSON/TS from token definitions

```json
// tokens.config.json
{
  "source": ["src/tokens/**/*.ts"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/themes/",
      "files": [{
        "destination": "tokens.css",
        "format": "css/variables"
      }]
    },
    "typescript": {
      "transformGroup": "js",
      "buildPath": "dist/tokens/",
      "files": [{
        "destination": "tokens.ts",
        "format": "typescript/es6"
      }]
    }
  }
}
```

### 2. ESLint Plugin

```javascript
// eslint-plugin-refactico-tokens
module.exports = {
  rules: {
    'no-private-token-override': {
      create(context) {
        return {
          Property(node) {
            if (node.key.name.startsWith('--r-') || 
                node.key.name.startsWith('--ds-internal-')) {
              context.report({
                node,
                message: 'Cannot override private design system tokens'
              });
            }
          }
        };
      }
    }
  }
};
```

### 3. Stylelint Plugin (Enforces No Raw Colors)

```javascript
// stylelint-plugin-refactico-tokens
module.exports = {
  rules: {
    'no-raw-colors': {
      // FORBID: #xxxxxx, rgb(), rgba(), hsl() in CSS
      // ENFORCE: var(--ds-color-*) only
      check(rule) {
        const value = rule.value;
        
        // Check for hex colors (#fff, #ffffff, #fff123)
        if (value.match(/#[0-9a-fA-F]{3,6}(?!\w)/)) {
          return {
            line: rule.source.start.line,
            column: rule.source.start.column,
            message: `Raw hex color found. Use var(--ds-color-*) token instead.`,
            severity: 'error',
            fix: null // Manual fix required
          };
        }
        
        // Check for rgb/rgba/hsl/hsla functions
        if (value.match(/\b(rgb|rgba|hsl|hsla)\(/)) {
          return {
            line: rule.source.start.line,
            column: rule.source.start.column,
            message: `Raw color function found. Use var(--ds-color-*) token instead.`,
            severity: 'error',
            fix: null
          };
        }
        
        return null; // No violation
      }
    },
    'use-semantic-tokens': {
      // Warn if color properties don't use tokens
      check(rule) {
        const colorProps = ['color', 'background', 'background-color', 'border-color', 'border-top-color'];
        if (colorProps.includes(rule.property) && 
            !rule.value.includes('var(--ds-') &&
            !rule.value.includes('transparent') &&
            !rule.value.includes('inherit')) {
          return {
            line: rule.source.start.line,
            message: `Consider using design system token: var(--ds-color-*)`,
            severity: 'warning'
          };
        }
      }
    }
  }
};
```

### 4. Runtime Validator (Fails Staging/Production)

**Why**: Console warnings are ignored. Need actionable messages with file/line info.

```typescript
// theme-validator.ts
export class ThemeValidator {
  private publicTokens: Set<string>;
  private environment: 'development' | 'staging' | 'production';
  
  constructor(environment: string) {
    this.environment = environment as any;
    this.publicTokens = this.loadPublicTokens();
  }
  
  validate(customTokens: Record<string, string>, source?: string): ValidationResult {
    const violations = [];
    
    Object.entries(customTokens).forEach(([token, value]) => {
      // Check private token override
      if (token.startsWith('--r-') || token.startsWith('--ds-internal-')) {
        violations.push({
          token,
          value,
          severity: 'error',
          message: `Token "${token}" is private. Use public --ds-* tokens only.`,
          file: source || this.getCallerFile(),
          line: this.getCallerLine(),
          replacement: this.suggestReplacement(token)
        });
      }
      
      // Check if token exists in public API
      if (!this.publicTokens.has(token) && token.startsWith('--ds-')) {
        violations.push({
          token,
          value,
          severity: 'warning',
          message: `Token "${token}" not found in public API. Check documentation.`,
          file: source || this.getCallerFile(),
          line: this.getCallerLine()
        });
      }
    });
    
    // In staging/production: FAIL on errors
    if (this.environment !== 'development' && violations.some(v => v.severity === 'error')) {
      const errorMessage = this.formatViolations(violations);
      throw new Error(`Theme validation failed:\n${errorMessage}`);
    }
    
    // In development: Console warnings with actionable messages
    if (violations.length > 0) {
      this.logViolations(violations);
    }
    
    return { valid: violations.length === 0, violations };
  }
  
  private formatViolations(violations: Violation[]): string {
    return violations.map(v => {
      let msg = `\n  ${v.severity.toUpperCase()}: ${v.message}`;
      msg += `\n    Token: ${v.token}`;
      if (v.file) msg += `\n    File: ${v.file}:${v.line}`;
      if (v.replacement) msg += `\n    Replacement: ${v.replacement}`;
      return msg;
    }).join('\n');
  }
  
  private logViolations(violations: Violation[]): void {
    console.group('🔒 Theme Validation Violations');
    violations.forEach(v => {
      const style = v.severity === 'error' 
        ? 'font-weight: bold; color: red' 
        : 'font-weight: bold; color: orange';
      console.error(
        `%c${v.severity.toUpperCase()}: %c${v.message}`,
        style,
        'color: inherit',
        `\n  Token: ${v.token}`,
        v.file ? `\n  File: ${v.file}:${v.line}` : '',
        v.replacement ? `\n  Replacement: ${v.replacement}` : ''
      );
    });
    console.groupEnd();
  }
  
  private suggestReplacement(token: string): string {
    if (token.startsWith('--r-button-')) {
      return 'Use --ds-color-interactive-primary or --ds-spacing-*';
    }
    if (token.startsWith('--r-input-')) {
      return 'Use --ds-color-* or --ds-spacing-* tokens';
    }
    return 'See token documentation for public alternatives';
  }
  
  private getCallerFile(): string {
    const stack = new Error().stack;
    const match = stack?.match(/at .* \((.+):(\d+):(\d+)\)/);
    return match ? `${match[1]}:${match[2]}` : 'unknown';
  }
  
  private getCallerLine(): number {
    const stack = new Error().stack;
    const match = stack?.match(/at .* \((.+):(\d+):(\d+)\)/);
    return match ? parseInt(match[2]) : 0;
  }
}
```

## 🚀 Performance Optimization

### 1. CSS Variable Organization

```css
/* base.css - Rarely changed (spacing, typography) */
:root {
  --ds-spacing-4: 16px;
  --ds-typography-font-size-base: 16px;
  /* ... loaded once */
}

/* light.css - Theme-specific (colors) */
:root[data-theme="light"] {
  --ds-color-text-primary: #333;
  --ds-color-bg-surface: #fff;
  /* ... swapped on theme change */
}

/* dark.css - Theme-specific (colors) */
:root[data-theme="dark"] {
  --ds-color-text-primary: #fff;
  --ds-color-bg-surface: #1a1a1a;
  /* ... swapped on theme change */
}
```

### 2. Theme Switching Optimization

```typescript
// Only swap color tokens (20-30 vars), not all tokens
const THEME_SWAP_VARS = [
  '--ds-color-text-primary',
  '--ds-color-bg-surface',
  // ... semantic color tokens only
];

function switchTheme(theme: 'light' | 'dark') {
  // Use CSS class toggle instead of inline styles
  document.documentElement.setAttribute('data-theme', theme);
  // CSS handles the rest via attribute selector
}
```

### 3. Bundle Size

- Separate token files (tokens only: ~5KB)
- Theme files (light/dark: ~10KB each)
- Validator (optional: ~3KB)
- Total: ~18KB (gzipped: ~6KB)

## 📋 Implementation Checklist (Revised)

### Phase 1: Foundation
- [ ] Create TypeScript token definitions
- [ ] Set up Style Dictionary
- [ ] Define public vs private token contracts
- [ ] Create naming convention standard
- [ ] Generate CSS custom properties

### Phase 2: Themes
- [ ] Create light theme (manually)
- [ ] Generate dark theme (rule-based)
- [ ] Run contrast validation
- [ ] Manual review & signoff
- [ ] Create theme switching utility

### Phase 3: Enforcement
- [ ] Create ESLint plugin
- [ ] Create Stylelint plugin
- [ ] Create runtime validator
- [ ] Set up CI/CD validation
- [ ] Create migration tooling

### Phase 4: Components
- [ ] Update r-button to use tokens
- [ ] Update r-input to use tokens
- [ ] Add ::part attributes
- [ ] Test shadow DOM compatibility
- [ ] Update internal components

### Phase 5: Accessibility
- [ ] Integrate contrast checker
- [ ] Set up axe-core in CI
- [ ] Create tokens playground
- [ ] Run full a11y audit
- [ ] Document a11y guidelines

### Phase 6: Documentation
- [ ] Token usage guide
- [ ] Theme customization guide
- [ ] Migration guides
- [ ] Examples for 40 apps
- [ ] Open source customization guide

## 🎯 Success Metrics (Revised)

1. ✅ All 40 apps use same base tokens (enforced by CI)
2. ✅ Zero hard-coded colors in components
3. ✅ Dark theme passes WCAG AA (automated checks)
4. ✅ Theme switching < 50ms (only color vars swapped)
5. ✅ Bundle size increase < 10KB (gzipped < 4KB)
6. ✅ 100% WCAG AA compliance (automated validation)
7. ✅ Zero token override violations (CI enforcement)
8. ✅ Migration tooling for version bumps

## 🔧 Migration Path for Existing Code

### Step 1: Audit
```bash
# Find all hard-coded colors
grep -r "#[0-9a-fA-F]\{6\}" src/components/
grep -r "rgb(" src/components/
```

### Step 2: Replace
```typescript
// Before
background-color: #0066cc;

// After
background-color: var(--ds-color-interactive-primary);
```

### Step 3: Validate
```bash
npm run validate:tokens
npm run test:contrast
npm run lint:tokens
```

## 📚 Documentation Structure

1. **Token Reference**: All public tokens with examples
2. **Theme Guide**: How to customize themes
3. **Migration Guide**: Version upgrade instructions
4. **Accessibility Guide**: Contrast requirements
5. **Enforcement Guide**: CI/CD setup for teams
6. **Examples**: Real-world usage patterns

---

## Key Changes from Original Plan

1. ✅ **Manual dark theme** (not auto-generated) - Candidate generation → Automated validation → Manual review → Signoff
2. ✅ **Two-tier token system** (core semantic + component) - Clear public/private separation
3. ✅ **Airtight enforcement** (ESLint + Stylelint + Runtime + CI) - All must pass, blocks PRs
4. ✅ **Raw color enforcement** - Stylelint forbids #xxxxxx, rgb(), hsl() in CSS
5. ✅ **Contrast matrix tool** - Automated checks for all critical token pairs
6. ✅ **Accessibility beyond contrast** - Focus states, motion tokens, color-only detection
7. ✅ **Performance optimization** - CSS attribute selectors, only ~20-30 vars swapped
8. ✅ **Shadow DOM compatibility** - ::part attributes, documented private tokens
9. ✅ **Standardized units** - px for tokens, rem helpers in TS/JS, RGB format for alpha
10. ✅ **Runtime validator UX** - Fails staging/prod with actionable file/line messages
11. ✅ **Migration tooling** - Codemods, compatibility maps, deprecation aliases
12. ✅ **Concrete tooling** - Style Dictionary, validators, tokens playground

## Critical Improvements Based on Review

### 1. Dark Theme Generation (Fixed)
- **Before**: Auto-inversion (risky)
- **After**: Candidate generation → Automated contrast checks → Manual review → Human signoff
- **Why**: Rule-based transforms often fail accessibility or brand intent

### 2. Enforcement Surface (Expanded)
- **Before**: Documentation only
- **After**: ESLint + Stylelint + Runtime Validator + CI/CD (all must pass)
- **Why**: Teams will circumvent unless enforcement is airtight

### 3. Raw Color Prevention (Added)
- **Before**: No enforcement
- **After**: Stylelint rule forbids #xxxxxx, rgb(), hsl() in CSS
- **Why**: Apps editing CSS can still write raw hex values

### 4. Contrast Automation (Enhanced)
- **Before**: Basic contrast checks
- **After**: Contrast matrix tool checking all critical pairs automatically
- **Why**: Token combos explode; manual checks won't scale

### 5. Accessibility Beyond Contrast (Added)
- **Before**: Contrast only
- **After**: Focus states, motion tokens, color-only indicator detection
- **Why**: Contrast is necessary but not sufficient

### 6. Theme Switching Performance (Optimized)
- **Before**: Inline style updates
- **After**: CSS attribute selectors, only ~20-30 vars swapped
- **Why**: Too many CSS var updates cause layout/style thrash

### 7. Shadow DOM Strategy (Clarified)
- **Before**: Assumed global selectors work
- **After**: Semantic CSS variables + ::part, documented private tokens
- **Why**: Global selectors won't reach shadow roots

### 8. Token Units (Standardized)
- **Before**: Mixed px/rem
- **After**: px for tokens, rem helpers in TS/JS, RGB format for alpha
- **Why**: Mixing units causes inconsistent overrides

### 9. Runtime Validator UX (Improved)
- **Before**: Console warnings only
- **After**: Fails staging/prod with actionable file/line messages
- **Why**: Console warnings are ignored

### 10. Versioning & Migration (Automated)
- **Before**: Manual migration
- **After**: Codemods, compatibility maps, deprecation aliases
- **Why**: 40 apps won't upgrade in lockstep
