import { newE2EPage } from '@stencil/core/testing';

describe('r-radio-group e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    const options = JSON.stringify([
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ]);
    await page.setContent(`<r-radio-group label="Choose" options='${options}'></r-radio-group>`);

    const element = await page.find('r-radio-group');
    expect(element).toHaveClass('hydrated');
  });

  it('renders options correctly', async () => {
    const page = await newE2EPage();
    const options = JSON.stringify([
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ]);
    await page.setContent(`<r-radio-group label="Choose" options='${options}'></r-radio-group>`);

    const radios = await page.findAll('r-radio-group ion-radio');
    expect(radios.length).toBe(3);
  });

  it('can select an option', async () => {
    const page = await newE2EPage();
    const options = JSON.stringify([
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ]);
    await page.setContent(`<r-radio-group label="Choose" name="test" options='${options}'></r-radio-group>`);

    const radioGroup = await page.find('r-radio-group ion-radio-group');
    const firstRadio = await page.find('r-radio-group ion-radio[value="option1"]');
    
    await firstRadio.click();
    await page.waitForChanges();
    
    const value = await radioGroup.getProperty('value');
    expect(value).toBe('option1');
  });

  it('respects disabled state', async () => {
    const page = await newE2EPage();
    const options = JSON.stringify([
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ]);
    await page.setContent(`<r-radio-group label="Choose" disabled options='${options}'></r-radio-group>`);

    const radios = await page.findAll('r-radio-group ion-radio');
    for (const radio of radios) {
      expect(await radio.getProperty('disabled')).toBe(true);
    }
  });

  it('shows required indicator', async () => {
    const page = await newE2EPage();
    const options = JSON.stringify([
      { value: 'option1', label: 'Option 1' },
    ]);
    await page.setContent(`<r-radio-group label="Required Field" required options='${options}'></r-radio-group>`);

    const label = await page.find('r-radio-group ion-label');
    const labelText = await label.textContent;
    expect(labelText).toContain('*');
  });
});


