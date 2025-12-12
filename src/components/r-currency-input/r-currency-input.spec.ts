import { newSpecPage } from '@stencil/core/testing';
import { RCurrencyInput } from './r-currency-input';

describe('r-currency-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RCurrencyInput],
      html: `<r-currency-input></r-currency-input>`,
    });
    expect(page.root).toEqualHtml(`
      <r-currency-input>
        <mock:shadow-root>
          <ion-item>
            <ion-input></ion-input>
          </ion-item>
        </mock:shadow-root>
      </r-currency-input>
    `);
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [RCurrencyInput],
      html: `<r-currency-input label="Price"></r-currency-input>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toBe('Price');
  });

  it('renders with value', async () => {
    const page = await newSpecPage({
      components: [RCurrencyInput],
      html: `<r-currency-input value="100"></r-currency-input>`,
    });
    const input = page.root?.querySelector('ion-input');
    expect(input).not.toBeNull();
  });

  it('renders with currency code', async () => {
    const page = await newSpecPage({
      components: [RCurrencyInput],
      html: `<r-currency-input currency-code="EUR"></r-currency-input>`,
    });
    const component = page.rootInstance as RCurrencyInput;
    expect(component.currencyCode).toBe('EUR');
  });

  it('renders with precision', async () => {
    const page = await newSpecPage({
      components: [RCurrencyInput],
      html: `<r-currency-input precision="3"></r-currency-input>`,
    });
    const component = page.rootInstance as RCurrencyInput;
    expect(component.precision).toBe(3);
  });

  it('renders with error state', async () => {
    const page = await newSpecPage({
      components: [RCurrencyInput],
      html: `<r-currency-input error error-text="Invalid amount"></r-currency-input>`,
    });
    const item = page.root?.querySelector('ion-item');
    expect(item).toHaveClass('item-has-error');
    const errorNote = page.root?.querySelector('ion-note[slot="error"]');
    expect(errorNote?.textContent).toBe('Invalid amount');
  });

  it('renders with helper text', async () => {
    const page = await newSpecPage({
      components: [RCurrencyInput],
      html: `<r-currency-input helper-text="Enter amount in USD"></r-currency-input>`,
    });
    const helperNote = page.root?.querySelector('ion-note[slot="helper"]');
    expect(helperNote?.textContent).toBe('Enter amount in USD');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [RCurrencyInput],
      html: `<r-currency-input disabled></r-currency-input>`,
    });
    const input = page.root?.querySelector('ion-input');
    expect(input?.getAttribute('disabled')).toBe('');
  });

  it('renders readonly state', async () => {
    const page = await newSpecPage({
      components: [RCurrencyInput],
      html: `<r-currency-input readonly></r-currency-input>`,
    });
    const input = page.root?.querySelector('ion-input');
    expect(input?.getAttribute('readonly')).toBe('');
  });
});

