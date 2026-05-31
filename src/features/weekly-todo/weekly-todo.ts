/**
 * Pure logic for the weekly-todo feature — no Obsidian imports, fully testable.
 */

export interface IsoWeek {
	/** ISO-8601 week number (1–53). */
	week: number;
	/** ISO-8601 week-numbering year (may differ from calendar year near Jan 1). */
	year: number;
}

/**
 * Compute the ISO-8601 week number and week-numbering year for a date.
 *
 * ISO weeks start on Monday and week 1 is the week containing the year's first
 * Thursday. This is what calendars and `date +%V` agree on, unlike a naive
 * day-of-year/7 calculation (which the original implementation used and which
 * was wrong around year boundaries).
 */
export function isoWeek(date: Date): IsoWeek {
	// Work in UTC to avoid DST/offset drift; only the calendar date matters.
	const d = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
	);
	// ISO weekday: Mon=0 … Sun=6.
	const isoDay = (d.getUTCDay() + 6) % 7;
	// Shift to the Thursday of this week; its calendar year is the ISO year.
	d.setUTCDate(d.getUTCDate() - isoDay + 3);
	const isoYear = d.getUTCFullYear();
	// Thursday of week 1 is the first Thursday of the ISO year.
	const firstThursday = new Date(Date.UTC(isoYear, 0, 4));
	const firstThursdayIsoDay = (firstThursday.getUTCDay() + 6) % 7;
	firstThursday.setUTCDate(
		firstThursday.getUTCDate() - firstThursdayIsoDay + 3,
	);
	const msPerWeek = 7 * 24 * 60 * 60 * 1000;
	const week =
		1 + Math.round((d.getTime() - firstThursday.getTime()) / msPerWeek);
	return { week, year: isoYear };
}

/**
 * Replace `{week}` and `{year}` tokens in a string with the given week info.
 */
export function applyWeekTokens(template: string, info: IsoWeek): string {
	return template
		.replaceAll("{week}", String(info.week))
		.replaceAll("{year}", String(info.year));
}

/** Build the vault-relative note path from a filename format. */
export function weeklyNotePath(fileNameFormat: string, info: IsoWeek): string {
	return `${applyWeekTokens(fileNameFormat, info)}.md`;
}
