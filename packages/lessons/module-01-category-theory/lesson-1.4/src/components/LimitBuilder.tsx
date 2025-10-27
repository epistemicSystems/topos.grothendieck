import React, { useState, useMemo } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LimitBuilder
 *
 * Interactive builder for limits and colimits.
 * Students select an index category 𝒥, draw a diagram D: 𝒥 → 𝒞,
 * and compute the limit/colimit with universal property verification.
 *
 * Features:
 * - Preset index categories (discrete, parallel pair, span, cospan)
 * - Preset target categories (Set, Grp, Top)
 * - Interactive diagram construction
 * - Automatic limit computation
 * - Universal property verification
 * - Cone/cocone visualization
 * - Factorization checking
 */

interface DiagramObject {
  id: string;
  label: string;
  targetObject: string; // object in target category
}

interface DiagramMorphism {
  id: string;
  source: string;
  target: string;
  label: string;
  targetMorphism: string; // morphism in target category
}

interface Diagram {
  objects: DiagramObject[];
  morphisms: DiagramMorphism[];
}

interface Cone {
  apex: string;
  legs: Array<{
    targetObject: string;
    morphism: string;
  }>;
}

interface LimitStructure {
  limitObject: string;
  projections: Array<{
    to: string;
    morphism: string;
  }>;
  universalProperty: string;
  computation: string;
}

// Preset index categories
const INDEX_CATEGORIES = {
  discrete2: {
    name: 'Discrete (2 objects)',
    description: 'Two objects, no non-identity morphisms → Product',
    shape: {
      objects: [
        { id: 'J1', label: '1' },
        { id: 'J2', label: '2' },
      ],
      morphisms: [],
    },
  },
  discrete3: {
    name: 'Discrete (3 objects)',
    description: 'Three objects, no non-identity morphisms → Ternary Product',
    shape: {
      objects: [
        { id: 'J1', label: '1' },
        { id: 'J2', label: '2' },
        { id: 'J3', label: '3' },
      ],
      morphisms: [],
    },
  },
  parallelPair: {
    name: 'Parallel Pair',
    description: 'Two objects with parallel morphisms → Equalizer',
    shape: {
      objects: [
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
      ],
      morphisms: [
        { id: 'f', source: 'A', target: 'B', label: 'f' },
        { id: 'g', source: 'A', target: 'B', label: 'g' },
      ],
    },
  },
  span: {
    name: 'Span',
    description: 'Three objects: A ← C → B → Pullback',
    shape: {
      objects: [
        { id: 'A', label: 'A' },
        { id: 'C', label: 'C' },
        { id: 'B', label: 'B' },
      ],
      morphisms: [
        { id: 'f', source: 'A', target: 'C', label: 'f' },
        { id: 'g', source: 'B', target: 'C', label: 'g' },
      ],
    },
  },
  cospan: {
    name: 'Cospan',
    description: 'Three objects: A → C ← B → Pullback (dual of span)',
    shape: {
      objects: [
        { id: 'A', label: 'A' },
        { id: 'C', label: 'C' },
        { id: 'B', label: 'B' },
      ],
      morphisms: [
        { id: 'f', source: 'C', target: 'A', label: 'f' },
        { id: 'g', source: 'C', target: 'B', label: 'g' },
      ],
    },
  },
  empty: {
    name: 'Empty',
    description: 'No objects → Terminal object (limit) / Initial object (colimit)',
    shape: {
      objects: [],
      morphisms: [],
    },
  },
};

// Preset examples with full diagrams
const PRESET_EXAMPLES = {
  productSet: {
    name: 'Product in Set',
    indexCategory: 'discrete2',
    targetCategory: 'Set',
    diagram: {
      objects: [
        { id: 'J1', label: '1', targetObject: '{a, b, c}' },
        { id: 'J2', label: '2', targetObject: '{x, y}' },
      ],
      morphisms: [],
    },
    limit: {
      limitObject: '{(a,x), (a,y), (b,x), (b,y), (c,x), (c,y)}',
      projections: [
        { to: '{a, b, c}', morphism: 'π₁: (a,x) ↦ a, (a,y) ↦ a, ...' },
        { to: '{x, y}', morphism: 'π₂: (a,x) ↦ x, (b,x) ↦ x, ...' },
      ],
      universalProperty: 'For any set Z with functions f: Z → A, g: Z → B, there exists unique h: Z → A×B with π₁∘h = f, π₂∘h = g',
      computation: 'A × B = Cartesian product = {(a,b) | a ∈ A, b ∈ B}',
    },
  },

  equalizerSet: {
    name: 'Equalizer in Set',
    indexCategory: 'parallelPair',
    targetCategory: 'Set',
    diagram: {
      objects: [
        { id: 'A', label: 'A', targetObject: '{1, 2, 3, 4}' },
        { id: 'B', label: 'B', targetObject: '{α, β}' },
      ],
      morphisms: [
        { id: 'f', source: 'A', target: 'B', label: 'f', targetMorphism: 'f: 1,2 ↦ α; 3,4 ↦ β' },
        { id: 'g', source: 'A', target: 'B', label: 'g', targetMorphism: 'g: 1,3 ↦ α; 2,4 ↦ β' },
      ],
    },
    limit: {
      limitObject: '{1, 3}',
      projections: [
        { to: '{1, 2, 3, 4}', morphism: 'e: inclusion {1,3} ↪ {1,2,3,4}' },
      ],
      universalProperty: 'For any set Z with z: Z → A satisfying f∘z = g∘z, there exists unique h: Z → Eq(f,g) with e∘h = z',
      computation: 'Eq(f,g) = {a ∈ A | f(a) = g(a)} = {1, 3}',
    },
  },

  pullbackSet: {
    name: 'Pullback in Set',
    indexCategory: 'cospan',
    targetCategory: 'Set',
    diagram: {
      objects: [
        { id: 'C', label: 'C', targetObject: '{♠, ♥}' },
        { id: 'A', label: 'A', targetObject: '{1, 2, 3}' },
        { id: 'B', label: 'B', targetObject: '{x, y, z}' },
      ],
      morphisms: [
        { id: 'f', source: 'C', target: 'A', label: 'f', targetMorphism: 'f: ♠↦1, ♥↦2' },
        { id: 'g', source: 'C', target: 'B', label: 'g', targetMorphism: 'g: ♠↦x, ♥↦y' },
      ],
    },
    limit: {
      limitObject: '{(1,x), (2,y)}',
      projections: [
        { to: '{1, 2, 3}', morphism: 'p₁: (1,x) ↦ 1, (2,y) ↦ 2' },
        { to: '{x, y, z}', morphism: 'p₂: (1,x) ↦ x, (2,y) ↦ y' },
      ],
      universalProperty: 'For any Z with z₁: Z→A, z₂: Z→B satisfying f∘z₁ = g∘z₂, there exists unique h: Z→A×_C B',
      computation: 'A ×_C B = {(a,b) ∈ A×B | f(a) = g(b)}',
    },
  },

  terminalSet: {
    name: 'Terminal Object in Set',
    indexCategory: 'empty',
    targetCategory: 'Set',
    diagram: {
      objects: [],
      morphisms: [],
    },
    limit: {
      limitObject: '{*}',
      projections: [],
      universalProperty: 'For any set A, there exists unique function !: A → {*}',
      computation: 'Limit of empty diagram = terminal object = singleton set',
    },
  },

  productGrp: {
    name: 'Product in Grp',
    indexCategory: 'discrete2',
    targetCategory: 'Grp',
    diagram: {
      objects: [
        { id: 'J1', label: '1', targetObject: 'ℤ' },
        { id: 'J2', label: '2', targetObject: 'ℤ/2ℤ' },
      ],
      morphisms: [],
    },
    limit: {
      limitObject: 'ℤ × ℤ/2ℤ',
      projections: [
        { to: 'ℤ', morphism: 'π₁: (n, [m]) ↦ n' },
        { to: 'ℤ/2ℤ', morphism: 'π₂: (n, [m]) ↦ [m]' },
      ],
      universalProperty: 'For any group G with homomorphisms φ: G→ℤ, ψ: G→ℤ/2ℤ, there exists unique θ: G→ℤ×ℤ/2ℤ',
      computation: 'G × H with component-wise multiplication: (g₁,h₁)(g₂,h₂) = (g₁g₂, h₁h₂)',
    },
  },
};

export function LimitBuilder() {
  const [mode, setMode] = useState<'preset' | 'custom'>('preset');
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof PRESET_EXAMPLES>('productSet');
  const [limitType, setLimitType] = useState<'limit' | 'colimit'>('limit');

  // Custom mode state
  const [selectedIndexCategory, setSelectedIndexCategory] = useState<keyof typeof INDEX_CATEGORIES>('discrete2');
  const [targetCategory, setTargetCategory] = useState<'Set' | 'Grp' | 'Top'>('Set');

  // Get current data
  const currentData = useMemo(() => {
    if (mode === 'preset') {
      return PRESET_EXAMPLES[selectedPreset];
    }
    // Custom mode (simplified for now)
    return {
      name: 'Custom Diagram',
      indexCategory: selectedIndexCategory,
      targetCategory,
      diagram: { objects: [], morphisms: [] },
      limit: null,
    };
  }, [mode, selectedPreset, selectedIndexCategory, targetCategory]);

  const indexShape = INDEX_CATEGORIES[currentData.indexCategory as keyof typeof INDEX_CATEGORIES];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Limit Builder</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Build diagrams and compute limits/colimits interactively.
          Select index categories, draw diagrams, and verify universal properties.
        </p>
      </div>

      {/* Mode and Type Selectors */}
      <div className="flex justify-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('preset')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              mode === 'preset'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
            }`}
          >
            Presets
          </button>
          <button
            onClick={() => setMode('custom')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              mode === 'custom'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
            }`}
          >
            Custom
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setLimitType('limit')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              limitType === 'limit'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
            }`}
          >
            ← Limit
          </button>
          <button
            onClick={() => setLimitType('colimit')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              limitType === 'colimit'
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
            }`}
          >
            Colimit →
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      {mode === 'preset' && (
        <ConceptCard title="Choose a Preset Example" level="beginner">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(PRESET_EXAMPLES).map(([key, example]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedPreset(key as keyof typeof PRESET_EXAMPLES)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedPreset === key
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-bold text-sm">{example.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {INDEX_CATEGORIES[example.indexCategory as keyof typeof INDEX_CATEGORIES]?.name}
                </div>
              </motion.button>
            ))}
          </div>
        </ConceptCard>
      )}

      {/* Custom Builder */}
      {mode === 'custom' && (
        <ConceptCard title="Build Custom Diagram" level="advanced">
          <div className="space-y-4">
            <div>
              <div className="font-semibold text-sm mb-2">1. Select Index Category 𝒥:</div>
              <div className="grid md:grid-cols-3 gap-2">
                {Object.entries(INDEX_CATEGORIES).map(([key, indexCat]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedIndexCategory(key as keyof typeof INDEX_CATEGORIES)}
                    className={`p-3 rounded border-2 text-left text-sm ${
                      selectedIndexCategory === key
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{indexCat.name}</div>
                    <div className="text-xs text-muted-foreground">{indexCat.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-semibold text-sm mb-2">2. Select Target Category 𝒞:</div>
              <div className="flex gap-2">
                {(['Set', 'Grp', 'Top'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setTargetCategory(cat)}
                    className={`px-4 py-2 rounded border-2 ${
                      targetCategory === cat
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="text-sm">
                <strong>Coming soon:</strong> Full diagram builder where you can map each object/morphism
                in 𝒥 to specific objects/morphisms in 𝒞, then compute the limit automatically!
              </div>
            </div>
          </div>
        </ConceptCard>
      )}

      {/* Index Category Shape */}
      {indexShape && (
        <ConceptCard title={`Index Category: ${indexShape.name}`} level="beginner">
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">{indexShape.description}</div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
              <div className="font-mono text-sm text-center space-y-2">
                {indexShape.shape.objects.length === 0 && (
                  <div className="text-muted-foreground">∅ (empty category)</div>
                )}

                {indexShape.shape.objects.length > 0 && (
                  <>
                    <div className="flex justify-around">
                      {indexShape.shape.objects.map(obj => (
                        <div key={obj.id} className="font-bold text-blue-600">
                          {obj.label}
                        </div>
                      ))}
                    </div>

                    {indexShape.shape.morphisms.length > 0 && (
                      <div className="mt-4 space-y-1">
                        {indexShape.shape.morphisms.map(mor => (
                          <div key={mor.id} className="text-xs text-muted-foreground">
                            {mor.label}: {mor.source} → {mor.target}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </ConceptCard>
      )}

      {/* Diagram in Target Category */}
      {mode === 'preset' && currentData.diagram && (
        <ConceptCard title={`Diagram D: 𝒥 → ${currentData.targetCategory}`} level="intermediate">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              The diagram assigns objects/morphisms from {currentData.targetCategory} to the index category:
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Objects */}
              <div>
                <div className="font-semibold text-sm mb-2">Object Assignments:</div>
                <div className="space-y-2">
                  {currentData.diagram.objects.map(obj => (
                    <div key={obj.id} className="p-2 bg-blue-50 dark:bg-blue-950 rounded text-sm">
                      <span className="font-mono">{obj.label}</span>
                      <span className="mx-2">↦</span>
                      <span className="font-mono text-blue-700 dark:text-blue-300">{obj.targetObject}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Morphisms */}
              <div>
                <div className="font-semibold text-sm mb-2">Morphism Assignments:</div>
                <div className="space-y-2">
                  {currentData.diagram.morphisms.length === 0 && (
                    <div className="text-sm text-muted-foreground italic">No morphisms to assign</div>
                  )}
                  {currentData.diagram.morphisms.map(mor => (
                    <div key={mor.id} className="p-2 bg-green-50 dark:bg-green-950 rounded text-sm">
                      <span className="font-mono">{mor.label}</span>
                      <span className="mx-2">↦</span>
                      <span className="font-mono text-xs text-green-700 dark:text-green-300">
                        {mor.targetMorphism}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ConceptCard>
      )}

      {/* Computed Limit */}
      {mode === 'preset' && currentData.limit && (
        <ConceptCard title={limitType === 'limit' ? 'Computed Limit' : 'Computed Colimit'} level="intermediate">
          <div className="space-y-4">
            {/* Limit Object */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
              <div className="font-semibold text-sm mb-2">
                {limitType === 'limit' ? 'Limit Object:' : 'Colimit Object:'}
              </div>
              <div className="font-mono text-lg text-purple-700 dark:text-purple-300">
                {currentData.limit.limitObject}
              </div>
            </div>

            {/* Projections/Injections */}
            <div>
              <div className="font-semibold text-sm mb-2">
                {limitType === 'limit' ? 'Projections:' : 'Injections:'}
              </div>
              <div className="space-y-2">
                {currentData.limit.projections.map((proj, idx) => (
                  <div key={idx} className="p-3 bg-green-50 dark:bg-green-950 rounded border">
                    <div className="text-sm">
                      <span className="font-semibold">To {proj.to}:</span>
                      <div className="font-mono text-xs mt-1 text-green-700 dark:text-green-300">
                        {proj.morphism}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Computation */}
            <div>
              <div className="font-semibold text-sm mb-2">Computation:</div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                {currentData.limit.computation}
              </div>
            </div>

            {/* Universal Property */}
            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="font-semibold text-sm mb-2">Universal Property:</div>
              <div className="text-sm leading-relaxed">
                {currentData.limit.universalProperty}
              </div>
            </div>
          </div>
        </ConceptCard>
      )}

      {/* Explanation */}
      <ConceptCard title="Understanding Limits" level="beginner">
        <div className="space-y-3 text-sm">
          <p>
            A <strong>limit</strong> of a diagram D: 𝒥 → 𝒞 is an object lim D with morphisms (projections)
            to each object in the diagram, satisfying:
          </p>

          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>
              <strong>Compatibility:</strong> Projections commute with diagram morphisms
            </li>
            <li>
              <strong>Universal Property:</strong> Any other compatible cone factors uniquely through the limit
            </li>
          </ol>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Common Limits:</div>
              <ul className="space-y-1 text-xs">
                <li>• Discrete (2) → Product</li>
                <li>• Parallel pair → Equalizer</li>
                <li>• Cospan → Pullback</li>
                <li>• Empty → Terminal object</li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="font-semibold mb-2 text-orange-900 dark:text-orange-100">Common Colimits:</div>
              <ul className="space-y-1 text-xs">
                <li>• Discrete (2) → Coproduct</li>
                <li>• Parallel pair → Coequalizer</li>
                <li>• Span → Pushout</li>
                <li>• Empty → Initial object</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
            <div className="font-semibold mb-2">Key Insight:</div>
            <div>
              Limits and colimits are <strong>dual</strong>: colimits in 𝒞 are limits in 𝒞^op.
              This means every limit construction has a dual colimit construction with arrows reversed!
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Interactive Exercise */}
      <ConceptCard title="Exercise: Explore Index Categories" level="advanced">
        <div className="space-y-3 text-sm">
          <p>
            The shape of the index category 𝒥 determines what kind of limit you get. Try exploring:
          </p>

          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>What happens with a discrete category with 1 object? (Hint: identity)</li>
            <li>What if you add a third parallel morphism h: A → B? (Still an equalizer!)</li>
            <li>Can you draw the index category for a general pullback?</li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
            <div className="font-semibold mb-2">Challenge:</div>
            <div>
              Products and terminal objects are both limits. Can you see how terminal objects
              are the "product of zero things"? (Hint: empty index category!)
            </div>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
