import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderCheckboxExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Checkbox</h3>
        <r-checkbox>Accept Terms and Conditions</r-checkbox>
      </div>
      <div class="example-group">
        <h3>Checked Checkbox</h3>
        <r-checkbox checked>Already Checked</r-checkbox>
      </div>
      <div class="example-group">
        <h3>Disabled Checkbox</h3>
        <r-checkbox disabled>Disabled Checkbox</r-checkbox>
      </div>
      <div class="example-group">
        <h3>Checkbox with Color</h3>
        <r-checkbox color="primary" checked>Primary Checkbox</r-checkbox>
      </div>
      <div class="example-group">
        <h3>Indeterminate State</h3>
        <r-checkbox indeterminate>Select All</r-checkbox>
      </div>
      <div class="example-group">
        <h3>Form Field Mode</h3>
        <r-checkbox form-field label="Agree to Terms" helper-text="You must agree to continue">
          I agree to the terms and conditions
        </r-checkbox>
      </div>
      <div class="example-group">
        <h3>Form Field with Error</h3>
        <r-checkbox form-field label="Required Field" error error-text="This field is required">
          Required checkbox
        </r-checkbox>
      </div>
      <div class="example-group">
        <h3>Label Placement Variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <r-checkbox label-placement="start" checked>Label on Start</r-checkbox>
          <r-checkbox label-placement="end" checked>Label on End (Default)</r-checkbox>
          <r-checkbox label-placement="fixed" checked>Label Fixed</r-checkbox>
          <r-checkbox label-placement="stacked" checked>Label Stacked</r-checkbox>
        </div>
      </div>
    </div>
  );
}

