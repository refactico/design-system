import { newSpecPage } from '@stencil/core/testing';
import { RCardFooter } from './r-card-footer';

describe('r-card-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RCardFooter],
      html: `<r-card-footer>Footer</r-card-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <r-card-footer>
        <ion-card-footer>Footer</ion-card-footer>
      </r-card-footer>
    `);
  });
});

