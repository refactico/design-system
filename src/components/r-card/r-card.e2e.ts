import { newE2EPage } from '@stencil/core/testing';

describe('r-card e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-card>Card Content</r-card>');

    const element = await page.find('r-card');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with content', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-card><p>Test Content</p></r-card>');

    const element = await page.find('r-card');
    const content = await element.find('p');
    expect(content).toBeTruthy();
    expect(await content.innerText).toBe('Test Content');
  });
});

