import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RDropdown } from './r-dropdown';
import { RDropdownMenu } from '../r-dropdown-menu/r-dropdown-menu';
import { RDropdownItem } from '../r-dropdown-item/r-dropdown-item';

describe('r-dropdown', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const dropdown = page.root.querySelector('.r-dropdown');
      expect(dropdown).not.toBeNull();
    });

    it('should render trigger element', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const trigger = page.root.querySelector('.r-dropdown__trigger');
      expect(trigger).not.toBeNull();
    });

    it('should render menu', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const menu = page.root.querySelector('.r-dropdown__menu');
      expect(menu).not.toBeNull();
    });
  });

  // ==================== VISIBILITY TESTS ====================
  describe('visibility', () => {
    it('should be hidden by default', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const menu = page.root.querySelector('.r-dropdown__menu');
      expect(menu.classList.contains('r-dropdown__menu--visible')).toBe(false);
    });

    it('should show on hover', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const dropdown = page.root.querySelector('.r-dropdown') as HTMLElement;
      dropdown.dispatchEvent(new MouseEvent('mouseenter'));
      
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      
      const menu = page.root.querySelector('.r-dropdown__menu');
      expect(menu.classList.contains('r-dropdown__menu--visible')).toBe(true);
    });

    it('should hide on mouse leave', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const dropdown = page.root.querySelector('.r-dropdown') as HTMLElement;
      dropdown.dispatchEvent(new MouseEvent('mouseleave'));
      
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      
      const menu = page.root.querySelector('.r-dropdown__menu');
      expect(menu.classList.contains('r-dropdown__menu--visible')).toBe(false);
    });
  });

  // ==================== TRIGGER TESTS ====================
  describe('trigger modes', () => {
    it('should show on click when trigger is click', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown trigger="click">
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const trigger = page.root.querySelector('.r-dropdown__trigger') as HTMLElement;
      trigger.click();
      
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should toggle on click when trigger is click', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown trigger="click">
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const trigger = page.root.querySelector('.r-dropdown__trigger') as HTMLElement;
      
      trigger.click();
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);
      
      trigger.click();
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(false);
    });

    it('should show on context menu when trigger is contextmenu', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown trigger="contextmenu">
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const dropdown = page.root.querySelector('.r-dropdown') as HTMLElement;
      const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
      dropdown.dispatchEvent(event);
      
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });
  });

  // ==================== PLACEMENT TESTS ====================
  describe('placement', () => {
    const placements = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'];

    placements.forEach(placement => {
      it(`should render ${placement} placement`, async () => {
        page = await newSpecPage({
          components: [RDropdown, RDropdownMenu, RDropdownItem],
          html: `
            <r-dropdown placement="${placement}">
              <button>Dropdown</button>
              <r-dropdown-menu slot="dropdown">
                <r-dropdown-item command="a">Action A</r-dropdown-item>
              </r-dropdown-menu>
            </r-dropdown>
          `,
        });
        
        const menu = page.root.querySelector('.r-dropdown__menu');
        expect(menu.classList.contains(`r-dropdown__menu--${placement}`)).toBe(true);
      });
    });
  });

  // ==================== DISABLED TESTS ====================
  describe('disabled', () => {
    it('should add disabled class', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown disabled>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const dropdown = page.root.querySelector('.r-dropdown');
      expect(dropdown.classList.contains('r-dropdown--disabled')).toBe(true);
    });

    it('should not show when disabled', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown disabled>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const dropdown = page.root.querySelector('.r-dropdown') as HTMLElement;
      dropdown.dispatchEvent(new MouseEvent('mouseenter'));
      
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });
  });

  // ==================== HIDE ON CLICK TESTS ====================
  describe('hide on click', () => {
    it('should hide on item click by default', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const item = page.root.querySelector('r-dropdown-item') as HTMLElement;
      item.dispatchEvent(new CustomEvent('itemClick', { detail: 'a', bubbles: true }));
      
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });

    it('should not hide on item click when hide-on-click is false', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown hide-on-click="false">
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const item = page.root.querySelector('r-dropdown-item') as HTMLElement;
      item.dispatchEvent(new CustomEvent('itemClick', { detail: 'a', bubbles: true }));
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });
  });

  // ==================== MAX HEIGHT TESTS ====================
  describe('max height', () => {
    it('should apply max height', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown max-height="200px">
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const menu = page.root.querySelector('.r-dropdown__menu') as HTMLElement;
      expect(menu.style.maxHeight).toBe('200px');
      expect(menu.style.overflowY).toBe('auto');
    });
  });

  // ==================== EVENT TESTS ====================
  describe('events', () => {
    it('should emit command event on item click', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="action-a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const commandSpy = jest.fn();
      page.root.addEventListener('command', commandSpy);
      
      const item = page.root.querySelector('r-dropdown-item') as HTMLElement;
      item.dispatchEvent(new CustomEvent('itemClick', { detail: 'action-a', bubbles: true }));
      
      expect(commandSpy).toHaveBeenCalled();
      expect(commandSpy.mock.calls[0][0].detail).toBe('action-a');
    });

    it('should emit visibleChange event', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown show-timeout="0">
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const visibleChangeSpy = jest.fn();
      page.root.addEventListener('visibleChange', visibleChangeSpy);
      
      // Use the show method which emits the event
      await page.rootInstance.show();
      await page.waitForChanges();
      
      // Wait for the timeout
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(visibleChangeSpy).toHaveBeenCalled();
      expect(visibleChangeSpy.mock.calls[0][0].detail).toBe(true);
    });
  });

  // ==================== METHOD TESTS ====================
  describe('methods', () => {
    it('should show via show method', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const component = page.rootInstance;
      await component.show();
      
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should hide via hide method', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown>
            <button>Dropdown</button>
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const component = page.rootInstance;
      await component.hide();
      
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });
  });

  // ==================== SPLIT BUTTON TESTS ====================
  describe('split button', () => {
    it('should render split button mode', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown split-button>
            Click me
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const dropdown = page.root.querySelector('.r-dropdown');
      expect(dropdown.classList.contains('r-dropdown--split')).toBe(true);
    });

    it('should emit click event on main button click in split mode', async () => {
      page = await newSpecPage({
        components: [RDropdown, RDropdownMenu, RDropdownItem],
        html: `
          <r-dropdown split-button>
            Click me
            <r-dropdown-menu slot="dropdown">
              <r-dropdown-item command="a">Action A</r-dropdown-item>
            </r-dropdown-menu>
          </r-dropdown>
        `,
      });
      
      const clickSpy = jest.fn();
      page.root.addEventListener('click', clickSpy);
      
      const mainButton = page.root.querySelector('r-button-group r-button') as HTMLElement;
      mainButton.click();
      
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
