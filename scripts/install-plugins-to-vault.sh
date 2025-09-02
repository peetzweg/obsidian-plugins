#/bin/bash

set -e
echo $CWD
current_dir=$(pwd)
echo $current_dir
plugins_dir="$current_dir/plugins"

if [ -n "$1" ]; then
	vault_dir="$1"
	echo "Using vault directory: $vault_dir"
	vault_dir=$(realpath $vault_dir)
else
	vault_dir="$current_dir/vault"
	echo "Using default vault directory: $vault_dir"
fi
vault_plugin_dir="$vault_dir/.obsidian/plugins"
for plugin in "$plugins_dir"/*; do
	echo "Installing '$(basename $plugin)' to '$(basename $vault_dir)'"
	if [ -d "$vault_plugin_dir/$(basename $plugin)" ]; then
		rm -r "$vault_plugin_dir/$(basename $plugin)"
	fi
	ln -s "$plugin" "$vault_plugin_dir/"
done
