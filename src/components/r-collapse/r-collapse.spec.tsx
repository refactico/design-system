import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RCollapse } from './r-collapse';
import { RCollapseItem } from '../r-collapse-item/r-collapse-item';

describe('r-collapse', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
            <r-collapse-item name="2" panel-title="Title 2">Content 2</r-collapse-item>
          </r-collapse>
        `,
      });
      
      const collapse = page.root.querySelector('.r-collapse');
      expect(collapse).not.toBeNull();
    });

    it('should render collapse items', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
            <r-collapse-item name="2" panel-title="Title 2">Content 2</r-collapse-item>
          </r-collapse>
        `,
      });
      
      const items = page.root.querySelectorAll('r-collapse-item');
      expect(items.length).toBe(2);
    });
  });

  // ==================== EXPAND ICON POSITION TESTS ====================
  describe('expand icon position', () => {
    it('should render right icon position by default', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      const collapse = page.root.querySelector('.r-collapse');
      expect(collapse.classList.contains('r-collapse--icon-right')).toBe(true);
    });

    it('should render left icon position', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse expand-icon-position="left">
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      const collapse = page.root.querySelector('.r-collapse');
      expect(collapse.classList.contains('r-collapse--icon-left')).toBe(true);
    });
  });

  // ==================== ACTIVE PANEL TESTS ====================
  describe('active panels', () => {
    it('should expand panel based on value', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse value="1">
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
            <r-collapse-item name="2" panel-title="Title 2">Content 2</r-collapse-item>
          </r-collapse>
        `,
      });
      
      await page.waitForChanges();
      
      const items = page.root.querySelectorAll('r-collapse-item');
      expect(items[0].classList.contains('r-collapse-item--active')).toBe(true);
      expect(items[1].classList.contains('r-collapse-item--active')).toBe(false);
    });

    it('should expand multiple panels with array value', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `<r-collapse><r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item><r-collapse-item name="2" panel-title="Title 2">Content 2</r-collapse-item></r-collapse>`,
      });
      
      page.rootInstance.value = ['1', '2'];
      await page.waitForChanges();
      
      const items = page.root.querySelectorAll('r-collapse-item');
      expect(items[0].classList.contains('r-collapse-item--active')).toBe(true);
      expect(items[1].classList.contains('r-collapse-item--active')).toBe(true);
    });
  });

  // ==================== ACCORDION MODE TESTS ====================
  describe('accordion mode', () => {
    it('should only allow one panel open in accordion mode', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse accordion value="1">
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
            <r-collapse-item name="2" panel-title="Title 2">Content 2</r-collapse-item>
          </r-collapse>
        `,
      });
      
      await page.waitForChanges();
      
      // Click on second item
      const items = page.root.querySelectorAll('r-collapse-item');
      const header = items[1].querySelector('.r-collapse-item__header') as HTMLElement;
      header.click();
      
      await page.waitForChanges();
      
      // First should be closed, second should be open
      expect(items[0].classList.contains('r-collapse-item--active')).toBe(false);
      expect(items[1].classList.contains('r-collapse-item--active')).toBe(true);
    });
  });

  // ==================== TOGGLE TESTS ====================
  describe('toggle', () => {
    it('should toggle panel on header click', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      await page.waitForChanges();
      
      const item = page.root.querySelector('r-collapse-item');
      const header = item.querySelector('.r-collapse-item__header') as HTMLElement;
      
      header.click();
      await page.waitForChanges();
      
      expect(item.classList.contains('r-collapse-item--active')).toBe(true);
      
      header.click();
      await page.waitForChanges();
      
      expect(item.classList.contains('r-collapse-item--active')).toBe(false);
    });
  });

  // ==================== DISABLED TESTS ====================
  describe('disabled', () => {
    it('should not toggle disabled panel', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1" disabled>Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      await page.waitForChanges();
      
      const item = page.root.querySelector('r-collapse-item');
      const header = item.querySelector('.r-collapse-item__header') as HTMLElement;
      
      header.click();
      await page.waitForChanges();
      
      expect(item.classList.contains('r-collapse-item--active')).toBe(false);
    });

    it('should add disabled class', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1" disabled>Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      const item = page.root.querySelector('r-collapse-item');
      expect(item.classList.contains('r-collapse-item--disabled')).toBe(true);
    });
  });

  // ==================== EVENT TESTS ====================
  describe('events', () => {
    it('should emit change event on toggle', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      await page.waitForChanges();
      
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const item = page.root.querySelector('r-collapse-item');
      const header = item.querySelector('.r-collapse-item__header') as HTMLElement;
      header.click();
      
      await page.waitForChanges();
      
      expect(changeSpy).toHaveBeenCalled();
    });
  });

  // ==================== METHOD TESTS ====================
  describe('methods', () => {
    it('should get active names via getActiveNames method', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse value="1">
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
            <r-collapse-item name="2" panel-title="Title 2">Content 2</r-collapse-item>
          </r-collapse>
        `,
      });
      
      await page.waitForChanges();
      
      const component = page.rootInstance;
      const activeNames = await component.getActiveNames();
      
      expect(activeNames).toEqual(['1']);
    });

    it('should set active names via setActiveNames method', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
            <r-collapse-item name="2" panel-title="Title 2">Content 2</r-collapse-item>
          </r-collapse>
        `,
      });
      
      await page.waitForChanges();
      
      const component = page.rootInstance;
      await component.setActiveNames(['1', '2']);
      
      await page.waitForChanges();
      
      const items = page.root.querySelectorAll('r-collapse-item');
      expect(items[0].classList.contains('r-collapse-item--active')).toBe(true);
      expect(items[1].classList.contains('r-collapse-item--active')).toBe(true);
    });
  });

  // ==================== KEYBOARD TESTS ====================
  describe('keyboard interaction', () => {
    it('should toggle on Enter key', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      await page.waitForChanges();
      
      const item = page.root.querySelector('r-collapse-item');
      const header = item.querySelector('.r-collapse-item__header') as HTMLElement;
      
      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();
      
      expect(item.classList.contains('r-collapse-item--active')).toBe(true);
    });

    it('should toggle on Space key', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      await page.waitForChanges();
      
      const item = page.root.querySelector('r-collapse-item');
      const header = item.querySelector('.r-collapse-item__header') as HTMLElement;
      
      header.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      await page.waitForChanges();
      
      expect(item.classList.contains('r-collapse-item--active')).toBe(true);
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe('accessibility', () => {
    it('should have role="button" on header', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      const header = page.root.querySelector('.r-collapse-item__header');
      expect(header.getAttribute('role')).toBe('button');
    });

    it('should have aria-expanded attribute', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse value="1">
            <r-collapse-item name="1" panel-title="Title 1">Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      await page.waitForChanges();
      
      const header = page.root.querySelector('.r-collapse-item__header');
      expect(header.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-disabled attribute when disabled', async () => {
      page = await newSpecPage({
        components: [RCollapse, RCollapseItem],
        html: `
          <r-collapse>
            <r-collapse-item name="1" panel-title="Title 1" disabled>Content 1</r-collapse-item>
          </r-collapse>
        `,
      });
      
      const header = page.root.querySelector('.r-collapse-item__header');
      expect(header.getAttribute('aria-disabled')).toBe('true');
    });
  });
});
