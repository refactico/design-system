import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RTabPane } from './r-tab-pane';

describe('r-tab-pane', () => {
  let page: SpecPage;

  const createTabPane = async (html: string) => {
    page = await newSpecPage({
      components: [RTabPane],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createTabPane('<r-tab-pane active="true"></r-tab-pane>');
      const tabPane = page.root.querySelector('.r-tab-pane');
      expect(tabPane).toBeTruthy();
    });

    it('should render slot content when active', async () => {
      await createTabPane('<r-tab-pane active="true"><div class="content">Tab Content</div></r-tab-pane>');
      const content = page.root.querySelector('.content');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Tab Content');
    });

    it('should have tabpanel role', async () => {
      await createTabPane('<r-tab-pane active="true"></r-tab-pane>');
      const tabPane = page.root.querySelector('.r-tab-pane');
      expect(tabPane.getAttribute('role')).toBe('tabpanel');
    });
  });

  describe('name prop', () => {
    it('should accept name', async () => {
      await createTabPane('<r-tab-pane name="tab1" active="true"></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      expect(component.name).toBe('tab1');
    });
  });

  describe('label prop', () => {
    it('should accept label', async () => {
      await createTabPane('<r-tab-pane label="Tab Label" active="true"></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      expect(component.label).toBe('Tab Label');
    });
  });

  describe('disabled prop', () => {
    it('should default to false', async () => {
      await createTabPane('<r-tab-pane active="true"></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      expect(component.disabled).toBe(false);
    });

    it('should accept disabled setting', async () => {
      await createTabPane('<r-tab-pane disabled="true" active="true"></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      expect(component.disabled).toBe(true);
    });
  });

  describe('closable prop', () => {
    it('should default to false', async () => {
      await createTabPane('<r-tab-pane active="true"></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      expect(component.closable).toBe(false);
    });

    it('should accept closable setting', async () => {
      await createTabPane('<r-tab-pane closable="true" active="true"></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      expect(component.closable).toBe(true);
    });
  });

  describe('lazy prop', () => {
    it('should default to false', async () => {
      await createTabPane('<r-tab-pane active="true"></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      expect(component.lazy).toBe(false);
    });

    it('should accept lazy setting', async () => {
      await createTabPane('<r-tab-pane lazy="true" active="true"></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      expect(component.lazy).toBe(true);
    });

    it('should not render content when lazy and not active', async () => {
      await createTabPane('<r-tab-pane lazy="true" active="false"><div class="content">Content</div></r-tab-pane>');
      const tabPane = page.root.querySelector('.r-tab-pane');
      expect(tabPane).toBeFalsy();
    });

    it('should render content when lazy and active', async () => {
      await createTabPane('<r-tab-pane lazy="true" active="true"><div class="content">Content</div></r-tab-pane>');
      const tabPane = page.root.querySelector('.r-tab-pane');
      expect(tabPane).toBeTruthy();
    });

    it('should keep content after becoming inactive once rendered', async () => {
      await createTabPane('<r-tab-pane lazy="true" active="true"><div class="content">Content</div></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      
      // First render when active
      await page.waitForChanges();
      expect(page.root.querySelector('.r-tab-pane')).toBeTruthy();
      
      // Become inactive
      component.active = false;
      await page.waitForChanges();
      
      // Content should still be rendered (just hidden)
      const tabPane = page.root.querySelector('.r-tab-pane');
      expect(tabPane).toBeTruthy();
    });
  });

  describe('active prop', () => {
    it('should default to false', async () => {
      await createTabPane('<r-tab-pane></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      expect(component.active).toBe(false);
    });

    it('should apply active class when active', async () => {
      await createTabPane('<r-tab-pane active="true"></r-tab-pane>');
      const tabPane = page.root.querySelector('.r-tab-pane');
      expect(tabPane).toHaveClass('r-tab-pane--active');
    });

    it('should not apply active class when inactive', async () => {
      await createTabPane('<r-tab-pane active="true"></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      component.active = false;
      await page.waitForChanges();
      
      const tabPane = page.root.querySelector('.r-tab-pane');
      expect(tabPane).not.toHaveClass('r-tab-pane--active');
    });
  });

  describe('aria attributes', () => {
    it('should set aria-hidden to false when active', async () => {
      await createTabPane('<r-tab-pane active="true"></r-tab-pane>');
      const tabPane = page.root.querySelector('.r-tab-pane');
      expect(tabPane.getAttribute('aria-hidden')).toBe('false');
    });

    it('should set aria-hidden to true when inactive', async () => {
      await createTabPane('<r-tab-pane active="true"></r-tab-pane>');
      const component = page.rootInstance as RTabPane;
      component.active = false;
      await page.waitForChanges();
      
      const tabPane = page.root.querySelector('.r-tab-pane');
      expect(tabPane.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('content visibility', () => {
    it('should show content when active', async () => {
      await createTabPane('<r-tab-pane active="true"><p>Visible content</p></r-tab-pane>');
      const content = page.root.querySelector('p');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Visible content');
    });

    it('should render content when not lazy and inactive', async () => {
      await createTabPane('<r-tab-pane active="false"><p>Hidden content</p></r-tab-pane>');
      const tabPane = page.root.querySelector('.r-tab-pane');
      expect(tabPane).toBeTruthy();
    });
  });
});
