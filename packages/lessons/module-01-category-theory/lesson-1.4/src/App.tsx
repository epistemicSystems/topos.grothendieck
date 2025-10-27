import React, { useState } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { UniversalPropertyExplorer } from './components/UniversalPropertyExplorer';
import { LimitBuilder } from './components/LimitBuilder';
import { LimitColimitDuality } from './components/LimitColimitDuality';

/**
 * Lesson 1.4: Universal Properties and Limits
 *
 * 5-Act Narrative Structure (55 minutes):
 * Act 1: Motivation - Uniqueness up to isomorphism (5 min)
 * Act 2: Products and the Universal Pattern (15 min)
 * Act 3: Limits as Universal Cones (15 min)
 * Act 4: Duality - Limits vs Colimits (10 min)
 * Act 5: Why Universal Properties Matter (10 min)
 */

export default function App() {
  const [currentAct, setCurrentAct] = useState<number>(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-8 shadow-lg">
        <div className="container mx-auto">
          <div className="text-sm text-indigo-200 mb-2">Module 1: Category Theory · Lesson 1.4</div>
          <h1 className="text-4xl font-bold mb-3">Universal Properties and Limits</h1>
          <p className="text-xl text-purple-100">The Canonical Constructions</p>
          <div className="mt-4 text-sm text-purple-200">
            Duration: 55 minutes · Prerequisites: Categories, Functors, Natural Transformations
          </div>
        </div>
      </header>

      {/* Progress Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {[
              { num: 1, title: 'Motivation', time: '5min' },
              { num: 2, title: 'Universal Pattern', time: '15min' },
              { num: 3, title: 'Limits', time: '15min' },
              { num: 4, title: 'Duality', time: '10min' },
              { num: 5, title: 'Synthesis', time: '10min' },
            ].map((act) => (
              <button
                key={act.num}
                onClick={() => setCurrentAct(act.num)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all ${
                  currentAct === act.num
                    ? 'bg-indigo-600 text-white shadow-md'
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
              <h2 className="text-3xl font-bold mb-4">Act 1: Uniqueness Up To Isomorphism</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                What makes the Cartesian product A × B "the right" product? How do we formalize "canonical"?
              </p>
            </div>

            <ConceptCard title="The Question of Canonicalness" level="beginner">
              <div className="space-y-4 text-sm">
                <p>
                  Consider sets A = {'{'}1, 2{'}'} and B = {'{'}x, y{'}'}. Many sets could serve as a "product":
                </p>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border-2 border-green-500">
                    <div className="font-semibold mb-2">✓ A × B</div>
                    <div className="text-xs">{'{'}{'{'}(1,x), (1,y), (2,x), (2,y){'}'}</div>
                    <div className="text-xs text-green-600 mt-2">The canonical product!</div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">? A × B × {'{'}0{'}'}</div>
                    <div className="text-xs">Isomorphic to A × B, but extra baggage</div>
                  </div>

                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border-2 border-red-500">
                    <div className="font-semibold mb-2">✗ A ⊔ B</div>
                    <div className="text-xs">Disjoint union - wrong structure!</div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="font-semibold mb-2">The Universal Property:</div>
                  <div className="text-xs">
                    A × B is special because any other object with projections to A and B
                    must factor <strong>uniquely</strong> through A × B. It's the "most efficient" product!
                  </div>
                </div>
              </div>
            </ConceptCard>

            <ConceptCard title="The Slogan" level="beginner">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-8 rounded-lg border-2 border-indigo-300">
                <div className="text-2xl font-bold text-center mb-4 text-indigo-700 dark:text-indigo-300">
                  "An object is defined by its relationships, not its internal structure"
                </div>
                <div className="text-sm text-center text-muted-foreground">
                  Universal properties capture this principle precisely
                </div>
              </div>
            </ConceptCard>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCurrentAct(2)}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Explore Universal Properties →
              </button>
            </div>
          </div>
        )}

        {/* Act 2: Products and the Universal Pattern */}
        {currentAct === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 2: Products and the Universal Pattern</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore six universal constructions: products, coproducts, terminal objects, and more.
              </p>
            </div>

            <ConceptCard title="The Universal Property Pattern" level="intermediate">
              <div className="space-y-4 text-sm">
                <p>Every universal property follows the same pattern:</p>

                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li><strong>Existence</strong>: There is an object X with certain morphisms</li>
                  <li><strong>Factorization</strong>: For any other object Y with similar morphisms, there exists a morphism Y → X (or X → Y)</li>
                  <li><strong>Uniqueness</strong>: This factorization morphism is <strong>unique</strong></li>
                  <li><strong>Commutativity</strong>: All diagrams involving the factorization commute</li>
                </ol>

                <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg border mt-4">
                  <div className="font-semibold mb-2">Key Insight:</div>
                  <div className="text-xs">
                    Universal objects are unique up to <strong>unique isomorphism</strong>. If two objects
                    both satisfy the same universal property, they are canonically isomorphic!
                  </div>
                </div>
              </div>
            </ConceptCard>

            <UniversalPropertyExplorer />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentAct(1)}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentAct(3)}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Build Limits →
              </button>
            </div>
          </div>
        )}

        {/* Act 3: Limits as Universal Cones */}
        {currentAct === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 3: Limits as Universal Cones</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Build diagrams and compute their limits. See how products, equalizers, and pullbacks
                are all special cases of the general limit construction!
              </p>
            </div>

            <ConceptCard title="What is a Limit?" level="intermediate">
              <div className="space-y-4 text-sm">
                <p>
                  Given a diagram D: 𝒥 → 𝒞, a <strong>limit</strong> consists of:
                </p>

                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>An object <strong>lim D</strong></li>
                  <li>A <strong>cone</strong> of morphisms: lim D → D(j) for each j ∈ 𝒥</li>
                  <li>Such that for every morphism α: j → k in 𝒥, the triangle commutes</li>
                  <li><strong>Universal property</strong>: Any other cone factors uniquely through lim D</li>
                </ol>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Index Category 𝒥:</div>
                    <div className="text-xs">The "shape" of the diagram</div>
                    <ul className="text-xs space-y-1 mt-2 pl-4">
                      <li>• Discrete (2) → Product</li>
                      <li>• Parallel pair → Equalizer</li>
                      <li>• Cospan → Pullback</li>
                      <li>• Empty → Terminal</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border">
                    <div className="font-semibold mb-2">Diagram D: 𝒥 → 𝒞:</div>
                    <div className="text-xs">Map each object/morphism of 𝒥 to 𝒞</div>
                    <div className="text-xs mt-2">
                      The limit is the "most efficient" cone over this diagram!
                    </div>
                  </div>
                </div>
              </div>
            </ConceptCard>

            <LimitBuilder />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentAct(2)}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentAct(4)}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Explore Duality →
              </button>
            </div>
          </div>
        )}

        {/* Act 4: Duality */}
        {currentAct === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Act 4: Duality - Limits vs Colimits</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every limit in 𝒞 is a colimit in 𝒞^op. Duality gives us theorems for free!
              </p>
            </div>

            <ConceptCard title="The Duality Principle" level="advanced">
              <div className="space-y-4 text-sm">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg border-2 border-purple-300">
                  <div className="text-lg font-bold text-center mb-3">
                    Limit in 𝒞 = Colimit in 𝒞^op
                  </div>
                  <div className="text-xs text-center">
                    Reverse all arrows and you get the dual construction!
                  </div>
                </div>

                <p>This means:</p>
                <ul className="space-y-1 pl-4 text-xs">
                  <li>• Every theorem about limits gives a dual theorem about colimits</li>
                  <li>• You only need to prove half the results!</li>
                  <li>• Duality is a fundamental symmetry in category theory</li>
                </ul>
              </div>
            </ConceptCard>

            <LimitColimitDuality />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentAct(3)}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentAct(5)}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
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
              <h2 className="text-3xl font-bold mb-4">Act 5: Why Universal Properties Matter</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Universal properties are everywhere in mathematics. They unify diverse constructions
                and provide the right level of abstraction.
              </p>
            </div>

            <ConceptCard title="Universal Properties Everywhere" level="beginner">
              <div className="space-y-4 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold mb-2">In Algebra:</div>
                    <ul className="space-y-1 text-xs pl-4">
                      <li>• Free groups, free modules, tensor products</li>
                      <li>• Quotients and kernels as coequalizers</li>
                      <li>• Localization and completion</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold mb-2">In Topology:</div>
                    <ul className="space-y-1 text-xs pl-4">
                      <li>• Product and quotient topologies</li>
                      <li>• Compactifications</li>
                      <li>• Fundamental groups and covering spaces</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold mb-2">In Geometry:</div>
                    <ul className="space-y-1 text-xs pl-4">
                      <li>• Fiber products and pushouts of schemes</li>
                      <li>• Spec and global sections as adjoints</li>
                      <li>• Sheafification as a colimit</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold mb-2">In Logic:</div>
                    <ul className="space-y-1 text-xs pl-4">
                      <li>• Conjunction (∧) and disjunction (∨) as limits/colimits</li>
                      <li>• Universal and existential quantification</li>
                      <li>• Type theory and dependent types</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ConceptCard>

            <ConceptCard title="The Power of Abstraction" level="advanced">
              <div className="space-y-4 text-sm">
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="font-semibold mb-2">Why Universal Properties Work:</div>
                  <ol className="space-y-2 text-xs pl-4">
                    <li>1. <strong>Uniqueness</strong>: Objects defined by universal properties are unique up to unique isomorphism</li>
                    <li>2. <strong>Existence</strong>: If a universal object exists, it's canonical - no arbitrary choices</li>
                    <li>3. <strong>Functoriality</strong>: Limits and colimits are functorial - they preserve structure</li>
                    <li>4. <strong>Computation</strong>: Can actually compute limits in concrete categories</li>
                  </ol>
                </div>

                <p className="text-center text-lg font-semibold text-indigo-700 dark:text-indigo-300 mt-6">
                  Universal properties give us the right way to define mathematical objects!
                </p>
              </div>
            </ConceptCard>

            <ConceptCard title="Next: Adjoint Functors" level="intermediate">
              <div className="space-y-3 text-sm">
                <p>
                  In Lesson 1.5, we'll see that <strong>limits are right adjoints to diagonal functors</strong>.
                  This connects universal properties to adjunctions - the most important concept in category theory!
                </p>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-6 rounded-lg border">
                  <div className="font-semibold mb-2">Coming Up:</div>
                  <ul className="text-xs space-y-1 pl-4">
                    <li>• Adjoint functors: Free ⊣ Forgetful</li>
                    <li>• Limits as adjoints</li>
                    <li>• Preservation theorems</li>
                    <li>• Monads from adjunctions</li>
                  </ul>
                </div>
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
