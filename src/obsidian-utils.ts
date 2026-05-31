import { type Plugin, TFile } from "obsidian";

/**
 * Open a file by vault-relative path, creating it from `template` if missing.
 * Shared by the note-creating features (weekly/yearly todos).
 */
export async function openOrCreateFile(
	plugin: Plugin,
	path: string,
	template: string,
): Promise<void> {
	const existing = plugin.app.vault.getAbstractFileByPath(path);
	if (existing instanceof TFile) {
		await plugin.app.workspace.getLeaf().openFile(existing);
		return;
	}
	const file = await plugin.app.vault.create(path, template);
	await plugin.app.workspace.getLeaf().openFile(file);
}
