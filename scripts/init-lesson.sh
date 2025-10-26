#!/bin/bash
# Initialize a new lesson from template

set -e

# Check arguments
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 MODULE_ID LESSON_ID TITLE"
    echo "Example: $0 module-01 lesson-1.1 \"What is a Category?\""
    exit 1
fi

MODULE_ID=$1
LESSON_ID=$2
TITLE=$3

# Paths
LESSON_DIR="packages/lessons/$MODULE_ID/$LESSON_ID"
TEMPLATE_DIR="docs/lesson-template"

echo "Creating lesson: $TITLE"
echo "Module: $MODULE_ID"
echo "Lesson: $LESSON_ID"
echo "Path: $LESSON_DIR"

# Create directory structure
mkdir -p "$LESSON_DIR/src/components"
mkdir -p "$LESSON_DIR/src/styles"

# Create package.json
cat > "$LESSON_DIR/package.json" <<EOF
{
  "name": "@grothendieck/$LESSON_ID",
  "version": "0.1.0",
  "description": "$TITLE",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "bundle": "parcel build index.html --dist-dir dist --public-url .",
    "preview": "vite preview",
    "test": "jest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@grothendieck/core": "workspace:*",
    "three": "^0.158.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "katex": "^0.16.9",
    "framer-motion": "^10.16.0",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.1.0",
    "autoprefixer": "^10.4.0",
    "parcel": "^2.10.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.2.0",
    "vite": "^5.0.0"
  }
}
EOF

# Create index.html
cat > "$LESSON_DIR/index.html" <<EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$TITLE - Grothendieck Explorable Explanations</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Create main.tsx
cat > "$LESSON_DIR/src/main.tsx" <<EOF
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/lesson.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# Create App.tsx
cat > "$LESSON_DIR/src/App.tsx" <<EOF
import React, { useState } from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold">$TITLE</h1>
        <p className="text-gray-400">Grothendieck Explorable Explanations</p>
      </header>

      <main className="container mx-auto p-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-lg text-gray-700">
            Welcome to this interactive exploration...
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Interactive Exploration</h2>
          {/* Add interactive components here */}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Exercises</h2>
          {/* Add assessment components here */}
        </section>
      </main>
    </div>
  );
}
EOF

# Create styles
cat > "$LESSON_DIR/src/styles/lesson.css" <<EOF
@tailwind base;
@tailwind components;
@tailwind utilities;

/* KaTeX styles */
@import 'katex/dist/katex.css';

/* Custom mathematical styles */
.math-display {
  @apply my-4 overflow-x-auto;
}

.math-inline {
  @apply inline;
}

/* Interactive widget styles */
.interactive-widget {
  @apply border-2 border-gray-200 rounded-lg p-4;
}

.parameter-panel {
  @apply bg-gray-50 p-4 rounded-lg;
}

/* Proof styles */
.proof-step {
  @apply border-l-4 border-blue-500 pl-4 py-2 mb-4;
}

.proof-justification {
  @apply text-sm text-gray-600 italic;
}
EOF

# Create CLAUDE.md
cat > "$LESSON_DIR/CLAUDE.md" <<EOF
# $LESSON_ID: $TITLE

## Learning Objectives

- [Objective 1]
- [Objective 2]
- [Objective 3]

## Prerequisites

- [Prerequisite 1]
- [Prerequisite 2]

## Narrative Arc

1. **Introduction** (2-3 min)
   - Hook and motivation
   - Context setting

2. **Interactive Exploration** (20-40 min)
   - Main concepts
   - Interactive widgets
   - Guided questions

3. **Exercises** (10-20 min)
   - Hands-on challenges
   - Assessment

4. **Synthesis** (2-3 min)
   - Key takeaways
   - Preview next lesson

## Interactive Components

### Component 1
- **Purpose**: [Description]
- **Features**: [List key features]
- **Implementation**: [Technical notes]

### Component 2
- **Purpose**: [Description]
- **Features**: [List key features]

## Technical Requirements

- React 18 + TypeScript
- Three.js (if 3D visualization needed)
- KaTeX for math rendering
- Core components from @grothendieck/core

## Quality Checklist

- [ ] Mathematical correctness verified
- [ ] All interactions < 100ms
- [ ] 60fps animations
- [ ] Keyboard accessible
- [ ] Learning objectives met
- [ ] Bundle size < 5MB

## Notes

[Any additional notes or considerations]
EOF

# Create README
cat > "$LESSON_DIR/README.md" <<EOF
# $TITLE

Part of the Grothendieck Explorable Explanations series.

## Module

$MODULE_ID

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Bundle to single HTML
npm run bundle
\`\`\`

## Learning Objectives

See [CLAUDE.md](./CLAUDE.md) for detailed learning objectives and implementation notes.

## License

MIT
EOF

# Create .gitignore
cat > "$LESSON_DIR/.gitignore" <<EOF
node_modules
dist
.parcel-cache
*.log
.DS_Store
EOF

# Create TypeScript config
cat > "$LESSON_DIR/tsconfig.json" <<EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# Create Vite config
cat > "$LESSON_DIR/vite.config.ts" <<EOF
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
EOF

# Create Tailwind config
cat > "$LESSON_DIR/tailwind.config.js" <<EOF
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
EOF

echo ""
echo "✓ Lesson created successfully!"
echo ""
echo "Next steps:"
echo "  1. cd $LESSON_DIR"
echo "  2. npm install"
echo "  3. npm run dev"
echo "  4. Edit CLAUDE.md to define lesson requirements"
echo "  5. Implement interactive components"
echo ""
