import { newE2EPage } from '@stencil/core/testing';

describe('r-badge e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-badge>5</r-badge>');

    const element = await page.find('r-badge');
    expect(element).toHaveClass('hydrated');
  });
});

