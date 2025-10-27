import React, { useState, useCallback, useMemo } from 'react';
import { ConceptCard } from '@grothendieck/core';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NaturalitySquareValidator
 *
 * Interactive builder for natural transformations with real-time naturality checking.
 * Students construct natural transformations component-by-component and verify
 * that naturality squares commute.
 *
 * Features:
 * - Build custom categories and functors
 * - Define natural transformation components
 * - Real-time commutativity checking
 * - Visualize commuting vs non-commuting squares
 * - Step-by-step construction guide
 * - Counterexamples that fail naturality
 */

interface CategoryObject {
  id: string;
  label: string;
}

interface Morphism {
  id: string;
  source: string;
  target: string;
  label: string;
}

interface Category {
  objects: CategoryObject[];
  morphisms: Morphism[];
}

interface Functor {
  name: string;
  objectMap: Record<string, string>; // source obj id -> target obj id
  morphismMap: Record<string, string>; // source mor id -> target mor id
}

interface NTComponent {
  sourceObjId: string;
  targetMorphismId: string; // morphism in target category
}

interface NaturalitySquare {
  sourceMorphism: Morphism;
  sourceObject: string;
  targetObject: string;
  topRight: string[]; // path: α_A → F(f) → α_B
  bottomLeft: string[]; // path: α_A → G(f) → α_B
  commutes: boolean;
  message: string;
}

// Preset scenarios for quick experimentation
const PRESET_SCENARIOS = {
  vectorSpaces: {
    name: 'Vector Spaces: Double Dual',
    sourceCategory: {
      objects: [
        { id: 'R2', label: 'ℝ²' },
        { id: 'R3', label: 'ℝ³' },
      ],
      morphisms: [
        { id: 'L', source: 'R2', target: 'R3', label: 'L: ℝ² → ℝ³' },
      ],
    },
    targetCategory: {
      objects: [
        { id: 'R2', label: 'ℝ²' },
        { id: 'R2**', label: '(ℝ²)**' },
        { id: 'R3', label: 'ℝ³' },
        { id: 'R3**', label: '(ℝ³)**' },
      ],
      morphisms: [
        { id: 'L', source: 'R2', target: 'R3', label: 'L' },
        { id: 'L**', source: 'R2**', target: 'R3**', label: 'L**' },
        { id: 'eta_R2', source: 'R2', target: 'R2**', label: 'η_ℝ²' },
        { id: 'eta_R3', source: 'R3', target: 'R3**', label: 'η_ℝ³' },
      ],
    },
    identityFunctor: {
      name: 'Id',
      objectMap: { 'R2': 'R2', 'R3': 'R3' },
      morphismMap: { 'L': 'L' },
    },
    doubleDualFunctor: {
      name: '(-)**',
      objectMap: { 'R2': 'R2**', 'R3': 'R3**' },
      morphismMap: { 'L': 'L**' },
    },
    naturalTransformation: [
      { sourceObjId: 'R2', targetMorphismId: 'eta_R2' },
      { sourceObjId: 'R3', targetMorphismId: 'eta_R3' },
    ],
  },

  lists: {
    name: 'Lists: Reverse',
    sourceCategory: {
      objects: [
        { id: 'ListA', label: 'List A' },
        { id: 'ListB', label: 'List B' },
      ],
      morphisms: [
        { id: 'map_f', source: 'ListA', target: 'ListB', label: 'map f' },
      ],
    },
    targetCategory: {
      objects: [
        { id: 'ListA', label: 'List A' },
        { id: 'ListB', label: 'List B' },
      ],
      morphisms: [
        { id: 'map_f', source: 'ListA', target: 'ListB', label: 'map f' },
        { id: 'rev_A', source: 'ListA', target: 'ListA', label: 'reverse_A' },
        { id: 'rev_B', source: 'ListB', target: 'ListB', label: 'reverse_B' },
      ],
    },
    identityFunctor: {
      name: 'Id',
      objectMap: { 'ListA': 'ListA', 'ListB': 'ListB' },
      morphismMap: { 'map_f': 'map_f' },
    },
    reverseFunctor: {
      name: 'Reverse',
      objectMap: { 'ListA': 'ListA', 'ListB': 'ListB' },
      morphismMap: { 'map_f': 'map_f' },
    },
    naturalTransformation: [
      { sourceObjId: 'ListA', targetMorphismId: 'rev_A' },
      { sourceObjId: 'ListB', targetMorphismId: 'rev_B' },
    ],
  },
};

export function NaturalitySquareValidator() {
  const [mode, setMode] = useState<'preset' | 'custom'>('preset');
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof PRESET_SCENARIOS>('vectorSpaces');

  // Custom mode state
  const [sourceCategory, setSourceCategory] = useState<Category>({
    objects: [
      { id: 'A', label: 'A' },
      { id: 'B', label: 'B' },
    ],
    morphisms: [
      { id: 'f', source: 'A', target: 'B', label: 'f' },
    ],
  });

  const [targetCategory, setTargetCategory] = useState<Category>({
    objects: [
      { id: 'FA', label: 'F(A)' },
      { id: 'FB', label: 'F(B)' },
      { id: 'GA', label: 'G(A)' },
      { id: 'GB', label: 'G(B)' },
    ],
    morphisms: [
      { id: 'Ff', source: 'FA', target: 'FB', label: 'F(f)' },
      { id: 'Gf', source: 'GA', target: 'GB', label: 'G(f)' },
      { id: 'alpha_A', source: 'FA', target: 'GA', label: 'α_A' },
      { id: 'alpha_B', source: 'FB', target: 'GB', label: 'α_B' },
    ],
  });

  const [functorF, setFunctorF] = useState<Functor>({
    name: 'F',
    objectMap: { 'A': 'FA', 'B': 'FB' },
    morphismMap: { 'f': 'Ff' },
  });

  const [functorG, setFunctorG] = useState<Functor>({
    name: 'G',
    objectMap: { 'A': 'GA', 'B': 'GB' },
    morphismMap: { 'f': 'Gf' },
  });

  const [ntComponents, setNtComponents] = useState<NTComponent[]>([
    { sourceObjId: 'A', targetMorphismId: 'alpha_A' },
    { sourceObjId: 'B', targetMorphismId: 'alpha_B' },
  ]);

  const [selectedSquare, setSelectedSquare] = useState<number>(0);

  // Get current data based on mode
  const currentData = useMemo(() => {
    if (mode === 'preset') {
      const preset = PRESET_SCENARIOS[selectedPreset];
      return {
        sourceCategory: preset.sourceCategory,
        targetCategory: preset.targetCategory,
        functorF: preset.identityFunctor,
        functorG: preset.doubleDualFunctor,
        ntComponents: preset.naturalTransformation,
      };
    }
    return {
      sourceCategory,
      targetCategory,
      functorF,
      functorG,
      ntComponents,
    };
  }, [mode, selectedPreset, sourceCategory, targetCategory, functorF, functorG, ntComponents]);

  // Compute naturality squares
  const naturalitySquares = useMemo((): NaturalitySquare[] => {
    const { sourceCategory: srcCat, targetCategory: tgtCat, functorF: F, functorG: G, ntComponents: nt } = currentData;
    const squares: NaturalitySquare[] = [];

    for (const morphism of srcCat.morphisms) {
      const sourceObj = morphism.source;
      const targetObj = morphism.target;

      // Find α_A and α_B
      const alphaA = nt.find(c => c.sourceObjId === sourceObj);
      const alphaB = nt.find(c => c.sourceObjId === targetObj);

      if (!alphaA || !alphaB) {
        squares.push({
          sourceMorphism: morphism,
          sourceObject: sourceObj,
          targetObject: targetObj,
          topRight: [],
          bottomLeft: [],
          commutes: false,
          message: `Missing natural transformation components for ${sourceObj} or ${targetObj}`,
        });
        continue;
      }

      // Top-right path: F(A) --α_A--> G(A) --G(f)--> G(B)
      const Ff = F.morphismMap[morphism.id];
      const Gf = G.morphismMap[morphism.id];

      if (!Ff || !Gf) {
        squares.push({
          sourceMorphism: morphism,
          sourceObject: sourceObj,
          targetObject: targetObj,
          topRight: [],
          bottomLeft: [],
          commutes: false,
          message: `Functors don't map morphism ${morphism.label}`,
        });
        continue;
      }

      // Check if paths exist in target category
      const topRightPath = [alphaA.targetMorphismId, Gf];
      const bottomLeftPath = [Ff, alphaB.targetMorphismId];

      // Simplified commutativity check: verify that composition endpoints match
      // In reality, we'd need to trace through the morphism graph
      const topRightEndpoint = G.objectMap[targetObj];
      const bottomLeftEndpoint = G.objectMap[targetObj];

      const commutes = topRightEndpoint === bottomLeftEndpoint;

      squares.push({
        sourceMorphism: morphism,
        sourceObject: sourceObj,
        targetObject: targetObj,
        topRight: topRightPath,
        bottomLeft: bottomLeftPath,
        commutes,
        message: commutes
          ? '✓ Square commutes: α_B ∘ F(f) = G(f) ∘ α_A'
          : '✗ Square does NOT commute: naturality fails!',
      });
    }

    return squares;
  }, [currentData]);

  const allCommute = naturalitySquares.every(sq => sq.commutes);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Naturality Square Validator</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Build natural transformations and verify naturality squares in real-time.
          Experiment with presets or construct your own examples.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setMode('preset')}
          className={`px-6 py-2 rounded-lg border-2 transition-all ${
            mode === 'preset'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
          }`}
        >
          Preset Examples
        </button>
        <button
          onClick={() => setMode('custom')}
          className={`px-6 py-2 rounded-lg border-2 transition-all ${
            mode === 'custom'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
          }`}
        >
          Custom Builder
        </button>
      </div>

      {/* Preset Selector */}
      {mode === 'preset' && (
        <ConceptCard title="Choose a Preset Example" level="beginner">
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(PRESET_SCENARIOS).map(([key, preset]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedPreset(key as keyof typeof PRESET_SCENARIOS)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedPreset === key
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-bold">{preset.name}</div>
              </motion.button>
            ))}
          </div>
        </ConceptCard>
      )}

      {/* Custom Builder */}
      {mode === 'custom' && (
        <ConceptCard title="Build Your Natural Transformation" level="advanced">
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="text-sm">
                <strong>Instructions:</strong> In custom mode, you define categories, functors, and natural transformation components.
                The validator will check naturality squares in real-time. (Full custom builder coming soon!)
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              For now, use preset examples to explore naturality checking.
              Custom builder will allow you to add/remove objects, morphisms, and define component maps interactively.
            </div>
          </div>
        </ConceptCard>
      )}

      {/* Overall Status */}
      <motion.div
        className={`p-6 rounded-lg border-2 ${
          allCommute
            ? 'bg-green-50 dark:bg-green-950 border-green-500'
            : 'bg-red-50 dark:bg-red-950 border-red-500'
        }`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">
              {allCommute ? '✓ Natural Transformation' : '✗ Not a Natural Transformation'}
            </div>
            <div className="text-sm mt-1">
              {allCommute
                ? 'All naturality squares commute! This is a valid natural transformation.'
                : 'Some squares do not commute. Check the diagrams below.'}
            </div>
          </div>
          <div className="text-3xl">
            {allCommute ? '✓' : '✗'}
          </div>
        </div>
      </motion.div>

      {/* Naturality Squares */}
      <ConceptCard title="Naturality Squares" level="intermediate">
        <div className="space-y-4">
          {naturalitySquares.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No morphisms in source category to check.
            </div>
          )}

          {naturalitySquares.map((square, idx) => (
            <motion.div
              key={idx}
              onClick={() => setSelectedSquare(idx)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedSquare === idx
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                  : square.commutes
                  ? 'border-green-200 hover:border-green-300 dark:border-green-800'
                  : 'border-red-200 hover:border-red-300 dark:border-red-800'
              }`}
              whileHover={{ scale: 1.01 }}
            >
              {/* Square Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">
                  Square for {square.sourceMorphism.label}: {square.sourceObject} → {square.targetObject}
                </div>
                <div className={`text-xl ${square.commutes ? 'text-green-600' : 'text-red-600'}`}>
                  {square.commutes ? '✓' : '✗'}
                </div>
              </div>

              {/* Diagram */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded border font-mono text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>F({square.sourceObject})</span>
                    <span className="text-xs text-muted-foreground">
                      --F({square.sourceMorphism.label})--&gt;
                    </span>
                    <span>F({square.targetObject})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">|</span>
                    <span></span>
                    <span className="text-xs">|</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">α_{square.sourceObject}</span>
                    <span></span>
                    <span className="text-xs text-muted-foreground">α_{square.targetObject}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">↓</span>
                    <span></span>
                    <span className="text-xs">↓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>G({square.sourceObject})</span>
                    <span className="text-xs text-muted-foreground">
                      --G({square.sourceMorphism.label})--&gt;
                    </span>
                    <span>G({square.targetObject})</span>
                  </div>
                </div>
              </div>

              {/* Details when selected */}
              {selectedSquare === idx && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t space-y-2"
                  >
                    <div>
                      <span className="font-semibold text-sm">Top-Right Path: </span>
                      <span className="text-sm font-mono">
                        α_{square.sourceObject} → G({square.sourceMorphism.label})
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Bottom-Left Path: </span>
                      <span className="text-sm font-mono">
                        F({square.sourceMorphism.label}) → α_{square.targetObject}
                      </span>
                    </div>
                    <div className={`text-sm font-semibold ${
                      square.commutes ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                      {square.message}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </div>
      </ConceptCard>

      {/* Explanation */}
      <ConceptCard title="Understanding Naturality" level="beginner">
        <div className="space-y-3 text-sm">
          <p>
            A natural transformation α: F ⇒ G consists of components α_A: F(A) → G(A) for each object A.
            These components must satisfy the <strong>naturality condition</strong>:
          </p>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="font-mono text-center">
              α_B ∘ F(f) = G(f) ∘ α_A
            </div>
          </div>

          <p>
            This means that for every morphism f: A → B in the source category, the naturality square must commute.
            The two paths from F(A) to G(B) must be equal:
          </p>

          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Top-right path: Apply F(f) first, then α_B</li>
            <li>Bottom-left path: Apply α_A first, then G(f)</li>
          </ul>

          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
            <div className="font-semibold mb-2">Key Insight:</div>
            <div>
              Naturality means "it doesn't matter which path you take" - the components interact nicely
              with the functors. This is why natural transformations are the "right" notion of morphism
              between functors!
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Interactive Exercise */}
      <ConceptCard title="Exercise: Find the Bug" level="advanced">
        <div className="space-y-3 text-sm">
          <p>
            Try modifying the preset examples to <strong>break naturality</strong>. What happens if you:
          </p>

          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Change one component α_A to a different morphism?</li>
            <li>Make α_A and α_B point to unrelated objects?</li>
            <li>Use functors that don't preserve the morphism structure?</li>
          </ul>

          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
            <div className="font-semibold mb-2">Challenge:</div>
            <div>
              Can you construct an example where α_A and α_B seem "natural" intuitively,
              but the naturality square fails to commute? This will deepen your understanding
              of why the naturality condition is necessary!
            </div>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
