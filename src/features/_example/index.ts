import { Notice } from "obsidian";
import type { Feature, FeatureContext } from "../feature";
import { toBlockquote } from "./example";

/**
 * Example feature — a working template for new features.
 *
 * To add your own feature:
 *   1. Copy this `_example/` folder to `src/features/<your-feature>/`.
 *   2. Put pure logic in a sibling file (no Obsidian imports) + a `.test.ts`.
 *   3. Wire commands/events here in `onload`.
 *   4. (Optional) add settings: define them in a `settings.ts`, add the slice
 *      to `ToolkitSettings`/`DEFAULT_SETTINGS` in `src/settings.ts`, and
 *      implement `buildSettings` (see `weekly-todo` for a full example).
 *   5. Register it in `src/features/registry.ts`.
 *
 * See `docs/ADDING_A_FEATURE.md` for the full walkthrough.
 *
 * This feature is NOT registered by default (it is commented out in
 * `registry.ts`) so it stays out of your command palette — but its tests still
 * run and it still type-checks, so it can't silently rot.
 */
export const exampleFeature: Feature = {
	id: "example",
	name: "Example",

	onload({ plugin }: FeatureContext) {
		plugin.addCommand({
			id: "blockquote-selection",
			name: "Example: blockquote selection",
			editorCallback: (editor) => {
				const selection = editor.getSelection();
				if (!selection) {
					new Notice("Select some text first");
					return;
				}
				editor.replaceSelection(toBlockquote(selection));
			},
		});
	},
};
