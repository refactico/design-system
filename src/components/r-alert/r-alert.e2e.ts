import { newE2EPage } from '@stencil/core/testing';

describe('r-alert e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-alert></r-alert>');

    const element = await page.find('r-alert');
    expect(element).toHaveClass('hydrated');
  });

  it('displays header when provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-alert header="Test Header"></r-alert>');

    const alert = await page.find('r-alert ion-alert');
    expect(alert).toBeTruthy();
    expect(await alert.getProperty('header')).toBe('Test Header');
  });

  it('displays message when provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-alert message="Test Message"></r-alert>');

    const alert = await page.find('r-alert ion-alert');
    expect(alert).toBeTruthy();
    expect(await alert.getProperty('message')).toBe('Test Message');
  });
});

