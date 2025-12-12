import { newE2EPage } from '@stencil/core/testing';

describe('r-textarea e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-textarea label="Comments"></r-textarea>');
    const element = await page.find('r-textarea');
    expect(element).toHaveClass('hydrated');
  });

  it('allows input', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-textarea label="Comments"></r-textarea>');
    
    const textarea = await page.find('r-textarea ion-textarea');
    await textarea.type('Test input');
    await page.waitForChanges();
    
    expect(await textarea.getProperty('value')).toBe('Test input');
  });

  it('respects maxlength', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-textarea label="Comments" maxlength="10"></r-textarea>');
    
    const textarea = await page.find('r-textarea ion-textarea');
    const maxlength = await textarea.getProperty('maxlength');
    expect(maxlength).toBe(10);
  });

  it('respects disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-textarea label="Comments" disabled></r-textarea>');
    
    const textarea = await page.find('r-textarea ion-textarea');
    expect(await textarea.getProperty('disabled')).toBe(true);
  });

  it('displays error text when error is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-textarea label="Comments" error error-text="This field is required"></r-textarea>');
    
    const errorNote = await page.find('r-textarea ion-note[slot="error"]');
    expect(errorNote).not.toBeNull();
    expect(await errorNote.textContent).toBe('This field is required');
  });

  it('emits rInput event on input', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-textarea label="Comments"></r-textarea>');
    
    const rInputSpy = await page.spyOnEvent('rInput');
    const textarea = await page.find('r-textarea ion-textarea');
    
    await textarea.type('Test');
    await page.waitForChanges();
    
    expect(rInputSpy).toHaveReceivedEvent();
  });

  it('emits rChange event on input', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-textarea label="Comments"></r-textarea>');
    
    const rChangeSpy = await page.spyOnEvent('rChange');
    const textarea = await page.find('r-textarea ion-textarea');
    
    await textarea.type('Test');
    await page.waitForChanges();
    
    expect(rChangeSpy).toHaveReceivedEvent();
  });
});

