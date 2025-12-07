import { newSpecPage } from '@stencil/core/testing';
import { RCardContent } from './r-card-content';

describe('r-card-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RCardContent],
      html: `<r-card-content>Content</r-card-content>`,
    });
    expect(page.root).toEqualHtml(`
      <r-card-content>
        <ion-card-content>Content</ion-card-content>
      </r-card-content>
    `);
  });
});

