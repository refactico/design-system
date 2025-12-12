import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderRadioGroupExamples(_context?: ExampleContext) {
  const paymentMethods = [
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' },
  ];

  const deliveryOptions = [
    { value: 'standard', label: 'Standard (5-7 days)' },
    { value: 'express', label: 'Express (2-3 days)' },
    { value: 'overnight', label: 'Overnight (Next day)' },
  ];

  const subscriptionPlans = [
    { value: 'basic', label: 'Basic - $9.99/month' },
    { value: 'pro', label: 'Pro - $19.99/month' },
    { value: 'enterprise', label: 'Enterprise - $49.99/month' },
  ];

  const feedbackOptions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'average', label: 'Average' },
    { value: 'poor', label: 'Poor' },
  ];

  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      
      <div class="example-group">
        <h3>💳 Payment Method Selection</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Choose your payment method at checkout</p>
        <r-radio-group
          label="Payment Method"
          name="payment-method"
          required
          options={paymentMethods}
          helper-text="Select how you'd like to pay"
        ></r-radio-group>
        <r-buttons style={{ marginTop: '20px' }}>
          <r-button color="primary" expand="block">Continue to Payment</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>📦 Delivery Options</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Select your preferred delivery speed</p>
        <r-radio-group
          label="Delivery Speed"
          name="delivery-speed"
          value="express"
          options={deliveryOptions}
          fill="outline"
        ></r-radio-group>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button fill="outline">Cancel</r-button>
          <r-button color="primary">Confirm Order</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>⭐ Subscription Plan Selection</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Choose your subscription plan</p>
        <r-radio-group
          label="Select Plan"
          name="subscription-plan"
          required
          color="primary"
          options={subscriptionPlans}
        ></r-radio-group>
        <r-buttons style={{ marginTop: '20px' }}>
          <r-button color="primary" expand="block">Subscribe Now</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>📝 Customer Feedback Form</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Rate your experience with us</p>
        <r-radio-group
          label="How would you rate our service?"
          name="feedback-rating"
          required
          options={feedbackOptions}
          helper-text="Your feedback helps us improve"
        ></r-radio-group>
        <r-input label="Additional Comments" placeholder="Tell us more..." style={{ marginTop: '16px' }}></r-input>
        <r-buttons style={{ marginTop: '20px' }}>
          <r-button color="secondary">Submit Feedback</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>⚠️ Required Field Validation</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Form with validation error</p>
        <r-radio-group
          label="Account Type"
          name="account-type"
          required
          error
          error-text="Please select an account type"
          options={[
            { value: 'personal', label: 'Personal' },
            { value: 'business', label: 'Business' },
          ]}
        ></r-radio-group>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button color="danger" expand="block">Fix Required Fields</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>🎨 Theme Selection</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Customize your app appearance</p>
        <r-radio-group
          label="Choose Theme"
          name="theme-selection"
          value="dark"
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto (System)' },
          ]}
          fill="outline"
          allow-empty-selection
        ></r-radio-group>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button fill="outline">Reset</r-button>
          <r-button color="primary">Apply Theme</r-button>
        </r-buttons>
      </div>
    </div>
  );
}

