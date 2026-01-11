# r-collapse



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                                                        | Type                 | Default   |
| -------------------- | ---------------------- | ------------------------------------------------------------------ | -------------------- | --------- |
| `accordion`          | `accordion`            | Whether to activate accordion mode (only one panel open at a time) | `boolean`            | `false`   |
| `expandIconPosition` | `expand-icon-position` | Set expand icon position                                           | `"left" \| "right"`  | `'right'` |
| `value`              | `value`                | Currently active panel names                                       | `string \| string[]` | `[]`      |


## Events

| Event    | Description                       | Type                              |
| -------- | --------------------------------- | --------------------------------- |
| `change` | Emitted when active panels change | `CustomEvent<string \| string[]>` |


## Methods

### `getActiveNames() => Promise<string[]>`

Get currently active panel names

#### Returns

Type: `Promise<string[]>`



### `setActiveNames(names: string | string[]) => Promise<void>`

Set active panel names

#### Parameters

| Name    | Type                 | Description |
| ------- | -------------------- | ----------- |
| `names` | `string \| string[]` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
