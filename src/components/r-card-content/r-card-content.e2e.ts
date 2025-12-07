import { newE2EPage } from '@stencil/core/testing';

describe('r-card-content e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-card-content>Card Content</r-card-content>');

    const element = await page.find('r-card-content');
    expect(element).toHaveClass('hydrated');
  });
});

