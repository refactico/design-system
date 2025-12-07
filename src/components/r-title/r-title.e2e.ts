import { newE2EPage } from '@stencil/core/testing';

describe('r-title e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-title></r-title>');

    const element = await page.find('r-title');
    expect(element).toHaveClass('hydrated');
  });

  it('displays text when provided via prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-title text="Test Title"></r-title>');

    const title = await page.find('r-title ion-title');
    expect(title).toBeTruthy();
    expect(await title.getProperty('textContent')).toBe('Test Title');
  });

  it('displays text when provided via slot', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-title>Slot Title</r-title>');

    const title = await page.find('r-title ion-title');
    expect(title).toBeTruthy();
    expect(await title.getProperty('textContent')).toBe('Slot Title');
  });
});

