# Lesson 1.2: Functors - Structure-Preserving Maps

## Overview

**Duration:** 45 minutes
**Prerequisites:** Lesson 1.1 (What is a Category?)
**Difficulty:** Beginner to Intermediate

## Learning Objectives

By the end of this lesson, students will be able to:

1. **Define functors** precisely as structure-preserving maps between categories
2. **Recognize functors** in familiar mathematical contexts (forgetful, free, homology)
3. **Distinguish** between covariant and contravariant functors
4. **Verify** that a given mapping is a functor by checking the axioms
5. **Compose functors** to build new functors
6. **Understand** why functors are "the morphisms in the category of categories"

## Prerequisites

- Lesson 1.1: What is a Category?
  - Understanding of objects, morphisms, composition
  - Familiarity with category axioms
  - Experience with CategoryDiagram component
- Basic familiarity with:
  - Sets and functions
  - Groups and homomorphisms (helpful but not required)

## Key Concepts

### The Big Idea
If categories are "mathematical universes" with objects and morphisms, then **functors are the bridges between universes** that preserve structure. Just as group homomorphisms preserve group operations, functors preserve categorical structure: composition and identities.

### Formal Definition
A **functor** F: 𝒞 → 𝒟 consists of:
- **Object map**: F₀: Ob(𝒞) → Ob(𝒟)
- **Morphism map**: F₁: Hom_𝒞(A, B) → Hom_𝒟(F(A), F(B))

Satisfying:
1. **Preserves composition**: F(g ∘ f) = F(g) ∘ F(f)
2. **Preserves identities**: F(id_A) = id_{F(A)}

### Contravariant Functors
A **contravariant functor** F: 𝒞 → 𝒟 reverses arrows:
- F: Hom_𝒞(A, B) → Hom_𝒟(F(B), F(A))
- F(g ∘ f) = F(f) ∘ F(g) (note the reversal!)

## Narrative Arc

### Act 1: Motivation - "We Need Bridges" (5 min)

**Hook**: Categories are isolated universes. How do they talk to each other?

**Examples**:
- Grp and Set are separate categories
- But we can "forget" the group structure to get just the set
- This forgetting should preserve composition!
- **Question**: What structure must "forgetting" preserve?

### Act 2: Examples Zoo (12 min)

**Interactive Component**: `FunctorExplorer`

Explore concrete functors:

1. **Forgetful Functor** U: Grp → Set
   - U(G) = underlying set
   - U(φ: G → H) = φ as a function

2. **Free Functor** F: Set → Grp
   - F(S) = free group on S
   - F(f: S → T) = induced homomorphism

3. **Power Set** 𝒫: Set → Set
   - 𝒫(X) = power set of X
   - 𝒫(f: X → Y)(A) = f(A) = {f(a) | a ∈ A}

4. **Opposite** op: 𝒞 → 𝒞^op
   - Identity on objects
   - Reverses all morphisms

5. **Hom Functor** Hom(A, -): 𝒞 → Set
   - Hom(A, B) = set of morphisms A → B
   - Contravariant: Hom(-, B)

### Act 3: The Definition and Axioms (10 min)

**Interactive Component**: `FunctorValidator`

- Present precise definition
- Interactive axiom verification
- Show counterexamples where axioms fail
- Covariant vs contravariant comparison

### Act 4: Functor Composition (10 min)

**Interactive Component**: `FunctorComposer`

- Functors compose like functions
- Build Category of Categories (Cat)
- Trace objects/morphisms through composition
- Examples: U ∘ F, preview of adjunctions

### Act 5: Why Functors Matter (8 min)

**Synthesis**:
- Functors translate problems between domains
- Preservation reveals structure
- Preview: Natural transformations (Lesson 1.3)

## Interactive Components

### 1. FunctorExplorer
**File**: `src/components/FunctorExplorer.tsx`

**Purpose**: Gallery of concrete functors to build intuition

**Features**:
- 5+ functors with visualizations
- Side-by-side category comparison
- Click objects/morphisms to see mappings
- Verify axioms for each functor
- Toggle covariant/contravariant

**Technical**:
- Uses CategoryDiagram from @grothendieck/core
- Animated mappings with Framer Motion
- Functor verification from category-theory.ts

### 2. FunctorValidator
**File**: `src/components/FunctorValidator.tsx`

**Purpose**: Build custom functors and verify axioms

**Features**:
- Define object/morphism maps
- Real-time axiom checking
- Show counterexamples on failure
- Gallery of "almost functors"

**Technical**:
- Interactive mapping interface
- Uses Functor.verify() method
- Visual feedback on validation

### 3. FunctorComposer
**File**: `src/components/FunctorComposer.tsx`

**Purpose**: Compose functors and see Category of Categories

**Features**:
- Three categories: 𝒞, 𝒟, ℰ
- Two functors: F, G
- Show G ∘ F composition
- Trace objects/morphisms through
- Example compositions

**Technical**:
- Three-panel layout
- Animated data flow
- Functor.compose() method

## Assessment

### Formative (Throughout)
- Explore 5 functors in FunctorExplorer
- Validate 3+ functors in FunctorValidator
- Compose 2+ functors in FunctorComposer

### Summative (End)
- Verify given mapping is a functor
- Construct dual functor 𝒞^op
- Explain why π₁ is a functor
- Analyze U ∘ F composition

## Technical Requirements

### Dependencies
- React 18 + TypeScript (strict mode)
- @grothendieck/core: Category, Functor, CategoryDiagram
- Tailwind CSS
- Framer Motion
- KaTeX

### Performance
- All interactions < 100ms
- 60fps animations
- Handle 20 objects, 100 morphisms

### Accessibility
- Keyboard navigation
- ARIA labels
- Screen reader friendly

## Mathematical Rigor

- Definitions match Mac Lane, Awodey
- All examples are real functors
- Composition verified associative
- No hand-waving or imprecise language

## Pedagogical Strategy

- **Concrete → Abstract**: forgetful → free → topological → Hom
- **Multiple Representations**: diagrams, tables, animations, code
- **Active Learning**: build, validate, compose
- **Anticipate Misconceptions**:
  - Functors ≠ just functions (map objects AND morphisms)
  - Not any mapping (must preserve structure)
  - Contravariant ≠ inverse (reverses arrows)

## Connection to Other Lessons

- **From 1.1**: Categories provide structure, functors are morphisms between them
- **To 1.3**: Natural transformations are morphisms between functors
- **To 1.4**: Functors preserving limits/colimits
- **To 1.5**: Adjoint functors (F ⊣ U)

## Quality Checklist

- [ ] Mathematical correctness verified
- [ ] All interactions < 100ms
- [ ] 60fps animations
- [ ] Keyboard accessible
- [ ] Learning objectives met
- [ ] Bundle size < 5MB
- [ ] TypeScript strict mode
- [ ] Comprehensive tests

## Success Criteria

- ✅ Students define functors precisely
- ✅ Students recognize functors in mathematics
- ✅ Students verify functor axioms
- ✅ Students compose functors correctly
- ✅ 60fps rendering
- ✅ TypeScript strict compilation
- ✅ Pedagogically engaging
- ✅ Mathematically rigorous

## Estimated Development Time

- FunctorExplorer: 3-4 hours
- FunctorValidator: 2-3 hours
- FunctorComposer: 2-3 hours
- App.tsx narrative: 2 hours
- Testing/polish: 1-2 hours

**Total**: 10-14 hours

---

**Remember**: Functors are the heart of category theory. Make them beautiful, intuitive, and mathematically precise!
