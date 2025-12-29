# r-select

<!-- Auto Generated Below -->


## Overview

r-select
Accessible, flexible select/dropdown component

## Properties

| Property      | Attribute     | Description                | Type                                                      | Default     |
| ------------- | ------------- | -------------------------- | --------------------------------------------------------- | ----------- |
| `disabled`    | `disabled`    | Disabled state             | `boolean`                                                 | `false`     |
| `error`       | `error`       | Error state                | `boolean`                                                 | `false`     |
| `helperText`  | `helper-text` | Helper / supporting text   | `string`                                                  | `undefined` |
| `label`       | `label`       | Input label                | `string`                                                  | `undefined` |
| `name`        | `name`        | Name attribute (for forms) | `string`                                                  | `undefined` |
| `options`     | --            | Options for the select     | `{ label: string; value: string; disabled?: boolean; }[]` | `[]`        |
| `placeholder` | `placeholder` | Placeholder text           | `string`                                                  | `undefined` |
| `required`    | `required`    | Required flag              | `boolean`                                                 | `false`     |
| `value`       | `value`       | Selected value             | `string`                                                  | `undefined` |


## Events

| Event     | Description        | Type                  |
| --------- | ------------------ | --------------------- |
| `rBlur`   | Fired on blur      | `CustomEvent<void>`   |
| `rChange` | Emit change events | `CustomEvent<string>` |
| `rFocus`  | Fired on focus     | `CustomEvent<void>`   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

# r-select

A native, accessible select (dropdown) web component built with **Stencil** and designed for use in a theme-driven design system.

`r-select` intentionally uses the native `<select>` element to guarantee:
- correct keyboard behavior
- screen reader support
- form submission
- mobile platform pickers
- zero ARIA hacks

---

## Overview

`r-select` is a production-grade select component that prioritizes correctness, accessibility, and maintainability over unnecessary customization.

It is **not** a fully custom dropdown. That is a deliberate design decision.

---

## Features

- Native `<select>` under the hood
- Options passed as data (`options` prop)
- Label, helper text, and error state
- Disabled and required states
- Placeholder support
- Works with HTML forms
- Keyboard and screen reader accessible
- Fully themeable via CSS variables
- Shadow DOM safe

---

## Basic Usage

```html
<r-select
  label="Country"
  placeholder="Select a country"
  name="country"
></r-select>
```

---

## With Options

```html
<r-select
  label="Framework"
  placeholder="Choose a framework"
  value="react"
></r-select>

<script>
  const select = document.querySelector('r-select');

  select.options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular', disabled: true },
  ];
</script>
```

---

## Error & Helper Text

```html
<r-select
  label="Email type"
  placeholder="Select type"
  error
  helper-text="This field is required"
></r-select>
```

---

## Required & Disabled

```html
<r-select
  label="Role"
  required
></r-select>

<r-select
  label="Status"
  disabled
></r-select>
```

---

## Controlled Value

```html
<r-select
  label="Language"
  value="en"
></r-select>

<script>
  const select = document.querySelector('r-select');

  select.options = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
  ];

  select.addEventListener('rChange', e => {
    console.log('Selected:', e.detail);
  });
</script>
```

---

## Properties

| Property | Attribute | Description | Type | Default |
|--------|----------|-------------|------|---------|
| `options` | — | Options to render | `{ label: string; value: string; disabled?: boolean }[]` | `[]` |
| `value` | `value` | Selected value | `string` | `undefined` |
| `label` | `label` | Label text | `string` | `undefined` |
| `placeholder` | `placeholder` | Placeholder option | `string` | `undefined` |
| `disabled` | `disabled` | Disabled state | `boolean` | `false` |
| `required` | `required` | Required field | `boolean` | `false` |
| `error` | `error` | Error state | `boolean` | `false` |
| `helperText` | `helper-text` | Helper / supporting text | `string` | `undefined` |
| `name` | `name` | Name attribute (for forms) | `string` | `undefined` |

---

## Events

### `rChange`

Emitted when the selected value changes.

```js
select.addEventListener('rChange', e => {
  console.log(e.detail);
});
```

---

## Theming

`r-select` is fully themeable using CSS variables.

### Token Layers

1. **Global tokens**  
   Defined in `theme.css` (colors, borders, focus)

2. **Select-specific tokens**  
   Defined in `r-select-theme.css`

3. **Component styles**  
   Defined in `r-select.css`

No colors or spacing values are hardcoded in the component styles.

---

## Accessibility Notes

- Uses native `<select>` semantics
- Keyboard navigation works out of the box
- Screen readers announce label, state, and value correctly
- Error state uses `aria-invalid`

---

## Design Philosophy

This component is intentionally **boring and correct**.

If you need:
- searchable selects
- async loading
- multi-select
- virtualized lists

those should live in a **separate component** (e.g. `r-select-advanced`), not here.

---

## License

MIT