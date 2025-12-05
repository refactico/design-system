import { newE2EPage } from '@stencil/core/testing';

describe('r-datepicker e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <r-datepicker></r-datepicker>
    `);

    const element = await page.find('r-datepicker');
    expect(element).toHaveClass('hydrated');
  });

  it('handles change events', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <r-datepicker></r-datepicker>
    `);

    const datepicker = await page.find('r-datepicker');
    await page.spyOnEvent('rChange');

    const datetime = await page.find('ion-datetime');
    expect(datetime).toBeTruthy();
    expect(datepicker).toBeTruthy();
  });

  it('displays label correctly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <r-datepicker label="Birth Date"></r-datepicker>
    `);

    const label = await page.find('ion-label');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Birth Date');
  });
});

