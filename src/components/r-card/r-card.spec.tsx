import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RCard } from './r-card';

describe('r-card', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card>Content</r-card>',
      });
      
      const card = page.root.querySelector('.r-card');
      expect(card).not.toBeNull();
    });

    it('should render body', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card>Content</r-card>',
      });
      
      const body = page.root.querySelector('.r-card__body');
      expect(body).not.toBeNull();
    });

    it('should render slot content in body', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card>Card Content</r-card>',
      });
      
      const body = page.root.querySelector('.r-card__body');
      expect(body.textContent).toContain('Card Content');
    });
  });

  // ==================== HEADER TESTS ====================
  describe('header', () => {
    it('should not render header by default', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card>Content</r-card>',
      });
      
      const header = page.root.querySelector('.r-card__header');
      expect(header).toBeNull();
    });

    it('should render header via prop', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card header="Card Title">Content</r-card>',
      });
      
      const header = page.root.querySelector('.r-card__header');
      expect(header).not.toBeNull();
      expect(header.textContent).toBe('Card Title');
    });

    it('should render header slot', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card><span slot="header">Slot Header</span>Content</r-card>',
      });
      
      const header = page.root.querySelector('.r-card__header');
      expect(header).not.toBeNull();
      
      const slotContent = page.root.querySelector('[slot="header"]');
      expect(slotContent.textContent).toBe('Slot Header');
    });

    it('should apply header class', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card header="Title" header-class="custom-header">Content</r-card>',
      });
      
      const header = page.root.querySelector('.r-card__header');
      expect(header.classList.contains('custom-header')).toBe(true);
    });
  });

  // ==================== FOOTER TESTS ====================
  describe('footer', () => {
    it('should not render footer by default', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card>Content</r-card>',
      });
      
      const footer = page.root.querySelector('.r-card__footer');
      expect(footer).toBeNull();
    });

    it('should render footer via prop', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card footer="Card Footer">Content</r-card>',
      });
      
      const footer = page.root.querySelector('.r-card__footer');
      expect(footer).not.toBeNull();
      expect(footer.textContent).toBe('Card Footer');
    });

    it('should render footer slot', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card><span slot="footer">Slot Footer</span>Content</r-card>',
      });
      
      const footer = page.root.querySelector('.r-card__footer');
      expect(footer).not.toBeNull();
      
      const slotContent = page.root.querySelector('[slot="footer"]');
      expect(slotContent.textContent).toBe('Slot Footer');
    });

    it('should apply footer class', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card footer="Footer" footer-class="custom-footer">Content</r-card>',
      });
      
      const footer = page.root.querySelector('.r-card__footer');
      expect(footer.classList.contains('custom-footer')).toBe(true);
    });
  });

  // ==================== BODY CLASS TESTS ====================
  describe('body class', () => {
    it('should apply body class', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card body-class="custom-body">Content</r-card>',
      });
      
      const body = page.root.querySelector('.r-card__body');
      expect(body.classList.contains('custom-body')).toBe(true);
    });
  });

  // ==================== SHADOW TESTS ====================
  describe('shadow', () => {
    it('should have always shadow by default', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card>Content</r-card>',
      });
      
      const card = page.root.querySelector('.r-card');
      expect(card.classList.contains('r-card--shadow-always')).toBe(true);
    });

    it('should have hover shadow', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card shadow="hover">Content</r-card>',
      });
      
      const card = page.root.querySelector('.r-card');
      expect(card.classList.contains('r-card--shadow-hover')).toBe(true);
    });

    it('should have never shadow', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card shadow="never">Content</r-card>',
      });
      
      const card = page.root.querySelector('.r-card');
      expect(card.classList.contains('r-card--shadow-never')).toBe(true);
    });
  });

  // ==================== COMBINED TESTS ====================
  describe('combined props', () => {
    it('should render with header, body, and footer', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: '<r-card header="Title" footer="Footer">Body Content</r-card>',
      });
      
      const header = page.root.querySelector('.r-card__header');
      const body = page.root.querySelector('.r-card__body');
      const footer = page.root.querySelector('.r-card__footer');
      
      expect(header).not.toBeNull();
      expect(body).not.toBeNull();
      expect(footer).not.toBeNull();
      
      expect(header.textContent).toBe('Title');
      expect(body.textContent).toContain('Body Content');
      expect(footer.textContent).toBe('Footer');
    });

    it('should render with all custom classes', async () => {
      page = await newSpecPage({
        components: [RCard],
        html: `
          <r-card 
            header="Title" 
            footer="Footer" 
            header-class="h-class" 
            body-class="b-class" 
            footer-class="f-class"
          >
            Content
          </r-card>
        `,
      });
      
      const header = page.root.querySelector('.r-card__header');
      const body = page.root.querySelector('.r-card__body');
      const footer = page.root.querySelector('.r-card__footer');
      
      expect(header.classList.contains('h-class')).toBe(true);
      expect(body.classList.contains('b-class')).toBe(true);
      expect(footer.classList.contains('f-class')).toBe(true);
    });
  });
});
