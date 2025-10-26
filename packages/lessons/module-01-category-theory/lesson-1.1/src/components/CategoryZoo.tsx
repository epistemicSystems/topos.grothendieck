/**
 * CategoryZoo - Gallery of Familiar Categories
 *
 * Displays common mathematical categories that students already know:
 * Set, Grp, Ring, Top, Vect
 *
 * Students can click each to explore examples and see the pattern.
 */

import { useState } from 'react';
import { CategoryDiagram, ConceptCard } from '@grothendieck/core';

// ============================================================================
// Category Examples
// ============================================================================

const CATEGORIES = {
  Set: {
    name: 'Set',
    description: 'Category of sets and functions',
    color: 'blue',
    objects: [
      { id: 'A', label: 'A', definition: 'Set A = {1, 2, 3}' },
      { id: 'B', label: 'B', definition: 'Set B = {a, b}' },
      { id: 'C', label: 'C', definition: 'Set C = {x, y, z}' },
    ],
    morphisms: [
      { id: 'f', from: 'A', to: 'B', label: 'f', definition: 'Function f: A → B' },
      { id: 'g', from: 'B', to: 'C', label: 'g', definition: 'Function g: B → C' },
      { id: 'h', from: 'A', to: 'C', label: 'h', definition: 'Composite h = g ∘ f' },
    ],
    explanation: 'Objects are sets, morphisms are functions between sets. This is the most familiar category!',
    examples: [
      'id_A(a) = a for all a ∈ A',
      'Composition: (g ∘ f)(x) = g(f(x))',
      'Function composition is associative',
    ],
  },
  Grp: {
    name: 'Grp',
    description: 'Category of groups and homomorphisms',
    color: 'green',
    objects: [
      { id: 'Z', label: 'ℤ', definition: 'Integers under addition' },
      { id: 'Z2', label: 'ℤ/2ℤ', definition: 'Integers mod 2' },
      { id: 'S3', label: 'S₃', definition: 'Symmetric group on 3 elements' },
    ],
    morphisms: [
      { id: 'phi', from: 'Z', to: 'Z2', label: 'φ', definition: 'Quotient map φ(n) = n mod 2' },
      { id: 'psi', from: 'Z', to: 'S3', label: 'ψ', definition: 'Group homomorphism' },
    ],
    explanation: 'Objects are groups, morphisms are group homomorphisms that preserve the group structure.',
    examples: [
      'φ(a + b) = φ(a) + φ(b) (preserves addition)',
      'φ(0) = 0 (preserves identity)',
      'Composition of homomorphisms is a homomorphism',
    ],
  },
  Ring: {
    name: 'Ring',
    description: 'Category of rings and ring homomorphisms',
    color: 'purple',
    objects: [
      { id: 'Z', label: 'ℤ', definition: 'Ring of integers' },
      { id: 'Q', label: 'ℚ', definition: 'Field of rationals' },
      { id: 'R', label: 'ℝ', definition: 'Field of reals' },
    ],
    morphisms: [
      { id: 'incl1', from: 'Z', to: 'Q', label: 'ι', definition: 'Inclusion ℤ ↪ ℚ' },
      { id: 'incl2', from: 'Q', to: 'R', label: 'ι', definition: 'Inclusion ℚ ↪ ℝ' },
    ],
    explanation: 'Objects are rings, morphisms are ring homomorphisms preserving addition and multiplication.',
    examples: [
      'φ(a + b) = φ(a) + φ(b)',
      'φ(a · b) = φ(a) · φ(b)',
      'φ(1) = 1',
    ],
  },
  Top: {
    name: 'Top',
    description: 'Category of topological spaces and continuous maps',
    color: 'amber',
    objects: [
      { id: 'R', label: 'ℝ', definition: 'Real line with standard topology' },
      { id: 'S1', label: 'S¹', definition: 'Circle' },
      { id: 'D2', label: 'D²', definition: '2-dimensional disk' },
    ],
    morphisms: [
      { id: 'incl', from: 'S1', to: 'D2', label: 'ι', definition: 'Boundary inclusion S¹ ↪ D²' },
      { id: 'proj', from: 'R', to: 'S1', label: 'π', definition: 'Exponential map ℝ → S¹' },
    ],
    explanation: 'Objects are topological spaces, morphisms are continuous functions.',
    examples: [
      'f is continuous if f⁻¹(open) is open',
      'Composition of continuous maps is continuous',
      'Identity function is continuous',
    ],
  },
  Vect: {
    name: 'Vect_k',
    description: 'Category of vector spaces and linear maps',
    color: 'blue',
    objects: [
      { id: 'k', label: 'k', definition: 'Base field k' },
      { id: 'k2', label: 'k²', definition: '2-dimensional space' },
      { id: 'k3', label: 'k³', definition: '3-dimensional space' },
    ],
    morphisms: [
      { id: 'proj', from: 'k3', to: 'k2', label: 'π', definition: 'Projection π(x,y,z) = (x,y)' },
      { id: 'incl', from: 'k', to: 'k2', label: 'ι', definition: 'Inclusion ι(x) = (x,0)' },
    ],
    explanation: 'Objects are vector spaces, morphisms are linear transformations.',
    examples: [
      'T(v + w) = T(v) + T(w)',
      'T(αv) = αT(v)',
      'Composition of linear maps is linear',
    ],
  },
};

// ============================================================================
// Component
// ============================================================================

export function CategoryZoo() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Set');

  const selected = selectedCategory ? CATEGORIES[selectedCategory as keyof typeof CATEGORIES] : null;

  return (
    <div className="category-zoo">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          The Category Zoo
        </h3>
        <p className="text-gray-700">
          You already know these categories! Click each one to explore examples.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedCategory === key
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="text-2xl font-bold text-gray-900 mb-1">{cat.name}</div>
            <div className="text-xs text-gray-600">{cat.description}</div>
          </button>
        ))}
      </div>

      {/* Selected Category Details */}
      {selected && (
        <div className="grid grid-cols-2 gap-8 animate-fadeIn">
          {/* Left: Diagram */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Category Structure
            </h4>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <CategoryDiagram
                objects={selected.objects}
                morphisms={selected.morphisms}
                width={400}
                height={300}
                colorScheme="default"
                animated={true}
              />
            </div>
          </div>

          {/* Right: Explanation */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              What Makes This a Category?
            </h4>
            <ConceptCard
              term={selected.name}
              shortDefinition={selected.description}
              fullDefinition={selected.explanation}
              examples={selected.examples}
              defaultExpanded={true}
              colorScheme={selected.color as any}
            />
          </div>
        </div>
      )}

      {/* Pattern Recognition */}
      <div className="mt-8 p-6 bg-amber-50 border-2 border-amber-200 rounded-lg">
        <h4 className="text-lg font-bold text-amber-900 mb-2">
          🔍 Spot the Pattern
        </h4>
        <p className="text-amber-800">
          Every category has the same structure: <strong>objects</strong> and{' '}
          <strong>morphisms</strong> that compose. The details differ, but the pattern is
          universal!
        </p>
      </div>
    </div>
  );
}
