#/bin/bash

set -e
echo $CWD
current_dir=$(pwd)
echo $current_dir
plugins_dir="$current_dir/plugins"

if [ -n "$1" ]; then
	vault_dir=$(realpath "$1")
	echo "Using vault directory: $vault_dir"
else
	echo "No vault directory provided"
	exit 1
fi

vault_plugin_dir="$vault_dir/.obsidian/plugins"
for plugin in "$plugins_dir"/*; do
	echo "Installing '$(basename "$plugin")' to '$(basename "$vault_dir")'"
	if [ -e "$vault_plugin_dir/$(basename "$plugin")" ] || [ -L "$vault_plugin_dir/$(basename "$plugin")" ]; then
		rm -rf "$vault_plugin_dir/$(basename "$plugin")"
	fi
	cp -r "$plugin" "$vault_plugin_dir/"
done
