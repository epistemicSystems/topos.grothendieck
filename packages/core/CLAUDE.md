# Core Component Library

## Purpose

Reusable components for building interactive mathematical lessons across all modules of the Grothendieck Explorable Explanations course.

## Component Categories

### Mathematical Components (`src/components/math/`)

Visualize mathematical structures. These are the heart of the explorable explanations.

#### CategoryDiagram
**File**: `CategoryDiagram.tsx`
**Purpose**: Interactive commutative diagrams

```typescript
interface CategoryDiagramProps {
  // Mathematical objects
  objects: Array<{
    id: string;
    label: string;
    definition?: string;
    position?: { x: number; y: number };
  }>;

  // Morphisms between objects
  morphisms: Array<{
    id: string;
    from: string;
    to: string;
    label: string;
    definition?: string;
    style?: 'solid' | 'dashed' | 'dotted';
  }>;

  // Natural transformations (optional)
  naturalTransformations?: Array<{
    from: string; // functor id
    to: string;   // functor id
    label: string;
  }>;

  // Visual customization
  highlightPath?: string[]; // morphism ids to highlight
  animated?: boolean;

  // Interactions
  onObjectClick?: (id: string) => void;
  onMorphismClick?: (id: string) => void;
  onCompose?: (m1: string, m2: string) => void;
}
```

**Features**:
- Automatic force-directed layout (or manual positioning)
- Hover to see definitions
- Click to compose morphisms
- Animate natural transformations
- Show commutativity paths

**Performance**: Handle up to 50 objects smoothly

---

#### SpectrumViewer
**File**: `SpectrumViewer.tsx`
**Purpose**: 3D visualization of Spec(R)

```typescript
interface SpectrumViewerProps {
  // Ring to visualize
  ring: Ring; // from lib/math/commutative-algebra

  // View mode
  dimension: '2D' | '3D';

  // Visual options
  colorBy: 'height' | 'type' | 'custom';
  showTopology?: boolean;
  showStructureSheaf?: boolean;

  // Interactions
  onPointClick?: (primeIdeal: PrimeIdeal) => void;
  selectedPoint?: string;
}
```

**Features**:
- 3D point cloud for prime ideals
- Zariski topology as glowing regions
- Structure sheaf values on hover
- Color-coded by height/type
- WebGPU for large Specs (>1000 primes)

**Performance**: Use instancing, target 60fps

---

#### SheafExplorer
**File**: `SheafExplorer.tsx`
**Purpose**: Interactive sheaf visualization

```typescript
interface SheafExplorerProps {
  // Topological space
  space: TopologicalSpace;

  // Sheaf or presheaf
  sheaf: Sheaf | Presheaf;

  // Mode
  mode: 'explore' | 'sheafify' | 'glue';

  // Interactions
  onOpenSetSelect?: (openSet: string) => void;
  onSectionSelect?: (section: any) => void;
}
```

**Features**:
- Visualize open sets
- Show sections over opens
- Animate restriction maps
- Sheafification process
- Gluing visualization

---

#### FunctorAnimator
**File**: `FunctorAnimator.tsx`
**Purpose**: Animate functors and natural transformations

```typescript
interface FunctorAnimatorProps {
  // Source and target categories
  source: Category;
  target: Category;

  // Functor to visualize
  functor: Functor;

  // Natural transformation (optional)
  naturalTransformation?: NaturalTransformation;

  // Animation control
  speed?: number; // 0.1 to 2.0
  autoPlay?: boolean;
}
```

**Features**:
- Side-by-side category display
- Animate object mapping
- Animate morphism mapping
- Show functoriality visually
- Natural transformations as smooth deformations

---

#### ToposNavigator
**File**: `ToposNavigator.tsx`
**Purpose**: Navigate topos as 3D environment

```typescript
interface ToposNavigatorProps {
  topos: Topos;
  initialView?: 'objects' | 'morphisms' | 'logic';
  onNavigate?: (location: string) => void;
}
```

**Features**:
- 3D exploration of topos structure
- Objects as regions/rooms
- Morphisms as pathways
- Subobject classifier highlighted
- Internal logic interpreter

**Tech**: Three.js + WebGPU for complex topoi

---

### Pedagogy Components (`src/components/pedagogy/`)

Support the learning flow and interaction.

#### ProofStepper
**File**: `ProofStepper.tsx`

```typescript
interface ProofStepperProps {
  proof: Array<{
    statement: string;
    justification: string;
    interactive?: React.ReactNode; // optional interactive element
  }>;

  allowManipulation?: boolean;
  onStepChange?: (step: number) => void;
}
```

**Features**:
- Step through proofs forward/backward
- Highlight assumptions and conclusions
- Interactive elements at each step
- "Why is this true?" explanations

---

#### ConceptCard
**File**: `ConceptCard.tsx`

```typescript
interface ConceptCardProps {
  term: string;
  shortDefinition: string;
  fullDefinition?: string;
  examples?: string[];
  related?: string[];
  interactive?: React.ReactNode;

  defaultExpanded?: boolean;
}
```

**Features**:
- Collapsed: term + short def
- Hover: extended info
- Click: expand full details
- Link to other concepts
- Optional interactive exploration

---

#### ExercisePlayground
**File**: `ExercisePlayground.tsx`

```typescript
interface ExercisePlaygroundProps {
  problem: string;
  workspace: React.ReactNode; // interactive workspace
  hints?: string[];
  solution?: string;
  checker?: (answer: any) => boolean;

  onSolve?: () => void;
}
```

**Features**:
- Problem statement
- Interactive workspace
- Progressive hint system
- Solution validation
- Multiple approaches supported

---

#### ParameterPanel
**File**: `ParameterPanel.tsx`

```typescript
interface ParameterPanelProps {
  parameters: Array<{
    name: string;
    type: 'number' | 'select' | 'boolean';
    value: any;
    range?: [number, number];
    options?: any[];
    onChange: (value: any) => void;
  }>;

  presets?: Record<string, Record<string, any>>;
  onReset?: () => void;
}
```

**Features**:
- Sliders for continuous values
- Dropdowns for discrete choices
- Toggles for booleans
- Preset configurations
- "Randomize" button

---

### UI Components (`src/components/ui/`)

Based on shadcn/ui with custom additions.

Use shadcn/ui for:
- Button
- Card
- Dialog
- Tabs
- Tooltip
- Select
- Slider
- And 30+ more

Custom UI components for:
- Mathematical interfaces
- Lesson navigation
- Code display with math
- Interactive controls

---

## Mathematical Libraries (`src/lib/math/`)

### category-theory.ts

```typescript
// Core constructs
export class Category {
  objects: Set<MathObject>;
  morphisms: Set<Morphism>;
  compose: (f: Morphism, g: Morphism) => Morphism;
  identity: (obj: MathObject) => Morphism;
}

export class Functor {
  source: Category;
  target: Category;
  mapObject: (obj: MathObject) => MathObject;
  mapMorphism: (mor: Morphism) => Morphism;
}

export class NaturalTransformation {
  source: Functor;
  target: Functor;
  components: Map<MathObject, Morphism>;
}

// Universal properties
export function computeLimit(diagram: Diagram): Limit;
export function computeColimit(diagram: Diagram): Colimit;
export function checkAdjunction(F: Functor, G: Functor): boolean;
```

---

### commutative-algebra.ts

```typescript
export class Ring {
  elements: Set<any>;
  add: (a: any, b: any) => any;
  multiply: (a: any, b: any) => any;
}

export class Ideal {
  ring: Ring;
  generators: any[];
  isPrime(): boolean;
  isMaximal(): boolean;
}

export class Spectrum {
  ring: Ring;
  primeIdeals: PrimeIdeal[];
  topology: ZariskiTopology;
}

export function spec(ring: Ring): Spectrum;
export function localize(ring: Ring, set: MultiplicativeSet): Ring;
export function quotient(ring: Ring, ideal: Ideal): Ring;
```

---

### sheaf-theory.ts

```typescript
export class Presheaf {
  space: TopologicalSpace;
  sections: Map<string, any>;
  restriction: (U: OpenSet, V: OpenSet) => (s: any) => any;
}

export class Sheaf extends Presheaf {
  satisfiesLocalityAxiom(): boolean;
  satisfiesGluingAxiom(): boolean;
}

export function sheafify(presheaf: Presheaf): Sheaf;
export function computeStalk(sheaf: Sheaf, point: Point): Stalk;
export function etaleSpace(presheaf: Presheaf): EtaleSpace;
```

---

### schemes.ts

```typescript
export class Scheme {
  topologicalSpace: TopologicalSpace;
  structureSheaf: Sheaf;
  isLocallyRinged(): boolean;
}

export class SchemeMorphism {
  source: Scheme;
  target: Scheme;
  continuousMap: (x: Point) => Point;
  sheafMap: any; // pullback
}

export function affineScheme(ring: Ring): Scheme;
export function glueSchemes(schemes: Scheme[], gluings: any): Scheme;
export function fiberProduct(X: Scheme, Y: Scheme, S: Scheme): Scheme;
```

---

## WebGPU/Three.js Patterns

### When to Use WebGPU

- Vertex count > 100,000
- Complex mathematical field computations
- Real-time parametric surfaces
- Parallel symbolic calculations
- Spectral computations

### When to Use Three.js

- 3D mathematical objects (schemes, bundles, varieties)
- Camera navigation
- Standard rendering
- Instanced geometry (<100k vertices)
- Integration with React Three Fiber

### Example Pattern

```typescript
import { useWebGPU } from '@/lib/gpu/webgpu-helpers';

function SpectrumComponent({ ring }: { ring: Ring }) {
  const { device, compute } = useWebGPU();
  const [spectrum, setSpectrum] = useState<SpectrumData | null>(null);

  useEffect(() => {
    async function computeSpec() {
      // Use WebGPU for computation
      const result = await compute.computeSpectrum(ring);
      setSpectrum(result);
    }
    computeSpec();
  }, [ring]);

  // Render with Three.js
  return (
    <Canvas>
      <SpectrumMesh data={spectrum} />
    </Canvas>
  );
}
```

---

## Performance Guidelines

### React Optimization
1. **Memoize expensive computations**: Use `useMemo` for mathematical calculations
2. **Memoize components**: Use `React.memo` for pure components
3. **Lazy load**: Use `React.lazy` for heavy Three.js scenes
4. **Debounce**: Debounce parameter changes (300ms typical)
5. **Workers**: Use web workers for symbolic math

### Three.js Optimization
1. **Instancing**: For repeated geometry
2. **LOD**: For complex objects at distance
3. **Frustum culling**: Enable by default
4. **Geometry sharing**: Reuse geometries
5. **Material sharing**: Reuse materials
6. **Dispose**: Clean up on unmount

### WebGPU Optimization
1. **Buffer reuse**: Don't recreate buffers unnecessarily
2. **Batch operations**: Group compute passes
3. **Pipeline caching**: Reuse pipelines
4. **Async readback**: Don't block on results

---

## Component Development Workflow

1. **Define Interface**: Write TypeScript interface with JSDoc
2. **Implement Logic**: Core mathematical/visualization logic
3. **Add Visualization**: Three.js/WebGPU/SVG rendering
4. **Add Interactions**: User input handling
5. **Add Animations**: Smooth mathematical transforms
6. **Performance Test**: Verify 60fps with realistic data
7. **Document**: API docs and usage examples
8. **Test**: Unit tests for math, integration tests for component
9. **Export**: Add to index.ts

---

## Testing Strategy

### Unit Tests
- Mathematical correctness (category laws, ring axioms, etc.)
- Pure functions return expected results
- Edge cases handled

### Integration Tests
- Components render without errors
- Interactions work as expected
- State updates propagate

### Visual Tests
- Rendering matches expectations
- Animations are smooth
- Layouts are correct

### Performance Tests
- 60fps with realistic data sizes
- No memory leaks
- Efficient re-renders

---

## Quality Checklist

Before marking a component complete:

- [ ] TypeScript types are complete and strict (no `any`)
- [ ] Performance is 60fps with realistic data
- [ ] Keyboard accessible (tab navigation, enter to activate)
- [ ] Screen reader friendly (ARIA labels, semantic HTML)
- [ ] Responsive to parameter changes (<100ms)
- [ ] Documented with JSDoc and examples
- [ ] Tested (unit + integration)
- [ ] Exported from index.ts
- [ ] Added to component gallery/docs
- [ ] Mathematical correctness verified

---

## Component API Documentation

All components must have:

```typescript
/**
 * CategoryDiagram - Interactive commutative diagram visualization
 *
 * Renders categories with objects and morphisms. Supports composition,
 * natural transformations, and automatic layout.
 *
 * @example
 * ```tsx
 * <CategoryDiagram
 *   objects={[
 *     { id: 'A', label: 'A', definition: 'Object A' },
 *     { id: 'B', label: 'B', definition: 'Object B' },
 *   ]}
 *   morphisms={[
 *     { id: 'f', from: 'A', to: 'B', label: 'f', definition: 'f: A → B' },
 *   ]}
 *   animated={true}
 *   onMorphismClick={(id) => console.log('Clicked:', id)}
 * />
 * ```
 *
 * @performance Handles up to 50 objects smoothly. Use force-directed layout.
 * @accessibility Keyboard navigable, screen reader friendly
 */
export function CategoryDiagram(props: CategoryDiagramProps) { ... }
```

---

## Mathematical Conventions in Code

### Category Theory
- `Category`, `Functor`, `NaturalTransformation` classes
- `compose()` for morphism composition
- `id()` for identity morphisms

### Commutative Algebra
- `Ring`, `Ideal`, `Module` classes
- `spec()` for spectrum computation
- `localize()` for localization

### Sheaf Theory
- `Presheaf`, `Sheaf` classes
- `sheafify()` for sheafification
- `stalk()` for stalk at a point

### Schemes
- `Scheme`, `SchemeMorphism` classes
- `affineScheme()` constructor
- `fiberProduct()` for pullbacks

---

## Notes

- **Reusability**: Every component should work across multiple lessons
- **Configurability**: Props should allow customization without code changes
- **Performance**: Always test with realistic data sizes
- **Documentation**: Good docs = reusable component
- **Aesthetics**: Beautiful math inspires learning

---

**Remember**: These components are the building blocks of mathematical exploration. Make them robust, beautiful, and pedagogically powerful.
