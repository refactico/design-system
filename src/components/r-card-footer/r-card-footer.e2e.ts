import { newE2EPage } from '@stencil/core/testing';

describe('r-card-footer e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-card-footer>Card Footer</r-card-footer>');

    const element = await page.find('r-card-footer');
    expect(element).toHaveClass('hydrated');
  });
});

