import type { Feature } from "./feature";
import { fixedFilesFeature } from "./fixed-files";
import { sortBulletsFeature } from "./sort-bullets";
import { weeklyTodoFeature } from "./weekly-todo";
import { yearlyTodoFeature } from "./yearly-todo";

// import { exampleFeature } from "./_example"; // template — see docs/ADDING_A_FEATURE.md

/**
 * The single place to register features. Add yours here and it is wired into
 * load/unload and the settings tab automatically.
 */
export const FEATURES: Feature[] = [
	fixedFilesFeature,
	weeklyTodoFeature,
	yearlyTodoFeature,
	sortBulletsFeature,
	// exampleFeature,
];
