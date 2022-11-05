import fs from "fs";
import path from "path";
import { defineConfig } from "tsup";

const { name: packageName, version: packageVersion } =
	getPackageInfo(__dirname);

const entry = ["src/index.ts"];
const external = ["react", "react-dom"];
const target = "es2018";
const banner = createBanner(packageName, packageVersion, "MIT", "2022");

export default defineConfig([
	// cjs
	{
		entry,
		format: "cjs",
		sourcemap: true,
		external,
		banner: { js: banner },
		target,
	},

	// esm
	{
		entry,
		dts: { banner },
		format: "esm",
		sourcemap: true,
		external,
		banner: { js: banner },
		target,
	},
]);

function createBanner(
	packageName: string,
	version: string,
	lincense: string,
	initialYear: string
) {
	let year = String(new Date().getFullYear());
	let yearRange = initialYear === year ? initialYear : `${initialYear}-${year}`;
	return `/**
  * ${packageName} v${version}
  *
  * Copyright (c) ${yearRange} Chance Strickland
  *
  * This source code is licensed under the ${lincense} license found in the
  * LICENSE file in the root directory of this source tree.
  *
  * @license ${lincense}
  */
`;
}

function getPackageInfo(packageRoot: string) {
	let packageJson = fs.readFileSync(
		path.join(packageRoot, "package.json"),
		"utf8"
	);
	let { version, name } = parsePackageJson(packageJson);
	return { version, name };
}

function parsePackageJson(packageJsonPath: string) {
	let parsed: { name: string; version: string };
	try {
		parsed = JSON.parse(packageJsonPath);
	} catch (_) {
		throw new Error(
			"Invalid or missing package.json. Ensure that the file exists, " +
				"is valid JSON format, and that it contains a name and version value."
		);
	}
	if (!parsed || typeof parsed !== "object") {
		throw new Error(
			"Invalid package.json. Ensure that the file contents is valid JSON " +
				"format, and that it contains a name and version value."
		);
	}
	if (!parsed.name || typeof parsed.name !== "string") {
		throw new Error("The name field in package.json is missing or invalid.");
	}
	if (!parsed.version || typeof parsed.version !== "string") {
		throw new Error("The version field in package.json is missing or invalid.");
	}
	return parsed;
}
