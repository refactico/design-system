import { newSpecPage } from '@stencil/core/testing';
import { AppHome } from './app-home';

describe('app-home', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppHome],
      html: `<app-home></app-home>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('shows welcome message by default', async () => {
    const page = await newSpecPage({
      components: [AppHome],
      html: `<app-home></app-home>`,
    });
    const welcomeMessage = page.root.querySelector('.welcome-message');
    expect(welcomeMessage).toBeTruthy();
  });

  it('shows component list in sidebar', async () => {
    const page = await newSpecPage({
      components: [AppHome],
      html: `<app-home></app-home>`,
    });
    const componentList = page.root.querySelector('.menu-list');
    expect(componentList).toBeTruthy();
  });
});

