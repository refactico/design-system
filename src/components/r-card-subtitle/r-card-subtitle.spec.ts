import { newSpecPage } from '@stencil/core/testing';
import { RCardSubtitle } from './r-card-subtitle';

describe('r-card-subtitle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RCardSubtitle],
      html: `<r-card-subtitle>Subtitle</r-card-subtitle>`,
    });
    expect(page.root).toEqualHtml(`
      <r-card-subtitle>
        <ion-card-subtitle>Subtitle</ion-card-subtitle>
      </r-card-subtitle>
    `);
  });

  it('renders with color', async () => {
    const page = await newSpecPage({
      components: [RCardSubtitle],
      html: `<r-card-subtitle color="primary">Subtitle</r-card-subtitle>`,
    });
    const subtitle = page.root?.querySelector('ion-card-subtitle');
    expect(subtitle?.getAttribute('color')).toBe('primary');
  });
});

