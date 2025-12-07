import { newSpecPage } from '@stencil/core/testing';
import { RCardTitle } from './r-card-title';

describe('r-card-title', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RCardTitle],
      html: `<r-card-title>Title</r-card-title>`,
    });
    expect(page.root).toEqualHtml(`
      <r-card-title>
        <ion-card-title>Title</ion-card-title>
      </r-card-title>
    `);
  });

  it('renders with color', async () => {
    const page = await newSpecPage({
      components: [RCardTitle],
      html: `<r-card-title color="primary">Title</r-card-title>`,
    });
    const title = page.root?.querySelector('ion-card-title');
    expect(title?.getAttribute('color')).toBe('primary');
  });
});

