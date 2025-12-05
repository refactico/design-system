import { newSpecPage } from '@stencil/core/testing';
import { RDatepicker } from './r-datepicker';

describe('r-datepicker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RDatepicker],
      html: `<r-datepicker></r-datepicker>`,
    });
    expect(page.root).toEqualHtml(`
      <r-datepicker>
        <mock:shadow-root>
          <ion-item>
            <ion-datetime></ion-datetime>
          </ion-item>
        </mock:shadow-root>
      </r-datepicker>
    `);
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [RDatepicker],
      html: `<r-datepicker label="Date"></r-datepicker>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toBe('Date');
  });

  it('renders with placeholder', async () => {
    const page = await newSpecPage({
      components: [RDatepicker],
      html: `<r-datepicker placeholder="Select a date"></r-datepicker>`,
    });
    const datetime = page.root?.querySelector('ion-datetime');
    expect(datetime?.getAttribute('placeholder')).toBe('Select a date');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [RDatepicker],
      html: `<r-datepicker disabled></r-datepicker>`,
    });
    const datetime = page.root?.querySelector('ion-datetime');
    expect(datetime?.getAttribute('disabled')).toBe('');
  });

  it('renders error state', async () => {
    const page = await newSpecPage({
      components: [RDatepicker],
      html: `<r-datepicker error error-text="This field is required"></r-datepicker>`,
    });
    const item = page.root?.querySelector('ion-item');
    expect(item?.classList.contains('item-has-error')).toBe(true);
    const errorNote = page.root?.querySelector('ion-note[slot="error"]');
    expect(errorNote?.textContent).toBe('This field is required');
  });

  it('renders with presentation', async () => {
    const page = await newSpecPage({
      components: [RDatepicker],
      html: `<r-datepicker presentation="date"></r-datepicker>`,
    });
    const datetime = page.root?.querySelector('ion-datetime');
    expect(datetime?.getAttribute('presentation')).toBe('date');
  });
});

