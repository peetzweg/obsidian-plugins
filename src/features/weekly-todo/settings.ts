export interface WeeklyTodoSettings {
	/** Filename format. `{week}` and `{year}` are substituted; `.md` is added. */
	fileNameFormat: string;
	/** Frontmatter/body inserted when the note is created. */
	template: string;
}

export const DEFAULT_WEEKLY_TODO_SETTINGS: WeeklyTodoSettings = {
	fileNameFormat: "{year} Week {week}",
	template: `---
up: "[[Weekly Todos]]"
tags:
  - todo
  - weekly
---
`,
};
