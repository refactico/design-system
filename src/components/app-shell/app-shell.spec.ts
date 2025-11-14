import { newSpecPage } from '@stencil/core/testing';
import { AppShell } from './app-shell';

describe('app-shell', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppShell],
      html: `<app-shell></app-shell>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders header and footer', async () => {
    const page = await newSpecPage({
      components: [AppShell],
      html: `<app-shell></app-shell>`,
    });
    const header = page.root.querySelector('.app-shell-header');
    const footer = page.root.querySelector('.app-shell-footer');
    expect(header).toBeTruthy();
    expect(footer).toBeTruthy();
  });
});

