import { newSpecPage } from '@stencil/core/testing';
import { RTabBar } from './r-tab-bar';

describe('r-tab-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RTabBar],
      html: `<r-tab-bar></r-tab-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <r-tab-bar>
        <ion-tab-bar slot="bottom"></ion-tab-bar>
      </r-tab-bar>
    `);
  });

  it('renders with position', async () => {
    const page = await newSpecPage({
      components: [RTabBar],
      html: `<r-tab-bar position="top"></r-tab-bar>`,
    });
    const tabBar = page.root?.querySelector('ion-tab-bar');
    expect(tabBar?.getAttribute('slot')).toBe('top');
  });
});

