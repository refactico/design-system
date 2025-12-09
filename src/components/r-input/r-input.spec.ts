import { newSpecPage } from '@stencil/core/testing';
import { RInput } from './r-input';

describe('r-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RInput],
      html: `<r-input></r-input>`,
    });
    expect(page.root).toEqualHtml(`
      <r-input>
        <mock:shadow-root>
          <ion-item>
            <ion-input></ion-input>
          </ion-item>
        </mock:shadow-root>
      </r-input>
    `);
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [RInput],
      html: `<r-input label="Email"></r-input>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toBe('Email');
  });

  it('renders password type correctly', async () => {
    const page = await newSpecPage({
      components: [RInput],
      html: `<r-input type="password"></r-input>`,
    });
    const input = page.root?.querySelector('ion-input');
    expect(input?.getAttribute('type')).toBe('password');
  });
});

