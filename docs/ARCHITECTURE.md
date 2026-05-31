# Architecture

This repository is a **single Obsidian plugin** composed of independent
**features**. You install one plugin; each feature adds its own commands,
events, and settings.

## Layout

```
src/
  main.ts                 # entry: loads settings, runs each feature, mounts the settings tab
  settings.ts             # persisted settings + the settings tab (delegates to features)
  obsidian-utils.ts       # small shared Obsidian helpers
  features/
    feature.ts            # the Feature interface every feature implements
    registry.ts           # FEATURES = [...] — the single place to register a feature
    weekly-todo/          # a feature: index.ts (wiring) + pure logic + .test.ts + settings.ts
    yearly-todo/
    sort-bullets/
    _example/             # a documented template feature (not registered by default)
```

## The feature model

A feature implements the `Feature` interface (`src/features/feature.ts`):

- `id`, `name` — identity.
- `onload(ctx)` — register commands/events via `ctx.plugin`. Anything
  registered there is cleaned up automatically by Obsidian on unload.
- `onunload?()` — only for resources not registered through `ctx.plugin`.
- `buildSettings?(containerEl, ctx)` — render this feature's settings section.

`ctx` (`FeatureContext`) carries the `plugin`, the live `settings` object, and a
`saveSettings()` function.

### Why this shape

- **Separation of concerns** — Obsidian glue (commands, editor, vault) lives in
  each feature's `index.ts`; the actual logic lives in a sibling file with no
  Obsidian imports, so it is unit-testable without mocking the API.
- **One place to extend** — adding a feature is: create a folder, implement the
  interface, add one line to `registry.ts`. See
  [ADDING_A_FEATURE.md](./ADDING_A_FEATURE.md).
- **Co-located settings** — each feature owns its settings slice and its UI, so
  the settings tab stays generic.

## Single plugin vs. multiple plugins

We deliberately ship **one** plugin (simpler to install and maintain for
personal use). Because every feature is self-contained, the door is left open to
**distribute a feature as its own plugin** later if needed:

- A feature folder already isolates its commands, logic, settings, and tests.
- To extract one, you would give it its own `manifest.json` + entry point that
  registers just that feature, and reuse the same `Feature` wiring.

So the trade-off is reversible: start unified, split only if a feature deserves
its own distribution. This is the main reason the feature boundary is kept
clean even though everything currently builds into a single `main.js`.
