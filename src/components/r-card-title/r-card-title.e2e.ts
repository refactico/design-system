import { newE2EPage } from '@stencil/core/testing';

describe('r-card-title e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-card-title>Card Title</r-card-title>');

    const element = await page.find('r-card-title');
    expect(element).toHaveClass('hydrated');
  });
});

