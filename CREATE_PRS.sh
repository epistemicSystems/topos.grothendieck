#!/bin/bash

# Script to create pull requests for all three lessons
# Run this from the repository root

echo "Creating Pull Requests for Lessons 1.3, 1.4, and 1.5"
echo "======================================================"
echo ""

# PR for Lesson 1.3
echo "Creating PR for Lesson 1.3: Natural Transformations..."
cd /home/user/topos.grothendieck.lesson-1.3
gh pr create \
  --base main \
  --title "Lesson 1.3: Natural Transformations - Complete Implementation" \
  --body-file PR_DESCRIPTION.md

if [ $? -eq 0 ]; then
  echo "✅ PR created for Lesson 1.3"
else
  echo "❌ Failed to create PR for Lesson 1.3"
fi
echo ""

# PR for Lesson 1.4
echo "Creating PR for Lesson 1.4: Universal Properties and Limits..."
cd /home/user/topos.grothendieck.lesson-1.4
gh pr create \
  --base main \
  --title "Lesson 1.4: Universal Properties and Limits - Complete Implementation" \
  --body-file PR_DESCRIPTION.md

if [ $? -eq 0 ]; then
  echo "✅ PR created for Lesson 1.4"
else
  echo "❌ Failed to create PR for Lesson 1.4"
fi
echo ""

# PR for Lesson 1.5
echo "Creating PR for Lesson 1.5: Adjoint Functors and Monads..."
cd /home/user/topos.grothendieck.lesson-1.5
gh pr create \
  --base main \
  --title "Lesson 1.5: Adjoint Functors and Monads - Complete Implementation" \
  --body-file PR_DESCRIPTION.md

if [ $? -eq 0 ]; then
  echo "✅ PR created for Lesson 1.5"
else
  echo "❌ Failed to create PR for Lesson 1.5"
fi
echo ""

echo "======================================================"
echo "Pull request creation complete!"
echo ""
echo "Next steps:"
echo "1. Review the PRs on GitHub"
echo "2. Run manual testing (see Test Plan in each PR)"
echo "3. Request reviews from team members"
echo "4. Merge when approved"
