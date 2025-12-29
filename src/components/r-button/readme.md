# r-button

A production-ready, accessible button web component built with **Stencil**, designed for a scalable, theme-driven design system.

`r-button` is framework-agnostic, fully themeable via CSS variables, and safe to use in Shadow DOM environments.

---

## Features

- Solid, outline, and ghost variants
- Text, icon-left, icon-right, and icon-only buttons
- Disabled, block (full-width), and loading states
- Clean active + focus handling (no sticky states)
- Keyboard accessible (`focus-visible`)
- Accessible icon-only buttons
- Emits custom click events
- Fully themeable via CSS variables
- No global styles leaking into components
- Shadow DOM safe

---

## Installation & Required Theme

`r-button` **requires the design system theme to be loaded once**.  
This is a deliberate contract.

### Consumer App Import

```ts
import 'design-system/theme.css'; // required
import 'design-system/r-button';
```

> ⚠️ If `theme.css` is not loaded, color and spacing tokens will not resolve.

---

## Basic Usage

```html
<r-button>Primary</r-button>

<r-button variant="outline">Outline</r-button>

<r-button variant="ghost">Ghost</r-button>

<r-button block>Full Width</r-button>

<r-button disabled>Disabled</r-button>

<r-button loading>Saving...</r-button>
```

---

## Icon Usage

### Left Icon

```html
<r-button>
  <span slot="icon-left">🔍</span>
  Search
</r-button>
```

### Right Icon

```html
<r-button>
  Next
  <span slot="icon-right">→</span>
</r-button>
```

### Icon-only Button

```html
<r-button
  icon-only
  aria-label="Close"
>
  <span slot="icon-left">✕</span>
</r-button>
```

> ⚠️ Consumers must provide a native `aria-label` attribute for icon-only buttons.

---

## Props

| Prop | Type | Default | Description |
|-----|-----|--------|-------------|
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `solid` | Visual style of the button |
| `block` | `boolean` | `false` | Makes the button full width |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows loading state and disables clicks |
| `iconOnly` | `boolean` | `false` | Renders an icon-only button |
| `type` | `'button' \| 'submit' \| 'reset'` | `button` | Native button type |

---

## Events

### `rClick`

Emitted when the button is clicked **and not disabled or loading**.

```js
document
  .querySelector('r-button')
  .addEventListener('rClick', (e) => {
    console.log(e.detail);
  });
```

---

## Theming & Design Tokens

### Token Layers

1. **Global palette tokens**  
   Defined in: `src/theme/theme.css`

2. **Button-specific tokens**  
   Defined in: `src/components/r-button/r-button-theme.css`

3. **Component styles**  
   Defined in: `src/components/r-button/r-button.css`

`r-button` reads all visual values from CSS variables.  
No hardcoded colors or spacing exist in component styles.

---

## Common Button Tokens

```css
r-button {
  --button-bg: var(--color-primary);
  --button-bg-hover: var(--color-primary-hover);
  --button-bg-active: var(--color-primary-active);

  --button-outline-bg: transparent;
  --button-outline-color: var(--color-primary);
  --button-outline-border-color: var(--color-primary);

  --button-icon-gap: 0.5rem;
  --button-icon-only-size: 2.5rem;

  --button-border-radius: 0.5rem;
}
```

---

## Overriding Tokens

### Global override (recommended)

```css
:root {
  --color-primary: #4f46e5;
  --color-primary-hover: #4338ca;
}
```

### Per-button override

```html
<r-button style="--button-border-radius: 2rem">
  Rounded Button
</r-button>
```

---

## Accessibility

- Uses native `<button>` element
- Supports keyboard navigation
- `focus-visible` styles applied
- Disabled and loading states block interaction
- Icon-only buttons require `aria-label`

---

## Development Notes

- `theme.css` is **not injected** in `dist-custom-elements` builds
- Consumer apps **must import it explicitly**
- Inside the design-system repo, use the Stencil dev loader:
  ```html
  <script type="module" src="/build/design-system.esm.js"></script>
  ```

---

## Known Limitations

- No ripple animation (by design)
- No size variants yet
- No button groups yet

---

## Roadmap

- Size system (`sm`, `md`, `lg`)
- Button groups
- Additional variants (`danger`, `success`)
- Tooltip support for icon-only buttons

---

## License

MIT
