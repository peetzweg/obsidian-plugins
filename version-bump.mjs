import { readFileSync, writeFileSync } from "fs";

// Read the (already bumped, e.g. by `changeset version`) version from
// package.json so this works regardless of npm lifecycle env vars.
const { version: targetVersion } = JSON.parse(
	readFileSync("package.json", "utf8"),
);

// Sync manifest.json to the target version, keeping minAppVersion.
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", `${JSON.stringify(manifest, null, "\t")}\n`);

// Record the version -> minAppVersion mapping for Obsidian's update checks.
const versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", `${JSON.stringify(versions, null, "\t")}\n`);

console.log(`Synced manifest.json + versions.json to v${targetVersion}`);
