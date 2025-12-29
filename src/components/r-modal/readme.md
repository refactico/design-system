# r-modal

<!-- Auto Generated Below -->


## Overview

r-modal
Accessible, flexible modal/dialog component

## Properties

| Property           | Attribute           | Description             | Type                           | Default     |
| ------------------ | ------------------- | ----------------------- | ------------------------------ | ----------- |
| `backdropClosable` | `backdrop-closable` | Close on backdrop click | `boolean`                      | `true`      |
| `closable`         | `closable`          | Show close button       | `boolean`                      | `true`      |
| `escapeClosable`   | `escape-closable`   | Close on escape key     | `boolean`                      | `true`      |
| `modalTitle`       | `modal-title`       | Modal title             | `string`                       | `undefined` |
| `open`             | `open`              | Open state              | `boolean`                      | `false`     |
| `size`             | `size`              | Modal size              | `"lg" \| "md" \| "sm" \| "xl"` | `'md'`      |


## Events

| Event    | Description            | Type                |
| -------- | ---------------------- | ------------------- |
| `rClose` | Emit close events      | `CustomEvent<void>` |
| `rOpen`  | Fired when modal opens | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
