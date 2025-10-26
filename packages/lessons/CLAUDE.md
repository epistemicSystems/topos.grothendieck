# Lessons - Grothendieck Explorable Explanations

## Purpose

This directory contains all interactive lessons organized by module. Each lesson is a self-contained explorable explanation that can be bundled into a single HTML file.

## Module Structure

```
lessons/
├── module-01-category-theory/          # Foundation
├── module-02-commutative-algebra/      # Algebraic toolkit
├── module-03-sheaves/                  # Local-to-global principle
├── module-04-schemes/                  # The revolution begins
├── module-05-grothendieck-topologies/  # Abstract covers
├── module-06-topos-theory/             # Universe of mathematics
├── module-07-etale-cohomology/         # Cohomology in all characteristics
├── module-08-descent/                  # Gluing theory
├── module-09-motives/                  # Universal cohomology
└── module-10-synthesis/                # The grand vision
```

## Lesson Structure

Each lesson follows this structure:

```
lesson-X.X-title/
├── CLAUDE.md           # Lesson-specific context and requirements
├── index.html          # Entry point
├── package.json        # Dependencies
├── src/
│   ├── App.tsx         # Main lesson component
│   ├── components/     # Lesson-specific components
│   │   ├── NarrativeSection.tsx
│   │   ├── InteractiveWidget.tsx
│   │   └── Assessment.tsx
│   └── styles/
│       └── lesson.css  # Lesson-specific styles
└── bundle.html         # Bundled output (generated)
```

## Lesson Template

Every lesson includes:

1. **Narrative Introduction** (2-3 min read)
   - Hook: Why this matters
   - Context: Where we are in the journey
   - Preview: What we'll explore

2. **Interactive Exploration** (20-40 min)
   - Main interactive widgets
   - Parameter controls
   - Multiple representations
   - Guided questions

3. **Challenges/Exercises** (10-20 min)
   - Interactive problems
   - Construction challenges
   - Pattern recognition
   - Assessment

4. **Synthesis and Preview** (2-3 min)
   - Key takeaways
   - Connections to other concepts
   - Preview of next lesson

## Pedagogical Principles

### Concrete → Abstract Progression

Always start with concrete examples:
1. **Familiar**: Something students already know
2. **Generalize**: Show the pattern across examples
3. **Abstract**: Give the formal definition
4. **Power**: Show what the abstraction enables

### Multiple Representations

Every concept should have at least 3 views:
1. **Algebraic**: Symbolic notation
2. **Geometric**: Visual/spatial
3. **Categorical**: Commutative diagrams

### Scaffolding

- **Guided mode**: Scripted narrative with interactive checkpoints
- **Free play**: Sandbox with all parameters unlocked
- **Deep dive**: Rigorous definitions and proofs

### Assessment

- No traditional quizzes
- Everything is hands-on
- Validation through interaction
- "Can you build..." challenges
- "What happens if..." explorations

## Technical Requirements

### React + TypeScript

```typescript
// Every lesson exports an App component
export default function App() {
  return (
    <LessonShell
      title="What is a Category?"
      module={1}
      lesson={1}
    >
      <NarrativeSection>
        ...
      </NarrativeSection>

      <InteractiveSection>
        <CategoryPlayground />
      </InteractiveSection>

      <Assessment>
        ...
      </Assessment>
    </LessonShell>
  );
}
```

### Dependencies

All lessons can use:
- React 18
- TypeScript
- Three.js (for 3D)
- KaTeX (for math)
- Tailwind CSS
- shadcn/ui components
- Core components from `@/components/`
- Math utilities from `@/lib/math/`

### Bundling

Lessons bundle to single HTML:
```bash
# From lesson directory
npm run build

# Output: bundle.html
# - All code inlined
# - All dependencies included
# - Math rendering works offline
# - Can be used as Claude artifact
```

### Performance Targets

- Load time: < 3 seconds
- Interaction latency: < 100ms
- Animation: 60fps
- Bundle size: < 5MB

## Lesson Development Workflow

1. **Plan**: Read module CLAUDE.md, understand learning objectives
2. **Create**: Use `/new-lesson` command to scaffold
3. **Implement**: Build interactive components
4. **Test**: Verify interactions and performance
5. **Bundle**: Create single HTML artifact
6. **Review**: Run `/quality-check`
7. **Iterate**: Refine based on feedback

## Quality Checklist

Before considering a lesson complete:

### Mathematical Quality
- [ ] Definitions are precise
- [ ] Examples are correct
- [ ] Theorems stated accurately
- [ ] Notation is consistent

### Interactive Quality
- [ ] All widgets responsive (<100ms)
- [ ] Parameters have sensible ranges
- [ ] Edge cases handled
- [ ] Animations smooth (60fps)
- [ ] State propagates correctly

### Pedagogical Quality
- [ ] Learning objectives met
- [ ] Narrative flow clear
- [ ] Scaffolding appropriate
- [ ] Assessment meaningful
- [ ] Hints helpful

### Visual Quality
- [ ] Design clean
- [ ] Color encodes meaning
- [ ] Typography readable
- [ ] Layout serves content
- [ ] No AI slop

### Technical Quality
- [ ] Code well-structured
- [ ] Components reusable
- [ ] Performance good
- [ ] Bundles successfully
- [ ] No TypeScript errors

## Learning Objectives by Module

### Module 1: Category Theory Essentials
- Understand categories, functors, natural transformations
- Master universal properties and limits
- Internalize adjoint functors
- Think categorically

### Module 2: Commutative Algebra & Topology
- Understand Spec(R) as topological space
- Master Zariski topology
- See localization as "zooming in"
- Connect algebra and geometry

### Module 3: Sheaves and Sheafification
- Understand sheaves as "data that glues"
- Master sheaf axioms
- See sheafification as adjoint functor
- Build local-to-global intuition

### Module 4: Schemes
- Master affine schemes
- Understand structure sheaf
- See schemes by gluing
- Build geometric intuition

### Module 5: Grothendieck Topologies & Sites
- Understand abstract covers
- Master sieves
- See sites as categories with topology
- Generalize sheaves

### Module 6: Topos Theory
- Understand topoi as universes
- Master subobject classifier
- See geometric morphisms
- Internalize topos logic

### Module 7: Étale Cohomology
- Master étale morphisms
- Understand étale site
- See cohomology in all characteristics
- Connect to Weil conjectures

### Module 8: Descent Theory
- Understand descent data
- Master effective descent
- See gluing as fundamental
- Internalize fpqc descent

### Module 9: Motives
- Understand universal cohomology
- See motives as linearization
- Master pure motives
- Connect to Standard Conjectures

### Module 10: Synthesis
- See connections across mathematics
- Understand Grothendieck's impact
- Look toward future developments
- Appreciate categorical thinking

## Design Patterns

### Explorable Explanation Pattern

```typescript
function ExplorePattern() {
  const [param, setParam] = useState(initialValue);

  // Derived mathematical object
  const mathObject = useMemo(
    () => computeMathObject(param),
    [param]
  );

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left: Controls */}
      <ParameterPanel
        parameters={[{
          name: 'Parameter',
          type: 'number',
          value: param,
          onChange: setParam
        }]}
      />

      {/* Right: Visualization */}
      <VisualizationCanvas>
        <MathVisualization data={mathObject} />
      </VisualizationCanvas>

      {/* Bottom: Live equations */}
      <LiveMathDisplay object={mathObject} />
    </div>
  );
}
```

### Proof Stepper Pattern

```typescript
function ProofPattern() {
  const [step, setStep] = useState(0);

  const proof = [
    { statement: '...', justification: '...' },
    { statement: '...', justification: '...' },
    // ...
  ];

  return (
    <ProofStepper
      proof={proof}
      currentStep={step}
      onStepChange={setStep}
    />
  );
}
```

### Construction Challenge Pattern

```typescript
function ConstructionPattern() {
  const [construction, setConstruction] = useState({});
  const isValid = checkValidity(construction);

  return (
    <ExercisePlayground
      problem="Build a functor between these categories"
      workspace={
        <FunctorBuilder
          source={categoryC}
          target={categoryD}
          value={construction}
          onChange={setConstruction}
        />
      }
      checker={() => isValid}
      hints={['Start with the objects...', 'Now map the morphisms...']}
    />
  );
}
```

## Common Pitfalls to Avoid

- ❌ Too abstract too fast (start concrete!)
- ❌ Static diagrams (make them interactive!)
- ❌ No motivation (always explain why!)
- ❌ Passive reading (require interaction!)
- ❌ Single representation (show multiple views!)
- ❌ No assessment (validate understanding!)
- ❌ Poor performance (60fps or bust!)
- ❌ Accessibility afterthought (build it in!)

## Notes for Lesson Authors

- **Start simple**: Can always add complexity later
- **Test early**: Build, test, iterate
- **Ask "why?"**: Every interaction should have pedagogical purpose
- **Show, don't tell**: Visualization > explanation
- **Make it beautiful**: Aesthetics matter for learning
- **Make it rigorous**: Don't sacrifice correctness for "simplicity"

---

**Remember**: These lessons are how students will experience Grothendieck's revolutionary vision. Make every interaction count.
