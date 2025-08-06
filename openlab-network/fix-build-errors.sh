#!/bin/bash

# Script to automatically fix common build errors
# Run this from your project root directory

echo "🔧 Starting automated build error fixes..."

# Check if we're in the right directory
if [ ! -d "src" ]; then
    echo "❌ Error: src directory not found. Make sure you're in the project root directory."
    exit 1
fi

# Create backup directory
echo "📂 Creating backup..."
cp -r src src_backup_$(date +%Y%m%d_%H%M%S)

# Fix unescaped apostrophes in all .tsx files
echo "✏️  Fixing unescaped apostrophes..."
find src -name "*.tsx" -type f -exec sed -i "s/Don't/Don\&apos;t/g" {} \;
find src -name "*.tsx" -type f -exec sed -i "s/Let's/Let\&apos;s/g" {} \;
find src -name "*.tsx" -type f -exec sed -i "s/can't/can\&apos;t/g" {} \;
find src -name "*.tsx" -type f -exec sed -i "s/won't/won\&apos;t/g" {} \;
find src -name "*.tsx" -type f -exec sed -i "s/haven't/haven\&apos;t/g" {} \;
find src -name "*.tsx" -type f -exec sed -i "s/doesn't/doesn\&apos;t/g" {} \;
find src -name "*.tsx" -type f -exec sed -i "s/isn't/isn\&apos;t/g" {} \;
find src -name "*.tsx" -type f -exec sed -i "s/we're/we\&apos;re/g" {} \;
find src -name "*.tsx" -type f -exec sed -i "s/you're/you\&apos;re/g" {} \;
find src -name "*.tsx" -type f -exec sed -i "s/it's/it\&apos;s/g" {} \;

echo "✅ Fixed unescaped apostrophes"

# Remove duplicate package-lock.json
if [ -f "package-lock.json" ] && [ -f "../package-lock.json" ]; then
    rm "package-lock.json"
    echo "🗑️  Removed duplicate package-lock.json"
fi

# Fix common unused import issues
echo "🔄 Fixing common unused imports..."

# Remove unused Menu import from sidebar if present
sed -i 's/Menu,//g' src/components/layout/sidebar.tsx 2>/dev/null || true
sed -i 's/,Menu//g' src/components/layout/sidebar.tsx 2>/dev/null || true
sed -i 's/Progress,//g' src/components/layout/sidebar.tsx 2>/dev/null || true
sed -i 's/,Progress//g' src/components/layout/sidebar.tsx 2>/dev/null || true

echo "✅ Fixed common unused imports"

# Show remaining manual fixes needed
echo ""
echo "🎉 Automated fixes completed!"
echo ""
echo "📋 Manual fixes still needed:"
echo "   1. Replace 'any' types with proper TypeScript interfaces"
echo "   2. Replace <img> tags with Next.js <Image> components"
echo "   3. Remove or rename unused variables (prefix with _)"
echo "   4. Fix empty interfaces in ui components"
echo ""
echo "💡 Test your fixes with: npm run build"