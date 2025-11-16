/**
 * Bundles theme.css with all @import statements resolved into a single file
 * Generates tokens.css inline (not as a separate file) and minifies output
 * Outputs to dist/theme.css for end users to import
 * Run: npm run bundle:theme
 */

import * as fs from 'fs';
import * as path from 'path';

const themeCssPath = path.join(__dirname, '../src/global/theme.css');
const outputPath = path.join(__dirname, '../dist/theme.css');

/**
 * Minifies CSS by removing comments, extra whitespace, and newlines
 */
function minifyCSS(css: string): string {
  return css
    // Remove comments (but keep first comment block for header)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around specific characters
    .replace(/\s*([{}:;,])\s*/g, '$1')
    // Remove trailing semicolons before closing braces
    .replace(/;}/g, '}')
    // Trim
    .trim();
}

/**
 * Generates tokens CSS inline (matches Ionic's token structure)
 * Only includes tokens that Ionic actually uses (no shadows - Ionic doesn't use shadow tokens)
 */
function generateTokensCSS(): string {
  const { colors } = require('../src/tokens/colors');
  const { typography } = require('../src/tokens/typography');
  const { borders } = require('../src/tokens/borders');
  
  // Helper functions
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : [0, 0, 0];
  };
  
  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };
  
  const blendColors = (fg: string, bg: string, opacity: number): string => {
    const f = hexToRgb(fg);
    const b = hexToRgb(bg);
    const r = f[0] * opacity + b[0] * (1 - opacity);
    const g = f[1] * opacity + b[1] * (1 - opacity);
    const bl = f[2] * opacity + b[2] * (1 - opacity);
    return rgbToHex(r, g, bl);
  };
  
  let css = ':root{';
  
  // Color system (matches Ionic exactly)
  const colorVars: [string, any][] = [
    ['primary', colors.primary],
    ['secondary', colors.secondary],
    ['tertiary', colors.tertiary],
    ['success', colors.success],
    ['warning', colors.warning],
    ['danger', colors.danger],
    ['light', colors.light],
    ['medium', colors.medium],
    ['dark', colors.dark],
  ];
  
  colorVars.forEach(([name, color]) => {
    css += `--r-color-${name}:${color.baseHex};`;
    css += `--r-color-${name}-rgb:${color.base.replace(/ /g, ',')};`;
    css += `--r-color-${name}-shade:${color.shadeHex};`;
    css += `--r-color-${name}-tint:${color.tintHex};`;
    css += `--r-color-${name}-contrast:${color.contrastHex};`;
    css += `--r-color-${name}-contrast-rgb:${color.contrast.replace(/ /g, ',')};`;
  });
  
  // Background
  css += `--r-background-color:${colors.background.surfaceHex};`;
  css += `--r-background-color-rgb:${colors.background.surface.replace(/ /g, ',')};`;
  
  // Text colors
  css += `--r-text-color:${colors.text.primaryHex};`;
  css += `--r-text-color-rgb:${colors.text.primary.replace(/ /g, ',')};`;
  
  // Text color steps (calculated opacity blends for light theme)
  const textSteps = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950];
  textSteps.forEach((step) => {
    const opacity = step / 1000;
    const blended = blendColors(colors.text.primaryHex, colors.background.surfaceHex, opacity);
    css += `--r-text-color-step-${step}:${blended};`;
  });
  
  // Typography (only what Ionic uses: font-family and font-size-base)
  css += `--r-font-family:${typography.fontFamily.primary};`;
  css += `--r-font-size-base:${typography.fontSize.base};`;
  
  // Spacing (only what Ionic uses: padding and margin)
  css += `--r-padding:16px;`;
  css += `--r-margin:16px;`;
  
  // Borders (only what Ionic uses)
  css += `--r-border-color:${colors.border.defaultHex};`;
  css += `--r-border-width:${borders.width.base};`;
  css += `--r-border-radius:${borders.radius.base};`;
  css += `--r-border-style:solid;`;
  
  css += '}';
  
  return css;
}

/**
 * Generates dark theme CSS with calculated text-color-step values
 */
function generateDarkThemeCSS(): string {
  
  // Helper functions (same as above)
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : [0, 0, 0];
  };
  
  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };
  
  const blendColors = (fg: string, bg: string, opacity: number): string => {
    const f = hexToRgb(fg);
    const b = hexToRgb(bg);
    const r = f[0] * opacity + b[0] * (1 - opacity);
    const g = f[1] * opacity + b[1] * (1 - opacity);
    const bl = f[2] * opacity + b[2] * (1 - opacity);
    return rgbToHex(r, g, bl);
  };
  
  // Dark theme colors (from dark.css)
  const darkText = '#ffffff';
  const darkBackground = '#1a1a1a';
  
  let css = ':root[data-theme="dark"]{';
  
  // Dark theme color overrides (from dark.css)
  css += `--r-color-primary:#3388dd;--r-color-primary-rgb:51,136,221;--r-color-primary-shade:#2a6db3;--r-color-primary-tint:#4d99e6;--r-color-primary-contrast:#ffffff;--r-color-primary-contrast-rgb:255,255,255;`;
  css += `--r-color-secondary:#7a78e6;--r-color-secondary-rgb:122,120,230;--r-color-secondary-shade:#6361c0;--r-color-secondary-tint:#8a88ea;--r-color-secondary-contrast:#ffffff;--r-color-secondary-contrast-rgb:255,255,255;`;
  css += `--r-color-success:#4caf50;--r-color-success-rgb:76,175,80;--r-color-success-shade:#409944;--r-color-success-tint:#5eb862;`;
  css += `--r-color-warning:#ffb300;--r-color-warning-rgb:255,179,0;--r-color-warning-shade:#e09f00;--r-color-warning-tint:#ffbc1a;`;
  css += `--r-color-danger:#f44336;--r-color-danger-rgb:244,67,54;--r-color-danger-shade:#d73a2e;--r-color-danger-tint:#f55a4e;`;
  css += `--r-color-dark:#ffffff;--r-color-dark-rgb:255,255,255;--r-color-dark-shade:#ffffff;--r-color-dark-tint:#ffffff;--r-color-dark-contrast:#1a1a1a;--r-color-dark-contrast-rgb:26,26,26;`;
  css += `--r-color-light:#2d2d2d;--r-color-light-rgb:45,45,45;--r-color-light-shade:#2d2d2d;--r-color-light-tint:#2d2d2d;--r-color-light-contrast:#ffffff;--r-color-light-contrast-rgb:255,255,255;`;
  css += `--r-color-medium:#b3b3b3;--r-color-medium-rgb:179,179,179;--r-color-medium-shade:#b3b3b3;--r-color-medium-tint:#b3b3b3;--r-color-medium-contrast:#1a1a1a;--r-color-medium-contrast-rgb:26,26,26;`;
  css += `--r-background-color:${darkBackground};--r-background-color-rgb:26,26,26;`;
  css += `--r-text-color:${darkText};--r-text-color-rgb:255,255,255;`;
  
  // Text color steps for dark theme (calculated opacity blends)
  const textSteps = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950];
  textSteps.forEach((step) => {
    const opacity = step / 1000;
    const blended = blendColors(darkText, darkBackground, opacity);
    css += `--r-text-color-step-${step}:${blended};`;
  });
  
  css += `--r-border-color:#404040;`;
  
  css += '}';
  
  return css;
}

function resolveImports(cssContent: string, baseDir: string): string {
  const importRegex = /@import\s+['"]([^'"]+)['"]\s*;/g;
  let resolved = cssContent;
  let match;
  const originalContent = cssContent; // Store original for regex matching

  while ((match = importRegex.exec(originalContent)) !== null) {
    const importPath = match[1];
    
    // Handle Ionic CSS import - inline it directly
    if (importPath.includes('ionic.bundle.css')) {
      // Try multiple possible paths
      const possiblePaths = [
        path.join(__dirname, '../', importPath),
        path.join(__dirname, '../node_modules/@ionic/core/css/ionic.bundle.css'),
        path.resolve(baseDir, importPath),
        path.resolve(baseDir, '../../node_modules/@ionic/core/css/ionic.bundle.css'),
      ];
      
      let ionicCss: string | null = null;
      for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
          ionicCss = fs.readFileSync(possiblePath, 'utf-8');
          console.log(`✅ Found Ionic CSS at: ${possiblePath}`);
          break;
        }
      }
      
      if (ionicCss) {
        // Inline the Ionic CSS (it's already minified/bundled)
        resolved = resolved.replace(match[0], ionicCss);
      } else {
        console.warn(`⚠️  Warning: Could not find Ionic CSS. Tried paths:`, possiblePaths);
        // Remove the import if we can't find it
        resolved = resolved.replace(match[0], '');
      }
      continue;
    }
    
    // Skip tokens.css - we'll generate it inline
    if (importPath.includes('tokens.css')) {
      const tokensCSS = generateTokensCSS();
      resolved = resolved.replace(match[0], tokensCSS);
      continue;
    }
    
    // Handle dark.css - generate text-color-step values dynamically
    if (importPath.includes('dark.css')) {
      const darkCSS = generateDarkThemeCSS();
      resolved = resolved.replace(match[0], darkCSS);
      continue;
    }
    
    // Handle other node_modules imports
    let fullPath: string;
    if (importPath.startsWith('../../node_modules/')) {
      fullPath = path.join(__dirname, '../', importPath);
    } else if (importPath.startsWith('../node_modules/')) {
      fullPath = path.join(__dirname, '../', importPath);
    } else {
      fullPath = path.resolve(baseDir, importPath);
    }
    
    if (fs.existsSync(fullPath)) {
      const importedContent = fs.readFileSync(fullPath, 'utf-8');
      const resolvedImported = resolveImports(importedContent, path.dirname(fullPath));
      resolved = resolved.replace(match[0], resolvedImported);
    } else {
      console.warn(`⚠️  Warning: Could not find import: ${importPath}`);
    }
  }

  return resolved;
}

// Ensure dist directory exists
const distDir = path.dirname(outputPath);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Read the main theme.css file
const themeCss = fs.readFileSync(themeCssPath, 'utf-8');

// Resolve all @import statements (tokens.css will be generated inline)
const bundledCss = resolveImports(themeCss, path.dirname(themeCssPath));

// Minify the CSS
const minifiedCss = minifyCSS(bundledCss);

// Add header comment
const header = `/* Refactico Design System - Theme CSS Bundle */
/* Generated automatically - do not edit manually */
/* Tokens are generated from TypeScript definitions in src/tokens/ */

`;

// Write the bundled and minified CSS to dist
fs.writeFileSync(outputPath, header + minifiedCss, 'utf-8');

console.log('✅ Bundled theme.css');
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 Size: ${(minifiedCss.length / 1024).toFixed(2)} KB`);
