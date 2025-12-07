import { newSpecPage } from '@stencil/core/testing';
import { RCard } from './r-card';

describe('r-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RCard],
      html: `<r-card></r-card>`,
    });
    expect(page.root).toEqualHtml(`
      <r-card>
        <ion-card></ion-card>
      </r-card>
    `);
  });

  it('renders with color', async () => {
    const page = await newSpecPage({
      components: [RCard],
      html: `<r-card color="primary"></r-card>`,
    });
    const card = page.root?.querySelector('ion-card');
    expect(card?.getAttribute('color')).toBe('primary');
  });

  it('renders as button when button prop is true', async () => {
    const page = await newSpecPage({
      components: [RCard],
      html: `<r-card button="true"></r-card>`,
    });
    const card = page.root?.querySelector('ion-card');
    expect(card?.getAttribute('button')).toBe('true');
  });

  it('renders with href when provided', async () => {
    const page = await newSpecPage({
      components: [RCard],
      html: `<r-card button="true" href="/test"></r-card>`,
    });
    const card = page.root?.querySelector('ion-card');
    expect(card?.getAttribute('href')).toBe('/test');
  });
});

