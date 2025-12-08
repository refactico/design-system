import { newE2EPage } from '@stencil/core/testing';

describe('r-tab-button e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-tab-button tab="home">Home</r-tab-button>');

    const element = await page.find('r-tab-button');
    expect(element).toHaveClass('hydrated');
  });
});

