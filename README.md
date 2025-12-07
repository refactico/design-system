# Refactico Design System

> A comprehensive, production-ready design system built with Stencil and Ionic for mobile and web applications.

[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Refactico Design System provides a collection of reusable, accessible, and customizable web components built with [Stencil](https://stenciljs.com) and [Ionic](https://ionicframework.com). These components work seamlessly across all modern frameworks (React, Angular, Vue) and vanilla JavaScript.

### Key Features

- 🎨 **Framework Agnostic**: Works with React, Angular, Vue, or no framework at all
- 📱 **Mobile First**: Built with Ionic for excellent mobile and native app support
- ♿ **Accessible**: WCAG compliant components out of the box
- 🎯 **Type Safe**: Full TypeScript support with comprehensive type definitions
- 🚀 **Tree Shakeable**: Import only what you need
- 🎨 **Customizable**: Easy theming with CSS custom properties
- 📦 **Lightweight**: Optimized bundle sizes
- 🔧 **Capacitor Ready**: Native features support (Bluetooth, Location, Camera, etc.)

## Installation

### NPM

```bash
npm install @refactico/design-system
```

### Yarn

```bash
yarn add @refactico/design-system
```

### PNPM

```bash
pnpm add @refactico/design-system
```

> **Note:** `@ionic/core` is automatically installed as a dependency - you don't need to install it separately!

## Quick Start

### Option 1: Lazy Loading (Recommended)

Import the loader script to enable lazy loading of components:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Theme CSS (includes Ionic CSS automatically) -->
  <link rel="stylesheet" href="https://unpkg.com/@refactico/design-system@latest/dist/theme.css">
</head>
<body>
  <!-- Load Refactico components (Ionic loads automatically) -->
  <script type="module" src="https://unpkg.com/@refactico/design-system@latest/dist/refactico/refactico.esm.js"></script>
  <script nomodule src="https://unpkg.com/@refactico/design-system@latest/dist/refactico/refactico.js"></script>
  
  <!-- Use components -->
  <r-button color="primary">Click Me</r-button>
  <r-input label="Email" type="email" placeholder="Enter your email"></r-input>
</body>
</html>
```

### Option 2: Standalone Components

Import individual components in your application:

```javascript
// In your app entry file
// Import theme CSS (includes Ionic CSS automatically)
import '@refactico/design-system/theme.css';

// Import components (Ionic loads automatically)
import '@refactico/design-system/r-button';
import '@refactico/design-system/r-input';
```

### Option 3: Framework Integration

#### React

```tsx
// Import theme CSS (includes Ionic CSS)
import '@refactico/design-system/theme.css';

// Import components (Ionic loads automatically)
import '@refactico/design-system/r-button';
import '@refactico/design-system/r-input';

function App() {
  return (
    <div>
      <r-button color="primary">React Button</r-button>
      <r-input label="Email" type="email" />
    </div>
  );
}
```

#### Angular

```typescript
// In your module or component
// Import theme CSS (includes Ionic CSS)
import '@refactico/design-system/theme.css';

// Import components (Ionic loads automatically)
import '@refactico/design-system/r-button';
import '@refactico/design-system/r-input';
```

```html
<!-- In your template -->
<r-button color="primary">Angular Button</r-button>
<r-input label="Email" type="email"></r-input>
```

#### Vue

<script setup>
// Import theme CSS (includes Ionic CSS)
import '@refactico/design-system/theme.css';

// Import components (Ionic loads automatically)
import '@refactico/design-system/r-button';
import '@refactico/design-system/r-input';
</script>

<template>
  <r-button color="primary">Vue Button</r-button>
  <r-input label="Email" type="email" />
</template>
```

## Components

### Available Components

- **r-button** - Button component with multiple variants, sizes, and styles
- **r-input** - Input field with password visibility toggle and validation support

> More components coming soon! Check our [Storybook](https://refactico.github.io/design-system) for the latest components.

### Component Examples

#### Button

```html
<!-- Basic button -->
<r-button>Click Me</r-button>

<!-- Primary button -->
<r-button color="primary">Primary</r-button>

<!-- Button with icon -->
<r-button icon="star" icon-position="start">With Icon</r-button>

<!-- Disabled button -->
<r-button disabled>Disabled</r-button>
```

#### Input

```html
<!-- Basic input -->
<r-input label="Name" placeholder="Enter your name"></r-input>

<!-- Email input -->
<r-input type="email" label="Email" placeholder="Enter your email"></r-input>

<!-- Password with toggle -->
<r-input type="password" label="Password" show-password-toggle></r-input>

<!-- Input with error -->
<r-input type="email" error error-text="Invalid email"></r-input>
```

## Theming

Refactico components use CSS custom properties for easy theming. You can override default styles:

```css
:root {
  --refactico-primary: #0066cc;
  --refactico-secondary: #6c757d;
  --refactico-success: #28a745;
  --refactico-danger: #dc3545;
}
```

## Development

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/refactico/design-system.git
cd design-system

# Install dependencies
npm install

# Start development server
npm start
```

### Build

```bash
# Build for production
npm run build

# Build Storybook
npm run build-storybook
```

### Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test.watch
```

### Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Chrome Android (latest)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Creating New Components

When creating new components, follow our guidelines to ensure consistency:

### 📚 Component Creation Resources

- **[Component Creation Guide](./COMPONENT_CREATION_GUIDE.md)** - Complete guide with templates and examples
- **[Component Template](./COMPONENT_TEMPLATE.tsx)** - Copy-paste template for new components
- **[Component Checklist](./COMPONENT_CHECKLIST.md)** - Verification checklist
- **[Quick Reference](./COMPONENT_QUICK_REFERENCE.md)** - Quick reference card

### ⚡ Quick Start

1. **Read the guide:** `COMPONENT_CREATION_GUIDE.md`
2. **Use the template:** Copy `COMPONENT_TEMPLATE.tsx` as starting point
3. **Follow the checklist:** Use `COMPONENT_CHECKLIST.md` to verify

### ✅ Essential Requirements

- ✅ Use `removeUndefinedProps()` for all prop objects
- ✅ Use type definitions (`IonicColor`, `FillStyle`, `IonicMode`) instead of strings
- ✅ Use form field utilities for components with label/error/helper text
- ✅ Follow CSS token patterns
- ✅ Add to `app-home.tsx` for testing

## Documentation

- [Component API Documentation](https://refactico.github.io/design-system)
- [Storybook](https://refactico.github.io/design-system/storybook)
- [Architecture Recommendations](./ARCHITECTURE_RECOMMENDATIONS.md)
- [Component Creation Guide](./COMPONENT_CREATION_GUIDE.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@refactico.com
- 🐛 Issues: [GitHub Issues](https://github.com/refactico/design-system/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/refactico/design-system/discussions)

## Acknowledgments

- Built with [Stencil](https://stenciljs.com)
- Powered by [Ionic](https://ionicframework.com)
- Component documentation with [Storybook](https://storybook.js.org)

---

Made with ❤️ by the Refactico team
