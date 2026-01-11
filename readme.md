# Refactico Design System

A comprehensive web component library built with [Stencil](https://stenciljs.com), providing accessible, customizable UI components for modern web applications.

**[View Component Documentation (Storybook)](https://refactico.github.io/design-system/)**

## Features

- Themeable with CSS custom properties
- Accessibility-first design (WCAG compliant)
- Tree-shakeable (individual component imports)
- Framework-agnostic (works with React, Vue, Angular, or vanilla JS)
- Dark mode support

## Installation

```bash
pnpm add @refactico/design-system
```

## Usage

### Load All Components (Not Tree-Shakeable)

Use this when you need most components or don't care about bundle size:

```tsx
import { defineCustomElements } from '@refactico/design-system/loader';
import '@refactico/design-system/theme.css';

defineCustomElements();
```

### Load Single Component (Tree-Shakeable)

Import only what you need. Each component auto-registers when imported:

```tsx
// Only r-button is bundled
import '@refactico/design-system/dist/components/r-button.js';
import '@refactico/design-system/theme.css';
```

```tsx
// Multiple specific components
import '@refactico/design-system/dist/components/r-button.js';
import '@refactico/design-system/dist/components/r-input.js';
import '@refactico/design-system/dist/components/r-select.js';
import '@refactico/design-system/theme.css';
```

This works with all modern bundlers (Vite, Webpack, Rollup, esbuild) - unused components are excluded from the final bundle.

### Script Tag (CDN)

```html
<script type="module" src="https://unpkg.com/@refactico/design-system"></script>
<link rel="stylesheet" href="https://unpkg.com/@refactico/design-system/dist/refactico-ds/theme/theme.css" />

<r-button variant="primary">Click me</r-button>
```

## Framework Integration

### React

```tsx
// main.tsx - Tree-shakeable: import only what you use
import '@refactico/design-system/dist/components/r-button.js';
import '@refactico/design-system/dist/components/r-input.js';
import '@refactico/design-system/dist/components/r-alert.js';
import '@refactico/design-system/theme.css';

// Or load all (not tree-shakeable):
// import { defineCustomElements } from '@refactico/design-system/loader';
// defineCustomElements();

function App() {
  const handleClick = () => console.log('clicked');
  
  return (
    <div>
      <r-button variant="primary" onClick={handleClick}>
        Submit
      </r-button>
      <r-input placeholder="Enter your name" />
      <r-alert type="success" alert-title="Success">
        Operation completed successfully.
      </r-alert>
    </div>
  );
}
```

For TypeScript support, add type declarations:

```tsx
// global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'r-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      variant?: 'primary' | 'secondary' | 'text' | 'outline';
      size?: 'small' | 'medium' | 'large';
      disabled?: boolean;
    }, HTMLElement>;
    'r-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      value?: string;
      placeholder?: string;
      type?: string;
      disabled?: boolean;
    }, HTMLElement>;
    // Add other components as needed
  }
}
```

### Angular

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Tree-shakeable: import only what you use
import '@refactico/design-system/dist/components/r-button.js';
import '@refactico/design-system/dist/components/r-input.js';
import '@refactico/design-system/dist/components/r-select.js';

// Or load all (not tree-shakeable):
// import { defineCustomElements } from '@refactico/design-system/loader';
// defineCustomElements();

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```css
/* styles.css */
@import '@refactico/design-system/theme.css';
```

```html
<!-- app.component.html -->
<r-button variant="primary" (click)="handleClick()">
  Submit
</r-button>

<r-input [placeholder]="'Enter your name'" (rInput)="onInput($event)"></r-input>

<r-select [options]="options" (rChange)="onSelect($event)"></r-select>
```

### Vue 3

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

// Tree-shakeable: import only what you use
import '@refactico/design-system/dist/components/r-button.js';
import '@refactico/design-system/dist/components/r-input.js';
import '@refactico/design-system/dist/components/r-dialog.js';
import '@refactico/design-system/theme.css';

// Or load all (not tree-shakeable):
// import { defineCustomElements } from '@refactico/design-system/loader';
// defineCustomElements();

const app = createApp(App);

// Tell Vue to ignore custom elements with 'r-' prefix
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('r-');

app.mount('#app');
```

```vue
<!-- App.vue -->
<template>
  <div>
    <r-button variant="primary" @click="handleClick">
      Submit
    </r-button>
    
    <r-input 
      :placeholder="'Enter your name'" 
      @rInput="onInput"
    />
    
    <r-dialog :visible="showDialog" @rClose="showDialog = false">
      <span slot="title">Confirm Action</span>
      <p>Are you sure you want to proceed?</p>
      <span slot="footer">
        <r-button @click="showDialog = false">Cancel</r-button>
        <r-button variant="primary" @click="confirm">Confirm</r-button>
      </span>
    </r-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showDialog = ref(false);

const handleClick = () => {
  showDialog.value = true;
};

const onInput = (event: CustomEvent) => {
  console.log(event.detail);
};

const confirm = () => {
  console.log('Confirmed');
  showDialog.value = false;
};
</script>
```

### Vue 2

```javascript
// main.js
import Vue from 'vue';
import App from './App.vue';

// Tree-shakeable: import only what you use
import '@refactico/design-system/dist/components/r-button.js';
import '@refactico/design-system/dist/components/r-input.js';
import '@refactico/design-system/theme.css';

// Or load all (not tree-shakeable):
// import { defineCustomElements } from '@refactico/design-system/loader';
// defineCustomElements();

Vue.config.ignoredElements = [/^r-/];

new Vue({
  render: h => h(App)
}).$mount('#app');
```

## Available Components

| Component | Description |
|-----------|-------------|
| `r-alert` | Notification messages |
| `r-avatar` | User avatars with fallback |
| `r-avatar-group` | Grouped avatar display |
| `r-badge` | Status indicators |
| `r-breadcrumb` | Navigation breadcrumbs |
| `r-button` | Buttons with variants |
| `r-card` | Content containers |
| `r-checkbox` | Checkbox inputs |
| `r-collapse` | Collapsible panels |
| `r-dialog` | Modal dialogs |
| `r-divider` | Content separators |
| `r-dropdown` | Dropdown menus |
| `r-form` | Form validation |
| `r-icon` | Icon display |
| `r-input` | Text inputs |
| `r-link` | Styled links |
| `r-pagination` | Page navigation |
| `r-progress` | Progress indicators |
| `r-radio` | Radio inputs |
| `r-select` | Select dropdowns |
| `r-skeleton` | Loading placeholders |
| `r-switch` | Toggle switches |
| `r-table` | Data tables |
| `r-tabs` | Tabbed interfaces |
| `r-tag` | Labels and tags |
| `r-textarea` | Multi-line inputs |
| `r-tooltip` | Hover tooltips |

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm start

# Run tests
pnpm test

# Build for production
pnpm run build

# Run Storybook locally
pnpm run storybook

# Build Storybook
pnpm run build-storybook
```

## Theming

Customize the design system using CSS custom properties:

```css
:root {
  --r-color-primary: #3b82f6;
  --r-color-success: #22c55e;
  --r-color-warning: #f59e0b;
  --r-color-error: #ef4444;
  --r-border-radius: 0.375rem;
}
```

## License

MIT
