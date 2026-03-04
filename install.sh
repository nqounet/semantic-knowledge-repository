#!/usr/bin/env bash

set -e

SKILL_NAME="semantic-knowledge-repository"
SKILLS_DIR="$HOME/.agents/skills"
DEST_DIR="$SKILLS_DIR/$SKILL_NAME"

echo "Installing $SKILL_NAME..."

# Create skills directory if it doesn't exist
mkdir -p "$SKILLS_DIR"

# Check if repo is already cloned locally (if script is run from local repo)
if [ -f "skills/$SKILL_NAME/SKILL.md" ]; then
  echo "Found skill files locally. Creating symlink..."
  rm -rf "$DEST_DIR"
  ln -s "$(pwd)/skills/$SKILL_NAME" "$DEST_DIR"
  echo "✅ Symlink created at $DEST_DIR"
else
  # If executed via curl, clone and copy
  TEMP_DIR=$(mktemp -d)
  echo "Downloading from GitHub..."
  git clone --quiet https://github.com/nqounet/semantic-knowledge-repository.git "$TEMP_DIR"
  
  rm -rf "$DEST_DIR"
  cp -r "$TEMP_DIR/skills/$SKILL_NAME" "$DEST_DIR"
  rm -rf "$TEMP_DIR"
  echo "✅ Successfully installed to $DEST_DIR"
fi

echo "Done!"
