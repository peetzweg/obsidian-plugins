/**
 * Pure logic for the yearly-todo feature — no Obsidian imports, fully testable.
 */

/** Replace `{year}` tokens in a string. */
export function applyYearToken(template: string, year: number): string {
	return template.replaceAll("{year}", String(year));
}

/** Build the vault-relative note path from a filename format. */
export function yearlyNotePath(fileNameFormat: string, year: number): string {
	return `${applyYearToken(fileNameFormat, year)}.md`;
}
