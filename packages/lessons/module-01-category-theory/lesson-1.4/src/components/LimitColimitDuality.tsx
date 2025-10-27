import React, { useState, useMemo } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LimitColimitDuality
 *
 * Interactive exploration of the duality between limits and colimits.
 * Students see how reversing arrows in a diagram transforms limits into colimits.
 *
 * Features:
 * - Side-by-side limit/colimit comparison
 * - Automatic arrow reversal visualization
 * - Dual constructions (product ↔ coproduct, etc.)
 * - Category duality (𝒞 ↔ 𝒞^op)
 * - Interactive duality transformer
 * - Pattern recognition across dual concepts
 */

interface DualConstruction {
  id: string;
  name: string;
  limitSide: {
    name: string;
    diagram: string;
    object: string;
    universalProperty: string;
    example: string;
  };
  colimitSide: {
    name: string;
    diagram: string;
    object: string;
    universalProperty: string;
    example: string;
  };
  dualityMap: {
    objectMap: string;
    morphismMap: string;
    propertyMap: string;
  };
}

const DUAL_CONSTRUCTIONS: Record<string, DualConstruction> = {
  productCoproduct: {
    id: 'productCoproduct',
    name: 'Product ↔ Coproduct',
    limitSide: {
      name: 'Product A × B',
      diagram: 'Discrete (2 objects)',
      object: 'A × B with projections π₁: A×B → A, π₂: A×B → B',
      universalProperty: 'For any Z with f: Z→A, g: Z→B, ∃! h: Z→A×B with π₁∘h=f, π₂∘h=g',
      example: 'In Set: {1,2} × {a,b} = {(1,a), (1,b), (2,a), (2,b)}',
    },
    colimitSide: {
      name: 'Coproduct A ⊔ B',
      diagram: 'Discrete (2 objects)',
      object: 'A ⊔ B with injections ι₁: A → A⊔B, ι₂: B → A⊔B',
      universalProperty: 'For any Z with f: A→Z, g: B→Z, ∃! h: A⊔B→Z with h∘ι₁=f, h∘ι₂=g',
      example: 'In Set: {1,2} ⊔ {a,b} = {(1,0), (2,0), (a,1), (b,1)} (disjoint union)',
    },
    dualityMap: {
      objectMap: 'A × B ↔ A ⊔ B (same set of objects)',
      morphismMap: 'Projections π → Injections ι (reverse arrows)',
      propertyMap: 'Morphisms into product → Morphisms out of coproduct',
    },
  },

  equalizerCoequalizer: {
    id: 'equalizerCoequalizer',
    name: 'Equalizer ↔ Coequalizer',
    limitSide: {
      name: 'Equalizer Eq(f,g)',
      diagram: 'Parallel pair: A ⇉ B',
      object: 'Eq(f,g) with e: Eq(f,g) → A such that f∘e = g∘e',
      universalProperty: 'For any Z with z: Z→A and f∘z=g∘z, ∃! h: Z→Eq(f,g) with e∘h=z',
      example: 'In Set: Eq(f,g) = {a ∈ A | f(a) = g(a)} (subset where f,g agree)',
    },
    colimitSide: {
      name: 'Coequalizer Coeq(f,g)',
      diagram: 'Parallel pair: A ⇉ B',
      object: 'Coeq(f,g) with q: B → Coeq(f,g) such that q∘f = q∘g',
      universalProperty: 'For any Z with z: B→Z and z∘f=z∘g, ∃! h: Coeq(f,g)→Z with h∘q=z',
      example: 'In Set: Coeq(f,g) = B/~ where b ~ b\' if ∃a: f(a)=b, g(a)=b\' (quotient)',
    },
    dualityMap: {
      objectMap: 'Eq(f,g) → A ↔ B → Coeq(f,g) (reverse direction)',
      morphismMap: 'Inclusion e: Eq→A ↔ Quotient q: B→Coeq',
      propertyMap: 'Factors into equalizer → Factors out of coequalizer',
    },
  },

  pullbackPushout: {
    id: 'pullbackPushout',
    name: 'Pullback ↔ Pushout',
    limitSide: {
      name: 'Pullback A ×_C B',
      diagram: 'Cospan: A → C ← B',
      object: 'A ×_C B with p₁: A×_C B→A, p₂: A×_C B→B',
      universalProperty: 'For any Z with z₁: Z→A, z₂: Z→B and f∘z₁=g∘z₂, ∃! h: Z→A×_C B',
      example: 'In Set: A ×_C B = {(a,b) | f(a) = g(b)} (fiber product)',
    },
    colimitSide: {
      name: 'Pushout A ⊔_C B',
      diagram: 'Span: A ← C → B',
      object: 'A ⊔_C B with i₁: A→A⊔_C B, i₂: B→A⊔_C B',
      universalProperty: 'For any Z with z₁: A→Z, z₂: B→Z and z₁∘f=z₂∘g, ∃! h: A⊔_C B→Z',
      example: 'In Set: A ⊔_C B = (A ⊔ B)/~ where f(c)~g(c) for all c∈C (gluing)',
    },
    dualityMap: {
      objectMap: 'P → A,B ↔ A,B → P (reverse all arrows)',
      morphismMap: 'Projections → Injections',
      propertyMap: 'Universal cone → Universal cocone',
    },
  },

  terminalInitial: {
    id: 'terminalInitial',
    name: 'Terminal ↔ Initial',
    limitSide: {
      name: 'Terminal Object 1',
      diagram: 'Empty diagram',
      object: '1 with unique !: A → 1 for all A',
      universalProperty: 'For any object A, ∃! morphism A → 1',
      example: 'In Set: {*} (singleton). In Grp: {e} (trivial group)',
    },
    colimitSide: {
      name: 'Initial Object 0',
      diagram: 'Empty diagram',
      object: '0 with unique !: 0 → A for all A',
      universalProperty: 'For any object A, ∃! morphism 0 → A',
      example: 'In Set: ∅ (empty set). In Ring: ℤ (integers)',
    },
    dualityMap: {
      objectMap: '1 ↔ 0 (reverse role)',
      morphismMap: 'Morphisms into 1 ↔ Morphisms out of 0',
      propertyMap: 'Terminal = limit of ∅ ↔ Initial = colimit of ∅',
    },
  },

  intersectionUnion: {
    id: 'intersectionUnion',
    name: 'Intersection ↔ Union (in Posets)',
    limitSide: {
      name: 'Meet (∧)',
      diagram: 'Discrete (2 elements)',
      object: 'a ∧ b = greatest lower bound',
      universalProperty: 'For any c with c ≤ a and c ≤ b, we have c ≤ a∧b',
      example: 'In poset of sets: A ∧ B = A ∩ B (intersection)',
    },
    colimitSide: {
      name: 'Join (∨)',
      diagram: 'Discrete (2 elements)',
      object: 'a ∨ b = least upper bound',
      universalProperty: 'For any c with a ≤ c and b ≤ c, we have a∨b ≤ c',
      example: 'In poset of sets: A ∨ B = A ∪ B (union)',
    },
    dualityMap: {
      objectMap: 'a ∧ b ↔ a ∨ b',
      morphismMap: '≤ ↔ ≥ (reverse order)',
      propertyMap: 'GLB ↔ LUB',
    },
  },

  inverseLimitDirectLimit: {
    id: 'inverseLimitDirectLimit',
    name: 'Inverse Limit ↔ Direct Limit',
    limitSide: {
      name: 'Inverse Limit (Projective Limit)',
      diagram: 'Diagram indexed by directed set',
      object: 'lim←A_i with projections to each A_i',
      universalProperty: 'Universal cone over the diagram',
      example: 'lim←ℤ/nℤ = ℤ̂ (profinite integers, p-adic completion)',
    },
    colimitSide: {
      name: 'Direct Limit (Inductive Limit)',
      diagram: 'Diagram indexed by directed set',
      object: 'lim→A_i with inclusions from each A_i',
      universalProperty: 'Universal cocone under the diagram',
      example: 'lim→ℤ/p^nℤ = ℤ[1/p] (localization)',
    },
    dualityMap: {
      objectMap: 'lim← ↔ lim→',
      morphismMap: 'Projections → Inclusions',
      propertyMap: 'Inverse system → Direct system',
    },
  },
};

export function LimitColimitDuality() {
  const [selectedDuality, setSelectedDuality] = useState<keyof typeof DUAL_CONSTRUCTIONS>('productCoproduct');
  const [viewMode, setViewMode] = useState<'split' | 'transform'>('split');
  const [showArrows, setShowArrows] = useState<boolean>(true);

  const duality = DUAL_CONSTRUCTIONS[selectedDuality];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Limit-Colimit Duality Explorer</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the beautiful duality between limits and colimits. See how reversing all arrows
          transforms one into the other. Every limit in 𝒞 is a colimit in 𝒞^op!
        </p>
      </div>

      {/* View Mode Selector */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setViewMode('split')}
          className={`px-4 py-2 rounded-lg border-2 transition-all ${
            viewMode === 'split'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
          }`}
        >
          Side-by-Side
        </button>
        <button
          onClick={() => setViewMode('transform')}
          className={`px-4 py-2 rounded-lg border-2 transition-all ${
            viewMode === 'transform'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
          }`}
        >
          Transform
        </button>
      </div>

      {/* Duality Selector */}
      <ConceptCard title="Choose a Dual Pair" level="beginner">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(DUAL_CONSTRUCTIONS).map(([key, dual]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedDuality(key as keyof typeof DUAL_CONSTRUCTIONS)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedDuality === key
                  ? 'border-green-500 bg-green-50 dark:bg-green-950'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-bold text-sm">{dual.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {dual.limitSide.diagram}
              </div>
            </motion.button>
          ))}
        </div>
      </ConceptCard>

      {/* Split View */}
      {viewMode === 'split' && duality && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Limit Side */}
          <ConceptCard title="← LIMIT" level="intermediate">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                <div className="font-bold text-lg mb-2">{duality.limitSide.name}</div>
                <div className="text-xs text-muted-foreground mb-3">
                  Diagram: {duality.limitSide.diagram}
                </div>
              </div>

              <div>
                <div className="font-semibold text-sm mb-2">Object:</div>
                <div className="font-mono text-xs bg-white dark:bg-gray-900 p-3 rounded">
                  {duality.limitSide.object}
                </div>
              </div>

              <div>
                <div className="font-semibold text-sm mb-2">Universal Property:</div>
                <div className="text-xs bg-blue-50 dark:bg-blue-950 p-3 rounded leading-relaxed">
                  {duality.limitSide.universalProperty}
                </div>
              </div>

              <div>
                <div className="font-semibold text-sm mb-2">Example:</div>
                <div className="text-xs bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  {duality.limitSide.example}
                </div>
              </div>
            </div>
          </ConceptCard>

          {/* Colimit Side */}
          <ConceptCard title="COLIMIT →" level="intermediate">
            <div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border-2 border-orange-300 dark:border-orange-700">
                <div className="font-bold text-lg mb-2">{duality.colimitSide.name}</div>
                <div className="text-xs text-muted-foreground mb-3">
                  Diagram: {duality.colimitSide.diagram}
                </div>
              </div>

              <div>
                <div className="font-semibold text-sm mb-2">Object:</div>
                <div className="font-mono text-xs bg-white dark:bg-gray-900 p-3 rounded">
                  {duality.colimitSide.object}
                </div>
              </div>

              <div>
                <div className="font-semibold text-sm mb-2">Universal Property:</div>
                <div className="text-xs bg-orange-50 dark:bg-orange-950 p-3 rounded leading-relaxed">
                  {duality.colimitSide.universalProperty}
                </div>
              </div>

              <div>
                <div className="font-semibold text-sm mb-2">Example:</div>
                <div className="text-xs bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  {duality.colimitSide.example}
                </div>
              </div>
            </div>
          </ConceptCard>
        </div>
      )}

      {/* Transform View */}
      {viewMode === 'transform' && duality && (
        <ConceptCard title="Duality Transformation" level="advanced">
          <div className="space-y-6">
            {/* Source */}
            <motion.div
              className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-2 border-blue-300"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                START: Limit in 𝒞
              </div>
              <div className="font-bold text-lg">{duality.limitSide.name}</div>
              <div className="font-mono text-xs mt-2">{duality.limitSide.object}</div>
            </motion.div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <motion.div
                className="text-4xl text-purple-600"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ↓
              </motion.div>
            </div>

            {/* Transformation */}
            <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border-2 border-purple-300">
              <div className="font-semibold mb-3 text-center">Apply Duality (𝒞 → 𝒞^op)</div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-white dark:bg-gray-900 rounded">
                  <span className="font-semibold">Objects:</span> {duality.dualityMap.objectMap}
                </div>
                <div className="p-2 bg-white dark:bg-gray-900 rounded">
                  <span className="font-semibold">Morphisms:</span> {duality.dualityMap.morphismMap}
                </div>
                <div className="p-2 bg-white dark:bg-gray-900 rounded">
                  <span className="font-semibold">Properties:</span> {duality.dualityMap.propertyMap}
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <motion.div
                className="text-4xl text-purple-600"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
              >
                ↓
              </motion.div>
            </div>

            {/* Result */}
            <motion.div
              className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border-2 border-orange-300"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2">
                RESULT: Colimit in 𝒞^op (= Limit in 𝒞 with reversed arrows)
              </div>
              <div className="font-bold text-lg">{duality.colimitSide.name}</div>
              <div className="font-mono text-xs mt-2">{duality.colimitSide.object}</div>
            </motion.div>
          </div>
        </ConceptCard>
      )}

      {/* Duality Principles */}
      <ConceptCard title="Understanding Duality" level="beginner">
        <div className="space-y-3 text-sm">
          <p>
            The <strong>duality principle</strong> is one of the most powerful ideas in category theory:
          </p>

          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-800">
            <div className="font-semibold mb-2 text-center">Fundamental Duality Theorem:</div>
            <div className="text-center font-mono text-sm">
              Limit in 𝒞 = Colimit in 𝒞^op
            </div>
          </div>

          <p>
            The opposite category 𝒞^op has:
          </p>

          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Same objects as 𝒞</li>
            <li>Morphisms reversed: f: A → B in 𝒞 becomes f^op: B → A in 𝒞^op</li>
            <li>Composition reversed: (g ∘ f)^op = f^op ∘ g^op</li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border mt-4">
            <div className="font-semibold mb-2">What This Means:</div>
            <div className="text-xs space-y-1">
              <div>• Every theorem about limits automatically gives a theorem about colimits</div>
              <div>• Products ↔ Coproducts are perfect duals</div>
              <div>• Terminal ↔ Initial objects are duals</div>
              <div>• Equalizers ↔ Coequalizers are duals</div>
              <div>• Pullbacks ↔ Pushouts are duals</div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
            <div className="font-semibold mb-2">Why Duality Is Beautiful:</div>
            <div className="text-xs">
              You only need to prove half the theorems! Every statement about limits gives you
              a "free" dual statement about colimits. This is the essence of categorical thinking:
              abstract structure reveals deep symmetries.
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Pattern Recognition */}
      <ConceptCard title="Pattern Recognition Table" level="advanced">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2">
                <th className="text-left p-2 bg-blue-50 dark:bg-blue-950">Limit Concept</th>
                <th className="text-center p-2 bg-purple-50 dark:bg-purple-950">↔</th>
                <th className="text-left p-2 bg-orange-50 dark:bg-orange-950">Colimit Concept</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Cone (morphisms into)</td>
                <td className="text-center">↔</td>
                <td className="p-2">Cocone (morphisms out of)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Projections</td>
                <td className="text-center">↔</td>
                <td className="p-2">Injections</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Product ×</td>
                <td className="text-center">↔</td>
                <td className="p-2">Coproduct ⊔</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Terminal 1</td>
                <td className="text-center">↔</td>
                <td className="p-2">Initial 0</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Equalizer</td>
                <td className="text-center">↔</td>
                <td className="p-2">Coequalizer</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Pullback</td>
                <td className="text-center">↔</td>
                <td className="p-2">Pushout</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Intersection ∩</td>
                <td className="text-center">↔</td>
                <td className="p-2">Union ∪</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Meet ∧ (GLB)</td>
                <td className="text-center">↔</td>
                <td className="p-2">Join ∨ (LUB)</td>
              </tr>
              <tr>
                <td className="p-2">Inverse limit lim←</td>
                <td className="text-center">↔</td>
                <td className="p-2">Direct limit lim→</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ConceptCard>

      {/* Exercise */}
      <ConceptCard title="Exercise: Dualize a Statement" level="advanced">
        <div className="space-y-3 text-sm">
          <p>
            Practice the duality principle by dualizing statements:
          </p>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
            <div className="font-semibold mb-2">Original Statement (about products):</div>
            <div className="text-xs">
              "The product A × B is the unique (up to isomorphism) object with projections
              π₁: A×B → A and π₂: A×B → B such that any pair of morphisms f: Z → A, g: Z → B
              factors uniquely through A × B."
            </div>
          </div>

          <div className="flex justify-center text-2xl text-purple-600 my-2">
            ↓ Dualize ↓
          </div>

          <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
            <div className="font-semibold mb-2">Dual Statement (about coproducts):</div>
            <div className="text-xs">
              "The coproduct A ⊔ B is the unique (up to isomorphism) object with injections
              ι₁: A → A⊔B and ι₂: B → A⊔B such that any pair of morphisms f: A → Z, g: B → Z
              factors uniquely through A ⊔ B."
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
            <div className="font-semibold mb-2">Challenge:</div>
            <div>
              Can you dualize the statement "right adjoints preserve limits"?
              (Hint: The dual is "left adjoints preserve colimits"!)
            </div>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
