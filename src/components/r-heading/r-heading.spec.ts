import { newSpecPage } from '@stencil/core/testing';
import { RHeading } from './r-heading';

describe('r-heading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RHeading],
      html: `<r-heading></r-heading>`,
    });
    expect(page.root).toEqualHtml(`
      <r-heading>
        <mock:shadow-root>
          <h2 class="r-heading r-heading-level-2"></h2>
        </mock:shadow-root>
      </r-heading>
    `);
  });

  it('renders with text prop', async () => {
    const page = await newSpecPage({
      components: [RHeading],
      html: `<r-heading text="Test Heading"></r-heading>`,
    });
    const heading = page.root?.querySelector('h2');
    expect(heading?.textContent).toBe('Test Heading');
  });

  it('renders with default level 2', async () => {
    const page = await newSpecPage({
      components: [RHeading],
      html: `<r-heading text="Heading"></r-heading>`,
    });
    const heading = page.root?.querySelector('h2');
    expect(heading).not.toBeNull();
  });

  it('renders with level 1', async () => {
    const page = await newSpecPage({
      components: [RHeading],
      html: `<r-heading text="Heading" level="1"></r-heading>`,
    });
    const heading = page.root?.querySelector('h1');
    expect(heading).not.toBeNull();
    expect(heading?.textContent).toBe('Heading');
  });

  it('renders with level 3', async () => {
    const page = await newSpecPage({
      components: [RHeading],
      html: `<r-heading text="Heading" level="3"></r-heading>`,
    });
    const heading = page.root?.querySelector('h3');
    expect(heading).not.toBeNull();
    expect(heading?.textContent).toBe('Heading');
  });

  it('clamps level to valid range (1-6)', async () => {
    const page = await newSpecPage({
      components: [RHeading],
      html: `<r-heading text="Heading" level="0"></r-heading>`,
    });
    const heading = page.root?.querySelector('h1');
    expect(heading).not.toBeNull();
  });

  it('clamps level to valid range (max 6)', async () => {
    const page = await newSpecPage({
      components: [RHeading],
      html: `<r-heading text="Heading" level="10"></r-heading>`,
    });
    const heading = page.root?.querySelector('h6');
    expect(heading).not.toBeNull();
  });

  it('renders with slot content', async () => {
    const page = await newSpecPage({
      components: [RHeading],
      html: `<r-heading><span>Slot Content</span></r-heading>`,
    });
    const heading = page.root?.querySelector('h2');
    const span = heading?.querySelector('span');
    expect(span?.textContent).toBe('Slot Content');
  });
});

