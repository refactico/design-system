import { newSpecPage } from '@stencil/core/testing';
import { RToolbar } from './r-toolbar';

describe('r-toolbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RToolbar],
      html: `<r-toolbar></r-toolbar>`,
    });
    expect(page.root).toEqualHtml(`
      <r-toolbar>
        <ion-toolbar></ion-toolbar>
      </r-toolbar>
    `);
  });

  it('renders with color', async () => {
    const page = await newSpecPage({
      components: [RToolbar],
      html: `<r-toolbar color="primary"></r-toolbar>`,
    });
    const toolbar = page.root?.querySelector('ion-toolbar');
    expect(toolbar?.getAttribute('color')).toBe('primary');
  });

  it('renders without border when noBorder is true', async () => {
    const page = await newSpecPage({
      components: [RToolbar],
      html: `<r-toolbar no-border></r-toolbar>`,
    });
    const toolbar = page.root?.querySelector('ion-toolbar');
    expect(toolbar?.classList.contains('toolbar-no-border')).toBe(true);
  });

  it('renders with translucent when set', async () => {
    const page = await newSpecPage({
      components: [RToolbar],
      html: `<r-toolbar translucent></r-toolbar>`,
    });
    const toolbar = page.root?.querySelector('ion-toolbar');
    expect(toolbar?.getAttribute('translucent')).toBe('');
  });
});

