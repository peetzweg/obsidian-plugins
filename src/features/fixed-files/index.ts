import { Notice } from "obsidian";
import type { Feature, FeatureContext } from "../feature";

const FILE_COMMANDS = [
	{
		id: "open-homework-for-life",
		name: "Open Homework for Life",
		linkpath: "Homework for Life",
	},
	{
		id: "open-crash-and-burn",
		name: "Open Crash & Burn",
		linkpath: "Crash & Burn",
	},
] as const;

export const fixedFilesFeature: Feature = {
	id: "fixed-files",
	name: "Fixed Files",

	onload({ plugin }: FeatureContext) {
		for (const command of FILE_COMMANDS) {
			plugin.addCommand({
				id: command.id,
				name: command.name,
				callback: async () => {
					const file = plugin.app.metadataCache.getFirstLinkpathDest(
						command.linkpath,
						"",
					);

					if (!file) {
						new Notice(`File not found: ${command.linkpath}`);
						return;
					}

					await plugin.app.workspace.getLeaf(false).openFile(file);
				},
			});
		}
	},
};
