import React, { useState } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { motion } from 'framer-motion';

/**
 * UniversalPropertyExplorer
 *
 * Gallery of concrete universal constructions with interactive verification.
 * Students explore products, coproducts, terminal objects, equalizers, pullbacks
 * and verify universal properties through factorization.
 *
 * Features:
 * - 6 universal constructions
 * - Interactive factorization checker
 * - Uniqueness verification
 * - Concrete examples in Set, Grp, Top
 * - Counterexamples that fail universality
 */

interface UniversalConstruction {
  id: string;
  name: string;
  description: string;
  category: 'limit' | 'colimit';
  dualOf?: string;

  // Diagram structure
  diagram: {
    type: 'discrete-two' | 'parallel-pair' | 'cospan' | 'span' | 'empty';
    objects: Array<{ id: string; label: string; isUniversal?: boolean }>;
    morphisms: Array<{ id: string; source: string; target: string; label: string }>;
  };

  // Universal property statement
  universalProperty: {
    statement: string;
    factorization: string;
    uniqueness: string;
  };

  // Concrete examples
  concreteExamples: Array<{
    categoryName: string;
    objects: string[];
    construction: string;
    verification: string;
  }>;

  // Interactive test cases
  testCases: Array<{
    candidateObject: string;
    satisfiesUniversal: boolean;
    reason: string;
  }>;

  intuition: string;
  keyInsight: string;
}

const UNIVERSAL_CONSTRUCTIONS: Record<string, UniversalConstruction> = {
  product: {
    id: 'product',
    name: 'Product A × B',
    description: 'Universal object with projections to A and B',
    category: 'limit',
    dualOf: 'coproduct',

    diagram: {
      type: 'discrete-two',
      objects: [
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'AxB', label: 'A × B', isUniversal: true },
        { id: 'Z', label: 'Z (test object)' },
      ],
      morphisms: [
        { id: 'pi1', source: 'AxB', target: 'A', label: 'π₁' },
        { id: 'pi2', source: 'AxB', target: 'B', label: 'π₂' },
        { id: 'f', source: 'Z', target: 'A', label: 'f' },
        { id: 'g', source: 'Z', target: 'B', label: 'g' },
        { id: 'h', source: 'Z', target: 'AxB', label: 'h (unique!)' },
      ],
    },

    universalProperty: {
      statement: 'For any object Z with morphisms f: Z → A and g: Z → B, there exists a **unique** morphism h: Z → A × B making the diagram commute.',
      factorization: 'π₁ ∘ h = f and π₂ ∘ h = g',
      uniqueness: 'If h\' also satisfies the conditions, then h = h\'',
    },

    concreteExamples: [
      {
        categoryName: 'Set',
        objects: ['A', 'B'],
        construction: 'A × B = {(a, b) | a ∈ A, b ∈ B} (Cartesian product)',
        verification: 'π₁(a,b) = a, π₂(a,b) = b. Given f: Z → A, g: Z → B, define h(z) = (f(z), g(z)). This is the unique function making projections commute.',
      },
      {
        categoryName: 'Grp',
        objects: ['G', 'H'],
        construction: 'G × H with component-wise multiplication: (g₁,h₁)(g₂,h₂) = (g₁g₂, h₁h₂)',
        verification: 'Projections π₁: G × H → G and π₂: G × H → H are group homomorphisms. Universal property gives unique homomorphism from any group with maps to G and H.',
      },
      {
        categoryName: 'Top',
        objects: ['X', 'Y'],
        construction: 'X × Y with product topology (basis: U × V for U open in X, V open in Y)',
        verification: 'Projections are continuous. Product topology is the coarsest topology making projections continuous, which ensures the universal property.',
      },
    ],

    testCases: [
      {
        candidateObject: 'A × B (Cartesian product)',
        satisfiesUniversal: true,
        reason: 'Given f: Z → A, g: Z → B, the map h(z) = (f(z), g(z)) is the unique function making projections commute.',
      },
      {
        candidateObject: 'A ⊔ B (disjoint union)',
        satisfiesUniversal: false,
        reason: 'No projections to A and B exist! Disjoint union has *injections* from A and B, not projections to them. This is the coproduct, not product.',
      },
      {
        candidateObject: 'A × B × {0} (product with singleton)',
        satisfiesUniversal: false,
        reason: 'Isomorphic to A × B, but not THE product. Universal objects are unique only up to isomorphism. This works, but is unnecessarily complicated.',
      },
    ],

    intuition: 'The product is the "most efficient" object containing information from both A and B. Any other object with maps to A and B must factor uniquely through A × B.',
    keyInsight: 'Products are defined purely by their universal property - no mention of "pairs" or "tuples". This abstraction works in any category!',
  },

  coproduct: {
    id: 'coproduct',
    name: 'Coproduct A ⊔ B',
    description: 'Universal object with injections from A and B (dual of product)',
    category: 'colimit',
    dualOf: 'product',

    diagram: {
      type: 'discrete-two',
      objects: [
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'AuB', label: 'A ⊔ B', isUniversal: true },
        { id: 'Z', label: 'Z (test object)' },
      ],
      morphisms: [
        { id: 'i1', source: 'A', target: 'AuB', label: 'ι₁' },
        { id: 'i2', source: 'B', target: 'AuB', label: 'ι₂' },
        { id: 'f', source: 'A', target: 'Z', label: 'f' },
        { id: 'g', source: 'B', target: 'Z', label: 'g' },
        { id: 'h', source: 'AuB', target: 'Z', label: 'h (unique!)' },
      ],
    },

    universalProperty: {
      statement: 'For any object Z with morphisms f: A → Z and g: B → Z, there exists a **unique** morphism h: A ⊔ B → Z making the diagram commute.',
      factorization: 'h ∘ ι₁ = f and h ∘ ι₂ = g',
      uniqueness: 'If h\' also satisfies the conditions, then h = h\'',
    },

    concreteExamples: [
      {
        categoryName: 'Set',
        objects: ['A', 'B'],
        construction: 'A ⊔ B = A × {0} ∪ B × {1} (disjoint union, tagged elements)',
        verification: 'ι₁(a) = (a, 0), ι₂(b) = (b, 1). Given f: A → Z, g: B → Z, define h(a,0) = f(a), h(b,1) = g(b). This is well-defined and unique.',
      },
      {
        categoryName: 'Grp',
        objects: ['G', 'H'],
        construction: 'G * H (free product of groups)',
        verification: 'Elements are reduced words alternating between G and H. Injections include G and H. Universal property: any two homomorphisms G → K, H → K extend uniquely to G * H → K.',
      },
      {
        categoryName: 'Top',
        objects: ['X', 'Y'],
        construction: 'X ⊔ Y with disjoint union topology (U open iff U ∩ X open in X and U ∩ Y open in Y)',
        verification: 'Injections are continuous. This is the finest topology making injections continuous, ensuring the universal property.',
      },
    ],

    testCases: [
      {
        candidateObject: 'A ⊔ B (disjoint union)',
        satisfiesUniversal: true,
        reason: 'Given f: A → Z, g: B → Z, we can glue them together: h sends elements tagged from A via f, elements tagged from B via g. This is unique.',
      },
      {
        candidateObject: 'A × B (Cartesian product)',
        satisfiesUniversal: false,
        reason: 'No injections from A and B to A × B (unless A or B is a singleton). This is the product, not the coproduct - arrows go the wrong way!',
      },
      {
        candidateObject: 'A ∪ B (set union)',
        satisfiesUniversal: false,
        reason: 'If A and B overlap, elements from A ∩ B appear once, not twice. Cannot distinguish whether an element came from A or B, so cannot define h uniquely.',
      },
    ],

    intuition: 'The coproduct is the "most efficient" way to combine A and B. Any object receiving maps from both A and B must receive a unique map from A ⊔ B.',
    keyInsight: 'Coproduct is the dual of product: reverse all arrows! In Set, it\'s disjoint union. In Grp, it\'s free product. In Top, it\'s disjoint union topology.',
  },

  terminal: {
    id: 'terminal',
    name: 'Terminal Object 1',
    description: 'Universal object with unique morphism from every object',
    category: 'limit',
    dualOf: 'initial',

    diagram: {
      type: 'empty',
      objects: [
        { id: '1', label: '1', isUniversal: true },
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
      ],
      morphisms: [
        { id: 'fA', source: 'A', target: '1', label: '!ₐ (unique)' },
        { id: 'fB', source: 'B', target: '1', label: '!ᵦ (unique)' },
        { id: 'fC', source: 'C', target: '1', label: '!_c (unique)' },
      ],
    },

    universalProperty: {
      statement: 'For every object A, there exists a **unique** morphism !ₐ: A → 1.',
      factorization: 'Not applicable (no diagram to factor through)',
      uniqueness: 'If f, g: A → 1, then f = g',
    },

    concreteExamples: [
      {
        categoryName: 'Set',
        objects: ['any set A'],
        construction: '1 = {*} (singleton set)',
        verification: 'For any set A, there is exactly one function A → {*}: send every element to *. No other choice is possible.',
      },
      {
        categoryName: 'Grp',
        objects: ['any group G'],
        construction: '1 = {e} (trivial group)',
        verification: 'For any group G, there is exactly one homomorphism G → {e}: send every element to e. This is forced to preserve identity and multiplication.',
      },
      {
        categoryName: 'Top',
        objects: ['any space X'],
        construction: '1 = {*} (one-point space)',
        verification: 'For any topological space X, there is exactly one continuous function X → {*}. Only one function exists, and it\'s automatically continuous.',
      },
    ],

    testCases: [
      {
        candidateObject: '{*} (singleton)',
        satisfiesUniversal: true,
        reason: 'From any set A, there is exactly one function to {*}: map everything to *.',
      },
      {
        candidateObject: '{0, 1} (two-element set)',
        satisfiesUniversal: false,
        reason: 'From a three-element set {a,b,c}, there are 2³ = 8 functions to {0,1}, not a unique one!',
      },
      {
        candidateObject: '∅ (empty set)',
        satisfiesUniversal: false,
        reason: 'No function from a non-empty set to the empty set exists. The empty set is the *initial* object, not terminal!',
      },
    ],

    intuition: 'The terminal object is where "all roads lead". No matter where you start, there is exactly one way to get to 1.',
    keyInsight: 'Terminal object is the limit of the empty diagram! It\'s the "most efficient" object with no imposed structure.',
  },

  initial: {
    id: 'initial',
    name: 'Initial Object 0',
    description: 'Universal object with unique morphism to every object (dual of terminal)',
    category: 'colimit',
    dualOf: 'terminal',

    diagram: {
      type: 'empty',
      objects: [
        { id: '0', label: '0', isUniversal: true },
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
      ],
      morphisms: [
        { id: 'fA', source: '0', target: 'A', label: '!ₐ (unique)' },
        { id: 'fB', source: '0', target: 'B', label: '!ᵦ (unique)' },
        { id: 'fC', source: '0', target: 'C', label: '!_c (unique)' },
      ],
    },

    universalProperty: {
      statement: 'For every object A, there exists a **unique** morphism !ₐ: 0 → A.',
      factorization: 'Not applicable (no diagram to factor through)',
      uniqueness: 'If f, g: 0 → A, then f = g',
    },

    concreteExamples: [
      {
        categoryName: 'Set',
        objects: ['any set A'],
        construction: '0 = ∅ (empty set)',
        verification: 'For any set A, there is exactly one function ∅ → A: the empty function (vacuously defined). No elements to map, so no choices!',
      },
      {
        categoryName: 'Grp',
        objects: ['any group G'],
        construction: '0 = {e} (trivial group)',
        verification: 'For any group G, there is exactly one homomorphism {e} → G: send e to the identity of G. Note: trivial group is BOTH initial and terminal in Grp!',
      },
      {
        categoryName: 'Ring',
        objects: ['any ring R'],
        construction: '0 = ℤ (integers)',
        verification: 'For any ring R, there is exactly one ring homomorphism ℤ → R: determined by where 1 maps (must map to 1_R). Then n maps to n·1_R.',
      },
    ],

    testCases: [
      {
        candidateObject: '∅ (empty set)',
        satisfiesUniversal: true,
        reason: 'For any set A, there is exactly one function ∅ → A: the empty function.',
      },
      {
        candidateObject: '{*} (singleton)',
        satisfiesUniversal: false,
        reason: 'From {*} to a two-element set {0,1}, there are two functions (send * to 0, or send * to 1), not unique!',
      },
      {
        candidateObject: 'ℕ (natural numbers)',
        satisfiesUniversal: false,
        reason: 'Many functions from ℕ to any infinite set exist. Not universal at all!',
      },
    ],

    intuition: 'The initial object is where "all roads start". No matter where you want to go, there is exactly one way to leave from 0.',
    keyInsight: 'Initial object is the colimit of the empty diagram! It\'s dual to terminal. In Set: ∅. In Grp: {e} (also terminal!). In Ring: ℤ.',
  },

  equalizer: {
    id: 'equalizer',
    name: 'Equalizer',
    description: 'Universal object where two morphisms agree',
    category: 'limit',
    dualOf: 'coequalizer',

    diagram: {
      type: 'parallel-pair',
      objects: [
        { id: 'E', label: 'E (equalizer)', isUniversal: true },
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'Z', label: 'Z (test)' },
      ],
      morphisms: [
        { id: 'e', source: 'E', target: 'A', label: 'e' },
        { id: 'f', source: 'A', target: 'B', label: 'f' },
        { id: 'g', source: 'A', target: 'B', label: 'g' },
        { id: 'z', source: 'Z', target: 'A', label: 'z' },
        { id: 'h', source: 'Z', target: 'E', label: 'h (unique!)' },
      ],
    },

    universalProperty: {
      statement: 'Given f, g: A → B, the equalizer E is an object with e: E → A such that f ∘ e = g ∘ e, and for any z: Z → A with f ∘ z = g ∘ z, there exists a **unique** h: Z → E with e ∘ h = z.',
      factorization: 'e ∘ h = z',
      uniqueness: 'If h\' also satisfies e ∘ h\' = z, then h = h\'',
    },

    concreteExamples: [
      {
        categoryName: 'Set',
        objects: ['A', 'B with f, g: A → B'],
        construction: 'E = {a ∈ A | f(a) = g(a)} (subset where f and g agree)',
        verification: 'Inclusion e: E ↪ A sends a to itself. If z: Z → A satisfies f∘z = g∘z, then image(z) ⊆ E, so z factors uniquely through E.',
      },
      {
        categoryName: 'Grp',
        objects: ['G, H with φ, ψ: G → H'],
        construction: 'E = {g ∈ G | φ(g) = ψ(g)} (subgroup where homomorphisms agree)',
        verification: 'E is a subgroup. Inclusion is a homomorphism. Universal property follows from Set equalizer.',
      },
      {
        categoryName: 'Top',
        objects: ['X, Y with f, g: X → Y continuous'],
        construction: 'E = {x ∈ X | f(x) = g(x)} with subspace topology',
        verification: 'E is closed in X (inverse image of diagonal Δ_Y under (f,g): X → Y×Y). Inclusion is continuous. Universal property holds.',
      },
    ],

    testCases: [
      {
        candidateObject: '{a ∈ A | f(a) = g(a)} with inclusion',
        satisfiesUniversal: true,
        reason: 'This is the largest subobject of A where f and g agree. Any other such subobject factors through it uniquely.',
      },
      {
        candidateObject: 'Empty set with f ≠ g everywhere',
        satisfiesUniversal: true,
        reason: 'If f(a) ≠ g(a) for all a, then E = ∅. This still satisfies the universal property (vacuously)!',
      },
      {
        candidateObject: 'All of A',
        satisfiesUniversal: false,
        reason: 'Unless f = g everywhere, not all of A satisfies f(a) = g(a). Taking all of A would not make f ∘ e = g ∘ e.',
      },
    ],

    intuition: 'The equalizer is the "largest subobject" where two morphisms agree. It\'s the precise locus where f = g.',
    keyInsight: 'Equalizers generalize kernels in algebra: ker(φ) = Eq(φ, 0). They are limits of the parallel pair diagram f, g: A → B.',
  },

  pullback: {
    id: 'pullback',
    name: 'Pullback',
    description: 'Universal object over a cospan (generalization of fiber product)',
    category: 'limit',
    dualOf: 'pushout',

    diagram: {
      type: 'cospan',
      objects: [
        { id: 'P', label: 'P (pullback)', isUniversal: true },
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
        { id: 'Z', label: 'Z (test)' },
      ],
      morphisms: [
        { id: 'p1', source: 'P', target: 'A', label: 'p₁' },
        { id: 'p2', source: 'P', target: 'B', label: 'p₂' },
        { id: 'f', source: 'A', target: 'C', label: 'f' },
        { id: 'g', source: 'B', target: 'C', label: 'g' },
        { id: 'z1', source: 'Z', target: 'A', label: 'z₁' },
        { id: 'z2', source: 'Z', target: 'B', label: 'z₂' },
        { id: 'h', source: 'Z', target: 'P', label: 'h (unique!)' },
      ],
    },

    universalProperty: {
      statement: 'Given f: A → C, g: B → C (a cospan), the pullback P has morphisms p₁: P → A, p₂: P → B with f ∘ p₁ = g ∘ p₂. For any Z with z₁: Z → A, z₂: Z → B satisfying f ∘ z₁ = g ∘ z₂, there exists **unique** h: Z → P with p₁ ∘ h = z₁ and p₂ ∘ h = z₂.',
      factorization: 'p₁ ∘ h = z₁ and p₂ ∘ h = z₂',
      uniqueness: 'If h\' also satisfies these, then h = h\'',
    },

    concreteExamples: [
      {
        categoryName: 'Set',
        objects: ['A, B, C with f: A → C, g: B → C'],
        construction: 'P = {(a, b) ∈ A × B | f(a) = g(b)} (fiber product)',
        verification: 'p₁(a,b) = a, p₂(a,b) = b. Given z₁: Z → A, z₂: Z → B with f∘z₁ = g∘z₂, define h(z) = (z₁(z), z₂(z)). The condition ensures (z₁(z), z₂(z)) ∈ P.',
      },
      {
        categoryName: 'Top',
        objects: ['X, Y, Z with f: X → Z, g: Y → Z continuous'],
        construction: 'P = {(x,y) ∈ X × Y | f(x) = g(y)} with subspace topology from X × Y',
        verification: 'Projections are continuous (restrictions of product projections). Subspace topology ensures universal property for continuous maps.',
      },
      {
        categoryName: 'Ring (Spec)',
        objects: ['Spec A, Spec B, Spec C'],
        construction: 'Spec(A ⊗_C B) (tensor product of algebras over C)',
        verification: 'In algebraic geometry, fiber products correspond to tensor products. This is how schemes are glued together!',
      },
    ],

    testCases: [
      {
        candidateObject: '{(a,b) | f(a) = g(b)} in A × B',
        satisfiesUniversal: true,
        reason: 'This is the universal way to "match up" A and B over C. Any other such matching factors through this uniquely.',
      },
      {
        candidateObject: 'A × B (full product)',
        satisfiesUniversal: false,
        reason: 'Unless f and g are the same constant map, not all pairs (a,b) satisfy f(a) = g(b). The product is too big!',
      },
      {
        candidateObject: 'A ∩ B (if A, B ⊆ C)',
        satisfiesUniversal: true,
        reason: 'When A, B are subsets of C with inclusion maps, the pullback is the intersection A ∩ B. Special case!',
      },
    ],

    intuition: 'The pullback is the "most efficient" way to match up A and B over C. It captures pairs from A and B that "agree" when mapped to C.',
    keyInsight: 'Pullbacks generalize intersections, fiber products, and inverse images. In schemes, they are tensor products! Fundamental for moduli spaces.',
  },
};

export function UniversalPropertyExplorer() {
  const [selectedConstruction, setSelectedConstruction] = useState<string>('product');
  const [selectedExample, setSelectedExample] = useState<number>(0);
  const [selectedTestCase, setSelectedTestCase] = useState<number>(0);
  const [showDual, setShowDual] = useState<boolean>(false);

  const construction = UNIVERSAL_CONSTRUCTIONS[selectedConstruction];

  if (!construction) {
    return <div>Loading...</div>;
  }

  const dualConstruction = construction.dualOf
    ? UNIVERSAL_CONSTRUCTIONS[construction.dualOf]
    : null;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Universal Property Explorer</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore concrete universal constructions: products, coproducts, terminal objects,
          equalizers, and pullbacks. Verify universal properties through interactive factorization.
        </p>
      </div>

      {/* Construction Gallery */}
      <ConceptCard title="Universal Constructions Gallery" level="beginner">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(UNIVERSAL_CONSTRUCTIONS).map(([id, constr]) => (
            <motion.button
              key={id}
              onClick={() => setSelectedConstruction(id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedConstruction === id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-bold text-sm mb-1">{constr.name}</div>
              <div className="text-xs text-muted-foreground">{constr.description}</div>
              <div className={`text-xs mt-2 font-medium ${
                constr.category === 'limit' ? 'text-blue-600' : 'text-orange-600'
              }`}>
                {constr.category === 'limit' ? '← Limit' : 'Colimit →'}
              </div>
            </motion.button>
          ))}
        </div>
      </ConceptCard>

      {/* Selected Construction Details */}
      {construction && (
        <>
          {/* Name and Description */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{construction.name}</h3>
                <p className="text-muted-foreground mb-4">{construction.description}</p>
                <div className="text-sm">
                  <span className="font-semibold">Category: </span>
                  <span className={construction.category === 'limit' ? 'text-blue-600' : 'text-orange-600'}>
                    {construction.category}
                  </span>
                  {construction.dualOf && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="font-semibold">Dual of: </span>
                      <button
                        onClick={() => setSelectedConstruction(construction.dualOf!)}
                        className="text-purple-600 hover:underline"
                      >
                        {UNIVERSAL_CONSTRUCTIONS[construction.dualOf].name}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Universal Property Statement */}
          <ConceptCard title="Universal Property" level="intermediate">
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-sm mb-2">Statement:</div>
                <div className="pl-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 p-3 rounded">
                  {construction.universalProperty.statement}
                </div>
              </div>

              <div>
                <div className="font-semibold text-sm mb-2">Factorization Property:</div>
                <div className="pl-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950 p-3 rounded font-mono text-sm">
                  {construction.universalProperty.factorization}
                </div>
              </div>

              <div>
                <div className="font-semibold text-sm mb-2">Uniqueness:</div>
                <div className="pl-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950 p-3 rounded">
                  {construction.universalProperty.uniqueness}
                </div>
              </div>
            </div>
          </ConceptCard>

          {/* Diagram Visualization */}
          <ConceptCard title="Commutative Diagram" level="intermediate">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border">
              <div className="text-center space-y-6">
                <div className="text-sm text-muted-foreground mb-4">
                  Diagram Type: <span className="font-mono">{construction.diagram.type}</span>
                </div>

                {/* Simple ASCII-style diagram representation */}
                <div className="font-mono text-sm space-y-2 bg-gray-50 dark:bg-gray-800 p-6 rounded">
                  {construction.diagram.type === 'discrete-two' && (
                    <div className="space-y-1">
                      <div className="text-center text-blue-600 font-bold">
                        {construction.diagram.objects.find(o => o.isUniversal)?.label}
                      </div>
                      <div className="text-center">↙ ↘</div>
                      <div className="flex justify-around">
                        {construction.diagram.objects
                          .filter(o => !o.isUniversal && o.id !== 'Z')
                          .map(obj => (
                            <span key={obj.id}>{obj.label}</span>
                          ))}
                      </div>
                      {construction.diagram.objects.find(o => o.id === 'Z') && (
                        <>
                          <div className="text-center mt-4 text-gray-500">Test object:</div>
                          <div className="text-center">
                            {construction.diagram.objects.find(o => o.id === 'Z')?.label}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {construction.diagram.type === 'parallel-pair' && (
                    <div className="space-y-2">
                      <div className="flex justify-center items-center gap-4">
                        <span className="text-blue-600 font-bold">
                          {construction.diagram.objects.find(o => o.isUniversal)?.label}
                        </span>
                        <span>→</span>
                        <span>A</span>
                        <span>⇉</span>
                        <span>B</span>
                      </div>
                      <div className="text-center text-xs text-gray-500">
                        (f and g are parallel morphisms)
                      </div>
                    </div>
                  )}

                  {construction.diagram.type === 'cospan' && (
                    <div className="space-y-2">
                      <div className="text-center text-blue-600 font-bold">
                        {construction.diagram.objects.find(o => o.isUniversal)?.label}
                      </div>
                      <div className="text-center">↙ ↘</div>
                      <div className="flex justify-around">
                        <span>A</span>
                        <span>B</span>
                      </div>
                      <div className="text-center">↘ ↙</div>
                      <div className="text-center">C</div>
                    </div>
                  )}

                  {construction.diagram.type === 'empty' && (
                    <div className="space-y-2">
                      <div className="text-center text-blue-600 font-bold">
                        {construction.diagram.objects.find(o => o.isUniversal)?.label}
                      </div>
                      <div className="text-center text-xs text-gray-500">
                        (limit/colimit of empty diagram)
                      </div>
                      <div className="flex justify-around mt-4">
                        {construction.diagram.objects
                          .filter(o => !o.isUniversal)
                          .map(obj => (
                            <span key={obj.id} className="text-gray-400">{obj.label}</span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ConceptCard>

          {/* Concrete Examples */}
          <ConceptCard title="Concrete Examples in Categories" level="beginner">
            <div className="space-y-4">
              {/* Category Selector */}
              <div className="flex gap-2 flex-wrap">
                {construction.concreteExamples.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedExample(idx)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedExample === idx
                        ? 'border-green-500 bg-green-50 dark:bg-green-950'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {example.categoryName}
                  </button>
                ))}
              </div>

              {/* Selected Example Details */}
              {construction.concreteExamples[selectedExample] && (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border space-y-3">
                  <div>
                    <div className="font-semibold text-sm mb-1">Objects:</div>
                    <div className="text-muted-foreground">
                      {construction.concreteExamples[selectedExample].objects.join(', ')}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-sm mb-1">Construction:</div>
                    <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      {construction.concreteExamples[selectedExample].construction}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-sm mb-1">Verification:</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {construction.concreteExamples[selectedExample].verification}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ConceptCard>

          {/* Interactive Test Cases */}
          <ConceptCard title="Test Your Understanding" level="advanced">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Which of these candidates satisfy the universal property?
              </p>

              {construction.testCases.map((testCase, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => setSelectedTestCase(idx)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTestCase === idx
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold">{testCase.candidateObject}</div>
                    <div className={`text-sm font-bold ${
                      testCase.satisfiesUniversal ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {testCase.satisfiesUniversal ? '✓ Universal' : '✗ Not Universal'}
                    </div>
                  </div>

                  {selectedTestCase === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-muted-foreground mt-2 pt-2 border-t"
                    >
                      <span className="font-semibold">Reason: </span>
                      {testCase.reason}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </ConceptCard>

          {/* Intuition and Key Insight */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <div className="font-semibold mb-2 text-blue-900 dark:text-blue-100">💡 Intuition</div>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                {construction.intuition}
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
              <div className="font-semibold mb-2 text-purple-900 dark:text-purple-100">🔑 Key Insight</div>
              <div className="text-sm text-purple-800 dark:text-purple-200">
                {construction.keyInsight}
              </div>
            </div>
          </div>

          {/* Pattern Recognition */}
          <ConceptCard title="Universal Property Pattern Recognition" level="advanced">
            <div className="space-y-3">
              <div className="text-sm leading-relaxed">
                Every universal property follows the same pattern:
              </div>

              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li className="pl-4">
                  <span className="font-semibold">Existence:</span> There is an object X with certain morphisms
                </li>
                <li className="pl-4">
                  <span className="font-semibold">Factorization:</span> For any other object Y with similar morphisms,
                  there exists a morphism Y → X (or X → Y)
                </li>
                <li className="pl-4">
                  <span className="font-semibold">Uniqueness:</span> This factorization morphism is <strong>unique</strong>
                </li>
                <li className="pl-4">
                  <span className="font-semibold">Commutative Diagrams:</span> All diagrams involving the factorization commute
                </li>
              </ol>

              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="text-sm font-semibold mb-2">The Big Idea:</div>
                <div className="text-sm">
                  Universal properties define objects by their <em>relationships</em> to other objects,
                  not by their internal structure. This makes them unique up to unique isomorphism!
                </div>
              </div>
            </div>
          </ConceptCard>
        </>
      )}
    </div>
  );
}
