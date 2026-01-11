import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RDropdownItem } from './r-dropdown-item';

describe('r-dropdown-item', () => {
  let page: SpecPage;

  const createDropdownItem = async (html: string) => {
    page = await newSpecPage({
      components: [RDropdownItem],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createDropdownItem('<r-dropdown-item></r-dropdown-item>');
      const item = page.root.querySelector('.r-dropdown-item');
      expect(item).toBeTruthy();
    });

    it('should render as li element', async () => {
      await createDropdownItem('<r-dropdown-item></r-dropdown-item>');
      const li = page.root.querySelector('li');
      expect(li).toBeTruthy();
    });

    it('should render slot content', async () => {
      await createDropdownItem('<r-dropdown-item>Menu Item</r-dropdown-item>');
      const item = page.root.querySelector('.r-dropdown-item');
      expect(item.textContent).toContain('Menu Item');
    });

    it('should have menuitem role', async () => {
      await createDropdownItem('<r-dropdown-item></r-dropdown-item>');
      const item = page.root.querySelector('.r-dropdown-item');
      expect(item.getAttribute('role')).toBe('menuitem');
    });
  });

  describe('command prop', () => {
    it('should accept string command', async () => {
      await createDropdownItem('<r-dropdown-item command="edit"></r-dropdown-item>');
      const component = page.rootInstance as RDropdownItem;
      expect(component.command).toBe('edit');
    });

    it('should accept number command', async () => {
      await createDropdownItem('<r-dropdown-item command="1"></r-dropdown-item>');
      const component = page.rootInstance as RDropdownItem;
      expect(component.command).toBe('1');
    });
  });

  describe('disabled prop', () => {
    it('should default to false', async () => {
      await createDropdownItem('<r-dropdown-item></r-dropdown-item>');
      const component = page.rootInstance as RDropdownItem;
      expect(component.disabled).toBe(false);
    });

    it('should apply disabled class', async () => {
      await createDropdownItem('<r-dropdown-item disabled="true"></r-dropdown-item>');
      const item = page.root.querySelector('.r-dropdown-item');
      expect(item).toHaveClass('r-dropdown-item--disabled');
    });

    it('should set tabindex to -1 when disabled', async () => {
      await createDropdownItem('<r-dropdown-item disabled="true"></r-dropdown-item>');
      const item = page.root.querySelector('.r-dropdown-item');
      expect(item.getAttribute('tabindex')).toBe('-1');
    });

    it('should set tabindex to 0 when not disabled', async () => {
      await createDropdownItem('<r-dropdown-item disabled="false"></r-dropdown-item>');
      const item = page.root.querySelector('.r-dropdown-item');
      expect(item.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('divided prop', () => {
    it('should default to false', async () => {
      await createDropdownItem('<r-dropdown-item></r-dropdown-item>');
      const component = page.rootInstance as RDropdownItem;
      expect(component.divided).toBe(false);
    });

    it('should apply divided class', async () => {
      await createDropdownItem('<r-dropdown-item divided="true"></r-dropdown-item>');
      const item = page.root.querySelector('.r-dropdown-item');
      expect(item).toHaveClass('r-dropdown-item--divided');
    });
  });

  describe('icon prop', () => {
    it('should render icon when provided', async () => {
      await createDropdownItem('<r-dropdown-item icon="✏️"></r-dropdown-item>');
      const icon = page.root.querySelector('.r-dropdown-item__icon');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toBe('✏️');
    });

    it('should not render icon element when not provided', async () => {
      await createDropdownItem('<r-dropdown-item></r-dropdown-item>');
      const icon = page.root.querySelector('.r-dropdown-item__icon');
      expect(icon).toBeFalsy();
    });
  });

  describe('icon slot', () => {
    it('should render icon slot content', async () => {
      await createDropdownItem('<r-dropdown-item><span slot="icon">🔧</span></r-dropdown-item>');
      const iconSlot = page.root.querySelector('[slot="icon"]');
      expect(iconSlot).toBeTruthy();
      expect(iconSlot.textContent).toBe('🔧');
    });
  });

  describe('click handling', () => {
    it('should emit itemClick event on click', async () => {
      await createDropdownItem('<r-dropdown-item command="edit"></r-dropdown-item>');
      const clickSpy = jest.fn();
      page.root.addEventListener('itemClick', clickSpy);
      
      const item = page.root.querySelector('.r-dropdown-item') as HTMLElement;
      item.click();
      await page.waitForChanges();
      
      expect(clickSpy).toHaveBeenCalled();
      expect(clickSpy.mock.calls[0][0].detail).toBe('edit');
    });

    it('should not emit event when disabled', async () => {
      await createDropdownItem('<r-dropdown-item command="edit" disabled="true"></r-dropdown-item>');
      const clickSpy = jest.fn();
      page.root.addEventListener('itemClick', clickSpy);
      
      const item = page.root.querySelector('.r-dropdown-item') as HTMLElement;
      item.click();
      await page.waitForChanges();
      
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should emit command value on click', async () => {
      await createDropdownItem('<r-dropdown-item command="delete"></r-dropdown-item>');
      const clickSpy = jest.fn();
      page.root.addEventListener('itemClick', clickSpy);
      
      const item = page.root.querySelector('.r-dropdown-item') as HTMLElement;
      item.click();
      await page.waitForChanges();
      
      expect(clickSpy.mock.calls[0][0].detail).toBe('delete');
    });
  });

  describe('combined states', () => {
    it('should handle disabled and divided', async () => {
      await createDropdownItem('<r-dropdown-item disabled="true" divided="true"></r-dropdown-item>');
      const item = page.root.querySelector('.r-dropdown-item');
      expect(item).toHaveClass('r-dropdown-item--disabled');
      expect(item).toHaveClass('r-dropdown-item--divided');
    });
  });

  describe('accessibility', () => {
    it('should have correct ARIA attributes', async () => {
      await createDropdownItem('<r-dropdown-item></r-dropdown-item>');
      const item = page.root.querySelector('.r-dropdown-item');
      expect(item.getAttribute('role')).toBe('menuitem');
      expect(item.getAttribute('tabindex')).toBe('0');
    });
  });
});
