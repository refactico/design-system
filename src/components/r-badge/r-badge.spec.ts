import { newSpecPage } from '@stencil/core/testing';
import { RBadge } from './r-badge';

describe('r-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RBadge],
      html: `<r-badge>5</r-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <r-badge>
        <ion-badge>5</ion-badge>
      </r-badge>
    `);
  });

  it('renders with color prop', async () => {
    const page = await newSpecPage({
      components: [RBadge],
      html: `<r-badge color="primary">5</r-badge>`,
    });
    const badge = page.root?.querySelector('ion-badge');
    expect(badge?.getAttribute('color')).toBe('primary');
  });

  it('renders with mode prop', async () => {
    const page = await newSpecPage({
      components: [RBadge],
      html: `<r-badge mode="ios">5</r-badge>`,
    });
    const badge = page.root?.querySelector('ion-badge');
    expect(badge?.getAttribute('mode')).toBe('ios');
  });
});

