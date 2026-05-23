#!/bin/bash
set -e

VERSION_FILE="VERSION"
PACKAGE_JSON="remindify-frontend/package.json"
POM_XML="remindify-backend/pom.xml"

if [ -z "$1" ]; then
  echo "Usage: ./release.sh <version>"
  echo "Example: ./release.sh 0.2.0"
  exit 1
fi

NEW_VERSION="$1"

# Validate semver format (X.Y.Z)
if ! [[ "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: Version must be in semver format (X.Y.Z)"
  exit 1
fi

echo "Releasing version $NEW_VERSION..."

# Update VERSION file
echo "$NEW_VERSION" > "$VERSION_FILE"

# Update package.json
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$NEW_VERSION\"/" "$PACKAGE_JSON"

# Update pom.xml
sed -i "s/<version>[^<]*<\/version>/<version>$NEW_VERSION<\/version>/" "$POM_XML"

# Commit changes
git add "$VERSION_FILE" "$PACKAGE_JSON" "$POM_XML"
git commit -m "Release v$NEW_VERSION"

# Create tag
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

echo "✓ Version bumped to $NEW_VERSION"
echo "✓ Git commit created"
echo "✓ Git tag v$NEW_VERSION created"
echo ""
echo "Push changes with:"
echo "  git push && git push --tags"
