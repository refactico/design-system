import { newE2EPage } from '@stencil/core/testing';

describe('r-currency-input e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-currency-input label="Price"></r-currency-input>');
    const element = await page.find('r-currency-input');
    expect(element).toHaveClass('hydrated');
  });

  it('respects disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-currency-input label="Price" disabled></r-currency-input>');
    
    const input = await page.find('r-currency-input ion-input');
    expect(await input.getProperty('disabled')).toBe(true);
  });

  it('displays error text when error is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-currency-input label="Price" error error-text="Invalid amount"></r-currency-input>');
    
    const errorNote = await page.find('r-currency-input ion-note[slot="error"]');
    expect(errorNote).not.toBeNull();
    expect(await errorNote.textContent).toBe('Invalid amount');
  });

  it('formats currency value on blur', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-currency-input label="Price" currency-code="USD" value="100"></r-currency-input>');
    
    const input = await page.find('r-currency-input ion-input');
    const value = await input.getProperty('value');
    // Value should be formatted as currency
    expect(value).toContain('100');
  });

  it('emits rInput event on input', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-currency-input label="Price"></r-currency-input>');
    
    const rInputSpy = await page.spyOnEvent('rInput');
    const input = await page.find('r-currency-input ion-input');
    
    await input.type('100');
    await page.waitForChanges();
    
    expect(rInputSpy).toHaveReceivedEvent();
  });

  it('emits rChange event on input', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-currency-input label="Price"></r-currency-input>');
    
    const rChangeSpy = await page.spyOnEvent('rChange');
    const input = await page.find('r-currency-input ion-input');
    
    await input.type('100');
    await page.waitForChanges();
    
    expect(rChangeSpy).toHaveReceivedEvent();
  });
});

