import { newSpecPage } from '@stencil/core/testing';
import { RHeader } from './r-header';

describe('r-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RHeader],
      html: `<r-header></r-header>`,
    });
    expect(page.root).toEqualHtml(`
      <r-header>
        <ion-header>
          <ion-toolbar>
            <ion-title></ion-title>
          </ion-toolbar>
        </ion-header>
      </r-header>
    `);
  });

  it('renders with title', async () => {
    const page = await newSpecPage({
      components: [RHeader],
      html: `<r-header title="My Header"></r-header>`,
    });
    const title = page.root?.querySelector('ion-title');
    expect(title?.textContent).toBe('My Header');
  });

  it('renders with color', async () => {
    const page = await newSpecPage({
      components: [RHeader],
      html: `<r-header color="primary"></r-header>`,
    });
    const toolbar = page.root?.querySelector('ion-toolbar');
    expect(toolbar?.getAttribute('color')).toBe('primary');
  });

  it('renders without border when noBorder is true', async () => {
    const page = await newSpecPage({
      components: [RHeader],
      html: `<r-header no-border></r-header>`,
    });
    const header = page.root?.querySelector('ion-header');
    expect(header?.classList.contains('header-no-border')).toBe(true);
  });

  it('renders with translucent when set', async () => {
    const page = await newSpecPage({
      components: [RHeader],
      html: `<r-header translucent></r-header>`,
    });
    const header = page.root?.querySelector('ion-header');
    expect(header?.getAttribute('translucent')).toBe('');
  });
});

