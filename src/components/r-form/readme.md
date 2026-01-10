# r-form



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                   | Description                             | Type                              | Default     |
| ------------------------- | --------------------------- | --------------------------------------- | --------------------------------- | ----------- |
| `disabled`                | `disabled`                  | Whether to disable all components       | `boolean`                         | `false`     |
| `hideRequiredAsterisk`    | `hide-required-asterisk`    | Whether to hide required asterisk       | `boolean`                         | `false`     |
| `inline`                  | `inline`                    | Whether the form is inline              | `boolean`                         | `false`     |
| `inlineMessage`           | `inline-message`            | Whether to display error message inline | `boolean`                         | `false`     |
| `labelPosition`           | `label-position`            | Position of label                       | `"left" \| "right" \| "top"`      | `'right'`   |
| `labelSuffix`             | `label-suffix`              | Suffix of the label                     | `string`                          | `''`        |
| `labelWidth`              | `label-width`               | Width of label                          | `string`                          | `''`        |
| `model`                   | --                          | Data of form component                  | `{ [key: string]: any; }`         | `{}`        |
| `requireAsteriskPosition` | `require-asterisk-position` | Position of asterisk                    | `"left" \| "right"`               | `'left'`    |
| `rules`                   | --                          | Validation rules                        | `FormRules`                       | `{}`        |
| `showMessage`             | `show-message`              | Whether to show error message           | `boolean`                         | `true`      |
| `size`                    | `size`                      | Control the size of components          | `"default" \| "large" \| "small"` | `'default'` |
| `statusIcon`              | `status-icon`               | Whether to show status icon             | `boolean`                         | `false`     |


## Events

| Event      | Description                            | Type                                                              |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- |
| `validate` | Emitted after a form item is validated | `CustomEvent<{ prop: string; valid: boolean; message: string; }>` |


## Methods

### `clearValidate(props?: string | string[]) => Promise<void>`

Clear validation messages

#### Parameters

| Name    | Type                 | Description |
| ------- | -------------------- | ----------- |
| `props` | `string \| string[]` |             |

#### Returns

Type: `Promise<void>`



### `resetFields() => Promise<void>`

Reset all fields

#### Returns

Type: `Promise<void>`



### `validateField(props: string | string[]) => Promise<boolean>`

Validate specified fields

#### Parameters

| Name    | Type                 | Description |
| ------- | -------------------- | ----------- |
| `props` | `string \| string[]` |             |

#### Returns

Type: `Promise<boolean>`



### `validateForm() => Promise<boolean>`

Validate the whole form

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
