import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderRangeExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>🎚️ Range Component Examples</h2>

      <div class="example-group">
        <h3>🔊 Volume Control</h3>
        <p>Basic volume slider with pin to show current value.</p>
        <r-range
          label="Volume"
          min={0}
          max={100}
          value={50}
          pin
          helper-text="Adjust the volume level"
        ></r-range>
      </div>

      <div class="example-group">
        <h3>💰 Price Range Filter</h3>
        <p>Dual knob range slider for selecting a price range.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <r-range
            label="Price Range ($)"
            min={0}
            max={1000}
            step={50}
            dual-knobs
            pin
            helper-text="Select your price range"
          ></r-range>
          <r-buttons position="end">
            <r-button color="primary" type="submit">Apply Filter</r-button>
          </r-buttons>
        </form>
      </div>

      <div class="example-group">
        <h3>⭐ Rating Slider</h3>
        <p>Range slider with snaps and ticks for rating selection.</p>
        <r-range
          label="Rating"
          min={1}
          max={5}
          value={3}
          step={1}
          snaps
          ticks
          pin
          helper-text="Rate from 1 to 5"
        ></r-range>
      </div>

      <div class="example-group">
        <h3>📊 Progress Indicator</h3>
        <p>Range slider used as a progress indicator (read-only style).</p>
        <r-range
          label="Progress"
          min={0}
          max={100}
          value={75}
          disabled
          helper-text="75% complete"
        ></r-range>
      </div>

      <div class="example-group">
        <h3>⚠️ Range with Error State</h3>
        <p>Demonstrates a range slider with validation error message.</p>
        <r-range
          label="Temperature"
          min={0}
          max={100}
          value={50}
          error
          error-text="Temperature must be between 20 and 80"
        ></r-range>
      </div>

      <div class="example-group">
        <h3>🎯 Custom Step Range</h3>
        <p>Range slider with custom step value and snapping.</p>
        <r-range
          label="Score"
          min={0}
          max={100}
          value={50}
          step={10}
          snaps
          ticks
          pin
          helper-text="Score in increments of 10"
        ></r-range>
      </div>

      <div class="example-group">
        <h3>🎨 Different Colors</h3>
        <p>Range sliders with different color variants.</p>
        <r-range
          label="Primary Color"
          min={0}
          max={100}
          value={50}
          color="primary"
        ></r-range>
        <r-range
          label="Success Color"
          min={0}
          max={100}
          value={50}
          color="success"
        ></r-range>
        <r-range
          label="Danger Color"
          min={0}
          max={100}
          value={50}
          color="danger"
        ></r-range>
      </div>

      <div class="example-group">
        <h3>📏 Different Ranges</h3>
        <p>Range sliders with different min/max values.</p>
        <r-range
          label="Percentage (0-100)"
          min={0}
          max={100}
          value={50}
          pin
        ></r-range>
        <r-range
          label="Temperature (-20 to 40)"
          min={-20}
          max={40}
          value={20}
          step={5}
          pin
        ></r-range>
        <r-range
          label="Age (18-100)"
          min={18}
          max={100}
          value={30}
          step={1}
          pin
        ></r-range>
      </div>
    </div>
  );
}

