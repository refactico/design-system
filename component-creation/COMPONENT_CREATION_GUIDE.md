# Component Creation Guide

This guide ensures all new components follow the design system's patterns and use shared utilities for consistency and maintainability.

## 📋 Pre-Creation Checklist

**CRITICAL:** This design system is used by 69+ apps and enterprise clients. Components MUST be production-ready from day one.

Before creating a new component, check:

- [ ] Does a similar component already exist?
- [ ] Is this a wrapper around an Ionic component?
- [ ] **What props/events does the Ionic component support? (Research THOROUGHLY - don't miss any)**
- [ ] **What are ALL the use cases? (How will 69+ apps use this?)**
- [ ] **What are ALL the edge cases? (Disabled, error, loading, empty, validation states)**
- [ ] **What features do similar components in other design systems have?**
- [ ] **What props will users actually need? (Not just basic ones - ALL useful props)**
- [ ] Do we need form field utilities (for inputs, dropdowns, etc.)?
- [ ] What types will be needed?
- [ ] **What sub-components are needed? (Complete component families)**
- [ ] **What accessibility features are needed?**

## 🚀 Component Creation Steps

### Step 1: Generate Component Skeleton

```bash
cd design-system
npm run generate -- component r-your-component-name
```

**Note:** The generator may fail if the name doesn't have a dash. If it fails, create files manually following the structure below.

### Step 2: Component File Structure

Every component must have these files:

```
src/components/r-your-component/
├── r-your-component.tsx       # Component implementation
├── r-your-component.css      # Component styles
├── r-your-component.spec.ts  # Unit tests
├── r-your-component.e2e.ts   # E2E tests
├── r-your-component.stories.ts # Storybook stories
└── readme.md                  # Documentation (auto-generated)
```

## 📝 Component Template

### TypeScript Component Template

```typescript
import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle, IonicMode } from '../../utils';
// Import form field utilities if needed:
// import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-your-component',
  styleUrl: 'r-your-component.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RYourComponent {
  /**
   * Component prop description
   */
  @Prop() color?: IonicColor; // Use IonicColor type for colors
  @Prop() fill?: FillStyle;   // Use FillStyle type for fill styles
  @Prop() mode?: IonicMode;    // Use IonicMode type for modes
  // Add other props...

  /**
   * Emitted when event occurs
   */
  @Event() rEventName: EventEmitter<CustomEvent>;

  private handleEvent = (event: CustomEvent) => {
    this.rEventName.emit(event);
  };

  render() {
    // ALWAYS use removeUndefinedProps for props passed to Ionic components
    const componentProps = removeUndefinedProps({
      color: this.color,
      fill: this.fill,
      mode: this.mode,
      // Add other props...
      onIonEvent: this.handleEvent, // Ionic event handlers
    });

    return (
      <ion-your-component {...componentProps}>
        <slot></slot>
      </ion-your-component>
    );
  }
}
```

## 🎯 Required Utilities Usage

### 1. **ALWAYS Use `removeUndefinedProps`**

❌ **DON'T DO THIS:**
```typescript
const props: any = { color: this.color, size: this.size };
Object.keys(props).forEach(key => {
  if (props[key] === undefined) {
    delete props[key];
  }
});
```

✅ **DO THIS:**
```typescript
import { removeUndefinedProps } from '../../utils';

const props = removeUndefinedProps({
  color: this.color,
  size: this.size,
});
```

### 2. **ALWAYS Use Type Definitions**

❌ **DON'T DO THIS:**
```typescript
@Prop() color?: string;
@Prop() fill?: 'outline' | 'solid';
@Prop() mode?: 'ios' | 'md';
```

✅ **DO THIS:**
```typescript
import { IonicColor, FillStyle, IonicMode } from '../../utils';

@Prop() color?: IonicColor;
@Prop() fill?: FillStyle;
@Prop() mode?: IonicMode;
```

### 3. **For Form Field Components**

If your component is a form field (input, dropdown, datepicker, etc.), use form field utilities:

```typescript
import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';

render() {
  const fieldProps = removeUndefinedProps({
    ...buildFormFieldProps({
      placeholder: this.placeholder,
      disabled: this.disabled,
      required: this.required,
      name: this.name,
      color: this.color,
      fill: this.fill,
      shape: this.shape,
    }),
    // Component-specific props
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
        <ion-note slot="error" color="danger">
          {this.errorText}
        </ion-note>
      )}
      {!this.error && this.helperText && (
        <ion-note slot="helper">
          {this.helperText}
        </ion-note>
      )}
    </ion-item>
  );
}
```

## 📐 CSS Template

### Standard Component CSS

```css
:host {
  display: block;
  width: 100%;

  /* Component tokens (PRIVATE - do not override directly) */
  /* These reference semantic tokens (--r-*) which CAN be customized */
  --r-internal-component-padding-x: var(--r-spacing-4);
  --r-internal-component-padding-y: var(--r-spacing-3);
  --r-internal-component-border-radius: var(--r-border-radius-base);
  --r-internal-component-font-size: var(--r-typography-font-size-base);
  --r-internal-component-border-color: var(--r-border-color);
  --r-internal-component-border-focus: var(--r-color-primary);
}

/* Map component tokens to Ionic component variables */
r-your-component ion-your-component {
  --padding-start: var(--r-internal-component-padding-x);
  --padding-end: var(--r-internal-component-padding-x);
  --padding-top: var(--r-internal-component-padding-y);
  --padding-bottom: var(--r-internal-component-padding-y);
  --background: transparent;
  --ion-item-background: transparent;
  background: transparent;
}
```

### Form Field Component CSS

For form fields, use this pattern:

```css
:host {
  display: block;
  width: 100%;

  /* Component tokens (PRIVATE - do not override directly) */
  --r-internal-field-padding-x: var(--r-spacing-4);
  --r-internal-field-padding-y: var(--r-spacing-3);
  --r-internal-field-border-radius: var(--r-border-radius-base);
  --r-internal-field-font-size: var(--r-typography-font-size-base);
  --r-internal-field-border-color: var(--r-border-color);
  --r-internal-field-border-focus: var(--r-color-primary);
}

/* Map component tokens to Ionic item variables */
r-your-field ion-item {
  --padding-start: var(--r-internal-field-padding-x);
  --padding-end: var(--r-internal-field-padding-x);
  --padding-top: var(--r-internal-field-padding-y);
  --padding-bottom: var(--r-internal-field-padding-y);
  --background: transparent;
  --ion-item-background: transparent;
  background: transparent;
}

r-your-field ion-label {
  margin-bottom: var(--r-spacing-2, 8px);
}

r-your-field ion-your-field {
  font-size: var(--r-internal-field-font-size);
  margin-top: var(--r-spacing-2, 8px);
}

/* Focus state */
r-your-field ion-item.item-has-focus {
  --border-color: var(--r-internal-field-border-focus);
}

/* Error state */
r-your-field ion-item.item-has-error {
  --border-color: var(--r-color-danger);
}
```

## 🧪 Test Templates

### Unit Test Template

```typescript
import { newSpecPage } from '@stencil/core/testing';
import { RYourComponent } from './r-your-component';

describe('r-your-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RYourComponent],
      html: `<r-your-component></r-your-component>`,
    });
    expect(page.root).toEqualHtml(`
      <r-your-component>
        <ion-your-component></ion-your-component>
      </r-your-component>
    `);
  });

  it('renders with props', async () => {
    const page = await newSpecPage({
      components: [RYourComponent],
      html: `<r-your-component color="primary"></r-your-component>`,
    });
    const component = page.root?.querySelector('ion-your-component');
    expect(component?.getAttribute('color')).toBe('primary');
  });
});
```

### E2E Test Template

```typescript
import { newE2EPage } from '@stencil/core/testing';

describe('r-your-component e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-your-component>Content</r-your-component>');

    const element = await page.find('r-your-component');
    expect(element).toHaveClass('hydrated');
  });
});
```

## 📚 Storybook Stories Template

```typescript
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RYourComponent } from './r-your-component';

const meta: Meta = {
  title: 'Components/r-your-component',
  component: RYourComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The component color (Ionic color)',
    },
    // Add other argTypes...
  },
  parameters: {
    docs: {
      description: {
        component: 'Your component description here.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RYourComponent>;

export const Basic: Story = {
  render: (props) => h('r-your-component', props, 'Content'),
  args: {},
};

export const WithColor: Story = {
  render: (props) => h('r-your-component', props, 'Content'),
  args: {
    color: 'primary',
  },
};
```

## ✅ Component Checklist

Before considering a component complete, ensure:

- [ ] ✅ Uses `removeUndefinedProps` for all prop objects
- [ ] ✅ Uses type definitions (`IonicColor`, `FillStyle`, etc.) instead of strings
- [ ] ✅ Uses form field utilities if it's a form field component
- [ ] ✅ Follows CSS token pattern (uses `--r-*` tokens)
- [ ] ✅ Has unit tests (`.spec.ts`)
- [ ] ✅ Has E2E tests (`.e2e.ts`)
- [ ] ✅ Has Storybook stories (`.stories.ts`)
- [ ] ✅ Component compiles without errors
- [ ] ✅ All tests pass
- [ ] ✅ Added to `app-home.tsx` menu and examples
- [ ] ✅ Documentation is clear

## 🔍 Component Type Decision Tree

```
Is it a form field?
├─ YES → Use form field utilities
│   ├─ Has label/placeholder? → Use buildFormFieldProps
│   ├─ Has error/helper text? → Use standard error/helper pattern
│   └─ Wraps ion-item? → Use getItemLines, getLabelPosition
│
└─ NO → Use standard component pattern
    ├─ Has color prop? → Use IonicColor type
    ├─ Has fill prop? → Use FillStyle type
    ├─ Has mode prop? → Use IonicMode type
    └─ Always use removeUndefinedProps
```

## 📖 Examples

### Example 1: Simple Component (r-badge)

```typescript
import { Component, Prop, h } from '@stencil/core';
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, IonicMode } from '../../utils';

@Component({
  tag: 'r-badge',
  styleUrl: 'r-badge.css',
  shadow: false,
})
export class RBadge {
  @Prop() color?: IonicColor;
  @Prop() mode?: IonicMode;

  render() {
    const badgeProps = removeUndefinedProps({
      color: this.color,
      mode: this.mode,
    });

    return (
      <ion-badge {...badgeProps}>
        <slot></slot>
      </ion-badge>
    );
  }
}
```

### Example 2: Form Field Component (r-dropdown)

```typescript
import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle } from '../../utils';
import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-dropdown',
  styleUrl: 'r-dropdown.css',
  shadow: false,
})
export class RDropdown {
  @Prop({ mutable: true }) value?: string | number;
  @Prop() label?: string;
  @Prop() placeholder?: string;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() name?: string;
  @Prop() color?: IonicColor;
  @Prop() fill?: FillStyle;
  @Prop() error: boolean = false;
  @Prop() errorText?: string;
  @Prop() helperText?: string;

  @Event() rChange: EventEmitter<CustomEvent>;
  @Event() rFocus: EventEmitter<CustomEvent>;
  @Event() rBlur: EventEmitter<CustomEvent>;

  private handleChange = (event: CustomEvent) => {
    this.value = event.detail.value as string | number;
    this.rChange.emit(event);
  };

  private handleFocus = (event: CustomEvent) => {
    this.rFocus.emit(event);
  };

  private handleBlur = (event: CustomEvent) => {
    this.rBlur.emit(event);
  };

  render() {
    const selectProps = removeUndefinedProps({
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
      onIonFocus: this.handleFocus,
      onIonBlur: this.handleBlur,
    });

    return (
      <ion-item class={{ 'item-has-error': this.error }} lines={getItemLines(this.fill)}>
        {this.label && (
          <ion-label position={getLabelPosition(this.fill, 'floating')}>
            {this.label}
          </ion-label>
        )}
        <ion-select {...selectProps}>
          <slot></slot>
        </ion-select>
        {this.error && this.errorText && (
          <ion-note slot="error" color="danger">
            {this.errorText}
          </ion-note>
        )}
        {!this.error && this.helperText && (
          <ion-note slot="helper">
            {this.helperText}
          </ion-note>
        )}
      </ion-item>
    );
  }
}
```

## 🚫 Common Mistakes to Avoid

1. **❌ Not using `removeUndefinedProps`**
   - Always use it for props passed to Ionic components

2. **❌ Using string types instead of type definitions**
   - Use `IonicColor` not `string` for colors
   - Use `FillStyle` not `'outline' | 'solid'` for fills

3. **❌ Duplicating prop filtering code**
   - Never write `Object.keys(props).forEach(...)` manually

4. **❌ Not using form field utilities for form components**
   - If it has label/error/helper text, use form field utilities

5. **❌ Forgetting to import utilities**
   - Always import from `'../../utils'` or `'../../utils/form-field-props'`

## 📝 Integration Steps

After creating a component:

1. **Add to `app-home.tsx`:**
   ```typescript
   // Add to menuItems array
   { id: 'r-your-component', name: 'Your Component', description: 'Component description' }
   
   // Add examples in render method
   {this.selectedComponent === 'r-your-component' && (
     <div class="preview-examples">
       <h2>Examples</h2>
       {/* Add examples */}
     </div>
   )}
   ```

2. **Test the component:**
   ```bash
   npm run build
   npm run start  # Test in browser
   npm run storybook  # Test in Storybook
   ```

3. **Verify:**
   - Component renders correctly
   - All props work
   - Events fire correctly
   - Styles are applied
   - No console errors

## 🎯 Quick Reference

### Import Statements

```typescript
// Always include these
import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import '../../utils/ionic-init';

// For standard components
import { removeUndefinedProps, IonicColor, FillStyle, IonicMode } from '../../utils';

// For form field components
import { removeUndefinedProps, IonicColor, FillStyle } from '../../utils';
import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';
```

### Component Decorator

```typescript
@Component({
  tag: 'r-your-component',
  styleUrl: 'r-your-component.css',
  shadow: false, // Always false for Ionic components
})
```

### Prop Filtering Pattern

```typescript
const props = removeUndefinedProps({
  // All props here
});
```

---

## 📞 Need Help?

When creating a new component, refer to:
- Existing components in `src/components/` for examples
- This guide for patterns and utilities
- Ionic documentation for component-specific props/events

**Remember:** Consistency is key! Always use the utilities and follow the patterns established in existing components.

