# r-input



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                                                                                            | Default     |
| -------------- | --------------- | ----------- | --------------------------------------------------------------------------------------------------------------- | ----------- |
| `autocomplete` | `autocomplete`  |             | `string`                                                                                                        | `undefined` |
| `clearOnEdit`  | `clear-on-edit` |             | `boolean`                                                                                                       | `undefined` |
| `color`        | `color`         |             | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning"` | `undefined` |
| `disabled`     | `disabled`      |             | `boolean`                                                                                                       | `false`     |
| `error`        | `error`         |             | `boolean`                                                                                                       | `false`     |
| `errorText`    | `error-text`    |             | `string`                                                                                                        | `undefined` |
| `fill`         | `fill`          |             | `"clear" \| "default" \| "outline" \| "solid"`                                                                  | `undefined` |
| `helperText`   | `helper-text`   |             | `string`                                                                                                        | `undefined` |
| `label`        | `label`         |             | `string`                                                                                                        | `undefined` |
| `maxlength`    | `maxlength`     |             | `number`                                                                                                        | `undefined` |
| `minlength`    | `minlength`     |             | `number`                                                                                                        | `undefined` |
| `name`         | `name`          |             | `string`                                                                                                        | `undefined` |
| `pattern`      | `pattern`       |             | `string`                                                                                                        | `undefined` |
| `placeholder`  | `placeholder`   |             | `string`                                                                                                        | `undefined` |
| `readonly`     | `readonly`      |             | `boolean`                                                                                                       | `false`     |
| `required`     | `required`      |             | `boolean`                                                                                                       | `false`     |
| `shape`        | `shape`         |             | `"round"`                                                                                                       | `undefined` |
| `type`         | `type`          |             | `string`                                                                                                        | `'text'`    |
| `value`        | `value`         |             | `string`                                                                                                        | `undefined` |


## Events

| Event    | Description | Type                            |
| -------- | ----------- | ------------------------------- |
| `rBlur`  |             | `CustomEvent<FocusEvent>`       |
| `rFocus` |             | `CustomEvent<FocusEvent>`       |
| `rInput` |             | `CustomEvent<CustomEvent<any>>` |


## Dependencies

### Depends on

- ion-item
- ion-label
- ion-input
- ion-note

### Graph
```mermaid
graph TD;
  r-input --> ion-item
  r-input --> ion-label
  r-input --> ion-input
  r-input --> ion-note
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-input --> ion-icon
  style r-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
