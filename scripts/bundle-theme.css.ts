/**
 * Bundles theme.css with all @import statements resolved into a single file
 * Outputs to dist/theme.css for end users to import
 * Run: npm run bundle:theme
 */

import * as fs from 'fs';
import * as path from 'path';

const themeCssPath = path.join(__dirname, '../src/global/theme.css');
const outputPath = path.join(__dirname, '../dist/theme.css');

function resolveImports(cssContent: string, baseDir: string): string {
  const importRegex = /@import\s+['"]([^'"]+)['"]\s*;/g;
  let resolved = cssContent;
  let match;

  while ((match = importRegex.exec(cssContent)) !== null) {
    const importPath = match[1];
    const fullPath = path.resolve(baseDir, importPath);
    
    if (fs.existsSync(fullPath)) {
      const importedContent = fs.readFileSync(fullPath, 'utf-8');
      // Recursively resolve imports in the imported file
      const resolvedImported = resolveImports(importedContent, path.dirname(fullPath));
      // Replace the @import statement with the actual content
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

// Resolve all @import statements
const bundledCss = resolveImports(themeCss, path.dirname(themeCssPath));

// Add header comment
const header = `/* Refactico Design System - Theme CSS Bundle */
/* This file contains all theme CSS variables and Ionic bridge mappings */
/* Generated automatically - do not edit manually */
/* Source: src/global/theme.css */

`;

// Write the bundled CSS to dist
fs.writeFileSync(outputPath, header + bundledCss, 'utf-8');

console.log('✅ Bundled theme.css');
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 Size: ${(bundledCss.length / 1024).toFixed(2)} KB`);

