import { Notice } from "obsidian";
import type { Feature, FeatureContext } from "../feature";
import { sortStruckBulletsLast } from "./sort-bullets";

export const sortBulletsFeature: Feature = {
	id: "sort-bullets",
	name: "Sort Bullets",

	onload({ plugin }: FeatureContext) {
		plugin.addCommand({
			id: "sort-bullet-list",
			name: "Sort bullet list (completed items to bottom)",
			editorCallback: (editor) => {
				const selection = editor.getSelection();
				if (!selection) {
					new Notice("Please select a bullet point list to sort");
					return;
				}
				editor.replaceSelection(sortStruckBulletsLast(selection));
			},
		});
	},
};
