# Create New Component

Creates a new reusable component in the core component library with proper TypeScript types, documentation, and tests.

## Usage

```
/new-component CATEGORY COMPONENT_NAME "DESCRIPTION"
```

**Categories**: `math`, `pedagogy`, `ui`

**Example:**
```
/new-component math SpectrumViewer "3D visualization of Spec(R)"
```

## What This Command Does

1. **Create component file**: `packages/core/src/components/$CATEGORY/$COMPONENT_NAME.tsx`
2. **Define TypeScript interface** with strict types
3. **Implement component** following patterns in CLAUDE.md
4. **Add prop validation**
5. **Export** from `packages/core/src/components/$CATEGORY/index.ts`
6. **Create test file**: `packages/core/src/components/__tests__/$COMPONENT_NAME.test.tsx`
7. **Add to docs**: Update `docs/component-api.md`
8. **Create example**: Add usage example

## Component Template

Generated component will follow this structure:

```typescript
import React from 'react';

/**
 * ${COMPONENT_NAME} - ${DESCRIPTION}
 *
 * @example
 * ```tsx
 * <${COMPONENT_NAME}
 *   data={...}
 *   onInteract={(e) => console.log(e)}
 * />
 * ```
 *
 * @performance [Performance notes]
 * @accessibility [Accessibility notes]
 */

export interface ${COMPONENT_NAME}Props {
  // Mathematical data
  data: MathematicalStructure;

  // Visual customization
  colorScheme?: 'default' | 'vibrant' | 'muted';
  showLabels?: boolean;
  animated?: boolean;

  // Interactions
  onInteract?: (event: InteractionEvent) => void;
  onSelect?: (item: any) => void;

  // Performance
  performanceMode?: 'high' | 'balanced' | 'low';

  // Accessibility
  ariaLabel?: string;
}

export const ${COMPONENT_NAME} = React.memo<${COMPONENT_NAME}Props>(
  function ${COMPONENT_NAME}({
    data,
    colorScheme = 'default',
    showLabels = true,
    animated = true,
    onInteract,
    onSelect,
    performanceMode = 'balanced',
    ariaLabel,
  }) {
    // Implementation here

    return (
      <div
        role="img"
        aria-label={ariaLabel || '${DESCRIPTION}'}
      >
        {/* Component content */}
      </div>
    );
  }
);

${COMPONENT_NAME}.displayName = '${COMPONENT_NAME}';
```

## Component Categories

### Math Components (`math/`)
For mathematical visualizations:
- CategoryDiagram
- SpectrumViewer
- SheafExplorer
- FunctorAnimator
- ToposNavigator

**Requirements**:
- Mathematically correct
- Interactive
- Beautiful (60fps animations)
- Accessible

### Pedagogy Components (`pedagogy/`)
For learning support:
- ProofStepper
- ConceptCard
- ExercisePlayground
- ParameterPanel

**Requirements**:
- Clear purpose
- Easy to use
- Helpful feedback
- Accessible

### UI Components (`ui/`)
Custom UI components:
- Based on shadcn/ui when possible
- Custom only when needed
- Consistent with design system

## Quality Checklist

Before committing the component:

- [ ] TypeScript strict mode passes (no `any`)
- [ ] Component is memoized if appropriate
- [ ] Accessibility attributes added (ARIA, keyboard)
- [ ] Performance tested (60fps with realistic data)
- [ ] Documentation written (JSDoc + examples)
- [ ] Tests pass (unit + integration)
- [ ] Exported from index.ts
- [ ] Added to component docs

## Testing Template

Generated test file will include:

```typescript
import { render, screen } from '@testing-library/react';
import { ${COMPONENT_NAME} } from '../${COMPONENT_NAME}';

describe('${COMPONENT_NAME}', () => {
  it('renders without crashing', () => {
    render(<${COMPONENT_NAME} data={mockData} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('handles interactions', () => {
    const onInteract = jest.fn();
    render(<${COMPONENT_NAME} data={mockData} onInteract={onInteract} />);
    // Test interactions
  });

  it('is accessible', () => {
    const { container } = render(
      <${COMPONENT_NAME} data={mockData} ariaLabel="Test" />
    );
    expect(container.querySelector('[aria-label]')).toBeInTheDocument();
  });
});
```

## Documentation Template

Component will be documented in `docs/component-api.md`:

```markdown
## ${COMPONENT_NAME}

${DESCRIPTION}

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | MathematicalStructure | required | The mathematical object to visualize |
| colorScheme | string | 'default' | Color scheme for the visualization |
| ... | ... | ... | ... |

### Usage

\`\`\`tsx
import { ${COMPONENT_NAME} } from '@/components/$CATEGORY';

function MyLesson() {
  return (
    <${COMPONENT_NAME}
      data={myData}
      animated={true}
      onInteract={handleInteract}
    />
  );
}
\`\`\`

### Performance

[Performance notes and recommendations]

### Accessibility

[Keyboard shortcuts, screen reader support, etc.]
```

## Tips

- **Follow patterns**: Check existing components in the same category
- **Start simple**: Core functionality first, polish later
- **Test early**: Write tests as you implement
- **Document well**: Future you will thank you
- **Performance**: Profile with realistic data sizes

## Related Commands

- `/new-lesson`: Create new lesson
- `/quality-check`: Check component quality
- `/test-lesson`: Run tests
