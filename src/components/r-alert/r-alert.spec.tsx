import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RAlert } from './r-alert';

describe('r-alert', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert content</r-alert>',
      });
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert).not.toBeNull();
      expect(alert.getAttribute('role')).toBe('alert');
      expect(alert.classList.contains('r-alert--info')).toBe(true);
      expect(alert.classList.contains('r-alert--light')).toBe(true);
    });

    it('should render slot content', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Custom content</r-alert>',
      });
      
      expect(page.root.textContent).toContain('Custom content');
    });

    it('should render title via prop', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert alert-title="Test Title">Content</r-alert>',
      });
      
      const title = page.root.querySelector('.r-alert__title');
      expect(title).not.toBeNull();
      expect(title.textContent).toBe('Test Title');
    });

    it('should render description via prop', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert description="Test Description">Content</r-alert>',
      });
      
      const description = page.root.querySelector('.r-alert__description');
      expect(description).not.toBeNull();
      expect(description.textContent).toBe('Test Description');
    });

    it('should render title slot', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert><span slot="title">Slot Title</span></r-alert>',
      });
      
      const slotContent = page.root.querySelector('[slot="title"]');
      expect(slotContent).not.toBeNull();
      expect(slotContent.textContent).toBe('Slot Title');
    });

    it('should render description slot', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert><span slot="description">Slot Description</span></r-alert>',
      });
      
      const slotContent = page.root.querySelector('[slot="description"]');
      expect(slotContent).not.toBeNull();
      expect(slotContent.textContent).toBe('Slot Description');
    });
  });

  // ==================== TYPE TESTS ====================
  describe('types', () => {
    const types = ['success', 'warning', 'error', 'info'];

    types.forEach(type => {
      it(`should render ${type} type`, async () => {
        page = await newSpecPage({
          components: [RAlert],
          html: `<r-alert type="${type}">Alert</r-alert>`,
        });
        
        const alert = page.root.querySelector('.r-alert');
        expect(alert.classList.contains(`r-alert--${type}`)).toBe(true);
      });

      it(`should render correct icon for ${type} type`, async () => {
        page = await newSpecPage({
          components: [RAlert],
          html: `<r-alert type="${type}" show-icon>Alert</r-alert>`,
        });
        
        const icon = page.root.querySelector('.r-alert__icon svg');
        expect(icon).not.toBeNull();
      });
    });
  });

  // ==================== EFFECT TESTS ====================
  describe('effects', () => {
    it('should render light effect by default', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert.classList.contains('r-alert--light')).toBe(true);
    });

    it('should render dark effect', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert effect="dark">Alert</r-alert>',
      });
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert.classList.contains('r-alert--dark')).toBe(true);
    });
  });

  // ==================== ICON TESTS ====================
  describe('icon', () => {
    it('should show icon by default', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      const icon = page.root.querySelector('.r-alert__icon');
      expect(icon).not.toBeNull();
    });

    it('should hide icon when show-icon is false', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert show-icon="false">Alert</r-alert>',
      });
      
      const icon = page.root.querySelector('.r-alert__icon');
      expect(icon).toBeNull();
    });

    it('should render big icon when description is present', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert description="Description">Alert</r-alert>',
      });
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert.classList.contains('r-alert--big-icon')).toBe(true);
      expect(alert.classList.contains('r-alert--with-description')).toBe(true);
    });
  });

  // ==================== CLOSABLE TESTS ====================
  describe('closable', () => {
    it('should show close button by default', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      const closeBtn = page.root.querySelector('.r-alert__close');
      expect(closeBtn).not.toBeNull();
    });

    it('should hide close button when closable is false', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert closable="false">Alert</r-alert>',
      });
      
      const closeBtn = page.root.querySelector('.r-alert__close');
      expect(closeBtn).toBeNull();
    });

    it('should render custom close text', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert close-text="Dismiss">Alert</r-alert>',
      });
      
      const closeBtn = page.root.querySelector('.r-alert__close');
      expect(closeBtn.textContent).toBe('Dismiss');
    });

    it('should render close icon when no close text', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      const closeIcon = page.root.querySelector('.r-alert__close svg');
      expect(closeIcon).not.toBeNull();
    });
  });

  // ==================== CENTER TESTS ====================
  describe('center', () => {
    it('should not be centered by default', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert.classList.contains('r-alert--center')).toBe(false);
    });

    it('should be centered when center prop is true', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert center>Alert</r-alert>',
      });
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert.classList.contains('r-alert--center')).toBe(true);
    });
  });

  // ==================== CLOSE EVENT TESTS ====================
  describe('close event', () => {
    it('should emit close event when close button is clicked', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      const closeSpy = jest.fn();
      page.root.addEventListener('close', closeSpy);
      
      const closeBtn = page.root.querySelector('.r-alert__close') as HTMLElement;
      closeBtn.click();
      
      // Wait for the timeout in handleClose
      await new Promise(resolve => setTimeout(resolve, 250));
      await page.waitForChanges();
      
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should add closing class when close is triggered', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      const closeBtn = page.root.querySelector('.r-alert__close') as HTMLElement;
      closeBtn.click();
      
      await page.waitForChanges();
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert.classList.contains('r-alert--closing')).toBe(true);
    });

    it('should hide alert after close animation', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      const closeBtn = page.root.querySelector('.r-alert__close') as HTMLElement;
      closeBtn.click();
      
      // Wait for the timeout
      await new Promise(resolve => setTimeout(resolve, 250));
      await page.waitForChanges();
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert).toBeNull();
    });

    it('should bubble close event', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<div id="parent"><r-alert>Alert</r-alert></div>',
      });
      
      const closeSpy = jest.fn();
      page.body.querySelector('#parent').addEventListener('close', closeSpy);
      
      const closeBtn = page.root.querySelector('.r-alert__close') as HTMLElement;
      closeBtn.click();
      
      await new Promise(resolve => setTimeout(resolve, 250));
      await page.waitForChanges();
      
      expect(closeSpy).toHaveBeenCalled();
    });
  });

  // ==================== VISIBILITY TESTS ====================
  describe('visibility', () => {
    it('should be visible by default', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert).not.toBeNull();
    });

    it('should not render when visible is false', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      // Simulate closing
      const component = page.rootInstance;
      component.visible = false;
      await page.waitForChanges();
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert).toBeNull();
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe('accessibility', () => {
    it('should have role="alert"', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert>Alert</r-alert>',
      });
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert.getAttribute('role')).toBe('alert');
    });

    it('should have proper structure for screen readers', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: '<r-alert alert-title="Title" description="Description">Content</r-alert>',
      });
      
      const title = page.root.querySelector('.r-alert__title');
      const description = page.root.querySelector('.r-alert__description');
      
      expect(title).not.toBeNull();
      expect(description).not.toBeNull();
    });
  });

  // ==================== COMBINED PROPS TESTS ====================
  describe('combined props', () => {
    it('should render with all props combined', async () => {
      page = await newSpecPage({
        components: [RAlert],
        html: `
          <r-alert 
            type="success" 
            effect="dark" 
            alert-title="Success" 
            description="Operation completed"
            center
            show-icon
          >
            Additional content
          </r-alert>
        `,
      });
      
      const alert = page.root.querySelector('.r-alert');
      expect(alert.classList.contains('r-alert--success')).toBe(true);
      expect(alert.classList.contains('r-alert--dark')).toBe(true);
      expect(alert.classList.contains('r-alert--center')).toBe(true);
      expect(alert.classList.contains('r-alert--with-description')).toBe(true);
      
      const title = page.root.querySelector('.r-alert__title');
      expect(title.textContent).toBe('Success');
      
      const description = page.root.querySelector('.r-alert__description');
      expect(description.textContent).toBe('Operation completed');
      
      const icon = page.root.querySelector('.r-alert__icon');
      expect(icon).not.toBeNull();
    });
  });
});
