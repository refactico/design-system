import { newE2EPage } from '@stencil/core/testing';

describe('r-buttons e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-buttons></r-buttons>');

    const element = await page.find('r-buttons');
    expect(element).toHaveClass('hydrated');
  });
});

