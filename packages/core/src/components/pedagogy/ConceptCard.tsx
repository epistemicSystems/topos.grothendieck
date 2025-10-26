/**
 * ConceptCard - Expandable Mathematical Concept Definitions
 *
 * Displays mathematical terms with expandable definitions, examples, and related concepts.
 * Supports:
 * - Collapsed: term + short definition
 * - Hover: preview of additional info
 * - Click: full expansion with examples and links
 * - Interactive explorations (optional)
 *
 * @example
 * ```tsx
 * <ConceptCard
 *   term="Category"
 *   shortDefinition="A collection of objects and morphisms with composition"
 *   fullDefinition="A category 𝒞 consists of..."
 *   examples={[
 *     'Set: objects are sets, morphisms are functions',
 *     'Grp: objects are groups, morphisms are group homomorphisms'
 *   ]}
 *   related={['Functor', 'Natural Transformation']}
 * />
 * ```
 */

import React, { useState, useCallback } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface ConceptCardProps {
  // Core content
  term: string;
  shortDefinition: string;
  fullDefinition?: string;
  examples?: string[];
  related?: string[];

  // Optional interactive exploration
  interactive?: React.ReactNode;

  // Visual options
  defaultExpanded?: boolean;
  colorScheme?: 'blue' | 'green' | 'purple' | 'amber';
  showIcon?: boolean;

  // Interactions
  onExpand?: () => void;
  onRelatedClick?: (term: string) => void;

  // Accessibility
  ariaLabel?: string;
}

// ============================================================================
// Color Schemes
// ============================================================================

const COLOR_SCHEMES = {
  blue: {
    border: 'border-blue-300',
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    accent: 'text-blue-600',
    hover: 'hover:bg-blue-100',
    badge: 'bg-blue-100 text-blue-800',
  },
  green: {
    border: 'border-green-300',
    bg: 'bg-green-50',
    text: 'text-green-900',
    accent: 'text-green-600',
    hover: 'hover:bg-green-100',
    badge: 'bg-green-100 text-green-800',
  },
  purple: {
    border: 'border-purple-300',
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    accent: 'text-purple-600',
    hover: 'hover:bg-purple-100',
    badge: 'bg-purple-100 text-purple-800',
  },
  amber: {
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    accent: 'text-amber-600',
    hover: 'hover:bg-amber-100',
    badge: 'bg-amber-100 text-amber-800',
  },
};

// ============================================================================
// Component
// ============================================================================

export const ConceptCard = React.memo<ConceptCardProps>(
  function ConceptCard({
    term,
    shortDefinition,
    fullDefinition,
    examples,
    related,
    interactive,
    defaultExpanded = false,
    colorScheme = 'blue',
    showIcon = true,
    onExpand,
    onRelatedClick,
    ariaLabel,
  }) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [isHovered, setIsHovered] = useState(false);
    const colors = COLOR_SCHEMES[colorScheme];

    const handleToggle = useCallback(() => {
      const newState = !isExpanded;
      setIsExpanded(newState);
      if (newState && onExpand) {
        onExpand();
      }
    }, [isExpanded, onExpand]);

    const handleRelatedClick = useCallback(
      (relatedTerm: string) => {
        if (onRelatedClick) {
          onRelatedClick(relatedTerm);
        }
      },
      [onRelatedClick]
    );

    return (
      <div
        className={`concept-card border-2 rounded-lg transition-all duration-300 ${colors.border} ${colors.bg} ${
          isHovered ? 'shadow-lg' : 'shadow-sm'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="article"
        aria-label={ariaLabel || `Concept: ${term}`}
      >
        {/* Header - Always visible */}
        <button
          onClick={handleToggle}
          className={`w-full p-4 text-left transition-colors ${colors.hover}`}
          aria-expanded={isExpanded}
          aria-controls={`concept-${term.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                {showIcon && (
                  <span className={`text-2xl ${colors.accent}`} aria-hidden="true">
                    📚
                  </span>
                )}
                <h3 className={`text-lg font-bold ${colors.text}`}>{term}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-700">{shortDefinition}</p>
            </div>

            {/* Expand/Collapse Icon */}
            <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}>
              <svg
                className={`w-6 h-6 ${colors.accent}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div
            id={`concept-${term.toLowerCase().replace(/\s+/g, '-')}`}
            className="px-4 pb-4 space-y-4 animate-fadeIn"
          >
            {/* Full Definition */}
            {fullDefinition && (
              <div className="pt-4 border-t border-gray-300">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Full Definition
                </h4>
                <div
                  className="text-sm text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: fullDefinition }}
                />
              </div>
            )}

            {/* Examples */}
            {examples && examples.length > 0 && (
              <div className="pt-4 border-t border-gray-300">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Examples</h4>
                <ul className="space-y-2">
                  {examples.map((example, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className={`mt-1 ${colors.accent}`}>•</span>
                      <span
                        className="text-sm text-gray-700 flex-1"
                        dangerouslySetInnerHTML={{ __html: example }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Exploration */}
            {interactive && (
              <div className="pt-4 border-t border-gray-300">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Interactive Exploration
                </h4>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  {interactive}
                </div>
              </div>
            )}

            {/* Related Concepts */}
            {related && related.length > 0 && (
              <div className="pt-4 border-t border-gray-300">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Related Concepts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {related.map((relatedTerm) => (
                    <button
                      key={relatedTerm}
                      onClick={() => handleRelatedClick(relatedTerm)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${colors.badge} ${colors.hover} cursor-pointer`}
                      aria-label={`View concept: ${relatedTerm}`}
                    >
                      {relatedTerm}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hover Preview (when collapsed) */}
        {!isExpanded && isHovered && fullDefinition && (
          <div className="px-4 pb-4 pt-2 border-t border-gray-300 animate-fadeIn">
            <p className="text-xs text-gray-600 italic">
              Click to see full definition, examples, and more...
            </p>
          </div>
        )}
      </div>
    );
  }
);

ConceptCard.displayName = 'ConceptCard';

// ============================================================================
// Utility: Group of Concept Cards
// ============================================================================

export interface ConceptCardGroupProps {
  concepts: Omit<ConceptCardProps, 'onRelatedClick'>[];
  onConceptClick?: (term: string) => void;
  columns?: 1 | 2 | 3;
}

/**
 * ConceptCardGroup - Display multiple concept cards in a grid
 */
export const ConceptCardGroup = React.memo<ConceptCardGroupProps>(
  function ConceptCardGroup({ concepts, onConceptClick, columns = 2 }) {
    const gridCols = {
      1: 'grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-2 lg:grid-cols-3',
    };

    return (
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {concepts.map((concept, index) => (
          <ConceptCard
            key={concept.term}
            {...concept}
            onRelatedClick={onConceptClick}
          />
        ))}
      </div>
    );
  }
);

ConceptCardGroup.displayName = 'ConceptCardGroup';
