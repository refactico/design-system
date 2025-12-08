import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderToggleExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Toggle</h3>
        <r-toggle>Enable Notifications</r-toggle>
      </div>
      <div class="example-group">
        <h3>Checked Toggle</h3>
        <r-toggle checked>Already Enabled</r-toggle>
      </div>
      <div class="example-group">
        <h3>Disabled Toggle</h3>
        <r-toggle disabled>Disabled Toggle</r-toggle>
      </div>
      <div class="example-group">
        <h3>Toggle with Color</h3>
        <r-toggle color="primary" checked>Primary Toggle</r-toggle>
      </div>
      <div class="example-group">
        <h3>Toggle with On/Off Labels</h3>
        <r-toggle enable-on-off-labels checked>Toggle with Labels</r-toggle>
      </div>
      <div class="example-group">
        <h3>Form Field Mode</h3>
        <r-toggle form-field label="Enable Feature" helper-text="Turn this feature on or off">
          Enable notifications
        </r-toggle>
      </div>
      <div class="example-group">
        <h3>Form Field with Error</h3>
        <r-toggle form-field label="Required Field" error error-text="This field is required">
          Required toggle
        </r-toggle>
      </div>
      <div class="example-group">
        <h3>Label Placement Variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <r-toggle label-placement="start" checked>Label on Start</r-toggle>
          <r-toggle label-placement="end" checked>Label on End (Default)</r-toggle>
          <r-toggle label-placement="fixed" checked>Label Fixed</r-toggle>
          <r-toggle label-placement="stacked" checked>Label Stacked</r-toggle>
        </div>
      </div>
    </div>
  );
}

