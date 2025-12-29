

# r-input

A high-quality, accessible input web component built with **Stencil**, inspired by **Material UI** behavior but designed for a clean, scalable design system.

`r-input` focuses on excellent UX, predictable state handling, and full theme control via CSS variables.

---

## Features

- Floating label (Material-style)
- Controlled & uncontrolled value support
- Clearable input
- Disabled, readonly, required states
- Error state with helper text
- Keyboard accessible
- Fully themeable via CSS variables
- Shadow DOM safe
- Framework-agnostic

---

## Installation & Required Theme

`r-input` **requires the design system theme to be loaded once**.  
This is a deliberate and enforced contract.

### Consumer App Import

```ts
import 'design-system/theme.css'; // required
import 'design-system/r-input';
```

> ⚠️ If `theme.css` is not loaded, color and focus tokens will not resolve.

---

## Basic Usage

```html
<r-input label="Name"></r-input>

<r-input
  label="Email"
  type="email"
  helper-text="We never spam"
></r-input>

<r-input
  label="Password"
  type="password"
  clearable
></r-input>
```

---

## Props

| Prop | Type | Default | Description |
|-----|-----|--------|-------------|
| `value` | `string` | `''` | Input value (controlled or uncontrolled) |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'search'` | `text` | Input type |
| `label` | `string` | — | Floating label text |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disables the input |
| `readonly` | `boolean` | `false` | Makes input read-only |
| `required` | `boolean` | `false` | Marks input as required |
| `error` | `boolean` | `false` | Shows error state |
| `helperText` | `string` | — | Supporting / helper text |
| `name` | `string` | — | Native input name |
| `autocomplete` | `string` | — | Browser autocomplete |
| `autofocus` | `boolean` | `false` | Autofocus on mount |
| `maxlength` | `number` | — | Max length |
| `minlength` | `number` | — | Min length |
| `pattern` | `string` | — | Validation pattern |
| `clearable` | `boolean` | `false` | Shows clear button |

---

## Events

### `rInput`

Emitted on every value change.

```js
document
  .querySelector('r-input')
  .addEventListener('rInput', (e) => {
    console.log(e.detail); // current value
  });
```

### `rFocus`

Emitted when the input receives focus.

### `rBlur`

Emitted when the input loses focus.

### `rClear`

Emitted when the value is cleared via the clear button.

---

## Theming & Design Tokens

`r-input` is fully styled via CSS variables.

### Token Layers

1. **Global palette tokens**  
   `src/theme/theme.css`

2. **Input-specific tokens**  
   `src/components/r-input/r-input-theme.css`

3. **Component styles**  
   `src/components/r-input/r-input.css`

---

## Common Tokens

```css
r-input {
  --input-border-radius: 0.5rem;
  --input-focus-border-color: var(--color-primary);
  --input-error-color: var(--color-danger);
}
```

---

## Overriding Tokens

### Global override (recommended)

```css
:root {
  --color-primary: #4f46e5;
}
```

### Per-input override

```html
<r-input
  label="Rounded"
  style="--input-border-radius: 999px"
></r-input>
```

---

## Accessibility

- Uses native `<input>` element
- Supports keyboard navigation
- `aria-invalid` applied automatically
- Helper text linked via `aria-describedby`
- Focus-visible behavior respected

---

## Development Notes

- `theme.css` is **not injected** in `dist-custom-elements`
- Consumer apps **must import it explicitly**
- Inside the design-system repo, use:
  ```html
  <script type="module" src="/build/design-system.esm.js"></script>
  ```

---

## Known Limitations

- No prefix/suffix slots yet
- No password visibility toggle (planned)
- No size variants yet

---

## Roadmap

- Prefix / suffix slots
- Password visibility toggle
- Size variants (`sm`, `md`, `lg`)
- Character counter & validation helpers

---

## License

MIT