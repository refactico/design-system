# r-collapse-item



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                        | Type      | Default |
| ------------ | ------------- | ---------------------------------- | --------- | ------- |
| `disabled`   | `disabled`    | Disable the collapse item          | `boolean` | `false` |
| `name`       | `name`        | Unique identification of the panel | `string`  | `''`    |
| `panelTitle` | `panel-title` | Title of the panel                 | `string`  | `''`    |


## Events

| Event        | Description                               | Type                  |
| ------------ | ----------------------------------------- | --------------------- |
| `itemToggle` | Internal event to communicate with parent | `CustomEvent<string>` |


## Methods

### `getIsActive() => Promise<boolean>`

Check if the current collapse item is active

#### Returns

Type: `Promise<boolean>`



### `setActive(active: boolean) => Promise<void>`

Set active state (called by parent)

#### Parameters

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `active` | `boolean` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
