/**
 * IdentityAnimation - Visualize Identity Morphisms
 *
 * Demonstrates identity morphisms and the identity laws:
 * - id_A: A → A exists for every object A
 * - Left identity: id_B ∘ f = f
 * - Right identity: f ∘ id_A = f
 *
 * Interactive animation shows composition with identities
 * to build intuition that "identities do nothing."
 */

import { useState, useCallback, useEffect } from 'react';

// ============================================================================
// Types
// ============================================================================

type AnimationState = 'idle' | 'composing-left' | 'composing-right' | 'complete';

interface ObjectNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface MorphismPath {
  id: string;
  from: string;
  to: string;
  label: string;
  isIdentity: boolean;
  color: string;
  opacity: number;
}

// ============================================================================
// Component
// ============================================================================

export function IdentityAnimation() {
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [activeDemo, setActiveDemo] = useState<'left' | 'right'>('left');
  const [isPlaying, setIsPlaying] = useState(false);

  // Objects
  const objects: ObjectNode[] = [
    { id: 'A', label: 'A', x: 100, y: 150 },
    { id: 'B', label: 'B', x: 300, y: 150 },
  ];

  // Morphisms
  const baseMorphisms: MorphismPath[] = [
    {
      id: 'f',
      from: 'A',
      to: 'B',
      label: 'f',
      isIdentity: false,
      color: '#10B981',
      opacity: 1,
    },
    {
      id: 'id_A',
      from: 'A',
      to: 'A',
      label: 'id_A',
      isIdentity: true,
      color: '#3B82F6',
      opacity: 0.5,
    },
    {
      id: 'id_B',
      from: 'B',
      to: 'B',
      label: 'id_B',
      isIdentity: true,
      color: '#3B82F6',
      opacity: 0.5,
    },
  ];

  // Animate composition
  useEffect(() => {
    if (!isPlaying) return;

    const sequence = async () => {
      setAnimationState('idle');
      await sleep(500);

      if (activeDemo === 'left') {
        // Demonstrate id_B ∘ f = f
        setAnimationState('composing-left');
        await sleep(2000);
      } else {
        // Demonstrate f ∘ id_A = f
        setAnimationState('composing-right');
        await sleep(2000);
      }

      setAnimationState('complete');
      await sleep(1500);

      setAnimationState('idle');
      setIsPlaying(false);
    };

    sequence();
  }, [isPlaying, activeDemo]);

  const handlePlay = useCallback((demo: 'left' | 'right') => {
    setActiveDemo(demo);
    setIsPlaying(true);
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setAnimationState('idle');
  }, []);

  // Get morphism styles based on animation state
  const getMorphismStyle = (id: string): React.CSSProperties => {
    const base = baseMorphisms.find((m) => m.id === id);
    if (!base) return {};

    let opacity = base.opacity;
    let strokeWidth = 2;
    let stroke = base.color;

    if (animationState === 'composing-left') {
      if (id === 'id_B') {
        opacity = 1;
        strokeWidth = 3;
      } else if (id === 'f') {
        opacity = 1;
        strokeWidth = 3;
      }
    } else if (animationState === 'composing-right') {
      if (id === 'id_A') {
        opacity = 1;
        strokeWidth = 3;
      } else if (id === 'f') {
        opacity = 1;
        strokeWidth = 3;
      }
    } else if (animationState === 'complete') {
      if (id === 'f') {
        opacity = 1;
        strokeWidth = 4;
        stroke = '#F59E0B'; // Highlight result
      } else {
        opacity = 0.3;
      }
    }

    return {
      opacity,
      strokeWidth,
      stroke,
      transition: 'all 0.5s ease-in-out',
    };
  };

  return (
    <div className="identity-animation">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Identity Morphisms
        </h3>
        <p className="text-gray-700">
          Every object has an <strong>identity morphism</strong> that acts like "doing nothing."
          Watch how composing with identities leaves morphisms unchanged.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Visualization */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <svg width="400" height="300" className="w-full">
            {/* Objects */}
            {objects.map((obj) => (
              <g key={obj.id}>
                <circle
                  cx={obj.x}
                  cy={obj.y}
                  r={30}
                  fill="#3B82F6"
                  fillOpacity={0.1}
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <text
                  x={obj.x}
                  y={obj.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-lg font-bold"
                  fill="#1E40AF"
                >
                  {obj.label}
                </text>

                {/* Identity loop */}
                {obj.id === 'A' && (
                  <g>
                    <path
                      d={`M ${obj.x - 20} ${obj.y - 30}
                          Q ${obj.x - 50} ${obj.y - 60} ${obj.x} ${obj.y - 40}
                          Q ${obj.x + 50} ${obj.y - 60} ${obj.x + 20} ${obj.y - 30}`}
                      fill="none"
                      style={getMorphismStyle('id_A')}
                      strokeDasharray="4 2"
                    />
                    <text
                      x={obj.x}
                      y={obj.y - 70}
                      textAnchor="middle"
                      className="text-xs"
                      fill="#3B82F6"
                      style={{ opacity: getMorphismStyle('id_A').opacity }}
                    >
                      id_A
                    </text>
                  </g>
                )}

                {obj.id === 'B' && (
                  <g>
                    <path
                      d={`M ${obj.x - 20} ${obj.y - 30}
                          Q ${obj.x - 50} ${obj.y - 60} ${obj.x} ${obj.y - 40}
                          Q ${obj.x + 50} ${obj.y - 60} ${obj.x + 20} ${obj.y - 30}`}
                      fill="none"
                      style={getMorphismStyle('id_B')}
                      strokeDasharray="4 2"
                    />
                    <text
                      x={obj.x}
                      y={obj.y - 70}
                      textAnchor="middle"
                      className="text-xs"
                      fill="#3B82F6"
                      style={{ opacity: getMorphismStyle('id_B').opacity }}
                    >
                      id_B
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* Morphism f: A → B */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#10B981" />
              </marker>
              <marker
                id="arrowhead-highlight"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#F59E0B" />
              </marker>
            </defs>
            <line
              x1={objects[0].x + 30}
              y1={objects[0].y}
              x2={objects[1].x - 30}
              y2={objects[1].y}
              style={getMorphismStyle('f')}
              markerEnd={
                animationState === 'complete' ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'
              }
            />
            <text
              x={(objects[0].x + objects[1].x) / 2}
              y={objects[0].y - 15}
              textAnchor="middle"
              className="text-sm font-semibold"
              style={{ fill: getMorphismStyle('f').stroke }}
            >
              f
            </text>

            {/* Composition visualization */}
            {animationState !== 'idle' && (
              <g>
                {activeDemo === 'left' ? (
                  <text
                    x={200}
                    y={250}
                    textAnchor="middle"
                    className="text-lg font-bold"
                    fill="#F59E0B"
                    style={{ opacity: animationState === 'complete' ? 1 : 0.7 }}
                  >
                    {animationState === 'complete' ? 'id_B ∘ f = f ✓' : 'id_B ∘ f = ?'}
                  </text>
                ) : (
                  <text
                    x={200}
                    y={250}
                    textAnchor="middle"
                    className="text-lg font-bold"
                    fill="#F59E0B"
                    style={{ opacity: animationState === 'complete' ? 1 : 0.7 }}
                  >
                    {animationState === 'complete' ? 'f ∘ id_A = f ✓' : 'f ∘ id_A = ?'}
                  </text>
                )}
              </g>
            )}
          </svg>
        </div>

        {/* Right: Controls and Explanation */}
        <div className="space-y-4">
          {/* Controls */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Demonstrate Identity Laws
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => handlePlay('left')}
                disabled={isPlaying}
                className="w-full px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                Left Identity: id_B ∘ f = f
              </button>
              <button
                onClick={() => handlePlay('right')}
                disabled={isPlaying}
                className="w-full px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                Right Identity: f ∘ id_A = f
              </button>
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              What are Identity Morphisms?
            </h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                Every object <strong>A</strong> has a special morphism{' '}
                <strong>id_A: A → A</strong> that "does nothing."
              </p>
              <p>These satisfy two laws:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Left identity:</strong> For any f: A → B,
                  <br />
                  <code className="text-xs bg-blue-100 px-1 rounded">id_B ∘ f = f</code>
                </li>
                <li>
                  <strong>Right identity:</strong> For any f: A → B,
                  <br />
                  <code className="text-xs bg-blue-100 px-1 rounded">f ∘ id_A = f</code>
                </li>
              </ul>
            </div>
          </div>

          {/* Current State Display */}
          {animationState !== 'idle' && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 animate-fadeIn">
              <h4 className="text-sm font-semibold text-amber-900 mb-2">
                {animationState === 'complete' ? '✓ Composition Result' : '⏳ Composing...'}
              </h4>
              <div className="text-sm text-amber-800">
                {activeDemo === 'left' ? (
                  <>
                    <p className="mb-2">
                      We compose <strong>id_B</strong> (after) with <strong>f</strong>{' '}
                      (before):
                    </p>
                    <div className="font-mono text-xs bg-amber-100 p-2 rounded">
                      id_B: B → B
                      <br />
                      f: A → B
                      <br />
                      <br />
                      id_B ∘ f: A → B
                    </div>
                    {animationState === 'complete' && (
                      <p className="mt-2 font-semibold">
                        The result is just <strong>f</strong>! The identity did nothing.
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="mb-2">
                      We compose <strong>f</strong> (after) with <strong>id_A</strong>{' '}
                      (before):
                    </p>
                    <div className="font-mono text-xs bg-amber-100 p-2 rounded">
                      f: A → B
                      <br />
                      id_A: A → A
                      <br />
                      <br />
                      f ∘ id_A: A → B
                    </div>
                    {animationState === 'complete' && (
                      <p className="mt-2 font-semibold">
                        The result is just <strong>f</strong>! The identity did nothing.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Examples */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-green-900 mb-2">
              Concrete Examples
            </h4>
            <div className="text-sm text-green-800 space-y-2">
              <div>
                <strong>Set:</strong> id_A(x) = x for all x ∈ A
                <br />
                <span className="text-xs">
                  Composing with identity just returns the same element
                </span>
              </div>
              <div>
                <strong>Grp:</strong> id_G is the identity element of G
                <br />
                <span className="text-xs">
                  φ(e) = e and e · g = g · e = g
                </span>
              </div>
              <div>
                <strong>Vect:</strong> id_V is the identity matrix
                <br />
                <span className="text-xs">
                  I · v = v for all vectors v
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mathematical Formalization */}
      <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
        <h4 className="text-lg font-bold text-purple-900 mb-3">
          Formal Definition
        </h4>
        <div className="text-sm text-purple-800 space-y-3">
          <p>
            A category <strong>𝒞</strong> must have, for each object <strong>A</strong>, a
            morphism <strong>id_A: A → A</strong> such that:
          </p>
          <div className="bg-purple-100 p-4 rounded font-mono text-xs">
            <p>
              For all f: A → B,
              <br />
              &nbsp;&nbsp;id_B ∘ f = f &nbsp;&nbsp;<span className="text-purple-600">(left identity)</span>
              <br />
              &nbsp;&nbsp;f ∘ id_A = f &nbsp;&nbsp;<span className="text-purple-600">(right identity)</span>
            </p>
          </div>
          <p>
            This is one of the <strong>two axioms</strong> that define a category (the
            other is associativity of composition).
          </p>
        </div>
      </div>

      {/* Interactive Challenge */}
      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <h4 className="text-sm font-bold text-blue-900 mb-2">
          🎯 Think About It
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Why do we need BOTH left and right identity laws?</li>
          <li>• Can an object have more than one identity morphism?</li>
          <li>
            • What would happen if we tried to build a category without identity morphisms?
          </li>
          <li>
            • In Set, the identity function is trivial. But in other categories (like Grp),
            it carries important structure!
          </li>
        </ul>
      </div>
    </div>
  );
}

// ============================================================================
// Utility
// ============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
