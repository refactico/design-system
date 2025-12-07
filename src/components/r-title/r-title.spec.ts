import { newSpecPage } from '@stencil/core/testing';
import { RTitle } from './r-title';

describe('r-title', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RTitle],
      html: `<r-title></r-title>`,
    });
    expect(page.root).toEqualHtml(`
      <r-title>
        <ion-title></ion-title>
      </r-title>
    `);
  });

  it('renders with text prop', async () => {
    const page = await newSpecPage({
      components: [RTitle],
      html: `<r-title text="My Title"></r-title>`,
    });
    const title = page.root?.querySelector('ion-title');
    expect(title?.textContent).toBe('My Title');
  });

  it('renders with slot content', async () => {
    const page = await newSpecPage({
      components: [RTitle],
      html: `<r-title>Slot Title</r-title>`,
    });
    const title = page.root?.querySelector('ion-title');
    expect(title?.textContent).toBe('Slot Title');
  });

  it('renders with size prop', async () => {
    const page = await newSpecPage({
      components: [RTitle],
      html: `<r-title size="large"></r-title>`,
    });
    const title = page.root?.querySelector('ion-title');
    expect(title?.getAttribute('size')).toBe('large');
  });

  it('prioritizes text prop over slot', async () => {
    const page = await newSpecPage({
      components: [RTitle],
      html: `<r-title text="Prop Title">Slot Title</r-title>`,
    });
    const title = page.root?.querySelector('ion-title');
    expect(title?.textContent).toBe('Prop Title');
  });
});

