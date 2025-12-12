import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderFileUploadExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>📎 File Upload Component Examples</h2>

      <div class="example-group">
        <h3>📄 Document Upload</h3>
        <p>Upload a single document file with drag and drop support.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <r-file-upload
            label="Upload Document"
            accept=".pdf,.doc,.docx"
            max-size={10485760}
            helper-text="PDF or Word documents, max 10MB"
            required
          ></r-file-upload>
          <r-buttons position="end">
            <r-button color="primary" type="submit">Submit</r-button>
          </r-buttons>
        </form>
      </div>

      <div class="example-group">
        <h3>🖼️ Image Upload (Multiple)</h3>
        <p>Upload multiple image files with preview.</p>
        <r-file-upload
          label="Upload Images"
          accept="image/*"
          multiple
          max-size={5242880}
          helper-text="Upload multiple images, max 5MB each"
        ></r-file-upload>
      </div>

      <div class="example-group">
        <h3>📋 Profile Picture Upload</h3>
        <p>Single image upload for profile picture.</p>
        <r-file-upload
          label="Profile Picture"
          accept="image/*"
          max-size={2097152}
          helper-text="JPG, PNG, or GIF, max 2MB"
        ></r-file-upload>
      </div>

      <div class="example-group">
        <h3>⚠️ File Upload with Error</h3>
        <p>Demonstrates a file upload with validation error.</p>
        <r-file-upload
          label="Upload File"
          error
          error-text="Please select a file to upload"
        ></r-file-upload>
      </div>

      <div class="example-group">
        <h3>🔒 Disabled File Upload</h3>
        <p>A disabled file upload field.</p>
        <r-file-upload
          label="Upload File"
          disabled
          helper-text="File upload is currently disabled"
        ></r-file-upload>
      </div>

      <div class="example-group">
        <h3>📎 Button Style (No Drag-Drop)</h3>
        <p>File upload with button style instead of drag-drop area.</p>
        <r-file-upload
          label="Choose File"
          drag-drop={false}
          helper-text="Click button to select file"
        ></r-file-upload>
      </div>

      <div class="example-group">
        <h3>📊 Resume Upload Form</h3>
        <p>Complete form with file upload for resume submission.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <r-input label="Full Name" placeholder="Enter your name" required></r-input>
          <r-input type="email" label="Email" placeholder="Enter your email" required></r-input>
          <r-file-upload
            label="Resume (PDF)"
            accept=".pdf"
            max-size={5242880}
            helper-text="PDF format only, max 5MB"
            required
          ></r-file-upload>
          <r-buttons position="end">
            <r-button color="primary" type="submit">Submit Application</r-button>
          </r-buttons>
        </form>
      </div>

      <div class="example-group">
        <h3>🎨 Different File Types</h3>
        <p>File uploads with different accepted file types.</p>
        <r-file-upload
          label="PDF Documents"
          accept=".pdf"
          helper-text="PDF files only"
        ></r-file-upload>
        <r-file-upload
          label="Images"
          accept="image/*"
          helper-text="All image formats"
        ></r-file-upload>
        <r-file-upload
          label="Videos"
          accept="video/*"
          helper-text="All video formats"
        ></r-file-upload>
      </div>
    </div>
  );
}

