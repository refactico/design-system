import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RBadge } from './r-badge';

describe('r-badge', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="5"><button>Button</button></r-badge>',
      });
      
      const badge = page.root.querySelector('.r-badge');
      expect(badge).not.toBeNull();
    });

    it('should render slot content', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="5"><button>Button</button></r-badge>',
      });
      
      const button = page.root.querySelector('button');
      expect(button).not.toBeNull();
      expect(button.textContent).toBe('Button');
    });

    it('should render badge content', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="5"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content).not.toBeNull();
      expect(content.textContent).toBe('5');
    });
  });

  // ==================== VALUE TESTS ====================
  describe('value', () => {
    it('should display numeric value', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="10"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content.textContent).toBe('10');
    });

    it('should display string value', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="new"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content.textContent).toBe('new');
    });

    it('should display max+ when value exceeds max', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="100" max="99"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content.textContent).toBe('99+');
    });

    it('should display exact value when under max', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="50" max="99"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content.textContent).toBe('50');
    });
  });

  // ==================== TYPE TESTS ====================
  describe('types', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info'];

    types.forEach(type => {
      it(`should render ${type} type`, async () => {
        page = await newSpecPage({
          components: [RBadge],
          html: `<r-badge value="5" type="${type}"><button>Button</button></r-badge>`,
        });
        
        const content = page.root.querySelector('.r-badge__content');
        expect(content.classList.contains(`r-badge__content--${type}`)).toBe(true);
      });
    });

    it('should render danger type by default', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="5"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content.classList.contains('r-badge__content--danger')).toBe(true);
    });
  });

  // ==================== DOT TESTS ====================
  describe('is-dot', () => {
    it('should not be dot by default', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="5"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content.classList.contains('r-badge__content--dot')).toBe(false);
    });

    it('should render as dot when is-dot is true', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge is-dot><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content.classList.contains('r-badge__content--dot')).toBe(true);
    });

    it('should not display value when is-dot is true', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge is-dot value="5"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content.textContent).toBe('');
    });
  });

  // ==================== HIDDEN TESTS ====================
  describe('hidden', () => {
    it('should show badge by default', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="5"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content).not.toBeNull();
    });

    it('should hide badge when hidden is true', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="5" hidden><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content).toBeNull();
    });
  });

  // ==================== SHOW ZERO TESTS ====================
  describe('show-zero', () => {
    it('should show zero by default', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="0"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content).not.toBeNull();
      expect(content.textContent).toBe('0');
    });

    it('should hide zero when show-zero is false', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="0" show-zero="false"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content).toBeNull();
    });
  });

  // ==================== CUSTOM COLOR TESTS ====================
  describe('custom color', () => {
    it('should apply custom background color', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="5" color="#ff0000"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content') as HTMLElement;
      expect(content.style.backgroundColor).toBe('#ff0000');
    });
  });

  // ==================== OFFSET TESTS ====================
  describe('offset', () => {
    it('should apply offset', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="5"><button>Button</button></r-badge>',
      });
      
      page.rootInstance.offset = [10, 5];
      await page.waitForChanges();
      
      const content = page.root.querySelector('.r-badge__content') as HTMLElement;
      expect(content.style.marginTop).toBe('5px');
      expect(content.style.marginRight).toBe('-10px');
    });
  });

  // ==================== CONTENT SLOT TESTS ====================
  describe('content slot', () => {
    it('should render content slot', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: `
          <r-badge>
            <button>Button</button>
            <span slot="content">Custom</span>
          </r-badge>
        `,
      });
      
      const slotContent = page.root.querySelector('[slot="content"]');
      expect(slotContent).not.toBeNull();
      expect(slotContent.textContent).toBe('Custom');
    });
  });

  // ==================== FIXED POSITION TESTS ====================
  describe('fixed position', () => {
    it('should have fixed class', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value="5"><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content.classList.contains('r-badge__content--fixed')).toBe(true);
    });
  });

  // ==================== EMPTY VALUE TESTS ====================
  describe('empty value', () => {
    it('should not show badge when value is empty string', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge value=""><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content).toBeNull();
    });

    it('should not show badge when value is undefined', async () => {
      page = await newSpecPage({
        components: [RBadge],
        html: '<r-badge><button>Button</button></r-badge>',
      });
      
      const content = page.root.querySelector('.r-badge__content');
      expect(content).toBeNull();
    });
  });
});
