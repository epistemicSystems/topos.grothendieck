/**
 * Lesson 1.1: What is a Category?
 *
 * A complete explorable explanation introducing categories through:
 * - Familiar examples students already know
 * - Interactive pattern recognition
 * - Formal definitions with visualizations
 * - Hands-on category construction
 * - Synthesis and next steps
 */

import { useState } from 'react';
import { CategoryZoo } from './components/CategoryZoo';
import { CategoryPlayground } from './components/CategoryPlayground';
import { IdentityAnimation } from './components/IdentityAnimation';

// ============================================================================
// Main App Component
// ============================================================================

export default function App() {
  const [currentAct, setCurrentAct] = useState(1);

  const scrollToAct = (act: number) => {
    setCurrentAct(act);
    const element = document.getElementById(`act-${act}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-8 px-6 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-3">
            <span className="text-sm text-gray-400 uppercase tracking-wide">
              Module 1: Category Theory Essentials
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-2">What is a Category?</h1>
          <p className="text-lg text-gray-300">
            Discover the fundamental pattern underlying all of mathematics
          </p>

          {/* Progress Navigation */}
          <nav className="mt-6 flex space-x-2 overflow-x-auto pb-2">
            {[
              { num: 1, title: 'You Already Know' },
              { num: 2, title: 'The Pattern' },
              { num: 3, title: 'The Definition' },
              { num: 4, title: 'Build Your Own' },
              { num: 5, title: 'Synthesis' },
            ].map((act) => (
              <button
                key={act.num}
                onClick={() => scrollToAct(act.num)}
                className={`px-4 py-2 text-sm rounded transition-colors whitespace-nowrap ${
                  currentAct === act.num
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {act.num}. {act.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-6 py-12">
        {/* ================================================================ */}
        {/* Act 1: You Already Know Categories */}
        {/* ================================================================ */}
        <section id="act-1" className="mb-20 scroll-mt-32">
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
              ACT 1 • 5 MINUTES
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You Already Know Categories
            </h2>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-700 leading-relaxed">
              Here's a secret: <strong>you've been working with categories your entire
              mathematical life</strong>—you just didn't know it!
            </p>

            <p className="text-gray-700">
              Think about the mathematics you already know. Sets and functions. Groups and
              homomorphisms. Vector spaces and linear transformations. Topological spaces and
              continuous maps. What do all of these have in common?
            </p>

            <p className="text-gray-700">
              They all share the same fundamental structure: <strong>objects</strong> (sets,
              groups, spaces) and <strong>morphisms</strong> (functions, homomorphisms, maps)
              that you can <strong>compose</strong>.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                The Big Idea
              </h3>
              <p className="text-blue-800 mb-0">
                A <strong>category</strong> is this pattern, extracted and made precise.
                It's the observation that "objects + morphisms + composition" appears
                <em> everywhere</em> in mathematics.
              </p>
            </div>

            <p className="text-gray-700">
              Before we give the formal definition, let's explore categories you already
              know. In the next section, we'll see five familiar examples and recognize the
              universal pattern.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Act 2: The Pattern Appears Everywhere */}
        {/* ================================================================ */}
        <section id="act-2" className="mb-20 scroll-mt-32">
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mb-3">
              ACT 2 • 10 MINUTES
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Pattern Appears Everywhere
            </h2>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700">
              Let's explore five categories from different areas of mathematics. Click each
              one to see its structure. Notice how they all share the same pattern:
              <strong> objects, morphisms, and composition</strong>.
            </p>
          </div>

          {/* CategoryZoo Component */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <CategoryZoo />
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <h3 className="text-lg font-bold text-green-900 mb-2">
                What Did You Notice?
              </h3>
              <p className="text-green-800 mb-2">
                Every category has the same structure, just with different "flavors":
              </p>
              <ul className="text-green-800 space-y-1 mb-0">
                <li>Objects vary (sets, groups, rings, spaces)</li>
                <li>Morphisms vary (functions, homomorphisms, continuous maps)</li>
                <li>But composition <strong>always works the same way</strong></li>
                <li>Every object <strong>always has an identity morphism</strong></li>
              </ul>
            </div>

            <p className="text-gray-700">
              This is the power of abstraction: once we understand categories in general,
              we understand something deep about <em>all</em> of these mathematical
              structures at once.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Act 3: The Abstract Definition */}
        {/* ================================================================ */}
        <section id="act-3" className="mb-20 scroll-mt-32">
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full mb-3">
              ACT 3 • 8 MINUTES
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Abstract Definition
            </h2>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700">
              Now that we've seen the pattern, let's make it precise. Here's the formal
              definition of a category:
            </p>
          </div>

          {/* Formal Definition */}
          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold text-purple-900 mb-4">
              Definition: Category
            </h3>
            <div className="text-gray-800 space-y-4">
              <p>
                A <strong>category</strong> 𝒞 consists of:
              </p>

              <div className="ml-6 space-y-3">
                <div>
                  <strong className="text-purple-900">1. Objects:</strong> A collection of
                  objects <code className="bg-purple-100 px-2 py-1 rounded text-sm">
                    Ob(𝒞)
                  </code>
                </div>

                <div>
                  <strong className="text-purple-900">2. Morphisms:</strong> For each pair
                  of objects A, B, a set of morphisms{' '}
                  <code className="bg-purple-100 px-2 py-1 rounded text-sm">
                    Hom(A, B)
                  </code>
                  <br />
                  <span className="text-sm text-gray-600 ml-4">
                    We write f: A → B to mean f ∈ Hom(A, B)
                  </span>
                </div>

                <div>
                  <strong className="text-purple-900">3. Composition:</strong> For any
                  f: A → B and g: B → C, a composite morphism{' '}
                  <code className="bg-purple-100 px-2 py-1 rounded text-sm">
                    g ∘ f: A → C
                  </code>
                </div>

                <div>
                  <strong className="text-purple-900">4. Identity:</strong> For each object
                  A, an identity morphism{' '}
                  <code className="bg-purple-100 px-2 py-1 rounded text-sm">
                    id_A: A → A
                  </code>
                </div>
              </div>

              <p className="pt-4 border-t-2 border-purple-200">
                These must satisfy <strong>two axioms</strong>:
              </p>

              <div className="ml-6 space-y-3">
                <div>
                  <strong className="text-purple-900">Axiom 1 (Associativity):</strong>
                  <br />
                  For f: A → B, g: B → C, h: C → D:
                  <div className="bg-purple-100 p-3 rounded mt-2 font-mono text-sm">
                    h ∘ (g ∘ f) = (h ∘ g) ∘ f
                  </div>
                </div>

                <div>
                  <strong className="text-purple-900">Axiom 2 (Identity):</strong>
                  <br />
                  For any f: A → B:
                  <div className="bg-purple-100 p-3 rounded mt-2 font-mono text-sm">
                    id_B ∘ f = f = f ∘ id_A
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 italic pt-4">
                That's it! Just objects, morphisms, composition, and two simple axioms.
                From this foundation, we can build all of modern mathematics.
              </p>
            </div>
          </div>

          {/* Identity Animation */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <IdentityAnimation />
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-6">
              <h3 className="text-lg font-bold text-amber-900 mb-2">
                Why These Axioms?
              </h3>
              <p className="text-amber-800 mb-2">
                <strong>Associativity</strong> says composition is unambiguous—we don't
                need parentheses when composing multiple morphisms.
              </p>
              <p className="text-amber-800 mb-0">
                <strong>Identity</strong> says every object has a "do nothing" morphism
                that acts like 0 for addition or 1 for multiplication.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Act 4: Build Your Own Category */}
        {/* ================================================================ */}
        <section id="act-4" className="mb-20 scroll-mt-32">
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full mb-3">
              ACT 4 • 12 MINUTES
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Build Your Own Category
            </h2>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700">
              Now it's your turn! Use the interactive playground below to construct your
              own categories. Add objects, draw morphisms between them, and compose
              morphisms to see the axioms in action.
            </p>

            <p className="text-gray-700">
              The system will validate the category axioms in real-time, showing you when
              you have a valid category and suggesting compositions you might want to add.
            </p>
          </div>

          {/* CategoryPlayground Component */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <CategoryPlayground />
          </div>
        </section>

        {/* ================================================================ */}
        {/* Act 5: Synthesis */}
        {/* ================================================================ */}
        <section id="act-5" className="mb-20 scroll-mt-32">
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
              ACT 5 • 5 MINUTES
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Synthesis: Categories Are Everywhere
            </h2>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-700 leading-relaxed">
              You've just learned one of the most important ideas in modern mathematics:
              <strong> categories capture the essence of mathematical structure</strong>.
            </p>

            {/* Key Takeaways */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-8 my-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Key Takeaways
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">1️⃣</span>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">
                      Categories Are a Pattern
                    </h4>
                    <p className="text-blue-800 mb-0">
                      The pattern "objects + morphisms + composition" appears everywhere:
                      Set, Grp, Ring, Top, Vect, and countless others.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-2xl">2️⃣</span>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">
                      Simple Definition, Deep Implications
                    </h4>
                    <p className="text-blue-800 mb-0">
                      A category is just objects, morphisms, composition, and two axioms
                      (associativity and identity). Yet this simple definition unifies
                      vast areas of mathematics.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-2xl">3️⃣</span>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">
                      Morphisms Are Primary
                    </h4>
                    <p className="text-blue-800 mb-0">
                      In category theory, morphisms (the relationships) are more important
                      than objects. We understand objects by how they relate to each other.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-2xl">4️⃣</span>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">
                      Composition Is Fundamental
                    </h4>
                    <p className="text-blue-800 mb-0">
                      The ability to compose morphisms—to chain operations together—is
                      what makes categories so powerful. Composition is the key operation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-8 my-8">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                What's Next: Functors
              </h3>
              <p className="text-green-800 mb-3">
                Now that we know what a category is, the natural question arises:
              </p>
              <p className="text-lg font-bold text-green-900 mb-3">
                "How do categories relate to each other?"
              </p>
              <p className="text-green-800 mb-3">
                The answer is <strong>functors</strong>—structure-preserving maps between
                categories. Functors are "the morphisms in the category of categories."
              </p>
              <p className="text-green-800 mb-0">
                In the next lesson, we'll explore functors and see how they let us
                translate between different mathematical worlds while preserving structure.
              </p>
            </div>

            {/* Further Exploration */}
            <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-8 my-8">
              <h3 className="text-xl font-bold text-purple-900 mb-4">
                Going Deeper
              </h3>
              <p className="text-purple-800 mb-3">
                Want to explore more? Here are some directions:
              </p>
              <ul className="text-purple-800 space-y-2">
                <li>
                  <strong>Small categories:</strong> Categories with finitely many objects
                  and morphisms (like the ones you built in the playground)
                </li>
                <li>
                  <strong>Large categories:</strong> Set, Grp, Ring have "too many"
                  objects to form a set (size issues!)
                </li>
                <li>
                  <strong>Opposite categories:</strong> 𝒞^op has the same objects as 𝒞
                  but all morphisms reversed
                </li>
                <li>
                  <strong>Subcategories:</strong> A category formed by taking some objects
                  and morphisms from another
                </li>
                <li>
                  <strong>Product categories:</strong> 𝒞 × 𝒟 has pairs of objects and
                  pairs of morphisms
                </li>
              </ul>
            </div>

            <p className="text-gray-700">
              Congratulations! You now understand categories—the foundation for everything
              that follows in this course. Take a moment to appreciate how a simple,
              elegant definition can capture so much mathematical structure.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Footer Navigation */}
        {/* ================================================================ */}
        <footer className="border-t-2 border-gray-200 pt-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Module 1, Lesson 1.1</p>
              <p className="text-xs text-gray-400">
                Estimated time: 40 minutes | Difficulty: Beginner
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => scrollToAct(1)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Back to Start
              </button>
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => alert('Lesson 1.2: Functors - Coming Soon!')}
              >
                Next Lesson: Functors →
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Grothendieck Explorable Explanations • Built with React + TypeScript
              <br />
              Inspired by Bret Victor's <em>Explorable Explanations</em>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
