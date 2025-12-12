# Generic Questionnaire Component Design

## Overview

This document outlines all components needed for the generic questionnaire system, categorizing them by:
1. **Existing Components** - Can be used as-is
2. **Missing Base Components** - Need to be created first (design system components)
3. **Questionnaire-Specific Components** - New components for the questionnaire system

---

## ✅ Existing Components (Can Use As-Is)

These components already exist and can be used directly:

### Form Input Components
1. ✅ **r-input** - For `text` and `number` field types
   - Supports: text, email, tel, password, number
   - Has: label, error, helper text, validation
   - Props: `type`, `value`, `label`, `error`, `errorText`, `helperText`, `required`, `disabled`, `placeholder`, `maxlength`, `minlength`, `pattern`

2. ✅ **r-dropdown** - For `dropdown` and `multiselect` field types
   - Supports: single selection and multiple selection
   - Has: label, error, helper text, validation
   - Props: `value`, `label`, `error`, `errorText`, `helperText`, `required`, `disabled`, `multiple`

3. ✅ **r-radio-group** - For `radio` field type
   - Supports: single selection from options
   - Has: label, error, helper text, validation
   - Props: `value`, `label`, `options`, `error`, `errorText`, `helperText`, `required`, `disabled`

4. ✅ **r-checkbox** - For `checkbox` field type
   - Supports: single checkbox or checkbox group
   - Has: label, error, helper text, validation
   - Props: `checked`, `value`, `label`, `error`, `errorText`, `helperText`, `required`, `disabled`

5. ✅ **r-datepicker** - For `date` field type
   - Supports: date, time, datetime, month, year
   - Has: label, error, helper text, validation
   - Props: `value`, `label`, `presentation`, `min`, `max`, `error`, `errorText`, `helperText`, `required`, `disabled`

6. ✅ **r-toggle** - For `toggle` field type
   - Supports: toggle switch
   - Has: label, error, helper text, validation
   - Props: `checked`, `label`, `error`, `errorText`, `helperText`, `required`, `disabled`

### Layout Components
7. ✅ **r-card** - Can be used for section containers
8. ✅ **r-header**, **r-toolbar**, **r-title** - For form headers
9. ✅ **r-button** - For form submission buttons
10. ✅ **r-buttons** - For button groups

---

## ⚠️ Missing Base Components (Need to Create)

These are design system components that need to be created before the questionnaire system:

### Priority 1: Essential Form Components

#### 1. **r-textarea** - Text Area Component
- **Ionic Component**: `ion-textarea`
- **Purpose**: Multi-line text input for `textarea` field type
- **Props Needed**:
  - `value` (string)
  - `label` (string)
  - `placeholder` (string)
  - `rows` (number) - Number of visible rows
  - `maxlength` (number)
  - `minlength` (number)
  - `readonly` (boolean)
  - `disabled` (boolean)
  - `required` (boolean)
  - `error` (boolean)
  - `errorText` (string)
  - `helperText` (string)
  - `autoGrow` (boolean) - Auto-expand as user types
  - `color` (IonicColor)
  - `fill` (FillStyle)
- **Events**: `rInput`, `rFocus`, `rBlur`, `rChange`
- **Complexity**: Low (similar to r-input)
- **Dependencies**: Form field utilities

#### 2. **r-range** - Range Slider Component
- **Ionic Component**: `ion-range`
- **Purpose**: Range slider for `range` field type
- **Props Needed**:
  - `value` (number)
  - `min` (number)
  - `max` (number)
  - `step` (number)
  - `label` (string)
  - `dualKnobs` (boolean) - Two handles for range selection
  - `pin` (boolean) - Show value pin
  - `snaps` (boolean) - Snap to steps
  - `ticks` (boolean) - Show tick marks
  - `disabled` (boolean)
  - `error` (boolean)
  - `errorText` (string)
  - `helperText` (string)
  - `color` (IonicColor)
- **Events**: `rChange`, `rFocus`, `rBlur`
- **Complexity**: Medium
- **Dependencies**: Form field utilities

#### 3. **r-file-upload** - File Upload Component
- **Ionic Component**: `ion-input` (type="file") + custom UI
- **Purpose**: File upload for `file` field type
- **Props Needed**:
  - `accept` (string) - File types (e.g., ".pdf,.png")
  - `multiple` (boolean)
  - `maxSize` (number) - Max file size in bytes
  - `label` (string)
  - `disabled` (boolean)
  - `required` (boolean)
  - `error` (boolean)
  - `errorText` (string)
  - `helperText` (string)
  - `color` (IonicColor)
- **Events**: `rFileSelected` - Emits FileList
- **Complexity**: Medium-High (needs file preview, drag-drop, progress)
- **Dependencies**: Form field utilities, file handling utilities

#### 4. **r-currency-input** - Currency Input Component
- **Ionic Component**: `ion-input` (type="number") + formatting
- **Purpose**: Currency input for `currency` field type
- **Props Needed**:
  - `value` (number)
  - `currencyCode` (string) - ISO currency code (e.g., "USD")
  - `precision` (number) - Decimal places (default: 2)
  - `label` (string)
  - `placeholder` (string)
  - `disabled` (boolean)
  - `readonly` (boolean)
  - `required` (boolean)
  - `min` (number)
  - `max` (number)
  - `error` (boolean)
  - `errorText` (string)
  - `helperText` (string)
  - `color` (IonicColor)
  - `fill` (FillStyle)
- **Events**: `rInput`, `rChange`, `rFocus`, `rBlur`
- **Complexity**: Medium (needs currency formatting, locale support)
- **Dependencies**: Form field utilities, currency formatting utilities

#### 5. **r-heading** - Heading Component (Non-Input)
- **Ionic Component**: `ion-label` or custom
- **Purpose**: Display heading for `heading` field type
- **Props Needed**:
  - `text` (string) - Heading text
  - `level` (number) - Heading level (1-6, default: 2)
  - `color` (IonicColor)
- **Events**: None (display only)
- **Complexity**: Low
- **Dependencies**: None

---

## 🆕 Questionnaire-Specific Components (New Components)

These are new components specifically for the generic questionnaire system:

### Core Components

#### 1. **r-form-renderer** - Main Form Renderer
- **Purpose**: Main component that renders forms from JSON schema
- **Props**:
  - `schema` (object) - The JSON schema object
  - `context` (string) - Active context ID
  - `locale` (string) - Locale for i18n
  - `rtl` (boolean) - Right-to-left support
  - `theme` (string) - Theme name
  - `onSubmit` (function) - Submit handler
  - `onChange` (function) - Form change handler
  - `onValidation` (function) - Validation handler
- **State Management**:
  - Form values (all field values)
  - Validation state (errors per field)
  - Dirty state (track changes)
  - Submission state (submitting, success, error)
- **Features**:
  - Parse JSON schema
  - Render sections, blocks, and fields
  - Handle field dependencies
  - Manage form state
  - Handle validation
  - Support accessibility
  - Support i18n
- **Events**: `rFormSubmit`, `rFormChange`, `rFormValidation`, `rFormError`
- **Complexity**: High
- **Dependencies**: All field components, validation system, dependency resolver

#### 2. **r-form-section** - Section Container
- **Purpose**: Renders a form section with collapsible support
- **Props**:
  - `sectionId` (string) - Section ID from schema
  - `title` (string) - Section title
  - `description` (string) - Section description
  - `collapsible` (boolean) - Can be collapsed
  - `collapsed` (boolean) - Initial collapsed state
  - `required` (boolean) - Section is required
  - `order` (number) - Display order
- **Slots**: Default slot for blocks/fields
- **Events**: `rSectionToggle`
- **Complexity**: Low-Medium
- **Dependencies**: Layout components

#### 3. **r-form-block** - Block Container
- **Purpose**: Renders a block container with layout support
- **Props**:
  - `blockId` (string) - Block ID from schema
  - `type` (string) - Block type (field-group, layout, conditional)
  - `columns` (number) - Number of columns for layout
  - `spacing` (string) - Spacing between fields
- **Slots**: Default slot for fields
- **Events**: None
- **Complexity**: Low
- **Dependencies**: Layout utilities

#### 4. **r-form-field-wrapper** - Field Wrapper
- **Purpose**: Wraps individual fields with dependency logic, validation, and accessibility
- **Props**:
  - `fieldId` (string) - Field ID from schema
  - `field` (object) - Field definition from schema
  - `value` (any) - Field value
  - `error` (string) - Validation error message
  - `visible` (boolean) - Field visibility (from dependencies)
  - `enabled` (boolean) - Field enabled state (from dependencies)
  - `locale` (string) - Locale for i18n
- **Features**:
  - Renders appropriate field component based on type
  - Handles field dependencies
  - Applies validation
  - Manages accessibility attributes
  - Handles i18n translations
- **Events**: `rFieldChange`, `rFieldFocus`, `rFieldBlur`
- **Complexity**: Medium-High
- **Dependencies**: All field components, validation system, dependency resolver

#### 5. **r-form-progress** - Progress Indicator
- **Purpose**: Shows form completion progress
- **Props**:
  - `currentSection` (number) - Current section index
  - `totalSections` (number) - Total sections
  - `completedFields` (number) - Completed fields count
  - `totalFields` (number) - Total fields count
  - `showPercentage` (boolean) - Show percentage
- **Events**: None
- **Complexity**: Low
- **Dependencies**: None

#### 6. **r-form-navigation** - Form Navigation
- **Purpose**: Navigation between sections
- **Props**:
  - `sections` (array) - Array of section objects
  - `currentSection` (number) - Current section index
  - `canGoNext` (boolean) - Can navigate to next section
  - `canGoPrevious` (boolean) - Can navigate to previous section
  - `showProgress` (boolean) - Show progress indicator
- **Events**: `rNavigateNext`, `rNavigatePrevious`, `rNavigateToSection`
- **Complexity**: Medium
- **Dependencies**: r-form-progress, r-button

---

## 🔧 Supporting Systems (Not Components)

These are utility systems needed for the questionnaire:

### 1. **Validation System**
- **Purpose**: Client-side and server-side validation
- **Features**:
  - Pattern matching
  - Length constraints
  - Value ranges
  - Required field checks
  - Custom validation functions
  - Async validation
  - Error message management
- **Location**: `src/utils/validation/`

### 2. **Dependency Resolver**
- **Purpose**: Resolve field dependencies (dependsOn, dependsOnAny, dependsOnAll)
- **Features**:
  - Track field values
  - Evaluate dependency conditions
  - Update field visibility/enabled state
  - Handle dependency chains
- **Location**: `src/utils/dependencies/`

### 3. **State Management**
- **Purpose**: Manage form state
- **Features**:
  - Form values storage
  - Validation state
  - Dirty state tracking
  - Submission state
  - Draft saving
  - Auto-save
- **Location**: `src/utils/state/`

### 4. **Internationalization (i18n)**
- **Purpose**: Multi-language support
- **Features**:
  - Translation management
  - Locale-specific formatting
  - RTL support
  - Date/number/currency formatting
- **Location**: `src/utils/i18n/`

### 5. **Security Utilities**
- **Purpose**: Security features
- **Features**:
  - Input sanitization
  - XSS prevention
  - PII masking
  - Rate limiting
  - Audit logging
- **Location**: `src/utils/security/`

---

## 📋 Implementation Priority

### Phase 1: Foundation (Week 1-2)
1. ✅ Review and finalize component design
2. Create missing base components:
   - `r-textarea` (Priority: High)
   - `r-heading` (Priority: High)
   - `r-range` (Priority: Medium)
3. Create core questionnaire components:
   - `r-form-renderer` (Priority: High)
   - `r-form-section` (Priority: High)
   - `r-form-block` (Priority: High)
   - `r-form-field-wrapper` (Priority: High)

### Phase 2: Core Features (Week 3-4)
4. Create remaining base components:
   - `r-file-upload` (Priority: Medium)
   - `r-currency-input` (Priority: Medium)
5. Implement supporting systems:
   - Validation system
   - Dependency resolver
   - State management

### Phase 3: Advanced Features (Week 5-6)
6. Create advanced components:
   - `r-form-progress`
   - `r-form-navigation`
7. Implement:
   - Accessibility features
   - Internationalization
   - Security features

### Phase 4: Integration & Testing (Week 7-8)
8. Backend integration
9. Comprehensive testing
10. Documentation
11. Performance optimization

---

## 🎯 Component Mapping to Field Types

| Field Type | Component | Status |
|------------|-----------|--------|
| `text` | `r-input` (type="text") | ✅ Exists |
| `textarea` | `r-textarea` | ⚠️ Need to create |
| `dropdown` | `r-dropdown` (multiple=false) | ✅ Exists |
| `multiselect` | `r-dropdown` (multiple=true) | ✅ Exists |
| `radio` | `r-radio-group` | ✅ Exists |
| `checkbox` | `r-checkbox` | ✅ Exists |
| `date` | `r-datepicker` | ✅ Exists |
| `toggle` | `r-toggle` | ✅ Exists |
| `range` | `r-range` | ⚠️ Need to create |
| `file` | `r-file-upload` | ⚠️ Need to create |
| `currency` | `r-currency-input` | ⚠️ Need to create |
| `number` | `r-input` (type="number") | ✅ Exists |
| `hidden` | Hidden input (no component) | ✅ Can use native |
| `heading` | `r-heading` | ⚠️ Need to create |

---

## 📝 Notes

1. **Reusability**: All base components (r-textarea, r-range, etc.) should be standalone design system components that can be used outside the questionnaire system.

2. **Consistency**: All components should follow the same patterns as existing components (r-input, r-dropdown, etc.).

3. **Accessibility**: All components must be WCAG AA compliant from day one.

4. **Production-Ready**: All components must be production-ready, tested, and documented before use in the questionnaire system.

5. **Framework-Agnostic**: The questionnaire system should be framework-agnostic, but components are Stencil web components (can be used in any framework).

---

## 🔗 Related Documentation

- `generic-questionnaire-spec.md` - Full specification
- `GENERIC_QUESTIONNAIRE_CHECKLIST.md` - Implementation checklist
- `implementation-status.md` - Implementation tracking
- `../component-creation/COMPONENT_CREATION_GUIDE.md` - Component creation guide
- `../architecture/PRODUCTION_READINESS_GUIDE.md` - Production readiness guide

