import { expect, test } from "@jest/globals";
import { IConfig } from "gitgitgadget/lib/project-config";
import { genConfig } from "../lib/gen-config";

const modelConfig: IConfig =
{
    "repo": {
        "name": "gggmonitored",
        "owner": "foobar",
        "baseOwner": "webstech",
        "owners": ["webstech", "galileo"],
        "branches": ["last"],
        "closingBranches": ["last", "main"],
        "trackingBranches": ["last", "main", "dev"],
        "maintainerBranch": "",
        "host": "github.com"
    },
    "mailrepo": {
        "name": "git",
        "owner": "gitgitgadget",
        "branch": "main",
        "host": "lore.kernel.org"
    },
    "mail": {
        "author": "GitGadget",
        "sender": "GitGadget"
    },
    "app": {
        "appID": 12836,
        "installationID": 195971,
        "name": "gitgitgadget",
        "displayName": "BigScopes",
        "altname": "gitgitgadget-git"
    },
    "lint": {
        "maxCommitsIgnore": [],
        "maxCommits": 30
    },
    "user": {
        "allowUserAsLogin": false
    },
    "project": {
        "to": "david@groundcontrol.com",
        "branch": "upstream/master",
        "cc": [],
        "urlPrefix": "https://mailarchive.com/egit/"
    }
};

test("Gen Config Tests", () => {
    {
        const configOut = genConfig(modelConfig, "common");
        expect(configOut).toMatch(/"use strict/);
    }

    {
        const configOut = genConfig(modelConfig, "ts");
        expect(configOut).toMatch(/export/);
    }

    {
        const configOut = genConfig(modelConfig, "json");
        expect(configOut).toMatch(/{/);
    }

    {
        process.env.GITGITGADGET_REPO_OWNER='foo';
        const configOut = genConfig(modelConfig, "json");
        const config = JSON.parse(configOut);
        expect(config.repo.owner).toEqual('foo');
    }

    // GITGITGADGET_PROJECT_CC=["foo","bar"]
    {
        process.env.GITGITGADGET_PROJECT_CC='["foo","bar"]';
        const configOut = genConfig(modelConfig, "json");
        const config = JSON.parse(configOut);
        expect(config.project.cc.length).toEqual(2);
    }
});