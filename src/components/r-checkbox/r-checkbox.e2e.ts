import { newE2EPage } from '@stencil/core/testing';

describe('r-checkbox e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-checkbox>Checkbox Label</r-checkbox>');

    const element = await page.find('r-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('can be checked and unchecked', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-checkbox>Checkbox Label</r-checkbox>');

    const checkbox = await page.find('r-checkbox ion-checkbox');
    expect(await checkbox.getProperty('checked')).toBe(false);

    await checkbox.click();
    await page.waitForChanges();
    expect(await checkbox.getProperty('checked')).toBe(true);

    await checkbox.click();
    await page.waitForChanges();
    expect(await checkbox.getProperty('checked')).toBe(false);
  });

  it('respects disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-checkbox disabled>Disabled Checkbox</r-checkbox>');

    const checkbox = await page.find('r-checkbox ion-checkbox');
    expect(await checkbox.getProperty('disabled')).toBe(true);
  });
});

