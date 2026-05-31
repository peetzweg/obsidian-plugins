import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.test.ts"],
		environment: "node",
		coverage: {
			provider: "v8",
			reporter: ["text", "text-summary", "html", "lcov"],
			// Measure the testable, Obsidian-free logic. The wiring files
			// (index.ts / main.ts / settings.ts / obsidian-utils.ts) import
			// `obsidian` and can't run under Node, so they're excluded — see
			// docs/ARCHITECTURE.md.
			include: ["src/**/*.ts"],
			exclude: [
				"src/**/*.test.ts",
				"src/**/index.ts",
				"src/main.ts",
				"src/settings.ts",
				"src/obsidian-utils.ts",
				"src/features/feature.ts",
				"src/features/registry.ts",
				"src/features/**/settings.ts",
			],
			// Ratchet: thresholds auto-raise to current coverage and are
			// committed, so a PR that lowers coverage fails CI. `perFile`
			// enforces that EVERY measured file (i.e. every feature's logic)
			// meets the bar — no feature can sit at 0%.
			thresholds: {
				autoUpdate: true,
				perFile: true,
				lines: 100,
				functions: 100,
				statements: 100,
				branches: 100,
			},
		},
	},
});
