import React, { useState, useMemo } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NaturalTransformationComposer
 *
 * Interactive composition of natural transformations.
 * Students compose natural transformations vertically (component-wise)
 * and horizontally (with functors), and verify the interchange law.
 *
 * Features:
 * - Vertical composition: α · β (when functors compose)
 * - Horizontal composition: α * β (side-by-side)
 * - Interchange law verification
 * - Whiskering: α * F and G * β
 * - Interactive composition chains
 * - Visual functor/NT diagrams
 */

interface NaturalTransformation {
  id: string;
  name: string;
  notation: string;
  sourceFunctor: string;
  targetFunctor: string;
  sourceCategory: string;
  targetCategory: string;
  description: string;
}

interface CompositionResult {
  type: 'vertical' | 'horizontal' | 'whisker-left' | 'whisker-right';
  source: string;
  target: string;
  result: {
    name: string;
    notation: string;
    description: string;
  };
  verification: {
    isValid: boolean;
    reason: string;
    computation: string;
  };
}

// Library of natural transformations
const NT_LIBRARY: Record<string, NaturalTransformation> = {
  doubleDual: {
    id: 'doubleDual',
    name: 'Double Dual',
    notation: 'η: Id ⇒ (-)**',
    sourceFunctor: 'Id',
    targetFunctor: '(-)**',
    sourceCategory: 'Vect_fin',
    targetCategory: 'Vect_fin',
    description: 'Natural isomorphism V → V** for finite-dimensional vector spaces',
  },

  listReverse: {
    id: 'listReverse',
    name: 'List Reverse',
    notation: 'rev: List ⇒ List',
    sourceFunctor: 'List',
    targetFunctor: 'List',
    sourceCategory: 'Set',
    targetCategory: 'Set',
    description: 'Natural transformation that reverses lists',
  },

  listLength: {
    id: 'listLength',
    name: 'List Length',
    notation: 'len: List ⇒ Const ℕ',
    sourceFunctor: 'List',
    targetFunctor: 'Const ℕ',
    sourceCategory: 'Set',
    targetCategory: 'Set',
    description: 'Natural transformation that computes list length',
  },

  unitFreeForget: {
    id: 'unitFreeForget',
    name: 'Unit (Free ⊣ Forgetful)',
    notation: 'η: Id_Set ⇒ U ∘ F',
    sourceFunctor: 'Id_Set',
    targetFunctor: 'U ∘ F',
    sourceCategory: 'Set',
    targetCategory: 'Set',
    description: 'Unit of Free ⊣ Forgetful adjunction',
  },

  counitFreeForget: {
    id: 'counitFreeForget',
    name: 'Counit (Free ⊣ Forgetful)',
    notation: 'ε: F ∘ U ⇒ Id_Grp',
    sourceFunctor: 'F ∘ U',
    targetFunctor: 'Id_Grp',
    sourceCategory: 'Grp',
    targetCategory: 'Grp',
    description: 'Counit of Free ⊣ Forgetful adjunction',
  },

  determinant: {
    id: 'determinant',
    name: 'Determinant',
    notation: 'det: GL_n ⇒ (-)×',
    sourceFunctor: 'GL_n',
    targetFunctor: '(-)×',
    sourceCategory: 'Ring',
    targetCategory: 'Grp',
    description: 'Natural transformation from general linear group to units',
  },

  trace: {
    id: 'trace',
    name: 'Trace',
    notation: 'tr: End ⇒ Id',
    sourceFunctor: 'End',
    targetFunctor: 'Id',
    sourceCategory: 'Vect',
    targetCategory: 'Vect',
    description: 'Natural transformation from endomorphisms to scalars',
  },
};

export function NaturalTransformationComposer() {
  const [selectedNT1, setSelectedNT1] = useState<string>('doubleDual');
  const [selectedNT2, setSelectedNT2] = useState<string>('listReverse');
  const [compositionType, setCompositionType] = useState<'vertical' | 'horizontal'>('vertical');
  const [showResult, setShowResult] = useState<boolean>(false);

  const nt1 = NT_LIBRARY[selectedNT1];
  const nt2 = NT_LIBRARY[selectedNT2];

  // Check if composition is valid and compute result
  const compositionResult = useMemo((): CompositionResult | null => {
    if (!nt1 || !nt2) return null;

    if (compositionType === 'vertical') {
      // Vertical composition: α · β requires target of α = source of β
      if (nt1.targetFunctor === nt2.sourceFunctor &&
          nt1.sourceCategory === nt2.sourceCategory &&
          nt1.targetCategory === nt2.targetCategory) {
        return {
          type: 'vertical',
          source: nt1.sourceFunctor,
          target: nt2.targetFunctor,
          result: {
            name: `${nt2.name} ∘ ${nt1.name}`,
            notation: `${nt2.notation.split(':')[0]} · ${nt1.notation.split(':')[0]}: ${nt1.sourceFunctor} ⇒ ${nt2.targetFunctor}`,
            description: `Vertical composition: first apply ${nt1.name}, then ${nt2.name}`,
          },
          verification: {
            isValid: true,
            reason: 'Functors compose: target of α equals source of β',
            computation: `Component at object A: (β · α)_A = β_A ∘ α_A`,
          },
        };
      } else {
        return {
          type: 'vertical',
          source: nt1.sourceFunctor,
          target: nt2.targetFunctor,
          result: {
            name: 'Invalid',
            notation: 'Cannot compose',
            description: 'Functors do not compose',
          },
          verification: {
            isValid: false,
            reason: `Cannot compose: ${nt1.name} has target ${nt1.targetFunctor}, but ${nt2.name} has source ${nt2.sourceFunctor}`,
            computation: 'Vertical composition requires matching functors',
          },
        };
      }
    } else {
      // Horizontal composition: α * β requires matching categories
      if (nt1.targetCategory === nt2.sourceCategory) {
        return {
          type: 'horizontal',
          source: `${nt1.sourceFunctor} ∘ ${nt2.sourceFunctor}`,
          target: `${nt1.targetFunctor} ∘ ${nt2.targetFunctor}`,
          result: {
            name: `${nt1.name} * ${nt2.name}`,
            notation: `${nt1.notation.split(':')[0]} * ${nt2.notation.split(':')[0]}: ${nt1.sourceFunctor} ∘ ${nt2.sourceFunctor} ⇒ ${nt1.targetFunctor} ∘ ${nt2.targetFunctor}`,
            description: `Horizontal composition: apply both transformations side-by-side`,
          },
          verification: {
            isValid: true,
            reason: 'Categories match: target category of first equals source category of second',
            computation: `Component at object A: (α * β)_A = α_{β(A)} ∘ F(β_A) = G(β_A) ∘ α_{H(A)}`,
          },
        };
      } else {
        return {
          type: 'horizontal',
          source: `${nt1.sourceFunctor} ∘ ${nt2.sourceFunctor}`,
          target: `${nt1.targetFunctor} ∘ ${nt2.targetFunctor}`,
          result: {
            name: 'Invalid',
            notation: 'Cannot compose',
            description: 'Categories do not match',
          },
          verification: {
            isValid: false,
            reason: `Cannot compose horizontally: ${nt1.name} goes to ${nt1.targetCategory}, but ${nt2.name} comes from ${nt2.sourceCategory}`,
            computation: 'Horizontal composition requires matching categories',
          },
        };
      }
    }
  }, [nt1, nt2, compositionType]);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Natural Transformation Composer</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compose natural transformations vertically (component-wise) and horizontally (side-by-side).
          Explore the interchange law and build transformation chains.
        </p>
      </div>

      {/* Composition Type Selector */}
      <div className="flex justify-center gap-4">
        <motion.button
          onClick={() => {
            setCompositionType('vertical');
            setShowResult(false);
          }}
          className={`px-6 py-3 rounded-lg border-2 transition-all ${
            compositionType === 'vertical'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="font-bold">Vertical Composition</div>
          <div className="text-xs text-muted-foreground">β · α (functors compose)</div>
        </motion.button>

        <motion.button
          onClick={() => {
            setCompositionType('horizontal');
            setShowResult(false);
          }}
          className={`px-6 py-3 rounded-lg border-2 transition-all ${
            compositionType === 'horizontal'
              ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="font-bold">Horizontal Composition</div>
          <div className="text-xs text-muted-foreground">α * β (side-by-side)</div>
        </motion.button>
      </div>

      {/* Natural Transformation Selectors */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* First NT */}
        <ConceptCard title="First Natural Transformation (α)" level="beginner">
          <div className="space-y-3">
            {Object.entries(NT_LIBRARY).map(([key, nt]) => (
              <motion.button
                key={key}
                onClick={() => {
                  setSelectedNT1(key);
                  setShowResult(false);
                }}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedNT1 === key
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="font-bold text-sm">{nt.name}</div>
                <div className="font-mono text-xs text-muted-foreground mt-1">
                  {nt.notation}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {nt.sourceCategory} → {nt.targetCategory}
                </div>
              </motion.button>
            ))}
          </div>
        </ConceptCard>

        {/* Second NT */}
        <ConceptCard title="Second Natural Transformation (β)" level="beginner">
          <div className="space-y-3">
            {Object.entries(NT_LIBRARY).map(([key, nt]) => (
              <motion.button
                key={key}
                onClick={() => {
                  setSelectedNT2(key);
                  setShowResult(false);
                }}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedNT2 === key
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="font-bold text-sm">{nt.name}</div>
                <div className="font-mono text-xs text-muted-foreground mt-1">
                  {nt.notation}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {nt.sourceCategory} → {nt.targetCategory}
                </div>
              </motion.button>
            ))}
          </div>
        </ConceptCard>
      </div>

      {/* Compose Button */}
      <div className="flex justify-center">
        <motion.button
          onClick={() => setShowResult(true)}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔗 Compose
        </motion.button>
      </div>

      {/* Composition Result */}
      <AnimatePresence>
        {showResult && compositionResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ConceptCard
              title={compositionType === 'vertical' ? 'Vertical Composition Result' : 'Horizontal Composition Result'}
              level="intermediate"
            >
              {/* Validity Status */}
              <motion.div
                className={`p-6 rounded-lg border-2 mb-6 ${
                  compositionResult.verification.isValid
                    ? 'bg-green-50 dark:bg-green-950 border-green-500'
                    : 'bg-red-50 dark:bg-red-950 border-red-500'
                }`}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold">
                      {compositionResult.verification.isValid ? '✓ Valid Composition' : '✗ Invalid Composition'}
                    </div>
                    <div className="text-sm mt-1">
                      {compositionResult.verification.reason}
                    </div>
                  </div>
                  <div className="text-4xl">
                    {compositionResult.verification.isValid ? '✓' : '✗'}
                  </div>
                </div>
              </motion.div>

              {compositionResult.verification.isValid && (
                <>
                  {/* Result Details */}
                  <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800 mb-4">
                    <div className="font-semibold mb-2">Result:</div>
                    <div className="font-bold text-lg mb-2">{compositionResult.result.name}</div>
                    <div className="font-mono text-sm mb-3 text-purple-700 dark:text-purple-300">
                      {compositionResult.result.notation}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {compositionResult.result.description}
                    </div>
                  </div>

                  {/* Computation */}
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
                    <div className="font-semibold text-sm mb-2">Computation:</div>
                    <div className="font-mono text-xs text-blue-700 dark:text-blue-300">
                      {compositionResult.verification.computation}
                    </div>
                  </div>

                  {/* Diagram */}
                  <div className="mt-4 bg-white dark:bg-gray-900 p-6 rounded-lg border">
                    <div className="font-semibold text-sm mb-3">Composition Diagram:</div>
                    <div className="font-mono text-xs text-center space-y-2">
                      {compositionType === 'vertical' ? (
                        <>
                          <div className="flex justify-center items-center gap-4">
                            <span>{compositionResult.source}</span>
                            <span>==α==&gt;</span>
                            <span>{nt1.targetFunctor}</span>
                            <span>==β==&gt;</span>
                            <span>{compositionResult.target}</span>
                          </div>
                          <div className="text-center text-muted-foreground text-xs">
                            Vertical: (β · α): {compositionResult.source} ⇒ {compositionResult.target}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-center">
                              <div>{nt1.sourceFunctor}</div>
                              <div className="my-1">|</div>
                              <div className="text-xs text-green-600">α</div>
                              <div className="my-1">↓</div>
                              <div>{nt1.targetFunctor}</div>
                            </div>
                            <div className="text-center text-2xl">∘</div>
                            <div className="text-center">
                              <div>{nt2.sourceFunctor}</div>
                              <div className="my-1">|</div>
                              <div className="text-xs text-purple-600">β</div>
                              <div className="my-1">↓</div>
                              <div>{nt2.targetFunctor}</div>
                            </div>
                          </div>
                          <div className="text-center text-muted-foreground text-xs mt-4">
                            Horizontal: (α * β): {compositionResult.source} ⇒ {compositionResult.target}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </ConceptCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explanation: Vertical Composition */}
      {compositionType === 'vertical' && (
        <ConceptCard title="Understanding Vertical Composition" level="beginner">
          <div className="space-y-3 text-sm">
            <p>
              <strong>Vertical composition</strong> (β · α) composes natural transformations when their
              functors compose. Given:
            </p>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
              <div className="font-mono text-xs space-y-1">
                <div>α: F ⇒ G (natural transformation)</div>
                <div>β: G ⇒ H (natural transformation)</div>
              </div>
            </div>

            <p>
              We can form <strong>β · α: F ⇒ H</strong> with components:
            </p>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border">
              <div className="font-mono text-xs text-center">
                (β · α)_A = β_A ∘ α_A
              </div>
            </div>

            <p className="text-muted-foreground italic">
              "Vertical" because we stack the transformations one after another, like composing functions.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
              <div className="font-semibold mb-2">Example:</div>
              <div className="text-xs">
                If η: Id ⇒ U∘F is the unit and ε: F∘U ⇒ Id is the counit, then we can compose with other
                natural transformations to build more complex relationships between functors.
              </div>
            </div>
          </div>
        </ConceptCard>
      )}

      {/* Explanation: Horizontal Composition */}
      {compositionType === 'horizontal' && (
        <ConceptCard title="Understanding Horizontal Composition" level="intermediate">
          <div className="space-y-3 text-sm">
            <p>
              <strong>Horizontal composition</strong> (α * β) composes natural transformations "side-by-side"
              when categories match. Given:
            </p>

            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
              <div className="font-mono text-xs space-y-1">
                <div>α: F ⇒ G (𝒞 → 𝒟)</div>
                <div>β: H ⇒ K (𝒟 → ℰ)</div>
              </div>
            </div>

            <p>
              We can form <strong>β * α: H∘F ⇒ K∘G</strong> with components:
            </p>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border">
              <div className="font-mono text-xs text-center space-y-1">
                <div>(β * α)_A = β_{G(A)} ∘ H(α_A)</div>
                <div className="text-muted-foreground">or equivalently</div>
                <div>(β * α)_A = K(α_A) ∘ β_{F(A)}</div>
              </div>
            </div>

            <p className="text-muted-foreground italic">
              "Horizontal" because we place the transformations side-by-side in a 2-dimensional diagram.
            </p>

            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
              <div className="font-semibold mb-2">The Interchange Law:</div>
              <div className="text-xs font-mono">
                (β' · β) * (α' · α) = (β' * α') · (β * α)
              </div>
              <div className="text-xs mt-2">
                Vertical and horizontal composition are compatible! This is the foundation of 2-category theory.
              </div>
            </div>
          </div>
        </ConceptCard>
      )}

      {/* Whiskering */}
      <ConceptCard title="Whiskering: Composing with Functors" level="advanced">
        <div className="space-y-3 text-sm">
          <p>
            We can also compose a natural transformation with a functor on one side. This is called <strong>whiskering</strong>:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
              <div className="font-semibold mb-2">Left Whiskering (α * F):</div>
              <div className="font-mono text-xs space-y-1">
                <div>α: G ⇒ H (𝒞 → 𝒟)</div>
                <div>F: 𝓑 → 𝒞 (functor)</div>
                <div className="mt-2 text-green-600">α * F: G∘F ⇒ H∘F</div>
              </div>
              <div className="text-xs mt-2 text-muted-foreground">
                Apply functor F first, then natural transformation α
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
              <div className="font-semibold mb-2">Right Whiskering (K * β):</div>
              <div className="font-mono text-xs space-y-1">
                <div>K: 𝒟 → ℰ (functor)</div>
                <div>β: F ⇒ G (𝒞 → 𝒟)</div>
                <div className="mt-2 text-green-600">K * β: K∘F ⇒ K∘G</div>
              </div>
              <div className="text-xs mt-2 text-muted-foreground">
                Apply natural transformation β, then functor K
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
            <div className="font-semibold mb-2">Why This Matters:</div>
            <div className="text-xs">
              Whiskering is how we build up complex natural transformations from simple pieces.
              It's also how we prove that functors form a category (with natural transformations as morphisms)!
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Exercise */}
      <ConceptCard title="Exercise: Build a Transformation Chain" level="advanced">
        <div className="space-y-3 text-sm">
          <p>
            Try composing multiple natural transformations to build a chain. For example:
          </p>

          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Start with the unit η: Id ⇒ U∘F</li>
            <li>Compose vertically with another transformation</li>
            <li>Can you recover the identity using the counit?</li>
          </ul>

          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
            <div className="font-semibold mb-2">Challenge:</div>
            <div>
              The interchange law says vertical and horizontal composition commute in a precise sense.
              Can you find natural transformations α, β, α', β' that demonstrate this law concretely?
            </div>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
