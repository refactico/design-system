import { newE2EPage } from '@stencil/core/testing';

describe('r-toggle e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-toggle>Toggle Label</r-toggle>');

    const element = await page.find('r-toggle');
    expect(element).toHaveClass('hydrated');
  });

  it('can be checked and unchecked', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-toggle>Toggle Label</r-toggle>');

    const toggle = await page.find('r-toggle ion-toggle');
    expect(await toggle.getProperty('checked')).toBe(false);

    await toggle.click();
    await page.waitForChanges();
    expect(await toggle.getProperty('checked')).toBe(true);

    await toggle.click();
    await page.waitForChanges();
    expect(await toggle.getProperty('checked')).toBe(false);
  });

  it('respects disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-toggle disabled>Disabled Toggle</r-toggle>');

    const toggle = await page.find('r-toggle ion-toggle');
    expect(await toggle.getProperty('disabled')).toBe(true);
  });
});

