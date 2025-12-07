import { newSpecPage } from '@stencil/core/testing';
import { RAlert } from './r-alert';

describe('r-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RAlert],
      html: `<r-alert></r-alert>`,
    });
    expect(page.root).toEqualHtml(`
      <r-alert>
        <ion-alert></ion-alert>
      </r-alert>
    `);
  });

  it('renders with header', async () => {
    const page = await newSpecPage({
      components: [RAlert],
      html: `<r-alert header="Alert Title"></r-alert>`,
    });
    const alert = page.root?.querySelector('ion-alert');
    expect(alert?.getAttribute('header')).toBe('Alert Title');
  });

  it('renders with message', async () => {
    const page = await newSpecPage({
      components: [RAlert],
      html: `<r-alert message="This is an alert message"></r-alert>`,
    });
    const alert = page.root?.querySelector('ion-alert');
    expect(alert?.getAttribute('message')).toBe('This is an alert message');
  });

  it('renders with buttons as string', async () => {
    const page = await newSpecPage({
      components: [RAlert],
      html: `<r-alert buttons="OK"></r-alert>`,
    });
    const alert = page.root?.querySelector('ion-alert');
    expect(alert).toBeTruthy();
  });

  it('renders with buttons as array', async () => {
    const page = await newSpecPage({
      components: [RAlert],
      html: `<r-alert></r-alert>`,
    });
    const component = page.rootInstance as RAlert;
    component.buttons = [
      { text: 'Cancel', role: 'cancel' },
      { text: 'OK', role: 'confirm' },
    ];
    await page.waitForChanges();
    const alert = page.root?.querySelector('ion-alert');
    expect(alert).toBeTruthy();
  });
});

