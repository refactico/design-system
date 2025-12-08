# Batch Component Creation Request Template

Copy and customize this template when requesting multiple components:

---

## Template 1: Simple Components (2-5 components)

```
Create these [NUMBER] components in batch:

1. r-component-name-1
   - Wrapper for ion-component-1
   - Props: [list key props]
   - Simple component

2. r-component-name-2
   - Wrapper for ion-component-2
   - Props: [list key props]
   - Simple component

[Add more as needed...]

All components should:
- Follow the component creation guidelines
- Use removeUndefinedProps
- Support IonicColor, IonicMode types
- Include full test coverage
- Be added to app-home.tsx with examples
- Update COMPONENT_CREATION_VERIFICATION.md
```

---

## Template 2: Related Sub-Components

```
Create these related components in batch (component family):

1. r-parent-component
   - Wrapper for ion-parent-component
   - Main component

2. r-parent-component-child-1
   - Wrapper for ion-parent-component-child-1
   - Sub-component

3. r-parent-component-child-2
   - Wrapper for ion-parent-component-child-2
   - Sub-component

[Add more sub-components as needed...]

All components should:
- Follow the component creation guidelines
- Use removeUndefinedProps
- Support IonicColor, IonicMode types
- Include full test coverage
- Be added to app-home.tsx with examples showing how they work together
- Update COMPONENT_CREATION_VERIFICATION.md
```

---

## Template 3: Form Field Components

```
Create these form field components in batch:

1. r-form-component-1
   - Wrapper for ion-form-component-1
   - Form field component (needs form field utilities)
   - Props: [list key props including label, error, helperText]

2. r-form-component-2
   - Wrapper for ion-form-component-2
   - Form field component (needs form field utilities)
   - Props: [list key props including label, error, helperText]

[Add more as needed...]

All components should:
- Follow the component creation guidelines
- Use removeUndefinedProps
- Use form field utilities (buildFormFieldProps, getLabelPosition, getItemLines)
- Support IonicColor, FillStyle, IonicMode types
- Support both standalone and formField modes
- Include full test coverage
- Be added to app-home.tsx with examples (standalone and form field modes)
- Update COMPONENT_CREATION_VERIFICATION.md
```

---

## Example: Real Request

```
Create these 4 simple components in batch:

1. r-badge
   - Wrapper for ion-badge
   - Props: color, mode
   - Simple component

2. r-chip
   - Wrapper for ion-chip
   - Props: color, outline, disabled, mode
   - Simple component

3. r-label
   - Wrapper for ion-label
   - Props: color, position, mode
   - Simple component

4. r-divider
   - Wrapper for ion-item-divider
   - Props: color, sticky, mode
   - Simple component

All components should:
- Follow the component creation guidelines
- Use removeUndefinedProps
- Support IonicColor, IonicMode types
- Include full test coverage (spec, e2e, stories)
- Be added to app-home.tsx with examples
- Update COMPONENT_CREATION_VERIFICATION.md with entries for all 4 components
```

---

## Tips

1. **Keep it to 2-5 components** - Don't request more than 5
2. **Group similar components** - Simple with simple, form with form
3. **List key props** - Helps AI understand requirements
4. **Be specific** - Mention if it's simple, form field, or complex
5. **Request verification** - Ask to update verification log

