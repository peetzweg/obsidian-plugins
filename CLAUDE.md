# CLAUDE.md

Guidance for working in this repository.

## What this is

A **single** Obsidian plugin (`personal-toolkit`) composed of independent
**features**. It is intentionally one installable plugin, not a monorepo of
plugins. See `docs/ARCHITECTURE.md`.

## Project shape

- `src/main.ts` — plugin entry; loads settings, runs each feature, mounts the
  settings tab.
- `src/features/feature.ts` — the `Feature` interface.
- `src/features/registry.ts` — `FEATURES` array; the one place to register a
  feature.
- `src/features/<name>/` — `index.ts` (Obsidian wiring) + pure logic file +
  `*.test.ts` + optional `settings.ts`.
- `src/settings.ts` — persisted settings type/defaults + the delegating
  settings tab.

## Conventions

- **Keep logic pure and Obsidian-free** in the non-`index.ts` files so it is
  unit-testable; `index.ts` is thin wiring only.
- **Tests** live next to the code as `*.test.ts` (vitest). Never import
  `obsidian` from a tested file.
- **Coverage is ratcheted.** `vitest.config.ts` enforces `perFile` thresholds
  (currently 100%) on the measured logic files; Obsidian-wiring files are
  excluded. Thresholds `autoUpdate` upward and are committed, so coverage can
  only improve. CI runs `pnpm test:coverage` and fails on any drop. Every new
  feature's logic file must be covered.
- **Indentation is tabs, width 4** (`.editorconfig` / `.prettierrc`).
- Add a feature by following `docs/ADDING_A_FEATURE.md`.

## Commands

- `pnpm dev` — watch build
- `pnpm build` — type-check + production bundle to `main.js`
- `pnpm test` — vitest
- `pnpm lint` / `pnpm check-types`
- `pnpm install-plugin [vault]` — build + symlink into a vault (default `./vault`)

## Releasing

Changesets, adapted for Obsidian GitHub-Release distribution (no npm publish;
tag = bare manifest version). See `RELEASE.md`. Add a changeset (`pnpm
changeset`) with any user-facing change.
