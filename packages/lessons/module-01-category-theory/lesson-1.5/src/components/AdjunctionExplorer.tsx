import React, { useState } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { motion } from 'framer-motion';

/**
 * AdjunctionExplorer
 *
 * Gallery of concrete adjoint functor pairs with interactive verification.
 * Students explore Free ⊣ Forgetful, Hom adjunctions, exponential adjoints,
 * and verify unit/counit and triangle identities.
 *
 * Features:
 * - 6 adjunction examples
 * - Interactive unit/counit visualization
 * - Triangle identity verification
 * - Concrete examples in Set, Grp, Top, Vect
 * - Preservation theorem demonstration
 */

interface AdjunctionExample {
  id: string;
  name: string;
  description: string;

  // The functors
  leftAdjoint: {
    name: string;
    notation: string;
    description: string;
    sourceCategory: string;
    targetCategory: string;
  };

  rightAdjoint: {
    name: string;
    notation: string;
    description: string;
    sourceCategory: string;
    targetCategory: string;
  };

  // Unit: id_D => U ∘ F (or R ∘ L)
  unit: {
    name: string;
    notation: string;
    description: string;
    concreteExample: string;
    interpretation: string;
  };

  // Counit: F ∘ U (or L ∘ R) => id_C
  counit: {
    name: string;
    notation: string;
    description: string;
    concreteExample: string;
    interpretation: string;
  };

  // Triangle identities
  triangleIdentities: {
    left: {
      statement: string;
      interpretation: string;
    };
    right: {
      statement: string;
      interpretation: string;
    };
  };

  // Concrete examples
  concreteExamples: Array<{
    object: string;
    unitApplication: string;
    counitApplication: string;
  }>;

  // Preservation properties
  preservation: {
    leftPreserves: string[];
    rightPreserves: string[];
  };

  intuition: string;
  keyInsight: string;
  applications: string[];
}

const ADJUNCTION_EXAMPLES: Record<string, AdjunctionExample> = {
  freeForgetful: {
    id: 'freeForgetful',
    name: 'Free ⊣ Forgetful',
    description: 'The fundamental adjunction between algebraic structures and sets',

    leftAdjoint: {
      name: 'Free Functor',
      notation: 'F: Set → Grp',
      description: 'Constructs the free group on a set',
      sourceCategory: 'Set',
      targetCategory: 'Grp',
    },

    rightAdjoint: {
      name: 'Forgetful Functor',
      notation: 'U: Grp → Set',
      description: 'Forgets the group structure, remembering only the underlying set',
      sourceCategory: 'Grp',
      targetCategory: 'Set',
    },

    unit: {
      name: 'Unit',
      notation: 'η: id_Set ⇒ U ∘ F',
      description: 'For each set S, a function η_S: S → U(F(S))',
      concreteExample: 'η_S(s) = s viewed as a word of length 1 in the free group F(S)',
      interpretation: 'Embeds elements of S as generators in the free group',
    },

    counit: {
      name: 'Counit',
      notation: 'ε: F ∘ U ⇒ id_Grp',
      description: 'For each group G, a homomorphism ε_G: F(U(G)) → G',
      concreteExample: 'ε_G evaluates words in generators U(G) using the group operation of G',
      interpretation: 'Evaluates formal words in a group using the actual group multiplication',
    },

    triangleIdentities: {
      left: {
        statement: '(ε_F(S)) ∘ F(η_S) = id_F(S)',
        interpretation: 'Embedding S into U(F(S)), then applying F and evaluating, gives back F(S)',
      },
      right: {
        statement: 'U(ε_G) ∘ η_U(G) = id_U(G)',
        interpretation: 'Embedding U(G) as generators, then evaluating, gives back the original elements',
      },
    },

    concreteExamples: [
      {
        object: 'S = {a, b}',
        unitApplication: 'η_S(a) = a in F({a,b}), η_S(b) = b in F({a,b})',
        counitApplication: 'ε_G: F(U(ℤ)) → ℤ sends formal products of integers to actual sums',
      },
      {
        object: 'G = ℤ/2ℤ',
        unitApplication: 'η_U(G)({0, 1}) embeds {0, 1} as generators in F({0, 1})',
        counitApplication: 'ε_G evaluates words like "0·1·0·1" to actual group elements',
      },
    ],

    preservation: {
      leftPreserves: ['Colimits', 'Coproducts', 'Coequalizers', 'Initial objects'],
      rightPreserves: ['Limits', 'Products', 'Equalizers', 'Terminal objects'],
    },

    intuition: 'Free ⊣ Forgetful captures the relationship between "structure" and "underlying set". The free functor builds the "most general" algebraic structure, while forgetful strips it away.',
    keyInsight: 'The unit embeds sets as generators. The counit evaluates formal expressions. Together, they capture the essence of "freeness".',
    applications: [
      'Universal properties of free groups',
      'Algebraic presentations (generators and relations)',
      'Monads: The monad T = U ∘ F captures the "algebraic structure" pattern',
    ],
  },

  productHom: {
    id: 'productHom',
    name: '(– × A) ⊣ Hom(A, –)',
    description: 'Currying adjunction in cartesian closed categories',

    leftAdjoint: {
      name: 'Product with A',
      notation: '(– × A): 𝒞 → 𝒞',
      description: 'Takes product with a fixed object A',
      sourceCategory: '𝒞',
      targetCategory: '𝒞',
    },

    rightAdjoint: {
      name: 'Internal Hom',
      notation: 'Hom(A, –): 𝒞 → 𝒞',
      description: 'Internal hom-object (exponential)',
      sourceCategory: '𝒞',
      targetCategory: '𝒞',
    },

    unit: {
      name: 'Unit',
      notation: 'η: id ⇒ Hom(A, – × A)',
      description: 'η_B: B → Hom(A, B × A)',
      concreteExample: 'η_B(b) = λa. (b, a) (currying)',
      interpretation: 'Embed element b as a constant function that pairs with its argument',
    },

    counit: {
      name: 'Counit',
      notation: 'ε: (Hom(A, –) × A) ⇒ id',
      description: 'ε_B: Hom(A, B) × A → B',
      concreteExample: 'ε_B(f, a) = f(a) (evaluation)',
      interpretation: 'Apply a function to its argument',
    },

    triangleIdentities: {
      left: {
        statement: 'ε ∘ (η × id_A) = id',
        interpretation: 'Currying then evaluating gives back the original value',
      },
      right: {
        statement: 'Hom(A, ε) ∘ η = id',
        interpretation: 'Embedding then applying gives back the original function',
      },
    },

    concreteExamples: [
      {
        object: 'Set: B = {0, 1}, A = {a, b}',
        unitApplication: 'η_B(0) = (λx. (0, x))',
        counitApplication: 'ε_B(f, a) = f(a)',
      },
      {
        object: 'Vect: B = ℝ², A = ℝ',
        unitApplication: 'η_B(v) = (λt. (v, t)) ∈ Hom(ℝ, ℝ² × ℝ)',
        counitApplication: 'ε_B(L, t) = L(t) ∈ ℝ²',
      },
    ],

    preservation: {
      leftPreserves: ['Colimits (product is a left adjoint)'],
      rightPreserves: ['Limits (exponential is a right adjoint)'],
    },

    intuition: 'This is the adjunction that gives us currying: functions of two variables correspond to functions returning functions.',
    keyInsight: 'Hom(A × B, C) ≅ Hom(A, C^B). In Set: functions (A × B) → C correspond to functions A → (B → C).',
    applications: [
      'Lambda calculus and functional programming',
      'Cartesian closed categories',
      'Type theory: A × B → C ≅ A → (B → C)',
    ],
  },

  tensorHom: {
    id: 'tensorHom',
    name: '(– ⊗ A) ⊣ Hom(A, –)',
    description: 'Tensor-Hom adjunction in module categories',

    leftAdjoint: {
      name: 'Tensor with A',
      notation: '(– ⊗_R A): Mod_R → Mod_R',
      description: 'Tensor product with a fixed R-module A',
      sourceCategory: 'Mod_R',
      targetCategory: 'Mod_R',
    },

    rightAdjoint: {
      name: 'Hom Functor',
      notation: 'Hom_R(A, –): Mod_R → Mod_R',
      description: 'Internal hom R-module',
      sourceCategory: 'Mod_R',
      targetCategory: 'Mod_R',
    },

    unit: {
      name: 'Unit',
      notation: 'η: M → Hom_R(A, M ⊗_R A)',
      description: 'η_M(m)(a) = m ⊗ a',
      concreteExample: 'For M = R, η_R(r)(a) = r ⊗ a = ra',
      interpretation: 'Embed module element as a "multiplication by m" map',
    },

    counit: {
      name: 'Counit',
      notation: 'ε: Hom_R(A, N) ⊗_R A → N',
      description: 'ε_N(f ⊗ a) = f(a)',
      concreteExample: 'Evaluation: apply linear map to element',
      interpretation: 'Evaluate a linear map at a point',
    },

    triangleIdentities: {
      left: {
        statement: 'ε ∘ (η ⊗ id) = id',
        interpretation: 'Embed then evaluate gives identity',
      },
      right: {
        statement: 'Hom(A, ε) ∘ η = id',
        interpretation: 'Embed then apply gives identity',
      },
    },

    concreteExamples: [
      {
        object: 'M = ℤ as ℤ-module',
        unitApplication: 'η_ℤ(n)(a) = n ⊗ a = na',
        counitApplication: 'ε_N(f ⊗ a) = f(a)',
      },
      {
        object: 'A = ℝⁿ, M = ℝᵐ as ℝ-modules',
        unitApplication: 'η embeds vectors as multiplication operators',
        counitApplication: 'ε evaluates linear maps',
      },
    ],

    preservation: {
      leftPreserves: ['Colimits', 'Right-exact (preserves cokernels)'],
      rightPreserves: ['Limits', 'Left-exact (preserves kernels)'],
    },

    intuition: 'Tensor product and Hom are dual operations. Tensoring is "multiplication", Hom is "division".',
    keyInsight: 'Hom_R(M ⊗_R A, N) ≅ Hom_R(M, Hom_R(A, N)). This is fundamental in homological algebra.',
    applications: [
      'Ext and Tor functors in homological algebra',
      'Derived categories',
      'Sheaf cohomology',
    ],
  },

  diagonalProduct: {
    id: 'diagonalProduct',
    name: 'Δ ⊣ ×',
    description: 'Diagonal functor is left adjoint to product (in some 2-categories)',

    leftAdjoint: {
      name: 'Diagonal Functor',
      notation: 'Δ: 𝒞 → 𝒞 × 𝒞',
      description: 'Δ(A) = (A, A)',
      sourceCategory: '𝒞',
      targetCategory: '𝒞 × 𝒞',
    },

    rightAdjoint: {
      name: 'Product Functor',
      notation: '×: 𝒞 × 𝒞 → 𝒞',
      description: '(A, B) ↦ A × B',
      sourceCategory: '𝒞 × 𝒞',
      targetCategory: '𝒞',
    },

    unit: {
      name: 'Unit',
      notation: 'η: id ⇒ × ∘ Δ',
      description: 'η_A: A → Δ(A) = A × A',
      concreteExample: 'η_A(a) = (a, a) (diagonal map)',
      interpretation: 'Duplicate an element',
    },

    counit: {
      name: 'Counit',
      notation: 'ε: Δ ∘ × ⇒ id',
      description: 'ε_(A,B): (A × B, A × B) → (A, B)',
      concreteExample: 'ε sends (a, b) to the pair of projections',
      interpretation: 'Extract components',
    },

    triangleIdentities: {
      left: {
        statement: 'ε ∘ Δ(η) = id',
        interpretation: 'Diagonal then project gives identity',
      },
      right: {
        statement: '×(ε) ∘ η = id',
        interpretation: 'Duplicate then combine gives identity',
      },
    },

    concreteExamples: [
      {
        object: 'A = {1, 2, 3}',
        unitApplication: 'η_A: 1 ↦ (1, 1), 2 ↦ (2, 2), 3 ↦ (3, 3)',
        counitApplication: 'ε projects (a, b) to components',
      },
    ],

    preservation: {
      leftPreserves: ['All limits and colimits (diagonal is both left and right adjoint in different contexts)'],
      rightPreserves: ['Limits'],
    },

    intuition: 'Diagonal and product are dual operations. Diagonal duplicates, product combines.',
    keyInsight: 'This adjunction is fundamental to understanding limits: lim D is the right adjoint to the diagonal functor.',
    applications: [
      'Definition of limits and colimits',
      'Kan extensions',
      'Comonads and comonoidal structures',
    ],
  },

  leftRightKan: {
    id: 'leftRightKan',
    name: 'Lan ⊣ Ran',
    description: 'Left and right Kan extensions (generalization of all adjunctions)',

    leftAdjoint: {
      name: 'Left Kan Extension',
      notation: 'Lan_K: [𝒞, ℰ] → [𝒟, ℰ]',
      description: 'Extends functors along K: 𝒞 → 𝒟',
      sourceCategory: '[𝒞, ℰ]',
      targetCategory: '[𝒟, ℰ]',
    },

    rightAdjoint: {
      name: 'Right Kan Extension',
      notation: 'Ran_K: [𝒞, ℰ] → [𝒟, ℰ]',
      description: 'Extends functors along K: 𝒞 → 𝒟',
      sourceCategory: '[𝒞, ℰ]',
      targetCategory: '[𝒟, ℰ]',
    },

    unit: {
      name: 'Unit',
      notation: 'η: id ⇒ K^* ∘ Lan_K',
      description: 'Natural transformation from F to (Lan_K F) ∘ K',
      concreteExample: 'Universal extension property',
      interpretation: 'F is the restriction of its left Kan extension',
    },

    counit: {
      name: 'Counit',
      notation: 'ε: Lan_K ∘ K^* ⇒ id',
      description: 'Natural transformation from Lan_K(G ∘ K) to G',
      concreteExample: 'Evaluation at extended values',
      interpretation: 'Left Kan extension of a restriction is the original functor',
    },

    triangleIdentities: {
      left: {
        statement: 'ε ∘ Lan_K(η) = id',
        interpretation: 'Extension then restriction gives identity',
      },
      right: {
        statement: 'K^*(ε) ∘ η = id',
        interpretation: 'Restrict then extend gives identity',
      },
    },

    concreteExamples: [
      {
        object: 'K: Δ¹ → Δ² (simplicial extension)',
        unitApplication: 'Extend from 1-simplices to 2-simplices',
        counitApplication: 'Restrict extended functor back',
      },
    ],

    preservation: {
      leftPreserves: ['Colimits'],
      rightPreserves: ['Limits'],
    },

    intuition: 'Kan extensions are the "most universal" way to extend a functor along another functor.',
    keyInsight: 'ALL adjunctions can be expressed as Kan extensions! Lan and Ran generalize limits, colimits, sheafification, and more.',
    applications: [
      'Sheafification',
      'Derived functors',
      'Homotopy limits and colimits',
      'Adjoint functor theorem',
    ],
  },

  geometricLogic: {
    id: 'geometricLogic',
    name: 'f* ⊣ f₋₁ ⊣ f!',
    description: 'String of adjunctions for geometric morphisms (topos theory)',

    leftAdjoint: {
      name: 'Direct Image',
      notation: 'f*: Sh(X) → Sh(Y)',
      description: 'Pushforward sheaves along f: X → Y',
      sourceCategory: 'Sh(X)',
      targetCategory: 'Sh(Y)',
    },

    rightAdjoint: {
      name: 'Inverse Image',
      notation: 'f⁻¹: Sh(Y) → Sh(X)',
      description: 'Pullback sheaves along f',
      sourceCategory: 'Sh(Y)',
      targetCategory: 'Sh(X)',
    },

    unit: {
      name: 'Unit',
      notation: 'η: id ⇒ f* ∘ f⁻¹',
      description: 'Sheaf morphism from ℱ to f*(f⁻¹(ℱ))',
      concreteExample: 'For constant sheaf, this is the identity',
      interpretation: 'Pushforward of pullback approximates original sheaf',
    },

    counit: {
      name: 'Counit',
      notation: 'ε: f⁻¹ ∘ f* ⇒ id',
      description: 'Sheaf morphism from f⁻¹(f*(𝒢)) to 𝒢',
      concreteExample: 'Restriction map',
      interpretation: 'Pullback of pushforward restricts back to original',
    },

    triangleIdentities: {
      left: {
        statement: 'ε ∘ f⁻¹(η) = id',
        interpretation: 'Pullback then pushback gives identity',
      },
      right: {
        statement: 'f*(ε) ∘ η = id',
        interpretation: 'Pushforward then pullback gives identity',
      },
    },

    concreteExamples: [
      {
        object: 'f: {pt} → X (point inclusion)',
        unitApplication: 'η: ℱ → Γ(X, ℱ) (global sections)',
        counitApplication: 'ε: constant sheaf Γ(X, ℱ) → ℱ',
      },
    ],

    preservation: {
      leftPreserves: ['Finite limits (f⁻¹ is left exact)'],
      rightPreserves: ['Limits (f* is right adjoint)'],
    },

    intuition: 'Geometric morphisms are adjoint pairs (f⁻¹ ⊣ f*) between topoi, generalizing continuous maps between spaces.',
    keyInsight: 'In topos theory, EVERY geometric morphism is an adjunction. This is the bridge between logic and geometry!',
    applications: [
      'Grothendieck topoi and étale cohomology',
      'Sheaf semantics for intuitionistic logic',
      'Synthetic differential geometry',
    ],
  },
};

export function AdjunctionExplorer() {
  const [selectedAdjunction, setSelectedAdjunction] = useState<string>('freeForgetful');
  const [selectedExample, setSelectedExample] = useState<number>(0);
  const [showComponent, setShowComponent] = useState<'unit' | 'counit' | 'both'>('both');

  const adjunction = ADJUNCTION_EXAMPLES[selectedAdjunction];

  if (!adjunction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Adjunction Explorer</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore concrete adjoint functor pairs: Free ⊣ Forgetful, Tensor ⊣ Hom, and more.
          Verify unit/counit and triangle identities interactively.
        </p>
      </div>

      {/* Adjunction Gallery */}
      <ConceptCard title="Adjunction Gallery" level="beginner">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(ADJUNCTION_EXAMPLES).map(([id, adj]) => (
            <motion.button
              key={id}
              onClick={() => setSelectedAdjunction(id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedAdjunction === id
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-bold text-sm mb-1">{adj.name}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                {adj.description}
              </div>
            </motion.button>
          ))}
        </div>
      </ConceptCard>

      {/* Selected Adjunction Details */}
      {adjunction && (
        <>
          {/* Name and Description */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{adjunction.name}</h3>
            <p className="text-muted-foreground mb-4">{adjunction.description}</p>
          </div>

          {/* The Functors */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Adjoint */}
            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                LEFT ADJOINT
              </div>
              <div className="font-bold mb-1">{adjunction.leftAdjoint.name}</div>
              <div className="font-mono text-sm mb-2 text-blue-700 dark:text-blue-300">
                {adjunction.leftAdjoint.notation}
              </div>
              <div className="text-sm text-muted-foreground">
                {adjunction.leftAdjoint.description}
              </div>
              <div className="text-xs mt-2 text-blue-600 dark:text-blue-400">
                {adjunction.leftAdjoint.sourceCategory} → {adjunction.leftAdjoint.targetCategory}
              </div>
            </div>

            {/* Right Adjoint */}
            <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border-2 border-orange-200 dark:border-orange-800">
              <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-2">
                RIGHT ADJOINT
              </div>
              <div className="font-bold mb-1">{adjunction.rightAdjoint.name}</div>
              <div className="font-mono text-sm mb-2 text-orange-700 dark:text-orange-300">
                {adjunction.rightAdjoint.notation}
              </div>
              <div className="text-sm text-muted-foreground">
                {adjunction.rightAdjoint.description}
              </div>
              <div className="text-xs mt-2 text-orange-600 dark:text-orange-400">
                {adjunction.rightAdjoint.sourceCategory} → {adjunction.rightAdjoint.targetCategory}
              </div>
            </div>
          </div>

          {/* Component Selector */}
          <div className="flex justify-center gap-2">
            {['unit', 'counit', 'both'].map((comp) => (
              <button
                key={comp}
                onClick={() => setShowComponent(comp as typeof showComponent)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  showComponent === comp
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                }`}
              >
                {comp === 'both' ? 'Both' : comp === 'unit' ? 'Unit (η)' : 'Counit (ε)'}
              </button>
            ))}
          </div>

          {/* Unit */}
          {(showComponent === 'unit' || showComponent === 'both') && (
            <ConceptCard title="Unit (η)" level="intermediate">
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-sm mb-1">Notation:</div>
                  <div className="font-mono text-sm bg-green-50 dark:bg-green-950 p-3 rounded">
                    {adjunction.unit.notation}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-sm mb-1">Description:</div>
                  <div className="text-sm text-muted-foreground">
                    {adjunction.unit.description}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-sm mb-1">Concrete Example:</div>
                  <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    {adjunction.unit.concreteExample}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-sm mb-1">Interpretation:</div>
                  <div className="text-sm italic text-muted-foreground">
                    "{adjunction.unit.interpretation}"
                  </div>
                </div>
              </div>
            </ConceptCard>
          )}

          {/* Counit */}
          {(showComponent === 'counit' || showComponent === 'both') && (
            <ConceptCard title="Counit (ε)" level="intermediate">
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-sm mb-1">Notation:</div>
                  <div className="font-mono text-sm bg-orange-50 dark:bg-orange-950 p-3 rounded">
                    {adjunction.counit.notation}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-sm mb-1">Description:</div>
                  <div className="text-sm text-muted-foreground">
                    {adjunction.counit.description}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-sm mb-1">Concrete Example:</div>
                  <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    {adjunction.counit.concreteExample}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-sm mb-1">Interpretation:</div>
                  <div className="text-sm italic text-muted-foreground">
                    "{adjunction.counit.interpretation}"
                  </div>
                </div>
              </div>
            </ConceptCard>
          )}

          {/* Triangle Identities */}
          <ConceptCard title="Triangle Identities" level="advanced">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-3">
                The unit and counit must satisfy two crucial identities:
              </div>

              {/* Left Triangle */}
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                <div className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-100">
                  Left Triangle Identity
                </div>
                <div className="font-mono text-sm mb-2 bg-white dark:bg-gray-900 p-3 rounded">
                  {adjunction.triangleIdentities.left.statement}
                </div>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <span className="font-semibold">Meaning: </span>
                  {adjunction.triangleIdentities.left.interpretation}
                </div>
              </div>

              {/* Right Triangle */}
              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                <div className="font-semibold text-sm mb-2 text-orange-900 dark:text-orange-100">
                  Right Triangle Identity
                </div>
                <div className="font-mono text-sm mb-2 bg-white dark:bg-gray-900 p-3 rounded">
                  {adjunction.triangleIdentities.right.statement}
                </div>
                <div className="text-sm text-orange-800 dark:text-orange-200">
                  <span className="font-semibold">Meaning: </span>
                  {adjunction.triangleIdentities.right.interpretation}
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-sm">
                  <span className="font-semibold">Why "Triangle"? </span>
                  These identities form triangular commutative diagrams. They ensure that
                  the adjunction is "coherent" - the unit and counit work together correctly.
                </div>
              </div>
            </div>
          </ConceptCard>

          {/* Concrete Examples */}
          <ConceptCard title="Concrete Examples" level="beginner">
            <div className="space-y-4">
              {/* Example Selector */}
              <div className="flex gap-2 flex-wrap">
                {adjunction.concreteExamples.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedExample(idx)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedExample === idx
                        ? 'border-green-500 bg-green-50 dark:bg-green-950'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    Example {idx + 1}
                  </button>
                ))}
              </div>

              {/* Selected Example */}
              {adjunction.concreteExamples[selectedExample] && (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border space-y-3">
                  <div>
                    <div className="font-semibold text-sm mb-1">Object:</div>
                    <div className="font-mono text-sm">
                      {adjunction.concreteExamples[selectedExample].object}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-sm mb-1">Unit Application:</div>
                    <div className="font-mono text-xs bg-green-50 dark:bg-green-950 p-3 rounded">
                      {adjunction.concreteExamples[selectedExample].unitApplication}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-sm mb-1">Counit Application:</div>
                    <div className="font-mono text-xs bg-orange-50 dark:bg-orange-950 p-3 rounded">
                      {adjunction.concreteExamples[selectedExample].counitApplication}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ConceptCard>

          {/* Preservation Properties */}
          <ConceptCard title="Preservation Properties" level="advanced">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <div className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                  Left Adjoint Preserves:
                </div>
                <ul className="space-y-1">
                  {adjunction.preservation.leftPreserves.map((item, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                <div className="font-semibold mb-2 text-orange-900 dark:text-orange-100">
                  Right Adjoint Preserves:
                </div>
                <ul className="space-y-1">
                  {adjunction.preservation.rightPreserves.map((item, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="text-sm font-semibold mb-1">Fundamental Theorem:</div>
              <div className="text-sm">
                Left adjoints <strong>always</strong> preserve colimits.
                Right adjoints <strong>always</strong> preserve limits.
                This is automatic from the adjunction!
              </div>
            </div>
          </ConceptCard>

          {/* Intuition and Key Insight */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <div className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                💡 Intuition
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                {adjunction.intuition}
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
              <div className="font-semibold mb-2 text-purple-900 dark:text-purple-100">
                🔑 Key Insight
              </div>
              <div className="text-sm text-purple-800 dark:text-purple-200">
                {adjunction.keyInsight}
              </div>
            </div>
          </div>

          {/* Applications */}
          <ConceptCard title="Applications" level="advanced">
            <ul className="space-y-2">
              {adjunction.applications.map((app, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-purple-600 mr-2 mt-1">▸</span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </ConceptCard>

          {/* Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
            <div className="font-bold text-lg mb-3">Why Adjunctions Matter</div>
            <div className="space-y-2 text-sm">
              <p>
                Adjunctions are the <strong>soul</strong> of category theory. They capture the
                relationship between "free" and "forgetful," "left" and "right," "syntax" and "semantics."
              </p>
              <p>
                The slogan: <em>"Adjoint functors arise everywhere"</em> - Mac Lane
              </p>
              <p className="font-semibold mt-4">
                Every adjunction gives rise to a monad (T = R ∘ L) and a comonad (D = L ∘ R),
                which are the foundation of monadic programming, algebraic effects, and homological algebra!
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
