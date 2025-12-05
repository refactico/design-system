# r-dropdown

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                    | Type                                     | Default     |
| ------------- | ------------- | ---------------------------------------------- | ---------------------------------------- | ----------- |
| `cancelable`  | `cancelable`  | If true, the interface is cancelable           | `boolean`                                | `true`      |
| `color`       | `color`       | The dropdown color (Ionic color)               | `string`                                 | `undefined` |
| `disabled`    | `disabled`    | If true, the dropdown is disabled              | `boolean`                                | `false`     |
| `error`       | `error`       | If true, the dropdown has error state          | `boolean`                                | `false`     |
| `errorText`   | `error-text`  | Error message to display                       | `string`                                 | `undefined` |
| `fill`        | `fill`        | The dropdown fill style                        | `"outline" \| "solid"`                   | `undefined` |
| `helperText`  | `helper-text` | Helper text to display                         | `string`                                 | `undefined` |
| `interface`   | `interface`   | Interface style (action-sheet, popover, alert) | `"action-sheet" \| "alert" \| "popover"` | `undefined` |
| `label`       | `label`       | The dropdown label                             | `string`                                 | `undefined` |
| `multiple`    | `multiple`    | If true, allows multiple selections            | `boolean`                                | `false`     |
| `name`        | `name`        | The dropdown name                              | `string`                                 | `undefined` |
| `placeholder` | `placeholder` | The dropdown placeholder                       | `string`                                 | `undefined` |
| `required`    | `required`    | If true, the dropdown is required              | `boolean`                                | `false`     |
| `shape`       | `shape`       | The dropdown shape                             | `"round"`                                | `undefined` |
| `value`       | `value`       | The dropdown value                             | `number \| string`                       | `undefined` |


## Events

| Event     | Description                             | Type                            |
| --------- | --------------------------------------- | ------------------------------- |
| `rBlur`   | Emitted when the dropdown is blurred    | `CustomEvent<CustomEvent<any>>` |
| `rChange` | Emitted when the dropdown value changes | `CustomEvent<CustomEvent<any>>` |
| `rFocus`  | Emitted when the dropdown is focused    | `CustomEvent<CustomEvent<any>>` |


## Dependencies

### Used by

 - [app-home](../app-home)

### Depends on

- ion-item
- ion-label
- ion-select
- ion-note

### Graph
```mermaid
graph TD;
  r-dropdown --> ion-item
  r-dropdown --> ion-label
  r-dropdown --> ion-select
  r-dropdown --> ion-note
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-select --> ion-select-popover
  ion-select --> ion-popover
  ion-select --> ion-action-sheet
  ion-select --> ion-alert
  ion-select --> ion-select-modal
  ion-select --> ion-modal
  ion-select --> ion-icon
  ion-select-popover --> ion-item
  ion-select-popover --> ion-checkbox
  ion-select-popover --> ion-radio-group
  ion-select-popover --> ion-radio
  ion-select-popover --> ion-list
  ion-select-popover --> ion-list-header
  ion-select-popover --> ion-label
  ion-popover --> ion-backdrop
  ion-action-sheet --> ion-backdrop
  ion-action-sheet --> ion-icon
  ion-action-sheet --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ion-select-modal --> ion-radio-group
  ion-select-modal --> ion-item
  ion-select-modal --> ion-radio
  ion-select-modal --> ion-checkbox
  ion-select-modal --> ion-header
  ion-select-modal --> ion-toolbar
  ion-select-modal --> ion-title
  ion-select-modal --> ion-buttons
  ion-select-modal --> ion-button
  ion-select-modal --> ion-content
  ion-select-modal --> ion-list
  ion-button --> ion-ripple-effect
  ion-modal --> ion-backdrop
  app-home --> r-dropdown
  style r-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
