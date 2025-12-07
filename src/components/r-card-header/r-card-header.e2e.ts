import { newE2EPage } from '@stencil/core/testing';

describe('r-card-header e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-card-header>Header Content</r-card-header>');

    const element = await page.find('r-card-header');
    expect(element).toHaveClass('hydrated');
  });
});

