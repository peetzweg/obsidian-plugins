import { type App, type Plugin, PluginSettingTab } from "obsidian";
import type { Feature, FeatureContext } from "./features/feature";
import {
	DEFAULT_WEEKLY_TODO_SETTINGS,
	type WeeklyTodoSettings,
} from "./features/weekly-todo/settings";
import {
	DEFAULT_YEARLY_TODO_SETTINGS,
	type YearlyTodoSettings,
} from "./features/yearly-todo/settings";

/**
 * The plugin's persisted settings. Each feature owns one slice. When you add a
 * feature with settings, add its slice here and to `DEFAULT_SETTINGS`.
 */
export interface ToolkitSettings {
	weeklyTodo: WeeklyTodoSettings;
	yearlyTodo: YearlyTodoSettings;
}

export const DEFAULT_SETTINGS: ToolkitSettings = {
	weeklyTodo: DEFAULT_WEEKLY_TODO_SETTINGS,
	yearlyTodo: DEFAULT_YEARLY_TODO_SETTINGS,
};

/**
 * Merge persisted data over the defaults, one level deep, so that newly-added
 * fields within a feature's slice pick up their default instead of being
 * `undefined`.
 *
 * When you add a feature with settings, add its slice here too.
 */
export function mergeSettings(
	defaults: ToolkitSettings,
	saved: Partial<ToolkitSettings> | null,
): ToolkitSettings {
	return {
		weeklyTodo: { ...defaults.weeklyTodo, ...saved?.weeklyTodo },
		yearlyTodo: { ...defaults.yearlyTodo, ...saved?.yearlyTodo },
	};
}

/**
 * Settings tab that delegates to each feature's `buildSettings`, so settings
 * UI lives next to the feature it configures.
 */
export class ToolkitSettingTab extends PluginSettingTab {
	constructor(
		app: App,
		plugin: Plugin,
		private readonly features: Feature[],
		private readonly ctx: FeatureContext,
	) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		for (const feature of this.features) {
			if (!feature.buildSettings) continue;
			containerEl.createEl("h3", { text: feature.name });
			feature.buildSettings(containerEl, this.ctx);
		}
	}
}
