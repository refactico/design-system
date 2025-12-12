# Component Creation Checklist

Use this checklist every time you create a new component to ensure consistency and quality.

## 📋 Pre-Creation

- [ ] Checked if similar component exists
- [ ] **Reviewed Ionic component documentation THOROUGHLY** - Don't miss any props/features
- [ ] **Identified ALL useful props and events** - Not just basic ones, ALL that users might need
- [ ] **Identified ALL use cases** - How will 69+ apps use this? What scenarios?
- [ ] **Identified ALL edge cases** - Disabled, error, loading, empty states, validation, etc.
- [ ] **Researched real-world usage** - What features do similar components in other design systems have?
- [ ] Determined if it's a form field component
- [ ] **Listed ALL sub-components needed** - Don't create incomplete component families

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
- [ ] **Included ALL useful props** - Not just basic ones, ALL that users might need
- [ ] **Handled ALL edge cases** - Disabled, error, loading, empty, validation states
- [ ] **Included ALL events** - All events that users might need to listen to
- [ ] **Proper error handling** - Component handles errors gracefully
- [ ] **Accessibility support** - ARIA attributes, keyboard navigation, screen reader support

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
- [ ] **No console errors or warnings** - Zero tolerance for errors
- [ ] Component works in browser
- [ ] **ALL props work as expected** - Test every single prop
- [ ] **ALL events fire correctly** - Test every event
- [ ] Styles are applied correctly
- [ ] **Tested ALL edge cases:**
  - [ ] Disabled state works correctly
  - [ ] Error state works correctly
  - [ ] Loading state works correctly (if applicable)
  - [ ] Empty state works correctly (if applicable)
  - [ ] Validation works correctly (if applicable)
  - [ ] All color variants work
  - [ ] All size variants work
  - [ ] All fill/style variants work
- [ ] **Tested in different scenarios:**
  - [ ] Mobile viewport
  - [ ] Desktop viewport
  - [ ] Different screen sizes
  - [ ] Dark mode (if applicable)
  - [ ] Light mode
- [ ] **Accessibility verified:**
  - [ ] Keyboard navigation works
  - [ ] Screen reader compatible
  - [ ] ARIA attributes correct
  - [ ] Focus states visible
- [ ] **No bugs found** - Component is production-ready

## 📝 Documentation

- [ ] Component description is clear
- [ ] Props are documented
- [ ] Events are documented
- [ ] Usage examples are provided
- [ ] README is auto-generated correctly

## 🚀 Ready to Publish?

**CRITICAL:** This design system is used by 69+ apps and enterprise clients. Components MUST be production-ready.

- [ ] All checklist items completed
- [ ] **ALL use cases covered** - Component handles all scenarios users might need
- [ ] **ALL edge cases handled** - No missing states or error handling
- [ ] **Comprehensive testing done** - Tested all props, events, states, scenarios
- [ ] **No bugs or issues** - Zero tolerance - component must work perfectly
- [ ] **No missing features** - All useful features included upfront
- [ ] Code reviewed
- [ ] **Production-ready** - Safe for 69+ apps and enterprise clients to use
- [ ] Ready for commit and publish

**Remember:** Enhancements are welcome, but bugs and missing features are NOT acceptable. Users consume our design system directly - they shouldn't have to come back asking for features or reporting bugs.

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

