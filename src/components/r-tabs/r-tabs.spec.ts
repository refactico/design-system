import { newSpecPage } from '@stencil/core/testing';
import { RTabs } from './r-tabs';

describe('r-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RTabs],
      html: `<r-tabs></r-tabs>`,
    });
    expect(page.root).toEqualHtml(`
      <r-tabs>
        <ion-tabs></ion-tabs>
      </r-tabs>
    `);
  });

  it('renders with color', async () => {
    const page = await newSpecPage({
      components: [RTabs],
      html: `<r-tabs color="primary"></r-tabs>`,
    });
    const tabs = page.root?.querySelector('ion-tabs');
    expect(tabs?.getAttribute('color')).toBe('primary');
  });
});

