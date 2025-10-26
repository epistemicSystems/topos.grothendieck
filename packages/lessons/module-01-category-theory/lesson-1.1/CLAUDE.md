# Lesson 1.1: What is a Category?

## Learning Objectives

By the end of this lesson, students will be able to:

1. **Define** a category precisely (objects, morphisms, composition, identities)
2. **Recognize** categories in familiar mathematics (Set, Grp, Ring, Top, Vect)
3. **Understand** composition and identity axioms
4. **Build** simple categories interactively
5. **Appreciate** that "categories are everywhere"

## Prerequisites

- Sets and functions (basic understanding)
- Groups and homomorphisms (exposure)
- Comfort with abstract definitions

## Narrative Arc

### Act 1: You Already Know Categories (5 min)
**Hook**: "You've been working with categories your whole mathematical life—you just didn't know it!"

### Act 2: The Pattern Appears Everywhere (10 min)
**Exploration**: Interactive gallery of categories

### Act 3: The Abstract Definition (8 min)
**Definition**: Formal category axioms with visualizations

### Act 4: Build Your Own Category (12 min)
**Playground**: Interactive category construction

### Act 5: Synthesis (5 min)
**Key Takeaways** + Preview of functors

## Interactive Components

### Component 1: CategoryZoo
- **Purpose**: Gallery of familiar categories
- **Features**: Set, Grp, Ring, Top, Vect with examples
- **Implementation**: Uses CategoryDiagram from core

### Component 2: CategoryPlayground
- **Purpose**: Build custom categories
- **Features**: Add objects, draw morphisms, compose
- **Implementation**: Interactive state management

### Component 3: IdentityAnimation
- **Purpose**: Visualize identity morphisms
- **Features**: Animated composition with identities

## Technical Requirements

- React 18 + TypeScript
- @grothendieck/core components
- KaTeX for math rendering
- Framer Motion for animations

## Quality Checklist

- [ ] Mathematical correctness verified
- [ ] All interactions < 100ms
- [ ] 60fps animations
- [ ] Keyboard accessible
- [ ] Learning objectives met
- [ ] Bundle size < 3MB

## Expected Outcomes

Students will understand categories as the fundamental pattern of mathematical structure.

---

**Status**: Ready for Implementation
