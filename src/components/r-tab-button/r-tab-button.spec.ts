import { newSpecPage } from '@stencil/core/testing';
import { RTabButton } from './r-tab-button';

describe('r-tab-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RTabButton],
      html: `<r-tab-button tab="home">Home</r-tab-button>`,
    });
    expect(page.root).toEqualHtml(`
      <r-tab-button tab="home">
        <ion-tab-button tab="home">Home</ion-tab-button>
      </r-tab-button>
    `);
  });

  it('renders with selected state', async () => {
    const page = await newSpecPage({
      components: [RTabButton],
      html: `<r-tab-button tab="home" selected>Home</r-tab-button>`,
    });
    const tabButton = page.root?.querySelector('ion-tab-button');
    expect(tabButton?.getAttribute('selected')).toBe('true');
  });
});

