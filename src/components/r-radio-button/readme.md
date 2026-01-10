# r-radio-button



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute  | Description                                                     | Type                              | Default     |
| ----------- | ---------- | --------------------------------------------------------------- | --------------------------------- | ----------- |
| `checked`   | `checked`  | Whether the radio button is checked (controlled by radio-group) | `boolean`                         | `false`     |
| `disabled`  | `disabled` | Whether the radio button is disabled                            | `boolean`                         | `false`     |
| `inputName` | `name`     | Native name attribute                                           | `string`                          | `undefined` |
| `label`     | `label`    | The label text (display text)                                   | `string`                          | `undefined` |
| `size`      | `size`     | Size of the radio button                                        | `"default" \| "large" \| "small"` | `'default'` |
| `value`     | `value`    | The value of the radio button                                   | `boolean \| number \| string`     | `undefined` |


## Events

| Event    | Description | Type                                       |
| -------- | ----------- | ------------------------------------------ |
| `change` |             | `CustomEvent<boolean \| number \| string>` |


## Dependencies

### Used by

 - [r-radio-group](../r-radio-group)

### Graph
```mermaid
graph TD;
  r-radio-group --> r-radio-button
  style r-radio-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
