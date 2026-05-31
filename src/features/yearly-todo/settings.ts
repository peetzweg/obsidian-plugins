export interface YearlyTodoSettings {
	/** Filename format. `{year}` is substituted; `.md` is added. */
	fileNameFormat: string;
	/** Frontmatter/body inserted when the note is created. */
	template: string;
}

export const DEFAULT_YEARLY_TODO_SETTINGS: YearlyTodoSettings = {
	fileNameFormat: "{year} Todos",
	template: `---
up: "[[Yearly Todos]]"
tags:
  - todo
  - yearly
---
`,
};
