import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderDatepickerExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Datepicker</h3>
        <r-datepicker label="Select Date" placeholder="Choose a date" presentation="date"></r-datepicker>
      </div>
      <div class="example-group">
        <h3>Datepicker with Default Value</h3>
        <r-datepicker label="Event Date" value="2024-12-25" presentation="date"></r-datepicker>
      </div>
      <div class="example-group">
        <h3>Required Datepicker</h3>
        <r-datepicker label="Appointment Date" placeholder="Select a date" required presentation="date"></r-datepicker>
      </div>
      <div class="example-group">
        <h3>Datepicker with Error</h3>
        <r-datepicker label="Required Field" placeholder="Select a date" error error-text="This field is required" presentation="date"></r-datepicker>
      </div>
      <div class="example-group">
        <h3>Time Picker</h3>
        <r-datepicker label="Time" placeholder="Select a time" presentation="time"></r-datepicker>
      </div>
      <div class="example-group">
        <h3>Date & Time Picker</h3>
        <r-datepicker label="Date & Time" placeholder="Select date and time" presentation="date-time"></r-datepicker>
      </div>
      <div class="example-group">
        <h3>With Min/Max Date</h3>
        <r-datepicker label="Date Range" placeholder="Select a date" min="2024-01-01" max="2024-12-31" presentation="date"></r-datepicker>
      </div>
      <div class="example-group">
        <h3>Outline Style</h3>
        <r-datepicker label="Outline Style" placeholder="Select a date" fill="outline" presentation="date"></r-datepicker>
      </div>
      <div class="example-group">
        <h3>Disabled Datepicker</h3>
        <r-datepicker label="Disabled Datepicker" placeholder="This datepicker is disabled" disabled presentation="date"></r-datepicker>
      </div>
    </div>
  );
}

