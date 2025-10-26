# Grothendieck Explorable Explanations

> Interactive, visual, beautiful explorations of Grothendieck's revolutionary mathematics

## Vision

We're building explorable mathematical explanations where category theory, sheaves, schemes, topoi, and motives come alive. Every concept is interactive, every theorem is explorable, and every proof is a journey.

## Principles

- **See the Thing**: Make invisible mathematics visible
- **Touch the Thing**: Direct manipulation of mathematical objects
- **Explore the Space**: Navigate parameter spaces interactively
- **Multiple Lenses**: Algebraic, geometric, and categorical views
- **Build Intuition**: Concrete examples → abstract understanding
- **No AI Slop**: Intentional design, meaningful interactions

## Project Structure

```
grothendieck-explorable/
├── packages/
│   ├── core/                  # Reusable component library
│   │   ├── src/components/
│   │   │   ├── math/         # Mathematical visualizations
│   │   │   ├── pedagogy/     # Learning components
│   │   │   └── ui/           # UI components
│   │   └── src/lib/math/     # Mathematical utilities
│   └── lessons/              # Interactive lessons
│       ├── module-01-category-theory/
│       ├── module-02-commutative-algebra/
│       ├── module-03-sheaves/
│       ├── module-04-schemes/
│       ├── module-05-grothendieck-topologies/
│       ├── module-06-topos-theory/
│       ├── module-07-etale-cohomology/
│       ├── module-08-descent/
│       ├── module-09-motives/
│       └── module-10-synthesis/
├── scripts/                  # Utility scripts
├── docs/                     # Documentation
└── .claude/                  # Claude Code configuration
    └── commands/             # Custom slash commands
```

## Tech Stack

- **Framework**: React 18 + TypeScript (strict mode)
- **Build**: Vite (dev) + Parcel (bundling)
- **3D Graphics**: Three.js r158+
- **WebGPU**: For compute shaders and large visualizations
- **Styling**: Tailwind CSS + custom mathematical CSS
- **Components**: shadcn/ui
- **Math**: KaTeX
- **Animation**: Framer Motion
- **State**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/epistemicSystems/topos.grothendieck.git
cd topos.grothendieck

# Install dependencies
npm install

# Start development server
npm run dev
```

### Creating a New Lesson

```bash
# Using the initialization script
./scripts/init-lesson.sh module-01 lesson-1.1 "What is a Category?"

# Or use Claude Code slash command
/new-lesson module-01 lesson-1.1 "What is a Category?"
```

### Creating a New Component

```bash
# Use Claude Code slash command
/new-component math CategoryDiagram "Interactive commutative diagrams"
```

## Custom Slash Commands

When using Claude Code, you have access to:

- `/new-lesson MODULE LESSON TITLE` - Create new lesson from template
- `/new-component CATEGORY NAME DESC` - Create reusable component
- `/bundle-lesson PATH` - Bundle lesson to single HTML
- `/quality-check PATH` - Run comprehensive quality checks
- `/test-lesson PATH` - Run all tests

## Module Overview

### Module 1: Category Theory Essentials
Foundation of categorical thinking: categories, functors, natural transformations, universal properties, adjunctions.

### Module 2: Commutative Algebra & Topology
Algebraic toolkit: Spec(R), Zariski topology, localization, local behavior.

### Module 3: Sheaves and Sheafification
Local-to-global principle: presheaves, sheaves, gluing, sheafification, stalks.

### Module 4: Schemes
The revolution: affine schemes, structure sheaf, gluing, morphisms, fiber products.

### Module 5: Grothendieck Topologies & Sites
Abstract covers: sieves, Grothendieck topologies, sites, sheaves on sites.

### Module 6: Topos Theory
Universes of mathematics: Grothendieck topoi, subobject classifier, internal logic, geometric morphisms.

### Module 7: Étale Cohomology
Cohomology everywhere: étale morphisms, étale site, ℓ-adic cohomology, Weil conjectures.

### Module 8: Descent Theory
Gluing refined: descent data, effective descent, fpqc descent.

### Module 9: Motives
Universal cohomology: pure motives, motivic cohomology, Standard Conjectures.

### Module 10: Synthesis
The grand vision: connections, impact, future directions.

## Development Workflow

### 1. Research Phase
```bash
# Read CLAUDE.md files for context
# Understand requirements from PRD
# Think deeply about implementation
```

### 2. Implementation Phase
```bash
# Create components/lessons
# Test as you build
# Verify performance
```

### 3. Quality Assurance
```bash
# Run quality checks
npm run test
/quality-check packages/lessons/module-01/lesson-1.1
```

### 4. Bundling
```bash
# Bundle to single HTML
/bundle-lesson packages/lessons/module-01/lesson-1.1
```

## Key Features

### Interactive Visualizations
- 3D mathematical objects with Three.js
- GPU-accelerated computations with WebGPU
- Smooth 60fps animations
- Direct manipulation of parameters

### Pedagogical Components
- Step-by-step proof exploration
- Interactive exercises
- Progressive hint systems
- Multiple representations

### Mathematical Correctness
- Verified algorithms
- Rigorous definitions
- Precise notation
- Tested implementations

### Performance
- < 3s initial load
- < 100ms interaction latency
- 60fps animations
- < 5MB bundle size

### Accessibility
- Keyboard navigation
- Screen reader support
- WCAG AA compliance
- High contrast mode

## Documentation

- [Architecture](docs/architecture.md) - Technical architecture decisions
- [Math Conventions](docs/math-conventions.md) - Notation and standards
- [Component API](docs/component-api.md) - Component documentation
- [CLAUDE.md](CLAUDE.md) - Project context for Claude Code

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suites
npm run test:math        # Mathematical correctness
npm run test:a11y        # Accessibility
npm run test:performance # Performance benchmarks
```

## Contributing

This project uses:
- Conventional commits
- TypeScript strict mode
- ESLint + Prettier
- Pre-commit hooks

## Design Philosophy

### Bret Victor's Explorable Explanations
- Reactive documents
- Direct manipulation
- Contextual information
- Multiple representations

### Steve Wittens' Mathematical Aesthetics
- GPU-accelerated beauty
- Smooth transitions
- Clean, functional design
- Performance as a feature

### Mathematical Rigor
- Precise definitions
- Correct examples
- Rigorous proofs (when included)
- Standard notation

## Performance Guidelines

### Three.js
- Use instancing for repeated geometry
- Implement LOD (Level of Detail)
- Enable frustum culling
- Share geometries and materials

### WebGPU
- Use for > 100k vertices
- Complex compute shaders
- Real-time field calculations
- Parallel computations

### React
- Memoization
- Code splitting
- Lazy loading
- Debounce parameter changes

## Status

**Phase**: Foundation (Day 1 Complete)
**Next**: Build core component library

## Credits

Built with Claude Code following the master strategy from the Anthropic Engineering Team.

## License

MIT

---

**Remember**: We're not just building a course. We're building a new way to teach mathematics.
