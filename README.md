# Personal Toolkit (Obsidian)

A single, personal Obsidian plugin composed of independent **features**. Install
one plugin; get all the features. Designed to be easy to extend.

## Features

- **Weekly Todo** — open/create the current ISO-week todo note from a template.
- **Yearly Todo** — open/create the current year's todo note from a template.
- **Sort Bullets** — move completed (`~~struck~~`) bullets to the bottom of a
  selection, preserving nesting and surrounding text.

Filenames and templates are configurable in the plugin's settings tab.

## Development

```sh
pnpm install        # install dependencies
pnpm dev            # watch-build main.js
pnpm test           # run unit tests (vitest)
pnpm test:coverage  # run tests + enforce coverage thresholds
pnpm lint           # eslint
pnpm check-types    # tsc --noEmit
pnpm build          # production build (type-check + minified main.js)
```

### Try it in the dev vault

```sh
pnpm install-plugin              # build + symlink into ./vault
pnpm install-plugin /path/vault  # or a vault of your choice
```

Then enable **Personal Toolkit** in the vault's community plugins, and reload
Obsidian after `pnpm dev` rebuilds.

## Extending

Adding a feature is a small, well-defined task — see
[docs/ADDING_A_FEATURE.md](docs/ADDING_A_FEATURE.md). The architecture and the
single-vs-multiple-plugin trade-off are documented in
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Releasing

Versioning and releases use changesets, adapted for Obsidian's GitHub-Release
distribution — see [RELEASE.md](RELEASE.md).
