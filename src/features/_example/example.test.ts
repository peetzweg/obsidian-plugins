import { describe, expect, it } from "vitest";
import { toBlockquote } from "./example";

describe("toBlockquote", () => {
	it("prefixes each line with a blockquote marker", () => {
		expect(toBlockquote("a\nb")).toBe("> a\n> b");
	});

	it("keeps blank lines as bare markers", () => {
		expect(toBlockquote("a\n\nb")).toBe("> a\n>\n> b");
	});
});
