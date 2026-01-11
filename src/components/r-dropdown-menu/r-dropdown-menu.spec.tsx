import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RDropdownMenu } from './r-dropdown-menu';
import { RDropdownItem } from '../r-dropdown-item/r-dropdown-item';

describe('r-dropdown-menu', () => {
  let page: SpecPage;

  const createDropdownMenu = async (html: string) => {
    page = await newSpecPage({
      components: [RDropdownMenu, RDropdownItem],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createDropdownMenu('<r-dropdown-menu></r-dropdown-menu>');
      const menu = page.root.querySelector('.r-dropdown-menu');
      expect(menu).toBeTruthy();
    });

    it('should render as ul element', async () => {
      await createDropdownMenu('<r-dropdown-menu></r-dropdown-menu>');
      const ul = page.root.querySelector('ul');
      expect(ul).toBeTruthy();
    });

    it('should have menu role', async () => {
      await createDropdownMenu('<r-dropdown-menu></r-dropdown-menu>');
      const menu = page.root.querySelector('.r-dropdown-menu');
      expect(menu.getAttribute('role')).toBe('menu');
    });

    it('should render slot content', async () => {
      await createDropdownMenu(`
        <r-dropdown-menu>
          <r-dropdown-item>Item 1</r-dropdown-item>
          <r-dropdown-item>Item 2</r-dropdown-item>
        </r-dropdown-menu>
      `);
      const items = page.root.querySelectorAll('r-dropdown-item');
      expect(items.length).toBe(2);
    });
  });

  describe('menu items', () => {
    it('should contain dropdown items', async () => {
      await createDropdownMenu(`
        <r-dropdown-menu>
          <r-dropdown-item command="edit">Edit</r-dropdown-item>
          <r-dropdown-item command="delete">Delete</r-dropdown-item>
          <r-dropdown-item command="copy">Copy</r-dropdown-item>
        </r-dropdown-menu>
      `);
      const items = page.root.querySelectorAll('r-dropdown-item');
      expect(items.length).toBe(3);
    });

    it('should support divided items', async () => {
      await createDropdownMenu(`
        <r-dropdown-menu>
          <r-dropdown-item>Item 1</r-dropdown-item>
          <r-dropdown-item divided="true">Item 2</r-dropdown-item>
        </r-dropdown-menu>
      `);
      const dividedItem = page.root.querySelector('r-dropdown-item[divided="true"]');
      expect(dividedItem).toBeTruthy();
    });

    it('should support disabled items', async () => {
      await createDropdownMenu(`
        <r-dropdown-menu>
          <r-dropdown-item>Item 1</r-dropdown-item>
          <r-dropdown-item disabled="true">Item 2</r-dropdown-item>
        </r-dropdown-menu>
      `);
      const disabledItem = page.root.querySelector('r-dropdown-item[disabled="true"]');
      expect(disabledItem).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have menu role for screen readers', async () => {
      await createDropdownMenu('<r-dropdown-menu></r-dropdown-menu>');
      const menu = page.root.querySelector('.r-dropdown-menu');
      expect(menu.getAttribute('role')).toBe('menu');
    });
  });

  describe('structure', () => {
    it('should maintain proper list structure', async () => {
      await createDropdownMenu(`
        <r-dropdown-menu>
          <r-dropdown-item>Item</r-dropdown-item>
        </r-dropdown-menu>
      `);
      const ul = page.root.querySelector('ul.r-dropdown-menu');
      expect(ul).toBeTruthy();
      const li = ul.querySelector('li');
      expect(li).toBeTruthy();
    });
  });
});
