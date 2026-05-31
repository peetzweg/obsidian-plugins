# Adding a feature

A feature is a self-contained folder under `src/features/`. Use `_example/` as a
working template — it shows the structure, a pure-logic file, and a test.

## 1. Scaffold

Copy the example:

```sh
cp -r src/features/_example src/features/my-feature
```

Rename the files inside (`example.ts` → `my-feature.ts`, etc.) and update the
`id` / `name` in `index.ts`.

## 2. Put logic in a pure file

Keep all real logic in a file with **no Obsidian imports** so it can be tested
directly:

```ts
// src/features/my-feature/my-feature.ts
export function transform(input: string): string {
	return input.trim();
}
```

## 3. Write a test

```ts
// src/features/my-feature/my-feature.test.ts
import { describe, expect, it } from "vitest";
import { transform } from "./my-feature";

describe("transform", () => {
	it("trims whitespace", () => {
		expect(transform("  hi  ")).toBe("hi");
	});
});
```

Run `pnpm test` (or `pnpm test:watch`).

## 4. Wire it up

`index.ts` stays thin — it connects Obsidian to your logic:

```ts
import type { Feature, FeatureContext } from "../feature";
import { transform } from "./my-feature";

export const myFeature: Feature = {
	id: "my-feature",
	name: "My Feature",
	onload({ plugin }: FeatureContext) {
		plugin.addCommand({
			id: "do-the-thing",
			name: "Do the thing",
			editorCallback: (editor) =>
				editor.replaceSelection(transform(editor.getSelection())),
		});
	},
};
```

## 5. (Optional) add settings

1. Define the slice + defaults in `src/features/my-feature/settings.ts`.
2. Add it to `ToolkitSettings` and `DEFAULT_SETTINGS` in `src/settings.ts`.
3. Implement `buildSettings(containerEl, ctx)` on the feature.

See `weekly-todo` for a full example.

## 6. Register it

Add one line to `src/features/registry.ts`:

```ts
import { myFeature } from "./my-feature";

export const FEATURES: Feature[] = [
	// ...existing features
	myFeature,
];
```

## 7. Ship it

Add a changeset and open a PR:

```sh
pnpm changeset
```

See [../RELEASE.md](../RELEASE.md).
