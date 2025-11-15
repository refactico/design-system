import { newE2EPage } from '@stencil/core/testing';

describe('r-button e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-button>Click me</r-button>');

    const element = await page.find('r-button');
    expect(element).toHaveClass('hydrated');
  });

  it('handles click events', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-button>Click me</r-button>');

    const button = await page.find('r-button');
    const clickSpy = await page.spyOnEvent('rClick');

    await button.click();
    await page.waitForChanges();

    expect(clickSpy).toHaveReceivedEvent();
  });
});

