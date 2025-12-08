import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderDropdownExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Dropdown</h3>
        <r-dropdown label="Country" placeholder="Select a country">
          <ion-select-option value="us">United States</ion-select-option>
          <ion-select-option value="uk">United Kingdom</ion-select-option>
          <ion-select-option value="ca">Canada</ion-select-option>
          <ion-select-option value="au">Australia</ion-select-option>
        </r-dropdown>
      </div>
      <div class="example-group">
        <h3>Dropdown with Default Value</h3>
        <r-dropdown label="Size" value="medium">
          <ion-select-option value="small">Small</ion-select-option>
          <ion-select-option value="medium">Medium</ion-select-option>
          <ion-select-option value="large">Large</ion-select-option>
        </r-dropdown>
      </div>
      <div class="example-group">
        <h3>Required Dropdown</h3>
        <r-dropdown label="Favorite Color" placeholder="Select a color" required>
          <ion-select-option value="red">Red</ion-select-option>
          <ion-select-option value="green">Green</ion-select-option>
          <ion-select-option value="blue">Blue</ion-select-option>
        </r-dropdown>
      </div>
      <div class="example-group">
        <h3>Dropdown with Error</h3>
        <r-dropdown label="Required Field" placeholder="Select an option" error error-text="This field is required">
          <ion-select-option value="option1">Option 1</ion-select-option>
          <ion-select-option value="option2">Option 2</ion-select-option>
        </r-dropdown>
      </div>
      <div class="example-group">
        <h3>Multiple Selection</h3>
        <r-dropdown label="Select Frameworks" placeholder="Choose multiple options" multiple>
          <ion-select-option value="react">React</ion-select-option>
          <ion-select-option value="vue">Vue</ion-select-option>
          <ion-select-option value="angular">Angular</ion-select-option>
          <ion-select-option value="svelte">Svelte</ion-select-option>
        </r-dropdown>
      </div>
      <div class="example-group">
        <h3>Outline Style</h3>
        <r-dropdown label="Outline Style" placeholder="Select an option" fill="outline">
          <ion-select-option value="option1">Option 1</ion-select-option>
          <ion-select-option value="option2">Option 2</ion-select-option>
        </r-dropdown>
      </div>
      <div class="example-group">
        <h3>Disabled Dropdown</h3>
        <r-dropdown label="Disabled Dropdown" placeholder="This dropdown is disabled" disabled>
          <ion-select-option value="option1">Option 1</ion-select-option>
          <ion-select-option value="option2">Option 2</ion-select-option>
        </r-dropdown>
      </div>
    </div>
  );
}

