# Comprehensive Quality Check

Runs a comprehensive quality assessment on a lesson or component, checking mathematical correctness, pedagogy, performance, and more.

## Usage

```
/quality-check ITEM_PATH
```

**Example:**
```
/quality-check packages/lessons/module-01/lesson-1.1
/quality-check packages/core/src/components/math/CategoryDiagram.tsx
```

## Check Categories

### 1. Mathematical Correctness ✓

Verifies mathematical accuracy:

- [ ] **Definitions are precise**: No ambiguity, standard terminology
- [ ] **Examples are correct**: Verified mathematically
- [ ] **Theorems stated accurately**: Proper hypotheses and conclusions
- [ ] **Notation is consistent**: Follows conventions in CLAUDE.md
- [ ] **Proofs are rigorous** (if included): No logical gaps
- [ ] **Diagrams commute**: All claimed commutative diagrams actually commute
- [ ] **Calculations correct**: Symbolic manipulations are valid

**How We Check**:
- Manual review of mathematical content
- Cross-reference with standard texts
- Verify examples with symbolic computation
- Test edge cases

**Pass Criteria**: No mathematical errors found

---

### 2. Interactive Quality ⚡

Ensures interactions are smooth and responsive:

- [ ] **Response time < 100ms**: All interactions feel instant
- [ ] **Parameters have sensible ranges**: No nonsensical values
- [ ] **Edge cases handled**: Boundary conditions work
- [ ] **Animations smooth**: Consistent 60fps
- [ ] **State propagates correctly**: Changes update all views
- [ ] **No UI jank**: Smooth scrolling, no layout shifts
- [ ] **Interactions are intuitive**: No confusion about what's clickable

**How We Check**:
- Performance profiling with Chrome DevTools
- Test with extreme parameter values
- Monitor frame rate during animations
- User testing for intuitiveness

**Pass Criteria**: All interactions <100ms, 60fps animations

---

### 3. Pedagogical Quality 📚

Evaluates teaching effectiveness:

- [ ] **Learning objectives met**: Content achieves stated goals
- [ ] **Narrative flow clear**: Story makes sense, builds logically
- [ ] **Scaffolding appropriate**: Right level of challenge
- [ ] **Assessment meaningful**: Exercises test understanding
- [ ] **Hints helpful**: Guide without spoiling
- [ ] **Multiple representations**: Algebraic + geometric + categorical
- [ ] **Concrete → Abstract**: Starts with examples, builds to theory
- [ ] **Motivation clear**: "Why should I care?" answered

**How We Check**:
- Review against learning objectives
- Test with target audience
- Expert review of pedagogical approach
- Analyze hint progression

**Pass Criteria**: Expert reviewer confirms pedagogical soundness

---

### 4. Visual Quality 🎨

Checks design and aesthetics:

- [ ] **Design clean and uncluttered**: No visual noise
- [ ] **Color encodes meaning**: Not arbitrary
- [ ] **Typography readable**: Appropriate sizes, contrast
- [ ] **Layout serves content**: Form follows function
- [ ] **No AI slop**: No centered everything, purple gradients, excessive rounding
- [ ] **Responsive**: Works on different screen sizes
- [ ] **Consistent**: Follows design system
- [ ] **Beautiful**: Aesthetically pleasing

**How We Check**:
- Visual inspection
- Color contrast analysis
- Design system compliance check
- Cross-browser testing

**Pass Criteria**: Follows design system, no AI slop characteristics

---

### 5. Technical Quality 💻

Validates code and performance:

- [ ] **Code well-structured**: Clean, organized, understandable
- [ ] **Components reusable**: Not overly coupled
- [ ] **TypeScript strict mode**: No `any` types, all typed
- [ ] **Performance optimized**: 60fps, fast load times
- [ ] **No memory leaks**: Profiled and verified
- [ ] **Bundles successfully**: Single HTML output works
- [ ] **No console errors**: Clean console
- [ ] **Tests pass**: All unit and integration tests
- [ ] **Accessible**: WCAG AA compliance

**How We Check**:
- TypeScript compiler
- ESLint/Prettier
- Bundle size analysis
- Performance profiling
- Memory leak detection
- Accessibility audit

**Pass Criteria**: TypeScript strict passes, bundle <5MB, no errors

---

### 6. Accessibility Quality ♿

Ensures everyone can learn:

- [ ] **Keyboard navigable**: Full functionality without mouse
- [ ] **Screen reader friendly**: Proper ARIA labels
- [ ] **Sufficient contrast**: WCAG AA minimum
- [ ] **Focus visible**: Clear focus indicators
- [ ] **Alt text provided**: Images have descriptions
- [ ] **No flashing content**: Safe for photosensitive users
- [ ] **Resizable text**: Works at 200% zoom
- [ ] **Semantic HTML**: Proper heading structure

**How We Check**:
- Lighthouse accessibility audit
- axe DevTools
- Manual keyboard testing
- Screen reader testing (NVDA/JAWS)
- Color contrast analyzer

**Pass Criteria**: Lighthouse accessibility score >90

---

## Output Format

The command generates `quality-report.md`:

```markdown
# Quality Report: Lesson 1.1 - What is a Category?

**Date**: 2025-10-26
**Overall Score**: 92/100

## Summary

✓ 42 checks passed
⚠ 3 warnings
✗ 2 issues found

---

## Mathematical Correctness: ✓ PASS (100%)

✓ Definitions precise and standard
✓ Examples verified correct
✓ Notation consistent
✓ Diagrams commute

---

## Interactive Quality: ⚠ PASS (85%)

✓ Response times good
✓ Animations smooth (60fps)
⚠ Parameter range could be wider (suggestion)
⚠ One edge case needs handling (see below)

**Issues**:
- When objects = 0, diagram crashes
- Suggested fix: Add validation min=1

---

## Pedagogical Quality: ✓ PASS (95%)

✓ Learning objectives met
✓ Narrative flows well
✓ Scaffolding appropriate
⚠ One hint could be clearer (line 234)

---

## Visual Quality: ✓ PASS (90%)

✓ Clean design
✓ Color meaningful
✓ Typography good
✗ One layout issue on mobile

**Issues**:
- Interactive widget overflows on <768px width
- Suggested fix: Add responsive breakpoint

---

## Technical Quality: ✓ PASS (88%)

✓ TypeScript strict passes
✓ Bundle size good (2.8MB)
✓ No memory leaks
✗ One test failing

**Issues**:
- Test "composition associates" failing
- File: __tests__/CategoryDiagram.test.tsx:45

---

## Accessibility Quality: ✓ PASS (92%)

✓ Keyboard navigable
✓ ARIA labels present
✓ Contrast sufficient
⚠ One focus indicator could be clearer

**Lighthouse Score**: 92

---

## Recommendations

1. Fix mobile layout overflow
2. Add validation for parameters
3. Fix failing test
4. Enhance focus indicators
5. Clarify hint on line 234

---

## Next Steps

- [ ] Address the 2 failing checks
- [ ] Consider the 3 warnings
- [ ] Re-run quality check
- [ ] Bundle when all checks pass
```

---

## Score Calculation

- **Mathematical Correctness**: 25 points (must be 100%)
- **Interactive Quality**: 20 points
- **Pedagogical Quality**: 20 points
- **Visual Quality**: 15 points
- **Technical Quality**: 15 points
- **Accessibility Quality**: 5 points

**Total**: 100 points

**Passing Grade**: 80+
**Excellent Grade**: 90+

---

## Automated Checks

The command runs automated tools:

```bash
# TypeScript
tsc --noEmit --strict

# Linting
eslint src/ --ext .ts,.tsx

# Tests
npm test

# Bundle
npm run build

# Accessibility
lighthouse --only-categories=accessibility

# Performance
lighthouse --only-categories=performance
```

---

## Manual Review Checklist

Some checks require human judgment:

- Mathematical correctness review
- Pedagogical effectiveness
- Design aesthetics
- Hint quality
- Example selection

---

## Tips

- **Run early and often**: Don't wait until the end
- **Address warnings**: They often become issues later
- **100% math correctness**: Non-negotiable
- **User test**: Best way to find usability issues

---

## Related Commands

- `/test-lesson`: Run just the tests
- `/bundle-lesson`: Bundle after quality check passes
- `/new-lesson`: Start a new lesson
