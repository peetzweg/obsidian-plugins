/**
 * Pure logic for the sort-bullets feature — no Obsidian imports, fully testable.
 */

const BULLET_RE = /^(\s*)([-+*])(\s+)(.*)$/;

function indentOf(line: string): number | null {
	const m = line.match(BULLET_RE);
	return m ? m[1].length : null;
}

interface Group {
	lines: string[];
	struck: boolean;
}

/**
 * Move completed (strikethrough, `~~…~~`) top-level bullets to the bottom of
 * the list while keeping everything else in place.
 *
 * Unlike the original implementation, this:
 *  - preserves non-bullet lines (preamble and any sub-content), and
 *  - keeps nested sub-items attached to their parent bullet.
 *
 * A "top-level item" is a bullet at the shallowest indentation found in the
 * selection, together with every following line until the next top-level
 * bullet (its children / continuation lines). The sort is stable, so the
 * relative order within the kept and struck groups is unchanged.
 */
export function sortStruckBulletsLast(text: string): string {
	const lines = text.split("\n");
	const bulletIndents = lines
		.map(indentOf)
		.filter((i): i is number => i !== null);

	// Nothing to sort.
	if (bulletIndents.length === 0) {
		return text;
	}

	const minIndent = Math.min(...bulletIndents);

	const preamble: string[] = [];
	const groups: Group[] = [];
	let current: Group | null = null;

	for (const line of lines) {
		const match = line.match(BULLET_RE);
		// A top-level bullet starts a new group; deeper bullets and non-bullet
		// lines are absorbed into the current group as children/continuation.
		if (match && match[1].length === minIndent) {
			current = { lines: [line], struck: match[4].includes("~~") };
			groups.push(current);
		} else if (current) {
			current.lines.push(line);
		} else {
			preamble.push(line);
		}
	}

	const kept = groups.filter((g) => !g.struck);
	const struck = groups.filter((g) => g.struck);
	const orderedLines = [...kept, ...struck].flatMap((g) => g.lines);

	return [...preamble, ...orderedLines].join("\n");
}
