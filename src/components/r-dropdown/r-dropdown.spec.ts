import { newSpecPage } from '@stencil/core/testing';
import { RDropdown } from './r-dropdown';

describe('r-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RDropdown],
      html: `<r-dropdown></r-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <r-dropdown>
        <mock:shadow-root>
          <ion-item>
            <ion-select></ion-select>
          </ion-item>
        </mock:shadow-root>
      </r-dropdown>
    `);
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [RDropdown],
      html: `<r-dropdown label="Country"></r-dropdown>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toBe('Country');
  });

  it('renders with placeholder', async () => {
    const page = await newSpecPage({
      components: [RDropdown],
      html: `<r-dropdown placeholder="Select an option"></r-dropdown>`,
    });
    const select = page.root?.querySelector('ion-select');
    expect(select?.getAttribute('placeholder')).toBe('Select an option');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [RDropdown],
      html: `<r-dropdown disabled></r-dropdown>`,
    });
    const select = page.root?.querySelector('ion-select');
    expect(select?.getAttribute('disabled')).toBe('');
  });

  it('renders error state', async () => {
    const page = await newSpecPage({
      components: [RDropdown],
      html: `<r-dropdown error error-text="This field is required"></r-dropdown>`,
    });
    const item = page.root?.querySelector('ion-item');
    expect(item?.classList.contains('item-has-error')).toBe(true);
    const errorNote = page.root?.querySelector('ion-note[slot="error"]');
    expect(errorNote?.textContent).toBe('This field is required');
  });
});

