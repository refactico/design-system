import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RSpinner } from './r-spinner';

describe('r-spinner', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner></r-spinner>',
      });
      
      const spinner = page.root.querySelector('.r-spinner');
      expect(spinner).not.toBeNull();
      expect(spinner.tagName.toLowerCase()).toBe('span');
    });

    it('should render SVG circle', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner></r-spinner>',
      });
      
      const svg = page.root.querySelector('.r-spinner__circle');
      expect(svg).not.toBeNull();
      
      const circle = page.root.querySelector('.r-spinner__path');
      expect(circle).not.toBeNull();
    });
  });

  // ==================== SIZE TESTS ====================
  describe('sizes', () => {
    it('should render default size', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner></r-spinner>',
      });
      
      const spinner = page.root.querySelector('.r-spinner');
      expect(spinner.classList.contains('r-spinner--default')).toBe(true);
      
      const svg = page.root.querySelector('.r-spinner__circle');
      expect(svg.getAttribute('width')).toBe('24');
      expect(svg.getAttribute('height')).toBe('24');
    });

    it('should render small size', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner size="small"></r-spinner>',
      });
      
      const spinner = page.root.querySelector('.r-spinner');
      expect(spinner.classList.contains('r-spinner--small')).toBe(true);
      
      const svg = page.root.querySelector('.r-spinner__circle');
      expect(svg.getAttribute('width')).toBe('16');
      expect(svg.getAttribute('height')).toBe('16');
    });

    it('should render large size', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner size="large"></r-spinner>',
      });
      
      const spinner = page.root.querySelector('.r-spinner');
      expect(spinner.classList.contains('r-spinner--large')).toBe(true);
      
      const svg = page.root.querySelector('.r-spinner__circle');
      expect(svg.getAttribute('width')).toBe('32');
      expect(svg.getAttribute('height')).toBe('32');
    });

    it('should render custom size', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner custom-size="48"></r-spinner>',
      });
      
      const spinner = page.root.querySelector('.r-spinner') as HTMLElement;
      expect(spinner.style.width).toBe('48px');
      expect(spinner.style.height).toBe('48px');
      
      const svg = page.root.querySelector('.r-spinner__circle');
      expect(svg.getAttribute('width')).toBe('48');
      expect(svg.getAttribute('height')).toBe('48');
    });
  });

  // ==================== COLOR TESTS ====================
  describe('colors', () => {
    const colors = ['primary', 'success', 'warning', 'danger', 'info', 'white'];

    colors.forEach(color => {
      it(`should render ${color} color`, async () => {
        page = await newSpecPage({
          components: [RSpinner],
          html: `<r-spinner color="${color}"></r-spinner>`,
        });
        
        const spinner = page.root.querySelector('.r-spinner');
        expect(spinner.classList.contains(`r-spinner--${color}`)).toBe(true);
      });
    });

    it('should render primary color by default', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner></r-spinner>',
      });
      
      const spinner = page.root.querySelector('.r-spinner');
      expect(spinner.classList.contains('r-spinner--primary')).toBe(true);
    });
  });

  // ==================== STROKE WIDTH TESTS ====================
  describe('stroke width', () => {
    it('should have default stroke width', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner></r-spinner>',
      });
      
      const circle = page.root.querySelector('.r-spinner__path');
      expect(circle.getAttribute('stroke-width')).toBe('4');
    });

    it('should apply custom stroke width', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner stroke-width="2"></r-spinner>',
      });
      
      const circle = page.root.querySelector('.r-spinner__path');
      expect(circle.getAttribute('stroke-width')).toBe('2');
    });
  });

  // ==================== SVG ATTRIBUTES TESTS ====================
  describe('SVG attributes', () => {
    it('should have correct viewBox', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner></r-spinner>',
      });
      
      const svg = page.root.querySelector('.r-spinner__circle');
      expect(svg.getAttribute('viewBox')).toBe('0 0 50 50');
    });

    it('should have correct circle attributes', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner></r-spinner>',
      });
      
      const circle = page.root.querySelector('.r-spinner__path');
      expect(circle.getAttribute('cx')).toBe('25');
      expect(circle.getAttribute('cy')).toBe('25');
      expect(circle.getAttribute('r')).toBe('20');
      expect(circle.getAttribute('fill')).toBe('none');
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe('accessibility', () => {
    it('should have role="status"', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner></r-spinner>',
      });
      
      const spinner = page.root.querySelector('.r-spinner');
      expect(spinner.getAttribute('role')).toBe('status');
    });

    it('should have aria-label', async () => {
      page = await newSpecPage({
        components: [RSpinner],
        html: '<r-spinner></r-spinner>',
      });
      
      const spinner = page.root.querySelector('.r-spinner');
      expect(spinner.getAttribute('aria-label')).toBe('Loading');
    });
  });
});
