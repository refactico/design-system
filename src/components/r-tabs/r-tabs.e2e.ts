import { newE2EPage } from '@stencil/core/testing';

describe('r-tabs e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-tabs></r-tabs>');

    const element = await page.find('r-tabs');
    expect(element).toHaveClass('hydrated');
  });
});

