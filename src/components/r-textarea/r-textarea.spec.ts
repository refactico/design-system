import { newSpecPage } from '@stencil/core/testing';
import { RTextarea } from './r-textarea';

describe('r-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RTextarea],
      html: `<r-textarea></r-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <r-textarea>
        <mock:shadow-root>
          <ion-item>
            <ion-textarea></ion-textarea>
          </ion-item>
        </mock:shadow-root>
      </r-textarea>
    `);
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [RTextarea],
      html: `<r-textarea label="Comments"></r-textarea>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toBe('Comments');
  });

  it('renders with value', async () => {
    const page = await newSpecPage({
      components: [RTextarea],
      html: `<r-textarea value="Test value"></r-textarea>`,
    });
    const textarea = page.root?.querySelector('ion-textarea');
    expect(textarea?.getAttribute('value')).toBe('Test value');
  });

  it('renders with rows', async () => {
    const page = await newSpecPage({
      components: [RTextarea],
      html: `<r-textarea rows="5"></r-textarea>`,
    });
    const textarea = page.root?.querySelector('ion-textarea');
    expect(textarea?.getAttribute('rows')).toBe('5');
  });

  it('renders with error state', async () => {
    const page = await newSpecPage({
      components: [RTextarea],
      html: `<r-textarea error error-text="This field is required"></r-textarea>`,
    });
    const item = page.root?.querySelector('ion-item');
    expect(item).toHaveClass('item-has-error');
    const errorNote = page.root?.querySelector('ion-note[slot="error"]');
    expect(errorNote?.textContent).toBe('This field is required');
  });

  it('renders with helper text', async () => {
    const page = await newSpecPage({
      components: [RTextarea],
      html: `<r-textarea helper-text="Enter your comments here"></r-textarea>`,
    });
    const helperNote = page.root?.querySelector('ion-note[slot="helper"]');
    expect(helperNote?.textContent).toBe('Enter your comments here');
  });

  it('renders with autoGrow', async () => {
    const page = await newSpecPage({
      components: [RTextarea],
      html: `<r-textarea auto-grow></r-textarea>`,
    });
    const textarea = page.root?.querySelector('ion-textarea');
    expect(textarea?.getAttribute('auto-grow')).toBe('');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [RTextarea],
      html: `<r-textarea disabled></r-textarea>`,
    });
    const textarea = page.root?.querySelector('ion-textarea');
    expect(textarea?.getAttribute('disabled')).toBe('');
  });

  it('renders readonly state', async () => {
    const page = await newSpecPage({
      components: [RTextarea],
      html: `<r-textarea readonly></r-textarea>`,
    });
    const textarea = page.root?.querySelector('ion-textarea');
    expect(textarea?.getAttribute('readonly')).toBe('');
  });
});

