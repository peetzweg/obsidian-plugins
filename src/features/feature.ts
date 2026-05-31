import type { Plugin } from "obsidian";
import type { ToolkitSettings } from "../settings";

/**
 * A Feature is a self-contained unit of plugin functionality.
 *
 * Each feature lives in its own folder under `src/features/` and bundles
 * everything it needs: command registration, event wiring, and (optionally) a
 * settings section. Pure logic should live in a sibling file with no Obsidian
 * imports so it can be unit-tested directly (see `_example/` for the recipe).
 *
 * Features are registered in `src/features/registry.ts`. The plugin loads them
 * by calling `onload` for each one, and tears them down via `onunload`.
 *
 * Because a feature is self-contained, it can later be extracted into its own
 * standalone plugin with minimal effort — see `docs/ARCHITECTURE.md`.
 */
export interface Feature {
	/** Stable, unique identifier. Used as a command id prefix. */
	id: string;

	/** Human-readable name shown in settings and docs. */
	name: string;

	/**
	 * Called once when the plugin loads. Register commands, events, ribbon
	 * icons, etc. here. Anything registered via the passed `plugin` (e.g.
	 * `plugin.addCommand`, `plugin.registerEvent`) is cleaned up automatically
	 * by Obsidian on unload.
	 */
	onload(ctx: FeatureContext): void | Promise<void>;

	/**
	 * Optional. Called when the plugin unloads. Only needed for resources that
	 * are NOT registered through the `plugin` instance (those are cleaned up
	 * automatically).
	 */
	onunload?(): void;

	/**
	 * Optional. Render this feature's settings UI. Called by the plugin's
	 * settings tab; the feature owns the `<h-/section>` it draws into. Mutate
	 * `ctx.settings` and call `ctx.saveSettings()` on change.
	 */
	buildSettings?(containerEl: HTMLElement, ctx: FeatureContext): void;
}

/**
 * Everything a feature is handed at load time.
 */
export interface FeatureContext {
	plugin: Plugin;
	/** Live settings object. Mutate + persist via `saveSettings`. */
	settings: ToolkitSettings;
	saveSettings: () => Promise<void>;
}
