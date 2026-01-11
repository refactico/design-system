import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RTabItem } from './r-tab-item';

describe('r-tab-item', () => {
  let page: SpecPage;

  const createTabItem = async (html: string) => {
    page = await newSpecPage({
      components: [RTabItem],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createTabItem('<r-tab-item></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem).toBeTruthy();
    });

    it('should render slot content', async () => {
      await createTabItem('<r-tab-item>Tab Label</r-tab-item>');
      const label = page.root.querySelector('.r-tab-item__label');
      expect(label.textContent).toContain('Tab Label');
    });

    it('should render label prop as fallback', async () => {
      await createTabItem('<r-tab-item label="My Tab"></r-tab-item>');
      const label = page.root.querySelector('.r-tab-item__label');
      expect(label.textContent).toContain('My Tab');
    });

    it('should have tab role', async () => {
      await createTabItem('<r-tab-item></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem.getAttribute('role')).toBe('tab');
    });
  });

  describe('name prop', () => {
    it('should accept name', async () => {
      await createTabItem('<r-tab-item name="tab1"></r-tab-item>');
      const component = page.rootInstance as RTabItem;
      expect(component.name).toBe('tab1');
    });
  });

  describe('label prop', () => {
    it('should display label text', async () => {
      await createTabItem('<r-tab-item label="Settings"></r-tab-item>');
      const label = page.root.querySelector('.r-tab-item__label');
      expect(label.textContent).toContain('Settings');
    });
  });

  describe('active prop', () => {
    it('should default to false', async () => {
      await createTabItem('<r-tab-item></r-tab-item>');
      const component = page.rootInstance as RTabItem;
      expect(component.active).toBe(false);
    });

    it('should apply active class when active', async () => {
      await createTabItem('<r-tab-item active="true"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem).toHaveClass('r-tab-item--active');
    });

    it('should set aria-selected to true when active', async () => {
      await createTabItem('<r-tab-item active="true"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem.getAttribute('aria-selected')).toBe('true');
    });

    it('should set aria-selected to false when inactive', async () => {
      await createTabItem('<r-tab-item active="false"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem.getAttribute('aria-selected')).toBe('false');
    });
  });

  describe('disabled prop', () => {
    it('should default to false', async () => {
      await createTabItem('<r-tab-item></r-tab-item>');
      const component = page.rootInstance as RTabItem;
      expect(component.disabled).toBe(false);
    });

    it('should apply disabled class', async () => {
      await createTabItem('<r-tab-item disabled="true"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem).toHaveClass('r-tab-item--disabled');
    });

    it('should set aria-disabled to true when disabled', async () => {
      await createTabItem('<r-tab-item disabled="true"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set tabindex to -1 when disabled', async () => {
      await createTabItem('<r-tab-item disabled="true"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem.getAttribute('tabindex')).toBe('-1');
    });

    it('should set tabindex to 0 when not disabled', async () => {
      await createTabItem('<r-tab-item disabled="false"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('closable prop', () => {
    it('should default to false', async () => {
      await createTabItem('<r-tab-item></r-tab-item>');
      const component = page.rootInstance as RTabItem;
      expect(component.closable).toBe(false);
    });

    it('should render close button when closable', async () => {
      await createTabItem('<r-tab-item closable="true"></r-tab-item>');
      const closeBtn = page.root.querySelector('.r-tab-item__close');
      expect(closeBtn).toBeTruthy();
    });

    it('should not render close button when not closable', async () => {
      await createTabItem('<r-tab-item closable="false"></r-tab-item>');
      const closeBtn = page.root.querySelector('.r-tab-item__close');
      expect(closeBtn).toBeFalsy();
    });

    it('should render close icon SVG', async () => {
      await createTabItem('<r-tab-item closable="true"></r-tab-item>');
      const svg = page.root.querySelector('.r-tab-item__close svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('type prop', () => {
    it('should default to line', async () => {
      await createTabItem('<r-tab-item></r-tab-item>');
      const component = page.rootInstance as RTabItem;
      expect(component.type).toBe('line');
    });

    it('should apply line type class', async () => {
      await createTabItem('<r-tab-item type="line"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem).toHaveClass('r-tab-item--line');
    });

    it('should apply card type class', async () => {
      await createTabItem('<r-tab-item type="card"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem).toHaveClass('r-tab-item--card');
    });

    it('should apply border-card type class', async () => {
      await createTabItem('<r-tab-item type="border-card"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem).toHaveClass('r-tab-item--border-card');
    });
  });

  describe('close event', () => {
    it('should emit close event when close button clicked', async () => {
      await createTabItem('<r-tab-item closable="true"></r-tab-item>');
      const closeSpy = jest.fn();
      page.root.addEventListener('close', closeSpy);
      
      const closeBtn = page.root.querySelector('.r-tab-item__close') as HTMLElement;
      closeBtn.click();
      await page.waitForChanges();
      
      expect(closeSpy).toHaveBeenCalled();
    });

    it('should stop propagation on close click', async () => {
      await createTabItem('<r-tab-item closable="true"></r-tab-item>');
      const closeSpy = jest.fn();
      page.root.addEventListener('close', closeSpy);
      
      const closeBtn = page.root.querySelector('.r-tab-item__close') as HTMLElement;
      const event = new MouseEvent('click', { bubbles: true });
      const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');
      closeBtn.dispatchEvent(event);
      await page.waitForChanges();
      
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });

  describe('combined states', () => {
    it('should handle active and disabled', async () => {
      await createTabItem('<r-tab-item active="true" disabled="true"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem).toHaveClass('r-tab-item--active');
      expect(tabItem).toHaveClass('r-tab-item--disabled');
    });

    it('should handle active and closable', async () => {
      await createTabItem('<r-tab-item active="true" closable="true"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem).toHaveClass('r-tab-item--active');
      const closeBtn = page.root.querySelector('.r-tab-item__close');
      expect(closeBtn).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have correct ARIA attributes', async () => {
      await createTabItem('<r-tab-item active="true" disabled="false"></r-tab-item>');
      const tabItem = page.root.querySelector('.r-tab-item');
      expect(tabItem.getAttribute('role')).toBe('tab');
      expect(tabItem.getAttribute('aria-selected')).toBe('true');
      expect(tabItem.getAttribute('aria-disabled')).toBe('false');
      expect(tabItem.getAttribute('tabindex')).toBe('0');
    });
  });
});
