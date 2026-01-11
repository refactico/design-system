import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RTooltip } from './r-tooltip';

describe('r-tooltip', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip text"><button>Hover me</button></r-tooltip>',
      });
      
      const tooltip = page.root.querySelector('.r-tooltip');
      expect(tooltip).not.toBeNull();
    });

    it('should render trigger element', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip text"><button>Hover me</button></r-tooltip>',
      });
      
      const trigger = page.root.querySelector('.r-tooltip__trigger');
      expect(trigger).not.toBeNull();
    });

    it('should render tooltip content element', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip text"><button>Hover me</button></r-tooltip>',
      });
      
      const content = page.root.querySelector('.r-tooltip__content');
      expect(content).not.toBeNull();
    });

    it('should render slot content in trigger', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip text"><button>Hover me</button></r-tooltip>',
      });
      
      const button = page.root.querySelector('button');
      expect(button).not.toBeNull();
      expect(button.textContent).toBe('Hover me');
    });

    it('should render content text', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip text"><button>Hover me</button></r-tooltip>',
      });
      
      const content = page.root.querySelector('.r-tooltip__content');
      expect(content.textContent).toContain('Tooltip text');
    });
  });

  // ==================== VISIBILITY TESTS ====================
  describe('visibility', () => {
    it('should be hidden by default', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip text"><button>Hover me</button></r-tooltip>',
      });
      
      const content = page.root.querySelector('.r-tooltip__content');
      expect(content.classList.contains('r-tooltip__content--visible')).toBe(false);
    });

    it('should show on hover', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip text"><button>Hover me</button></r-tooltip>',
      });
      
      const tooltip = page.root.querySelector('.r-tooltip') as HTMLElement;
      tooltip.dispatchEvent(new MouseEvent('mouseenter'));
      
      // Wait for show delay
      await new Promise(resolve => setTimeout(resolve, 50));
      await page.waitForChanges();
      
      const content = page.root.querySelector('.r-tooltip__content');
      expect(content.classList.contains('r-tooltip__content--visible')).toBe(true);
    });

    it('should hide on mouse leave', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip text"><button>Hover me</button></r-tooltip>',
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const tooltip = page.root.querySelector('.r-tooltip') as HTMLElement;
      tooltip.dispatchEvent(new MouseEvent('mouseleave'));
      
      // Wait for hide delay
      await new Promise(resolve => setTimeout(resolve, 250));
      await page.waitForChanges();
      
      const content = page.root.querySelector('.r-tooltip__content');
      expect(content.classList.contains('r-tooltip__content--visible')).toBe(false);
    });
  });

  // ==================== PLACEMENT TESTS ====================
  describe('placement', () => {
    const placements = ['top', 'bottom', 'left', 'right'];

    placements.forEach(placement => {
      it(`should render ${placement} placement`, async () => {
        page = await newSpecPage({
          components: [RTooltip],
          html: `<r-tooltip content="Tooltip" placement="${placement}"><button>Hover</button></r-tooltip>`,
        });
        
        const content = page.root.querySelector('.r-tooltip__content');
        expect(content.classList.contains(`r-tooltip__content--${placement}`)).toBe(true);
      });
    });
  });

  // ==================== EFFECT TESTS ====================
  describe('effect', () => {
    it('should render dark effect by default', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip"><button>Hover</button></r-tooltip>',
      });
      
      const content = page.root.querySelector('.r-tooltip__content');
      expect(content.classList.contains('r-tooltip__content--dark')).toBe(true);
    });

    it('should render light effect', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" effect="light"><button>Hover</button></r-tooltip>',
      });
      
      const content = page.root.querySelector('.r-tooltip__content');
      expect(content.classList.contains('r-tooltip__content--light')).toBe(true);
    });
  });

  // ==================== DISABLED TESTS ====================
  describe('disabled', () => {
    it('should not show when disabled', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" disabled><button>Hover</button></r-tooltip>',
      });
      
      const tooltip = page.root.querySelector('.r-tooltip') as HTMLElement;
      tooltip.dispatchEvent(new MouseEvent('mouseenter'));
      
      await new Promise(resolve => setTimeout(resolve, 50));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });

    it('should add disabled class', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" disabled><button>Hover</button></r-tooltip>',
      });
      
      const tooltip = page.root.querySelector('.r-tooltip');
      expect(tooltip.classList.contains('r-tooltip--disabled')).toBe(true);
    });
  });

  // ==================== TRIGGER TESTS ====================
  describe('trigger modes', () => {
    it('should show on hover by default', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip"><button>Hover</button></r-tooltip>',
      });
      
      const tooltip = page.root.querySelector('.r-tooltip') as HTMLElement;
      tooltip.dispatchEvent(new MouseEvent('mouseenter'));
      
      await new Promise(resolve => setTimeout(resolve, 50));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should show on click when trigger is click', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" trigger="click"><button>Click</button></r-tooltip>',
      });
      
      const trigger = page.root.querySelector('.r-tooltip__trigger') as HTMLElement;
      trigger.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should toggle on click when trigger is click', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" trigger="click"><button>Click</button></r-tooltip>',
      });
      
      const trigger = page.root.querySelector('.r-tooltip__trigger') as HTMLElement;
      
      trigger.click();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);
      
      trigger.click();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(false);
    });

    it('should show on focus when trigger is focus', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" trigger="focus"><button>Focus</button></r-tooltip>',
      });
      
      const trigger = page.root.querySelector('.r-tooltip__trigger') as HTMLElement;
      trigger.dispatchEvent(new FocusEvent('focus'));
      
      await new Promise(resolve => setTimeout(resolve, 50));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should hide on blur when trigger is focus', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" trigger="focus"><button>Focus</button></r-tooltip>',
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const trigger = page.root.querySelector('.r-tooltip__trigger') as HTMLElement;
      trigger.dispatchEvent(new FocusEvent('blur'));
      
      await new Promise(resolve => setTimeout(resolve, 250));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });
  });

  // ==================== DELAY TESTS ====================
  describe('delays', () => {
    it('should respect show delay', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" show-delay="100"><button>Hover</button></r-tooltip>',
      });
      
      const tooltip = page.root.querySelector('.r-tooltip') as HTMLElement;
      tooltip.dispatchEvent(new MouseEvent('mouseenter'));
      
      // Should not be visible immediately
      expect(page.rootInstance.visible).toBe(false);
      
      // Wait for delay
      await new Promise(resolve => setTimeout(resolve, 150));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should respect hide delay', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" hide-delay="100"><button>Hover</button></r-tooltip>',
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const tooltip = page.root.querySelector('.r-tooltip') as HTMLElement;
      tooltip.dispatchEvent(new MouseEvent('mouseleave'));
      
      // Should still be visible immediately
      expect(page.rootInstance.visible).toBe(true);
      
      // Wait for delay
      await new Promise(resolve => setTimeout(resolve, 150));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });
  });

  // ==================== ENTERABLE TESTS ====================
  describe('enterable', () => {
    it('should keep tooltip visible when mouse enters content', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" enterable><button>Hover</button></r-tooltip>',
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const content = page.root.querySelector('.r-tooltip__content') as HTMLElement;
      content.dispatchEvent(new MouseEvent('mouseenter'));
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should add enterable class', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" enterable><button>Hover</button></r-tooltip>',
      });
      
      const content = page.root.querySelector('.r-tooltip__content');
      expect(content.classList.contains('r-tooltip__content--enterable')).toBe(true);
    });
  });

  // ==================== ARROW TESTS ====================
  describe('arrow', () => {
    it('should show arrow by default', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip"><button>Hover</button></r-tooltip>',
      });
      
      const arrow = page.root.querySelector('.r-tooltip__arrow');
      expect(arrow).not.toBeNull();
    });

    it('should hide arrow when show-arrow is false', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" show-arrow="false"><button>Hover</button></r-tooltip>',
      });
      
      const arrow = page.root.querySelector('.r-tooltip__arrow');
      expect(arrow).toBeNull();
    });
  });

  // ==================== RAW CONTENT TESTS ====================
  describe('raw content', () => {
    it('should render HTML when raw-content is true', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="<strong>Bold</strong>" raw-content><button>Hover</button></r-tooltip>',
      });
      
      const content = page.root.querySelector('.r-tooltip__content');
      const strong = content.querySelector('strong');
      expect(strong).not.toBeNull();
    });
  });

  // ==================== MAX WIDTH TESTS ====================
  describe('max width', () => {
    it('should apply max width', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" max-width="200"><button>Hover</button></r-tooltip>',
      });
      
      const content = page.root.querySelector('.r-tooltip__content') as HTMLElement;
      expect(content.style.maxWidth).toBe('200px');
    });

    it('should add wrap class when max-width is set', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" max-width="200"><button>Hover</button></r-tooltip>',
      });
      
      const content = page.root.querySelector('.r-tooltip__content');
      expect(content.classList.contains('r-tooltip__content--wrap')).toBe(true);
    });
  });

  // ==================== CONTENT SLOT TESTS ====================
  describe('content slot', () => {
    it('should render content slot', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: `
          <r-tooltip>
            <button>Hover</button>
            <span slot="content">Custom content</span>
          </r-tooltip>
        `,
      });
      
      const slotContent = page.root.querySelector('[slot="content"]');
      expect(slotContent).not.toBeNull();
      expect(slotContent.textContent).toBe('Custom content');
    });
  });

  // ==================== METHOD TESTS ====================
  describe('methods', () => {
    it('should show via show method', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip"><button>Hover</button></r-tooltip>',
      });
      
      const component = page.rootInstance;
      await component.show();
      
      await new Promise(resolve => setTimeout(resolve, 50));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should hide via hide method', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip"><button>Hover</button></r-tooltip>',
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const component = page.rootInstance;
      await component.hide();
      
      await new Promise(resolve => setTimeout(resolve, 250));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });

    it('should not show via show method when disabled', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip" disabled><button>Hover</button></r-tooltip>',
      });
      
      const component = page.rootInstance;
      await component.show();
      
      await new Promise(resolve => setTimeout(resolve, 50));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe('accessibility', () => {
    it('should have role="tooltip"', async () => {
      page = await newSpecPage({
        components: [RTooltip],
        html: '<r-tooltip content="Tooltip"><button>Hover</button></r-tooltip>',
      });
      
      const content = page.root.querySelector('.r-tooltip__content');
      expect(content.getAttribute('role')).toBe('tooltip');
    });
  });
});
