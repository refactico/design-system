import { newSpecPage } from '@stencil/core/testing';
import { RButton } from './r-button';

describe('r-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RButton],
      html: `<r-button>Click me</r-button>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders with color', async () => {
    const page = await newSpecPage({
      components: [RButton],
      html: `<r-button color="primary">Click me</r-button>`,
    });
    const ionButton = page.root.querySelector('ion-button');
    expect(ionButton?.getAttribute('color')).toBe('primary');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [RButton],
      html: `<r-button disabled>Click me</r-button>`,
    });
    const ionButton = page.root.querySelector('ion-button');
    expect(ionButton).toHaveAttribute('disabled');
  });

  it('emits click event', async () => {
    const page = await newSpecPage({
      components: [RButton],
      html: `<r-button>Click me</r-button>`,
    });
    const ionButton = page.root.querySelector('ion-button');
    const clickSpy = jest.fn();
    page.doc.addEventListener('rClick', clickSpy);
    
    ionButton.click();
    await page.waitForChanges();
    
    expect(clickSpy).toHaveBeenCalled();
  });
});

