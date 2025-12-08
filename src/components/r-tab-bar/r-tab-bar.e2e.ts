import { newE2EPage } from '@stencil/core/testing';

describe('r-tab-bar e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-tab-bar></r-tab-bar>');

    const element = await page.find('r-tab-bar');
    expect(element).toHaveClass('hydrated');
  });
});

