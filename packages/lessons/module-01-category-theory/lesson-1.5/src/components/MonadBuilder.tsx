import React, { useState, useMemo } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MonadBuilder
 *
 * Interactive builder for monads from adjunctions.
 * Students construct monads T = R ∘ L from adjoint functors,
 * derive μ (multiplication) and η (unit), and verify monad laws.
 *
 * Features:
 * - Build monads from adjunctions
 * - Derive μ from counit ε
 * - Derive η from unit η
 * - Verify monad laws (associativity, left/right unit)
 * - Concrete examples: List, Maybe, State monads
 * - Kleisli category construction
 * - Connection to monadic programming
 */

interface Monad {
  id: string;
  name: string;
  description: string;

  // The adjunction it comes from
  adjunction: {
    left: string;
    right: string;
    categories: string;
  };

  // The monad T = R ∘ L
  endofunctor: {
    name: string;
    notation: string;
    onObjects: string;
    onMorphisms: string;
  };

  // Unit η: Id ⇒ T
  unit: {
    notation: string;
    fromAdjunction: string;
    components: Array<{
      object: string;
      morphism: string;
      description: string;
    }>;
  };

  // Multiplication μ: T ∘ T ⇒ T
  multiplication: {
    notation: string;
    fromAdjunction: string;
    components: Array<{
      object: string;
      morphism: string;
      description: string;
    }>;
  };

  // Monad laws
  laws: {
    associativity: {
      statement: string;
      diagram: string;
      verification: string;
    };
    leftUnit: {
      statement: string;
      diagram: string;
      verification: string;
    };
    rightUnit: {
      statement: string;
      diagram: string;
      verification: string;
    };
  };

  // Concrete examples
  examples: Array<{
    input: string;
    unitApplication: string;
    multiplicationApplication: string;
  }>;

  // Programming interpretation
  programming: {
    type: string;
    bind: string;
    return: string;
    example: string;
  };
}

const MONAD_LIBRARY: Record<string, Monad> = {
  list: {
    id: 'list',
    name: 'List Monad',
    description: 'The monad of lists, arising from Free ⊣ Forgetful for monoids',

    adjunction: {
      left: 'Free Monoid',
      right: 'Forgetful',
      categories: 'Set → Mon → Set',
    },

    endofunctor: {
      name: 'List',
      notation: 'T(A) = List(A)',
      onObjects: 'A ↦ {lists of elements from A}',
      onMorphisms: 'f: A → B ↦ map(f): List(A) → List(B)',
    },

    unit: {
      notation: 'η: Id ⇒ List',
      fromAdjunction: 'Unit of Free ⊣ Forgetful adjunction',
      components: [
        {
          object: 'A',
          morphism: 'η_A: A → List(A)',
          description: 'η_A(a) = [a] (singleton list)',
        },
      ],
    },

    multiplication: {
      notation: 'μ: List ∘ List ⇒ List',
      fromAdjunction: 'Derived from counit ε via μ = R(ε_L)',
      components: [
        {
          object: 'A',
          morphism: 'μ_A: List(List(A)) → List(A)',
          description: 'μ_A(xss) = flatten(xss) = concat(xss)',
        },
      ],
    },

    laws: {
      associativity: {
        statement: 'μ ∘ T(μ) = μ ∘ μ_T',
        diagram: 'T³ --T(μ)--> T² --μ--> T = T³ --μ_T--> T² --μ--> T',
        verification: 'flatten(flatten(xsss)) same whether we flatten inner or outer lists first',
      },
      leftUnit: {
        statement: 'μ ∘ T(η) = id',
        diagram: 'T --T(η)--> T² --μ--> T = T --id--> T',
        verification: 'flatten(map(singleton, xs)) = xs',
      },
      rightUnit: {
        statement: 'μ ∘ η_T = id',
        diagram: 'T --η_T--> T² --μ--> T = T --id--> T',
        verification: 'flatten([xs]) = xs',
      },
    },

    examples: [
      {
        input: 'xs = [1, 2, 3]',
        unitApplication: 'η(2) = [2]',
        multiplicationApplication: 'μ([[1,2], [3], [4,5]]) = [1,2,3,4,5]',
      },
    ],

    programming: {
      type: 'List<A>',
      bind: 'xs >>= f = concat(map(f, xs)) = flatten(map(f, xs))',
      return: 'return(x) = [x]',
      example: '[1,2,3] >>= (λx. [x, x*10]) = [1,10,2,20,3,30]',
    },
  },

  maybe: {
    id: 'maybe',
    name: 'Maybe Monad',
    description: 'The monad of optional values, representing partial functions',

    adjunction: {
      left: 'Free Pointed Set',
      right: 'Forgetful',
      categories: 'Set → Set* → Set',
    },

    endofunctor: {
      name: 'Maybe',
      notation: 'T(A) = A + 1 = Maybe(A)',
      onObjects: 'A ↦ {Just a | a ∈ A} ∪ {Nothing}',
      onMorphisms: 'f: A → B ↦ fmap(f): Maybe(A) → Maybe(B)',
    },

    unit: {
      notation: 'η: Id ⇒ Maybe',
      fromAdjunction: 'Unit of adjunction',
      components: [
        {
          object: 'A',
          morphism: 'η_A: A → Maybe(A)',
          description: 'η_A(a) = Just(a) (wrap in Just)',
        },
      ],
    },

    multiplication: {
      notation: 'μ: Maybe ∘ Maybe ⇒ Maybe',
      fromAdjunction: 'Derived from counit',
      components: [
        {
          object: 'A',
          morphism: 'μ_A: Maybe(Maybe(A)) → Maybe(A)',
          description: 'μ_A(Just(Just(a))) = Just(a), μ_A(Just(Nothing)) = Nothing, μ_A(Nothing) = Nothing',
        },
      ],
    },

    laws: {
      associativity: {
        statement: 'μ ∘ Maybe(μ) = μ ∘ μ_Maybe',
        diagram: 'Maybe³ → Maybe² → Maybe',
        verification: 'Flattening nested Maybes is associative',
      },
      leftUnit: {
        statement: 'μ ∘ Maybe(η) = id',
        diagram: 'Maybe --Maybe(η)--> Maybe² --μ--> Maybe',
        verification: 'μ(Just(η(x))) = μ(Just(Just(x))) = Just(x)',
      },
      rightUnit: {
        statement: 'μ ∘ η_Maybe = id',
        diagram: 'Maybe --η--> Maybe² --μ--> Maybe',
        verification: 'μ(η(mx)) = μ(Just(mx)) = mx',
      },
    },

    examples: [
      {
        input: 'x = Just(5)',
        unitApplication: 'η(5) = Just(5)',
        multiplicationApplication: 'μ(Just(Just(5))) = Just(5), μ(Just(Nothing)) = Nothing',
      },
    ],

    programming: {
      type: 'Maybe<A> = Just A | Nothing',
      bind: 'Just(x) >>= f = f(x), Nothing >>= f = Nothing',
      return: 'return(x) = Just(x)',
      example: 'Just(5) >>= (λx. if x > 0 then Just(1/x) else Nothing) = Just(0.2)',
    },
  },

  state: {
    id: 'state',
    name: 'State Monad',
    description: 'The monad for stateful computations',

    adjunction: {
      left: 'Product with S',
      right: 'Exponential',
      categories: 'Set → Set (using S → (- × S) ⊣ (-)^S)',
    },

    endofunctor: {
      name: 'State',
      notation: 'T(A) = S → (A × S)',
      onObjects: 'A ↦ {functions S → (A × S)}',
      onMorphisms: 'f: A → B ↦ T(f): (S→A×S) → (S→B×S)',
    },

    unit: {
      notation: 'η: Id ⇒ State',
      fromAdjunction: 'Unit of adjunction',
      components: [
        {
          object: 'A',
          morphism: 'η_A: A → (S → A × S)',
          description: 'η_A(a) = λs. (a, s) (return value, leave state unchanged)',
        },
      ],
    },

    multiplication: {
      notation: 'μ: State ∘ State ⇒ State',
      fromAdjunction: 'Derived from counit',
      components: [
        {
          object: 'A',
          morphism: 'μ_A: (S → ((S → A×S) × S)) → (S → A × S)',
          description: 'μ_A(f) = λs. let (g, s\') = f(s) in g(s\') (thread state through)',
        },
      ],
    },

    laws: {
      associativity: {
        statement: 'μ ∘ State(μ) = μ ∘ μ_State',
        diagram: 'State³ → State² → State',
        verification: 'Threading state through nested computations is associative',
      },
      leftUnit: {
        statement: 'μ ∘ State(η) = id',
        diagram: 'State → State² → State',
        verification: 'Wrapping computation in η and flattening gives original',
      },
      rightUnit: {
        statement: 'μ ∘ η_State = id',
        diagram: 'State → State² → State',
        verification: 'Returning computation and flattening gives original',
      },
    },

    examples: [
      {
        input: 'f: S → (Int × S)',
        unitApplication: 'η(42) = λs. (42, s)',
        multiplicationApplication: 'μ(λs. (λs\'. (v, s\'\'), s\')) threads state',
      },
    ],

    programming: {
      type: 'State<S, A> = S -> (A, S)',
      bind: '(s >>= f) = λs₀. let (a, s₁) = s(s₀) in f(a)(s₁)',
      return: 'return(a) = λs. (a, s)',
      example: 'get >>= (λx. put(x+1) >> return(x)) increments state, returns old value',
    },
  },

  identity: {
    id: 'identity',
    name: 'Identity Monad',
    description: 'The trivial monad, from identity adjunction',

    adjunction: {
      left: 'Id',
      right: 'Id',
      categories: 'Set → Set',
    },

    endofunctor: {
      name: 'Identity',
      notation: 'T(A) = A',
      onObjects: 'A ↦ A',
      onMorphisms: 'f ↦ f',
    },

    unit: {
      notation: 'η: Id ⇒ Id',
      fromAdjunction: 'Unit is identity',
      components: [
        {
          object: 'A',
          morphism: 'η_A: A → A',
          description: 'η_A = id_A',
        },
      ],
    },

    multiplication: {
      notation: 'μ: Id ∘ Id ⇒ Id',
      fromAdjunction: 'Multiplication is identity',
      components: [
        {
          object: 'A',
          morphism: 'μ_A: A → A',
          description: 'μ_A = id_A',
        },
      ],
    },

    laws: {
      associativity: {
        statement: 'μ ∘ μ = μ ∘ μ',
        diagram: 'A → A → A → A',
        verification: 'id ∘ id = id ∘ id (trivially true)',
      },
      leftUnit: {
        statement: 'μ ∘ η = id',
        diagram: 'A → A → A',
        verification: 'id ∘ id = id',
      },
      rightUnit: {
        statement: 'μ ∘ η = id',
        diagram: 'A → A → A',
        verification: 'id ∘ id = id',
      },
    },

    examples: [
      {
        input: 'x = 42',
        unitApplication: 'η(42) = 42',
        multiplicationApplication: 'μ(42) = 42',
      },
    ],

    programming: {
      type: 'Identity<A> = A',
      bind: 'x >>= f = f(x)',
      return: 'return(x) = x',
      example: '5 >>= (λx. x + 1) = 6 (just function application)',
    },
  },

  reader: {
    id: 'reader',
    name: 'Reader Monad',
    description: 'The monad for computations with read-only environment',

    adjunction: {
      left: 'Product with E',
      right: 'Exponential E →',
      categories: 'Set → Set',
    },

    endofunctor: {
      name: 'Reader',
      notation: 'T(A) = E → A',
      onObjects: 'A ↦ {functions E → A}',
      onMorphisms: 'f: A → B ↦ (E→A) → (E→B)',
    },

    unit: {
      notation: 'η: Id ⇒ Reader',
      fromAdjunction: 'Unit of product-exponential adjunction',
      components: [
        {
          object: 'A',
          morphism: 'η_A: A → (E → A)',
          description: 'η_A(a) = λe. a (constant function, ignore environment)',
        },
      ],
    },

    multiplication: {
      notation: 'μ: Reader ∘ Reader ⇒ Reader',
      fromAdjunction: 'Derived from counit',
      components: [
        {
          object: 'A',
          morphism: 'μ_A: (E → (E → A)) → (E → A)',
          description: 'μ_A(f) = λe. f(e)(e) (apply same environment twice)',
        },
      ],
    },

    laws: {
      associativity: {
        statement: 'μ ∘ Reader(μ) = μ ∘ μ_Reader',
        diagram: 'Reader³ → Reader² → Reader',
        verification: 'Applying environment multiple times is associative',
      },
      leftUnit: {
        statement: 'μ ∘ Reader(η) = id',
        diagram: 'Reader → Reader² → Reader',
        verification: 'μ(λe. λe\'. f(e\')) = λe. f(e)',
      },
      rightUnit: {
        statement: 'μ ∘ η_Reader = id',
        diagram: 'Reader → Reader² → Reader',
        verification: 'μ(λe. f) = f',
      },
    },

    examples: [
      {
        input: 'f: E → Int',
        unitApplication: 'η(42) = λe. 42',
        multiplicationApplication: 'μ(λe. λe\'. e + e\') = λe. e + e',
      },
    ],

    programming: {
      type: 'Reader<E, A> = E -> A',
      bind: '(r >>= f) = λe. f(r(e))(e)',
      return: 'return(a) = λe. a',
      example: 'ask >>= (λe. return(e * 2)) reads environment and doubles it',
    },
  },
};

export function MonadBuilder() {
  const [selectedMonad, setSelectedMonad] = useState<keyof typeof MONAD_LIBRARY>('list');
  const [showLaws, setShowLaws] = useState<boolean>(false);
  const [expandedLaw, setExpandedLaw] = useState<'assoc' | 'leftUnit' | 'rightUnit' | null>(null);

  const monad = MONAD_LIBRARY[selectedMonad];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Monad Builder</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Build monads from adjunctions. Every adjunction F ⊣ U gives a monad T = U ∘ F
          with unit η and multiplication μ. Verify the monad laws and see connections to programming!
        </p>
      </div>

      {/* Monad Selector */}
      <ConceptCard title="Choose a Monad" level="beginner">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(MONAD_LIBRARY).map(([key, m]) => (
            <motion.button
              key={key}
              onClick={() => {
                setSelectedMonad(key as keyof typeof MONAD_LIBRARY);
                setShowLaws(false);
                setExpandedLaw(null);
              }}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedMonad === key
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-bold">{m.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.description}</div>
            </motion.button>
          ))}
        </div>
      </ConceptCard>

      {/* Selected Monad Overview */}
      {monad && (
        <>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold mb-2">{monad.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{monad.description}</p>

            {/* Adjunction Source */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
              <div className="text-xs font-semibold text-purple-600 mb-2">FROM ADJUNCTION:</div>
              <div className="font-mono text-sm">
                {monad.adjunction.left} ⊣ {monad.adjunction.right}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {monad.adjunction.categories}
              </div>
            </div>
          </div>

          {/* Endofunctor T */}
          <ConceptCard title="The Endofunctor T = R ∘ L" level="intermediate">
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
                <div className="font-bold mb-2">{monad.endofunctor.name}</div>
                <div className="font-mono text-sm">{monad.endofunctor.notation}</div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-sm mb-2">On Objects:</div>
                  <div className="text-xs bg-white dark:bg-gray-900 p-3 rounded">
                    {monad.endofunctor.onObjects}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-2">On Morphisms:</div>
                  <div className="text-xs bg-white dark:bg-gray-900 p-3 rounded">
                    {monad.endofunctor.onMorphisms}
                  </div>
                </div>
              </div>
            </div>
          </ConceptCard>

          {/* Unit η */}
          <ConceptCard title="Unit η: Id ⇒ T" level="intermediate">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                Comes from: {monad.unit.fromAdjunction}
              </div>

              {monad.unit.components.map((comp, idx) => (
                <div key={idx} className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border">
                  <div className="font-mono text-sm font-semibold mb-1">{comp.object}</div>
                  <div className="font-mono text-xs text-green-700 dark:text-green-300 mb-2">
                    {comp.morphism}
                  </div>
                  <div className="text-sm">{comp.description}</div>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Multiplication μ */}
          <ConceptCard title="Multiplication μ: T ∘ T ⇒ T" level="intermediate">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                Comes from: {monad.multiplication.fromAdjunction}
              </div>

              {monad.multiplication.components.map((comp, idx) => (
                <div key={idx} className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
                  <div className="font-mono text-sm font-semibold mb-1">{comp.object}</div>
                  <div className="font-mono text-xs text-orange-700 dark:text-orange-300 mb-2">
                    {comp.morphism}
                  </div>
                  <div className="text-sm">{comp.description}</div>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Verify Monad Laws Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={() => setShowLaws(true)}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✓ Verify Monad Laws
            </motion.button>
          </div>

          {/* Monad Laws Verification */}
          <AnimatePresence>
            {showLaws && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ConceptCard title="Monad Laws" level="advanced">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-4">
                      A monad must satisfy three laws:
                    </div>

                    {/* Associativity */}
                    <motion.div
                      onClick={() => setExpandedLaw(expandedLaw === 'assoc' ? null : 'assoc')}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        expandedLaw === 'assoc'
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                          : 'border-green-200 hover:border-green-300 dark:border-green-800'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">1. Associativity</div>
                        <div className="text-xl text-green-600">✓</div>
                      </div>
                      <div className="font-mono text-xs mb-2">{monad.laws.associativity.statement}</div>

                      {expandedLaw === 'assoc' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pt-3 border-t space-y-2"
                        >
                          <div className="text-sm">
                            <span className="font-semibold">Diagram: </span>
                            <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
                              {monad.laws.associativity.diagram}
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold">Verification: </span>
                            {monad.laws.associativity.verification}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Left Unit */}
                    <motion.div
                      onClick={() => setExpandedLaw(expandedLaw === 'leftUnit' ? null : 'leftUnit')}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        expandedLaw === 'leftUnit'
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                          : 'border-green-200 hover:border-green-300 dark:border-green-800'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">2. Left Unit</div>
                        <div className="text-xl text-green-600">✓</div>
                      </div>
                      <div className="font-mono text-xs mb-2">{monad.laws.leftUnit.statement}</div>

                      {expandedLaw === 'leftUnit' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pt-3 border-t space-y-2"
                        >
                          <div className="text-sm">
                            <span className="font-semibold">Diagram: </span>
                            <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
                              {monad.laws.leftUnit.diagram}
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold">Verification: </span>
                            {monad.laws.leftUnit.verification}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Right Unit */}
                    <motion.div
                      onClick={() => setExpandedLaw(expandedLaw === 'rightUnit' ? null : 'rightUnit')}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        expandedLaw === 'rightUnit'
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                          : 'border-green-200 hover:border-green-300 dark:border-green-800'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">3. Right Unit</div>
                        <div className="text-xl text-green-600">✓</div>
                      </div>
                      <div className="font-mono text-xs mb-2">{monad.laws.rightUnit.statement}</div>

                      {expandedLaw === 'rightUnit' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pt-3 border-t space-y-2"
                        >
                          <div className="text-sm">
                            <span className="font-semibold">Diagram: </span>
                            <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
                              {monad.laws.rightUnit.diagram}
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold">Verification: </span>
                            {monad.laws.rightUnit.verification}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border-2 border-green-500 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl">✓</div>
                        <div>
                          <div className="font-bold">All Monad Laws Verified!</div>
                          <div className="text-sm text-muted-foreground">
                            This is a valid monad arising from the {monad.adjunction.left} ⊣ {monad.adjunction.right} adjunction.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ConceptCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Concrete Examples */}
          <ConceptCard title="Concrete Examples" level="beginner">
            <div className="space-y-3">
              {monad.examples.map((ex, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
                  <div className="font-mono text-sm font-semibold mb-3">{ex.input}</div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold">Unit: </span>
                      <span className="font-mono">{ex.unitApplication}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Multiplication: </span>
                      <span className="font-mono">{ex.multiplicationApplication}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Programming Interpretation */}
          <ConceptCard title="Monadic Programming" level="advanced">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-4 rounded-lg border">
                <div className="font-semibold mb-2">Type:</div>
                <div className="font-mono text-sm">{monad.programming.type}</div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border">
                  <div className="font-semibold mb-2 text-sm">Return (η):</div>
                  <div className="font-mono text-xs">{monad.programming.return}</div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border">
                  <div className="font-semibold mb-2 text-sm">Bind (μ + fmap):</div>
                  <div className="font-mono text-xs">{monad.programming.bind}</div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border">
                <div className="font-semibold mb-2">Example:</div>
                <div className="font-mono text-xs">{monad.programming.example}</div>
              </div>
            </div>
          </ConceptCard>

          {/* Explanation */}
          <ConceptCard title="From Adjunctions to Monads" level="beginner">
            <div className="space-y-3 text-sm">
              <p>
                <strong>Every adjunction gives a monad</strong>. Given F ⊣ U, we get:
              </p>

              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>
                  <strong>Endofunctor</strong>: T = U ∘ F (compose the functors)
                </li>
                <li>
                  <strong>Unit</strong>: η from the adjunction unit (Id ⇒ U ∘ F)
                </li>
                <li>
                  <strong>Multiplication</strong>: μ = U(ε_F) where ε is the counit
                </li>
              </ol>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border mt-4">
                <div className="font-semibold mb-2">Why This Works:</div>
                <div className="text-xs space-y-1">
                  <div>• The triangle identities ensure monad laws hold</div>
                  <div>• Associativity follows from naturality of ε</div>
                  <div>• Unit laws follow from triangle identities</div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
                <div className="font-semibold mb-2">The Big Picture:</div>
                <div className="text-xs">
                  Monads capture the essence of "computational effects" - sequencing, failure, state, etc.
                  The monad laws ensure that these effects compose sensibly. This connection between
                  category theory and programming is one of the most beautiful applications of abstract mathematics!
                </div>
              </div>
            </div>
          </ConceptCard>
        </>
      )}
    </div>
  );
}
