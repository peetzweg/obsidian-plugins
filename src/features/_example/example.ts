/**
 * Pure logic for the example feature.
 *
 * This file has NO Obsidian imports, so it can be unit-tested directly with
 * vitest (see `example.test.ts`). Keep all real logic here; keep `index.ts`
 * thin (just wiring commands/events to this logic).
 */

/** Wrap each non-empty line in a Markdown blockquote. */
export function toBlockquote(text: string): string {
	return text
		.split("\n")
		.map((line) => (line.length > 0 ? `> ${line}` : ">"))
		.join("\n");
}
