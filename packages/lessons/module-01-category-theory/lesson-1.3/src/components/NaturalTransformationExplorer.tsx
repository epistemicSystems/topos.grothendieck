/**
 * NaturalTransformationExplorer - Gallery of Concrete Natural Transformations
 *
 * Interactive exploration of natural transformations:
 * - Determinant (det: GL_n ⇒ 𝒦*)
 * - Double Dual (V ⇒ V**)
 * - List Reverse (reverse: List ⇒ List)
 * - Unit of Adjunction (id ⇒ U ∘ F)
 * - Hom Set Natural Transformation
 *
 * Students explore components, verify naturality squares, understand "natural"
 */

import { useState, useMemo } from 'react';
import { Category, Functor, NaturalTransformation, CategoryDiagram, ConceptCard } from '@grothendieck/core';

// ============================================================================
// Types
// ============================================================================

interface NTExample {
  id: string;
  name: string;
  description: string;
  sourceCategory: CategoryData;
  targetCategory: CategoryData;
  sourceFunctor: FunctorData;
  targetFunctor: FunctorData;
  components: Record<string, string>; // object id -> morphism id for component
  naturalitySquares: Array<{
    morphismId: string;
    morphismLabel: string;
    commutes: boolean;
    paths: {
      topRight: string[];
      bottomLeft: string[];
    };
  }>;
  examples: string[];
  intuition: string;
  isNaturalIsomorphism: boolean;
}

interface CategoryData {
  name: string;
  objects: Array<{ id: string; label: string; definition: string }>;
  morphisms: Array<{ id: string; from: string; to: string; label: string }>;
}

interface FunctorData {
  name: string;
  objectMap: Record<string, string>;
  morphismMap: Record<string, string>;
}

// ============================================================================
// Example Natural Transformations
// ============================================================================

const NT_EXAMPLES: Record<string, NTExample> = {
  doubleDual: {
    id: 'doubleDual',
    name: 'Double Dual',
    description: 'V ⇒ V**: Natural isomorphism for finite-dimensional vector spaces',
    sourceCategory: {
      name: 'Vect_𝕜',
      objects: [
        { id: 'V', label: 'V', definition: 'Vector space V (dim 2)' },
        { id: 'W', label: 'W', definition: 'Vector space W (dim 3)' },
      ],
      morphisms: [
        { id: 'f', from: 'V', to: 'W', label: 'T' },
      ],
    },
    targetCategory: {
      name: 'Vect_𝕜',
      objects: [
        { id: 'V', label: 'V', definition: 'Vector space V (dim 2)' },
        { id: 'W', label: 'W', definition: 'Vector space W (dim 3)' },
        { id: 'VDD', label: 'V**', definition: 'Double dual of V (dim 2)' },
        { id: 'WDD', label: 'W**', definition: 'Double dual of W (dim 3)' },
      ],
      morphisms: [
        { id: 'f', from: 'V', to: 'W', label: 'T' },
        { id: 'fDD', from: 'VDD', to: 'WDD', label: 'T**' },
        { id: 'eta_V', from: 'V', to: 'VDD', label: 'η_V' },
        { id: 'eta_W', from: 'W', to: 'WDD', label: 'η_W' },
      ],
    },
    sourceFunctor: {
      name: 'id',
      objectMap: { V: 'V', W: 'W' },
      morphismMap: { f: 'f' },
    },
    targetFunctor: {
      name: '(-)** (double dual)',
      objectMap: { V: 'VDD', W: 'WDD' },
      morphismMap: { f: 'fDD' },
    },
    components: {
      V: 'eta_V',
      W: 'eta_W',
    },
    naturalitySquares: [
      {
        morphismId: 'f',
        morphismLabel: 'T: V → W',
        commutes: true,
        paths: {
          topRight: ['f', 'eta_W'],
          bottomLeft: ['eta_V', 'fDD'],
        },
      },
    ],
    examples: [
      'η_V(v)(φ) = φ(v) for v ∈ V, φ ∈ V*',
      'Canonical - no basis choice needed!',
      'Contrast: V → V* requires choosing a basis',
    ],
    intuition: 'Embedding into double dual is natural - works uniformly for all vector spaces without arbitrary choices.',
    isNaturalIsomorphism: true,
  },

  listReverse: {
    id: 'listReverse',
    name: 'List Reverse',
    description: 'reverse: List ⇒ List - Endofunctor natural transformation',
    sourceCategory: {
      name: 'Set',
      objects: [
        { id: 'A', label: 'A', definition: 'Set A = {a, b}' },
        { id: 'B', label: 'B', definition: 'Set B = {1, 2, 3}' },
      ],
      morphisms: [
        { id: 'f', from: 'A', to: 'B', label: 'f' },
      ],
    },
    targetCategory: {
      name: 'Set',
      objects: [
        { id: 'LA', label: 'List(A)', definition: 'Lists over A' },
        { id: 'LB', label: 'List(B)', definition: 'Lists over B' },
      ],
      morphisms: [
        { id: 'Lf', from: 'LA', to: 'LB', label: 'List(f)' },
        { id: 'revA', from: 'LA', to: 'LA', label: 'rev_A' },
        { id: 'revB', from: 'LB', to: 'LB', label: 'rev_B' },
      ],
    },
    sourceFunctor: {
      name: 'List',
      objectMap: { A: 'LA', B: 'LB' },
      morphismMap: { f: 'Lf' },
    },
    targetFunctor: {
      name: 'List',
      objectMap: { A: 'LA', B: 'LB' },
      morphismMap: { f: 'Lf' },
    },
    components: {
      A: 'revA',
      B: 'revB',
    },
    naturalitySquares: [
      {
        morphismId: 'f',
        morphismLabel: 'f: A → B',
        commutes: true,
        paths: {
          topRight: ['Lf', 'revB'],
          bottomLeft: ['revA', 'Lf'],
        },
      },
    ],
    examples: [
      'rev([a, b, a]) = [a, b, a]',
      'rev ∘ map f = map f ∘ rev (naturality)',
      'Reversing then mapping = mapping then reversing',
    ],
    intuition: 'Reverse works uniformly on all lists, regardless of element type. It\'s a natural transformation between the List functor and itself.',
    isNaturalIsomorphism: true,
  },

  unitAdjunction: {
    id: 'unitAdjunction',
    name: 'Unit of Free ⊣ Forgetful',
    description: 'η: id_Set ⇒ U ∘ F - Unit of adjunction',
    sourceCategory: {
      name: 'Set',
      objects: [
        { id: 'X', label: 'X', definition: 'Set {a, b}' },
        { id: 'Y', label: 'Y', definition: 'Set {x, y, z}' },
      ],
      morphisms: [
        { id: 'f', from: 'X', to: 'Y', label: 'f' },
      ],
    },
    targetCategory: {
      name: 'Set',
      objects: [
        { id: 'X', label: 'X', definition: 'Set {a, b}' },
        { id: 'Y', label: 'Y', definition: 'Set {x, y, z}' },
        { id: 'UFX', label: 'U(F(X))', definition: 'Free group on X, then forget' },
        { id: 'UFY', label: 'U(F(Y))', definition: 'Free group on Y, then forget' },
      ],
      morphisms: [
        { id: 'f', from: 'X', to: 'Y', label: 'f' },
        { id: 'UFf', from: 'UFX', to: 'UFY', label: 'U(F(f))' },
        { id: 'eta_X', from: 'X', to: 'UFX', label: 'η_X' },
        { id: 'eta_Y', from: 'Y', to: 'UFY', label: 'η_Y' },
      ],
    },
    sourceFunctor: {
      name: 'id_Set',
      objectMap: { X: 'X', Y: 'Y' },
      morphismMap: { f: 'f' },
    },
    targetFunctor: {
      name: 'U ∘ F',
      objectMap: { X: 'UFX', Y: 'UFY' },
      morphismMap: { f: 'UFf' },
    },
    components: {
      X: 'eta_X',
      Y: 'eta_Y',
    },
    naturalitySquares: [
      {
        morphismId: 'f',
        morphismLabel: 'f: X → Y',
        commutes: true,
        paths: {
          topRight: ['f', 'eta_Y'],
          bottomLeft: ['eta_X', 'UFf'],
        },
      },
    ],
    examples: [
      'η_X(x) = x (as generator in free group)',
      'Universal: any f: X → U(G) factors through η_X',
      'Natural in X - no choices needed',
    ],
    intuition: 'The unit embeds sets into free groups naturally, without making arbitrary choices. Foundation of the Free ⊣ Forgetful adjunction.',
    isNaturalIsomorphism: false,
  },

  determinant: {
    id: 'determinant',
    name: 'Determinant',
    description: 'det: GL_n ⇒ (-)* - From invertible matrices to units',
    sourceCategory: {
      name: 'Ring',
      objects: [
        { id: 'R', label: 'ℝ', definition: 'Real numbers' },
        { id: 'C', label: 'ℂ', definition: 'Complex numbers' },
      ],
      morphisms: [
        { id: 'f', from: 'R', to: 'C', label: 'incl' },
      ],
    },
    targetCategory: {
      name: 'Grp',
      objects: [
        { id: 'GLnR', label: 'GL_n(ℝ)', definition: 'Invertible n×n real matrices' },
        { id: 'GLnC', label: 'GL_n(ℂ)', definition: 'Invertible n×n complex matrices' },
        { id: 'Rstar', label: 'ℝ*', definition: 'Non-zero reals' },
        { id: 'Cstar', label: 'ℂ*', definition: 'Non-zero complex' },
      ],
      morphisms: [
        { id: 'GLnf', from: 'GLnR', to: 'GLnC', label: 'GL_n(incl)' },
        { id: 'fstar', from: 'Rstar', to: 'Cstar', label: 'incl*' },
        { id: 'detR', from: 'GLnR', to: 'Rstar', label: 'det' },
        { id: 'detC', from: 'GLnC', to: 'Cstar', label: 'det' },
      ],
    },
    sourceFunctor: {
      name: 'GL_n',
      objectMap: { R: 'GLnR', C: 'GLnC' },
      morphismMap: { f: 'GLnf' },
    },
    targetFunctor: {
      name: '(-)* (units)',
      objectMap: { R: 'Rstar', C: 'Cstar' },
      morphismMap: { f: 'fstar' },
    },
    components: {
      R: 'detR',
      C: 'detC',
    },
    naturalitySquares: [
      {
        morphismId: 'f',
        morphismLabel: 'incl: ℝ → ℂ',
        commutes: true,
        paths: {
          topRight: ['GLnf', 'detC'],
          bottomLeft: ['detR', 'fstar'],
        },
      },
    ],
    examples: [
      'det(AB) = det(A)det(B) (group homomorphism)',
      'det works the same way for all rings',
      'Natural in the ring R',
    ],
    intuition: 'Determinant is a uniform construction that works for matrices over any ring, making it a natural transformation.',
    isNaturalIsomorphism: false,
  },

  homDuality: {
    id: 'homDuality',
    name: 'Hom Duality (Currying)',
    description: 'Hom(A × -, B) ⇒ Hom(A, Hom(-, B)) - Currying natural transformation',
    sourceCategory: {
      name: 'Set',
      objects: [
        { id: 'X', label: 'X', definition: 'Set X' },
        { id: 'Y', label: 'Y', definition: 'Set Y' },
      ],
      morphisms: [
        { id: 'g', from: 'X', to: 'Y', label: 'g' },
      ],
    },
    targetCategory: {
      name: 'Set',
      objects: [
        { id: 'HAX', label: 'Hom(A×X,B)', definition: 'Functions A×X → B' },
        { id: 'HAY', label: 'Hom(A×Y,B)', definition: 'Functions A×Y → B' },
        { id: 'HXB', label: 'Hom(A,Hom(X,B))', definition: 'Functions A → (X → B)' },
        { id: 'HYB', label: 'Hom(A,Hom(Y,B))', definition: 'Functions A → (Y → B)' },
      ],
      morphisms: [
        { id: 'fg', from: 'HAY', to: 'HAX', label: '(-) ∘ (id × g)' },
        { id: 'gg', from: 'HYB', to: 'HXB', label: '(-) ∘ (g ∘ -)' },
        { id: 'curry_X', from: 'HAX', to: 'HXB', label: 'curry_X' },
        { id: 'curry_Y', from: 'HAY', to: 'HYB', label: 'curry_Y' },
      ],
    },
    sourceFunctor: {
      name: 'Hom(A × -, B)',
      objectMap: { X: 'HAX', Y: 'HAY' },
      morphismMap: { g: 'fg' },
    },
    targetFunctor: {
      name: 'Hom(A, Hom(-, B))',
      objectMap: { X: 'HXB', Y: 'HYB' },
      morphismMap: { g: 'gg' },
    },
    components: {
      X: 'curry_X',
      Y: 'curry_Y',
    },
    naturalitySquares: [
      {
        morphismId: 'g',
        morphismLabel: 'g: X → Y',
        commutes: true,
        paths: {
          topRight: ['fg', 'curry_X'],
          bottomLeft: ['curry_Y', 'gg'],
        },
      },
    ],
    examples: [
      'curry(f)(a)(x) = f(a, x)',
      'Fundamental in functional programming',
      'Natural in both A and B (exponential object)',
    ],
    intuition: 'Currying transforms functions of two arguments into functions returning functions. It works uniformly for all types.',
    isNaturalIsomorphism: true,
  },
};

// ============================================================================
// Component
// ============================================================================

export function NaturalTransformationExplorer() {
  const [selectedNT, setSelectedNT] = useState<string | null>('doubleDual');
  const [selectedSquare, setSelectedSquare] = useState<number>(0);
  const [showNaturalityCheck, setShowNaturalityCheck] = useState(false);

  const currentNT = useMemo(
    () => (selectedNT ? NT_EXAMPLES[selectedNT] : null),
    [selectedNT]
  );

  return (
    <div className="natural-transformation-explorer">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Natural Transformation Explorer
        </h3>
        <p className="text-gray-700">
          Explore concrete natural transformations! Each transformation has components α_A
          for each object A, and these components satisfy the <strong>naturality condition</strong>.
        </p>
      </div>

      {/* NT Selection */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {Object.values(NT_EXAMPLES).map((nt) => (
          <button
            key={nt.id}
            onClick={() => {
              setSelectedNT(nt.id);
              setSelectedSquare(0);
              setShowNaturalityCheck(false);
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedNT === nt.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-semibold text-gray-900 mb-1">{nt.name}</div>
            <div className="text-xs text-gray-600">
              {nt.sourceFunctor.name} ⇒ {nt.targetFunctor.name}
            </div>
            {nt.isNaturalIsomorphism && (
              <div className="mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                Nat. Iso.
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected NT Visualization */}
      {currentNT && (
        <div className="space-y-6">
          {/* Description */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <h4 className="text-lg font-bold text-purple-900 mb-2">{currentNT.name}</h4>
            <p className="text-purple-800 mb-3">{currentNT.description}</p>
            <p className="text-sm text-purple-700 italic">{currentNT.intuition}</p>
          </div>

          {/* Components Display */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">
              Components: {currentNT.sourceFunctor.name} ⇒ {currentNT.targetFunctor.name}
            </h4>
            <div className="space-y-2">
              {Object.entries(currentNT.components).map(([objId, morphId]) => {
                const obj = currentNT.sourceCategory.objects.find((o) => o.id === objId);
                const mor = currentNT.targetCategory.morphisms.find((m) => m.id === morphId);
                const sourceObj = currentNT.sourceFunctor.objectMap[objId];
                const targetObj = currentNT.targetFunctor.objectMap[objId];

                return (
                  <div
                    key={objId}
                    className="flex items-center justify-between text-sm bg-gray-50 px-4 py-3 rounded"
                  >
                    <span className="font-mono text-gray-600">
                      For object <strong>{obj?.label}</strong>:
                    </span>
                    <span className="font-mono text-purple-600">
                      {mor?.label}: {sourceObj} → {targetObj}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Naturality Squares */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">
              Naturality Squares
            </h4>

            {currentNT.naturalitySquares.length > 0 && (
              <>
                <div className="mb-4">
                  {currentNT.naturalitySquares.map((square, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSquare(idx)}
                      className={`mr-2 px-3 py-1 text-sm rounded ${
                        selectedSquare === idx
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {square.morphismLabel}
                    </button>
                  ))}
                </div>

                {currentNT.naturalitySquares[selectedSquare] && (
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h5 className="text-sm font-bold text-purple-900 mb-4">
                      Naturality for {currentNT.naturalitySquares[selectedSquare].morphismLabel}
                    </h5>

                    <div className="font-mono text-sm text-gray-800 mb-4 p-4 bg-white rounded border border-purple-200">
                      <div className="text-center mb-2">
                        Both paths must be equal:
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-semibold text-blue-600 mb-1">Top-Right Path:</div>
                          <div>{currentNT.naturalitySquares[selectedSquare].paths.topRight.join(' → ')}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-green-600 mb-1">Bottom-Left Path:</div>
                          <div>{currentNT.naturalitySquares[selectedSquare].paths.bottomLeft.join(' → ')}</div>
                        </div>
                      </div>
                    </div>

                    <div className={`text-sm font-semibold ${
                      currentNT.naturalitySquares[selectedSquare].commutes
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}>
                      {currentNT.naturalitySquares[selectedSquare].commutes
                        ? '✓ Square commutes - naturality satisfied!'
                        : '✗ Square does NOT commute'}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Examples */}
          <ConceptCard
            term="Concrete Examples"
            shortDefinition="See how this natural transformation works"
            examples={currentNT.examples}
            colorScheme="green"
          />

          {/* Naturality Explanation */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-bold text-blue-900 mb-3">
              What Makes It "Natural"?
            </h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                A transformation α: F ⇒ G is <strong>natural</strong> if for every morphism
                f: A → B in the source category, this square commutes:
              </p>
              <div className="bg-blue-100 p-4 rounded font-mono text-xs my-3">
                F(A) --F(f)--→ F(B)
                <br />
                &nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
                <br />
                α_A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;α_B
                <br />
                &nbsp;↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓
                <br />
                G(A) --G(f)--→ G(B)
              </div>
              <p>
                That is: <code className="bg-blue-100 px-2 py-1 rounded">α_B ∘ F(f) = G(f) ∘ α_A</code>
              </p>
              <p className="font-semibold pt-2">
                "Natural" means: it doesn't matter whether you transform first or map first!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pattern Recognition */}
      <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
        <h4 className="text-lg font-bold text-amber-900 mb-3">
          What Do All Natural Transformations Have in Common?
        </h4>
        <ul className="text-sm text-amber-800 space-y-2">
          <li>
            ✓ <strong>Components:</strong> For each object A, a morphism α_A: F(A) → G(A)
          </li>
          <li>
            ✓ <strong>Naturality condition:</strong> For each f: A → B, the naturality square commutes
          </li>
          <li>
            ✓ <strong>No arbitrary choices:</strong> Defined uniformly across all objects
          </li>
          <li>
            ✓ <strong>Commutative diagrams:</strong> All naturality squares commute
          </li>
          <li className="pt-2 border-t-2 border-amber-200">
            → These properties define what it means to be <strong>natural</strong>!
          </li>
        </ul>
      </div>
    </div>
  );
}
