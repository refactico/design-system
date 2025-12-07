# Component Creation Checklist

Use this checklist every time you create a new component to ensure consistency and quality.

## 📋 Pre-Creation

- [ ] Checked if similar component exists
- [ ] Reviewed Ionic component documentation
- [ ] Identified required props and events
- [ ] Determined if it's a form field component

## 📁 File Creation

- [ ] Created `r-component-name.tsx`
- [ ] Created `r-component-name.css`
- [ ] Created `r-component-name.spec.ts`
- [ ] Created `r-component-name.e2e.ts`
- [ ] Created `r-component-name.stories.ts`
- [ ] Created `readme.md` (will be auto-generated)

## 💻 Implementation

### TypeScript Component

- [ ] Imported `ionic-init`
- [ ] Imported utilities from `'../../utils'`
- [ ] Used `IonicColor` type for color props (not `string`)
- [ ] Used `FillStyle` type for fill props (not `'outline' | 'solid'`)
- [ ] Used `IonicMode` type for mode props (not `'ios' | 'md'`)
- [ ] Used `removeUndefinedProps` for all prop objects
- [ ] Used form field utilities if it's a form field component
- [ ] Component decorator has `shadow: false`
- [ ] All event handlers use arrow functions
- [ ] Props are properly documented with JSDoc comments

### CSS Styling

- [ ] Uses design tokens (`--r-*` variables)
- [ ] Component tokens are private (`--r-internal-*`)
- [ ] Maps tokens to Ionic CSS variables
- [ ] Includes focus states
- [ ] Includes error states (if applicable)
- [ ] Follows spacing patterns from other components

### Tests

- [ ] Unit test checks basic rendering
- [ ] Unit test checks props are passed correctly
- [ ] Unit test checks events are emitted
- [ ] E2E test checks component hydration
- [ ] All tests pass

### Storybook

- [ ] Created basic story
- [ ] Created stories for different variants
- [ ] Added argTypes for all props
- [ ] Added component description
- [ ] Stories render correctly

## 🔗 Integration

- [ ] Added to `app-home.tsx` menu items
- [ ] Added examples to `app-home.tsx`
- [ ] Component displays correctly in app
- [ ] Component displays correctly in Storybook

## ✅ Final Verification

- [ ] `npm run build` succeeds
- [ ] `npm run start` works
- [ ] `npm run storybook` works
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] No console errors
- [ ] Component works in browser
- [ ] All props work as expected
- [ ] All events fire correctly
- [ ] Styles are applied correctly

## 📝 Documentation

- [ ] Component description is clear
- [ ] Props are documented
- [ ] Events are documented
- [ ] Usage examples are provided
- [ ] README is auto-generated correctly

## 🚀 Ready to Publish?

- [ ] All checklist items completed
- [ ] Code reviewed
- [ ] Tested thoroughly
- [ ] Ready for commit and publish

---

**Quick Copy-Paste Checklist:**

```
Pre-Creation: [ ] [ ] [ ] [ ]
File Creation: [ ] [ ] [ ] [ ] [ ] [ ]
Implementation: [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
CSS: [ ] [ ] [ ] [ ] [ ] [ ]
Tests: [ ] [ ] [ ] [ ] [ ]
Storybook: [ ] [ ] [ ] [ ] [ ]
Integration: [ ] [ ] [ ] [ ]
Final Verification: [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
Documentation: [ ] [ ] [ ] [ ] [ ]
Ready to Publish: [ ] [ ] [ ] [ ]
```

