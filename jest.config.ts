import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
	verbose: true,
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	coverageReporters: ["json", "lcov", "text", "clover"],
	setupFiles: ["<rootDir>/src/__test__/config/setup.ts"],
}

export default config
