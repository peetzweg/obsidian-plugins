import { Plugin } from "obsidian";
import type { FeatureContext } from "./features/feature";
import { FEATURES } from "./features/registry";
import {
	DEFAULT_SETTINGS,
	mergeSettings,
	type ToolkitSettings,
	ToolkitSettingTab,
} from "./settings";

export default class ToolkitPlugin extends Plugin {
	settings: ToolkitSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		const ctx: FeatureContext = {
			plugin: this,
			settings: this.settings,
			saveSettings: () => this.saveSettings(),
		};

		for (const feature of FEATURES) {
			await feature.onload(ctx);
		}

		this.addSettingTab(
			new ToolkitSettingTab(this.app, this, FEATURES, ctx),
		);
	}

	onunload() {
		for (const feature of FEATURES) {
			feature.onunload?.();
		}
	}

	async loadSettings() {
		this.settings = mergeSettings(DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
