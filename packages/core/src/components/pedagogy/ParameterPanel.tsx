/**
 * ParameterPanel - Interactive Parameter Controls
 *
 * Control panel for tweaking mathematical parameters in explorable explanations.
 * Supports:
 * - Sliders for continuous values
 * - Dropdowns for discrete choices
 * - Toggles for booleans
 * - Preset configurations
 * - Randomization
 *
 * @example
 * ```tsx
 * <ParameterPanel
 *   parameters={[
 *     {
 *       name: 'Number of objects',
 *       type: 'number',
 *       value: 5,
 *       range: [2, 10],
 *       onChange: (v) => setObjectCount(v),
 *     },
 *     {
 *       name: 'Category type',
 *       type: 'select',
 *       value: 'Set',
 *       options: ['Set', 'Grp', 'Ring'],
 *       onChange: (v) => setCategoryType(v),
 *     },
 *   ]}
 * />
 * ```
 */

import React, { useState, useCallback } from 'react';

// ============================================================================
// Types
// ============================================================================

export type ParameterType = 'number' | 'select' | 'boolean';

export interface Parameter {
  name: string;
  type: ParameterType;
  value: number | string | boolean;
  onChange: (value: any) => void;

  // For number type
  range?: [number, number];
  step?: number;

  // For select type
  options?: (string | number)[];

  // Optional
  description?: string;
  unit?: string;
  disabled?: boolean;
}

export interface ParameterPanelProps {
  parameters: Parameter[];
  presets?: Record<string, Record<string, any>>;
  showPresets?: boolean;
  showReset?: boolean;
  showRandomize?: boolean;
  onReset?: () => void;
  onRandomize?: () => void;

  ariaLabel?: string;
}

// ============================================================================
// Component
// ============================================================================

export const ParameterPanel = React.memo<ParameterPanelProps>(
  function ParameterPanel({
    parameters,
    presets,
    showPresets = true,
    showReset = true,
    showRandomize = false,
    onReset,
    onRandomize,
    ariaLabel = 'Parameter controls',
  }) {
    const [expanded, setExpanded] = useState(true);

    const handlePreset = useCallback(
      (presetName: string) => {
        if (!presets || !presets[presetName]) return;

        const preset = presets[presetName];
        parameters.forEach(param => {
          if (preset[param.name] !== undefined) {
            param.onChange(preset[param.name]);
          }
        });
      },
      [presets, parameters]
    );

    const handleRandomize = useCallback(() => {
      if (onRandomize) {
        onRandomize();
      } else {
        // Default randomization
        parameters.forEach(param => {
          if (param.type === 'number' && param.range) {
            const [min, max] = param.range;
            const random = Math.random() * (max - min) + min;
            const step = param.step || 1;
            const value = Math.round(random / step) * step;
            param.onChange(value);
          } else if (param.type === 'select' && param.options) {
            const randomIndex = Math.floor(Math.random() * param.options.length);
            param.onChange(param.options[randomIndex]);
          } else if (param.type === 'boolean') {
            param.onChange(Math.random() > 0.5);
          }
        });
      }
    }, [parameters, onRandomize]);

    return (
      <div
        className="parameter-panel bg-gray-50 rounded-lg border-2 border-gray-200"
        role="region"
        aria-label={ariaLabel}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Parameters</h3>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700"
            aria-label={expanded ? 'Collapse panel' : 'Expand panel'}
            aria-expanded={expanded}
          >
            {expanded ? '−' : '+'}
          </button>
        </div>

        {expanded && (
          <>
            {/* Parameters */}
            <div className="p-4 space-y-4">
              {parameters.map((param, index) => (
                <div key={index} className="parameter-control">
                  {/* Label */}
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {param.name}
                    {param.unit && (
                      <span className="text-gray-500 ml-1">({param.unit})</span>
                    )}
                  </label>

                  {param.description && (
                    <p className="text-xs text-gray-500 mb-2">{param.description}</p>
                  )}

                  {/* Control based on type */}
                  {param.type === 'number' && param.range && (
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={param.range[0]}
                        max={param.range[1]}
                        step={param.step || 1}
                        value={param.value as number}
                        onChange={(e) => param.onChange(Number(e.target.value))}
                        disabled={param.disabled}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        aria-label={param.name}
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{param.range[0]}</span>
                        <span className="font-semibold text-gray-900">
                          {param.value}
                          {param.unit}
                        </span>
                        <span className="text-gray-500">{param.range[1]}</span>
                      </div>
                    </div>
                  )}

                  {param.type === 'select' && param.options && (
                    <select
                      value={param.value as string}
                      onChange={(e) => param.onChange(e.target.value)}
                      disabled={param.disabled}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label={param.name}
                    >
                      {param.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {param.type === 'boolean' && (
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={param.value as boolean}
                        onChange={(e) => param.onChange(e.target.checked)}
                        disabled={param.disabled}
                        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                        aria-label={param.name}
                      />
                      <span className="text-sm text-gray-700">
                        {param.value ? 'Enabled' : 'Disabled'}
                      </span>
                    </label>
                  )}
                </div>
              ))}
            </div>

            {/* Presets */}
            {showPresets && presets && Object.keys(presets).length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(presets).map((presetName) => (
                    <button
                      key={presetName}
                      onClick={() => handlePreset(presetName)}
                      className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label={`Apply ${presetName} preset`}
                    >
                      {presetName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {(showReset || showRandomize) && (
              <div className="p-4 border-t border-gray-200 flex space-x-2">
                {showReset && (
                  <button
                    onClick={onReset}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label="Reset to default values"
                  >
                    Reset
                  </button>
                )}
                {showRandomize && (
                  <button
                    onClick={handleRandomize}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                    aria-label="Randomize parameters"
                  >
                    Randomize
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

ParameterPanel.displayName = 'ParameterPanel';
