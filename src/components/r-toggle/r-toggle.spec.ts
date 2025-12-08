import { newSpecPage } from '@stencil/core/testing';
import { RToggle } from './r-toggle';

describe('r-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RToggle],
      html: `<r-toggle>Label</r-toggle>`,
    });
    expect(page.root).toEqualHtml(`
      <r-toggle>
        <ion-toggle>Label</ion-toggle>
      </r-toggle>
    `);
  });

  it('renders with checked state', async () => {
    const page = await newSpecPage({
      components: [RToggle],
      html: `<r-toggle checked>Label</r-toggle>`,
    });
    const toggle = page.root?.querySelector('ion-toggle');
    expect(toggle?.getAttribute('checked')).toBe('true');
  });

  it('renders with disabled state', async () => {
    const page = await newSpecPage({
      components: [RToggle],
      html: `<r-toggle disabled>Label</r-toggle>`,
    });
    const toggle = page.root?.querySelector('ion-toggle');
    expect(toggle?.getAttribute('disabled')).toBe('true');
  });

  it('renders with color', async () => {
    const page = await newSpecPage({
      components: [RToggle],
      html: `<r-toggle color="primary">Label</r-toggle>`,
    });
    const toggle = page.root?.querySelector('ion-toggle');
    expect(toggle?.getAttribute('color')).toBe('primary');
  });

  it('renders as form field', async () => {
    const page = await newSpecPage({
      components: [RToggle],
      html: `<r-toggle form-field label="Test Label">Label</r-toggle>`,
    });
    const item = page.root?.querySelector('ion-item');
    expect(item).toBeTruthy();
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toBe('Test Label');
  });

  it('renders with enableOnOffLabels', async () => {
    const page = await newSpecPage({
      components: [RToggle],
      html: `<r-toggle enable-on-off-labels>Label</r-toggle>`,
    });
    const toggle = page.root?.querySelector('ion-toggle');
    expect(toggle?.getAttribute('enable-on-off-labels')).toBe('true');
  });

  it('emits rChange event', async () => {
    const page = await newSpecPage({
      components: [RToggle],
      html: `<r-toggle>Label</r-toggle>`,
    });
    const toggle = page.rootInstance as RToggle;
    const changeSpy = jest.fn();
    page.root?.addEventListener('rChange', changeSpy);

    const ionToggle = page.root?.querySelector('ion-toggle');
    ionToggle?.dispatchEvent(new CustomEvent('ionChange', { detail: { checked: true } }));
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalled();
    expect(toggle.checked).toBe(true);
  });
});

