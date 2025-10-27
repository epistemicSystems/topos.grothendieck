import React, { useState, useMemo } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AdjunctionVerifier
 *
 * Interactive builder and verifier for adjoint functors.
 * Students construct adjunctions, define unit/counit, and verify triangle identities.
 *
 * Features:
 * - Build custom adjunctions
 * - Define unit and counit natural transformations
 * - Automatic triangle identity verification
 * - Bijection Hom_C(F(D), C) ≅ Hom_D(D, U(C)) checking
 * - Preset adjunctions for exploration
 * - Step-by-step verification guide
 * - Counterexamples that fail adjunction conditions
 */

interface Adjunction {
  name: string;
  leftFunctor: {
    name: string;
    notation: string;
    sourceCategory: string;
    targetCategory: string;
  };
  rightFunctor: {
    name: string;
    notation: string;
    sourceCategory: string;
    targetCategory: string;
  };
  unit: {
    components: Array<{
      object: string;
      morphism: string;
      description: string;
    }>;
  };
  counit: {
    components: Array<{
      object: string;
      morphism: string;
      description: string;
    }>;
  };
  verificationSteps: Array<{
    step: string;
    description: string;
    result: 'pass' | 'fail' | 'pending';
    details: string;
  }>;
}

const PRESET_ADJUNCTIONS: Record<string, Adjunction> = {
  freeForgetful: {
    name: 'Free ⊣ Forgetful (Groups)',
    leftFunctor: {
      name: 'Free',
      notation: 'F: Set → Grp',
      sourceCategory: 'Set',
      targetCategory: 'Grp',
    },
    rightFunctor: {
      name: 'Forgetful',
      notation: 'U: Grp → Set',
      sourceCategory: 'Grp',
      targetCategory: 'Set',
    },
    unit: {
      components: [
        {
          object: 'S = {a, b}',
          morphism: 'η_S: S → U(F(S))',
          description: 'η_S(a) = word "a", η_S(b) = word "b" (embed as generators)',
        },
        {
          object: 'S = {x}',
          morphism: 'η_S: {x} → U(F({x}))',
          description: 'η_S(x) = word "x" (single generator)',
        },
      ],
    },
    counit: {
      components: [
        {
          object: 'G = ℤ',
          morphism: 'ε_ℤ: F(U(ℤ)) → ℤ',
          description: 'ε evaluates words of integers as sums: "3 · (-2) · 5" ↦ 3 - 2 + 5 = 6',
        },
        {
          object: 'G = ℤ/2ℤ',
          morphism: 'ε_{ℤ/2ℤ}: F(U(ℤ/2ℤ)) → ℤ/2ℤ',
          description: 'ε evaluates words in {0, 1} using ℤ/2ℤ addition',
        },
      ],
    },
    verificationSteps: [
      {
        step: '1. Unit naturality',
        description: 'Check η: id_Set ⇒ U ∘ F is a natural transformation',
        result: 'pass',
        details: 'For any f: S → T, we have U(F(f)) ∘ η_S = η_T ∘ f (naturality square commutes)',
      },
      {
        step: '2. Counit naturality',
        description: 'Check ε: F ∘ U ⇒ id_Grp is a natural transformation',
        result: 'pass',
        details: 'For any φ: G → H, we have φ ∘ ε_G = ε_H ∘ F(U(φ)) (naturality square commutes)',
      },
      {
        step: '3. Left triangle identity',
        description: 'Check (ε ∘ F) · (F ∘ η) = id_F',
        result: 'pass',
        details: 'Embed S into U(F(S)), apply F, then evaluate: gives back F(S) unchanged',
      },
      {
        step: '4. Right triangle identity',
        description: 'Check (U ∘ ε) · (η ∘ U) = id_U',
        result: 'pass',
        details: 'Embed U(G) as generators, evaluate: gives back U(G) unchanged',
      },
      {
        step: '5. Hom-set bijection',
        description: 'Check Hom_Grp(F(S), G) ≅ Hom_Set(S, U(G))',
        result: 'pass',
        details: 'Every function S → U(G) extends uniquely to a homomorphism F(S) → G (universal property)',
      },
    ],
  },

  productHom: {
    name: '(– × A) ⊣ Hom(A, –) (Currying)',
    leftFunctor: {
      name: 'Product with A',
      notation: '(– × A): Set → Set',
      sourceCategory: 'Set',
      targetCategory: 'Set',
    },
    rightFunctor: {
      name: 'Function Space',
      notation: 'A → (–): Set → Set',
      sourceCategory: 'Set',
      targetCategory: 'Set',
    },
    unit: {
      components: [
        {
          object: 'B',
          morphism: 'η_B: B → (A → B × A)',
          description: 'η_B(b) = λa. (b, a) (curry: embed b as constant function)',
        },
      ],
    },
    counit: {
      components: [
        {
          object: 'C',
          morphism: 'ε_C: (A → C) × A → C',
          description: 'ε_C(f, a) = f(a) (evaluation: apply function to argument)',
        },
      ],
    },
    verificationSteps: [
      {
        step: '1. Unit naturality',
        description: 'Check η: id ⇒ (A → (– × A)) is natural',
        result: 'pass',
        details: 'For any f: B → C, currying commutes with post-composition',
      },
      {
        step: '2. Counit naturality',
        description: 'Check ε: (A → –) × A ⇒ id is natural',
        result: 'pass',
        details: 'Evaluation is natural in the target',
      },
      {
        step: '3. Left triangle identity',
        description: 'Check ε ∘ (η × id_A) = id',
        result: 'pass',
        details: 'Curry then evaluate: (b, a) ↦ (λa\'. (b, a\'), a) ↦ (b, a)',
      },
      {
        step: '4. Right triangle identity',
        description: 'Check (A → ε) ∘ η = id',
        result: 'pass',
        details: 'Embed then apply: f ↦ (λa. λa\'. (f(a), a\')) ↦ f',
      },
      {
        step: '5. Hom-set bijection',
        description: 'Check Hom(B × A, C) ≅ Hom(B, A → C)',
        result: 'pass',
        details: 'Curry/uncurry bijection: f: B × A → C ↔ λb. λa. f(b, a)',
      },
    ],
  },

  diagonalProduct: {
    name: 'Δ ⊣ × (Diagonal and Product)',
    leftFunctor: {
      name: 'Diagonal',
      notation: 'Δ: Set → Set × Set',
      sourceCategory: 'Set',
      targetCategory: 'Set × Set',
    },
    rightFunctor: {
      name: 'Product',
      notation: '×: Set × Set → Set',
      sourceCategory: 'Set × Set',
      targetCategory: 'Set',
    },
    unit: {
      components: [
        {
          object: 'A',
          morphism: 'η_A: A → A × A',
          description: 'η_A(a) = (a, a) (diagonal map: duplicate element)',
        },
      ],
    },
    counit: {
      components: [
        {
          object: '(A, B)',
          morphism: 'ε_(A,B): A × B → (A, B)',
          description: 'ε sends pairs (a, b) to the pair (π₁, π₂)',
        },
      ],
    },
    verificationSteps: [
      {
        step: '1. Unit naturality',
        description: 'Check η: id ⇒ × ∘ Δ is natural',
        result: 'pass',
        details: 'Diagonal map is natural: commutes with all functions',
      },
      {
        step: '2. Counit naturality',
        description: 'Check ε: Δ ∘ × ⇒ id is natural',
        result: 'pass',
        details: 'Projection extraction is natural',
      },
      {
        step: '3. Left triangle identity',
        description: 'Check ε ∘ Δ(η) = id',
        result: 'pass',
        details: 'Duplicate then project: a ↦ (a, a) ↦ (π₁, π₂) gives identities',
      },
      {
        step: '4. Right triangle identity',
        description: 'Check ×(ε) ∘ η = id',
        result: 'pass',
        details: 'Diagonal then combine: (a, b) ↦ ((a,b), (a,b)) ↦ (a, b)',
      },
      {
        step: '5. Hom-set bijection',
        description: 'Check Hom(Δ(A), (B, C)) ≅ Hom(A, B × C)',
        result: 'pass',
        details: 'Functions from A to pairs correspond to pairs of functions from A',
      },
    ],
  },

  brokenExample: {
    name: '❌ Broken: "Forgetful ⊣ Free" (Wrong Direction!)',
    leftFunctor: {
      name: 'Forgetful',
      notation: 'U: Grp → Set',
      sourceCategory: 'Grp',
      targetCategory: 'Set',
    },
    rightFunctor: {
      name: 'Free',
      notation: 'F: Set → Grp',
      sourceCategory: 'Set',
      targetCategory: 'Grp',
    },
    unit: {
      components: [
        {
          object: 'G',
          morphism: 'η_G: G → F(U(G))',
          description: 'Attempt: embed group into free group on its underlying set',
        },
      ],
    },
    counit: {
      components: [
        {
          object: 'S',
          morphism: 'ε_S: U(F(S)) → S',
          description: 'Attempt: extract elements from underlying set of free group',
        },
      ],
    },
    verificationSteps: [
      {
        step: '1. Unit naturality',
        description: 'Check η: id_Grp ⇒ F ∘ U is natural',
        result: 'fail',
        details: 'Unit would need to be a homomorphism G → F(U(G)), but this is not generally surjective!',
      },
      {
        step: '2. Counit naturality',
        description: 'Check ε: U ∘ F ⇒ id_Set is natural',
        result: 'fail',
        details: 'Counit cannot "forget" the group structure - no canonical map U(F(S)) → S exists',
      },
      {
        step: '3. Left triangle identity',
        description: 'Check (ε ∘ U) · (U ∘ η) = id_U',
        result: 'fail',
        details: 'Triangle identities fail because the direction is wrong',
      },
      {
        step: '4. Right triangle identity',
        description: 'Check (F ∘ ε) · (η ∘ F) = id_F',
        result: 'fail',
        details: 'Cannot extract then embed and get back the original',
      },
      {
        step: '5. Hom-set bijection',
        description: 'Check Hom_Set(U(G), S) ≅ Hom_Grp(G, F(S))',
        result: 'fail',
        details: 'This bijection DOES NOT exist! Every set map extends to a homomorphism, not the other way around.',
      },
    ],
  },
};

export function AdjunctionVerifier() {
  const [selectedAdjunction, setSelectedAdjunction] = useState<keyof typeof PRESET_ADJUNCTIONS>('freeForgetful');
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const adjunction = PRESET_ADJUNCTIONS[selectedAdjunction];

  const allStepsPass = adjunction.verificationSteps.every(step => step.result === 'pass');

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Adjunction Verifier</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Build and verify adjoint functors. Define unit/counit natural transformations
          and check triangle identities step-by-step.
        </p>
      </div>

      {/* Adjunction Selector */}
      <ConceptCard title="Select an Adjunction to Verify" level="beginner">
        <div className="grid md:grid-cols-2 gap-3">
          {Object.entries(PRESET_ADJUNCTIONS).map(([key, adj]) => (
            <motion.button
              key={key}
              onClick={() => {
                setSelectedAdjunction(key as keyof typeof PRESET_ADJUNCTIONS);
                setShowVerification(false);
                setExpandedStep(null);
              }}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedAdjunction === key
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-bold">{adj.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {adj.leftFunctor.notation} ⊣ {adj.rightFunctor.notation}
              </div>
            </motion.button>
          ))}
        </div>
      </ConceptCard>

      {/* Selected Adjunction Overview */}
      {adjunction && (
        <>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold mb-4">{adjunction.name}</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Left Adjoint */}
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="text-xs font-semibold text-blue-600 mb-2">LEFT ADJOINT</div>
                <div className="font-semibold">{adjunction.leftFunctor.name}</div>
                <div className="font-mono text-sm text-muted-foreground">
                  {adjunction.leftFunctor.notation}
                </div>
              </div>

              {/* Right Adjoint */}
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="text-xs font-semibold text-orange-600 mb-2">RIGHT ADJOINT</div>
                <div className="font-semibold">{adjunction.rightFunctor.name}</div>
                <div className="font-mono text-sm text-muted-foreground">
                  {adjunction.rightFunctor.notation}
                </div>
              </div>
            </div>
          </div>

          {/* Unit Components */}
          <ConceptCard title="Unit (η)" level="intermediate">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground mb-3">
                Natural transformation η: id ⇒ {adjunction.rightFunctor.name} ∘ {adjunction.leftFunctor.name}
              </div>

              {adjunction.unit.components.map((comp, idx) => (
                <div key={idx} className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border">
                  <div className="font-mono text-sm font-semibold mb-1">{comp.object}</div>
                  <div className="font-mono text-xs text-green-700 dark:text-green-300 mb-2">
                    {comp.morphism}
                  </div>
                  <div className="text-sm text-muted-foreground">{comp.description}</div>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Counit Components */}
          <ConceptCard title="Counit (ε)" level="intermediate">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground mb-3">
                Natural transformation ε: {adjunction.leftFunctor.name} ∘ {adjunction.rightFunctor.name} ⇒ id
              </div>

              {adjunction.counit.components.map((comp, idx) => (
                <div key={idx} className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border">
                  <div className="font-mono text-sm font-semibold mb-1">{comp.object}</div>
                  <div className="font-mono text-xs text-orange-700 dark:text-orange-300 mb-2">
                    {comp.morphism}
                  </div>
                  <div className="text-sm text-muted-foreground">{comp.description}</div>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Verify Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={() => setShowVerification(true)}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔍 Verify Adjunction
            </motion.button>
          </div>

          {/* Verification Results */}
          <AnimatePresence>
            {showVerification && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ConceptCard title="Verification Results" level="advanced">
                  {/* Overall Status */}
                  <motion.div
                    className={`p-6 rounded-lg border-2 mb-6 ${
                      allStepsPass
                        ? 'bg-green-50 dark:bg-green-950 border-green-500'
                        : 'bg-red-50 dark:bg-red-950 border-red-500'
                    }`}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold">
                          {allStepsPass ? '✓ Valid Adjunction' : '✗ Not an Adjunction'}
                        </div>
                        <div className="text-sm mt-1">
                          {allStepsPass
                            ? 'All verification steps passed!'
                            : 'Some verification steps failed. See details below.'}
                        </div>
                      </div>
                      <div className="text-4xl">{allStepsPass ? '✓' : '✗'}</div>
                    </div>
                  </motion.div>

                  {/* Verification Steps */}
                  <div className="space-y-3">
                    {adjunction.verificationSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          expandedStep === idx
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                            : step.result === 'pass'
                            ? 'border-green-200 hover:border-green-300 dark:border-green-800'
                            : 'border-red-200 hover:border-red-300 dark:border-red-800'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        {/* Step Header */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold">{step.step}</div>
                          <div
                            className={`text-xl font-bold ${
                              step.result === 'pass' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {step.result === 'pass' ? '✓' : '✗'}
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground mb-2">{step.description}</div>

                        {/* Expanded Details */}
                        {expandedStep === idx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t"
                          >
                            <div className="text-sm bg-white dark:bg-gray-900 p-3 rounded">
                              <span className="font-semibold">Details: </span>
                              {step.details}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </ConceptCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explanation */}
          <ConceptCard title="What Makes an Adjunction?" level="beginner">
            <div className="space-y-3 text-sm">
              <p>
                An adjunction F ⊣ U between functors F: 𝒟 → 𝒞 and U: 𝒞 → 𝒟 consists of:
              </p>

              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>
                  <strong>Unit:</strong> Natural transformation η: id_𝒟 ⇒ U ∘ F
                </li>
                <li>
                  <strong>Counit:</strong> Natural transformation ε: F ∘ U ⇒ id_𝒞
                </li>
                <li>
                  <strong>Triangle Identities:</strong> Two equations relating η and ε
                </li>
              </ol>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
                  <div className="font-semibold mb-2">Left Triangle:</div>
                  <div className="font-mono text-xs">(ε_F) ∘ F(η) = id_F</div>
                  <div className="text-xs mt-2 text-muted-foreground">
                    Apply F, embed, then evaluate: gives back F
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
                  <div className="font-semibold mb-2">Right Triangle:</div>
                  <div className="font-mono text-xs">U(ε) ∘ (η_U) = id_U</div>
                  <div className="text-xs mt-2 text-muted-foreground">
                    Embed then evaluate via U: gives back U
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
                <div className="font-semibold mb-2">Equivalent Characterization:</div>
                <div>
                  Adjunction ⇔ Natural bijection: <span className="font-mono">Hom_𝒞(F(D), C) ≅ Hom_𝒟(D, U(C))</span>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
                <div className="font-semibold mb-2">Key Insight:</div>
                <div>
                  Adjunctions capture "optimal solutions" to problems. The left adjoint F builds the
                  "freest" or "most efficient" structure, while the right adjoint U forgets structure.
                  The unit and counit encode this relationship precisely!
                </div>
              </div>
            </div>
          </ConceptCard>

          {/* Exercise */}
          <ConceptCard title="Exercise: Why Does the Broken Example Fail?" level="advanced">
            <div className="space-y-3 text-sm">
              <p>
                Try the "Broken: Forgetful ⊣ Free" example and see why every verification step fails.
                Key questions to consider:
              </p>

              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Can you always embed a group G into F(U(G))? What about cyclic groups?</li>
                <li>Is there a canonical way to "forget" the free group structure?</li>
                <li>Which direction does the Hom-set bijection actually go?</li>
              </ul>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800 mt-4">
                <div className="font-semibold mb-2">⚠️ Common Mistake:</div>
                <div>
                  The direction of adjunction matters! F ⊣ U means F is the <strong>left</strong> adjoint.
                  Free is left adjoint to Forgetful, not the other way around. Reversing the direction
                  breaks everything!
                </div>
              </div>
            </div>
          </ConceptCard>
        </>
      )}
    </div>
  );
}
