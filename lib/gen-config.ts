import { IConfig } from "gitgitgadget/lib/project-config";

// types that can be specifed on --format parameter
export type formatType = "common" | "ts" | "json";

const commonJSPrefix = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default =
`;

const tsPrefix = `export default
`;

const prefix = {
  common: commonJSPrefix,
  ts: tsPrefix,
  json: "",
};

export function genConfig(config: IConfig, format: formatType): string {
  // Update any overrides from environment variables of the form:
  // GITGITGADGET_<section>_<variable> in upper case.
  // Examples:
  // GITGITGADGET_LINT_MAXCOMMITS=40
  // GITGITGADGET_PROJECT_CC=["foo","bar"]
  const updatedConfig = Object.assign(config);

  let key0: keyof IConfig;
  // eslint-disable-next-line guard-for-in
  for (key0 in config) {
    const value0 = config[key0];

    if (typeof value0 === "object") {
      const key0Up = key0.toUpperCase();

      for (const [key1, value1] of Object.entries(value0)) {
        const key = `GITGITGADGET_${key0Up}_${key1.toUpperCase()}`;

        if (process.env[key]) {
          const envValue = process.env[key] as string;
          updatedConfig[key0][key1] =typeof value1 === "string" ? envValue : JSON.parse(envValue);
        }
      }
    }
  }

  return `${prefix[format]}${JSON.stringify(updatedConfig, null, 2)}`;
}

