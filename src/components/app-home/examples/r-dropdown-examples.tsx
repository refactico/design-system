import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderDropdownExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      
      <div class="example-group">
        <h3>🌍 Shipping Address Form</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Complete shipping information</p>
        <r-input label="Full Name" placeholder="John Doe" required></r-input>
        <r-input label="Address" placeholder="123 Main St" required></r-input>
        <r-dropdown label="Country" placeholder="Select country" required>
          <ion-select-option value="us">United States</ion-select-option>
          <ion-select-option value="uk">United Kingdom</ion-select-option>
          <ion-select-option value="ca">Canada</ion-select-option>
          <ion-select-option value="au">Australia</ion-select-option>
          <ion-select-option value="de">Germany</ion-select-option>
        </r-dropdown>
        <r-dropdown label="State/Province" placeholder="Select state" required>
          <ion-select-option value="ny">New York</ion-select-option>
          <ion-select-option value="ca">California</ion-select-option>
          <ion-select-option value="tx">Texas</ion-select-option>
        </r-dropdown>
        <r-buttons style={{ marginTop: '20px' }}>
          <r-button color="primary" expand="block">Continue to Payment</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>🛍️ Product Customization</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Customize your product order</p>
        <r-dropdown label="Size" value="medium" fill="outline">
          <ion-select-option value="small">Small</ion-select-option>
          <ion-select-option value="medium">Medium</ion-select-option>
          <ion-select-option value="large">Large</ion-select-option>
          <ion-select-option value="xl">Extra Large</ion-select-option>
        </r-dropdown>
        <r-dropdown label="Color" placeholder="Choose color" fill="outline">
          <ion-select-option value="red">Red</ion-select-option>
          <ion-select-option value="blue">Blue</ion-select-option>
          <ion-select-option value="green">Green</ion-select-option>
          <ion-select-option value="black">Black</ion-select-option>
        </r-dropdown>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button fill="outline">Reset</r-button>
          <r-button color="primary">Add to Cart</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>📚 Skills Selection (Multiple)</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Select multiple programming skills</p>
        <r-dropdown label="Programming Languages" placeholder="Choose your skills" multiple>
          <ion-select-option value="react">React</ion-select-option>
          <ion-select-option value="vue">Vue.js</ion-select-option>
          <ion-select-option value="angular">Angular</ion-select-option>
          <ion-select-option value="svelte">Svelte</ion-select-option>
          <ion-select-option value="node">Node.js</ion-select-option>
          <ion-select-option value="python">Python</ion-select-option>
        </r-dropdown>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button color="secondary">Save Skills</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>⚠️ Form with Validation</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Required field showing error state</p>
        <r-dropdown label="Priority Level" placeholder="Select priority" required error error-text="This field is required">
          <ion-select-option value="low">Low</ion-select-option>
          <ion-select-option value="medium">Medium</ion-select-option>
          <ion-select-option value="high">High</ion-select-option>
        </r-dropdown>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button color="danger" expand="block">Fix Required Fields</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>⚙️ Settings Configuration</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Application settings with outline style</p>
        <r-dropdown label="Theme" placeholder="Select theme" fill="outline">
          <ion-select-option value="light">Light</ion-select-option>
          <ion-select-option value="dark">Dark</ion-select-option>
          <ion-select-option value="auto">Auto</ion-select-option>
        </r-dropdown>
        <r-dropdown label="Language" placeholder="Select language" fill="outline">
          <ion-select-option value="en">English</ion-select-option>
          <ion-select-option value="es">Spanish</ion-select-option>
          <ion-select-option value="fr">French</ion-select-option>
        </r-dropdown>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button fill="outline">Cancel</r-button>
          <r-button color="primary">Save Settings</r-button>
        </r-buttons>
      </div>
    </div>
  );
}

