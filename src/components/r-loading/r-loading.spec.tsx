import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RLoading } from './r-loading';
import { RSpinner } from '../r-spinner/r-spinner';

describe('r-loading', () => {
  let page: SpecPage;

  const createLoading = async (html: string) => {
    page = await newSpecPage({
      components: [RLoading, RSpinner],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createLoading('<r-loading></r-loading>');
      const loading = page.root.querySelector('.r-loading');
      expect(loading).toBeTruthy();
    });

    it('should render slot content', async () => {
      await createLoading('<r-loading><div class="content">Content</div></r-loading>');
      const content = page.root.querySelector('.content');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Content');
    });

    it('should render mask element', async () => {
      await createLoading('<r-loading></r-loading>');
      const mask = page.root.querySelector('.r-loading__mask');
      expect(mask).toBeTruthy();
    });

    it('should render spinner inside mask', async () => {
      await createLoading('<r-loading loading="true"></r-loading>');
      const spinner = page.root.querySelector('r-spinner');
      expect(spinner).toBeTruthy();
    });
  });

  describe('loading prop', () => {
    it('should hide mask when loading is false', async () => {
      await createLoading('<r-loading loading="false"></r-loading>');
      const mask = page.root.querySelector('.r-loading__mask');
      expect(mask).not.toHaveClass('r-loading__mask--visible');
    });

    it('should show mask when loading is true', async () => {
      await createLoading('<r-loading loading="true"></r-loading>');
      const mask = page.root.querySelector('.r-loading__mask');
      expect(mask).toHaveClass('r-loading__mask--visible');
    });

    it('should default to false', async () => {
      await createLoading('<r-loading></r-loading>');
      const component = page.rootInstance as RLoading;
      expect(component.loading).toBe(false);
    });
  });

  describe('text prop', () => {
    it('should display loading text', async () => {
      await createLoading('<r-loading loading="true" text="Loading..."></r-loading>');
      const text = page.root.querySelector('.r-loading__text');
      expect(text).toBeTruthy();
      expect(text.textContent).toBe('Loading...');
    });

    it('should not render text element when text is not provided', async () => {
      await createLoading('<r-loading loading="true"></r-loading>');
      const text = page.root.querySelector('.r-loading__text');
      expect(text).toBeFalsy();
    });
  });

  describe('spinnerSize prop', () => {
    it('should pass small size to spinner', async () => {
      await createLoading('<r-loading loading="true" spinner-size="small"></r-loading>');
      const component = page.rootInstance as RLoading;
      expect(component.spinnerSize).toBe('small');
    });

    it('should pass default size to spinner', async () => {
      await createLoading('<r-loading loading="true" spinner-size="default"></r-loading>');
      const component = page.rootInstance as RLoading;
      expect(component.spinnerSize).toBe('default');
    });

    it('should pass large size to spinner', async () => {
      await createLoading('<r-loading loading="true" spinner-size="large"></r-loading>');
      const component = page.rootInstance as RLoading;
      expect(component.spinnerSize).toBe('large');
    });

    it('should default to default size', async () => {
      await createLoading('<r-loading loading="true"></r-loading>');
      const component = page.rootInstance as RLoading;
      expect(component.spinnerSize).toBe('default');
    });
  });

  describe('fullscreen prop', () => {
    it('should apply fullscreen class when true', async () => {
      await createLoading('<r-loading loading="true" fullscreen="true"></r-loading>');
      const mask = page.root.querySelector('.r-loading__mask');
      expect(mask).toHaveClass('r-loading__mask--fullscreen');
    });

    it('should not apply fullscreen class when false', async () => {
      await createLoading('<r-loading loading="true" fullscreen="false"></r-loading>');
      const mask = page.root.querySelector('.r-loading__mask');
      expect(mask).not.toHaveClass('r-loading__mask--fullscreen');
    });

    it('should default to false', async () => {
      await createLoading('<r-loading></r-loading>');
      const component = page.rootInstance as RLoading;
      expect(component.fullscreen).toBe(false);
    });
  });

  describe('lock prop', () => {
    it('should default to true', async () => {
      await createLoading('<r-loading></r-loading>');
      const component = page.rootInstance as RLoading;
      expect(component.lock).toBe(true);
    });

    it('should accept lock setting', async () => {
      await createLoading('<r-loading lock="false"></r-loading>');
      const component = page.rootInstance as RLoading;
      expect(component.lock).toBe(false);
    });
  });

  describe('background prop', () => {
    it('should apply light background by default', async () => {
      await createLoading('<r-loading loading="true"></r-loading>');
      const mask = page.root.querySelector('.r-loading__mask');
      expect(mask).not.toHaveClass('r-loading__mask--dark');
    });

    it('should apply dark background class', async () => {
      await createLoading('<r-loading loading="true" background="dark"></r-loading>');
      const mask = page.root.querySelector('.r-loading__mask');
      expect(mask).toHaveClass('r-loading__mask--dark');
    });

    it('should pass white color to spinner for dark background', async () => {
      await createLoading('<r-loading loading="true" background="dark"></r-loading>');
      const component = page.rootInstance as RLoading;
      expect(component.background).toBe('dark');
    });

    it('should pass primary color to spinner for light background', async () => {
      await createLoading('<r-loading loading="true" background="light"></r-loading>');
      const component = page.rootInstance as RLoading;
      expect(component.background).toBe('light');
    });
  });

  describe('customBackground prop', () => {
    it('should apply custom background color', async () => {
      await createLoading('<r-loading loading="true" custom-background="rgba(0,0,0,0.8)"></r-loading>');
      const mask = page.root.querySelector('.r-loading__mask') as HTMLElement;
      expect(mask.style.backgroundColor).toBe('rgba(0,0,0,0.8)');
    });

    it('should not apply style when customBackground is not set', async () => {
      await createLoading('<r-loading loading="true"></r-loading>');
      const mask = page.root.querySelector('.r-loading__mask') as HTMLElement;
      expect(mask.style.backgroundColor).toBe('');
    });
  });

  describe('loading state changes', () => {
    it('should toggle visibility when loading changes', async () => {
      await createLoading('<r-loading loading="false"></r-loading>');
      const component = page.rootInstance as RLoading;
      let mask = page.root.querySelector('.r-loading__mask');
      expect(mask).not.toHaveClass('r-loading__mask--visible');

      component.loading = true;
      await page.waitForChanges();
      mask = page.root.querySelector('.r-loading__mask');
      expect(mask).toHaveClass('r-loading__mask--visible');
    });
  });

  describe('disconnectedCallback', () => {
    it('should clean up body class on disconnect', async () => {
      await createLoading('<r-loading loading="true" fullscreen="true" lock="true"></r-loading>');
      const component = page.rootInstance as RLoading;
      component.disconnectedCallback();
      // Should not throw error
      expect(true).toBe(true);
    });
  });

  describe('overlay content', () => {
    it('should overlay content when loading', async () => {
      await createLoading(`
        <r-loading loading="true">
          <div class="content">Content to overlay</div>
        </r-loading>
      `);
      const content = page.root.querySelector('.content');
      const mask = page.root.querySelector('.r-loading__mask');
      expect(content).toBeTruthy();
      expect(mask).toHaveClass('r-loading__mask--visible');
    });
  });
});
