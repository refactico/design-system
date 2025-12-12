import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderHeadingExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>📰 Heading Component Examples</h2>

      <div class="example-group">
        <h3>📄 All Heading Levels</h3>
        <p>Display headings from level 1 (largest) to level 6 (smallest).</p>
        <r-heading text="Heading Level 1" level={1}></r-heading>
        <r-heading text="Heading Level 2" level={2}></r-heading>
        <r-heading text="Heading Level 3" level={3}></r-heading>
        <r-heading text="Heading Level 4" level={4}></r-heading>
        <r-heading text="Heading Level 5" level={5}></r-heading>
        <r-heading text="Heading Level 6" level={6}></r-heading>
      </div>

      <div class="example-group">
        <h3>🎨 Colored Headings</h3>
        <p>Headings with different color variants.</p>
        <r-heading text="Primary Color Heading" level={2} color="primary"></r-heading>
        <r-heading text="Secondary Color Heading" level={2} color="secondary"></r-heading>
        <r-heading text="Success Color Heading" level={2} color="success"></r-heading>
        <r-heading text="Danger Color Heading" level={2} color="danger"></r-heading>
        <r-heading text="Warning Color Heading" level={2} color="warning"></r-heading>
      </div>

      <div class="example-group">
        <h3>📋 Document Structure</h3>
        <p>Example of using headings to structure a document.</p>
        <r-heading text="Main Title" level={1} color="primary"></r-heading>
        <r-heading text="Section 1: Introduction" level={2}></r-heading>
        <p style={{ marginLeft: '20px' }}>This is the introduction section content.</p>
        <r-heading text="Subsection 1.1: Overview" level={3}></r-heading>
        <p style={{ marginLeft: '40px' }}>This is the overview subsection content.</p>
        <r-heading text="Section 2: Details" level={2}></r-heading>
        <p style={{ marginLeft: '20px' }}>This is the details section content.</p>
      </div>

      <div class="example-group">
        <h3>🎯 Form Section Headings</h3>
        <p>Using headings to organize form sections.</p>
        <r-heading text="Personal Information" level={2} color="primary"></r-heading>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <r-input label="First Name" placeholder="Enter first name"></r-input>
          <r-input label="Last Name" placeholder="Enter last name"></r-input>
        </form>
        <r-heading text="Contact Information" level={2} color="primary"></r-heading>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <r-input type="email" label="Email" placeholder="Enter email"></r-input>
          <r-input type="tel" label="Phone" placeholder="Enter phone"></r-input>
        </form>
      </div>

      <div class="example-group">
        <h3>💡 Custom Styled Heading</h3>
        <p>Heading with custom slot content for advanced styling.</p>
        <r-heading level={2}>
          <span style={{ color: 'blue' }}>Custom </span>
          <strong style={{ color: 'red' }}>Styled</strong>
          <span> Heading</span>
        </r-heading>
      </div>

      <div class="example-group">
        <h3>📊 Dashboard Headings</h3>
        <p>Example of headings used in a dashboard layout.</p>
        <r-heading text="Dashboard Overview" level={1} color="primary"></r-heading>
        <r-heading text="Recent Activity" level={3} color="secondary"></r-heading>
        <r-heading text="Statistics" level={3} color="success"></r-heading>
        <r-heading text="Alerts" level={3} color="danger"></r-heading>
      </div>
    </div>
  );
}

