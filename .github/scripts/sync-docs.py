#!/usr/bin/env bash
set -euo pipefail

DOCS_DIR="./docs"

contains_markdown() {
  find "$DOCS_DIR" -type f \( -name "*.md" -o -name "*.markdown" \) | grep -q .
}

if [ -d "$DOCS_DIR" ]; then
  if contains_markdown; then
    echo "Le dossier ./docs contient déjà des fichiers Markdown. Aucun pull/clone effectué."
    exit 0
  fi
else
  mkdir -p "$DOCS_DIR"
fi

read -r -p "Entrez l'URL du repo GitHub de documentation: " REPO_URL

if [ -z "${REPO_URL}" ]; then
  echo "URL vide. Annulation."
  exit 1
fi

TMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

echo "Clonage temporaire du repo de documentation..."
git clone --depth 1 "$REPO_URL" "$TMP_DIR/repo"

shopt -s dotglob nullglob
FILES=("$TMP_DIR/repo"/*)

if [ ${#FILES[@]} -eq 0 ]; then
  echo "Le repo cloné semble vide."
  exit 1
fi

echo "Copie du contenu vers ./docs ..."
cp -R "$TMP_DIR/repo"/* "$DOCS_DIR"/

echo "Documentation importée dans ./docs"