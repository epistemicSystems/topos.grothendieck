# Quick Start: Generate Your First Lesson with Claude Code
## Lesson 1.1: "What is a Category?" - Step-by-Step Guide

---

## Why Start Here?

We're beginning with Lesson 1.1 because it's foundational and establishes patterns that will cascade through all future lessons. Once you successfully generate this lesson, you'll have:

1. **A proven workflow** that works end-to-end
2. **Reusable components** that other lessons can import
3. **Validated patterns** for interactive mathematics
4. **A quality baseline** to measure future lessons against
5. **Confidence in the system** before scaling to parallel generation

Think of this as building your "Hello World" but for explorable mathematical explanations. The sophistication lies not in complexity but in establishing correct foundations.

---

## Prerequisites: One-Time Setup

Before diving in, you need to set up your environment once. This takes about 10-15 minutes.

### Step 1: Install Claude Code

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version

# Authenticate (this will open your browser)
claude auth
```

Follow the browser prompts to connect your Anthropic account. Make sure you have active billing set up.

### Step 2: Create Project Structure

```bash
# Create your project directory
mkdir grothendieck-explorable
cd grothendieck-explorable

# Initialize git
git init

# Create basic directory structure
mkdir -p packages/core/src/{components,lib,styles}
mkdir -p packages/lessons
mkdir -p .claude/commands
mkdir -p scripts
mkdir -p docs

# Create package.json
npm init -y
```

### Step 3: Create Root CLAUDE.md

This is crucial! The CLAUDE.md file gives Claude Code the context it needs to make intelligent decisions.

Create `CLAUDE.md` in your root directory with this content:

```markdown
# Grothendieck Explorable Explanations

## Project Vision
We're building the most sophisticated mathematical learning experience ever created - explorable explanations for Grothendieck's revolutionary contributions to mathematics. Every concept should be interactive, visual, and beautiful.

## Core Principles
1. **Bret Victor's explorable explanations**: Reactive documents, direct manipulation, see-touch-explore
2. **Steve Wittens' aesthetic**: GPU-accelerated beauty, smooth 60fps, elegant mathematics
3. **Mathematical rigor**: Precise definitions, correct theorems, no hand-waving
4. **No AI slop**: Avoid centered layouts, purple gradients, excessive rounding, generic design

## Technology Stack
- React 18 + TypeScript (strict mode)
- Vite for development
- Three.js r158+ for 3D visualization
- WebGPU + WGSL for compute shaders (when needed)
- Tailwind CSS + custom mathematical styling
- shadcn/ui for UI components
- KaTeX for math rendering

## Current Focus
We're building Lesson 1.1: "What is a Category?" as our foundational lesson.

This lesson introduces category theory through interactive exploration, with three main components:
1. CategoryPlayground - build and explore categories
2. CategoryZoo - gallery of familiar categories
3. IdentityAnimation - visualize identity morphisms

## Code Standards
- TypeScript strict mode, no `any` types
- Functional components with hooks
- Performance: 60fps animations, <100ms interaction latency
- Accessibility: keyboard navigation, ARIA labels

## When to Use Extended Thinking
Use "think hard" prompts for:
- Architectural decisions
- Mathematical correctness verification
- Performance optimization strategies
- Complex component design
```

Now you're ready to start!

---

## The Workflow: Research → Plan → Implement

This is the golden pattern from Anthropic's engineering team. It prevents Claude from jumping straight to code and produces dramatically better results.

### Phase 1: Research (5-10 minutes)

Start Claude Code and activate extended thinking for deep analysis:

```bash
# Start Claude Code in your project directory
cd grothendieck-explorable
claude
```

Now give Claude this prompt (copy and paste this):

```
I need to build Lesson 1.1: "What is a Category?" for our Grothendieck explorable explanations course. This is our first lesson and will establish patterns for all future lessons.

Think hard about the following:

1. MATHEMATICAL CONTENT:
   - What are the essential concepts for introducing categories?
   - What's the pedagogical progression from familiar to abstract?
   - What examples should we include? (Set, Grp, Ring, Top, Vect)
   - How do we make identity morphisms and composition intuitive?

2. INTERACTIVE COMPONENTS:
   - CategoryPlayground: How should users build and explore categories?
   - CategoryZoo: Best way to present familiar categories as examples?
   - IdentityAnimation: How to visualize "doing nothing" meaningfully?
   - What interactions make composition feel natural?

3. TECHNICAL ARCHITECTURE:
   - Should we use SVG, Canvas, or WebGL for diagrams?
   - How do we handle layout for commutative diagrams?
   - What's the data structure for categories?
   - How do we ensure 60fps with draggable objects?

4. PEDAGOGICAL FLOW:
   - How does the narrative guide users from "you already know this" to abstraction?
   - Where should interactive elements appear in the narrative?
   - What's the right balance of reading vs. doing?
   - How do we assess understanding without traditional quizzes?

5. IMPLEMENTATION STRATEGY:
   - What should we build first? (data structures, then layout, then interaction?)
   - What can we reuse from existing libraries?
   - What needs to be custom-built?
   - How do we validate correctness at each step?

Please research best practices for:
- Interactive category theory visualizations
- Force-directed graph layouts
- Mathematical education UX
- React performance optimization for animations

Then provide a comprehensive analysis with your recommendations.
```

**What happens next:** Claude will think deeply for about 15-30 seconds (you'll see the thinking indicator), then provide detailed research findings. This thinking time is worth its weight in gold - it's Claude reasoning through tradeoffs, considering alternatives, and making informed recommendations.

**What to look for in the response:**
- Specific library recommendations (e.g., D3.js vs react-force-graph vs custom)
- Data structure proposals for categories
- UI/UX patterns for interactive diagrams
- Performance considerations
- Pedagogical insights

**Your job:** Read the research findings carefully. Ask follow-up questions if anything is unclear. For example:
- "Why did you recommend D3 over react-force-graph?"
- "Can you elaborate on the force-directed layout algorithm?"
- "What are the tradeoffs of SVG vs Canvas for this use case?"

### Phase 2: Planning (10-15 minutes)

Once you're satisfied with the research, move to detailed planning:

```
Based on your research, create a detailed implementation plan for Lesson 1.1.

Structure your plan as follows:

## PART 1: FILE STRUCTURE
Show me exactly what files we need to create and what each contains.

## PART 2: DATA STRUCTURES
Define TypeScript interfaces for:
- Category (objects, morphisms, composition)
- Morphism
- CompositionPath
- Interactive state

## PART 3: COMPONENT HIERARCHY
Break down the React component tree:
- LessonShell
  - NarrativeSection
  - CategoryPlayground
    - DiagramCanvas
    - ObjectNode
    - MorphismArrow
    - CompositionUI
  - CategoryZoo
  - IdentityAnimation

## PART 4: IMPLEMENTATION SEQUENCE
Numbered steps for implementation:
1. Set up Vite project with TypeScript
2. Create data structures
3. Implement DiagramCanvas (static first)
4. Add object dragging
5. Implement morphism drawing
6. Add composition interaction
... and so on

## PART 5: VALIDATION STRATEGY
How we'll verify each piece works before moving on.

## PART 6: PERFORMANCE TARGETS
Specific metrics we're aiming for.

Save this plan to docs/lesson-1.1-implementation-plan.md so we can reference it.
```

**What happens next:** Claude creates a comprehensive, step-by-step plan. This becomes your roadmap and prevents scope creep or getting lost in implementation details.

**Critical step:** Review the plan! This is your chance to catch issues before writing code. Ask yourself:
- Does this sequence make sense?
- Are we building the right abstractions?
- Will this be maintainable?
- Can other lessons reuse these components?

If something doesn't feel right, say so! For example:
- "I think we should implement the narrative flow first, then add interactivity"
- "Should we create a shared CategoryDiagram component in packages/core instead of lesson-specific?"

### Phase 3: Implementation (2-3 hours)

Now we build! The key here is incremental validation - build a piece, verify it works, then move to the next piece.

#### Step 3.1: Initialize the Lesson Project

```
Following your implementation plan, let's start building.

First, initialize the lesson project:

1. Create directory packages/lessons/module-01-category-theory/lesson-1.1-categories/
2. Set up a Vite + React + TypeScript project using artifacts-builder patterns
3. Install dependencies: react, react-dom, three, @types/three, tailwindcss, katex
4. Create index.html and src/App.tsx with basic structure
5. Verify it builds and runs (npm run dev)

Let me know when you've completed this step and the dev server is running.
```

**What Claude does:** Creates the project structure, sets up configuration files, and gets a basic React app running.

**Your verification:** You should be able to run `npm run dev` and see a basic page in your browser. Don't move on until this works!

#### Step 3.2: Build Data Structures

```
Now let's implement the core data structures from your plan.

Create src/types/category.ts with:
- Category interface
- Morphism interface  
- Composition rules
- Type guards and validators

Make sure everything is strictly typed - no `any` types.

After you create this file, show me the code so I can review it.
```

**What Claude does:** Implements the TypeScript interfaces that represent mathematical structures.

**Your verification:** Look at the generated types. Do they make mathematical sense? Can they represent all the examples we want to show (Set, Grp, Ring)?

**Example questions to ask:**
- "Can this data structure represent the empty category?"
- "How would we represent the category with one object and no morphisms besides identity?"
- "Show me how we'd encode the category Set with these types"

#### Step 3.3: Implement CategoryPlayground (Core Interactive Component)

This is the heart of the lesson, so we'll build it incrementally:

```
Let's build CategoryPlayground incrementally. Start with the static diagram:

STEP 1: Create src/components/CategoryPlayground.tsx
- Render objects as circles using SVG
- Render morphisms as arrows
- Use a simple grid layout (we'll add force-directed later)
- No interactions yet, just visualization

Show me the component when it's ready, and let's verify it renders correctly with sample data.
```

Once that works:

```
STEP 2: Add object dragging
- Make objects draggable
- Update morphism arrows when objects move
- Ensure smooth animations (60fps)

Test this with 5 objects and verify performance.
```

Then:

```
STEP 3: Add morphism creation
- Click object A, then object B to create morphism A → B
- Draw the arrow with a label field
- Show the new morphism in the category structure

Test creating multiple morphisms between the same objects.
```

Then:

```
STEP 4: Add composition interaction
- Select two composable morphisms (B → C and A → B)
- Show UI to compose them
- Create new morphism A → C
- Animate the composition process

Verify associativity holds for triple compositions.
```

**The key pattern:** Build → Test → Verify → Next step. Never skip verification!

#### Step 3.4: Implement CategoryZoo

```
Now let's build the CategoryZoo component - a gallery of familiar categories.

Create src/components/CategoryZoo.tsx with:
- Pre-defined categories: Set, Grp, Ring, Top, Vect
- Each category is a card with:
  - Name and description
  - Example objects (e.g., for Set: {1,2,3}, ℝ, ℤ)
  - Example morphisms (e.g., for Set: functions)
  - Click to explore in detail

Make it visually appealing and educational.
```

#### Step 3.5: Implement IdentityAnimation

```
Create src/components/IdentityAnimation.tsx:

This should animate the concept that identity morphisms "do nothing":
- Show an object A
- Show id_A: A → A as a circular arrow
- Show composing f: A → B with id_A
- Animate f ∘ id_A = f visually
- Use smooth transitions to show equivalence

Make it mesmerizing but mathematically precise.
```

#### Step 3.6: Weave the Narrative

```
Now let's create the narrative flow that weaves these components together.

In src/App.tsx, create a scrollytelling experience:

SECTION 1: Hook (1-2 paragraphs)
"You already know categories—you just don't know it yet."
[Shows familiar examples from everyday math]

SECTION 2: Pattern Recognition (interactive)
[CategoryZoo appears]
"Look at these familiar mathematical structures. What do they have in common?"

SECTION 3: The Abstraction (explanation + interactive)
"They all have objects, morphisms, and composition!"
[CategoryPlayground appears]
"Try building your own category."

SECTION 4: Identity Matters
"Every object has a special morphism that does nothing—but it's crucial."
[IdentityAnimation plays]

SECTION 5: You're Thinking Categorically
[Challenge problems]

Use smooth scroll animations and progressive disclosure.
```

#### Step 3.7: Add Assessment

```
Add interactive assessment to src/components/Assessment.tsx:

1. "Build a category with 3 objects" (validates structure)
2. "Find the identity morphisms" (click to identify)
3. "Compose these morphisms" (drag to compose)

Make feedback immediate and encouraging. No grades, just understanding checks.
```

### Phase 4: Bundle to Artifact (15 minutes)

Once everything works locally, we bundle it to a single HTML file:

```
Now let's bundle this lesson to a single HTML artifact using artifacts-builder.

1. Install bundling dependencies:
   npm install --save-dev parcel @parcel/config-default parcel-resolver-tspaths html-inline

2. Create .parcelrc configuration for proper bundling

3. Run the bundle script:
   bash scripts/bundle-artifact.sh

4. Copy the resulting bundle.html to /mnt/user-data/outputs/

5. Verify the bundle works as a standalone file

Let me know if you encounter any errors during bundling.
```

**What Claude does:** Uses Parcel to bundle your React app into a single HTML file with all assets inlined.

**Your verification:** Open bundle.html in a browser. Does everything still work? Are interactions smooth? Is math rendering correctly?

---

## Quality Check

Before considering the lesson complete, run through this checklist:

```
Run a comprehensive quality check on the lesson:

MATHEMATICAL CORRECTNESS:
- Are category axioms stated correctly?
- Do all examples satisfy the axioms?
- Is composition associative in all cases?
- Are identities correct?

INTERACTIVE QUALITY:
- Is response time < 100ms for all interactions?
- Are animations smooth at 60fps?
- Do edge cases work (empty category, single object)?
- Can users "break" anything?

PEDAGOGICAL QUALITY:
- Does the narrative flow make sense?
- Is progression concrete → abstract clear?
- Are examples well-chosen?
- Would a student understand after using this?

VISUAL QUALITY:
- Is the design clean and uncluttered?
- Does color encode meaning?
- Is typography readable?
- No AI slop (centered everything, purple gradients)?

TECHNICAL QUALITY:
- TypeScript strict mode passes?
- No console errors?
- Bundle size < 5MB?
- Works as standalone artifact?

Generate a quality report with pass/fail for each item.
```

---

## Troubleshooting Common Issues

### "Claude is generating code too fast and breaking things"

**Solution:** Be more explicit about incremental building:
```
Stop! Let's slow down and build this incrementally.

First, create ONLY the data structures. Show me the code.
Don't proceed to the next step until I've reviewed it.
```

### "The math rendering isn't working"

**Solution:**
```
Debug the KaTeX rendering:
1. Check if KaTeX CSS is included in index.html
2. Verify the KaTeX component is rendering without errors
3. Test with a simple equation first: $f: A \to B$
4. Show me the console errors
```

### "Animations are janky"

**Solution:**
```
Let's diagnose the performance issue:
1. Open Chrome DevTools Performance tab
2. Record a session while interacting
3. Identify bottlenecks (layout thrashing? excessive re-renders?)
4. Show me the performance profile

Then we'll optimize based on the bottleneck.
```

### "The bundle is too large (>5MB)"

**Solution:**
```
Analyze bundle size:
1. Run: npx parcel build index.html --reporter @parcel/reporter-bundle-analyzer
2. Identify large dependencies
3. Consider:
   - Code splitting
   - Lazy loading Three.js scenes
   - Removing unused dependencies
   - Using lighter alternatives

Show me the bundle analysis.
```

---

## Next Steps: Scaling to Full Course

Once Lesson 1.1 is complete and working beautifully, you have several options:

### Option A: Linear Progression (Safe)
Build lessons sequentially, learning as you go:
```
Great! Lesson 1.1 is complete.

Let's apply what we learned to Lesson 1.2: "Functors"

Use the same workflow:
1. Research functors deeply
2. Plan the lesson structure
3. Implement incrementally
4. Bundle and verify
```

### Option B: Parallel Development (Fast)
Use Git worktrees to build multiple lessons simultaneously:
```
Now that we have a proven workflow, let's scale to parallel development.

Set up Git worktrees for Lessons 1.1 through 1.5:
[Follow the worktree instructions from the Master Strategy]

We'll build all 5 lessons of Module 1 in parallel!
```

### Option C: Autonomous Agent (Ambitious)
Deploy the Agent SDK to generate lessons automatically:
```
Let's take it to the next level - create an autonomous lesson generation agent.

Using the Agent SDK from the Master Strategy:
1. Set up the agent with access to our PRD
2. Give it the proven workflow
3. Let it generate Lesson 1.2 autonomously
4. Review and iterate on the agent's work
5. Once refined, let it generate all remaining lessons
```

---

## Pro Tips from the Trenches

**1. Use "think hard" liberally**
Any time you're facing a design decision, architecture choice, or debugging a complex issue, start with "think hard about..." The 15 seconds of extended thinking saves hours of iteration.

**2. Build → Verify → Next**
Never skip verification! If you build 5 components and then test, you won't know which one broke. Build one, verify it works, then build the next.

**3. Start simple, add complexity**
Begin with static visualizations, then add interactivity, then add animations. Don't try to build everything at once.

**4. Ask "show me the code"**
When Claude generates something, ask to see the code. Review it. Understand it. Don't blindly trust.

**5. Save intermediate artifacts**
As you build, periodically commit to git. If Claude goes down a wrong path, you can revert.

**6. Use CLAUDE.md aggressively**
Whenever you establish a pattern that works, document it in the relevant CLAUDE.md file. Future Claude sessions will use this context.

**7. Test edge cases early**
Empty category, single object, densely connected graph. Test these early before building more features.

---

## Your First Session Script

Here's a complete script you can literally copy-paste for your first session:

```bash
# Terminal
cd grothendieck-explorable
claude
```

Then in Claude Code:

```
Hi! I'm building the Grothendieck Explorable Explanations course. 
We're starting with Lesson 1.1: "What is a Category?"

I've created the root CLAUDE.md file with project context.

Let's begin with research. Think hard about:
1. The mathematical content needed to introduce categories
2. The interactive components (CategoryPlayground, CategoryZoo, IdentityAnimation)
3. The technical architecture for interactive diagrams
4. The pedagogical flow from concrete to abstract
5. The implementation strategy

Research best practices for interactive math visualizations and provide 
a comprehensive analysis with recommendations.
```

Then proceed through the phases: Research → Plan → Implement → Bundle → Quality Check.

---

## Measuring Success

You'll know Lesson 1.1 is successful when:

1. ✅ You can open the bundled HTML file and it works standalone
2. ✅ You can build a category by dragging objects and drawing morphisms
3. ✅ Composition works and is associative
4. ✅ The CategoryZoo helps you recognize patterns
5. ✅ The IdentityAnimation makes the concept click
6. ✅ The narrative flows naturally from concrete to abstract
7. ✅ A student could learn category theory from this lesson alone
8. ✅ You're excited to build Lesson 1.2!

---

## Time Estimate

For your first lesson, expect:
- Research & Planning: 30-45 minutes
- Implementation: 2-3 hours
- Quality & Polish: 30-45 minutes
- **Total: 3-4 hours**

By Lesson 5, you'll be down to 1-2 hours per lesson as you get faster and have more reusable components.

---

**Ready to start? Run that first command and let's build something beautiful!** 🚀

Remember: The goal isn't to rush. The goal is to establish a pattern that works, then scale it. Quality over speed for Lesson 1.1, then speed through the power of the pattern.

Good luck! You're about to create something that changes how people learn mathematics forever.
