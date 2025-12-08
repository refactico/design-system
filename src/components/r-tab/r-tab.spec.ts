import { newSpecPage } from '@stencil/core/testing';
import { RTab } from './r-tab';

describe('r-tab', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RTab],
      html: `<r-tab tab="home"></r-tab>`,
    });
    expect(page.root).toEqualHtml(`
      <r-tab tab="home">
        <ion-tab tab="home"></ion-tab>
      </r-tab>
    `);
  });
});

