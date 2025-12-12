# Generic Questionnaire Specification

## Overview

This document outlines a JSON-driven contract for building generic forms. It provides a comprehensive specification for creating data-driven, configurable forms that can be rendered dynamically based on a JSON schema.

## Top-Level Schema

```json
{
  "schemaVersion": "1.0.0",
  "uiMeta": { ... },
  "contexts": [ ... ],
  "sections": [ ... ]
}
```

## UI Metadata (uiMeta)

The `uiMeta` object contains metadata about the form:

- `title`: Form title
- `description`: Form description
- `version`: Schema version
- `theme`: Theme configuration
- `locale`: Default locale
- `rtl`: Right-to-left language support

## Contexts

Contexts define different views or states of the form:

- `id`: Unique context identifier
- `name`: Human-readable name
- `sections`: Array of section IDs to include
- `conditions`: Conditional logic for showing/hiding contexts

## Sections

Sections group related fields together:

- `id`: Unique section identifier
- `title`: Section title
- `description`: Section description
- `blocks`: Array of block IDs
- `order`: Display order
- `required`: Whether section is required
- `collapsible`: Whether section can be collapsed

## Blocks

Blocks are containers for fields:

- `id`: Unique block identifier
- `type`: Block type (e.g., "field-group", "layout", "conditional")
- `fields`: Array of field IDs
- `layout`: Layout configuration (columns, spacing)
- `conditions`: Conditional display logic

## Fields

Fields are the individual form inputs:

### Field Definition

```json
{
  "id": "field-id",
  "text": "User-facing question or prompt",
  "type": "dropdown | text | textarea | radio | date | heading | checkbox | number | multiselect | toggle | range | file | currency | hidden",
  "required": true,
  "options": ["Option 1","Option 2"],
  "placeholder": "Enter value",
  "helpText": "Helper text",
  "ariaLabel": "Screen-reader label",
  "ariaDescribedBy": "help-id error-id",
  "inputMode": "text|numeric|tel|email",
  "mask": "(___) ___-____",
  "defaultValue": "prefill",
  "readOnly": false,
  "disabled": false,
  "width": 6,
  "span": 6,
  "rows": 3,
  "min": 0, "max": 100, "step": 1,
  "accept": ".pdf,.png",
  "maxSize": 5000000,
  "multiple": false,
  "currency": { "code": "USD", "precision": 2 },
  "validation": { ... },
  "dependsOn": { "field": "other-field-id", "value": "Yes" },
  "dependsOnAny": [ { "field": "a", "value": "X" }, { "field": "b", "value": "Y" } ],
  "dependsOnAll": [ { "field": "c", "value": "Z" } ],
  "layout": { "columns": 1 },
  "security": { "sanitize": true, "encrypt": false, "maskInLogs": true, "rateLimit": 10, "auditLog": true }
}
```

### Field Types

- **dropdown**: Single selection dropdown
- **text**: Single-line text input
- **textarea**: Multi-line text input
- **radio**: Radio button group
- **date**: Date picker
- **heading**: Section heading (non-input)
- **checkbox**: Checkbox input
- **number**: Numeric input
- **multiselect**: Multiple selection dropdown
- **toggle**: Toggle switch
- **range**: Range slider
- **file**: File upload
- **currency**: Currency input
- **hidden**: Hidden field

### Validation

```json
{
  "validation": {
    "type": "name | dateOfBirth | email | phone",
    "pattern": "^[0-9]{5}$",
    "minLength": 2,
    "maxLength": 50,
    "minValue": 0,
    "maxValue": 100,
    "dateRange": { "min": "2020-01-01", "max": "2030-12-31" },
    "minSelected": 1,
    "maxSelected": 3,
    "asyncKey": "check-remote",
    "errorCode": "ERR_REQUIRED_NAME",
    "conditional": { "when": "Yes", "then": { "warningMessage": "check", "required": true } }
  }
}
```

### Dependencies

Fields can depend on other fields:

- **dependsOn**: Field is shown/enabled when another field has a specific value
- **dependsOnAny**: Field is shown/enabled when any of the conditions are met
- **dependsOnAll**: Field is shown/enabled when all conditions are met

### Security

```json
{
  "security": {
    "sanitize": true,
    "encrypt": false,
    "maskInLogs": true,
    "rateLimit": 10,
    "auditLog": true
  }
}
```

## Validation

### Client-Side Validation

- Pattern matching
- Length constraints
- Value ranges
- Required field checks
- Custom validation functions

### Server-Side Validation

- Async validation keys
- Remote validation endpoints
- Business rule validation
- Data integrity checks

## Accessibility (WCAG)

- **ariaLabel**: Screen reader labels
- **ariaDescribedBy**: References to help text and error messages
- **keyboardNavigation**: Full keyboard support
- **focusManagement**: Proper focus handling
- **colorContrast**: WCAG AA compliance

## Internationalization (i18n)

- **locale**: Language and region
- **rtl**: Right-to-left support
- **translations**: Field labels, help text, error messages
- **dateFormats**: Locale-specific date formats
- **numberFormats**: Locale-specific number formats

## Security

- **XSS Prevention**: Input sanitization
- **CSRF Protection**: Token-based protection
- **PII Handling**: Masking in logs
- **Encryption**: Sensitive data encryption
- **Rate Limiting**: Prevent abuse
- **Audit Logging**: Track changes

## Navigation

- **progressIndicator**: Show form progress
- **sectionNavigation**: Navigate between sections
- **saveDraft**: Save form state
- **autoSave**: Automatic saving
- **navigationRules**: Conditional navigation

## State Management

- **formState**: Current form values
- **validationState**: Validation errors
- **dirtyState**: Track changes
- **submissionState**: Submission status

## Analytics

- **fieldInteractions**: Track field interactions
- **completionRate**: Track form completion
- **errorTracking**: Track validation errors
- **timeTracking**: Track time spent

## Integration Patterns

- **API Integration**: Submit to backend
- **Webhook Support**: Trigger webhooks
- **Event System**: Custom events
- **Plugin System**: Extensible architecture

## Mobile Considerations

- **responsiveLayout**: Adaptive layouts
- **touchOptimization**: Touch-friendly inputs
- **offlineSupport**: Offline form filling
- **mobileValidation**: Mobile-specific validation

## Theming

- **themeVariables**: CSS custom properties
- **colorSchemes**: Light/dark modes
- **componentThemes**: Component-specific themes
- **branding**: Brand customization

## Implementation Notes

This specification is designed to be framework-agnostic and can be implemented in:
- React
- Angular
- Vue
- Vanilla JavaScript
- Any modern framework

The implementation should:
1. Parse the JSON schema
2. Render fields based on type
3. Handle validation
4. Manage form state
5. Handle dependencies
6. Support accessibility
7. Provide internationalization
8. Ensure security

## Future Enhancements

- Advanced conditional logic
- Multi-step wizards
- Form templates
- Visual form builder
- Real-time collaboration
- Version control for forms

