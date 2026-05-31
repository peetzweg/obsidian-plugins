#!/usr/bin/env bash
# Install the built plugin into an Obsidian vault by symlinking the build
# artifacts, so `pnpm dev` rebuilds are reflected live.
#
# Usage:
#   ./scripts/install-plugin.sh [vault_dir]   (defaults to ./vault)

set -euo pipefail

root_dir="$(cd "$(dirname "$0")/.." && pwd)"
vault_dir="$(cd "${1:-$root_dir/vault}" && pwd)"
plugin_id="$(node -p "require('$root_dir/manifest.json').id")"

dest="$vault_dir/.obsidian/plugins/$plugin_id"
mkdir -p "$dest"

for file in main.js manifest.json styles.css versions.json; do
	if [ -e "$root_dir/$file" ]; then
		ln -sf "$root_dir/$file" "$dest/$file"
	fi
done

echo "Linked '$plugin_id' into '$vault_dir'"
