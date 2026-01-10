# r-tooltip



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                     | Type                                        | Default     |
| ------------ | ------------- | ------------------------------- | ------------------------------------------- | ----------- |
| `content`    | `content`     | Tooltip content                 | `string`                                    | `undefined` |
| `disabled`   | `disabled`    | Whether tooltip is disabled     | `boolean`                                   | `false`     |
| `effect`     | `effect`      | Tooltip effect/theme            | `"dark" \| "light"`                         | `'dark'`    |
| `enterable`  | `enterable`   | Whether mouse can enter tooltip | `boolean`                                   | `true`      |
| `hideDelay`  | `hide-delay`  | Delay before hiding (ms)        | `number`                                    | `200`       |
| `maxWidth`   | `max-width`   | Max width for wrapping          | `number`                                    | `undefined` |
| `placement`  | `placement`   | Tooltip placement               | `"bottom" \| "left" \| "right" \| "top"`    | `'top'`     |
| `rawContent` | `raw-content` | Raw content (allow HTML)        | `boolean`                                   | `false`     |
| `showArrow`  | `show-arrow`  | Show arrow                      | `boolean`                                   | `true`      |
| `showDelay`  | `show-delay`  | Delay before showing (ms)       | `number`                                    | `0`         |
| `trigger`    | `trigger`     | Trigger mode                    | `"click" \| "focus" \| "hover" \| "manual"` | `'hover'`   |


## Methods

### `hide() => Promise<void>`

Hide tooltip programmatically

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Show tooltip programmatically

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
