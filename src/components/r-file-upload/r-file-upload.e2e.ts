import { newE2EPage } from '@stencil/core/testing';

describe('r-file-upload e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-file-upload label="Upload File"></r-file-upload>');
    const element = await page.find('r-file-upload');
    expect(element).toHaveClass('hydrated');
  });

  it('respects disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-file-upload label="Upload File" disabled></r-file-upload>');
    
    const input = await page.find('r-file-upload input[type="file"]');
    expect(await input.getProperty('disabled')).toBe(true);
  });

  it('displays error text when error is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-file-upload label="Upload File" error error-text="File is required"></r-file-upload>');
    
    const errorNote = await page.find('r-file-upload ion-note[slot="error"]');
    expect(errorNote).not.toBeNull();
    expect(await errorNote.textContent).toBe('File is required');
  });

  it('has accept attribute when provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-file-upload label="Upload File" accept=".pdf,.png"></r-file-upload>');
    
    const input = await page.find('r-file-upload input[type="file"]');
    expect(await input.getProperty('accept')).toBe('.pdf,.png');
  });

  it('has multiple attribute when multiple is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-file-upload label="Upload File" multiple></r-file-upload>');
    
    const input = await page.find('r-file-upload input[type="file"]');
    expect(await input.getProperty('multiple')).toBe(true);
  });
});

