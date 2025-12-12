import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderTextareaExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>📝 Textarea Component Examples</h2>

      <div class="example-group">
        <h3>💬 Feedback Form</h3>
        <p>Collect user feedback with a textarea field.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <r-textarea
            label="Your Feedback"
            placeholder="Please share your thoughts..."
            rows={5}
            required
            helper-text="Your feedback helps us improve"
          ></r-textarea>
          <r-buttons position="end">
            <r-button color="primary" type="submit">Submit Feedback</r-button>
          </r-buttons>
        </form>
      </div>

      <div class="example-group">
        <h3>📧 Contact Form</h3>
        <p>A contact form with message field using auto-grow textarea.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <r-input label="Name" placeholder="Enter your name" required></r-input>
          <r-input type="email" label="Email" placeholder="Enter your email" required></r-input>
          <r-textarea
            label="Message"
            placeholder="Type your message here..."
            auto-grow
            rows={3}
            required
          ></r-textarea>
          <r-buttons position="end">
            <r-button color="primary" type="submit">Send Message</r-button>
          </r-buttons>
        </form>
      </div>

      <div class="example-group">
        <h3>📝 Textarea with Character Limit</h3>
        <p>Textarea with maximum character limit and counter.</p>
        <r-textarea
          label="Description"
          placeholder="Enter description (max 200 characters)"
          maxlength={200}
          rows={4}
          helper-text="200 characters maximum"
        ></r-textarea>
      </div>

      <div class="example-group">
        <h3>⚠️ Textarea with Error State</h3>
        <p>Demonstrates a textarea with validation error message.</p>
        <r-textarea
          label="Comments"
          placeholder="Enter your comments"
          value="Too short"
          error
          error-text="Please enter at least 10 characters"
          rows={4}
        ></r-textarea>
      </div>

      <div class="example-group">
        <h3>🔒 Readonly Textarea</h3>
        <p>A readonly textarea displaying pre-filled content.</p>
        <r-textarea
          label="Terms and Conditions"
          value="By using this service, you agree to our terms and conditions..."
          readonly
          rows={6}
        ></r-textarea>
      </div>

      <div class="example-group">
        <h3>🎨 Different Fill Styles</h3>
        <p>Textarea with different fill styles.</p>
        <r-textarea
          label="Outline Style"
          placeholder="Outline fill style"
          fill="outline"
          rows={3}
        ></r-textarea>
        <r-textarea
          label="Solid Style"
          placeholder="Solid fill style"
          fill="solid"
          rows={3}
        ></r-textarea>
      </div>

      <div class="example-group">
        <h3>📏 Different Sizes</h3>
        <p>Textareas with different row sizes.</p>
        <r-textarea
          label="Small (2 rows)"
          placeholder="Small textarea"
          rows={2}
        ></r-textarea>
        <r-textarea
          label="Medium (4 rows)"
          placeholder="Medium textarea"
          rows={4}
        ></r-textarea>
        <r-textarea
          label="Large (8 rows)"
          placeholder="Large textarea"
          rows={8}
        ></r-textarea>
      </div>
    </div>
  );
}

