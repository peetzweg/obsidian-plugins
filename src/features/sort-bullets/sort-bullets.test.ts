import { describe, expect, it } from "vitest";
import { sortStruckBulletsLast } from "./sort-bullets";

describe("sortStruckBulletsLast", () => {
	it("moves struck items to the bottom, keeping relative order", () => {
		const input = ["- a", "- ~~b~~", "- c", "- ~~d~~"].join("\n");
		expect(sortStruckBulletsLast(input)).toBe(
			["- a", "- c", "- ~~b~~", "- ~~d~~"].join("\n"),
		);
	});

	it("keeps nested sub-items attached to their parent", () => {
		const input = [
			"- ~~done~~",
			"  - child of done",
			"- todo",
			"  - child of todo",
		].join("\n");
		expect(sortStruckBulletsLast(input)).toBe(
			[
				"- todo",
				"  - child of todo",
				"- ~~done~~",
				"  - child of done",
			].join("\n"),
		);
	});

	it("preserves non-bullet preamble lines", () => {
		const input = ["# Heading", "", "- ~~done~~", "- todo"].join("\n");
		expect(sortStruckBulletsLast(input)).toBe(
			["# Heading", "", "- todo", "- ~~done~~"].join("\n"),
		);
	});

	it("returns the text unchanged when there are no bullets", () => {
		const input = "just\nsome\ntext";
		expect(sortStruckBulletsLast(input)).toBe(input);
	});

	it("handles mixed bullet markers", () => {
		const input = ["* ~~x~~", "+ y", "- z"].join("\n");
		expect(sortStruckBulletsLast(input)).toBe(
			["+ y", "- z", "* ~~x~~"].join("\n"),
		);
	});
});
