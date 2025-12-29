# r-menu

<!-- Auto Generated Below -->


## Overview

r-menu
Accessible, flexible menu component

## Properties

| Property   | Attribute  | Description                  | Type                                                      | Default     |
| ---------- | ---------- | ---------------------------- | --------------------------------------------------------- | ----------- |
| `disabled` | `disabled` | Disabled state               | `boolean`                                                 | `false`     |
| `items`    | --         | Menu items                   | `{ label: string; value: string; disabled?: boolean; }[]` | `[]`        |
| `label`    | `label`    | Menu label for accessibility | `string`                                                  | `undefined` |


## Events

| Event     | Description        | Type                  |
| --------- | ------------------ | --------------------- |
| `rBlur`   | Fired on blur      | `CustomEvent<void>`   |
| `rFocus`  | Fired on focus     | `CustomEvent<void>`   |
| `rSelect` | Emit select events | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
