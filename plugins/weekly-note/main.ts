import { Plugin, TFile, MarkdownView, App } from "obsidian";

// Helper function to get current week number and year
function getCurrentWeekInfo() {
	const now = new Date();
	const start = new Date(now.getFullYear(), 0, 1);
	const days = Math.floor(
		(now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000),
	);
	const weekNumber = Math.ceil((days + start.getDay() + 1) / 7);

	return {
		week: weekNumber,
		year: now.getFullYear(),
	};
}

// Template for new weekly note files
function createWeeklyNoteTemplate(week: number, year: number): string {
	return `---
up: "[[Weekly Todos]]"
tags:
  - todo
  - weekly
---
`;
}

// Helper function to position cursor at the bottom of the file
function positionCursorAtBottom(app: App) {
	// Get the active view
	const activeView = app.workspace.getActiveViewOfType(MarkdownView);
	if (activeView) {
		const editor = activeView.editor;
		// Get the last line number
		const lastLine = editor.lastLine();
		// Position cursor at the end of the last line
		editor.setCursor(lastLine, editor.getLine(lastLine).length);
	}
}

export default class WeeklyFilePlugin extends Plugin {
	async onload() {
		// Add command to open or create the current week file
		this.addCommand({
			id: "open-current-week-file",
			name: "Open current week file",
			callback: async () => {
				const { week, year } = getCurrentWeekInfo();
				const filename = `${year} Week ${week}.md`;

				// Check if file exists
				const existingFile =
					this.app.vault.getAbstractFileByPath(filename);

				if (existingFile instanceof TFile) {
					// File exists, open it
					await this.app.workspace.getLeaf().openFile(existingFile);
				} else {
					// File doesn't exist, create it
					const newFile = await this.app.vault.create(
						filename,
						createWeeklyNoteTemplate(week, year),
					);
					await this.app.workspace.getLeaf().openFile(newFile);
				}

				// Position cursor at bottom after file is opened
				setTimeout(() => {
					positionCursorAtBottom(this.app);
				}, 100);
			},
		});
	}

	onunload() {}
}
