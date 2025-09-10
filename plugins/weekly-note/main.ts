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

function createWeeklyNoteTemplate(week: number, year: number): string {
	return `---
up: "[[Weekly Todos]]"
tags:
  - todo
  - weekly
---
`;
}

function createYearlyNoteTemplate(year: number): string {
	return `---
up: "[[Yearly Todos]]"
tags:
  - todo
  - yearly
---
`;
}

// Helper function to position cursor at the bottom of the file
function positionCursorAtBottom(app: App) {
	// Get the active view
	const activeView = app.workspace.getActiveViewOfType(MarkdownView);
	if (activeView) {
		const editor = activeView.editor;
		const lastLine = editor.lastLine();
		editor.setCursor(lastLine, editor.getLine(lastLine + 1).length);
	}
}

export default class WeeklyFilePlugin extends Plugin {
	openOrCreateFile = async (filename: string, template: string) => {
		const existingFile = this.app.vault.getAbstractFileByPath(filename);
		if (existingFile instanceof TFile) {
			await this.app.workspace.getLeaf().openFile(existingFile);
		} else {
			const newFile = await this.app.vault.create(filename, template);
			await this.app.workspace.getLeaf().openFile(newFile);
		}
	};

	async onload() {
		// Add command to open or create the current week file
		this.addCommand({
			id: "open-current-year-file",
			name: "Open Yearly Todo File",
			callback: async () => {
				const { year } = getCurrentWeekInfo();
				const filename = `${year} Todos.md`;

				await this.openOrCreateFile(
					filename,
					createYearlyNoteTemplate(year),
				);
			},
		});

		this.addCommand({
			id: "open-current-week-file",
			name: "Open Weekly Todo File",
			callback: async () => {
				const { week, year } = getCurrentWeekInfo();
				const filename = `${year} Week ${week}.md`;

				await this.openOrCreateFile(
					filename,
					createWeeklyNoteTemplate(week, year),
				);
			},
		});
	}

	onunload() {}
}
