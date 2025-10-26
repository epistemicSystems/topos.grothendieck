# Project Grothendieck - Architecture

## Overview

This document describes the technical architecture for the Grothendieck Explorable Explanations project.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Lesson HTML Artifact                     │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │           React Application                  │    │  │
│  │  │  ┌────────────────────────────────────────┐  │    │  │
│  │  │  │  Lesson Shell                          │  │    │  │
│  │  │  │  - Narrative sections                  │  │    │  │
│  │  │  │  - Interactive widgets                 │  │    │  │
│  │  │  │  - Assessment components               │  │    │  │
│  │  │  └────────────────────────────────────────┘  │    │  │
│  │  │                                              │    │  │
│  │  │  ┌────────────────────────────────────────┐  │    │  │
│  │  │  │  Core Components (from packages/core)  │  │    │  │
│  │  │  │  - CategoryDiagram                     │  │    │  │
│  │  │  │  - SpectrumViewer                      │  │    │  │
│  │  │  │  - SheafExplorer                       │  │    │  │
│  │  │  │  - ProofStepper                        │  │    │  │
│  │  │  └────────────────────────────────────────┘  │    │  │
│  │  │                                              │    │  │
│  │  │  ┌────────────────────────────────────────┐  │    │  │
│  │  │  │  Mathematical Libraries                │  │    │  │
│  │  │  │  - category-theory.ts                  │  │    │  │
│  │  │  │  - commutative-algebra.ts              │  │    │  │
│  │  │  │  - sheaf-theory.ts                     │  │    │  │
│  │  │  └────────────────────────────────────────┘  │    │  │
│  │  │                                              │    │  │
│  │  │  ┌────────────────────────────────────────┐  │    │  │
│  │  │  │  Rendering Engines                     │  │    │  │
│  │  │  │  - Three.js (3D)                       │  │    │  │
│  │  │  │  - WebGPU (compute)                    │  │    │  │
│  │  │  │  - KaTeX (math)                        │  │    │  │
│  │  │  └────────────────────────────────────────┘  │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Core Components (`packages/core`)

Reusable components organized by purpose:

```
packages/core/
├── src/
│   ├── components/
│   │   ├── math/              # Mathematical visualizations
│   │   │   ├── CategoryDiagram.tsx
│   │   │   ├── SpectrumViewer.tsx
│   │   │   ├── SheafExplorer.tsx
│   │   │   ├── FunctorAnimator.tsx
│   │   │   └── ToposNavigator.tsx
│   │   ├── pedagogy/          # Learning support
│   │   │   ├── ProofStepper.tsx
│   │   │   ├── ConceptCard.tsx
│   │   │   ├── ExercisePlayground.tsx
│   │   │   └── ParameterPanel.tsx
│   │   └── ui/                # UI components (shadcn/ui)
│   ├── lib/
│   │   ├── math/              # Mathematical utilities
│   │   │   ├── category-theory.ts
│   │   │   ├── commutative-algebra.ts
│   │   │   ├── sheaf-theory.ts
│   │   │   └── schemes.ts
│   │   └── gpu/               # WebGPU utilities
│   │       ├── webgpu-helpers.ts
│   │       └── shaders/
│   │           ├── spectrum.wgsl
│   │           └── sheaf-flow.wgsl
│   └── styles/
│       └── mathematical.css
```

### Lesson Architecture

Each lesson is a self-contained React application:

```
lesson-X.X/
├── src/
│   ├── App.tsx               # Main component
│   ├── components/           # Lesson-specific
│   │   ├── NarrativeSection.tsx
│   │   ├── InteractiveWidget.tsx
│   │   └── Assessment.tsx
│   └── styles/
│       └── lesson.css
├── index.html
└── package.json
```

## Data Flow

### Reactive State Management

```
User Interaction
    ↓
Parameter Change
    ↓
Mathematical Computation
    ↓
State Update (Zustand/Jotai)
    ↓
React Re-render
    ↓
Visualization Update (Three.js/WebGPU)
```

### State Architecture

```typescript
// Global lesson state
interface LessonState {
  // User-controlled parameters
  parameters: {
    [key: string]: number | string | boolean;
  };

  // Derived mathematical objects
  math: {
    algebraic: any;     // e.g., Ring, Category
    geometric: any;     // e.g., TopologicalSpace, Scheme
    categorical: any;   // e.g., Functor, NaturalTransformation
  };

  // UI state
  ui: {
    activeView: 'algebraic' | 'geometric' | 'categorical';
    selectedElement: string | null;
    hoveredElement: string | null;
    cameraPosition: Vector3;
  };

  // Learning state
  progress: {
    completedSections: string[];
    answeredQuestions: string[];
    currentSection: number;
  };
}
```

## Rendering Architecture

### Three.js Integration

For 3D mathematical visualizations:

```typescript
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function SpectrumViewer({ ring }: { ring: Ring }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <SpectrumMesh ring={ring} />
    </Canvas>
  );
}

function SpectrumMesh({ ring }: { ring: Ring }) {
  const spectrum = useComputeSpectrum(ring);

  return (
    <instancedMesh count={spectrum.primeIdeals.length}>
      <sphereGeometry args={[0.05]} />
      <meshStandardMaterial />
    </instancedMesh>
  );
}
```

### WebGPU Compute Pipeline

For heavy mathematical computations:

```typescript
// Compute shader (WGSL)
@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;

@compute @workgroup_size(64)
fn computeSpectrum(@builtin(global_invocation_id) id: vec3<u32>) {
  let idx = id.x;
  // Compute spectrum in parallel
  output[idx] = computePrimeIdeal(input[idx]);
}
```

```typescript
// TypeScript interface
async function computeSpectrumGPU(ring: Ring): Promise<SpectrumData> {
  const device = await getGPUDevice();

  // Create buffers
  const inputBuffer = device.createBuffer({
    size: ring.size * 4,
    usage: GPUBufferUsage.STORAGE,
  });

  // Run compute shader
  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginComputePass();
  passEncoder.setPipeline(pipeline);
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.dispatchWorkgroups(Math.ceil(ring.size / 64));
  passEncoder.end();

  // Read results
  const result = await readBuffer(outputBuffer);
  return parseSpectrum(result);
}
```

## Performance Architecture

### Optimization Strategy

1. **React Optimization**
   - Memoization: `React.memo`, `useMemo`, `useCallback`
   - Code splitting: `React.lazy`
   - Virtualization: For large lists

2. **Three.js Optimization**
   - Instancing: For repeated geometry
   - LOD: Level of detail
   - Frustum culling: Automatic
   - Geometry/material sharing

3. **WebGPU Optimization**
   - Parallel computation
   - Buffer reuse
   - Pipeline caching
   - Async readback

4. **Bundle Optimization**
   - Tree shaking
   - Minification
   - Compression
   - Asset optimization

### Performance Budget

- **Initial Load**: < 3 seconds
- **Time to Interactive**: < 5 seconds
- **Interaction Latency**: < 100ms
- **Animation Frame Rate**: 60fps (16.67ms/frame)
- **Bundle Size**: < 5MB
- **Memory Usage**: < 500MB

## Build Architecture

### Development Build

```
Vite Dev Server
  ↓
Hot Module Replacement (HMR)
  ↓
Fast refresh
```

### Production Build

```
Vite Build
  ↓
TypeScript Compilation
  ↓
Bundling (Rollup)
  ↓
Minification
  ↓
Parcel Bundle (Single HTML)
  ↓
Asset Inlining
  ↓
Final Artifact
```

## Bundling Process

```bash
# 1. Vite builds the app
vite build
  → Compiles TypeScript
  → Bundles with Rollup
  → Outputs to dist/

# 2. Parcel creates single HTML
parcel build index.html
  → Inlines all JS
  → Inlines all CSS
  → Inlines small assets
  → Outputs bundle.html

# 3. Verification
- Check size < 5MB
- Test all functionality
- Validate performance
```

## Testing Architecture

### Test Types

1. **Unit Tests**: Jest + React Testing Library
   - Component rendering
   - Mathematical functions
   - User interactions

2. **Integration Tests**: Jest
   - Component composition
   - State management
   - Data flow

3. **Visual Tests**: Percy/Chromatic
   - Screenshot comparison
   - Visual regression

4. **Performance Tests**: Custom
   - Frame rate monitoring
   - Interaction latency
   - Memory profiling

5. **Accessibility Tests**: jest-axe
   - ARIA compliance
   - Keyboard navigation
   - Screen reader support

## Deployment Architecture

### Artifact Distribution

```
Lesson Bundle (HTML)
  ↓
Static Hosting (S3/CDN)
  ↓
User Browser
```

Or:

```
Lesson Bundle
  ↓
Claude Artifact System
  ↓
Rendered in claude.ai
```

## Security Considerations

Since lessons run in user browsers:

- **No external API calls**: Everything self-contained
- **No localStorage**: Not supported in artifacts
- **No user data collection**: Privacy-first
- **CSP compliant**: Content Security Policy
- **XSS prevention**: React's built-in protection

## Accessibility Architecture

### WCAG AA Compliance

- **Keyboard Navigation**: Full support
- **Screen Readers**: ARIA labels
- **Color Contrast**: 4.5:1 minimum
- **Focus Management**: Clear indicators
- **Semantic HTML**: Proper structure
- **Resizable Text**: 200% zoom support

### Implementation

```typescript
function AccessibleComponent() {
  return (
    <div
      role="region"
      aria-label="Interactive Category Diagram"
      tabIndex={0}
      onKeyDown={handleKeyboard}
    >
      <CategoryDiagram {...props} />
    </div>
  );
}
```

## Technology Choices

### Why React?
- Component-based architecture
- Rich ecosystem
- Excellent Three.js integration
- TypeScript support
- Fast with proper optimization

### Why Three.js?
- Industry standard for 3D web
- Excellent documentation
- Good performance
- Active community
- React integration (R3F)

### Why WebGPU?
- Modern GPU API
- Compute shaders
- Better performance than WebGL
- Future-proof

### Why Vite + Parcel?
- Vite: Fast dev server, HMR
- Parcel: Easy single-file bundling
- Best of both worlds

### Why TypeScript?
- Type safety
- Better refactoring
- Excellent tooling
- Catches bugs early

## Scalability Considerations

### Code Reuse
- Core components used across all lessons
- Mathematical libraries shared
- Consistent patterns

### Parallel Development
- Git worktrees for parallel lesson dev
- Independent lesson bundles
- No cross-dependencies

### Performance Scaling
- WebGPU for large datasets
- Instancing for repeated elements
- LOD for complex scenes
- Lazy loading for heavy components

## Future Architecture

### Potential Enhancements

1. **Derived Algebraic Geometry**
   - ∞-categories
   - Derived schemes
   - Extended components

2. **Interactive Proofs**
   - Lean integration
   - Proof assistant
   - Verified mathematics

3. **Collaborative Features**
   - Shared explorations
   - Discussion threads
   - Community contributions

4. **Advanced Visualizations**
   - VR/AR support
   - Real-time collaboration
   - AI-assisted exploration

---

**Document Version**: 1.0
**Last Updated**: 2025-10-26
**Status**: Foundation
