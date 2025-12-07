# Sub-Component Strategy

## 🎯 Design System Philosophy

This design system is an **abstraction layer** over Ionic. Our users should **ONLY** use `r-*` components, **NEVER** `ion-*` components directly.

**Why?**
- ✅ **Future-proof**: If we switch from Ionic to another framework, users' code won't break
- ✅ **Simplified API**: Users only learn our API, not Ionic's API
- ✅ **Consistent experience**: All components follow the same patterns
- ✅ **Design system control**: We control the entire component API

## 📋 Decision Framework

### When to Create Sub-Component Wrappers

**✅ CREATE wrappers if:**
1. The Ionic component has sub-components that users need
2. Users would use these sub-components to build complete UIs
3. The sub-components are part of the component's public API

**❌ DON'T CREATE wrappers if:**
1. The sub-components are internal implementation details
2. Users never interact with them directly
3. They're only used internally by the main component

## 📦 Examples

### ✅ Card Components (NEED ALL)

**Ionic has:**
- `ion-card`
- `ion-card-header`
- `ion-card-title`
- `ion-card-subtitle`
- `ion-card-content`
- `ion-card-footer`

**We need:**
- `r-card` ✅
- `r-card-header` ✅ **MUST CREATE**
- `r-card-title` ✅ **MUST CREATE**
- `r-card-subtitle` ✅ **MUST CREATE**
- `r-card-content` ✅ **MUST CREATE**
- `r-card-footer` ✅ **MUST CREATE**

**Why?** Users need all of these to build complete cards:
```html
<!-- Users should write this: -->
<r-card>
  <r-card-header>
    <r-card-title>Title</r-card-title>
    <r-card-subtitle>Subtitle</r-card-subtitle>
  </r-card-header>
  <r-card-content>Content</r-card-content>
  <r-card-footer>Footer</r-card-footer>
</r-card>

<!-- NOT this: -->
<r-card>
  <ion-card-header>  <!-- ❌ Users shouldn't use ion-* -->
    <ion-card-title>Title</ion-card-title>
  </ion-card-header>
</r-card>
```

### ✅ Header/Toolbar Pattern (ALREADY DONE)

**Ionic has:**
- `ion-header`
- `ion-toolbar`
- `ion-title`

**We have:**
- `r-header` ✅
- `r-toolbar` ✅
- `r-title` ✅

**Why?** Users need all three to build headers:
```html
<!-- Users write: -->
<r-header title="My App">
  <r-toolbar>
    <r-title>Title</r-title>
  </r-toolbar>
</r-header>
```

### ❌ Input Components (NO SUB-COMPONENTS NEEDED)

**Ionic has:**
- `ion-input` (no sub-components users interact with)

**We have:**
- `r-input` ✅

**Why?** `ion-input` doesn't have sub-components that users need. It's self-contained.

### ✅ Item Components (IF WE CREATE THEM)

**Ionic has:**
- `ion-item`
- `ion-item-sliding`
- `ion-item-options`
- `ion-item-option`

**If we create `r-item`, we need:**
- `r-item` ✅
- `r-item-sliding` ✅ **MUST CREATE**
- `r-item-options` ✅ **MUST CREATE**
- `r-item-option` ✅ **MUST CREATE**

**Why?** Users need these to build swipeable lists:
```html
<r-item-sliding>
  <r-item>Content</r-item>
  <r-item-options>
    <r-item-option>Delete</r-item-option>
  </r-item-options>
</r-item-sliding>
```

## 🔍 How to Identify Sub-Components

1. **Check Ionic Documentation**: Look at the component's page
2. **Check Usage Examples**: See what sub-components are used in examples
3. **Check Component API**: Look for components that are children of the main component
4. **Think from User's Perspective**: Would a user need this to build a complete UI?

## 📝 Implementation Pattern

### Simple Sub-Component (No Props)

```typescript
// r-card-header.tsx
import { Component, h } from '@stencil/core';
import '../../utils/ionic-init';

@Component({
  tag: 'r-card-header',
  styleUrl: 'r-card-header.css',
  shadow: false,
})
export class RCardHeader {
  render() {
    return (
      <ion-card-header>
        <slot></slot>
      </ion-card-header>
    );
  }
}
```

### Sub-Component with Props

```typescript
// r-card-title.tsx
import { Component, Prop, h } from '@stencil/core';
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor } from '../../utils';

@Component({
  tag: 'r-card-title',
  styleUrl: 'r-card-title.css',
  shadow: false,
})
export class RCardTitle {
  @Prop() color?: IonicColor;

  render() {
    const props = removeUndefinedProps({
      color: this.color,
    });

    return (
      <ion-card-title {...props}>
        <slot></slot>
      </ion-card-title>
    );
  }
}
```

## ✅ Checklist for Component Creation

When creating a component with sub-components:

- [ ] Identified all Ionic sub-components
- [ ] Created wrapper for main component
- [ ] Created wrappers for ALL sub-components users need
- [ ] Updated documentation to show `r-*` components only
- [ ] Updated examples to use `r-*` components only
- [ ] Added all components to `app-home.tsx`
- [ ] Verified users never need to use `ion-*` components directly

## 🎯 Current Status

### ✅ Complete (All Sub-Components Wrapped)
- `r-header` + `r-toolbar` + `r-title`
- `r-button` (no sub-components needed)
- `r-input` (no sub-components needed)
- `r-dropdown` (no sub-components needed)
- `r-datepicker` (no sub-components needed)
- `r-badge` (no sub-components needed)
- `r-buttons` (no sub-components needed)

### ⚠️ Incomplete (Missing Sub-Components)
- `r-card` → **MISSING**: `r-card-header`, `r-card-title`, `r-card-subtitle`, `r-card-content`, `r-card-footer`

## 🚀 Action Items

1. **Create card sub-components** (if we want complete abstraction)
2. **Document this strategy** in component creation guide
3. **Update examples** to never show `ion-*` components
4. **Review existing components** to ensure no `ion-*` usage in examples

---

**Remember:** The goal is complete abstraction. Users should be able to build entire UIs using only `r-*` components.

