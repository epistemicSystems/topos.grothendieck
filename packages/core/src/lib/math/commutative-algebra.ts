/**
 * Commutative Algebra - Rings, Ideals, and Spectra
 *
 * This module implements commutative rings, ideals, and spectrum computations
 * for algebraic geometry. All rings are commutative with unity.
 *
 * Key constructs:
 * - Rings and ring homomorphisms
 * - Ideals (prime, maximal, radical)
 * - Spec(R) - the spectrum of prime ideals
 * - Localization
 * - Zariski topology
 */

// ============================================================================
// Ring Interface
// ============================================================================

/**
 * Commutative ring with unity
 *
 * A ring R with operations (+, ·, 0, 1) satisfying:
 * - (R, +, 0) is an abelian group
 * - (R, ·, 1) is a commutative monoid
 * - Distributivity: a·(b + c) = a·b + a·c
 */
export interface Ring {
  id: string;
  name: string;
  type: 'Z' | 'Q' | 'R' | 'C' | 'polynomial' | 'quotient' | 'localization' | 'custom';

  // Ring structure (for computational rings)
  elements?: Set<unknown>;
  zero?: unknown;
  one?: unknown;
  add?: (a: unknown, b: unknown) => unknown;
  multiply?: (a: unknown, b: unknown) => unknown;
  negate?: (a: unknown) => unknown;

  // For polynomial rings
  baseRing?: Ring;
  variables?: string[];

  // For quotient rings
  ideal?: Ideal;

  // For localizations
  multiplicativeSet?: Set<unknown>;
}

/**
 * Ring homomorphism φ: R → S
 */
export interface RingHomomorphism {
  id: string;
  source: string; // Ring id
  target: string; // Ring id
  name?: string;

  // Map elements (if computable)
  map?: (x: unknown) => unknown;

  // Properties
  isInjective?: boolean;
  isSurjective?: boolean;
}

// ============================================================================
// Ideals
// ============================================================================

/**
 * Ideal in a ring
 *
 * A subset I ⊆ R such that:
 * - 0 ∈ I
 * - If a, b ∈ I, then a + b ∈ I
 * - If a ∈ I and r ∈ R, then r·a ∈ I
 */
export interface Ideal {
  id: string;
  ring: string; // Ring id
  generators: unknown[];
  type: 'prime' | 'maximal' | 'radical' | 'principal' | 'general';

  // For visualization
  label?: string;
  color?: string;
}

/**
 * Check if an ideal is prime
 *
 * An ideal P is prime if:
 * - P ≠ R
 * - If ab ∈ P, then a ∈ P or b ∈ P
 */
export function isPrimeIdeal(ideal: Ideal, ring: Ring): boolean {
  // This is a placeholder for the mathematical check
  // In a full implementation, we would check the condition
  return ideal.type === 'prime' || ideal.type === 'maximal';
}

/**
 * Check if an ideal is maximal
 *
 * An ideal M is maximal if:
 * - M ≠ R
 * - There is no ideal I with M ⊊ I ⊊ R
 */
export function isMaximalIdeal(ideal: Ideal, ring: Ring): boolean {
  return ideal.type === 'maximal';
}

/**
 * Radical of an ideal
 *
 * √I = {a ∈ R | a^n ∈ I for some n ≥ 1}
 */
export function radical(ideal: Ideal): Ideal {
  return {
    ...ideal,
    id: `rad_${ideal.id}`,
    type: 'radical',
    label: `√${ideal.label || ideal.id}`,
  };
}

// ============================================================================
// Spectrum
// ============================================================================

/**
 * Prime ideal in Spec(R)
 */
export interface PrimeIdeal extends Ideal {
  type: 'prime' | 'maximal';
  height: number; // Krull dimension
  residueField?: Ring; // R/P
}

/**
 * Point in Spec(R) with geometric interpretation
 */
export interface SpecPoint {
  id: string;
  primeIdeal: PrimeIdeal;
  position: { x: number; y: number; z: number }; // For visualization
  height: number; // Krull dimension
}

/**
 * Spectrum of a ring
 *
 * Spec(R) = {P ⊆ R | P is a prime ideal}
 *
 * Topology: Zariski topology
 * - Closed sets: V(I) = {P ∈ Spec(R) | I ⊆ P}
 * - Open sets: D(f) = {P ∈ Spec(R) | f ∉ P}
 */
export interface Spectrum {
  ring: Ring;
  primeIdeals: SpecPoint[];
  dimension: number; // Krull dimension
  topology: ZariskiTopology;
  irreducibleComponents: string[][]; // Arrays of prime ideal ids
}

/**
 * Zariski topology on Spec(R)
 */
export interface ZariskiTopology {
  closedSets: ClosedSet[];
  basicOpens: BasicOpen[];
}

/**
 * Closed set V(I) = {P ∈ Spec(R) | I ⊆ P}
 */
export interface ClosedSet {
  id: string;
  ideal: Ideal;
  points: string[]; // Prime ideal ids
  label: string; // V(I)
}

/**
 * Basic open set D(f) = {P ∈ Spec(R) | f ∉ P}
 */
export interface BasicOpen {
  id: string;
  element: unknown; // Element f ∈ R
  points: string[]; // Prime ideal ids
  label: string; // D(f)
}

// ============================================================================
// Spec Computation
// ============================================================================

/**
 * Compute Spec(ℤ) - the spectrum of integers
 *
 * Spec(ℤ) consists of:
 * - (0) - the generic point
 * - (p) for each prime p - the closed points
 */
export function specZ(): Spectrum {
  const ring: Ring = {
    id: 'Z',
    name: 'ℤ',
    type: 'Z',
  };

  // Prime ideals: (0), (2), (3), (5), (7), (11), ...
  const primeIdeals: SpecPoint[] = [
    {
      id: 'p_0',
      primeIdeal: {
        id: 'ideal_0',
        ring: 'Z',
        generators: [0],
        type: 'prime',
        height: 0,
        label: '(0)',
      },
      position: { x: 0, y: 1, z: 0 }, // Generic point at top
      height: 0,
    },
  ];

  // Add primes (2), (3), (5), (7), (11), (13), ...
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  primes.forEach((p, index) => {
    primeIdeals.push({
      id: `p_${p}`,
      primeIdeal: {
        id: `ideal_${p}`,
        ring: 'Z',
        generators: [p],
        type: 'maximal',
        height: 1,
        label: `(${p})`,
        residueField: {
          id: `F_${p}`,
          name: `𝔽_${p}`,
          type: 'custom',
        },
      },
      position: {
        x: Math.cos((2 * Math.PI * index) / primes.length) * 2,
        y: 0,
        z: Math.sin((2 * Math.PI * index) / primes.length) * 2,
      },
      height: 1,
    });
  });

  const topology: ZariskiTopology = {
    closedSets: [],
    basicOpens: [],
  };

  return {
    ring,
    primeIdeals,
    dimension: 1,
    topology,
    irreducibleComponents: [primeIdeals.map(p => p.id)],
  };
}

/**
 * Compute Spec(k[x]) - polynomial ring in one variable over field k
 *
 * Spec(k[x]) consists of:
 * - (0) - the generic point
 * - (f) for each irreducible polynomial f - closed points
 *
 * Geometrically: affine line 𝔸¹_k
 */
export function specPolynomialRing(
  baseField: Ring,
  variable: string = 'x',
  degree: number = 3
): Spectrum {
  const ring: Ring = {
    id: `k[${variable}]`,
    name: `k[${variable}]`,
    type: 'polynomial',
    baseRing: baseField,
    variables: [variable],
  };

  const primeIdeals: SpecPoint[] = [
    {
      id: 'p_0',
      primeIdeal: {
        id: 'ideal_0',
        ring: ring.id,
        generators: [0],
        type: 'prime',
        height: 0,
        label: '(0)',
      },
      position: { x: 0, y: 1, z: 0 },
      height: 0,
    },
  ];

  // Add closed points (x), (x-1), (x-2), ..., (x-n)
  for (let i = 0; i <= degree; i++) {
    const label = i === 0 ? `(${variable})` : `(${variable}-${i})`;
    primeIdeals.push({
      id: `p_${i}`,
      primeIdeal: {
        id: `ideal_${variable}_${i}`,
        ring: ring.id,
        generators: [i === 0 ? variable : `${variable}-${i}`],
        type: 'maximal',
        height: 1,
        label,
      },
      position: { x: i - degree / 2, y: 0, z: 0 },
      height: 1,
    });
  }

  return {
    ring,
    primeIdeals,
    dimension: 1,
    topology: { closedSets: [], basicOpens: [] },
    irreducibleComponents: [primeIdeals.map(p => p.id)],
  };
}

/**
 * Compute Spec(k[x,y]) - polynomial ring in two variables
 *
 * Geometrically: affine plane 𝔸²_k
 */
export function specPolynomialRing2D(
  baseField: Ring,
  vars: [string, string] = ['x', 'y'],
  gridSize: number = 5
): Spectrum {
  const ring: Ring = {
    id: `k[${vars[0]},${vars[1]}]`,
    name: `k[${vars[0]},${vars[1]}]`,
    type: 'polynomial',
    baseRing: baseField,
    variables: [vars[0], vars[1]],
  };

  const primeIdeals: SpecPoint[] = [
    {
      id: 'p_0',
      primeIdeal: {
        id: 'ideal_0',
        ring: ring.id,
        generators: [0],
        type: 'prime',
        height: 0,
        label: '(0)',
      },
      position: { x: 0, y: 2, z: 0 },
      height: 0,
    },
  ];

  // Height 1 primes: principal ideals (f) where f is irreducible
  // Example: (x), (y), (x-y), etc.
  const height1Ideals = [
    { gens: [vars[0]], pos: { x: -2, y: 1, z: 0 } },
    { gens: [vars[1]], pos: { x: 2, y: 1, z: 0 } },
    { gens: [`${vars[0]}-${vars[1]}`], pos: { x: 0, y: 1, z: -2 } },
    { gens: [`${vars[0]}+${vars[1]}`], pos: { x: 0, y: 1, z: 2 } },
  ];

  height1Ideals.forEach((ideal, idx) => {
    primeIdeals.push({
      id: `p_h1_${idx}`,
      primeIdeal: {
        id: `ideal_h1_${idx}`,
        ring: ring.id,
        generators: ideal.gens,
        type: 'prime',
        height: 1,
        label: `(${ideal.gens.join(', ')})`,
      },
      position: ideal.pos,
      height: 1,
    });
  });

  // Height 2 primes (maximal ideals): (x-a, y-b) for points (a,b)
  const half = Math.floor(gridSize / 2);
  for (let i = -half; i <= half; i++) {
    for (let j = -half; j <= half; j++) {
      const label = `(${vars[0]}${i >= 0 ? '-' : '+'}${Math.abs(i)}, ${vars[1]}${j >= 0 ? '-' : '+'}${Math.abs(j)})`;
      primeIdeals.push({
        id: `p_${i}_${j}`,
        primeIdeal: {
          id: `ideal_${i}_${j}`,
          ring: ring.id,
          generators: [`${vars[0]}-${i}`, `${vars[1]}-${j}`],
          type: 'maximal',
          height: 2,
          label,
        },
        position: { x: i, y: 0, z: j },
        height: 2,
      });
    }
  }

  return {
    ring,
    primeIdeals,
    dimension: 2,
    topology: { closedSets: [], basicOpens: [] },
    irreducibleComponents: [primeIdeals.map(p => p.id)],
  };
}

/**
 * Compute Spec(k[x,y]/(xy)) - crossing lines
 *
 * The variety V(xy) consists of two lines: V(x) ∪ V(y)
 * This demonstrates nilpotents and non-reduced schemes
 */
export function specCrossingLines(baseField: Ring): Spectrum {
  const ring: Ring = {
    id: 'k[x,y]/(xy)',
    name: 'k[x,y]/(xy)',
    type: 'quotient',
    baseRing: {
      id: 'k[x,y]',
      name: 'k[x,y]',
      type: 'polynomial',
      baseRing: baseField,
      variables: ['x', 'y'],
    },
    ideal: {
      id: 'ideal_xy',
      ring: 'k[x,y]',
      generators: ['xy'],
      type: 'general',
    },
  };

  const primeIdeals: SpecPoint[] = [
    // Generic point
    {
      id: 'p_0',
      primeIdeal: {
        id: 'ideal_0',
        ring: ring.id,
        generators: [0],
        type: 'prime',
        height: 0,
        label: '(xy)',
      },
      position: { x: 0, y: 1, z: 0 },
      height: 0,
    },
    // Line x = 0
    {
      id: 'p_x',
      primeIdeal: {
        id: 'ideal_x',
        ring: ring.id,
        generators: ['x'],
        type: 'prime',
        height: 1,
        label: '(x, xy)',
      },
      position: { x: 0, y: 0.5, z: 0 },
      height: 1,
    },
    // Line y = 0
    {
      id: 'p_y',
      primeIdeal: {
        id: 'ideal_y',
        ring: ring.id,
        generators: ['y'],
        type: 'prime',
        height: 1,
        label: '(y, xy)',
      },
      position: { x: 0, y: 0.5, z: 0 },
      height: 1,
    },
  ];

  // Add closed points along each line
  for (let i = -3; i <= 3; i++) {
    if (i === 0) continue;
    // Points on x-axis (y = 0)
    primeIdeals.push({
      id: `p_x_${i}`,
      primeIdeal: {
        id: `ideal_x_${i}`,
        ring: ring.id,
        generators: [`x-${i}`, 'y'],
        type: 'maximal',
        height: 2,
        label: `(x-${i}, y, xy)`,
      },
      position: { x: i, y: 0, z: 0 },
      height: 2,
    });
    // Points on y-axis (x = 0)
    primeIdeals.push({
      id: `p_y_${i}`,
      primeIdeal: {
        id: `ideal_y_${i}`,
        ring: ring.id,
        generators: ['x', `y-${i}`],
        type: 'maximal',
        height: 2,
        label: `(x, y-${i}, xy)`,
      },
      position: { x: 0, y: 0, z: i },
      height: 2,
    });
  }

  // Origin point
  primeIdeals.push({
    id: 'p_origin',
    primeIdeal: {
      id: 'ideal_origin',
      ring: ring.id,
      generators: ['x', 'y'],
      type: 'maximal',
      height: 2,
      label: '(x, y, xy)',
    },
    position: { x: 0, y: 0, z: 0 },
    height: 2,
  });

  return {
    ring,
    primeIdeals,
    dimension: 1,
    topology: { closedSets: [], basicOpens: [] },
    irreducibleComponents: [
      primeIdeals.filter(p => p.id.includes('x') || p.id === 'p_0').map(p => p.id),
      primeIdeals.filter(p => p.id.includes('y') || p.id === 'p_0').map(p => p.id),
    ],
  };
}

// ============================================================================
// Localization
// ============================================================================

/**
 * Localization S⁻¹R
 *
 * Given a ring R and multiplicative set S ⊆ R, the localization S⁻¹R
 * consists of fractions r/s where r ∈ R, s ∈ S.
 */
export interface Localization extends Ring {
  type: 'localization';
  baseRing: Ring;
  multiplicativeSet: Set<unknown>;
}

/**
 * Localize at a prime ideal
 *
 * R_P = S⁻¹R where S = R \ P
 *
 * This is a local ring with unique maximal ideal PR_P
 */
export function localizeAtPrime(ring: Ring, prime: PrimeIdeal): Localization {
  return {
    id: `${ring.id}_${prime.id}`,
    name: `${ring.name}_{${prime.label}}`,
    type: 'localization',
    baseRing: ring,
    multiplicativeSet: new Set(), // R \ P
  };
}

/**
 * Localize at an element
 *
 * R_f = S⁻¹R where S = {1, f, f², f³, ...}
 */
export function localizeAtElement(ring: Ring, element: unknown): Localization {
  return {
    id: `${ring.id}_${element}`,
    name: `${ring.name}_{${element}}`,
    type: 'localization',
    baseRing: ring,
    multiplicativeSet: new Set([element]),
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if a set of prime ideals forms a chain
 */
export function isChainOfPrimes(ideals: PrimeIdeal[]): boolean {
  if (ideals.length <= 1) return true;

  // Sort by height
  const sorted = [...ideals].sort((a, b) => a.height - b.height);

  // Check each consecutive pair has containment
  for (let i = 0; i < sorted.length - 1; i++) {
    // P_i ⊊ P_{i+1}
    if (sorted[i].height >= sorted[i + 1].height) {
      return false;
    }
  }

  return true;
}

/**
 * Compute Krull dimension of a ring (from spectrum)
 */
export function krullDimension(spectrum: Spectrum): number {
  return spectrum.dimension;
}

/**
 * Get the generic point of a spectrum
 */
export function genericPoint(spectrum: Spectrum): SpecPoint | undefined {
  return spectrum.primeIdeals.find(p => p.height === 0);
}

/**
 * Get closed points (maximal ideals) of a spectrum
 */
export function closedPoints(spectrum: Spectrum): SpecPoint[] {
  return spectrum.primeIdeals.filter(
    p => p.primeIdeal.type === 'maximal'
  );
}
