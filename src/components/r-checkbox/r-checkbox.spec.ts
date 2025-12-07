import { newSpecPage } from '@stencil/core/testing';
import { RCheckbox } from './r-checkbox';

describe('r-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RCheckbox],
      html: `<r-checkbox>Label</r-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <r-checkbox>
        <ion-checkbox>Label</ion-checkbox>
      </r-checkbox>
    `);
  });

  it('renders with checked state', async () => {
    const page = await newSpecPage({
      components: [RCheckbox],
      html: `<r-checkbox checked>Label</r-checkbox>`,
    });
    const checkbox = page.root?.querySelector('ion-checkbox');
    expect(checkbox?.getAttribute('checked')).toBe('true');
  });

  it('renders with disabled state', async () => {
    const page = await newSpecPage({
      components: [RCheckbox],
      html: `<r-checkbox disabled>Label</r-checkbox>`,
    });
    const checkbox = page.root?.querySelector('ion-checkbox');
    expect(checkbox?.getAttribute('disabled')).toBe('true');
  });

  it('renders with color', async () => {
    const page = await newSpecPage({
      components: [RCheckbox],
      html: `<r-checkbox color="primary">Label</r-checkbox>`,
    });
    const checkbox = page.root?.querySelector('ion-checkbox');
    expect(checkbox?.getAttribute('color')).toBe('primary');
  });

  it('renders as form field', async () => {
    const page = await newSpecPage({
      components: [RCheckbox],
      html: `<r-checkbox form-field label="Test Label">Label</r-checkbox>`,
    });
    const item = page.root?.querySelector('ion-item');
    expect(item).toBeTruthy();
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toBe('Test Label');
  });

  it('renders with indeterminate state', async () => {
    const page = await newSpecPage({
      components: [RCheckbox],
      html: `<r-checkbox indeterminate>Label</r-checkbox>`,
    });
    const checkbox = page.root?.querySelector('ion-checkbox');
    expect(checkbox?.getAttribute('indeterminate')).toBe('true');
  });

  it('emits rChange event', async () => {
    const page = await newSpecPage({
      components: [RCheckbox],
      html: `<r-checkbox>Label</r-checkbox>`,
    });
    const checkbox = page.rootInstance as RCheckbox;
    const changeSpy = jest.fn();
    page.root?.addEventListener('rChange', changeSpy);

    const ionCheckbox = page.root?.querySelector('ion-checkbox');
    ionCheckbox?.dispatchEvent(new CustomEvent('ionChange', { detail: { checked: true } }));
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalled();
    expect(checkbox.checked).toBe(true);
  });
});

