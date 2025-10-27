import React, { useState } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { NaturalTransformationExplorer } from './components/NaturalTransformationExplorer';
import { NaturalitySquareValidator } from './components/NaturalitySquareValidator';
import { NaturalTransformationComposer } from './components/NaturalTransformationComposer';

/**
 * Lesson 1.3: Natural Transformations - Morphisms Between Functors
 *
 * 5-Act Narrative Structure (50 minutes):
 * Act 1: Motivation - How do functors relate? (5 min)
 * Act 2: Examples Gallery (15 min)
 * Act 3: The Naturality Condition (12 min)
 * Act 4: Composition and 2-Categories (10 min)
 * Act 5: Why Natural Transformations Matter (8 min)
 */

export default function App() {
  const [currentAct, setCurrentAct] = useState<number>(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 to-blue-900 text-white p-8 shadow-lg">
        <div className="container mx-auto">
          <div className="text-sm text-purple-200 mb-2">Module 1: Category Theory · Lesson 1.3</div>
          <h1 className="text-4xl font-bold mb-3">Natural Transformations</h1>
          <p className="text-xl text-blue-100">Morphisms Between Functors</p>
          <div className="mt-4 text-sm text-blue-200">
            Duration: 50 minutes · Prerequisites: Categories, Functors
          </div>
        </div>
      </header>

      {/* Progress Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {[
              { num: 1, title: 'Motivation', time: '5min' },
              { num: 2, title: 'Examples', time: '15min' },
              { num: 3, title: 'Naturality', time: '12min' },
              { num: 4, title: 'Composition', time: '10min' },
              { num: 5, title: 'Synthesis', time: '8min' },
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
              <h2 className="text-3xl font-bold mb-4">Act 1: How Do Functors Relate?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We have categories, morphisms between objects, and functors between categories.
                What about morphisms between functors?
              </p>
            </div>

            <ConceptCard title="The Pattern Emerges" level="beginner">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg">
                  <div className="font-mono text-center space-y-2">
                    <div>Objects → <span className="text-green-600">Morphisms</span> (in categories)</div>
                    <div>Categories → <span className="text-blue-600">Functors</span> (between categories)</div>
                    <div className="text-2xl text-purple-600 font-bold">Functors → <span className="text-orange-600">???</span></div>
                  </div>
                </div>

                <p className="text-lg">
                  Just as we have morphisms between objects in a category, we need morphisms between functors.
                  These are called <strong>natural transformations</strong>.
                </p>
              </div>
            </ConceptCard>

            <ConceptCard title="A Motivating Example: Free ⊣ Forgetful" level="beginner">
              <div className="space-y-4 text-sm">
                <p>
                  Consider two functors between groups and sets:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Forgetful U: Grp → Set</div>
                    <div className="text-xs">Takes a group G and forgets the group structure, keeping just the underlying set U(G)</div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Free F: Set → Grp</div>
                    <div className="text-xs">Takes a set S and builds the free group F(S) - formal products of elements from S</div>
                  </div>
                </div>

                <p>
                  For any set S, we can map S into U(F(S)) - embed elements as generators. This gives us a "unit":
                </p>

                <div className="font-mono text-xs bg-white dark:bg-gray-900 p-4 rounded text-center">
                  η: Id_Set ⇒ U ∘ F
                </div>

                <p>
                  This mapping is <strong>natural</strong> - it doesn't depend on arbitrary choices, it's determined purely
                  by the structure of the functors!
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="font-semibold mb-2">The Question:</div>
                  <div>What makes this transformation "natural"? Let's explore concrete examples!</div>
                </div>
              </div>
            </ConceptCard>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCurrentAct(2)}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Explore Examples →
              </button>
            </div>
          </div>
        )}

        {/* Act 2: Examples Gallery */}
        {currentAct === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 2: Examples Gallery</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore concrete natural transformations: determinant, double dual, list reverse, and more.
                See the naturality squares commute!
              </p>
            </div>

            <NaturalTransformationExplorer />

            <ConceptCard title="Pattern Recognition" level="intermediate">
              <div className="space-y-3 text-sm">
                <p>
                  What do all these examples have in common?
                </p>

                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li><strong>Components</strong>: For each object A, we have a morphism α_A: F(A) → G(A)</li>
                  <li><strong>Uniformity</strong>: The transformation works "the same way" for all objects</li>
                  <li><strong>Commutativity</strong>: Naturality squares commute for all morphisms</li>
                  <li><strong>No arbitrary choices</strong>: Everything determined by functors' structure</li>
                </ol>

                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
                  <div className="font-semibold mb-2">Key Insight:</div>
                  <div>
                    A natural transformation is "natural" precisely when it satisfies the naturality condition -
                    it's not just a vague notion of "canonical"!
                  </div>
                </div>
              </div>
            </ConceptCard>

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
                Understand Naturality →
              </button>
            </div>
          </div>
        )}

        {/* Act 3: The Naturality Condition */}
        {currentAct === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 3: The Naturality Condition</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                What does it mean for a naturality square to commute? Build your own transformations
                and verify naturality in real-time!
              </p>
            </div>

            <ConceptCard title="The Naturality Square" level="intermediate">
              <div className="space-y-4">
                <p className="text-sm">
                  For a natural transformation α: F ⇒ G and morphism f: A → B, the following must commute:
                </p>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border font-mono text-sm text-center">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>F(A)</span>
                      <span className="text-xs text-muted-foreground">--F(f)--&gt;</span>
                      <span>F(B)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">|</span>
                      <span></span>
                      <span className="text-xs">|</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">α_A</span>
                      <span></span>
                      <span className="text-xs text-muted-foreground">α_B</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">↓</span>
                      <span></span>
                      <span className="text-xs">↓</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>G(A)</span>
                      <span className="text-xs text-muted-foreground">--G(f)--&gt;</span>
                      <span>G(B)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border text-center">
                  <div className="font-semibold mb-2">Commutativity Condition:</div>
                  <div className="font-mono text-sm">α_B ∘ F(f) = G(f) ∘ α_A</div>
                </div>

                <p className="text-sm text-muted-foreground">
                  This says: "Transform then map" = "Map then transform". The two paths from F(A) to G(B)
                  must give the same result!
                </p>
              </div>
            </ConceptCard>

            <NaturalitySquareValidator />

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
                Compose Transformations →
              </button>
            </div>
          </div>
        )}

        {/* Act 4: Composition and 2-Categories */}
        {currentAct === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 4: Composition and 2-Categories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Natural transformations can be composed in two ways: vertically and horizontally.
                This gives categories a 2-dimensional structure!
              </p>
            </div>

            <ConceptCard title="Two Kinds of Composition" level="advanced">
              <div className="space-y-4 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Vertical Composition (β · α)</div>
                    <div className="text-xs space-y-2">
                      <div>Given: α: F ⇒ G, β: G ⇒ H</div>
                      <div>Result: β · α: F ⇒ H</div>
                      <div className="font-mono">(β · α)_A = β_A ∘ α_A</div>
                      <div className="text-muted-foreground">Compose components as morphisms</div>
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Horizontal Composition (α * β)</div>
                    <div className="text-xs space-y-2">
                      <div>Given: α: F ⇒ G (𝒞→𝒟), β: H ⇒ K (𝒟→ℰ)</div>
                      <div>Result: β * α: H∘F ⇒ K∘G</div>
                      <div className="font-mono">(β*α)_A = β_{G(A)} ∘ H(α_A)</div>
                      <div className="text-muted-foreground">Compose across functors</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="font-semibold mb-2">The 2-Category Cat:</div>
                  <ul className="text-xs space-y-1 pl-4">
                    <li>• 0-cells: Categories</li>
                    <li>• 1-cells: Functors between categories</li>
                    <li>• 2-cells: Natural transformations between functors</li>
                  </ul>
                  <div className="text-xs mt-2">
                    This is the beginning of higher category theory!
                  </div>
                </div>
              </div>
            </ConceptCard>

            <NaturalTransformationComposer />

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

        {/* Act 5: Why Natural Transformations Matter */}
        {currentAct === 5 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 5: Why Natural Transformations Matter</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Natural transformations are everywhere in mathematics and programming.
                They capture the essence of "canonical" constructions.
              </p>
            </div>

            <ConceptCard title="The Right Notion of Isomorphism" level="intermediate">
              <div className="space-y-4 text-sm">
                <p>
                  Natural transformations distinguish truly canonical isomorphisms from those requiring choices:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border-2 border-green-500">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xl">✓</div>
                      <div className="font-semibold">Natural: V ≅ V**</div>
                    </div>
                    <div className="text-xs">
                      Finite-dimensional vector space is naturally isomorphic to its double dual.
                      The isomorphism v ↦ (φ ↦ φ(v)) requires no basis choice!
                    </div>
                  </div>

                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border-2 border-red-500">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xl">✗</div>
                      <div className="font-semibold">Not Natural: V ≅ V*</div>
                    </div>
                    <div className="text-xs">
                      To build an isomorphism V → V*, you must choose a basis. Different bases give
                      different isomorphisms. There's no natural isomorphism!
                    </div>
                  </div>
                </div>
              </div>
            </ConceptCard>

            <ConceptCard title="Natural Transformations Everywhere" level="beginner">
              <div className="space-y-4 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold mb-2">In Mathematics:</div>
                    <ul className="space-y-1 text-xs pl-4">
                      <li>• Homology functors and their natural transformations</li>
                      <li>• Fundamental group and covering spaces</li>
                      <li>• Adjunctions (unit/counit are natural transformations)</li>
                      <li>• Yoneda lemma - the most important result in category theory</li>
                      <li>• Limits and colimits via universal natural transformations</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold mb-2">In Programming:</div>
                    <ul className="space-y-1 text-xs pl-4">
                      <li>• Polymorphic functions are natural transformations</li>
                      <li>• map, filter, fold are natural transformations</li>
                      <li>• Type classes capture natural operations</li>
                      <li>• Monads built from adjunctions</li>
                      <li>• Parametricity theorem: "theorems for free"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ConceptCard>

            <ConceptCard title="Previews of Coming Attractions" level="advanced">
              <div className="space-y-4 text-sm">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg border">
                  <div className="font-semibold mb-3 text-lg">Next in Your Journey:</div>

                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold text-purple-700 dark:text-purple-300">Lesson 1.4: Universal Properties</div>
                      <div className="text-xs text-muted-foreground">
                        Limits and colimits are defined via universal natural transformations.
                        Products, pullbacks, equalizers all universal!
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-purple-700 dark:text-purple-300">Lesson 1.5: Adjoint Functors</div>
                      <div className="text-xs text-muted-foreground">
                        Unit η: id ⇒ U∘F and counit ε: F∘U ⇒ id are natural transformations.
                        Triangle identities ensure they work together. Adjunctions everywhere!
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-purple-700 dark:text-purple-300">The Yoneda Lemma:</div>
                      <div className="text-xs text-muted-foreground">
                        Natural transformations Hom(A, -) ⇒ F correspond bijectively to elements of F(A).
                        The most profound result in category theory!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ConceptCard>

            <ConceptCard title="Synthesis: The Big Picture" level="beginner">
              <div className="space-y-4 text-sm">
                <p className="text-base font-semibold">
                  Natural transformations complete the fundamental trinity of category theory:
                </p>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                  <div className="space-y-3 font-mono text-sm text-center">
                    <div className="text-blue-600 font-bold">Categories</div>
                    <div className="text-xl">↓</div>
                    <div className="text-green-600 font-bold">Functors (morphisms between categories)</div>
                    <div className="text-xl">↓</div>
                    <div className="text-orange-600 font-bold">Natural Transformations (morphisms between functors)</div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="font-semibold mb-2">Grothendieck's Vision:</div>
                  <div className="text-xs leading-relaxed">
                    "The notion of natural transformation is crucial. It is the right notion of morphism
                    between functors, and captures the idea of 'canonical' or 'functorial' constructions.
                    With natural transformations, we can finally talk precisely about what makes something
                    'natural' in mathematics."
                  </div>
                </div>

                <p className="text-center text-base font-semibold text-purple-700 dark:text-purple-300 mt-6">
                  You now understand one of the most important concepts in modern mathematics! 🎉
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
