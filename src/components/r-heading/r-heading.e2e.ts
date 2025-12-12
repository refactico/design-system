import { newE2EPage } from '@stencil/core/testing';

describe('r-heading e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-heading text="Test Heading"></r-heading>');
    const element = await page.find('r-heading');
    expect(element).toHaveClass('hydrated');
  });

  it('renders correct heading level', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-heading text="Heading" level="1"></r-heading>');
    const heading = await page.find('r-heading h1');
    expect(heading).not.toBeNull();
    expect(await heading.textContent).toBe('Heading');
  });

  it('renders with default level 2', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-heading text="Heading"></r-heading>');
    const heading = await page.find('r-heading h2');
    expect(heading).not.toBeNull();
  });

  it('renders all heading levels', async () => {
    const page = await newE2EPage();
    for (let level = 1; level <= 6; level++) {
      await page.setContent(`<r-heading text="Heading ${level}" level="${level}"></r-heading>`);
      const heading = await page.find(`r-heading h${level}`);
      expect(heading).not.toBeNull();
      expect(await heading.textContent).toBe(`Heading ${level}`);
    }
  });

  it('clamps invalid levels to valid range', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-heading text="Heading" level="0"></r-heading>');
    const heading = await page.find('r-heading h1');
    expect(heading).not.toBeNull();
  });

  it('renders slot content when no text prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<r-heading><strong>Bold Heading</strong></r-heading>');
    const heading = await page.find('r-heading h2');
    const strong = await heading.find('strong');
    expect(strong).not.toBeNull();
    expect(await strong.textContent).toBe('Bold Heading');
  });
});

