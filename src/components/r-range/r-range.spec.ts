import { newSpecPage } from '@stencil/core/testing';
import { RRange } from './r-range';

describe('r-range', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range></r-range>`,
    });
    expect(page.root).toEqualHtml(`
      <r-range>
        <mock:shadow-root>
          <ion-item>
            <ion-range></ion-range>
          </ion-item>
        </mock:shadow-root>
      </r-range>
    `);
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range label="Volume"></r-range>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toContain('Volume');
  });

  it('renders with value', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range value="50"></r-range>`,
    });
    const range = page.root?.querySelector('ion-range');
    expect(range?.getAttribute('value')).toBe('50');
  });

  it('renders with min and max', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range min="0" max="100"></r-range>`,
    });
    const range = page.root?.querySelector('ion-range');
    expect(range?.getAttribute('min')).toBe('0');
    expect(range?.getAttribute('max')).toBe('100');
  });

  it('renders with step', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range step="5"></r-range>`,
    });
    const range = page.root?.querySelector('ion-range');
    expect(range?.getAttribute('step')).toBe('5');
  });

  it('renders with dual knobs', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range dual-knobs></r-range>`,
    });
    const range = page.root?.querySelector('ion-range');
    expect(range?.getAttribute('dual-knobs')).toBe('');
  });

  it('renders with pin', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range pin></r-range>`,
    });
    const range = page.root?.querySelector('ion-range');
    expect(range?.getAttribute('pin')).toBe('');
  });

  it('renders with snaps', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range snaps></r-range>`,
    });
    const range = page.root?.querySelector('ion-range');
    expect(range?.getAttribute('snaps')).toBe('');
  });

  it('renders with ticks', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range ticks></r-range>`,
    });
    const range = page.root?.querySelector('ion-range');
    expect(range?.getAttribute('ticks')).toBe('');
  });

  it('renders with error state', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range error error-text="Value is required"></r-range>`,
    });
    const item = page.root?.querySelector('ion-item');
    expect(item).toHaveClass('item-has-error');
    const errorNote = page.root?.querySelector('ion-note[slot="error"]');
    expect(errorNote?.textContent).toBe('Value is required');
  });

  it('renders with helper text', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range helper-text="Select a value between 0 and 100"></r-range>`,
    });
    const helperNote = page.root?.querySelector('ion-note[slot="helper"]');
    expect(helperNote?.textContent).toBe('Select a value between 0 and 100');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range disabled></r-range>`,
    });
    const range = page.root?.querySelector('ion-range');
    expect(range?.getAttribute('disabled')).toBe('');
  });

  it('renders required indicator', async () => {
    const page = await newSpecPage({
      components: [RRange],
      html: `<r-range label="Volume" required></r-range>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toContain('*');
  });
});

