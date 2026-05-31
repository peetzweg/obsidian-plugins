import { describe, expect, it } from "vitest";
import { applyYearToken, yearlyNotePath } from "./yearly-todo";

describe("applyYearToken", () => {
	it("replaces all occurrences", () => {
		expect(applyYearToken("{year} Todos ({year})", 2026)).toBe(
			"2026 Todos (2026)",
		);
	});
});

describe("yearlyNotePath", () => {
	it("appends the markdown extension", () => {
		expect(yearlyNotePath("{year} Todos", 2026)).toBe("2026 Todos.md");
	});
});
