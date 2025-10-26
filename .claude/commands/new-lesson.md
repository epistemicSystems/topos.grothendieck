# Create New Lesson

Creates a new lesson following the standard template with all required files and structure.

## Usage

```
/new-lesson MODULE_ID LESSON_ID "LESSON_TITLE"
```

**Example:**
```
/new-lesson module-01 lesson-1.1 "What is a Category?"
```

## What This Command Does

1. **Create directory**: `packages/lessons/$MODULE_ID/$LESSON_ID/`
2. **Generate CLAUDE.md** with lesson-specific context from the PRD
3. **Create index.html** entry point
4. **Initialize package.json** with dependencies
5. **Create src/App.tsx** with lesson template
6. **Set up component structure**:
   - `src/components/NarrativeSection.tsx`
   - `src/components/InteractiveWidget.tsx`
   - `src/components/Assessment.tsx`
7. **Create styles**: `src/styles/lesson.css`
8. **Create README.md** with lesson overview
9. **Initialize git** (if needed)

## Template Structure

After running this command, you'll have:

```
packages/lessons/$MODULE_ID/$LESSON_ID/
├── CLAUDE.md                    # Lesson-specific context
├── index.html                   # Entry point
├── package.json                 # Dependencies
├── README.md                    # Lesson overview
├── src/
│   ├── App.tsx                  # Main lesson component
│   ├── components/
│   │   ├── NarrativeSection.tsx # Intro narrative
│   │   ├── InteractiveWidget.tsx # Main interactive
│   │   └── Assessment.tsx        # Exercises
│   └── styles/
│       └── lesson.css           # Custom styles
└── .gitignore
```

## Next Steps After Creation

1. **Review CLAUDE.md**: Understand lesson requirements and learning objectives
2. **Implement interactive components**: Build the main exploration widgets
3. **Build narrative flow**: Write the explanatory text
4. **Add assessments**: Create interactive exercises
5. **Test**: Run `npm run dev` to preview
6. **Bundle**: Use `/bundle-lesson` when ready

## Dependencies Included

The `package.json` will include:
- React 18
- TypeScript
- Three.js (if 3D needed)
- KaTeX
- Tailwind CSS
- shadcn/ui
- Vite (dev server)
- Parcel (bundling)
- Core components (from `packages/core`)

## CLAUDE.md Template

The generated `CLAUDE.md` will include:
- Learning objectives
- Prerequisites
- Pedagogical strategy
- Interactive components needed
- Mathematical conventions
- Assessment strategy
- Quality checklist

## Tips

- **Plan first**: Know your learning objectives before creating
- **Start simple**: Add complexity incrementally
- **Test early**: Preview as you build
- **Iterate**: Use feedback to improve

## Related Commands

- `/new-component`: Create reusable component in core library
- `/bundle-lesson`: Bundle lesson to single HTML
- `/quality-check`: Run comprehensive quality checks
- `/test-lesson`: Run tests and validation
