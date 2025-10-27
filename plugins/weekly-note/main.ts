import { Plugin, TFile, MarkdownView, App, Notice } from "obsidian";

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

// Helper function to sort bullet point lists
function sortBulletPointList(text: string): string {
	const lines = text.split("\n");
	const bulletRegex = /^(\s*)([-+*])(\s+)(.*)$/;

	const bulletLines: Array<{
		original: string;
		indent: string;
		bullet: string;
		spacing: string;
		content: string;
		isStrikethrough: boolean;
	}> = [];

	const nonBulletLines: string[] = [];

	// Parse each line
	for (const line of lines) {
		const match = line.match(bulletRegex);
		if (match) {
			const [, indent, bullet, spacing, content] = match;
			const isStrikethrough = content.includes("~~");
			bulletLines.push({
				original: line,
				indent,
				bullet,
				spacing,
				content,
				isStrikethrough,
			});
		} else {
			nonBulletLines.push(line);
		}
	}

	// If no bullet points found, return original text
	if (bulletLines.length === 0) {
		return text;
	}

	// Sort: non-strikethrough first, then strikethrough
	const regularItems = bulletLines.filter((item) => !item.isStrikethrough);
	const strikethroughItems = bulletLines.filter(
		(item) => item.isStrikethrough,
	);

	const sortedBulletLines = [...regularItems, ...strikethroughItems];

	// Reconstruct the lines
	const result = sortedBulletLines.map(
		(item) => `${item.indent}${item.bullet}${item.spacing}${item.content}`,
	);

	// If there were non-bullet lines, we need to be more careful about reconstruction
	// For now, just return the sorted bullet points
	return result.join("\n");
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

		this.addCommand({
			id: "sort-bullet-list",
			name: "Sort Bullet Point List (Completed Items to Bottom)",
			callback: () => {
				const activeView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (!activeView) {
					return;
				}

				const editor = activeView.editor;
				const selectedText = editor.getSelection();

				if (!selectedText) {
					// If no selection, show a notice
					new Notice("Please select a bullet point list to sort");
					return;
				}

				const sortedText = sortBulletPointList(selectedText);

				// Replace the selected text with the sorted version
				editor.replaceSelection(sortedText);
			},
		});
	}

	onunload() {}
}
