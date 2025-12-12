import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderInputExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      
      <div class="example-group">
        <h3>📝 User Registration Form</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Complete registration form with validation</p>
        <r-input label="Full Name" placeholder="John Doe" required></r-input>
        <r-input type="email" label="Email Address" placeholder="john@example.com" required helper-text="We'll never share your email"></r-input>
        <r-input type="password" label="Password" placeholder="Create a strong password" required helper-text="Must be at least 8 characters"></r-input>
        <r-buttons style={{ marginTop: '20px' }}>
          <r-button color="primary" expand="block">Create Account</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>🔍 Search & Filter</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Search interface with outline style</p>
        <r-input label="Search Products" placeholder="Type to search..." fill="outline"></r-input>
        <r-input label="Price Range" placeholder="Enter max price" fill="outline" type="number"></r-input>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button fill="outline">Clear</r-button>
          <r-button color="primary">Search</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>⚠️ Error Handling Example</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Form with validation errors</p>
        <r-input type="email" label="Email" value="invalid-email" error error-text="Please enter a valid email address"></r-input>
        <r-input label="Phone Number" value="123" error error-text="Phone number must be 10 digits"></r-input>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button color="danger" expand="block">Fix Errors</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>🔐 Login Form</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Secure login with password visibility</p>
        <r-input type="email" label="Email" placeholder="your@email.com" required></r-input>
        <r-input type="password" label="Password" placeholder="Enter password" required></r-input>
        <r-buttons style={{ marginTop: '20px' }}>
          <r-button color="primary" expand="block">Sign In</r-button>
          <r-button fill="clear" expand="block">Forgot Password?</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>📋 Profile Settings</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>User profile with helper text</p>
        <r-input label="Username" placeholder="johndoe" helper-text="This will be your public username"></r-input>
        <r-input label="Bio" placeholder="Tell us about yourself" helper-text="Max 200 characters"></r-input>
        <r-input label="Website" placeholder="https://yourwebsite.com" helper-text="Optional"></r-input>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button color="secondary">Cancel</r-button>
          <r-button color="primary">Save Changes</r-button>
        </r-buttons>
      </div>
    </div>
  );
}

