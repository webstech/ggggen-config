import * as core from "@actions/core";
import { inspect } from "util";
import * as fs from "fs";
import path from "path";
import { loadConfig } from "gitgitgadget/lib/project-config";
import { genConfig, formatType } from "../lib/gen-config";

interface IConfigOptions {
  config: string;
  format: string;
  file: string | undefined;
}

async function run(): Promise<void> {
  try {
    const inputs: IConfigOptions = {
      format: core.getInput("format"),
      file: core.getInput("file"),
      config: core.getInput("config"),
    };
    core.debug(`Inputs: ${inspect(inputs)}`);

    // Check required inputs
    if (!inputs.format || !["common", "ts", "json"].includes(inputs.format)) {
      throw new Error(`Missing or invalid required input 'format'.`);
    }

    const format: formatType = inputs.format as formatType;

    if (!inputs.file) {
      throw new Error(`Missing required input 'file'.`);
    }

    if (!inputs.config) {
      throw new Error(`Missing required input 'config'.`);
    }

    const file = path.resolve(inputs.config);
    const config = await loadConfig(file);
    const configOut = genConfig(config, format);
    console.info(configOut);

    const fd = fs.openSync(path.resolve(inputs.file), "w");

    fs.writeSync(fd, configOut);
    fs.closeSync(fd);

  } catch (err) {
    const error = err as Error;
    core.debug(inspect(error));
    const message: string = error.message;
    // Handle validation errors from workflow dispatch
    if (
      message.startsWith("Unexpected inputs provided") ||
      (message.startsWith("Required input") &&
        message.endsWith("not provided")) ||
      message.startsWith("No ref found for:") ||
      message === `Workflow does not have 'workflow_dispatch' trigger`
    ) {
      core.setOutput("error-message", message);
      core.warning(message);
    } else {
      core.setFailed(error.message);
    }
  }
}

void run();
