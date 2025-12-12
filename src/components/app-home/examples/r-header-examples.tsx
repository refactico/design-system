import { h } from '@stencil/core';
import { ExampleContext } from './index';

/**
 * ALIGNMENT ISSUES TO FIX (After Refactico Design System):
 * 
 * ============================================================
 * 1. DATEPICKER ALIGNMENT ISSUES:
 * ============================================================
 * - Datepicker label and input field are not properly aligned vertically
 * - The calendar icon/button inside datepicker may be misaligned
 * - Datepicker with different fill styles (outline, solid) have inconsistent alignment
 * - Error text and helper text positioning may not align properly with the input
 * - Datepicker in different presentation modes (date, time, date-time) may have alignment inconsistencies
 * - Check: Label position (floating, stacked) alignment with input field
 * - Check: Icon alignment within the datepicker input container
 * - Check: Padding and spacing consistency across all datepicker variants
 * 
 * ============================================================
 * 2. OTHER COMPONENT ALIGNMENT ISSUES:
 * ============================================================
 * 
 * INPUT COMPONENT:
 * - Verify label alignment with input field across all fill styles
 * - Check password toggle icon alignment
 * - Ensure error/helper text alignment is consistent
 * 
 * DROPDOWN COMPONENT:
 * - Verify label alignment with select field
 * - Check dropdown arrow icon alignment
 * - Ensure selected value text alignment within the field
 * - Check alignment of multiple selected items display
 * 
 * CHECKBOX COMPONENT:
 * - Verify checkbox alignment with label text (all labelPlacement options)
 * - Check alignment in form field mode vs standalone mode
 * - Ensure checkbox and label are vertically centered
 * 
 * RADIO GROUP COMPONENT:
 * - Verify radio button alignment with label text
 * - Check alignment of radio options within the group
 * - Ensure proper spacing and alignment between radio items
 * 
 * TOGGLE COMPONENT:
 * - Verify toggle switch alignment with label
 * - Check alignment in different labelPlacement modes
 * 
 * BUTTON COMPONENT:
 * - Verify icon alignment within buttons (icon-only, with text)
 * - Check button text vertical centering
 * - Ensure button groups have proper alignment
 * 
 * CARD COMPONENT:
 * - Verify card header, content, and footer alignment
 * - Check card title and subtitle alignment
 * 
 * ============================================================
 * 3. GENERAL ALIGNMENT CHECKS:
 * ============================================================
 * - All form fields should have consistent label positioning
 * - Error and helper text should align consistently across all components
 * - Icons within components should be properly centered
 * - Text should be vertically centered within input fields
 * - Components in example groups should have consistent spacing
 * - Check alignment on different screen sizes (responsive)
 * - Verify alignment in both iOS and Material Design modes
 * 
 * ============================================================
 * 4. SPECIFIC FIXES NEEDED:
 * ============================================================
 * - Add CSS rules to ensure proper vertical alignment of labels
 * - Fix icon positioning within form fields
 * - Standardize padding and margins across components
 * - Ensure flexbox alignment is consistent
 * - Fix any text baseline alignment issues
 * - Verify line-height consistency for proper vertical centering
 */

export function renderHeaderExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Header</h3>
        <r-header header-title="My App"></r-header>
      </div>
      <div class="example-group">
        <h3>Header with Color</h3>
        <r-header header-title="Colored Header" color="primary"></r-header>
      </div>
      <div class="example-group">
        <h3>Header with Buttons</h3>
        <r-header header-title="Header with Buttons">
          <ion-buttons slot="start">
            <ion-button>
              <ion-icon slot="icon-only" name="menu-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button>
              <ion-icon slot="icon-only" name="search-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </r-header>
      </div>
      <div class="example-group">
        <h3>Translucent Header</h3>
        <div style={{ background: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)', padding: '20px', minHeight: '100px', borderRadius: '8px' }}>
          <r-header header-title="Translucent Header" translucent></r-header>
          <div style={{ padding: '20px', color: 'white' }}>Content below translucent header</div>
        </div>
      </div>
    </div>
  );
}

