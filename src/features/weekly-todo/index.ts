import { Setting } from "obsidian";
import type { Feature, FeatureContext } from "../feature";
import { openOrCreateFile } from "../../obsidian-utils";
import { applyWeekTokens, isoWeek, weeklyNotePath } from "./weekly-todo";

export const weeklyTodoFeature: Feature = {
	id: "weekly-todo",
	name: "Weekly Todo",

	onload({ plugin, settings }: FeatureContext) {
		plugin.addCommand({
			id: "open-current-week-file",
			name: "Open weekly todo file",
			callback: async () => {
				const info = isoWeek(new Date());
				const { fileNameFormat, template } = settings.weeklyTodo;
				await openOrCreateFile(
					plugin,
					weeklyNotePath(fileNameFormat, info),
					applyWeekTokens(template, info),
				);
			},
		});
	},

	buildSettings(
		containerEl: HTMLElement,
		{ settings, saveSettings }: FeatureContext,
	) {
		new Setting(containerEl)
			.setName("Filename format")
			.setDesc(
				"Tokens: {week}, {year}. The .md extension is added automatically.",
			)
			.addText((text) =>
				text
					.setValue(settings.weeklyTodo.fileNameFormat)
					.onChange(async (value) => {
						settings.weeklyTodo.fileNameFormat = value;
						await saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("New note template")
			.setDesc(
				"Content for a freshly created weekly note. Tokens: {week}, {year}.",
			)
			.addTextArea((area) =>
				area
					.setValue(settings.weeklyTodo.template)
					.onChange(async (value) => {
						settings.weeklyTodo.template = value;
						await saveSettings();
					}),
			);
	},
};
