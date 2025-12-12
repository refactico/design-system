# Component Creation Quick Reference

## 🚀 Quick Start

1. **Read:** `COMPONENT_CREATION_GUIDE.md` (full guide)
2. **Use:** `COMPONENT_TEMPLATE.tsx` (copy as starting point)
3. **Check:** `COMPONENT_CHECKLIST.md` (verify completion)

## ⚡ Essential Imports

```typescript
// Always include
import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import '../../utils/ionic-init';

// Standard components
import { removeUndefinedProps, IonicColor, FillStyle, IonicMode } from '../../utils';

// Form field components (add this too)
import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';
```

## ✅ Must-Do Checklist

- [ ] Use `removeUndefinedProps()` for all prop objects
- [ ] Use `IonicColor` type (not `string`) for colors
- [ ] Use `FillStyle` type (not `'outline' | 'solid'`) for fills
- [ ] Use `IonicMode` type (not `'ios' | 'md'`) for modes
- [ ] Use form field utilities if component has label/error/helper text
- [ ] Set `shadow: false` in component decorator
- [ ] Add to `app-home.tsx` menu and examples

## 📝 Component Decorator

```typescript
@Component({
  tag: 'r-your-component',
  styleUrl: 'r-your-component.css',
  shadow: false, // Always false
})
```

## 🔧 Prop Filtering Pattern

```typescript
// ❌ DON'T
const props: any = { color: this.color };
Object.keys(props).forEach(key => {
  if (props[key] === undefined) delete props[key];
});

// ✅ DO
const props = removeUndefinedProps({
  color: this.color,
  size: this.size,
});
```

## 🎨 Type Usage

```typescript
// ❌ DON'T
@Prop() color?: string;
@Prop() fill?: 'outline' | 'solid';
@Prop() mode?: 'ios' | 'md';

// ✅ DO
@Prop() color?: IonicColor;
@Prop() fill?: FillStyle;
@Prop() mode?: IonicMode;
```

## 📦 Form Field Pattern

```typescript
// For components with label/error/helper text
const fieldProps = removeUndefinedProps({
  ...buildFormFieldProps({
    placeholder: this.placeholder,
    disabled: this.disabled,
    required: this.required,
    name: this.name,
    color: this.color,
    fill: this.fill,
  }),
  value: this.value,
  onIonChange: this.handleChange,
});

return (
  <ion-item class={{ 'item-has-error': this.error }} lines={getItemLines(this.fill)}>
    {this.label && (
      <ion-label position={getLabelPosition(this.fill, 'stacked')}>
        {this.label}
      </ion-label>
    )}
    <ion-your-field {...fieldProps}>
      <slot></slot>
    </ion-your-field>
    {this.error && this.errorText && (
      <ion-note slot="error" color="danger">{this.errorText}</ion-note>
    )}
    {!this.error && this.helperText && (
      <ion-note slot="helper">{this.helperText}</ion-note>
    )}
  </ion-item>
);
```

## 🧪 Test Commands

```bash
# Build
npm run build

# Dev server
npm run start

# Storybook
npm run storybook

# Tests
npm test
```

## 📚 Reference Files

- **Full Guide:** `COMPONENT_CREATION_GUIDE.md`
- **Template:** `COMPONENT_TEMPLATE.tsx`
- **Checklist:** `COMPONENT_CHECKLIST.md`
- **Examples:** See existing components in `src/components/`

## 🎯 Decision Tree

```
New Component?
├─ Form Field? (has label/error/helper)
│   └─ YES → Use form field utilities
│       └─ buildFormFieldProps, getLabelPosition, getItemLines
│
└─ NO → Standard component
    └─ Use removeUndefinedProps + types
```

---

**Remember:** When in doubt, check existing components like `r-badge` (simple) or `r-dropdown` (form field) for examples!

