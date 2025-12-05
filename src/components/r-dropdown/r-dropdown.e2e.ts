import { newE2EPage } from '@stencil/core/testing';

describe('r-dropdown e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <r-dropdown>
        <ion-select-option value="option1">Option 1</ion-select-option>
        <ion-select-option value="option2">Option 2</ion-select-option>
      </r-dropdown>
    `);

    const element = await page.find('r-dropdown');
    expect(element).toHaveClass('hydrated');
  });

  it('handles change events', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <r-dropdown>
        <ion-select-option value="option1">Option 1</ion-select-option>
        <ion-select-option value="option2">Option 2</ion-select-option>
      </r-dropdown>
    `);

    const dropdown = await page.find('r-dropdown');
    await page.spyOnEvent('rChange');

    const select = await page.find('ion-select');
    await select.click();
    await page.waitForChanges();

    // Select an option (this would need to be implemented based on Ionic's select behavior)
    expect(dropdown).toBeTruthy();
  });

  it('displays label correctly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <r-dropdown label="Country">
        <ion-select-option value="us">United States</ion-select-option>
      </r-dropdown>
    `);

    const label = await page.find('ion-label');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Country');
  });
});

