import { Setting } from "obsidian";
import type { Feature, FeatureContext } from "../feature";
import { openOrCreateFile } from "../../obsidian-utils";
import { applyYearToken, yearlyNotePath } from "./yearly-todo";

export const yearlyTodoFeature: Feature = {
	id: "yearly-todo",
	name: "Yearly Todo",

	onload({ plugin, settings }: FeatureContext) {
		plugin.addCommand({
			id: "open-current-year-file",
			name: "Open yearly todo file",
			callback: async () => {
				const year = new Date().getFullYear();
				const { fileNameFormat, template } = settings.yearlyTodo;
				await openOrCreateFile(
					plugin,
					yearlyNotePath(fileNameFormat, year),
					applyYearToken(template, year),
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
			.setDesc("Token: {year}. The .md extension is added automatically.")
			.addText((text) =>
				text
					.setValue(settings.yearlyTodo.fileNameFormat)
					.onChange(async (value) => {
						settings.yearlyTodo.fileNameFormat = value;
						await saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("New note template")
			.setDesc(
				"Content for a freshly created yearly note. Token: {year}.",
			)
			.addTextArea((area) =>
				area
					.setValue(settings.yearlyTodo.template)
					.onChange(async (value) => {
						settings.yearlyTodo.template = value;
						await saveSettings();
					}),
			);
	},
};
