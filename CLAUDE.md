# Grothendieck Explorable Explanations

## Project Vision

We're building explorable mathematical explanations for Grothendieck's revolutionary contributions to mathematics. Every concept should be interactive, visual, and beautiful. This is not just a course—it's a **mathematical playground** where category theory, sheaves, schemes, topoi, and motives come alive.

## Core Principles

1. **See the Thing**: Make the invisible visible through computation and visualization
2. **Touch the Thing**: Direct manipulation of mathematical objects
3. **Explore the Space**: Navigate through parameter spaces and see what happens
4. **Multiple Lenses**: View the same concept through algebraic, geometric, and categorical perspectives
5. **Build Intuition**: From concrete examples to abstract understanding
6. **No AI Slop**: Avoid centered layouts, purple gradients, excessive rounding

## Technology Stack

- **Framework**: React 18 + TypeScript (strict mode)
- **Build**: Vite (dev) + Parcel (bundling to single HTML)
- **3D Graphics**: Three.js r158+ for mathematical objects
- **WebGPU**: For compute shaders and large-scale visualizations (>100k vertices)
- **Styling**: Tailwind CSS 3.4.1 + custom mathematical CSS
- **Components**: shadcn/ui (40+ components)
- **Math Rendering**: KaTeX for speed
- **Animation**: Framer Motion for UI, custom for mathematical transforms
- **State**: Zustand or Jotai (lightweight, reactive)

## Code Standards

- **TypeScript**: Strict mode, no `any` types
- **Components**: Functional with hooks, well-typed props
- **Styling**: Tailwind utilities + custom CSS for canvas/mathematical elements
- **Performance**: 60fps animations, <100ms interaction latency
- **Accessibility**: Keyboard nav, ARIA labels, screen reader friendly

## File Organization

- **Reusable components**: `packages/core/src/components/`
  - `math/`: Mathematical visualizations (CategoryDiagram, SpectrumViewer, SheafExplorer)
  - `pedagogy/`: Learning components (ProofStepper, ConceptCard, ExercisePlayground)
  - `ui/`: shadcn/ui + custom UI components
- **Mathematical utilities**: `packages/core/src/lib/math/`
  - `category-theory.ts`: Categories, functors, natural transformations
  - `commutative-algebra.ts`: Rings, ideals, Spec computations
  - `sheaf-theory.ts`: Presheaves, sheaves, sheafification
  - `schemes.ts`: Scheme constructions and morphisms
- **Lessons**: `packages/lessons/module-XX/lesson-X.X/`
  - Each lesson is self-contained
  - Bundle to single HTML with Parcel
  - Can be rendered as Claude artifact
- **Scripts**: `scripts/`
  - Lesson initialization
  - Bundling automation
  - Quality checks
- **Documentation**: `docs/`
  - Architecture
  - Component API
  - Lesson templates
  - Mathematical conventions

## Git Workflow

- **Main branch**: Stable code only
- **Feature branches**: `lesson-X.X` or `component-name` or `claude/feature-name`
- **Current branch**: `claude/grothendieck-project-init-011CUWVeGXknkjKiVBe6mgVw`
- **Commit messages**: Conventional commits format
- **Development**: Use Git worktrees for parallel lesson development

## Testing

- **Unit tests**: Mathematical functions (must be correct!)
- **Visual regression**: Components render correctly
- **Performance benchmarks**: Animations stay at 60fps
- **Manual QA**: Pedagogy works, learning objectives met

## Common Tasks

Use custom slash commands in `.claude/commands/` for:
- `/new-lesson`: Create new lesson from template
- `/new-component`: Create reusable component
- `/bundle-lesson`: Bundle lesson to single HTML
- `/test-lesson`: Run tests and quality checks
- `/quality-check`: Comprehensive quality assessment

## Performance Guidelines

### Three.js Optimization
- Use instancing for repeated geometry
- Implement LOD (Level of Detail)
- Enable frustum culling
- Share geometries and materials
- Use texture atlases

### WebGPU Usage
Use WebGPU when:
- Vertex count > 100,000
- Complex mathematical computations in shaders
- Real-time field calculations
- Parallel symbolic computation

### React Optimization
- Memoization with `React.memo`, `useMemo`, `useCallback`
- Lazy loading with `React.lazy`
- Code splitting for heavy components
- Debounce parameter changes
- Use workers for expensive computations

### Bundle Size
- Target: <5MB per lesson
- Code split where possible
- Lazy load heavy components
- Compress assets
- Use modern formats (WebP, AVIF)

## Mathematical Conventions

### Typography
- **Equations**: Computer Modern font via KaTeX
- **UI Text**: System font stack for performance
- **Code**: JetBrains Mono

### Notation
- **Objects**: Capital letters A, B, C, X, Y, Z
- **Morphisms**: f, g, h
- **Functors**: F, G, H
- **Categories**: 𝒞, 𝒟, ℰ (script letters)
- **Natural transformations**: α, β, η, ε (Greek letters)
- **Rings**: R, S, T
- **Ideals**: I, J, 𝔭, 𝔮 (use 𝔭 for prime ideals)
- **Schemes**: X, Y, Z
- **Sheaves**: ℱ, 𝒢, ℋ (script letters)

### Color Coding
Colors encode mathematical meaning:
- **Category theory**:
  - Objects: Blue (#3B82F6)
  - Morphisms: Green (#10B981)
  - Functors: Orange (#F59E0B)
  - Natural transformations: Purple (#A855F7) - yes, purple is allowed when meaningful!
- **Algebra**:
  - Rings: Dark blue (#1E40AF)
  - Ideals: Red for prime (#EF4444), orange for non-prime
  - Modules: Teal (#14B8A6)
- **Topology**:
  - Open sets: Light blue with transparency
  - Closed sets: Red with transparency
  - Points: Small dots
- **Sheaves**:
  - Sections: Green gradients
  - Stalks: Concentrated colors at points
  - Restriction maps: Animated flows

## Design System

### Layout Principles
- **Asymmetric**: Content-driven, not template-driven
- **Explorables**: Parameters on left, visualization center/right, equations update live
- **Responsive**: Optimized for desktop (1920x1080+), graceful degradation for mobile
- **White space**: Generous, intentional breathing room

### Typography Scale
- **Headings**: 2.5rem / 2rem / 1.5rem / 1.25rem
- **Body**: 1rem (16px)
- **Small**: 0.875rem
- **Code**: 0.9rem

### Spacing Scale
- Base unit: 0.25rem (4px)
- Scale: 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64

### Animation Principles
- **Purpose**: Only animate to illustrate mathematical transformations
- **Duration**: 300ms for UI, 1000-2000ms for mathematical transforms
- **Easing**: ease-in-out for UI, custom for mathematical (e.g., functor mapping)
- **Performance**: Always 60fps, use `will-change` sparingly

## When to Use Extended Thinking

Use "think hard" prompts for:
- **Architectural decisions**: Component structure, data flow, API design
- **Mathematical correctness**: Verify algorithms, check proofs, validate examples
- **Performance optimization**: Identify bottlenecks, design solutions
- **Complex component design**: Interactive behaviors, state management
- **Pedagogical strategies**: Learning flow, scaffolding, assessment design

## Documentation Requirements

Every component needs:
- **TypeScript interface documentation**: JSDoc comments with examples
- **Usage examples**: How to use the component in lessons
- **Props documentation**: What each prop does, types, defaults
- **Performance considerations**: Complexity, optimization tips
- **Accessibility notes**: Keyboard support, screen reader behavior

## Artifacts Builder Integration

Each lesson can be built as a Claude artifact:
- Uses artifacts-builder skill (when available)
- Bundles to single HTML with Parcel
- All dependencies inlined
- Math rendering works offline
- Saved to `/mnt/user-data/outputs/`

## Key Files to Know

- **This file**: Root project context
- **packages/core/CLAUDE.md**: Component library patterns and APIs
- **packages/lessons/CLAUDE.md**: Lesson structure and pedagogy
- **packages/lessons/module-XX/CLAUDE.md**: Module-specific learning objectives
- **docs/architecture.md**: Detailed architecture decisions
- **docs/component-api.md**: Full component documentation
- **docs/lesson-template.md**: Standard lesson structure
- **docs/math-conventions.md**: Mathematical notation and standards

## Never Do

- ❌ Use `localStorage` or `sessionStorage` (not supported in artifacts)
- ❌ Make external API calls (artifacts should work offline)
- ❌ Use purple gradients without mathematical meaning
- ❌ Center everything mindlessly
- ❌ Add animations that don't illustrate mathematics
- ❌ Use generic rounded corners everywhere
- ❌ Sacrifice mathematical rigor for "simplicity"
- ❌ Use `any` type in TypeScript
- ❌ Create components that aren't reusable
- ❌ Forget accessibility

## Always Do

- ✅ Think deeply about mathematical correctness first
- ✅ Make every interaction meaningful
- ✅ Test performance with realistic data sizes
- ✅ Document your code thoroughly
- ✅ Use TypeScript strict mode
- ✅ Make it accessible
- ✅ Make it beautiful
- ✅ Make it pedagogically sound
- ✅ Verify 60fps performance
- ✅ Bundle successfully to single HTML

## Project Status

**Phase**: Foundation - Day 1
**Current Task**: Initializing repository structure and CLAUDE.md files
**Next**: Build core component library

## Getting Help

- Read CLAUDE.md files from root → package → module → lesson for context
- Check `docs/` for detailed documentation
- Use custom slash commands for common tasks
- Ask Claude to "think hard" about complex decisions

---

**Remember**: We're not just building a course. We're building a new way to teach mathematics. Make it worthy of Grothendieck's revolutionary vision.
