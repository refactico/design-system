import { newSpecPage } from '@stencil/core/testing';
import { RFileUpload } from './r-file-upload';

describe('r-file-upload', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RFileUpload],
      html: `<r-file-upload></r-file-upload>`,
    });
    expect(page.root).toEqualHtml(`
      <r-file-upload>
        <mock:shadow-root>
          <ion-item>
            <div class="file-upload-container">
              <input type="file" style="display: none;">
            </div>
          </ion-item>
        </mock:shadow-root>
      </r-file-upload>
    `);
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [RFileUpload],
      html: `<r-file-upload label="Upload File"></r-file-upload>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toContain('Upload File');
  });

  it('renders with accept attribute', async () => {
    const page = await newSpecPage({
      components: [RFileUpload],
      html: `<r-file-upload accept=".pdf,.png"></r-file-upload>`,
    });
    const input = page.root?.querySelector('input[type="file"]');
    expect(input?.getAttribute('accept')).toBe('.pdf,.png');
  });

  it('renders with multiple attribute', async () => {
    const page = await newSpecPage({
      components: [RFileUpload],
      html: `<r-file-upload multiple></r-file-upload>`,
    });
    const input = page.root?.querySelector('input[type="file"]');
    expect(input?.hasAttribute('multiple')).toBe(true);
  });

  it('renders with error state', async () => {
    const page = await newSpecPage({
      components: [RFileUpload],
      html: `<r-file-upload error error-text="File is required"></r-file-upload>`,
    });
    const item = page.root?.querySelector('ion-item');
    expect(item).toHaveClass('item-has-error');
    const errorNote = page.root?.querySelector('ion-note[slot="error"]');
    expect(errorNote?.textContent).toBe('File is required');
  });

  it('renders with helper text', async () => {
    const page = await newSpecPage({
      components: [RFileUpload],
      html: `<r-file-upload helper-text="Upload a file up to 5MB"></r-file-upload>`,
    });
    const helperNote = page.root?.querySelector('ion-note[slot="helper"]');
    expect(helperNote?.textContent).toBe('Upload a file up to 5MB');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [RFileUpload],
      html: `<r-file-upload disabled></r-file-upload>`,
    });
    const input = page.root?.querySelector('input[type="file"]');
    expect(input?.hasAttribute('disabled')).toBe(true);
  });

  it('renders required indicator', async () => {
    const page = await newSpecPage({
      components: [RFileUpload],
      html: `<r-file-upload label="File" required></r-file-upload>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toContain('*');
  });

  it('renders without drag-drop when dragDrop is false', async () => {
    const page = await newSpecPage({
      components: [RFileUpload],
      html: `<r-file-upload drag-drop="false"></r-file-upload>`,
    });
    const dragDropArea = page.root?.querySelector('.drag-drop-area');
    expect(dragDropArea).toBeNull();
  });
});

