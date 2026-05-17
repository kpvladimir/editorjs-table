# Table tool

The Table Block for the [Editor.js](https://editorjs.io). Finally improved.
Based on version 2.4.5 from https://github.com/editor-js/table.

![](assets/68747470733a2f2f636170656c6c612e706963732f34313239346365632d613262332d343135372d383339392d6666656665643364386666642e6a7067.jpeg)

## Installation

Get the package

```shell
npm install @kpvladimir/editorjs-table
```

Include module at your application

```javascript
import Table from "@kpvladimir/editorjs-table";
```

Optionally, you can load this tool from CDN [JsDelivr CDN](https://cdn.jsdelivr.net/npm/@editorjs/table@latest)

## Development notes

This fork was updated to use the current Vite-based build toolchain:

- Vite was upgraded to `8.0.13`.
- The Vite config was moved to `vite.config.mjs` because the current Vite plugins are ESM-only.
- Dependency management was switched from Yarn v1 to npm. Use `npm install`, and keep `package-lock.json` committed.
- ESLint was migrated to the flat config format in `eslint.config.mjs`.
- PostCSS dependencies were updated and duplicate/unused build dependencies were removed.
- The build now emits `dist/table.mjs`, `dist/table.umd.js`, and declaration files through `vite-plugin-dts`.

Useful local commands:

```shell
npm install
npm run dev
npm run lint
npm run build
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
import Table from "@editorjs/table";

var editor = EditorJS({
  tools: {
    table: Table,
  },
});
```

Or init the Table tool with additional settings

```javascript
var editor = EditorJS({
  tools: {
    table: {
      class: Table,
      inlineToolbar: true,
      config: {
        withHeadings: true,
        rows: 2,
        cols: 3,
        maxRows: 5,
        maxCols: 5,
      },
    },
  },
});
```

## Config Params

| Field          | Type      | Description                                                                                                          |
| -------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| `rows`         | `number`  | initial number of body rows. `2` by default. If `withHeadings` is enabled, one heading row is added above these rows |
| `cols`         | `number`  | initial number of columns. `2` by default                                                                            |
| `maxRows`      | `number`  | maximum total number of rows, including a heading row when `withHeadings` is enabled. `5` by params                  |
| `maxCols`      | `number`  | maximum number of columns. `5` by params                                                                             |
| `withHeadings` | `boolean` | toggle table headings. `false` by default                                                                            |
| `stretched`    | `boolean` | whether the table wrapper is stretched to fill the full width of the table block. `false` by default                 |

The `withHeadings` and `stretched` config params are applied when a new table block is inserted. Saved table data can override these values for each block. When `stretched` is `false`, the table wrapper (`.tc-wrap`) is rendered at 80% width and centered inside the table block. When `stretched` is `true`, only the table wrapper is expanded to 100% of the table block; the Editor.js block itself is not stretched. When pasting an HTML table, the current `stretched` state is preserved, while `withHeadings` is detected from the pasted table markup.

`maxRows` and `maxCols` limit adding new rows and columns from the add buttons, toolboxes, and keyboard actions. Saved table data is rendered as-is even if it already exceeds the configured limit.

## Output data

This Tool returns `data` in the following format

| Field          | Type         | Description                                                                      |
| -------------- | ------------ | -------------------------------------------------------------------------------- |
| `withHeadings` | `boolean`    | Uses the first line as headings                                                  |
| `stretched`    | `boolean`    | whether the table wrapper is stretched to fill the full width of the table block |
| `content`      | `string[][]` | two-dimensional array with table contents                                        |

```json
{
  "type": "table",
  "data": {
    "withHeadings": true,
    "stretched": false,
    "content": [
      ["Kine", "Pigs", "Chicken"],
      ["1 pcs", "3 pcs", "12 pcs"],
      ["100$", "200$", "150$"]
    ]
  }
}
```
