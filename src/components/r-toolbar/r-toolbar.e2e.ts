import { newE2EPage } from '@stencil/core/testing';

describe('r-toolbar e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-toolbar></r-toolbar>');

    const element = await page.find('r-toolbar');
    expect(element).toHaveClass('hydrated');
  });

  it('applies color to toolbar', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-toolbar color="primary"></r-toolbar>');

    const toolbar = await page.find('r-toolbar ion-toolbar');
    expect(toolbar).toBeTruthy();
    expect(await toolbar.getProperty('color')).toBe('primary');
  });
});

