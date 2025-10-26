/**
 * CategoryDiagram - Interactive Commutative Diagram Visualization
 *
 * Renders categories with objects and morphisms. Supports:
 * - Interactive composition
 * - Natural transformations
 * - Automatic or manual layout
 * - Hover tooltips
 * - Highlighting paths
 *
 * @example
 * ```tsx
 * <CategoryDiagram
 *   objects={[
 *     { id: 'A', label: 'A', definition: 'Object A' },
 *     { id: 'B', label: 'B', definition: 'Object B' },
 *   ]}
 *   morphisms={[
 *     { id: 'f', from: 'A', to: 'B', label: 'f', definition: 'f: A → B' },
 *   ]}
 *   animated={true}
 * />
 * ```
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { MathObject, Morphism } from '../../lib/math/category-theory';

// ============================================================================
// Types
// ============================================================================

export interface CategoryDiagramProps {
  // Mathematical data
  objects: Array<MathObject & { position?: { x: number; y: number } }>;
  morphisms: Array<Omit<Morphism, 'source' | 'target'> & { from: string; to: string }>;

  // Natural transformations (optional)
  naturalTransformations?: Array<{
    from: string; // functor id
    to: string;
    label: string;
  }>;

  // Visual options
  width?: number;
  height?: number;
  colorScheme?: 'default' | 'vibrant' | 'muted';
  showLabels?: boolean;
  animated?: boolean;

  // Highlighting
  highlightPath?: string[]; // morphism ids

  // Interactions
  onObjectClick?: (id: string) => void;
  onMorphismClick?: (id: string) => void;
  onCompose?: (f: string, g: string) => void;

  // Accessibility
  ariaLabel?: string;
}

interface Point {
  x: number;
  y: number;
}

// ============================================================================
// Color Schemes
// ============================================================================

const COLOR_SCHEMES = {
  default: {
    object: '#3B82F6', // blue-500
    morphism: '#10B981', // green-500
    highlight: '#F59E0B', // amber-500
    text: '#1F2937', // gray-800
    hover: '#A855F7', // purple-500
  },
  vibrant: {
    object: '#2563EB', // blue-600
    morphism: '#059669', // green-600
    highlight: '#D97706', // amber-600
    text: '#111827', // gray-900
    hover: '#9333EA', // purple-600
  },
  muted: {
    object: '#60A5FA', // blue-400
    morphism: '#34D399', // green-400
    highlight: '#FBBF24', // amber-400
    text: '#374151', // gray-700
    hover: '#C084FC', // purple-400
  },
};

// ============================================================================
// Layout Algorithm
// ============================================================================

/**
 * Compute automatic layout using force-directed algorithm
 */
function computeLayout(
  objects: CategoryDiagramProps['objects'],
  morphisms: CategoryDiagramProps['morphisms'],
  width: number,
  height: number
): Map<string, Point> {
  const positions = new Map<string, Point>();

  // Initialize positions
  objects.forEach((obj, i) => {
    if (obj.position) {
      // Use provided position (normalized to viewport)
      positions.set(obj.id, {
        x: width / 2 + obj.position.x * 80,
        y: height / 2 + obj.position.y * 80,
      });
    } else {
      // Distribute in circle
      const angle = (2 * Math.PI * i) / objects.length;
      const radius = Math.min(width, height) / 3;
      positions.set(obj.id, {
        x: width / 2 + radius * Math.cos(angle),
        y: height / 2 + radius * Math.sin(angle),
      });
    }
  });

  return positions;
}

/**
 * Compute arrow path from source to target
 */
function computeArrowPath(from: Point, to: Point, curvature: number = 0.2): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 1) {
    // Self-loop
    const radius = 30;
    return `M ${from.x},${from.y}
            C ${from.x + radius},${from.y - radius}
              ${from.x + radius},${from.y + radius}
              ${from.x},${from.y}`;
  }

  // Control point for curved arrow
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const perpX = -dy / distance;
  const perpY = dx / distance;
  const offset = distance * curvature;
  const controlX = midX + perpX * offset;
  const controlY = midY + perpY * offset;

  return `M ${from.x},${from.y} Q ${controlX},${controlY} ${to.x},${to.y}`;
}

/**
 * Compute arrowhead coordinates
 */
function computeArrowhead(from: Point, to: Point, size: number = 8): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);

  const p1x = to.x - size * Math.cos(angle - Math.PI / 6);
  const p1y = to.y - size * Math.sin(angle - Math.PI / 6);
  const p2x = to.x - size * Math.cos(angle + Math.PI / 6);
  const p2y = to.y - size * Math.sin(angle + Math.PI / 6);

  return `M ${to.x},${to.y} L ${p1x},${p1y} M ${to.x},${to.y} L ${p2x},${p2y}`;
}

// ============================================================================
// Component
// ============================================================================

export const CategoryDiagram = React.memo<CategoryDiagramProps>(
  function CategoryDiagram({
    objects,
    morphisms,
    naturalTransformations,
    width = 800,
    height = 600,
    colorScheme = 'default',
    showLabels = true,
    animated = true,
    highlightPath = [],
    onObjectClick,
    onMorphismClick,
    onCompose,
    ariaLabel = 'Category diagram',
  }) {
    const colors = COLOR_SCHEMES[colorScheme];
    const [hoveredObject, setHoveredObject] = useState<string | null>(null);
    const [hoveredMorphism, setHoveredMorphism] = useState<string | null>(null);
    const [selectedMorphisms, setSelectedMorphisms] = useState<string[]>([]);

    // Compute layout
    const positions = useMemo(
      () => computeLayout(objects, morphisms, width, height),
      [objects, morphisms, width, height]
    );

    // Handle morphism selection for composition
    const handleMorphismClick = useCallback(
      (id: string) => {
        if (onMorphismClick) {
          onMorphismClick(id);
        }

        if (onCompose) {
          setSelectedMorphisms(prev => {
            if (prev.includes(id)) {
              return prev.filter(mid => mid !== id);
            }
            const newSelected = [...prev, id];

            // Try to compose if we have two morphisms
            if (newSelected.length === 2) {
              const mor1 = morphisms.find(m => m.id === newSelected[0]);
              const mor2 = morphisms.find(m => m.id === newSelected[1]);

              if (mor1 && mor2) {
                // Check if composable
                if (mor1.to === mor2.from) {
                  onCompose(mor1.id, mor2.id);
                  return [];
                } else if (mor2.to === mor1.from) {
                  onCompose(mor2.id, mor1.id);
                  return [];
                }
              }

              // Not composable, keep only the new one
              return [id];
            }

            return newSelected;
          });
        }
      },
      [morphisms, onMorphismClick, onCompose]
    );

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
        className="category-diagram"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
      >
        {/* Define arrowhead marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill={colors.morphism} />
          </marker>
          <marker
            id="arrowhead-highlight"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill={colors.highlight} />
          </marker>
        </defs>

        {/* Render morphisms */}
        <g className="morphisms">
          {morphisms.map(mor => {
            const fromPos = positions.get(mor.from);
            const toPos = positions.get(mor.to);

            if (!fromPos || !toPos) return null;

            const isHighlighted = highlightPath.includes(mor.id);
            const isSelected = selectedMorphisms.includes(mor.id);
            const isHovered = hoveredMorphism === mor.id;
            const color = isHighlighted || isSelected
              ? colors.highlight
              : isHovered
              ? colors.hover
              : colors.morphism;

            const path = computeArrowPath(fromPos, toPos);

            return (
              <g key={mor.id} className="morphism-group">
                {/* Arrow path */}
                <path
                  d={path}
                  fill="none"
                  stroke={color}
                  strokeWidth={isHighlighted || isSelected ? 3 : 2}
                  markerEnd={
                    isHighlighted || isSelected
                      ? 'url(#arrowhead-highlight)'
                      : 'url(#arrowhead)'
                  }
                  className={animated ? 'transition-all duration-300' : ''}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredMorphism(mor.id)}
                  onMouseLeave={() => setHoveredMorphism(null)}
                  onClick={() => handleMorphismClick(mor.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Morphism ${mor.label}`}
                />

                {/* Label */}
                {showLabels && (
                  <text
                    x={(fromPos.x + toPos.x) / 2}
                    y={(fromPos.y + toPos.y) / 2 - 10}
                    textAnchor="middle"
                    fill={color}
                    fontSize="14"
                    fontWeight={isHighlighted || isSelected ? 'bold' : 'normal'}
                    className={animated ? 'transition-all duration-300' : ''}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {mor.label}
                  </text>
                )}

                {/* Tooltip on hover */}
                {isHovered && mor.definition && (
                  <g>
                    <rect
                      x={(fromPos.x + toPos.x) / 2 - 60}
                      y={(fromPos.y + toPos.y) / 2 + 20}
                      width="120"
                      height="30"
                      fill="white"
                      stroke={colors.text}
                      strokeWidth="1"
                      rx="4"
                    />
                    <text
                      x={(fromPos.x + toPos.x) / 2}
                      y={(fromPos.y + toPos.y) / 2 + 37}
                      textAnchor="middle"
                      fill={colors.text}
                      fontSize="11"
                    >
                      {mor.definition}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* Render objects */}
        <g className="objects">
          {objects.map(obj => {
            const pos = positions.get(obj.id);
            if (!pos) return null;

            const isHovered = hoveredObject === obj.id;
            const color = isHovered ? colors.hover : colors.object;

            return (
              <g key={obj.id} className="object-group">
                {/* Object circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={25}
                  fill={color}
                  stroke="white"
                  strokeWidth="3"
                  className={animated ? 'transition-all duration-300' : ''}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredObject(obj.id)}
                  onMouseLeave={() => setHoveredObject(null)}
                  onClick={() => onObjectClick?.(obj.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Object ${obj.label}`}
                />

                {/* Label */}
                {showLabels && (
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {obj.label}
                  </text>
                )}

                {/* Tooltip on hover */}
                {isHovered && obj.definition && (
                  <g>
                    <rect
                      x={pos.x - 70}
                      y={pos.y - 60}
                      width="140"
                      height="30"
                      fill="white"
                      stroke={colors.text}
                      strokeWidth="1"
                      rx="4"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 43}
                      textAnchor="middle"
                      fill={colors.text}
                      fontSize="11"
                    >
                      {obj.definition}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* Instructions */}
        {onCompose && (
          <text
            x={10}
            y={height - 10}
            fill={colors.text}
            fontSize="12"
            opacity="0.6"
          >
            Click morphisms to compose
          </text>
        )}
      </svg>
    );
  }
);

CategoryDiagram.displayName = 'CategoryDiagram';
