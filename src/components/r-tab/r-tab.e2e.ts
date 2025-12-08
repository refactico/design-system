import { newE2EPage } from '@stencil/core/testing';

describe('r-tab e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-tab tab="home"></r-tab>');

    const element = await page.find('r-tab');
    expect(element).toHaveClass('hydrated');
  });
});

