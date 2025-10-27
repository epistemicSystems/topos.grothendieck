/**
 * FunctorExplorer - Gallery of Concrete Functors
 *
 * Interactive exploration of 5+ functors:
 * - Forgetful (Grp → Set)
 * - Free (Set → Grp)
 * - PowerSet (Set → Set)
 * - Opposite (𝒞 → 𝒞^op)
 * - Hom (covariant and contravariant)
 *
 * Students click to explore each functor's object and morphism mappings.
 */

import { useState, useMemo } from 'react';
import { Category, Functor, CategoryDiagram, ConceptCard } from '@grothendieck/core';

// ============================================================================
// Types
// ============================================================================

interface FunctorExample {
  id: string;
  name: string;
  description: string;
  sourceCategory: {
    name: string;
    objects: Array<{ id: string; label: string; definition: string }>;
    morphisms: Array<{ id: string; from: string; to: string; label: string }>;
  };
  targetCategory: {
    name: string;
    objects: Array<{ id: string; label: string; definition: string }>;
    morphisms: Array<{ id: string; from: string; to: string; label: string }>;
  };
  objectMap: Record<string, string>; // source obj id -> target obj id
  morphismMap: Record<string, string>; // source mor id -> target mor id
  isContravariant: boolean;
  examples: string[];
  intuition: string;
}

// ============================================================================
// Example Functors
// ============================================================================

const FUNCTOR_EXAMPLES: Record<string, FunctorExample> = {
  forgetful: {
    id: 'forgetful',
    name: 'Forgetful Functor',
    description: 'U: Grp → Set - Forgets group structure, keeps underlying set',
    sourceCategory: {
      name: 'Grp',
      objects: [
        { id: 'Z', label: 'ℤ', definition: 'Integers under addition' },
        { id: 'Z2', label: 'ℤ/2ℤ', definition: 'Cyclic group of order 2' },
        { id: 'S3', label: 'S₃', definition: 'Symmetric group on 3 elements' },
      ],
      morphisms: [
        { id: 'f', from: 'Z', to: 'Z2', label: 'π' },
        { id: 'g', from: 'Z2', to: 'S3', label: 'ι' },
      ],
    },
    targetCategory: {
      name: 'Set',
      objects: [
        { id: 'UZ', label: 'U(ℤ)', definition: 'Set {…, -2, -1, 0, 1, 2, …}' },
        { id: 'UZ2', label: 'U(ℤ/2ℤ)', definition: 'Set {0, 1}' },
        { id: 'US3', label: 'U(S₃)', definition: 'Set of 6 permutations' },
      ],
      morphisms: [
        { id: 'Uf', from: 'UZ', to: 'UZ2', label: 'U(π)' },
        { id: 'Ug', from: 'UZ2', to: 'US3', label: 'U(ι)' },
      ],
    },
    objectMap: { Z: 'UZ', Z2: 'UZ2', S3: 'US3' },
    morphismMap: { f: 'Uf', g: 'Ug' },
    isContravariant: false,
    examples: [
      'U(ℤ) = {…, -1, 0, 1, 2, …} as a set',
      'U(φ: G → H) = φ as a function',
      'Group operation is "forgotten"',
    ],
    intuition: 'Strips away structure, keeping only the underlying carrier set.',
  },

  free: {
    id: 'free',
    name: 'Free Functor',
    description: 'F: Set → Grp - Constructs free group from a set',
    sourceCategory: {
      name: 'Set',
      objects: [
        { id: 'X', label: 'X', definition: 'Set {a, b}' },
        { id: 'Y', label: 'Y', definition: 'Set {x, y, z}' },
      ],
      morphisms: [
        { id: 'f', from: 'X', to: 'Y', label: 'f' },
      ],
    },
    targetCategory: {
      name: 'Grp',
      objects: [
        { id: 'FX', label: 'F(X)', definition: 'Free group on {a, b}' },
        { id: 'FY', label: 'F(Y)', definition: 'Free group on {x, y, z}' },
      ],
      morphisms: [
        { id: 'Ff', from: 'FX', to: 'FY', label: 'F(f)' },
      ],
    },
    objectMap: { X: 'FX', Y: 'FY' },
    morphismMap: { f: 'Ff' },
    isContravariant: false,
    examples: [
      'F({a, b}) = words in a, b, a⁻¹, b⁻¹',
      'F(f: X → Y) extends f to a homomorphism',
      'F preserves no equations except group laws',
    ],
    intuition: 'Adds minimal group structure to a set with no extra relations.',
  },

  powerSet: {
    id: 'powerSet',
    name: 'Power Set Functor',
    description: '𝒫: Set → Set - Maps set to its power set',
    sourceCategory: {
      name: 'Set',
      objects: [
        { id: 'A', label: 'A', definition: 'Set {1, 2}' },
        { id: 'B', label: 'B', definition: 'Set {x, y, z}' },
      ],
      morphisms: [
        { id: 'f', from: 'A', to: 'B', label: 'f' },
      ],
    },
    targetCategory: {
      name: 'Set',
      objects: [
        { id: 'PA', label: '𝒫(A)', definition: 'Power set {∅, {1}, {2}, {1,2}}' },
        { id: 'PB', label: '𝒫(B)', definition: 'Power set of B (8 subsets)' },
      ],
      morphisms: [
        { id: 'Pf', from: 'PA', to: 'PB', label: '𝒫(f)' },
      ],
    },
    objectMap: { A: 'PA', B: 'PB' },
    morphismMap: { f: 'Pf' },
    isContravariant: false,
    examples: [
      '𝒫({1, 2}) = {∅, {1}, {2}, {1, 2}}',
      '𝒫(f)(A) = {f(a) | a ∈ A} (direct image)',
      '|𝒫(X)| = 2^|X|',
    ],
    intuition: 'Maps each set to all its subsets, functions to direct images.',
  },

  opposite: {
    id: 'opposite',
    name: 'Opposite Functor',
    description: 'op: 𝒞 → 𝒞^op - Reverses all morphisms',
    sourceCategory: {
      name: '𝒞',
      objects: [
        { id: 'A', label: 'A', definition: 'Object A' },
        { id: 'B', label: 'B', definition: 'Object B' },
        { id: 'C', label: 'C', definition: 'Object C' },
      ],
      morphisms: [
        { id: 'f', from: 'A', to: 'B', label: 'f' },
        { id: 'g', from: 'B', to: 'C', label: 'g' },
      ],
    },
    targetCategory: {
      name: '𝒞^op',
      objects: [
        { id: 'Aop', label: 'A', definition: 'Same object A' },
        { id: 'Bop', label: 'B', definition: 'Same object B' },
        { id: 'Cop', label: 'C', definition: 'Same object C' },
      ],
      morphisms: [
        { id: 'fop', from: 'Bop', to: 'Aop', label: 'f^op' },
        { id: 'gop', from: 'Cop', to: 'Bop', label: 'g^op' },
      ],
    },
    objectMap: { A: 'Aop', B: 'Bop', C: 'Cop' },
    morphismMap: { f: 'fop', g: 'gop' },
    isContravariant: true,
    examples: [
      'Objects unchanged: op(A) = A',
      'Morphisms reversed: op(f: A → B) = f^op: B → A',
      'Composition reversed: op(g ∘ f) = op(f) ∘ op(g)',
    ],
    intuition: 'Keeps objects, flips all arrows. Used to define contravariant concepts.',
  },

  hom: {
    id: 'hom',
    name: 'Hom Functor',
    description: 'Hom(A, -): 𝒞 → Set - Morphisms from fixed object A',
    sourceCategory: {
      name: '𝒞',
      objects: [
        { id: 'B', label: 'B', definition: 'Object B' },
        { id: 'C', label: 'C', definition: 'Object C' },
      ],
      morphisms: [
        { id: 'g', from: 'B', to: 'C', label: 'g' },
      ],
    },
    targetCategory: {
      name: 'Set',
      objects: [
        { id: 'HAB', label: 'Hom(A,B)', definition: 'Set of morphisms A → B' },
        { id: 'HAC', label: 'Hom(A,C)', definition: 'Set of morphisms A → C' },
      ],
      morphisms: [
        { id: 'Hg', from: 'HAB', to: 'HAC', label: 'Hom(A,g)' },
      ],
    },
    objectMap: { B: 'HAB', C: 'HAC' },
    morphismMap: { g: 'Hg' },
    isContravariant: false,
    examples: [
      'Hom(A, B) = {f: A → B}',
      'Hom(A, g)(f) = g ∘ f (post-composition)',
      'Contravariant variant: Hom(-, B) pre-composes',
    ],
    intuition: 'Represents "views from A" - all ways to map out of A.',
  },
};

// ============================================================================
// Component
// ============================================================================

export function FunctorExplorer() {
  const [selectedFunctor, setSelectedFunctor] = useState<string | null>('forgetful');
  const [highlightedObject, setHighlightedObject] = useState<string | null>(null);
  const [highlightedMorphism, setHighlightedMorphism] = useState<string | null>(null);

  const currentFunctor = useMemo(
    () => (selectedFunctor ? FUNCTOR_EXAMPLES[selectedFunctor] : null),
    [selectedFunctor]
  );

  // Build Category and Functor instances for validation
  const { sourceCategory, targetCategory, functor } = useMemo(() => {
    if (!currentFunctor) return { sourceCategory: null, targetCategory: null, functor: null };

    const source = new Category(
      currentFunctor.sourceCategory.name,
      currentFunctor.sourceCategory.objects,
      currentFunctor.sourceCategory.morphisms.map((m) => ({
        id: m.id,
        source: m.from,
        target: m.to,
        label: m.label,
      }))
    );

    const target = new Category(
      currentFunctor.targetCategory.name,
      currentFunctor.targetCategory.objects,
      currentFunctor.targetCategory.morphisms.map((m) => ({
        id: m.id,
        source: m.from,
        target: m.to,
        label: m.label,
      }))
    );

    const func = new Functor(
      `${currentFunctor.name}`,
      source,
      target,
      currentFunctor.objectMap,
      currentFunctor.morphismMap
    );

    return { sourceCategory: source, targetCategory: target, functor: func };
  }, [currentFunctor]);

  // Verify functor axioms
  const validation = useMemo(() => {
    if (!functor) return null;
    return functor.verify();
  }, [functor]);

  const handleObjectHover = (objId: string | null) => {
    setHighlightedObject(objId);
    if (objId && currentFunctor) {
      // Highlight mapped object in target
      const mapped = currentFunctor.objectMap[objId];
      if (mapped) {
        setHighlightedObject(mapped);
      }
    } else {
      setHighlightedObject(null);
    }
  };

  const handleMorphismClick = (morId: string) => {
    setHighlightedMorphism(morId);
  };

  return (
    <div className="functor-explorer">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Functor Explorer
        </h3>
        <p className="text-gray-700">
          Explore concrete functors! Each functor maps objects to objects and morphisms to
          morphisms while preserving structure. Click a functor to see how it works.
        </p>
      </div>

      {/* Functor Selection */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {Object.values(FUNCTOR_EXAMPLES).map((func) => (
          <button
            key={func.id}
            onClick={() => setSelectedFunctor(func.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedFunctor === func.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-semibold text-gray-900 mb-1">{func.name}</div>
            <div className="text-xs text-gray-600">
              {func.sourceCategory.name} → {func.targetCategory.name}
            </div>
            {func.isContravariant && (
              <div className="mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                Contravariant
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Functor Visualization */}
      {currentFunctor && (
        <div className="space-y-6">
          {/* Description */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h4 className="text-lg font-bold text-blue-900 mb-2">{currentFunctor.name}</h4>
            <p className="text-blue-800 mb-3">{currentFunctor.description}</p>
            <p className="text-sm text-blue-700 italic">{currentFunctor.intuition}</p>
          </div>

          {/* Side-by-Side Diagrams */}
          <div className="grid grid-cols-2 gap-6">
            {/* Source Category */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">
                Source: {currentFunctor.sourceCategory.name}
              </h4>
              <CategoryDiagram
                objects={currentFunctor.sourceCategory.objects}
                morphisms={currentFunctor.sourceCategory.morphisms.map((m) => ({
                  id: m.id,
                  from: m.from,
                  to: m.to,
                  label: m.label,
                }))}
                width={350}
                height={300}
                onObjectClick={(id) => handleObjectHover(id)}
                onMorphismClick={handleMorphismClick}
                highlightPath={highlightedMorphism ? [highlightedMorphism] : []}
              />
            </div>

            {/* Target Category */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">
                Target: {currentFunctor.targetCategory.name}
              </h4>
              <CategoryDiagram
                objects={currentFunctor.targetCategory.objects}
                morphisms={currentFunctor.targetCategory.morphisms.map((m) => ({
                  id: m.id,
                  from: m.from,
                  to: m.to,
                  label: m.label,
                  style: currentFunctor.isContravariant ? 'dotted' : 'solid',
                }))}
                width={350}
                height={300}
                onObjectClick={(id) => handleObjectHover(id)}
                onMorphismClick={handleMorphismClick}
                highlightPath={
                  highlightedMorphism && currentFunctor.morphismMap[highlightedMorphism]
                    ? [currentFunctor.morphismMap[highlightedMorphism]]
                    : []
                }
              />
            </div>
          </div>

          {/* Mapping Tables */}
          <div className="grid grid-cols-2 gap-6">
            {/* Object Map */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Object Map</h4>
              <div className="space-y-2">
                {Object.entries(currentFunctor.objectMap).map(([src, tgt]) => {
                  const srcObj = currentFunctor.sourceCategory.objects.find((o) => o.id === src);
                  const tgtObj = currentFunctor.targetCategory.objects.find((o) => o.id === tgt);
                  return (
                    <div
                      key={src}
                      className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded"
                    >
                      <span className="font-mono text-blue-600">{srcObj?.label || src}</span>
                      <span className="text-gray-400">↦</span>
                      <span className="font-mono text-green-600">{tgtObj?.label || tgt}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Morphism Map */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Morphism Map</h4>
              <div className="space-y-2">
                {Object.entries(currentFunctor.morphismMap).map(([src, tgt]) => {
                  const srcMor = currentFunctor.sourceCategory.morphisms.find(
                    (m) => m.id === src
                  );
                  const tgtMor = currentFunctor.targetCategory.morphisms.find(
                    (m) => m.id === tgt
                  );
                  return (
                    <div
                      key={src}
                      className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded"
                    >
                      <span className="font-mono text-blue-600">{srcMor?.label || src}</span>
                      <span className="text-gray-400">↦</span>
                      <span className="font-mono text-green-600">{tgtMor?.label || tgt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Examples */}
          <ConceptCard
            term="Concrete Examples"
            shortDefinition="See how this functor works in practice"
            examples={currentFunctor.examples}
            colorScheme="green"
          />

          {/* Validation */}
          {validation && (
            <div
              className={`border-2 rounded-lg p-4 ${
                validation.valid
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
              }`}
            >
              <h4 className="text-sm font-semibold mb-2">
                {validation.valid ? '✓ Valid Functor' : '✗ Invalid (should not happen!)'}
              </h4>
              {validation.errors.length > 0 && (
                <ul className="text-sm text-red-600 space-y-1">
                  {validation.errors.map((error, i) => (
                    <li key={i}>• {error}</li>
                  ))}
                </ul>
              )}
              {validation.valid && (
                <p className="text-sm text-green-700">
                  Preserves composition and identities as required!
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Pattern Recognition */}
      <div className="mt-8 bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
        <h4 className="text-lg font-bold text-purple-900 mb-3">
          What Do All Functors Have in Common?
        </h4>
        <ul className="text-sm text-purple-800 space-y-2">
          <li>
            ✓ <strong>Map objects to objects:</strong> F(A) is an object in the target category
          </li>
          <li>
            ✓ <strong>Map morphisms to morphisms:</strong> F(f: A → B) is a morphism F(A) → F(B)
          </li>
          <li>
            ✓ <strong>Preserve composition:</strong> F(g ∘ f) = F(g) ∘ F(f)
          </li>
          <li>
            ✓ <strong>Preserve identities:</strong> F(id_A) = id_{F(A)}
          </li>
          <li className="pt-2 border-t-2 border-purple-200">
            → These four properties define what it means to be a <strong>functor</strong>!
          </li>
        </ul>
      </div>
    </div>
  );
}
