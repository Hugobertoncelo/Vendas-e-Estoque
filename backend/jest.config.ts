import type { Config } from "jest";

const config: Config = {
  bail: true,

  clearMocks: true,

  preset: "ts-jest",

  resetMocks: true,

  setupFiles: ["./jest.setup.ts"],

  testMatch: ["**/*.spec.ts"],
};

export default config;
