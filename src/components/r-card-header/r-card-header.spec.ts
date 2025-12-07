import { newSpecPage } from '@stencil/core/testing';
import { RCardHeader } from './r-card-header';

describe('r-card-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RCardHeader],
      html: `<r-card-header></r-card-header>`,
    });
    expect(page.root).toEqualHtml(`
      <r-card-header>
        <ion-card-header></ion-card-header>
      </r-card-header>
    `);
  });

  it('renders with content', async () => {
    const page = await newSpecPage({
      components: [RCardHeader],
      html: `<r-card-header><r-card-title>Title</r-card-title></r-card-header>`,
    });
    const header = page.root?.querySelector('ion-card-header');
    expect(header).toBeTruthy();
  });
});

