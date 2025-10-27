#!/usr/bin/env node
/**
 * Inline all CSS and JS from Vite dist into a single HTML file
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const bundleDir = path.join(__dirname, 'bundle');
const indexPath = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');

// Create bundle directory
if (!fs.existsSync(bundleDir)) {
  fs.mkdirSync(bundleDir, { recursive: true });
}

// Read the index.html
let html = fs.readFileSync(indexPath, 'utf8');

// Read all assets and inline them
if (fs.existsSync(assetsDir)) {
  const assets = fs.readdirSync(assetsDir);

  assets.forEach(asset => {
    const assetPath = path.join(assetsDir, asset);
    const content = fs.readFileSync(assetPath, 'utf8');

    if (asset.endsWith('.css')) {
      // Inline CSS
      const cssTag = `<link[^>]*href="[^"]*${asset}"[^>]*>`;
      const inlinedCss = `<style>${content}</style>`;
      html = html.replace(new RegExp(cssTag), inlinedCss);
    } else if (asset.endsWith('.js')) {
      // Inline JS
      const jsTag = `<script[^>]*src="[^"]*${asset}"[^>]*><\/script>`;
      const inlinedJs = `<script type="module">${content}</script>`;
      html = html.replace(new RegExp(jsTag), inlinedJs);
    }
  });
}

// Write the inlined HTML
const outputPath = path.join(bundleDir, 'index.html');
fs.writeFileSync(outputPath, html);

// Get file size
const stats = fs.statSync(outputPath);
const fileSizeMB = stats.size / (1024 * 1024);

console.log(`✓ Created single HTML file: ${outputPath}`);
console.log(`✓ File size: ${fileSizeMB.toFixed(2)} MB`);

if (fileSizeMB > 5) {
  console.warn(`⚠ Warning: File size exceeds 5MB target (${fileSizeMB.toFixed(2)} MB)`);
}
