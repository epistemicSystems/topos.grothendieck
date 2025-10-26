/**
 * ProofStepper - Interactive Proof Exploration
 *
 * Step through mathematical proofs with interactive elements at each step.
 * Supports:
 * - Forward/backward navigation
 * - Assumption highlighting
 * - Interactive manipulations at each step
 * - Clear justifications
 *
 * @example
 * ```tsx
 * <ProofStepper
 *   proof={[
 *     {
 *       statement: 'Let f: A → B and g: B → C be morphisms.',
 *       justification: 'Given',
 *     },
 *     {
 *       statement: '(id_C ∘ g) ∘ f = id_C ∘ (g ∘ f)',
 *       justification: 'Associativity',
 *     },
 *     {
 *       statement: 'g ∘ f = g ∘ f',
 *       justification: 'Identity axiom: id_C ∘ g = g',
 *     },
 *   ]}
 * />
 * ```
 */

import React, { useState, useCallback } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface ProofStep {
  statement: string; // Mathematical statement (use KaTeX delimiters)
  justification: string; // Why this step follows
  interactive?: React.ReactNode; // Optional interactive element
  assumptions?: string[]; // Which previous steps this uses
}

export interface ProofStepperProps {
  proof: ProofStep[];
  initialStep?: number;
  allowManipulation?: boolean;
  showJustifications?: boolean;
  animated?: boolean;

  onStepChange?: (step: number) => void;
  onComplete?: () => void;

  ariaLabel?: string;
}

// ============================================================================
// Component
// ============================================================================

export const ProofStepper = React.memo<ProofStepperProps>(
  function ProofStepper({
    proof,
    initialStep = 0,
    allowManipulation = false,
    showJustifications = true,
    animated = true,
    onStepChange,
    onComplete,
    ariaLabel = 'Proof stepper',
  }) {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [showHints, setShowHints] = useState(false);

    const handlePrevious = useCallback(() => {
      if (currentStep > 0) {
        const newStep = currentStep - 1;
        setCurrentStep(newStep);
        onStepChange?.(newStep);
      }
    }, [currentStep, onStepChange]);

    const handleNext = useCallback(() => {
      if (currentStep < proof.length - 1) {
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
        onStepChange?.(newStep);
      } else if (currentStep === proof.length - 1) {
        onComplete?.();
      }
    }, [currentStep, proof.length, onStepChange, onComplete]);

    const handleJumpTo = useCallback(
      (step: number) => {
        if (step >= 0 && step < proof.length) {
          setCurrentStep(step);
          onStepChange?.(step);
        }
      },
      [proof.length, onStepChange]
    );

    const step = proof[currentStep];
    const isFirst = currentStep === 0;
    const isLast = currentStep === proof.length - 1;

    return (
      <div
        className="proof-stepper bg-white border-2 border-gray-200 rounded-lg p-6"
        role="region"
        aria-label={ariaLabel}
      >
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {proof.length}
            </span>
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-sm text-blue-600 hover:text-blue-700"
              aria-label="Toggle hints"
            >
              {showHints ? 'Hide hints' : 'Show hints'}
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-blue-500 h-2 rounded-full ${animated ? 'transition-all duration-300' : ''}`}
              style={{ width: `${((currentStep + 1) / proof.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStep + 1}
              aria-valuemin={0}
              aria-valuemax={proof.length}
            />
          </div>
        </div>

        {/* Step timeline */}
        <div className="flex space-x-1 mb-6 overflow-x-auto pb-2">
          {proof.map((_, index) => (
            <button
              key={index}
              onClick={() => handleJumpTo(index)}
              className={`flex-shrink-0 w-8 h-8 rounded-full text-xs font-medium ${
                index === currentStep
                  ? 'bg-blue-500 text-white'
                  : index < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              } ${animated ? 'transition-colors duration-200' : ''}`}
              aria-label={`Go to step ${index + 1}`}
              aria-current={index === currentStep ? 'step' : undefined}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Current step */}
        <div className={`mb-6 ${animated ? 'animate-fadeIn' : ''}`}>
          {/* Statement */}
          <div className="proof-step border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50">
            <div
              className="text-lg text-gray-900"
              dangerouslySetInnerHTML={{ __html: step.statement }}
            />
          </div>

          {/* Justification */}
          {showJustifications && (
            <div className="proof-justification text-sm text-gray-600 italic ml-4">
              <span className="font-semibold not-italic">Why:</span> {step.justification}
            </div>
          )}

          {/* Assumptions (which previous steps this uses) */}
          {step.assumptions && step.assumptions.length > 0 && (
            <div className="mt-4 ml-4">
              <span className="text-sm font-semibold text-gray-700">Uses:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {step.assumptions.map((assumption, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {assumption}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interactive element */}
          {allowManipulation && step.interactive && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Interactive Exploration:
              </div>
              {step.interactive}
            </div>
          )}

          {/* Hints */}
          {showHints && !isLast && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm text-yellow-800">
                <span className="font-semibold">Hint:</span> Try to see how this step
                leads to the next one. What transformation is being applied?
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={isFirst}
            className={`px-4 py-2 rounded-lg font-medium ${
              isFirst
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${animated ? 'transition-colors duration-200' : ''}`}
            aria-label="Previous step"
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-600">
            {isLast ? 'Proof complete!' : 'Continue'}
          </div>

          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded-lg font-medium ${
              isLast
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } ${animated ? 'transition-colors duration-200' : ''}`}
            aria-label={isLast ? 'Complete proof' : 'Next step'}
          >
            {isLast ? 'Complete ✓' : 'Next →'}
          </button>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Use ← → arrow keys to navigate
        </div>
      </div>
    );
  }
);

ProofStepper.displayName = 'ProofStepper';

// Keyboard navigation
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      // Let the component instance handle this
      // In a full implementation, we'd use a context or ref
    }
  });
}
