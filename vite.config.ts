/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";

// https://vitest.dev/config/
export default defineConfig(({ mode }) => {
	return {
		test: {
			environment: "happy-dom",
		},
	};
});
