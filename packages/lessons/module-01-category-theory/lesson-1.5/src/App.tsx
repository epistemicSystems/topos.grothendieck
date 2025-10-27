import React, { useState } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { AdjunctionExplorer } from './components/AdjunctionExplorer';
import { AdjunctionVerifier } from './components/AdjunctionVerifier';
import { MonadBuilder } from './components/MonadBuilder';

/**
 * Lesson 1.5: Adjoint Functors - The Crown Jewel
 *
 * 5-Act Narrative Structure (60 minutes):
 * Act 1: Motivation - Free ⊣ Forgetful (5 min)
 * Act 2: Adjunction Gallery (15 min)
 * Act 3: Unit, Counit, Triangle Identities (15 min)
 * Act 4: From Adjunctions to Monads (15 min)
 * Act 5: Why Adjunctions Are Everywhere (10 min)
 */

export default function App() {
  const [currentAct, setCurrentAct] = useState<number>(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-900 dark:to-pink-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 to-pink-900 text-white p-8 shadow-lg">
        <div className="container mx-auto">
          <div className="text-sm text-purple-200 mb-2">Module 1: Category Theory · Lesson 1.5</div>
          <h1 className="text-4xl font-bold mb-3">Adjoint Functors</h1>
          <p className="text-xl text-pink-100">The Crown Jewel of Category Theory</p>
          <div className="mt-4 text-sm text-pink-200">
            Duration: 60 minutes · Prerequisites: Categories, Functors, Natural Transformations, Limits
          </div>
        </div>
      </header>

      {/* Progress Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {[
              { num: 1, title: 'Motivation', time: '5min' },
              { num: 2, title: 'Gallery', time: '15min' },
              { num: 3, title: 'Unit & Counit', time: '15min' },
              { num: 4, title: 'Monads', time: '15min' },
              { num: 5, title: 'Synthesis', time: '10min' },
            ].map((act) => (
              <button
                key={act.num}
                onClick={() => setCurrentAct(act.num)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all ${
                  currentAct === act.num
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="font-semibold">Act {act.num}</div>
                <div className="text-xs opacity-75">{act.title} · {act.time}</div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-12">
        {/* Act 1: Motivation */}
        {currentAct === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 1: The Fundamental Example</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Free ⊣ Forgetful: The prototypical adjunction that captures the essence of "optimal solutions"
              </p>
            </div>

            <ConceptCard title="Free ⊣ Forgetful: A Deep Connection" level="beginner">
              <div className="space-y-4 text-sm">
                <p>
                  Consider two functors between groups and sets:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Free F: Set → Grp</div>
                    <div className="text-xs">F(S) = free group on generators S</div>
                    <div className="text-xs mt-2 text-muted-foreground">
                      Builds the "most general" group from a set
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Forgetful U: Grp → Set</div>
                    <div className="text-xs">U(G) = underlying set of G</div>
                    <div className="text-xs mt-2 text-muted-foreground">
                      Forgets the group structure
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg border-2 border-purple-300 mt-4">
                  <div className="font-semibold mb-2">The Adjunction F ⊣ U:</div>
                  <div className="text-xs space-y-2">
                    <div>• For any set S and group G: Hom_Grp(F(S), G) ≅ Hom_Set(S, U(G))</div>
                    <div>• Group homomorphisms F(S) → G correspond to set functions S → U(G)</div>
                    <div>• This bijection is <strong>natural</strong> in both S and G!</div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="font-semibold mb-2">Why This Matters:</div>
                  <div className="text-xs">
                    To define a homomorphism from the free group F(S), you only need to say where
                    the generators go! The freeness means it extends uniquely. This is the
                    universal property of free groups, expressed as an adjunction.
                  </div>
                </div>
              </div>
            </ConceptCard>

            <ConceptCard title="Mac Lane's Slogan" level="beginner">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-8 rounded-lg border-2 border-purple-300">
                <div className="text-2xl font-bold text-center mb-4 text-purple-700 dark:text-purple-300">
                  "Adjoint functors arise everywhere"
                </div>
                <div className="text-sm text-center text-muted-foreground">
                  - Saunders Mac Lane, Categories for the Working Mathematician
                </div>
              </div>
            </ConceptCard>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCurrentAct(2)}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Explore Adjunctions →
              </button>
            </div>
          </div>
        )}

        {/* Act 2: Adjunction Gallery */}
        {currentAct === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 2: Adjunction Gallery</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore concrete adjunctions: Free ⊣ Forgetful, Product ⊣ Hom, Tensor ⊣ Hom, and more!
              </p>
            </div>

            <ConceptCard title="What is an Adjunction?" level="intermediate">
              <div className="space-y-4 text-sm">
                <p>
                  An adjunction F ⊣ U between F: 𝒟 → 𝒞 and U: 𝒞 → 𝒟 can be defined in three equivalent ways:
                </p>

                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">1. Hom-Set Bijection:</div>
                    <div className="text-xs font-mono">Hom_𝒞(F(D), C) ≅ Hom_𝒟(D, U(C))</div>
                    <div className="text-xs mt-2 text-muted-foreground">Natural in both D and C</div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">2. Unit and Counit:</div>
                    <div className="text-xs space-y-1">
                      <div>• Unit η: id_𝒟 ⇒ U ∘ F</div>
                      <div>• Counit ε: F ∘ U ⇒ id_𝒞</div>
                      <div>• Triangle identities: (ε ∘ F) · (F ∘ η) = id, (U ∘ ε) · (η ∘ U) = id</div>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">3. Universal Morphisms:</div>
                    <div className="text-xs">
                      For each D, F(D) is universal from D to U. For each C, U(C) is universal from F to C.
                    </div>
                  </div>
                </div>
              </div>
            </ConceptCard>

            <AdjunctionExplorer />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentAct(1)}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentAct(3)}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Verify Adjunctions →
              </button>
            </div>
          </div>
        )}

        {/* Act 3: Unit, Counit, Triangle Identities */}
        {currentAct === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 3: Unit, Counit, and Triangle Identities</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Build and verify adjunctions. Check that unit and counit satisfy the triangle identities!
              </p>
            </div>

            <ConceptCard title="The Unit and Counit" level="intermediate">
              <div className="space-y-4 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Unit η: id ⇒ U ∘ F</div>
                    <div className="text-xs space-y-2">
                      <div>Components: η_D: D → U(F(D))</div>
                      <div className="text-muted-foreground">Embeds D into the "free-then-forget" cycle</div>
                      <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded">
                        For sets: η_S(s) = s as generator in F(S)
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Counit ε: F ∘ U ⇒ id</div>
                    <div className="text-xs space-y-2">
                      <div>Components: ε_C: F(U(C)) → C</div>
                      <div className="text-muted-foreground">Evaluates the "forget-then-free" cycle</div>
                      <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded">
                        For groups: ε_G evaluates words in U(G)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="font-semibold mb-2">Triangle Identities:</div>
                  <div className="text-xs space-y-1">
                    <div>1. (ε_F) ∘ F(η) = id_F: Embed then evaluate via F gives identity</div>
                    <div>2. U(ε) ∘ (η_U) = id_U: Embed then evaluate via U gives identity</div>
                  </div>
                  <div className="text-xs mt-2 text-muted-foreground">
                    These ensure the adjunction is coherent!
                  </div>
                </div>
              </div>
            </ConceptCard>

            <AdjunctionVerifier />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentAct(2)}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentAct(4)}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Build Monads →
              </button>
            </div>
          </div>
        )}

        {/* Act 4: From Adjunctions to Monads */}
        {currentAct === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 4: From Adjunctions to Monads</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every adjunction gives a monad T = U ∘ F. See how List, Maybe, and State monads
                arise from adjunctions!
              </p>
            </div>

            <ConceptCard title="Monads from Adjunctions" level="advanced">
              <div className="space-y-4 text-sm">
                <p>
                  Given an adjunction F ⊣ U with unit η and counit ε, we get a monad (T, μ, η):
                </p>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Endofunctor T:</div>
                    <div className="text-xs font-mono">T = U ∘ F</div>
                    <div className="text-xs mt-2 text-muted-foreground">
                      Compose right adjoint with left adjoint
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Unit η:</div>
                    <div className="text-xs font-mono">η: id ⇒ T</div>
                    <div className="text-xs mt-2 text-muted-foreground">
                      Same as adjunction unit!
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Multiplication μ:</div>
                    <div className="text-xs font-mono">μ = U(ε_F)</div>
                    <div className="text-xs mt-2 text-muted-foreground">
                      Derived from counit
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
                  <div className="font-semibold mb-2">The Monad Laws:</div>
                  <div className="text-xs space-y-1">
                    <div>• Associativity: μ ∘ T(μ) = μ ∘ μ_T</div>
                    <div>• Left unit: μ ∘ T(η) = id</div>
                    <div>• Right unit: μ ∘ η_T = id</div>
                  </div>
                  <div className="text-xs mt-2">
                    These follow automatically from the triangle identities!
                  </div>
                </div>
              </div>
            </ConceptCard>

            <MonadBuilder />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentAct(3)}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentAct(5)}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Why This Matters →
              </button>
            </div>
          </div>
        )}

        {/* Act 5: Synthesis */}
        {currentAct === 5 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 5: Why Adjunctions Are Everywhere</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Adjunctions unify seemingly disparate concepts and provide the right level of abstraction
              </p>
            </div>

            <ConceptCard title="Adjunctions Everywhere" level="beginner">
              <div className="space-y-4 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold mb-2">In Algebra:</div>
                    <ul className="space-y-1 text-xs pl-4">
                      <li>• Free ⊣ Forgetful (groups, modules, rings, etc.)</li>
                      <li>• Tensor ⊣ Hom (modules)</li>
                      <li>• Localization ⊣ Inclusion</li>
                      <li>• Group algebra ⊣ Forgetful</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold mb-2">In Topology:</div>
                    <ul className="space-y-1 text-xs pl-4">
                      <li>• Discrete ⊣ Forgetful ⊣ Indiscrete</li>
                      <li>• Stone-Čech compactification ⊣ Inclusion</li>
                      <li>• Fundamental group ⊣ Classifying space</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold mb-2">In Logic:</div>
                    <ul className="space-y-1 text-xs pl-4">
                      <li>• ∃ ⊣ Δ ⊣ ∀ (quantifiers)</li>
                      <li>• ∧ ⊣ Δ ⊣ ∨ (conjunction/disjunction)</li>
                      <li>• Curry-Howard: ⊸ ⊣ ⊗ (linear logic)</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold mb-2">In Geometry:</div>
                    <ul className="space-y-1 text-xs pl-4">
                      <li>• Spec ⊣ Global sections</li>
                      <li>• Sheafification ⊣ Forgetful</li>
                      <li>• Direct image ⊣ Inverse image (f* ⊣ f⁻¹)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ConceptCard>

            <ConceptCard title="Fundamental Theorems" level="advanced">
              <div className="space-y-4 text-sm">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg border">
                  <div className="font-semibold mb-3 text-lg">What Adjunctions Give Us:</div>

                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold text-purple-700 dark:text-purple-300">Preservation Theorems:</div>
                      <div className="text-xs">
                        Left adjoints preserve colimits. Right adjoints preserve limits. Always!
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-purple-700 dark:text-purple-300">Universal Properties:</div>
                      <div className="text-xs">
                        Limits are right adjoints to diagonal functors. Colimits are left adjoints.
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-purple-700 dark:text-purple-300">Monads:</div>
                      <div className="text-xs">
                        Every adjunction gives a monad. Many (but not all!) monads arise this way.
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-purple-700 dark:text-purple-300">Kan Extensions:</div>
                      <div className="text-xs">
                        Left and right Kan extensions are adjoint. They generalize all limits and colimits!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ConceptCard>

            <ConceptCard title="The Crown Jewel" level="beginner">
              <div className="space-y-4 text-sm">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-8 rounded-lg border-2 border-purple-300">
                  <div className="text-xl font-bold text-center mb-4">
                    Adjoint functors arise everywhere
                  </div>
                  <div className="text-center space-y-2 text-xs">
                    <p>
                      Adjunctions capture the essence of "optimal solutions" and "universal properties."
                      They unify free constructions, limits, quantifiers, and more under one framework.
                    </p>
                    <p className="font-semibold text-purple-700 dark:text-purple-300 mt-4">
                      Understanding adjunctions is understanding the heart of category theory!
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="font-semibold mb-2">Grothendieck's Vision:</div>
                  <div className="text-xs leading-relaxed">
                    "The notion of adjoint functors captures a universal phenomenon. Whenever you find
                    an adjunction, you've found something fundamental - a deep structural relationship
                    between mathematical concepts that transcends their specific formulations."
                  </div>
                </div>

                <p className="text-center text-lg font-semibold text-purple-700 dark:text-purple-300 mt-6">
                  You've completed the foundations of category theory! 🎉
                </p>
              </div>
            </ConceptCard>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentAct(4)}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentAct(1)}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                🎓 Start Over
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-8 mt-16">
        <div className="container mx-auto text-center">
          <div className="text-sm text-gray-400 mb-2">Grothendieck Explorable Explanations</div>
          <div className="text-xs text-gray-500">
            Building intuition through interactive exploration · Made with Claude Code
          </div>
        </div>
      </footer>
    </div>
  );
}
