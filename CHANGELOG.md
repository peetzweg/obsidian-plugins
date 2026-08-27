# obsidian-personal-toolkit

## 1.1.0

### Minor Changes

- c81a9b5: Add dedicated commands for opening the Homework for Life and Crash & Burn notes.
- 1c8ddad: Restructure into a single extensible plugin built from independent features.
    - Feature-module architecture: each feature is a self-contained folder with thin
      Obsidian wiring, pure (testable) logic, tests, and optional settings, registered
      in `src/features/registry.ts`.
    - Configurable filename formats and templates for the weekly and yearly todo notes.
    - Fix bullet sorting to preserve nested sub-items and non-bullet lines.
    - Use correct ISO-8601 week numbering for weekly notes.
    - Add changesets-based versioning and a GitHub Release flow adapted for Obsidian,
      plus CI (lint, type-check, test, build).
