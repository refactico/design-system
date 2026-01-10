# r-dialog



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                            | Type      | Default     |
| --------------------- | ------------------------ | -------------------------------------- | --------- | ----------- |
| `alignCenter`         | `align-center`           | Whether to align header/footer center  | `boolean` | `false`     |
| `appendToBody`        | `append-to-body`         | Whether to append to body              | `boolean` | `false`     |
| `center`              | `center`                 | Whether to center dialog vertically    | `boolean` | `false`     |
| `closeOnClickOverlay` | `close-on-click-overlay` | Whether clicking overlay closes dialog | `boolean` | `true`      |
| `closeOnPressEscape`  | `close-on-press-escape`  | Whether pressing ESC closes dialog     | `boolean` | `true`      |
| `customClass`         | `custom-class`           | Custom class for dialog                | `string`  | `undefined` |
| `destroyOnClose`      | `destroy-on-close`       | Whether to destroy content on close    | `boolean` | `false`     |
| `dialogTitle`         | `dialog-title`           | Dialog title                           | `string`  | `undefined` |
| `fullscreen`          | `fullscreen`             | Whether dialog is fullscreen           | `boolean` | `false`     |
| `isDraggable`         | `is-draggable`           | Whether dialog is draggable            | `boolean` | `false`     |
| `lockScroll`          | `lock-scroll`            | Whether to lock body scroll            | `boolean` | `true`      |
| `showClose`           | `show-close`             | Whether to show close button           | `boolean` | `true`      |
| `visible`             | `visible`                | Whether dialog is visible              | `boolean` | `false`     |
| `width`               | `width`                  | Dialog width                           | `string`  | `'500px'`   |


## Events

| Event          | Description | Type                |
| -------------- | ----------- | ------------------- |
| `dialogClose`  |             | `CustomEvent<void>` |
| `dialogClosed` |             | `CustomEvent<void>` |
| `dialogOpen`   |             | `CustomEvent<void>` |
| `dialogOpened` |             | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Close dialog

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Open dialog

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
