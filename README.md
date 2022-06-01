# <!-- start title -->

# GitHub Action: gitgitgadget generate config Action

<!-- end title -->

# <!-- start description -->

This is a GitHub action for generating GitGitGadget style config. The input is a model configuration file. It may be a javascript file, typscript converted javascript file or a json file (with a .json extension). The output format may be commonJS, javascript (typescript style) or json. All three formats are supported for subsequent loading by the gitgitgadget utilities. Existing values in the config will be changed by environment variables that match the existing config values.

<!-- end description -->

# <!-- start usage -->

```yaml
- uses: webstech/gitgitgadget-gen-config@v0.5.0
  with:
    # The format of the output file. The output format may be commonJS, javascript
    # (typescript style) or json. All three formats are supported for subsequent
    # loading by the gitgitgadget utilities. Valid values are `common`, `ts` or
    # `json`.
    # Default: common
    format: ""

    # The name of the output configuration file.
    file: ""

    # Model JSON configuration file.'
    config: ""
```

<!-- end usage -->

# <!-- start inputs -->

| **Input**    | **Description**                                                                                                                                                                                                                           | **Default** | **Required** |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------: | :----------: |
| **`format`** | The format of the output file. The output format may be commonJS, javascript (typescript style) or json. All three formats are supported for subsequent loading by the gitgitgadget utilities. Valid values are `common`, `ts` or `json`. |  `common`   |  **false**   |
| **`file`**   | The name of the output configuration file.                                                                                                                                                                                                |             |   **true**   |
| **`config`** | Model JSON configuration file.'                                                                                                                                                                                                           |             |   **true**   |

<!-- end inputs -->

# <!-- start outputs -->

| **Output**      | **Description**                                   | **Default** | **Required** |
| :-------------- | :------------------------------------------------ | ----------- | ------------ |
| `error-message` | Validation errors when using `workflow` dispatch. |             |              |

<!-- end outputs -->

## License

[MIT](LICENSE)
