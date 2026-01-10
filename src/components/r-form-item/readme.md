# r-form-item



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                        | Type                                    | Default     |
| --------------- | ---------------- | ---------------------------------- | --------------------------------------- | ----------- |
| `error`         | `error`          | Error message to display           | `string`                                | `''`        |
| `inlineMessage` | `inline-message` | Inline error message               | `boolean`                               | `false`     |
| `labelPosition` | `label-position` | Position of label (overrides form) | `"" \| "left" \| "right" \| "top"`      | `''`        |
| `labelText`     | `label`          | Label text                         | `string`                                | `''`        |
| `labelWidth`    | `label-width`    | Width of label                     | `string`                                | `''`        |
| `prop`          | `prop`           | Property name in form model        | `string`                                | `''`        |
| `required`      | `required`       | Whether field is required          | `boolean`                               | `false`     |
| `rules`         | --               | Validation rules for this field    | `FormRule \| FormRule[]`                | `undefined` |
| `showMessage`   | `show-message`   | Whether to show error message      | `boolean`                               | `true`      |
| `size`          | `size`           | Size of form item                  | `"" \| "default" \| "large" \| "small"` | `''`        |


## Methods

### `clearValidate() => Promise<void>`

Clear validation

#### Returns

Type: `Promise<void>`



### `resetField() => Promise<void>`

Reset this field

#### Returns

Type: `Promise<void>`



### `validateField() => Promise<boolean>`

Validate this field

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
