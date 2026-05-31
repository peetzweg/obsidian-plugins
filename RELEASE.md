# Releasing

This plugin uses [changesets](https://github.com/changesets/changesets) for
versioning and changelog generation. Unlike a typical changesets setup, it does
**not** publish to npm — Obsidian plugins are distributed as **GitHub Release
assets** (`main.js`, `manifest.json`, `styles.css`), and the release **tag is
the bare version** (e.g. `1.2.0`, no `v` prefix) so Obsidian and
[BRAT](https://github.com/TfTHacker/obsidian42-brat) can read it.

## Adding a changeset

For any PR that should bump the version:

```sh
pnpm changeset
```

Pick `patch` / `minor` / `major`, describe the change, and commit the generated
file in `.changeset/`.

## Production release

Pushes to `main` run the [Release workflow](.github/workflows/release.yml):

1. **`version` job** — if changesets are pending, the
   [`changesets/action`](https://github.com/changesets/action) opens/updates a
   **"Release: version package"** PR. Our `version` script
   (`changeset version && node version-bump.mjs`) bumps `package.json`, updates
   `CHANGELOG.md`, and syncs `manifest.json` + `versions.json`.
2. **`release` job** — after the Version PR is merged, `manifest.json` holds a
   version with no git tag yet. The job builds and creates a GitHub Release
   tagged with that version, attaching `main.js`, `manifest.json`, and
   `styles.css`. On ordinary pushes (tag already exists) it's a no-op.

### Steps

1. Add changesets to your PRs.
2. Merge PRs into `main`.
3. Review and merge the auto-created "Release: version package" PR.
4. The GitHub Release is published automatically.

## Local version bump (manual)

```sh
pnpm version   # changeset version + manifest/versions sync
```

## Beta testing with BRAT

Point [BRAT](https://github.com/TfTHacker/obsidian42-brat) at this repo to
install pre-release builds directly from GitHub Releases without going through
the community store.

## Submitting to the community store (optional)

If you ever want this in the official catalogue, the repo already produces the
required release assets and `versions.json`. Follow Obsidian's
[plugin submission guidelines](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin).
