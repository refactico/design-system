import { newSpecPage } from '@stencil/core/testing';
import { RButtons } from './r-buttons';

describe('r-buttons', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RButtons],
      html: `<r-buttons></r-buttons>`,
    });
    expect(page.root).toEqualHtml(`
      <r-buttons>
        <ion-buttons></ion-buttons>
      </r-buttons>
    `);
  });

  it('renders with slot prop', async () => {
    const page = await newSpecPage({
      components: [RButtons],
      html: `<r-buttons slot="end"></r-buttons>`,
    });
    const buttons = page.root?.querySelector('ion-buttons');
    expect(buttons?.getAttribute('slot')).toBe('end');
  });

  it('renders with collapse prop', async () => {
    const page = await newSpecPage({
      components: [RButtons],
      html: `<r-buttons collapse></r-buttons>`,
    });
    const buttons = page.root?.querySelector('ion-buttons');
    expect(buttons?.hasAttribute('collapse')).toBe(true);
  });
});

