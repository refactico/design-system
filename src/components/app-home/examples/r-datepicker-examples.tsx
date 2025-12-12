import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderDatepickerExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      
      <div class="example-group">
        <h3>📅 Event Booking System</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Book an event with date and time selection</p>
        <r-datepicker label="Event Date" placeholder="Select event date" required presentation="date" min="2024-12-12"></r-datepicker>
        <r-datepicker label="Start Time" placeholder="Select start time" required presentation="time"></r-datepicker>
        <r-datepicker label="End Time" placeholder="Select end time" required presentation="time"></r-datepicker>
        <r-buttons style={{ marginTop: '20px' }}>
          <r-button color="primary" expand="block">Book Event</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>✈️ Flight Booking</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Select departure and return dates</p>
        <r-datepicker label="Departure Date" placeholder="Select departure" required presentation="date" fill="outline"></r-datepicker>
        <r-datepicker label="Return Date" placeholder="Select return" required presentation="date" fill="outline"></r-datepicker>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button fill="outline">Clear</r-button>
          <r-button color="primary">Search Flights</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>🏥 Appointment Scheduler</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Schedule a medical appointment</p>
        <r-datepicker label="Appointment Date & Time" placeholder="Select date and time" required presentation="date-time"></r-datepicker>
        <r-input label="Reason for Visit" placeholder="Brief description" required></r-input>
        <r-buttons style={{ marginTop: '20px' }}>
          <r-button color="primary" expand="block">Schedule Appointment</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>⏰ Meeting Reminder</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Set up a meeting reminder</p>
        <r-datepicker label="Meeting Date" value="2024-12-25" presentation="date"></r-datepicker>
        <r-datepicker label="Meeting Time" placeholder="Select time" presentation="time"></r-datepicker>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button color="secondary">Save Reminder</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>⚠️ Form Validation Example</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Required field with error state</p>
        <r-datepicker label="Birth Date" placeholder="Select your birth date" required error error-text="This field is required" presentation="date"></r-datepicker>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button color="danger" expand="block">Fix Required Fields</r-button>
        </r-buttons>
      </div>

      <div class="example-group">
        <h3>📊 Report Date Range</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Generate reports within a date range</p>
        <r-datepicker label="From Date" placeholder="Start date" presentation="date" fill="outline" min="2024-01-01" max="2024-12-31"></r-datepicker>
        <r-datepicker label="To Date" placeholder="End date" presentation="date" fill="outline" min="2024-01-01" max="2024-12-31"></r-datepicker>
        <r-buttons style={{ marginTop: '16px' }}>
          <r-button fill="outline">Reset</r-button>
          <r-button color="primary">Generate Report</r-button>
        </r-buttons>
      </div>
    </div>
  );
}

