/**
 * Development start script
 * Runs prebuild, initial build with postbuild, then starts watch mode
 */

import { spawn } from 'child_process';
import * as path from 'path';

console.log('🔧 Running prebuild (generate:ionic-mapping)...');

// Step 1: Run prebuild
const prebuild = spawn('npm', ['run', 'generate:ionic-mapping'], {
  stdio: 'inherit',
  shell: true,
  cwd: path.join(__dirname, '..'),
});

prebuild.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Prebuild failed');
    process.exit(code);
  }

  console.log('✅ Prebuild complete');
  console.log('🔨 Running initial build...');

  // Step 2: Run initial build (this will trigger postbuild automatically)
  const build = spawn('npm', ['run', 'build'], {
    stdio: 'inherit',
    shell: true,
    cwd: path.join(__dirname, '..'),
  });

  build.on('close', (buildCode) => {
    if (buildCode !== 0) {
      console.error('❌ Initial build failed');
      process.exit(buildCode);
    }

    console.log('✅ Initial build complete (postbuild ran automatically)');
    console.log('🚀 Starting Stencil in watch mode...');

    // Step 3: Start watch mode (postbuild won't run automatically on watch rebuilds)
    const watch = spawn('npx', ['stencil', 'build', '--dev', '--watch', '--serve'], {
      stdio: 'inherit',
      shell: true,
      cwd: path.join(__dirname, '..'),
    });

    watch.on('close', (watchCode) => {
      process.exit(watchCode || 0);
    });
  });
});

