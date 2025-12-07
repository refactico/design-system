import { newE2EPage } from '@stencil/core/testing';

describe('r-header e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-header></r-header>');

    const element = await page.find('r-header');
    expect(element).toHaveClass('hydrated');
  });

  it('displays title when provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-header title="Test Header"></r-header>');

    const title = await page.find('r-header ion-title');
    expect(title).toBeTruthy();
    expect(await title.getProperty('textContent')).toBe('Test Header');
  });

  it('applies color to toolbar', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-header color="primary"></r-header>');

    const toolbar = await page.find('r-header ion-toolbar');
    expect(toolbar).toBeTruthy();
    expect(await toolbar.getProperty('color')).toBe('primary');
  });
});

