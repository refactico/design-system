import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderCheckboxExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      
      <div class="example-group">
        <h3>📋 Terms & Conditions Agreement</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Registration form with required agreements</p>
        <r-checkbox form-field label="Terms & Conditions" required error error-text="You must agree to continue">
          I agree to the Terms and Conditions
        </r-checkbox>
        <r-checkbox form-field label="Privacy Policy" required>
          I have read and agree to the Privacy Policy
        </r-checkbox>
        <r-checkbox form-field label="Newsletter" helper-text="Optional - receive updates via email">
          Subscribe to our newsletter
        </r-checkbox>
        <r-buttons style={{ marginTop: '20px' }}>
          <r-button color="primary" expand="block">Create Account</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>✅ Task Management</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Select all pattern with individual tasks</p>
        <r-checkbox indeterminate color="primary">Select All Tasks</r-checkbox>
        <div style={{ marginLeft: '24px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <r-checkbox checked>Complete user authentication</r-checkbox>
          <r-checkbox checked>Implement payment gateway</r-checkbox>
          <r-checkbox>Write unit tests</r-checkbox>
          <r-checkbox>Update documentation</r-checkbox>
        </div>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button color="secondary">Mark Complete</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>🎯 Preferences Selection</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>User preferences with different label placements</p>
        <r-checkbox label-placement="start" checked color="primary">Enable Notifications</r-checkbox>
        <r-checkbox label-placement="end" checked>Dark Mode</r-checkbox>
        <r-checkbox label-placement="start">Auto-save</r-checkbox>
        <r-checkbox label-placement="end" checked>Two-factor Authentication</r-checkbox>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button color="primary">Save Preferences</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>🛒 Shopping Cart Features</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Additional services selection</p>
        <r-checkbox form-field label="Gift Wrapping" helper-text="Add $5.00">
          Add gift wrapping service
        </r-checkbox>
        <r-checkbox form-field label="Express Shipping" helper-text="Delivered in 1-2 business days">
          Upgrade to express shipping (+$10)
        </r-checkbox>
        <r-checkbox form-field label="Insurance" helper-text="Protect your package">
          Add shipping insurance (+$3)
        </r-checkbox>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button fill="outline">Continue Shopping</r-button>
          <r-button color="primary">Proceed to Checkout</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>⚠️ Required Field Validation</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Form with validation error</p>
        <r-checkbox form-field label="Age Verification" required error error-text="You must be 18+ to continue">
          I confirm that I am 18 years or older
        </r-checkbox>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button color="danger" expand="block">Fix Required Fields</r-button>
        </r-buttons>
      </div>
    </div>
  );
}

