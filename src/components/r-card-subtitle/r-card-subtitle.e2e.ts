import { newE2EPage } from '@stencil/core/testing';

describe('r-card-subtitle e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-card-subtitle>Card Subtitle</r-card-subtitle>');

    const element = await page.find('r-card-subtitle');
    expect(element).toHaveClass('hydrated');
  });
});

