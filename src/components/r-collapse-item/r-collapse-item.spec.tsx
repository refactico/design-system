import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RCollapseItem } from './r-collapse-item';

describe('r-collapse-item', () => {
  let page: SpecPage;

  const createCollapseItem = async (html: string) => {
    page = await newSpecPage({
      components: [RCollapseItem],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      // With Host, the class is on the host element itself
      expect(page.root).toHaveClass('r-collapse-item');
    });

    it('should render header', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const header = page.root.querySelector('.r-collapse-item__header');
      expect(header).toBeTruthy();
    });

    it('should render content wrapper', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const wrap = page.root.querySelector('.r-collapse-item__wrap');
      expect(wrap).toBeTruthy();
    });

    it('should render slot content', async () => {
      await createCollapseItem('<r-collapse-item><p>Content</p></r-collapse-item>');
      const content = page.root.querySelector('.r-collapse-item__content p');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Content');
    });
  });

  describe('name prop', () => {
    it('should accept name', async () => {
      await createCollapseItem('<r-collapse-item name="item1"></r-collapse-item>');
      const component = page.rootInstance as RCollapseItem;
      expect(component.name).toBe('item1');
    });

    it('should default to empty string', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const component = page.rootInstance as RCollapseItem;
      expect(component.name).toBe('');
    });
  });

  describe('panelTitle prop', () => {
    it('should display panel title', async () => {
      await createCollapseItem('<r-collapse-item panel-title="Section 1"></r-collapse-item>');
      const title = page.root.querySelector('.r-collapse-item__title');
      expect(title.textContent).toContain('Section 1');
    });

    it('should default to empty string', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const component = page.rootInstance as RCollapseItem;
      expect(component.panelTitle).toBe('');
    });
  });

  describe('disabled prop', () => {
    it('should default to false', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const component = page.rootInstance as RCollapseItem;
      expect(component.disabled).toBe(false);
    });

    it('should apply disabled class', async () => {
      await createCollapseItem('<r-collapse-item disabled="true"></r-collapse-item>');
      // With Host, the class is on the host element itself
      expect(page.root).toHaveClass('r-collapse-item--disabled');
    });

    it('should set tabindex to -1 when disabled', async () => {
      await createCollapseItem('<r-collapse-item disabled="true"></r-collapse-item>');
      const header = page.root.querySelector('.r-collapse-item__header');
      expect(header.getAttribute('tabindex')).toBe('-1');
    });

    it('should set tabindex to 0 when not disabled', async () => {
      await createCollapseItem('<r-collapse-item disabled="false"></r-collapse-item>');
      const header = page.root.querySelector('.r-collapse-item__header');
      expect(header.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('isActive state', () => {
    it('should default to false', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const component = page.rootInstance as RCollapseItem;
      expect(component.isActive).toBe(false);
    });

    it('should apply active class when active', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const component = page.rootInstance as RCollapseItem;
      await component.setActive(true);
      await page.waitForChanges();
      
      // With Host, the class is on the host element itself
      expect(page.root).toHaveClass('r-collapse-item--active');
    });
  });

  describe('setActive method', () => {
    it('should set active state to true', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const component = page.rootInstance as RCollapseItem;
      await component.setActive(true);
      expect(component.isActive).toBe(true);
    });

    it('should set active state to false', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const component = page.rootInstance as RCollapseItem;
      await component.setActive(true);
      await component.setActive(false);
      expect(component.isActive).toBe(false);
    });
  });

  describe('getIsActive method', () => {
    it('should return current active state', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const component = page.rootInstance as RCollapseItem;
      expect(await component.getIsActive()).toBe(false);
      
      await component.setActive(true);
      expect(await component.getIsActive()).toBe(true);
    });
  });

  describe('click handling', () => {
    it('should emit itemToggle event on header click', async () => {
      await createCollapseItem('<r-collapse-item name="item1"></r-collapse-item>');
      const toggleSpy = jest.fn();
      page.root.addEventListener('itemToggle', toggleSpy);
      
      const header = page.root.querySelector('.r-collapse-item__header') as HTMLElement;
      header.click();
      await page.waitForChanges();
      
      expect(toggleSpy).toHaveBeenCalled();
      expect(toggleSpy.mock.calls[0][0].detail).toBe('item1');
    });

    it('should not emit event when disabled', async () => {
      await createCollapseItem('<r-collapse-item name="item1" disabled="true"></r-collapse-item>');
      const toggleSpy = jest.fn();
      page.root.addEventListener('itemToggle', toggleSpy);
      
      const header = page.root.querySelector('.r-collapse-item__header') as HTMLElement;
      header.click();
      await page.waitForChanges();
      
      expect(toggleSpy).not.toHaveBeenCalled();
    });
  });

  describe('keyboard handling', () => {
    it('should toggle on Enter key', async () => {
      await createCollapseItem('<r-collapse-item name="item1"></r-collapse-item>');
      const toggleSpy = jest.fn();
      page.root.addEventListener('itemToggle', toggleSpy);
      
      const header = page.root.querySelector('.r-collapse-item__header') as HTMLElement;
      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();
      
      expect(toggleSpy).toHaveBeenCalled();
    });

    it('should toggle on Space key', async () => {
      await createCollapseItem('<r-collapse-item name="item1"></r-collapse-item>');
      const toggleSpy = jest.fn();
      page.root.addEventListener('itemToggle', toggleSpy);
      
      const header = page.root.querySelector('.r-collapse-item__header') as HTMLElement;
      header.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      await page.waitForChanges();
      
      expect(toggleSpy).toHaveBeenCalled();
    });

    it('should not toggle on other keys', async () => {
      await createCollapseItem('<r-collapse-item name="item1"></r-collapse-item>');
      const toggleSpy = jest.fn();
      page.root.addEventListener('itemToggle', toggleSpy);
      
      const header = page.root.querySelector('.r-collapse-item__header') as HTMLElement;
      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      await page.waitForChanges();
      
      expect(toggleSpy).not.toHaveBeenCalled();
    });
  });

  describe('aria attributes', () => {
    it('should set aria-expanded to false when collapsed', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const header = page.root.querySelector('.r-collapse-item__header');
      expect(header.getAttribute('aria-expanded')).toBe('false');
    });

    it('should set aria-expanded to true when expanded', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const component = page.rootInstance as RCollapseItem;
      await component.setActive(true);
      await page.waitForChanges();
      
      const header = page.root.querySelector('.r-collapse-item__header');
      expect(header.getAttribute('aria-expanded')).toBe('true');
    });

    it('should set aria-disabled when disabled', async () => {
      await createCollapseItem('<r-collapse-item disabled="true"></r-collapse-item>');
      const header = page.root.querySelector('.r-collapse-item__header');
      expect(header.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have button role on header', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const header = page.root.querySelector('.r-collapse-item__header');
      expect(header.getAttribute('role')).toBe('button');
    });
  });

  describe('arrow icon', () => {
    it('should render default arrow icon', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const arrow = page.root.querySelector('.r-collapse-item__arrow');
      expect(arrow).toBeTruthy();
      const svg = arrow.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should render custom icon slot', async () => {
      await createCollapseItem('<r-collapse-item><span slot="icon">▶</span></r-collapse-item>');
      const iconSlot = page.root.querySelector('[slot="icon"]');
      expect(iconSlot).toBeTruthy();
      expect(iconSlot.textContent).toBe('▶');
    });
  });

  describe('title slot', () => {
    it('should render title slot content', async () => {
      await createCollapseItem('<r-collapse-item><span slot="title">Custom Title</span></r-collapse-item>');
      const titleSlot = page.root.querySelector('[slot="title"]');
      expect(titleSlot).toBeTruthy();
      expect(titleSlot.textContent).toBe('Custom Title');
    });

    it('should prefer title slot over panelTitle prop', async () => {
      await createCollapseItem('<r-collapse-item panel-title="Prop Title"><span slot="title">Slot Title</span></r-collapse-item>');
      const titleSlot = page.root.querySelector('[slot="title"]');
      expect(titleSlot).toBeTruthy();
      expect(titleSlot.textContent).toBe('Slot Title');
    });
  });

  describe('content height', () => {
    it('should set max-height to 0px when collapsed', async () => {
      await createCollapseItem('<r-collapse-item></r-collapse-item>');
      const wrap = page.root.querySelector('.r-collapse-item__wrap') as HTMLElement;
      expect(wrap.style.maxHeight).toBe('0px');
    });
  });
});
