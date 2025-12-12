import { newSpecPage } from '@stencil/core/testing';
import { RRadioGroup } from './r-radio-group';

describe('r-radio-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RRadioGroup],
      html: `<r-radio-group></r-radio-group>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [RRadioGroup],
      html: `<r-radio-group label="Choose Option"></r-radio-group>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toContain('Choose Option');
  });

  it('renders with options', async () => {
    const options = JSON.stringify([
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ]);
    const page = await newSpecPage({
      components: [RRadioGroup],
      html: `<r-radio-group options='${options}'></r-radio-group>`,
    });
    const radios = page.root?.querySelectorAll('ion-radio');
    expect(radios?.length).toBe(2);
  });

  it('shows required indicator when required', async () => {
    const page = await newSpecPage({
      components: [RRadioGroup],
      html: `<r-radio-group label="Required Field" required></r-radio-group>`,
    });
    const label = page.root?.querySelector('ion-label');
    expect(label?.textContent).toContain('*');
  });
});


