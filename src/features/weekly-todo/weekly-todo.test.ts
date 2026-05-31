import { describe, expect, it } from "vitest";
import { applyWeekTokens, isoWeek, weeklyNotePath } from "./weekly-todo";

describe("isoWeek", () => {
	it("computes a mid-year week", () => {
		// 2026-05-31 is a Sunday in ISO week 22 of 2026.
		expect(isoWeek(new Date(2026, 4, 31))).toEqual({
			week: 22,
			year: 2026,
		});
	});

	it("handles the first days of January belonging to the previous year", () => {
		// 2021-01-01 (Fri) is ISO week 53 of 2020.
		expect(isoWeek(new Date(2021, 0, 1))).toEqual({ week: 53, year: 2020 });
	});

	it("handles late December belonging to the next year", () => {
		// 2019-12-30 (Mon) is ISO week 1 of 2020.
		expect(isoWeek(new Date(2019, 11, 30))).toEqual({
			week: 1,
			year: 2020,
		});
	});

	it("treats the first Thursday's week as week 1", () => {
		// 2026-01-01 is a Thursday → week 1 of 2026.
		expect(isoWeek(new Date(2026, 0, 1))).toEqual({ week: 1, year: 2026 });
	});
});

describe("applyWeekTokens", () => {
	it("replaces all token occurrences", () => {
		expect(
			applyWeekTokens("{year} W{week} ({year})", { week: 5, year: 2026 }),
		).toBe("2026 W5 (2026)");
	});
});

describe("weeklyNotePath", () => {
	it("appends the markdown extension", () => {
		expect(
			weeklyNotePath("{year} Week {week}", { week: 5, year: 2026 }),
		).toBe("2026 Week 5.md");
	});
});
