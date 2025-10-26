# Mathematical Components

## Purpose

These components visualize mathematical structures from Grothendieck's work: categories, schemes, sheaves, topoi, and more.

## Design Principles

1. **Mathematical Accuracy**: Every visualization must be mathematically correct
2. **Interactive**: Direct manipulation of mathematical objects
3. **Beautiful**: Smooth 60fps animations, elegant aesthetics
4. **Pedagogical**: Help build intuition, not just show pretty pictures

## Component Patterns

### Standard Props Pattern

All math components should follow this pattern:

```typescript
interface MathComponentProps {
  // The mathematical object(s) to visualize
  data: MathematicalStructure;

  // Visual customization
  colorScheme?: ColorScheme;
  showLabels?: boolean;
  animated?: boolean;

  // User interaction callbacks
  onSelect?: (item: any) => void;
  onHover?: (item: any) => void;

  // Performance mode
  performanceMode?: 'high' | 'balanced' | 'low';

  // Accessibility
  ariaLabel?: string;
}
```

### Visualization Technologies

- **SVG**: For 2D diagrams, < 100 elements
- **Canvas 2D**: For 2D graphics, 100-1000 elements
- **Three.js**: For 3D objects, any complexity
- **WebGPU**: For >100k vertices or complex compute

### Color Encoding

Colors must encode mathematical meaning:

- **Category Theory**:
  - Objects: `#3B82F6` (blue-500)
  - Morphisms: `#10B981` (green-500)
  - Functors: `#F59E0B` (amber-500)
  - Natural transformations: `#A855F7` (purple-500)

- **Algebra**:
  - Prime ideals: `#EF4444` (red-500)
  - Non-prime ideals: `#F97316` (orange-500)
  - Maximal ideals: `#DC2626` (red-600)
  - Rings: `#1E40AF` (blue-800)

- **Topology**:
  - Open sets: `#3B82F6` with 30% opacity
  - Closed sets: `#EF4444` with 30% opacity
  - Clopen sets: `#8B5CF6` (violet-500)

### Animation Guidelines

1. **Duration**:
   - UI transitions: 300ms
   - Mathematical transforms: 1000-2000ms
   - Complex morphisms: up to 3000ms

2. **Easing**:
   - UI: `ease-in-out`
   - Math: Custom cubic-bezier or linear for precision

3. **Performance**:
   - Always 60fps (16.67ms per frame)
   - Use `requestAnimationFrame`
   - Batch DOM updates
   - Use CSS transforms when possible

### Accessibility

Every component must:
- Support keyboard navigation (Tab, Arrow keys, Enter, Space)
- Have ARIA labels for screen readers
- Provide text alternatives for visualizations
- Support high contrast mode
- Be responsive (but optimized for desktop)

## Component Checklist

Before considering a math component complete:

- [ ] Mathematically correct (verified!)
- [ ] TypeScript strict mode passes
- [ ] 60fps performance with realistic data
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Properly color-coded
- [ ] Smooth animations
- [ ] Documented with examples
- [ ] Tested (unit + integration)

## Examples

### CategoryDiagram
- Renders objects and morphisms
- Auto-layout or manual positioning
- Composition on click
- Natural transformations animate

### SpectrumViewer
- 3D point cloud of prime ideals
- Zariski topology as regions
- Structure sheaf on hover
- WebGPU for large rings

### SheafExplorer
- Topological space visualization
- Sections over opens
- Restriction maps animate
- Sheafification process

### FunctorAnimator
- Side-by-side categories
- Morphism mapping animated
- Functoriality checks
- Natural transformations

### ToposNavigator
- 3D exploration
- Subobject classifier highlighted
- Internal logic
- Geometric morphisms as portals

---

**Remember**: These visualizations are how students will *see* abstract mathematics. Make them worthy of the beauty of the mathematics itself.
