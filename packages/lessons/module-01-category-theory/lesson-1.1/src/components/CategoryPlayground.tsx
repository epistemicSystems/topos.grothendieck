/**
 * CategoryPlayground - Interactive Category Builder
 *
 * Students build custom categories by:
 * - Adding objects to the canvas
 * - Drawing morphisms between objects
 * - Composing morphisms interactively
 * - Validating category axioms in real-time
 *
 * Learning goals:
 * - Hands-on construction of categories
 * - Understanding identity morphisms
 * - Understanding composition
 * - Seeing axiom validation in practice
 */

import { useState, useCallback, useMemo } from 'react';
import { Category } from '@grothendieck/core';
import { CategoryDiagram } from '@grothendieck/core';

// ============================================================================
// Types
// ============================================================================

interface PlaygroundObject {
  id: string;
  label: string;
  definition?: string;
  position?: { x: number; y: number };
}

interface PlaygroundMorphism {
  id: string;
  from: string;
  to: string;
  label: string;
  isIdentity?: boolean;
  isComposite?: boolean;
  composedFrom?: [string, string]; // [f, g] where this = g ∘ f
}

type Mode = 'add-object' | 'add-morphism' | 'compose' | 'select';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// Example Categories
// ============================================================================

const EXAMPLE_CATEGORIES = {
  empty: {
    name: 'Empty Category',
    objects: [],
    morphisms: [],
  },
  discrete: {
    name: 'Discrete Category (3 objects)',
    objects: [
      { id: 'A', label: 'A', definition: 'Object A' },
      { id: 'B', label: 'B', definition: 'Object B' },
      { id: 'C', label: 'C', definition: 'Object C' },
    ],
    morphisms: [],
  },
  monoid: {
    name: 'Monoid as Category (1 object)',
    objects: [{ id: 'M', label: 'M', definition: 'Single object' }],
    morphisms: [
      { id: 'f', from: 'M', to: 'M', label: 'f' },
      { id: 'g', from: 'M', to: 'M', label: 'g' },
    ],
  },
  triangle: {
    name: 'Triangle Category',
    objects: [
      { id: 'A', label: 'A', definition: 'Object A' },
      { id: 'B', label: 'B', definition: 'Object B' },
      { id: 'C', label: 'C', definition: 'Object C' },
    ],
    morphisms: [
      { id: 'f', from: 'A', to: 'B', label: 'f' },
      { id: 'g', from: 'B', to: 'C', label: 'g' },
      { id: 'h', from: 'A', to: 'C', label: 'h = g ∘ f' },
    ],
  },
};

// ============================================================================
// Component
// ============================================================================

export function CategoryPlayground() {
  // State
  const [objects, setObjects] = useState<PlaygroundObject[]>([]);
  const [morphisms, setMorphisms] = useState<PlaygroundMorphism[]>([]);
  const [mode, setMode] = useState<Mode>('add-object');
  const [selectedMorphisms, setSelectedMorphisms] = useState<string[]>([]);
  const [objectCounter, setObjectCounter] = useState(0);
  const [morphismCounter, setMorphismCounter] = useState(0);
  const [showIdentities, setShowIdentities] = useState(true);
  const [autoCompose, setAutoCompose] = useState(false);

  // Build Category instance for validation
  const category = useMemo(() => {
    const cat = new Category(
      'Playground Category',
      objects,
      morphisms.map((m) => ({
        id: m.id,
        source: m.from,
        target: m.to,
        label: m.label,
      }))
    );

    return cat;
  }, [objects, morphisms]);

  // Validation
  const validation = useMemo((): ValidationResult => {
    const result = category.verify();
    const warnings: string[] = [];

    // Check for missing identities
    objects.forEach((obj) => {
      const hasIdentity = morphisms.some(
        (m) => m.from === obj.id && m.to === obj.id && m.isIdentity
      );
      if (!hasIdentity && objects.length > 0) {
        warnings.push(`Missing identity morphism for ${obj.label}`);
      }
    });

    // Check for potential compositions
    if (autoCompose) {
      morphisms.forEach((f) => {
        morphisms.forEach((g) => {
          if (f.to === g.from && !f.isIdentity && !g.isIdentity) {
            const compositeExists = morphisms.some(
              (h) =>
                h.from === f.from &&
                h.to === g.to &&
                h.isComposite &&
                h.composedFrom?.[0] === f.id &&
                h.composedFrom?.[1] === g.id
            );
            if (!compositeExists) {
              warnings.push(`Can compose ${g.label} ∘ ${f.label}`);
            }
          }
        });
      });
    }

    return {
      valid: result.valid,
      errors: result.errors,
      warnings,
    };
  }, [category, objects, morphisms, autoCompose]);

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleAddObject = useCallback(() => {
    const newId = `obj${objectCounter}`;
    const newLabel = String.fromCharCode(65 + objectCounter); // A, B, C, ...

    const newObj: PlaygroundObject = {
      id: newId,
      label: newLabel,
      definition: `Object ${newLabel}`,
    };

    setObjects((prev) => [...prev, newObj]);
    setObjectCounter((c) => c + 1);

    // Auto-add identity morphism
    if (showIdentities) {
      const idMorphism: PlaygroundMorphism = {
        id: `id_${newId}`,
        from: newId,
        to: newId,
        label: `id_${newLabel}`,
        isIdentity: true,
      };
      setMorphisms((prev) => [...prev, idMorphism]);
    }
  }, [objectCounter, showIdentities]);

  const handleAddMorphism = useCallback(
    (fromId: string, toId: string) => {
      const from = objects.find((o) => o.id === fromId);
      const to = objects.find((o) => o.id === toId);

      if (!from || !to) return;

      const newId = `mor${morphismCounter}`;
      const newLabel = `f${morphismCounter}`;

      const newMorphism: PlaygroundMorphism = {
        id: newId,
        from: fromId,
        to: toId,
        label: newLabel,
        isIdentity: fromId === toId,
      };

      setMorphisms((prev) => [...prev, newMorphism]);
      setMorphismCounter((c) => c + 1);
    },
    [objects, morphismCounter]
  );

  const handleComposeMorphisms = useCallback(() => {
    if (selectedMorphisms.length !== 2) return;

    const [fId, gId] = selectedMorphisms;
    const f = morphisms.find((m) => m.id === fId);
    const g = morphisms.find((m) => m.id === gId);

    if (!f || !g) return;

    // Check composability: f: A → B, g: B → C
    if (f.to !== g.from) {
      alert(`Cannot compose: ${f.label}: ${f.from}→${f.to} and ${g.label}: ${g.from}→${g.to}`);
      return;
    }

    // Create composite h = g ∘ f
    const newId = `comp${morphismCounter}`;
    const newLabel = `${g.label}∘${f.label}`;

    const composite: PlaygroundMorphism = {
      id: newId,
      from: f.from,
      to: g.to,
      label: newLabel,
      isComposite: true,
      composedFrom: [fId, gId],
    };

    setMorphisms((prev) => [...prev, composite]);
    setMorphismCounter((c) => c + 1);
    setSelectedMorphisms([]);
  }, [selectedMorphisms, morphisms, morphismCounter]);

  const handleMorphismClick = useCallback(
    (id: string) => {
      if (mode === 'compose') {
        setSelectedMorphisms((prev) => {
          if (prev.includes(id)) {
            return prev.filter((mId) => mId !== id);
          }
          if (prev.length < 2) {
            return [...prev, id];
          }
          return [prev[1], id]; // Keep last selected
        });
      }
    },
    [mode]
  );

  const handleDeleteObject = useCallback((id: string) => {
    setObjects((prev) => prev.filter((o) => o.id !== id));
    // Remove all morphisms involving this object
    setMorphisms((prev) => prev.filter((m) => m.from !== id && m.to !== id));
  }, []);

  const handleDeleteMorphism = useCallback((id: string) => {
    setMorphisms((prev) => prev.filter((m) => m.id !== id));
    // Remove composites that used this morphism
    setMorphisms((prev) =>
      prev.filter(
        (m) =>
          !m.composedFrom || (!m.composedFrom.includes(id))
      )
    );
  }, []);

  const handleLoadExample = useCallback((exampleKey: keyof typeof EXAMPLE_CATEGORIES) => {
    const example = EXAMPLE_CATEGORIES[exampleKey];
    setObjects(example.objects.map((o, i) => ({ ...o, id: `obj${i}` })));

    const morphismsToAdd: PlaygroundMorphism[] = example.morphisms.map((m, i) => ({
      id: `mor${i}`,
      from: m.from,
      to: m.to,
      label: m.label,
      isIdentity: m.from === m.to,
    }));

    // Add identity morphisms if enabled
    if (showIdentities) {
      example.objects.forEach((obj, i) => {
        const objId = `obj${i}`;
        const hasIdentity = morphismsToAdd.some(
          (m) => m.from === objId && m.to === objId
        );
        if (!hasIdentity) {
          morphismsToAdd.push({
            id: `id_obj${i}`,
            from: objId,
            to: objId,
            label: `id_${obj.label}`,
            isIdentity: true,
          });
        }
      });
    }

    setMorphisms(morphismsToAdd);
    setObjectCounter(example.objects.length);
    setMorphismCounter(example.morphisms.length);
  }, [showIdentities]);

  const handleClear = useCallback(() => {
    setObjects([]);
    setMorphisms([]);
    setSelectedMorphisms([]);
    setObjectCounter(0);
    setMorphismCounter(0);
  }, []);

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="category-playground">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Category Playground
        </h3>
        <p className="text-gray-700">
          Build your own category! Add objects, draw morphisms, and compose them.
          The system will validate the category axioms in real-time.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Panel: Controls */}
        <div className="space-y-4">
          {/* Mode Selection */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Mode</h4>
            <div className="space-y-2">
              <button
                onClick={() => setMode('add-object')}
                className={`w-full px-3 py-2 text-sm rounded transition-colors ${
                  mode === 'add-object'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Add Object
              </button>
              <button
                onClick={() => setMode('add-morphism')}
                disabled={objects.length < 2}
                className={`w-full px-3 py-2 text-sm rounded transition-colors ${
                  mode === 'add-morphism'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
                }`}
              >
                Add Morphism
              </button>
              <button
                onClick={() => setMode('compose')}
                disabled={morphisms.filter((m) => !m.isIdentity).length < 2}
                className={`w-full px-3 py-2 text-sm rounded transition-colors ${
                  mode === 'compose'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
                }`}
              >
                Compose Morphisms
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Actions</h4>
            <div className="space-y-2">
              {mode === 'add-object' && (
                <button
                  onClick={handleAddObject}
                  className="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  + Add Object
                </button>
              )}

              {mode === 'compose' && selectedMorphisms.length === 2 && (
                <button
                  onClick={handleComposeMorphisms}
                  className="w-full px-3 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  Compose Selected
                </button>
              )}

              <button
                onClick={handleClear}
                className="w-full px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Options</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showIdentities}
                  onChange={(e) => setShowIdentities(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Show identity morphisms</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoCompose}
                  onChange={(e) => setAutoCompose(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Suggest compositions</span>
              </label>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Load Example</h4>
            <div className="space-y-2">
              {Object.entries(EXAMPLE_CATEGORIES).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => handleLoadExample(key as keyof typeof EXAMPLE_CATEGORIES)}
                  className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-left"
                >
                  {example.name}
                </button>
              ))}
            </div>
          </div>

          {/* Validation Status */}
          <div
            className={`border-2 rounded-lg p-4 ${
              validation.valid
                ? 'bg-green-50 border-green-300'
                : 'bg-red-50 border-red-300'
            }`}
          >
            <h4 className="text-sm font-semibold mb-2">
              {validation.valid ? '✓ Valid Category' : '✗ Invalid Category'}
            </h4>
            {validation.errors.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-red-700 mb-1">Errors:</p>
                <ul className="text-xs text-red-600 space-y-1">
                  {validation.errors.map((error, i) => (
                    <li key={i}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            {validation.warnings.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-amber-700 mb-1">Suggestions:</p>
                <ul className="text-xs text-amber-600 space-y-1">
                  {validation.warnings.slice(0, 3).map((warning, i) => (
                    <li key={i}>• {warning}</li>
                  ))}
                  {validation.warnings.length > 3 && (
                    <li>• ... and {validation.warnings.length - 3} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Center/Right: Visualization */}
        <div className="col-span-2">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            {objects.length === 0 ? (
              <div className="flex items-center justify-center h-96 text-gray-400">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">Empty Category</p>
                  <p className="text-sm">Add objects to get started</p>
                </div>
              </div>
            ) : (
              <CategoryDiagram
                objects={objects.map((obj) => ({
                  id: obj.id,
                  label: obj.label,
                  definition: obj.definition,
                }))}
                morphisms={morphisms
                  .filter((m) => showIdentities || !m.isIdentity)
                  .map((m) => ({
                    id: m.id,
                    from: m.from,
                    to: m.to,
                    label: m.label,
                    style: m.isIdentity
                      ? 'dashed'
                      : m.isComposite
                      ? 'dotted'
                      : 'solid',
                    color: selectedMorphisms.includes(m.id)
                      ? '#A855F7'
                      : m.isComposite
                      ? '#F59E0B'
                      : undefined,
                  }))}
                width={600}
                height={500}
                onMorphismClick={mode === 'compose' ? handleMorphismClick : undefined}
                animated={true}
                colorScheme="default"
              />
            )}

            {/* Morphism Builder */}
            {mode === 'add-morphism' && objects.length >= 2 && (
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded">
                <p className="text-sm font-semibold text-green-900 mb-2">
                  Add Morphism
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">From:</label>
                    <select
                      id="from-select"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    >
                      <option value="">Select object</option>
                      {objects.map((obj) => (
                        <option key={obj.id} value={obj.id}>
                          {obj.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">To:</label>
                    <select
                      id="to-select"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    >
                      <option value="">Select object</option>
                      {objects.map((obj) => (
                        <option key={obj.id} value={obj.id}>
                          {obj.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const fromSelect = document.getElementById('from-select') as HTMLSelectElement;
                    const toSelect = document.getElementById('to-select') as HTMLSelectElement;
                    if (fromSelect.value && toSelect.value) {
                      handleAddMorphism(fromSelect.value, toSelect.value);
                      fromSelect.value = '';
                      toSelect.value = '';
                    }
                  }}
                  className="mt-3 w-full px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Create Morphism
                </button>
              </div>
            )}

            {/* Composition Helper */}
            {mode === 'compose' && (
              <div className="mt-4 p-4 bg-purple-50 border-2 border-purple-200 rounded">
                <p className="text-sm font-semibold text-purple-900 mb-2">
                  Compose Morphisms
                </p>
                <p className="text-xs text-purple-700 mb-2">
                  Click two morphisms to compose them. The first morphism's target must
                  match the second morphism's source.
                </p>
                {selectedMorphisms.length > 0 && (
                  <div className="text-xs text-purple-800">
                    Selected:{' '}
                    {selectedMorphisms
                      .map((id) => morphisms.find((m) => m.id === id)?.label)
                      .join(', ')}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Object/Morphism List */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* Objects */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Objects ({objects.length})
              </h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {objects.map((obj) => (
                  <div
                    key={obj.id}
                    className="flex items-center justify-between text-xs bg-gray-50 px-2 py-1 rounded"
                  >
                    <span className="font-mono">{obj.label}</span>
                    <button
                      onClick={() => handleDeleteObject(obj.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Delete object ${obj.label}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Morphisms */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Morphisms ({morphisms.filter((m) => !m.isIdentity).length})
              </h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {morphisms
                  .filter((m) => !m.isIdentity)
                  .map((mor) => (
                    <div
                      key={mor.id}
                      className="flex items-center justify-between text-xs bg-gray-50 px-2 py-1 rounded"
                    >
                      <span className="font-mono">
                        {mor.label}: {objects.find((o) => o.id === mor.from)?.label} →{' '}
                        {objects.find((o) => o.id === mor.to)?.label}
                      </span>
                      <button
                        onClick={() => handleDeleteMorphism(mor.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Delete morphism ${mor.label}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Prompt */}
      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <h4 className="text-sm font-bold text-blue-900 mb-2">
          🎯 Challenge: Can you build...?
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• A discrete category (objects only, no morphisms except identities)</li>
          <li>• A monoid as a category (one object, multiple morphisms)</li>
          <li>
            • A category with composition: if you have f: A → B and g: B → C, add h = g ∘
            f
          </li>
          <li>• Can you create an invalid category? What goes wrong?</li>
        </ul>
      </div>
    </div>
  );
}
