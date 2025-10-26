# Mathematical Conventions

This document defines the mathematical notation, conventions, and standards used throughout the Grothendieck Explorable Explanations project.

## General Notation

### Objects

- **Capital letters**: A, B, C, X, Y, Z for objects
- **Script letters**: 𝒞, 𝒟, ℰ for categories
- **Bold**: **C**, **D** for enriched categories (if needed)

### Morphisms

- **Lowercase letters**: f, g, h for morphisms
- **Arrows**: f: A → B or A →^f B
- **Composition**: g ∘ f (right-to-left) or gf when clear
- **Identity**: id_A or 1_A

### Functors

- **Capital letters**: F, G, H
- **Notation**: F: 𝒞 → 𝒟
- **Composition**: G ∘ F (right-to-left)

### Natural Transformations

- **Greek letters**: α, β, γ, η, ε
- **Notation**: α: F ⇒ G
- **Components**: α_A: F(A) → G(A)

## Category Theory

### Categories

- **Set**: Category of sets and functions
- **Grp**: Category of groups and homomorphisms
- **Ring** or **CRing**: Category of (commutative) rings
- **Top**: Category of topological spaces
- **Vect_k**: Category of k-vector spaces
- **Cat**: Category of (small) categories

### Universal Properties

- **Products**: A × B with projections π₁, π₂
- **Coproducts**: A ⊔ B or A + B with injections ι₁, ι₂
- **Pullbacks**: A ×_C B (fiber product over C)
- **Limits**: lim(D) or ←lim for inverse limit
- **Colimits**: colim(D) or →lim for direct limit

### Adjunctions

- **Notation**: F ⊣ G (F is left adjoint to G)
- **Unit**: η: Id_𝒞 ⇒ GF
- **Counit**: ε: FG ⇒ Id_𝒟
- **Hom-set bijection**: Hom(F(A), B) ≅ Hom(A, G(B))

## Commutative Algebra

### Rings and Ideals

- **Rings**: R, S, T (assumed commutative with 1)
- **Elements**: a, b, c, r, s
- **Ideals**: I, J, K
- **Prime ideals**: 𝔭, 𝔮, 𝔯 (German lowercase)
- **Maximal ideals**: 𝔪 (German m)
- **Unit ideal**: (1) = R
- **Zero ideal**: (0) = {0}

### Ring Operations

- **Quotient**: R/I
- **Localization**: S⁻¹R or R_S
- **Localization at prime**: R_𝔭
- **Completion**: R̂ or R̂_𝔪
- **Polynomial rings**: R[x], R[x₁,...,xₙ]

### Modules

- **Modules**: M, N, P
- **Tensor product**: M ⊗_R N
- **Hom**: Hom_R(M, N)
- **Direct sum**: M ⊕ N
- **Direct product**: ∏ᵢ Mᵢ

### Spectrum

- **Spectrum**: Spec(R) = {𝔭 ⊆ R | 𝔭 prime}
- **Distinguished opens**: D(f) = {𝔭 ∈ Spec(R) | f ∉ 𝔭}
- **Closed sets**: V(I) = {𝔭 ∈ Spec(R) | I ⊆ 𝔭}

## Topology

### Topological Spaces

- **Spaces**: X, Y, Z
- **Points**: x, y, z, p, q
- **Open sets**: U, V, W
- **Closed sets**: F, G, H
- **Basis**: ℬ (script B)
- **Topology**: 𝒯 (script T)

### Sheaves and Presheaves

- **Sheaves**: ℱ, 𝒢, ℋ (script letters)
- **Presheaves**: Same notation (context makes clear)
- **Sections**: s, t ∈ ℱ(U)
- **Restriction**: s|_V or res_{U,V}(s)
- **Stalks**: ℱ_x (sheaf at point x)
- **Étalé space**: Ét(ℱ)

### Common Sheaves

- **Structure sheaf**: 𝒪_X
- **Constant sheaf**: A_X or underline(A)
- **Skyscraper sheaf**: i_x*A
- **Sheaf of continuous functions**: 𝒞⁰(-, ℝ)

## Schemes

### Schemes

- **Schemes**: X, Y, Z
- **Affine schemes**: Spec(R)
- **Projective space**: ℙⁿ or ℙⁿ_k
- **Affine space**: 𝔸ⁿ or 𝔸ⁿ_k

### Morphisms

- **Scheme morphisms**: f: X → Y
- **Structure morphism**: π: X → Spec(k)
- **Open immersion**: U ↪ X
- **Closed immersion**: Z ↪ X
- **Diagonal**: Δ: X → X ×_S X

### Fiber Products

- **Notation**: X ×_S Y (fiber product over S)
- **Fiber**: X_s = X ×_S Spec(k(s))

### Properties

- **Separated**: Diagonal is closed immersion
- **Proper**: Separated, finite type, universally closed
- **Smooth**: Flat with smooth fibers
- **Étale**: Flat, unramified

## Grothendieck Topologies

### Sites

- **Site**: (𝒞, J) where J is Grothendieck topology
- **Covering**: {Uᵢ → U}ᵢ∈I
- **Sieve**: S ↪ Hom(-, U)

### Standard Topologies

- **Zariski**: Zar
- **Étale**: ét or Et
- **Flat**: fppf (fidèlement plat de présentation finie)
- **Very flat**: fpqc (fidèlement plat quasi-compacte)

### Sheaves on Sites

- **Category of sheaves**: Sh(𝒞, J)
- **Category of presheaves**: PSh(𝒞)
- **Sheafification**: (-)⁺ or a(-)

## Topos Theory

### Topoi

- **Grothendieck topos**: ℰ, ℱ
- **Elementary topos**: Usually denoted same
- **Slice topos**: ℰ/X

### Special Objects

- **Subobject classifier**: Ω
- **Truth morphism**: true: 1 → Ω
- **Power object**: P(X) or Ω^X

### Geometric Morphisms

- **Notation**: f: ℰ → ℱ (geometric morphism)
- **Inverse image**: f*: ℱ → ℰ
- **Direct image**: f*: ℰ → ℱ
- **Point**: x: Set → ℰ

## Cohomology

### Derived Functors

- **Right derived**: R^i F
- **Left derived**: L_i F
- **Cohomology**: H^i(X, ℱ)
- **Homology**: H_i(X, ℱ)

### Sheaf Cohomology

- **Čech cohomology**: Ȟ^i(𝒰, ℱ)
- **Derived functor cohomology**: H^i(X, ℱ)
- **Étale cohomology**: H^i_ét(X, ℱ)
- **ℓ-adic cohomology**: H^i_ét(X, ℤ/ℓⁿℤ)

## Color Coding

### Category Theory

- **Objects**: Blue (#3B82F6)
- **Morphisms**: Green (#10B981)
- **Functors**: Orange (#F59E0B)
- **Natural transformations**: Purple (#A855F7)
- **Adjunctions**: Gold highlights

### Algebra

- **Rings**: Dark blue (#1E40AF)
- **Prime ideals**: Red (#EF4444)
- **Maximal ideals**: Dark red (#DC2626)
- **Non-prime ideals**: Orange (#F97316)
- **Modules**: Teal (#14B8A6)

### Topology

- **Open sets**: Blue with 30% opacity
- **Closed sets**: Red with 30% opacity
- **Clopen sets**: Violet (#8B5CF6)
- **Points**: Small black dots
- **Basis elements**: Light blue

### Sheaves

- **Sections**: Green gradient
- **Stalks**: Concentrated color at point
- **Restriction maps**: Animated blue flows
- **Structure sheaf**: Gold (#F59E0B)

## Typography

### Math Rendering (KaTeX)

- **Inline math**: `$...$`
- **Display math**: `$$...$$`
- **Font**: Computer Modern (default KaTeX)

### Code

- **Font**: JetBrains Mono
- **Size**: 0.9rem
- **Background**: Light gray

### UI Text

- **Font**: System font stack
- **Headings**: Sans-serif, bold
- **Body**: Sans-serif, regular

## Symbols

### Common Symbols

- **Set membership**: ∈, ∉
- **Subset**: ⊆, ⊊
- **Superset**: ⊇, ⊋
- **Empty set**: ∅
- **Union**: ∪
- **Intersection**: ∩
- **Product**: ×
- **Coproduct**: ⊔ or +
- **Tensor**: ⊗
- **Direct sum**: ⊕
- **Isomorphism**: ≅
- **Equivalence**: ≃
- **Natural bijection**: ≈
- **Homeomorphism**: ≅ or ≈

### Arrows

- **Function**: →
- **Injection**: ↪
- **Surjection**: ↠
- **Bijection**: →~ or ≅
- **Natural transformation**: ⇒
- **Adjunction**: ⊣
- **Isomorphism**: ≅ or ←→

### Quantifiers

- **For all**: ∀
- **Exists**: ∃
- **Unique existence**: ∃!

## Diagrams

### Commutative Diagrams

```
A ──f──> B
│        │
g│        │h
│        │
↓        ↓
C ──k──> D
```

Commutativity: h ∘ f = k ∘ g

### Exact Sequences

```
0 → A →^f B →^g C → 0
```

Exactness: ker(g) = im(f)

## Best Practices

### Notation

1. **Be consistent**: Use same notation throughout
2. **Follow standards**: Use conventional notation when it exists
3. **Define clearly**: Define non-standard notation when first used
4. **Link notation**: Color-code related concepts consistently
5. **Accessibility**: Provide text alternatives for symbols

### Mathematical Writing

1. **Precise definitions**: Use exact mathematical language
2. **State assumptions**: Make hypotheses explicit
3. **Proof structure**: Clear steps, justification for each
4. **Examples first**: Concrete before abstract
5. **Multiple views**: Algebraic, geometric, categorical

### Pedagogical Considerations

1. **Build intuition**: Use visualizations to build understanding
2. **Progressive formality**: Start informal, become rigorous
3. **Active learning**: Make students interact with concepts
4. **Check understanding**: Embed assessments
5. **Connect concepts**: Link to prerequisites and future topics

---

**Document Version**: 1.0
**Last Updated**: 2025-10-26
**Status**: Foundation
