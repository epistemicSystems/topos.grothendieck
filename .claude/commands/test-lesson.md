# Test Lesson

Runs comprehensive tests on a lesson including unit tests, integration tests, and validation checks.

## Usage

```
/test-lesson LESSON_PATH
```

**Example:**
```
/test-lesson packages/lessons/module-01/lesson-1.1
```

## Test Categories

### 1. Unit Tests

Tests individual functions and components:

```bash
npm test
```

**Checks**:
- Mathematical functions return correct results
- Components render without errors
- Props are validated correctly
- Edge cases are handled
- State updates work correctly

**Example Tests**:
```typescript
// Mathematical correctness
test('composeМорфизмs correctly', () => {
  const f = morphism('A', 'B', x => x + 1);
  const g = morphism('B', 'C', x => x * 2);
  const gf = compose(g, f);
  expect(gf(5)).toBe(12); // (5 + 1) * 2
});

// Component rendering
test('CategoryDiagram renders', () => {
  render(<CategoryDiagram objects={[...]} morphisms={[...]} />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});

// Edge cases
test('handles empty category', () => {
  render(<CategoryDiagram objects={[]} morphisms={[]} />);
  expect(screen.getByText(/empty/i)).toBeInTheDocument();
});
```

---

### 2. Integration Tests

Tests how components work together:

```bash
npm run test:integration
```

**Checks**:
- Parameter changes update visualizations
- Multiple components stay in sync
- State propagates across components
- Interactions trigger correct callbacks
- Navigation works

**Example Tests**:
```typescript
test('parameter change updates visualization', async () => {
  const { getByLabelText, getByRole } = render(<LessonApp />);

  const slider = getByLabelText('Number of objects');
  fireEvent.change(slider, { target: { value: '5' } });

  await waitFor(() => {
    const diagram = getByRole('img', { name: /category/i });
    expect(diagram.querySelectorAll('.object')).toHaveLength(5);
  });
});
```

---

### 3. Snapshot Tests

Ensures UI doesn't change unexpectedly:

```bash
npm run test:snapshot
```

**Checks**:
- Component output matches snapshot
- Layout stays consistent
- No unintended changes

```typescript
test('CategoryDiagram matches snapshot', () => {
  const { container } = render(
    <CategoryDiagram objects={mockObjects} morphisms={mockMorphisms} />
  );
  expect(container).toMatchSnapshot();
});
```

---

### 4. Visual Regression Tests

Catches visual changes:

```bash
npm run test:visual
```

**Uses**: Percy, Chromatic, or Playwright screenshots

**Checks**:
- Visual output matches baseline
- No unintended styling changes
- Responsive layouts work
- Animations render correctly

---

### 5. Performance Tests

Validates performance requirements:

```bash
npm run test:performance
```

**Checks**:
- Initial load < 3s
- Interaction latency < 100ms
- Animations maintain 60fps
- Memory usage stays bounded
- No performance regressions

**Example Tests**:
```typescript
test('interactions are fast', async () => {
  const { getByRole } = render(<CategoryDiagram {...props} />);

  const startTime = performance.now();
  fireEvent.click(getByRole('button', { name: /compose/i }));
  const endTime = performance.now();

  expect(endTime - startTime).toBeLessThan(100);
});

test('maintains 60fps during animation', async () => {
  const frameRates = [];

  // Monitor frame rate during animation
  observeFrameRate((fps) => frameRates.push(fps));

  // Trigger animation
  fireEvent.click(getByRole('button', { name: /animate/i }));
  await waitFor(() => expect(frameRates.length).toBeGreaterThan(60));

  // All frames should be >= 60fps
  expect(frameRates.every(fps => fps >= 60)).toBe(true);
});
```

---

### 6. Accessibility Tests

Ensures lesson is accessible:

```bash
npm run test:a11y
```

**Uses**: jest-axe, testing-library/user-event

**Checks**:
- No accessibility violations (axe)
- Keyboard navigation works
- Focus management correct
- ARIA labels present
- Screen reader compatible

**Example Tests**:
```typescript
test('is keyboard accessible', () => {
  const { getByRole } = render(<LessonApp />);

  // Tab to first interactive element
  userEvent.tab();
  expect(getByRole('button', { name: /start/i })).toHaveFocus();

  // Enter activates
  userEvent.keyboard('{Enter}');
  expect(getByRole('heading', { name: /introduction/i })).toBeVisible();
});

test('has no accessibility violations', async () => {
  const { container } = render(<LessonApp />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

### 7. Mathematical Validation

Validates mathematical correctness:

```bash
npm run test:math
```

**Checks**:
- Category axioms satisfied
- Commutative diagrams actually commute
- Algebraic computations correct
- Sheaf axioms verified
- Scheme constructions valid

**Example Tests**:
```typescript
test('category satisfies associativity', () => {
  const cat = new Category(objects, morphisms);

  // For all f: A → B, g: B → C, h: C → D
  // (h ∘ g) ∘ f = h ∘ (g ∘ f)
  for (const [f, g, h] of compatibleTriples(cat)) {
    const left = cat.compose(cat.compose(h, g), f);
    const right = cat.compose(h, cat.compose(g, f));
    expect(left).toEqual(right);
  }
});

test('diagram commutes', () => {
  const diagram = buildDiagram(objects, morphisms);

  // Check all paths from A to D give same morphism
  const paths = diagram.findAllPaths('A', 'D');
  const results = paths.map(path => diagram.composePath(path));

  expect(results.every(r => r.equals(results[0]))).toBe(true);
});
```

---

## Test Configuration

### package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --testMatch='**/*.integration.test.tsx'",
    "test:snapshot": "jest --updateSnapshot",
    "test:visual": "percy exec -- jest",
    "test:performance": "jest --testMatch='**/*.perf.test.tsx'",
    "test:a11y": "jest --testMatch='**/*.a11y.test.tsx'",
    "test:math": "jest --testMatch='**/*.math.test.tsx'",
    "test:all": "npm test && npm run test:integration && npm run test:a11y"
  }
}
```

### jest.config.js

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

---

## Output

Test results are displayed with:

```
PASS  src/components/__tests__/CategoryDiagram.test.tsx
  CategoryDiagram
    ✓ renders without crashing (45ms)
    ✓ displays objects (23ms)
    ✓ displays morphisms (19ms)
    ✓ handles composition (67ms)
    ✓ animates natural transformations (234ms)
    ✓ is keyboard accessible (56ms)
    ✓ has no a11y violations (123ms)

PASS  src/lib/math/__tests__/category-theory.test.tsx
  Category
    ✓ satisfies identity axiom (12ms)
    ✓ satisfies associativity (34ms)
    ✓ composes morphisms correctly (8ms)

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        3.456s

Coverage:
  Statements   : 92.5% ( 148/160 )
  Branches     : 88.2% ( 45/51 )
  Functions    : 95.0% ( 38/40 )
  Lines        : 93.1% ( 135/145 )
```

---

## Coverage Report

HTML coverage report generated at `coverage/index.html`:

- Shows which lines are tested
- Identifies untested branches
- Highlights gaps in coverage
- Helps find edge cases

---

## Continuous Integration

Tests run automatically on:
- Every commit (pre-commit hook)
- Every push (GitHub Actions)
- Every PR (required to pass)

---

## Tips

- **Write tests first**: TDD for complex logic
- **Test edge cases**: Empty, null, huge, negative
- **Mock expensive operations**: Don't compute actual Spec(ℤ[x,y,z,w])
- **Keep tests fast**: < 5s for full suite
- **100% math coverage**: Mathematical functions must be fully tested

---

## Related Commands

- `/quality-check`: Comprehensive quality assessment
- `/bundle-lesson`: Bundle after tests pass
- `/new-lesson`: Includes test templates
