# Project Grothendieck x Claude Code: Master Strategy
## From the Anthropic Engineering Team Collective

**Team Contributors:**
- **Boris** (Claude Code Lead): Architecture & Workflow Design
- **Daisy** (Research Scientist): Extended Thinking & Complex Reasoning
- **Ashwin** (Product Engineering): Iterative Development Patterns
- **Cat** (Data Infrastructure): CLAUDE.md Best Practices
- **Sid** (Security): Agent Safety & Permission Management
- **Cal** (Developer Experience): Tooling & Automation
- **Nodir** (Platform): Performance & Scaling
- **Barry** (ML Engineering): Agent SDK Integration

---

## Table of Contents

1. [The Master Plan](#the-master-plan)
2. [Repository Architecture](#repository-architecture)
3. [CLAUDE.md Strategy](#claudemd-strategy)
4. [Workflow Patterns](#workflow-patterns)
5. [Custom Slash Commands](#custom-slash-commands)
6. [Extended Thinking Prompts](#extended-thinking-prompts)
7. [Parallel Development with Git Worktrees](#parallel-development-with-git-worktrees)
8. [Agent SDK Integration](#agent-sdk-integration)
9. [Testing & Quality Assurance](#testing--quality-assurance)
10. [The 30-Day Sprint Plan](#the-30-day-sprint-plan)

---

## 1. The Master Plan

### Vision Statement (Boris)

We're going to build the most sophisticated mathematical learning experience ever created, and Claude Code is going to be our force multiplier. Here's the insight: **Claude Code isn't just a coding assistant—it's an agentic system that can think deeply about architecture, iterate rapidly, and work in parallel**.

### The 3-Phase Strategy

**Phase 1: Foundation (Days 1-10)**
- Build the component library
- Establish patterns and conventions
- Create reusable systems
- Document everything in CLAUDE.md

**Phase 2: Production (Days 11-25)**
- Generate lessons in parallel using Git worktrees
- Iterate based on quality checks
- Build automation for lesson generation
- Scale to full course

**Phase 3: Polish (Days 26-30)**
- Integration and cross-linking
- Performance optimization
- Final visual polish
- Deployment preparation

### Key Insight (Daisy)

The secret weapon is **extended thinking**. For complex architectural decisions and mathematical correctness, we'll use "think hard" prompts extensively. This isn't about writing more code—it's about making better decisions upfront.

---

## 2. Repository Architecture

### Directory Structure

```
grothendieck-explorable/
├── .claude/
│   ├── commands/           # Custom slash commands
│   │   ├── new-lesson.md
│   │   ├── new-component.md
│   │   ├── test-lesson.md
│   │   ├── bundle-lesson.md
│   │   └── quality-check.md
│   └── settings.json       # Claude Code permissions
├── CLAUDE.md               # Root project context
├── packages/
│   ├── core/               # Core component library
│   │   ├── CLAUDE.md       # Package-specific context
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── math/
│   │   │   │   │   ├── CLAUDE.md  # Math component patterns
│   │   │   │   │   ├── CategoryDiagram.tsx
│   │   │   │   │   ├── SpectrumViewer.tsx
│   │   │   │   │   ├── SheafExplorer.tsx
│   │   │   │   │   ├── FunctorAnimator.tsx
│   │   │   │   │   └── ToposNavigator.tsx
│   │   │   │   ├── pedagogy/
│   │   │   │   │   ├── CLAUDE.md
│   │   │   │   │   ├── ProofStepper.tsx
│   │   │   │   │   ├── ConceptCard.tsx
│   │   │   │   │   └── ExercisePlayground.tsx
│   │   │   │   └── ui/          # shadcn/ui + custom
│   │   │   ├── lib/
│   │   │   │   ├── math/
│   │   │   │   │   ├── CLAUDE.md
│   │   │   │   │   ├── category-theory.ts
│   │   │   │   │   ├── commutative-algebra.ts
│   │   │   │   │   ├── sheaf-theory.ts
│   │   │   │   │   └── schemes.ts
│   │   │   │   └── gpu/
│   │   │   │       ├── webgpu-helpers.ts
│   │   │   │       └── shaders/
│   │   │   │           ├── spectrum.wgsl
│   │   │   │           └── sheaf-flow.wgsl
│   │   │   └── styles/
│   │   │       └── mathematical.css
│   │   └── package.json
│   └── lessons/
│       ├── CLAUDE.md
│       ├── module-01-category-theory/
│       │   ├── CLAUDE.md
│       │   ├── lesson-1.1-categories/
│       │   │   ├── CLAUDE.md
│       │   │   ├── index.html
│       │   │   ├── src/
│       │   │   │   └── App.tsx
│       │   │   └── bundle.html
│       │   ├── lesson-1.2-functors/
│       │   └── ...
│       ├── module-02-commutative-algebra/
│       ├── module-03-sheaves/
│       └── ...
├── scripts/
│   ├── init-lesson.sh
│   ├── bundle-all-lessons.sh
│   └── quality-check.sh
├── docs/
│   ├── architecture.md
│   ├── component-api.md
│   ├── lesson-template.md
│   └── math-conventions.md
└── package.json
```

### Key Insight (Cat)

**CLAUDE.md files at every level create a cascading context system.** Claude Code automatically reads all CLAUDE.md files from the current directory up to the home directory. This means:
- Root CLAUDE.md: Project vision, architecture, global conventions
- Package CLAUDE.md: Package-specific patterns and APIs
- Module CLAUDE.md: Module learning objectives and mathematical context
- Lesson CLAUDE.md: Specific lesson requirements and interactive elements

---

## 3. CLAUDE.md Strategy

### Root CLAUDE.md

```markdown
# Grothendieck Explorable Explanations

## Project Vision
We're building explorable mathematical explanations for Grothendieck's revolutionary 
contributions to mathematics. Every concept should be interactive, visual, and beautiful.

## Core Principles
1. Bret Victor's explorable explanations: reactive, direct manipulation
2. Steve Wittens' aesthetic: GPU-accelerated beauty, smooth 60fps
3. Mathematical rigor: precise definitions, correct theorems
4. No AI slop: avoid centered layouts, purple gradients, excessive rounding

## Technology Stack
- React 18 + TypeScript (strict mode)
- Vite (dev) + Parcel (bundling)
- Three.js r158+ for 3D
- WebGPU + WGSL for compute shaders
- Tailwind CSS + custom mathematical styling
- shadcn/ui for UI components
- KaTeX for math rendering

## Code Standards
- TypeScript: strict mode, no any types
- Components: functional with hooks, well-typed props
- Styling: Tailwind utilities + custom CSS for canvas/mathematical elements
- Performance: 60fps animations, <100ms interaction latency
- Accessibility: keyboard nav, ARIA labels, screen reader friendly

## File Organization
- All reusable components in packages/core/src/components/
- Mathematical utilities in packages/core/src/lib/math/
- Each lesson is self-contained in packages/lessons/module-XX/lesson-X.X/
- Bundle to single HTML with artifacts-builder scripts

## Git Workflow
- Main branch: stable code only
- Feature branches: lesson-X.X or component-name
- Commit messages: conventional commits format
- PRs: required for all changes

## Testing
- Unit tests for mathematical functions
- Visual regression for components
- Performance benchmarks for animations
- Manual QA for pedagogy

## Common Tasks
Use custom slash commands in .claude/commands/ for:
- /new-lesson: Create new lesson from template
- /new-component: Create reusable component
- /bundle-lesson: Bundle lesson to single HTML
- /test-lesson: Run tests and quality checks
- /quality-check: Comprehensive quality assessment

## Documentation
Every component needs:
- TypeScript interface documentation
- Usage examples
- Performance considerations
- Accessibility notes

## Performance Guidelines
- Three.js: use instancing, LOD, frustum culling
- WebGPU: for >100k vertices or complex compute
- React: memoization, lazy loading, code splitting
- Bundle size: aim for <5MB per lesson

## Mathematical Conventions
- Use Computer Modern font for equations
- Color code by mathematical meaning (not arbitrary)
- Consistent notation across lessons
- Link to prerequisite concepts

## Design System
- Typography: System font stack for UI, Computer Modern for math
- Colors: Meaningful mathematical encoding
- Layout: Asymmetric, content-driven
- Animations: Only when they illustrate math

## When to Use Extended Thinking
Use "think hard" for:
- Architectural decisions
- Mathematical correctness verification
- Performance optimization strategies
- Complex component design

## Key Files
- packages/core/CLAUDE.md: Component library patterns
- docs/component-api.md: Full component documentation
- docs/lesson-template.md: Standard lesson structure

## Never Do
- ❌ Use localStorage (not supported in artifacts)
- ❌ Purple gradients everywhere
- ❌ Centered everything
- ❌ Generic rounded corners
- ❌ Animations without mathematical purpose
```

### packages/core/CLAUDE.md

```markdown
# Core Component Library

## Purpose
Reusable components for building interactive mathematical lessons across 
all modules of the Grothendieck course.

## Component Categories

### Mathematical Components (src/components/math/)
Visualize mathematical structures:
- CategoryDiagram: Interactive commutative diagrams
- SpectrumViewer: 3D visualization of Spec(R)
- SheafExplorer: Sheafification and gluing
- FunctorAnimator: Animate functors and natural transformations
- ToposNavigator: Navigate topos as 3D environment

Each component follows this pattern:
```typescript
interface ComponentProps {
  // Mathematical object(s) to visualize
  data: MathematicalStructure;
  
  // User interaction callbacks
  onInteract?: (event: InteractionEvent) => void;
  
  // Visual customization
  style?: ComponentStyle;
  
  // Performance hints
  performanceMode?: 'high' | 'balanced' | 'low';
}
```

### Pedagogy Components (src/components/pedagogy/)
Support learning flow:
- ProofStepper: Step through proofs interactively
- ConceptCard: Expandable concept definitions
- ExercisePlayground: Interactive problem solving
- ParameterPanel: Tweak mathematical parameters

### UI Components (src/components/ui/)
shadcn/ui components + custom additions:
- Use shadcn/ui for standard UI elements
- Custom components for mathematical interfaces
- Consistent design tokens

## Mathematical Libraries (src/lib/math/)

### category-theory.ts
```typescript
// Core category theory constructs
class Category { ... }
class Functor { ... }
class NaturalTransformation { ... }

// Universal properties
function computeLimit(diagram: Diagram): Limit { ... }
function computeColimit(diagram: Diagram): Colimit { ... }
```

### commutative-algebra.ts
```typescript
// Ring and module operations
class Ring { ... }
class Ideal { ... }
function spec(ring: Ring): Spectrum { ... }
function localize(ring: Ring, set: MultiplicativeSet): Ring { ... }
```

### sheaf-theory.ts
```typescript
// Sheaf constructs
class Presheaf { ... }
class Sheaf extends Presheaf { ... }
function sheafify(presheaf: Presheaf): Sheaf { ... }
```

## WebGPU/Three.js Patterns

### When to Use WebGPU
- Vertex count > 100,000
- Complex mathematical computations in shaders
- Real-time field calculations
- Parallel symbolic computation

### When to Use Three.js
- 3D mathematical objects
- Camera navigation
- Standard rendering
- Instanced geometry

### Example Pattern
```typescript
// In component
const { gpuCompute } = useWebGPU();
const spectrum = await gpuCompute.computeSpectrum(ring);

// In Three.js scene
const geometry = createSpectrumGeometry(spectrum);
const mesh = new InstancedMesh(geometry, material, spectrum.ideals.length);
```

## Performance Guidelines
1. Memoize expensive computations
2. Use React.memo for pure components
3. Lazy load heavy Three.js scenes
4. Debounce parameter changes
5. Use workers for symbolic math

## Component Development Workflow
1. Define TypeScript interface
2. Implement core logic
3. Add Three.js/WebGPU visualization
4. Add user interactions
5. Write tests
6. Document API
7. Add to component gallery

## Testing Strategy
- Unit tests: mathematical correctness
- Integration tests: component interactions
- Visual tests: rendering accuracy
- Performance tests: frame rate, latency

## Quality Checklist
Before considering a component done:
- [ ] TypeScript types are complete and strict
- [ ] Performance is 60fps with realistic data
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Responsive to parameter changes
- [ ] Documented with examples
- [ ] Tested
```

### packages/lessons/module-01-category-theory/CLAUDE.md

```markdown
# Module 1: Category Theory Essentials

## Learning Objectives
1. Understand categories as objects + morphisms + composition
2. Master functors as structure-preserving maps
3. Internalize natural transformations
4. Build intuition for universal properties and limits
5. Appreciate adjoint functors

## Prerequisites
- Abstract algebra (groups, rings, fields)
- Comfort with abstract definitions
- No category theory required!

## Pedagogical Strategy
Concrete → Abstract progression:
1. Start with familiar categories (Set, Grp)
2. Generalize through examples
3. Abstract to definitions
4. Reveal power through applications

## Module Structure
- Lesson 1.1: What is a Category?
- Lesson 1.2: Functors - Maps Between Worlds
- Lesson 1.3: Natural Transformations
- Lesson 1.4: Universal Properties & Limits
- Lesson 1.5: Adjoint Functors

## Interactive Components Used
- CategoryDiagram (all lessons)
- FunctorBuilder (1.2, 1.3)
- FunctorAnimator (1.2, 1.3)
- LimitExplorer (1.4)
- AdjunctionBuilder (1.5)

## Mathematical Conventions
- Objects: capital letters A, B, C
- Morphisms: f, g, h
- Functors: F, G, H
- Categories: 𝒞, 𝒟, ℰ
- Natural transformations: α, β, η, ε

## Color Coding
- Objects: Blue
- Morphisms: Green
- Functors: Orange
- Natural transformations: Purple (yes, we use purple here because it has mathematical meaning!)

## Lesson Templates
Each lesson includes:
1. Narrative introduction (2-3 min read)
2. Interactive exploration (20-40 min)
3. Challenges/exercises (10-20 min)
4. Synthesis and preview (2-3 min)

## Assessment Strategy
- Inline interactive checks
- Construction challenges
- "Find the pattern" exercises
- No traditional quizzes (everything is hands-on)
```

### packages/lessons/module-01-category-theory/lesson-1.1-categories/CLAUDE.md

```markdown
# Lesson 1.1: What is a Category?

## Learning Objectives
- Define categories precisely
- Recognize categories in familiar math
- Understand composition and identities
- Build categorical intuition

## Narrative Arc
1. "You already know categories" (Set, Grp)
2. Pattern recognition across examples
3. Axiomatic definition
4. "Categories are everywhere"

## Interactive Components

### CategoryPlayground (main widget)
**Purpose**: Let users build and explore categories
**Features**:
- Add objects and morphisms
- Compose morphisms (drag to compose)
- Try to break axioms (can't!)
- Validate category properties

**Implementation Notes**:
- Use @/components/math/CategoryDiagram
- Force-directed graph layout
- Smooth animations for composition
- Color-coded validation feedback

### CategoryZoo (gallery)
**Purpose**: Explore familiar categories
**Categories to include**:
- Set: sets and functions
- Grp: groups and homomorphisms
- Ring: rings and ring homomorphisms
- Top: topological spaces and continuous maps
- Vect_k: vector spaces and linear maps

**Implementation Notes**:
- Each category is a separate scene
- Click to zoom into details
- Hover for definitions
- "Spot the pattern" UI

### IdentityAnimation
**Purpose**: Visualize identity morphisms
**Features**:
- Show id_A: A → A
- Compose f ∘ id_A = f visually
- Animate "doing nothing"

## Parameter Space
Users can adjust:
- Number of objects (2-8)
- Morphism density (sparse/medium/dense)
- Which category to explore (Set/Grp/Ring/Top/Vect)

## Assessment
1. Build a category with 3 objects (sandbox)
2. Identify which properties define a category (checklist)
3. Find categories in everyday math (matching game)

## Technical Requirements
- React + TypeScript
- CategoryDiagram component from core library
- KaTeX for math rendering
- Smooth animations with Framer Motion
- Bundle size target: <3MB

## Design Notes
- Layout: Split screen - narrative on left, widget on right
- Colors: Blue objects, green morphisms
- Font: System for UI, Computer Modern for math
- No unnecessary decoration

## Quality Checks
- [ ] All category axioms explained visually
- [ ] Composition is intuitive to perform
- [ ] Examples are mathematically correct
- [ ] Performance: 60fps with 8 objects
- [ ] Keyboard navigable

## Common Mistakes to Avoid
- Don't make it too abstract too fast
- Don't skip concrete examples
- Don't use jargon without explanation
- Don't make identity "boring" (it's deep!)

## Next Lesson Preview
End with teaser: "Categories are worlds. What are the bridges between worlds?"
→ Sets up functors in Lesson 1.2
```

---

## 4. Workflow Patterns

### Pattern 1: Research → Plan → Implement (Boris's Favorite)

This is **the** workflow for building anything complex with Claude Code.

```bash
# Step 1: Research Phase
claude

> I need to build an interactive CategoryDiagram component for visualizing 
> commutative diagrams in category theory. Think hard about:
> 
> 1. What are the mathematical requirements?
> 2. What existing libraries should we use? (force-directed graphs, react-force-graph, D3, or custom?)
> 3. What are the performance considerations for large diagrams?
> 4. How should user interaction work?
> 5. What's the best API design for this component?
> 
> Please research our codebase, read the PRD, check the root CLAUDE.md, 
> and provide a detailed analysis.

# Claude will think deeply and provide research findings

# Step 2: Planning Phase
> Based on your research, create a detailed implementation plan.
> Include:
> - File structure
> - Core data structures
> - Algorithm choices
> - Integration points with existing code
> - Testing strategy
> 
> Save this plan to docs/components/category-diagram-plan.md

# Claude creates the plan document

# Step 3: Implement Phase
> Now implement the CategoryDiagram component following your plan.
> As you implement, verify each piece works before moving on.
> Use TypeScript strict mode.
> Write tests alongside the implementation.

# Claude implements, verifying as it goes

# Step 4: Verification
> Run the tests, check the performance, and verify the component 
> works in the lesson-1.1 context.

# Step 5: Documentation
> Update the component API documentation and add usage examples.
```

**Why This Works (Daisy's Input):**
Extended thinking during research and planning phases prevents Claude from jumping straight to code. This reduces iterations and produces better architecture.

### Pattern 2: Parallel Development with Git Worktrees (Cal's Specialty)

For building multiple lessons simultaneously:

```bash
# Create worktrees for parallel lesson development
git worktree add ../grothendieck-lesson-1.1 -b lesson-1.1-categories
git worktree add ../grothendieck-lesson-1.2 -b lesson-1.2-functors
git worktree add ../grothendieck-lesson-1.3 -b lesson-1.3-natural-transformations

# In terminal 1 (lesson 1.1)
cd ../grothendieck-lesson-1.1
claude
> /new-lesson module-01 lesson-1.1 "What is a Category?"

# In terminal 2 (lesson 1.2)
cd ../grothendieck-lesson-1.2
claude
> /new-lesson module-01 lesson-1.2 "Functors - Maps Between Worlds"

# In terminal 3 (lesson 1.3)
cd ../grothendieck-lesson-1.3
claude
> /new-lesson module-01 lesson-1.3 "Natural Transformations"

# All three lessons develop in parallel!
# Complete isolation, no conflicts
```

**Advanced Parallel Pattern:**
```bash
# Create 10 worktrees for an entire module
for i in {1..5}; do
  git worktree add ../grothendieck-lesson-1.$i -b lesson-1.$i
done

# Use GNU Parallel or tmux to run Claude in all worktrees
parallel -j5 'cd ../grothendieck-lesson-1.{} && echo "/new-lesson module-01 lesson-1.{}" | claude' ::: {1..5}
```

### Pattern 3: The Review Loop (Ashwin's Method)

Use two Claude sessions - one builds, one reviews:

```bash
# Terminal 1: Builder Claude
cd packages/lessons/module-01/lesson-1.1
claude
> Build lesson 1.1 following the CLAUDE.md spec in this directory

# Terminal 2: Reviewer Claude
cd packages/lessons/module-01/lesson-1.1
claude
> Review the lesson-1.1 implementation against these criteria:
> 1. Mathematical correctness
> 2. Pedagogical effectiveness
> 3. Code quality
> 4. Performance
> 5. Accessibility
> 
> Provide specific, actionable feedback.

# Builder Claude incorporates feedback and iterates
```

### Pattern 4: Incremental Building (Nodir's Approach)

For complex components, build incrementally:

```bash
claude

# Phase 1: Data structures
> Create the core data structures for the CategoryDiagram component.
> Just the types and basic classes - no rendering yet.

# Phase 2: Layout algorithm
> Now implement the force-directed layout algorithm.
> Test it with sample data and log the positions.

# Phase 3: SVG rendering
> Add SVG rendering of objects and morphisms using the computed layout.
> Make it static first - no interactions yet.

# Phase 4: Interactions
> Add hover effects, click handlers, and composition UI.

# Phase 5: Animations
> Add smooth animations for composition and natural transformations.

# Phase 6: Performance
> Optimize for large diagrams (>50 objects). Add memoization and virtualization.
```

Each phase is validated before moving on.

### Pattern 5: Context-Driven Development (Cat's Secret)

Let CLAUDE.md files drive everything:

```bash
# Create comprehensive CLAUDE.md files first
claude

> Create detailed CLAUDE.md files for:
> 1. packages/core/src/components/math/CLAUDE.md (mathematical component patterns)
> 2. packages/lessons/module-01/CLAUDE.md (module learning objectives)
> 3. packages/lessons/module-01/lesson-1.1/CLAUDE.md (lesson spec)
> 
> Include all details from the PRD but adapted to our codebase structure.

# Then development becomes:
> Build the CategoryDiagram component following the patterns in 
> packages/core/src/components/math/CLAUDE.md

# Claude has perfect context!
```

---

## 5. Custom Slash Commands

### .claude/commands/new-lesson.md

```markdown
# Create New Lesson

Creates a new lesson following the standard template.

## Usage
/new-lesson MODULE_ID LESSON_ID "LESSON_TITLE"

Example: /new-lesson module-01 lesson-1.1 "What is a Category?"

## Steps
1. Create directory: packages/lessons/$MODULE_ID/$LESSON_ID/
2. Copy template from docs/lesson-template/
3. Create CLAUDE.md with lesson-specific context from PRD
4. Initialize Vite project with artifacts-builder init script
5. Set up index.html and src/App.tsx
6. Install dependencies: Three.js, KaTeX, required components
7. Create initial lesson structure with placeholders
8. Set up bundling configuration
9. Create README.md with lesson overview

## Template Structure
```
$LESSON_ID/
├── CLAUDE.md
├── index.html
├── package.json
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── NarrativeSection.tsx
│   │   ├── InteractiveWidget.tsx
│   │   └── Assessment.tsx
│   └── styles/
│       └── lesson.css
└── README.md
```

## Next Steps
After creation:
1. Review CLAUDE.md to understand lesson requirements
2. Implement interactive components
3. Build narrative flow
4. Test and iterate
5. Bundle to single HTML
```

### .claude/commands/new-component.md

```markdown
# Create New Component

Creates a new reusable component in the core library.

## Usage
/new-component CATEGORY COMPONENT_NAME "DESCRIPTION"

Example: /new-component math SpectrumViewer "3D visualization of Spec(R)"

Categories: math, pedagogy, ui

## Steps
1. Create file: packages/core/src/components/$CATEGORY/$COMPONENT_NAME.tsx
2. Define TypeScript interface with strict types
3. Implement component following patterns in CLAUDE.md
4. Add prop validation
5. Export from index.ts
6. Create example usage in component gallery
7. Add tests in __tests__/$COMPONENT_NAME.test.tsx
8. Document in docs/component-api.md

## Component Template
```typescript
import React from 'react';

interface ${COMPONENT_NAME}Props {
  // Props here
}

export function ${COMPONENT_NAME}(props: ${COMPONENT_NAME}Props) {
  // Implementation
  return <div>Component</div>;
}

${COMPONENT_NAME}.displayName = '${COMPONENT_NAME}';
```

## Quality Checklist
Before committing:
- [ ] TypeScript strict mode passes
- [ ] Component is memoized if appropriate
- [ ] Accessibility attributes added
- [ ] Performance tested
- [ ] Documentation written
- [ ] Tests pass
```

### .claude/commands/bundle-lesson.md

```markdown
# Bundle Lesson to Single HTML

Bundles a lesson into a single HTML artifact using artifacts-builder.

## Usage
/bundle-lesson LESSON_PATH

Example: /bundle-lesson packages/lessons/module-01/lesson-1.1

## Steps
1. Navigate to lesson directory
2. Verify all dependencies installed
3. Run: bash scripts/bundle-artifact.sh
4. Copy bundle.html to /mnt/user-data/outputs/
5. Verify bundle size (<5MB target)
6. Test bundle opens correctly
7. Output download link for user

## Verification Checks
- Bundle size
- All assets inlined
- No external dependencies
- Math rendering works
- Interactions functional
- 60fps performance
```

### .claude/commands/quality-check.md

```markdown
# Comprehensive Quality Check

Runs full quality assessment on a lesson or component.

## Usage
/quality-check ITEM_PATH

Example: /quality-check packages/lessons/module-01/lesson-1.1

## Check Categories

### Mathematical Quality
- Definitions are precise
- Examples are correct
- Theorems stated accurately
- Notation is consistent

### Interactive Quality
- All widgets are responsive (<100ms)
- Parameters have sensible ranges
- Edge cases handled
- Animations smooth (60fps)
- State propagates correctly

### Pedagogical Quality
- Learning objectives met
- Narrative flow clear
- Scaffolding appropriate
- Assessment meaningful
- Hints helpful

### Visual Quality
- Design clean and uncluttered
- Color encodes meaning
- Typography readable
- Layout serves content
- No AI slop

### Technical Quality
- Code well-structured
- Components reusable
- Performance good
- Bundles successfully
- No TypeScript errors

## Output
Generates quality-report.md with:
- Passing checks ✓
- Failing checks ✗
- Warnings ⚠
- Recommendations
```

### .claude/commands/think-hard.md

```markdown
# Extended Thinking Mode

Triggers extended thinking for complex problems.

## Usage
/think-hard "PROBLEM_DESCRIPTION"

Example: /think-hard "Design the optimal architecture for WebGPU spectrum computation"

## When to Use
- Architectural decisions
- Algorithm selection
- Performance optimization
- Mathematical correctness verification
- Complex debugging
- API design

## What Happens
Claude will:
1. Activate extended thinking mode
2. Reason deeply about the problem
3. Consider multiple approaches
4. Evaluate tradeoffs
5. Provide detailed recommendation

## Tips
- Be specific about constraints
- Mention relevant context
- Ask for comparison of alternatives
- Request implementation plan
```

---

## 6. Extended Thinking Prompts

### For Architecture (Daisy & Boris)

```
Think hard about the optimal architecture for our component library.

Consider:
1. How should components import mathematical utilities?
2. What's the best way to share Three.js contexts across lessons?
3. How do we handle WebGPU device sharing?
4. What's the performance implication of each approach?
5. How extensible is each architecture?

Evaluate at least 3 different architectural approaches and recommend 
the best one with detailed reasoning.
```

### For Mathematical Correctness (Daisy)

```
Think deeply about whether our sheafification implementation is correct.

Verify:
1. Does the étalé space construction work for all presheaves?
2. Are the restriction maps continuous?
3. Does the sheaf of sections satisfy the sheaf axioms?
4. Is the universal property satisfied?
5. Are there edge cases we're missing?

Trace through the algorithm with several examples and identify any 
potential issues.
```

### For Performance Optimization (Nodir)

```
Think hard about optimizing the CategoryDiagram component for large diagrams.

Current implementation handles ~50 objects before slowdown.
Target: 500 objects at 60fps.

Consider:
1. Rendering optimization (instancing, frustum culling, LOD)
2. Layout computation (quadtree, spatial hashing)
3. Interaction handling (raycasting optimization)
4. State management (memoization, virtualization)
5. Memory usage (geometry sharing, texture atlases)

Analyze the bottlenecks and propose specific optimizations with 
expected performance gains.
```

### For API Design (Cal)

```
Think deeply about the ideal API for the SpectrumViewer component.

Requirements:
- Should work with any commutative ring
- Needs to be intuitive for lesson authors
- Must support both 2D and 3D views
- Should allow customization but have good defaults
- Needs to integrate with other components

Design at least 2 different API approaches and evaluate:
- Ease of use
- Flexibility
- Type safety
- Performance
- Maintainability

Recommend the best approach with examples.
```

---

## 7. Parallel Development with Git Worktrees

### Setup Strategy (Cal)

```bash
# Initial setup
cd grothendieck-explorable

# Create worktree directory
mkdir -p ../grothendieck-worktrees

# Create worktrees for all Module 1 lessons
for i in {1..5}; do
  git worktree add ../grothendieck-worktrees/lesson-1.$i -b lesson-1.$i
done

# Create worktrees for Module 2
for i in {1..3}; do
  git worktree add ../grothendieck-worktrees/lesson-2.$i -b lesson-2.$i
done

# List all worktrees
git worktree list
```

### Parallel Development Pattern

```bash
# Use tmux for multiple Claude sessions
tmux new-session -s grothendieck

# Split into 5 panes
# Ctrl-b % (split vertically)
# Ctrl-b " (split horizontally)
# Repeat to create 5 panes

# In each pane:
# Pane 1
cd ../grothendieck-worktrees/lesson-1.1
claude

# Pane 2
cd ../grothendieck-worktrees/lesson-1.2
claude

# Pane 3
cd ../grothendieck-worktrees/lesson-1.3
claude

# Pane 4
cd ../grothendieck-worktrees/lesson-1.4
claude

# Pane 5
cd ../grothendieck-worktrees/lesson-1.5
claude

# Now give each Claude instance its lesson task:
# In each pane:
> /new-lesson module-01 lesson-1.X "LESSON_TITLE"
> Build this lesson following the CLAUDE.md specification.
> Think hard about the best implementation approach first.
> Then implement incrementally with verification at each step.

# All 5 lessons develop in parallel!
```

### Merging Strategy

```bash
# After lessons are complete and tested:

# In main repo
cd grothendieck-explorable

# Review and merge each lesson
git merge lesson-1.1
git merge lesson-1.2
git merge lesson-1.3
git merge lesson-1.4
git merge lesson-1.5

# Clean up worktrees
for i in {1..5}; do
  git worktree remove ../grothendieck-worktrees/lesson-1.$i
done
```

### Advanced: Automated Parallel Generation

```bash
# Create a script: scripts/parallel-lesson-generation.sh

#!/bin/bash

MODULE=$1
LESSON_COUNT=$2

# Create worktrees
for i in $(seq 1 $LESSON_COUNT); do
  git worktree add ../grothendieck-worktrees/lesson-$MODULE.$i -b lesson-$MODULE.$i
done

# Generate lessons in parallel using GNU Parallel
parallel -j $LESSON_COUNT '
  cd ../grothendieck-worktrees/lesson-'$MODULE'.{} && \
  echo "/new-lesson module-'$MODULE' lesson-'$MODULE'.{} \"Lesson $MODULE.{}\"" | claude && \
  echo "Build this lesson following the specification." | claude
' ::: $(seq 1 $LESSON_COUNT)

echo "Generated $LESSON_COUNT lessons for Module $MODULE in parallel!"

# Usage:
# bash scripts/parallel-lesson-generation.sh 01 5
```

---

## 8. Agent SDK Integration

### Building a Lesson Generator Agent (Sid & Barry)

Create an agent that generates lessons automatically:

```typescript
// scripts/lesson-generator-agent.ts

import { Agent } from '@anthropic-ai/claude-agent-sdk';

const lessonGeneratorAgent = new Agent({
  name: 'lesson-generator',
  model: 'claude-sonnet-4-20250514',
  
  systemPrompt: `
You are a lesson generation agent for the Grothendieck Explorable Explanations course.

Your task is to generate complete, interactive mathematical lessons.

You have access to:
- The project CLAUDE.md (full context)
- The PRD (lesson specifications)
- The component library
- Artifacts-builder scripts

For each lesson, you will:
1. Read the lesson specification from the PRD
2. Create the lesson directory structure
3. Write CLAUDE.md with lesson context
4. Implement interactive components
5. Build the narrative flow
6. Bundle to single HTML
7. Run quality checks
8. Report completion

You work autonomously but ask for clarification when needed.
`,

  tools: [
    {
      name: 'read_prd_section',
      description: 'Read a specific lesson section from the PRD',
      input_schema: {
        type: 'object',
        properties: {
          module_id: { type: 'string' },
          lesson_id: { type: 'string' }
        },
        required: ['module_id', 'lesson_id']
      },
      handler: async ({ module_id, lesson_id }) => {
        // Read PRD and extract lesson spec
        return lesson_spec;
      }
    },
    
    {
      name: 'create_lesson',
      description: 'Create a new lesson from template',
      input_schema: {
        type: 'object',
        properties: {
          module_id: { type: 'string' },
          lesson_id: { type: 'string' },
          title: { type: 'string' }
        },
        required: ['module_id', 'lesson_id', 'title']
      },
      handler: async ({ module_id, lesson_id, title }) => {
        // Execute /new-lesson command
        return creation_result;
      }
    },
    
    {
      name: 'implement_component',
      description: 'Implement an interactive component for the lesson',
      input_schema: {
        type: 'object',
        properties: {
          component_name: { type: 'string' },
          specification: { type: 'string' }
        },
        required: ['component_name', 'specification']
      },
      handler: async ({ component_name, specification }) => {
        // Generate component code
        return implementation_result;
      }
    },
    
    {
      name: 'bundle_lesson',
      description: 'Bundle lesson to single HTML artifact',
      input_schema: {
        type: 'object',
        properties: {
          lesson_path: { type: 'string' }
        },
        required: ['lesson_path']
      },
      handler: async ({ lesson_path }) => {
        // Run bundle script
        return bundle_result;
      }
    },
    
    {
      name: 'quality_check',
      description: 'Run comprehensive quality checks on lesson',
      input_schema: {
        type: 'object',
        properties: {
          lesson_path: { type: 'string' }
        },
        required: ['lesson_path']
      },
      handler: async ({ lesson_path }) => {
        // Run quality checks
        return quality_report;
      }
    }
  ]
});

// Generate a lesson
async function generateLesson(moduleId: string, lessonId: string) {
  const result = await lessonGeneratorAgent.run(`
Generate lesson ${moduleId}-${lessonId} following these steps:

1. Read the lesson specification from the PRD
2. Create the lesson structure
3. Implement all interactive components
4. Build the complete lesson
5. Bundle to HTML
6. Run quality checks
7. Report results

Work autonomously and report progress at each step.
  `);
  
  return result;
}

// Generate entire module in parallel
async function generateModule(moduleId: string, lessonCount: number) {
  const promises = [];
  
  for (let i = 1; i <= lessonCount; i++) {
    const lessonId = `lesson-${moduleId}.${i}`;
    promises.push(generateLesson(moduleId, lessonId));
  }
  
  const results = await Promise.all(promises);
  return results;
}

// Generate entire course!
async function generateCourse() {
  const modules = [
    { id: '01', lessonCount: 5 },
    { id: '02', lessonCount: 3 },
    { id: '03', lessonCount: 2 },
    // ... all modules
  ];
  
  for (const module of modules) {
    console.log(`Generating Module ${module.id}...`);
    await generateModule(module.id, module.lessonCount);
  }
  
  console.log('Course generation complete!');
}

// Run it!
generateCourse();
```

### Usage

```bash
# Install the Agent SDK
npm install @anthropic-ai/claude-agent-sdk

# Run the lesson generator agent
npx ts-node scripts/lesson-generator-agent.ts

# Or generate specific lessons
npx ts-node scripts/lesson-generator-agent.ts --module 01 --lesson 1.1

# Or entire module
npx ts-node scripts/lesson-generator-agent.ts --module 01
```

This agent works autonomously to generate lessons, making decisions about implementation, checking quality, and reporting progress!

---

## 9. Testing & Quality Assurance

### Testing Strategy (Ashwin)

```bash
# Create comprehensive test suite

# Unit tests for mathematical functions
packages/core/src/lib/math/__tests__/

# Component tests
packages/core/src/components/__tests__/

# Integration tests for lessons
packages/lessons/__tests__/

# Visual regression tests
packages/lessons/__tests__/visual/

# Performance benchmarks
packages/lessons/__tests__/performance/
```

### Automated Quality Checks

```typescript
// scripts/quality-check.ts

interface QualityReport {
  mathematicalCorrectness: CheckResult[];
  interactiveQuality: CheckResult[];
  pedagogicalQuality: CheckResult[];
  visualQuality: CheckResult[];
  technicalQuality: CheckResult[];
  overallScore: number;
}

async function runQualityCheck(lessonPath: string): Promise<QualityReport> {
  const checks = await Promise.all([
    checkMathematicalCorrectness(lessonPath),
    checkInteractiveQuality(lessonPath),
    checkPedagogicalQuality(lessonPath),
    checkVisualQuality(lessonPath),
    checkTechnicalQuality(lessonPath),
  ]);
  
  return generateReport(checks);
}

// Run with Claude Code
claude

> Run comprehensive quality check on lesson-1.1
> npx ts-node scripts/quality-check.ts packages/lessons/module-01/lesson-1.1
> 
> Review the report and address any issues flagged.
```

---

## 10. The 30-Day Sprint Plan

### Week 1: Foundation (Days 1-7)

**Day 1: Setup**
- Initialize repository structure
- Create all CLAUDE.md files
- Set up custom slash commands
- Configure Git worktrees

```bash
# Day 1 Tasks
claude
> Think hard about our repository architecture.
> Then execute these tasks:
> 1. Create directory structure following the PRD
> 2. Generate comprehensive CLAUDE.md files at each level
> 3. Set up custom slash commands in .claude/commands/
> 4. Configure artifacts-builder integration
> 5. Document everything
```

**Day 2-3: Core Math Library**
```bash
# Parallel development of math libraries
# Terminal 1: Category theory
cd packages/core/src/lib/math
claude
> Implement category-theory.ts following patterns in CLAUDE.md

# Terminal 2: Commutative algebra
> Implement commutative-algebra.ts with Spec computation

# Terminal 3: Sheaf theory
> Implement sheaf-theory.ts with sheafification
```

**Day 4-5: Mathematical Components**
```bash
# Build core math components in parallel
# Use Git worktrees

git worktree add ../component-category-diagram -b comp/category-diagram
git worktree add ../component-spectrum-viewer -b comp/spectrum-viewer
git worktree add ../component-sheaf-explorer -b comp/sheaf-explorer

# In each worktree:
> /new-component math ComponentName "Description"
> Think hard about the optimal implementation approach
> Implement with WebGPU/Three.js as needed
> Test and verify performance
```

**Day 6-7: Pedagogy Components**
```bash
# Build pedagogy components
> /new-component pedagogy ProofStepper "Interactive proof stepping"
> /new-component pedagogy ConceptCard "Expandable concept definitions"
> /new-component pedagogy ExercisePlayground "Problem-solving environment"
```

### Week 2: Module 1 - Category Theory (Days 8-14)

**Day 8: Module Setup**
```bash
# Set up Module 1
> Create comprehensive CLAUDE.md for module-01
> Set up 5 lesson directories
> Create Git worktrees for parallel development
```

**Day 9-13: Parallel Lesson Generation**
```bash
# Generate all 5 lessons in parallel using worktrees

# Terminal 1: Lesson 1.1
cd ../grothendieck-worktrees/lesson-1.1
claude
> /new-lesson module-01 lesson-1.1 "What is a Category?"
> Think hard about the best way to introduce categories
> Build the lesson incrementally:
> 1. Create CategoryPlayground component
> 2. Build CategoryZoo gallery
> 3. Add IdentityAnimation
> 4. Weave narrative
> 5. Add assessments

# Terminal 2: Lesson 1.2
> /new-lesson module-01 lesson-1.2 "Functors"
> Build FunctorBuilder and FunctorAnimator

# Terminal 3: Lesson 1.3
> /new-lesson module-01 lesson-1.3 "Natural Transformations"

# Terminal 4: Lesson 1.4
> /new-lesson module-01 lesson-1.4 "Limits"

# Terminal 5: Lesson 1.5
> /new-lesson module-01 lesson-1.5 "Adjoints"

# All develop simultaneously!
```

**Day 14: Module 1 Integration & QA**
```bash
# Merge all lessons
git merge lesson-1.1
git merge lesson-1.2
git merge lesson-1.3
git merge lesson-1.4
git merge lesson-1.5

# Run quality checks
for i in {1..5}; do
  /quality-check packages/lessons/module-01/lesson-1.$i
done

# Bundle all lessons
for i in {1..5}; do
  /bundle-lesson packages/lessons/module-01/lesson-1.$i
done
```

### Week 3: Modules 2-4 (Days 15-21)

**Day 15-16: Module 2 (Commutative Algebra)**
```bash
# 3 lessons in parallel
# Focus on Spec visualizations
# Heavy Three.js and WebGPU use
```

**Day 17-19: Module 3 (Sheaves)**
```bash
# 2 lessons in parallel
# Build SheafExplorer and GluingAnimator
# Implement sheafification animation
```

**Day 20-21: Module 4 Part 1 (Schemes)**
```bash
# Start with affine schemes
# SpectrumViewer with structure sheaf
# Build SchemeConstructor component
```

### Week 4: Modules 5-9 + Polish (Days 22-30)

**Day 22-23: Module 4 Part 2 + Module 5**
```bash
# General schemes by gluing
# Grothendieck topologies and sites
```

**Day 24-25: Module 6 (Topos Theory)**
```bash
# Most complex module!
# Build ToposNavigator (3D environment)
# Use extended thinking extensively
```

**Day 26-27: Modules 7-9 (Étale Cohomology, Descent, Motives)**
```bash
# Advanced topics
# Leverage existing components
# Focus on pedagogy
```

**Day 28-29: Integration & Cross-Linking**
```bash
# Build navigation system
# Link concepts across lessons
# Create master index
# Performance optimization pass
```

**Day 30: Final Polish & Launch**
```bash
# Visual consistency check
# Comprehensive QA
# Bundle everything
# Create deployment package
# 🚀 LAUNCH!
```

---

## Summary: The Anthropic Team's Wisdom

### From Boris (Claude Code Lead)
"The key is the Research → Plan → Implement workflow. Never jump straight to code. Think first, plan second, build third."

### From Daisy (Research)
"Use extended thinking liberally. Say 'think hard' for anything complex. The 15 seconds of thinking upfront saves hours of iteration."

### From Ashwin (Product)
"Build, then review with another Claude session. This catches so many issues early."

### From Cat (Data Infrastructure)
"CLAUDE.md files are your superpower. Document everything. The better your CLAUDE.md, the better Claude Code performs."

### From Sid (Security)
"MCP for sensitive operations. Keep control over what Claude can access."

### From Cal (DevEx)
"Custom slash commands are game-changers. Build them early, use them often."

### From Nodir (Platform)
"Optimize for iteration speed. The faster you can build-test-iterate, the better the final product."

### From Barry (ML)
"The Agent SDK turns Claude into your teammate. Use it for autonomous workflows."

---

## Getting Started

```bash
# 1. Initialize repository
git clone <your-repo> grothendieck-explorable
cd grothendieck-explorable

# 2. Start Claude Code
claude

# 3. First command
> Think hard about how to structure this project for maximum success.
> Then create the foundational CLAUDE.md files following the templates 
> in the PRD and this strategy document.

# 4. Build component library
> Let's build the core component library. Start with the mathematical 
> foundations in packages/core/src/lib/math/

# 5. Scale to full course
> Now let's generate all lessons using Git worktrees and parallel development
```

You now have the complete playbook from Anthropic's best engineers. Use it to build something extraordinary! 🚀

---

**Document Version:** 1.0  
**Date:** October 26, 2025  
**Authors:** The Anthropic Engineering Collective  
**Status:** Ready for Implementation

Let's build the future of mathematical education! 💜🔬