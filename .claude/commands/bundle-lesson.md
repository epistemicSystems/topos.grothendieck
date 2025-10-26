# Bundle Lesson to Single HTML

Bundles a lesson into a single HTML artifact that can be used as a Claude artifact or standalone file.

## Usage

```
/bundle-lesson LESSON_PATH
```

**Example:**
```
/bundle-lesson packages/lessons/module-01/lesson-1.1
```

## What This Command Does

1. **Navigate** to lesson directory
2. **Verify** all dependencies are installed
3. **Build** the lesson with Parcel
4. **Bundle** all assets into single HTML
5. **Inline** all JavaScript, CSS, fonts
6. **Optimize** for size and performance
7. **Verify** bundle works correctly
8. **Copy** to outputs directory
9. **Generate** metadata and manifest

## Build Process

### Step 1: Install Dependencies
```bash
cd $LESSON_PATH
npm install
```

### Step 2: Run Build
```bash
npm run build
# Uses Parcel to bundle
# Output: dist/bundle.html
```

### Step 3: Verification
- Check bundle size (target: <5MB)
- Test in browser
- Verify math rendering
- Check interactions work
- Test performance (60fps)

### Step 4: Output
Copy to outputs:
```bash
cp dist/bundle.html /mnt/user-data/outputs/$LESSON_ID.html
```

## Bundling Configuration

The `package.json` includes:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && npm run bundle",
    "bundle": "parcel build index.html --dist-dir dist --public-url ."
  },
  "parcelConfig": {
    "minify": true,
    "scopeHoist": true,
    "target": "browser"
  }
}
```

## What Gets Bundled

**Included in bundle**:
- All JavaScript/TypeScript code
- All CSS (Tailwind + custom)
- All images (as data URLs if small, inlined if possible)
- KaTeX fonts and CSS
- Three.js library
- All dependencies

**Not included**:
- External API calls (not allowed in artifacts)
- localStorage/sessionStorage (not supported)
- External fonts (use inlined or system fonts)

## Verification Checks

After bundling, the command verifies:

### Size Check
- Total size < 5MB (warning if larger)
- Compressed size < 2MB (optimal)

### Functionality Check
- HTML loads without errors
- Math renders correctly (KaTeX)
- Interactions work
- Animations smooth
- No console errors

### Performance Check
- Initial load < 3s
- Interaction latency < 100ms
- Animations 60fps
- No memory leaks

### Compatibility Check
- Works in latest Chrome
- Works in latest Firefox
- Works in latest Safari
- Works in latest Edge

## Output Files

After bundling:

```
dist/
├── bundle.html          # Single HTML artifact
├── manifest.json        # Metadata
└── preview.png          # Screenshot (optional)

/mnt/user-data/outputs/
└── lesson-X.X.html      # Final output
```

## Manifest

`manifest.json` includes:

```json
{
  "lesson": "1.1",
  "title": "What is a Category?",
  "module": "module-01-category-theory",
  "bundleSize": 2458000,
  "created": "2025-10-26T12:00:00Z",
  "dependencies": {
    "react": "18.2.0",
    "three": "0.158.0",
    "katex": "0.16.9"
  },
  "verified": true
}
```

## Troubleshooting

### Bundle Too Large (>5MB)
- Lazy load heavy components
- Optimize images (WebP, reduce quality)
- Remove unused dependencies
- Code split if possible

### Math Not Rendering
- Verify KaTeX CSS is inlined
- Check font paths
- Ensure delimiters correct

### Interactions Not Working
- Check for external API calls
- Verify all state is local
- Check console for errors

### Performance Issues
- Profile with DevTools
- Check for memory leaks
- Optimize heavy computations
- Use Web Workers for math

## Tips

- **Test before bundling**: Make sure lesson works in dev mode
- **Optimize assets**: Compress images, minimize code
- **Verify offline**: Bundle should work without network
- **Check size**: Aim for <3MB for best performance

## Related Commands

- `/new-lesson`: Create new lesson
- `/test-lesson`: Run tests before bundling
- `/quality-check`: Verify lesson quality
