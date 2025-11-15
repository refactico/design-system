/**
 * Generates ionic-bridge.css from mapping configuration
 * Run: npm run generate:ionic-mapping
 */

const fs = require('fs');
const path = require('path');
const { ionicMappingConfig } = require('../src/tokens/ionic-mapping.config');

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
const outputPath = path.join(__dirname, '../src/themes/ionic-bridge.css');
const css = generateCSS();
fs.writeFileSync(outputPath, css, 'utf-8');

const mappingCount = css.split('\n').filter(l => l.includes(': var(')).length;

console.log('✅ Generated ionic-bridge.css');
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 Total mappings: ${mappingCount}`);

