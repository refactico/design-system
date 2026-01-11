import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RDialog } from './r-dialog';

describe('r-dialog', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog');
      expect(dialog).not.toBeNull();
    });

    it('should render wrapper', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const wrapper = page.root.querySelector('.r-dialog-wrapper');
      expect(wrapper).not.toBeNull();
    });

    it('should render overlay', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const overlay = page.root.querySelector('.r-dialog__overlay');
      expect(overlay).not.toBeNull();
    });

    it('should render header', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const header = page.root.querySelector('.r-dialog__header');
      expect(header).not.toBeNull();
    });

    it('should render body', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const body = page.root.querySelector('.r-dialog__body');
      expect(body).not.toBeNull();
    });

    it('should render footer', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const footer = page.root.querySelector('.r-dialog__footer');
      expect(footer).not.toBeNull();
    });

    it('should render slot content in body', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Dialog Content</r-dialog>',
      });
      
      const body = page.root.querySelector('.r-dialog__body');
      expect(body.textContent).toContain('Dialog Content');
    });
  });

  // ==================== VISIBILITY TESTS ====================
  describe('visibility', () => {
    it('should not render when visible is false', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog>Content</r-dialog>',
      });
      
      const wrapper = page.root.querySelector('.r-dialog-wrapper');
      expect(wrapper.classList.contains('r-dialog-wrapper--visible')).toBe(false);
    });

    it('should render when visible is true', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const wrapper = page.root.querySelector('.r-dialog-wrapper');
      expect(wrapper.classList.contains('r-dialog-wrapper--visible')).toBe(true);
    });

    it('should toggle visibility', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog>Content</r-dialog>',
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const wrapper = page.root.querySelector('.r-dialog-wrapper');
      expect(wrapper.classList.contains('r-dialog-wrapper--visible')).toBe(true);
      
      page.rootInstance.visible = false;
      await page.waitForChanges();
      
      expect(wrapper.classList.contains('r-dialog-wrapper--visible')).toBe(false);
    });
  });

  // ==================== TITLE TESTS ====================
  describe('title', () => {
    it('should render title via prop', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible dialog-title="My Dialog">Content</r-dialog>',
      });
      
      const title = page.root.querySelector('.r-dialog__title');
      expect(title.textContent).toBe('My Dialog');
    });

    it('should render title slot', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible><span slot="title">Slot Title</span>Content</r-dialog>',
      });
      
      const slotContent = page.root.querySelector('[slot="title"]');
      expect(slotContent.textContent).toBe('Slot Title');
    });
  });

  // ==================== CLOSE BUTTON TESTS ====================
  describe('close button', () => {
    it('should show close button by default', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const closeBtn = page.root.querySelector('.r-dialog__close');
      expect(closeBtn).not.toBeNull();
    });

    it('should hide close button when show-close is false', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible show-close="false">Content</r-dialog>',
      });
      
      const closeBtn = page.root.querySelector('.r-dialog__close');
      expect(closeBtn).toBeNull();
    });

    it('should close dialog on close button click', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const closeBtn = page.root.querySelector('.r-dialog__close') as HTMLElement;
      closeBtn.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });

    it('should have aria-label on close button', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const closeBtn = page.root.querySelector('.r-dialog__close');
      expect(closeBtn.getAttribute('aria-label')).toBe('Close');
    });
  });

  // ==================== WIDTH TESTS ====================
  describe('width', () => {
    it('should have default width', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog') as HTMLElement;
      expect(dialog.style.getPropertyValue('--r-dialog-width')).toBe('500px');
    });

    it('should apply custom width', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible width="800px">Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog') as HTMLElement;
      expect(dialog.style.getPropertyValue('--r-dialog-width')).toBe('800px');
    });
  });

  // ==================== FULLSCREEN TESTS ====================
  describe('fullscreen', () => {
    it('should not be fullscreen by default', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog');
      expect(dialog.classList.contains('r-dialog--fullscreen')).toBe(false);
    });

    it('should render fullscreen mode', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible fullscreen>Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog');
      expect(dialog.classList.contains('r-dialog--fullscreen')).toBe(true);
    });
  });

  // ==================== CENTER TESTS ====================
  describe('center', () => {
    it('should not be centered by default', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const wrapper = page.root.querySelector('.r-dialog-wrapper');
      expect(wrapper.classList.contains('r-dialog-wrapper--center')).toBe(false);
    });

    it('should center dialog vertically', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible center>Content</r-dialog>',
      });
      
      const wrapper = page.root.querySelector('.r-dialog-wrapper');
      expect(wrapper.classList.contains('r-dialog-wrapper--center')).toBe(true);
    });

    it('should center header/footer content', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible align-center>Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog');
      expect(dialog.classList.contains('r-dialog--center')).toBe(true);
    });
  });

  // ==================== OVERLAY CLICK TESTS ====================
  describe('overlay click', () => {
    it('should close on overlay click by default', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const overlay = page.root.querySelector('.r-dialog__overlay') as HTMLElement;
      overlay.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });

    it('should not close on overlay click when close-on-click-overlay is false', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible close-on-click-overlay="false">Content</r-dialog>',
      });
      
      const overlay = page.root.querySelector('.r-dialog__overlay') as HTMLElement;
      overlay.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });
  });

  // ==================== ESCAPE KEY TESTS ====================
  describe('escape key', () => {
    it('should have closeOnPressEscape enabled by default', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      expect(page.rootInstance.closeOnPressEscape).toBe(true);
    });

    it('should not close on Escape when close-on-press-escape is false', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible close-on-press-escape="false">Content</r-dialog>',
      });
      
      expect(page.rootInstance.closeOnPressEscape).toBe(false);
    });
  });

  // ==================== DESTROY ON CLOSE TESTS ====================
  describe('destroy on close', () => {
    it('should keep content when destroy-on-close is false', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      page.rootInstance.visible = false;
      await page.waitForChanges();
      
      const wrapper = page.root.querySelector('.r-dialog-wrapper');
      expect(wrapper).not.toBeNull();
    });

    it('should destroy content when destroy-on-close is true and never rendered', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog destroy-on-close>Content</r-dialog>',
      });
      
      const wrapper = page.root.querySelector('.r-dialog-wrapper');
      expect(wrapper).toBeNull();
    });
  });

  // ==================== CUSTOM CLASS TESTS ====================
  describe('custom class', () => {
    it('should apply custom class', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible custom-class="my-dialog">Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog');
      expect(dialog.classList.contains('my-dialog')).toBe(true);
    });
  });

  // ==================== DRAGGABLE TESTS ====================
  describe('draggable', () => {
    it('should not be draggable by default', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog');
      expect(dialog.classList.contains('r-dialog--draggable')).toBe(false);
    });

    it('should add draggable class when is-draggable is true', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible is-draggable>Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog');
      expect(dialog.classList.contains('r-dialog--draggable')).toBe(true);
    });
  });

  // ==================== EVENT TESTS ====================
  describe('events', () => {
    it('should emit dialogOpen event when opened', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog>Content</r-dialog>',
      });
      
      const openSpy = jest.fn();
      page.root.addEventListener('dialogOpen', openSpy);
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      expect(openSpy).toHaveBeenCalled();
    });

    it('should emit dialogClose event when closed', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const closeSpy = jest.fn();
      page.root.addEventListener('dialogClose', closeSpy);
      
      page.rootInstance.visible = false;
      await page.waitForChanges();
      
      expect(closeSpy).toHaveBeenCalled();
    });

    it('should emit dialogOpened event after animation', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog>Content</r-dialog>',
      });
      
      const openedSpy = jest.fn();
      page.root.addEventListener('dialogOpened', openedSpy);
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      // Wait for animation timeout
      await new Promise(resolve => setTimeout(resolve, 350));
      
      expect(openedSpy).toHaveBeenCalled();
    });

    it('should emit dialogClosed event after animation', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const closedSpy = jest.fn();
      page.root.addEventListener('dialogClosed', closedSpy);
      
      page.rootInstance.visible = false;
      await page.waitForChanges();
      
      // Wait for animation timeout
      await new Promise(resolve => setTimeout(resolve, 350));
      
      expect(closedSpy).toHaveBeenCalled();
    });
  });

  // ==================== METHOD TESTS ====================
  describe('methods', () => {
    it('should open dialog via open method', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog>Content</r-dialog>',
      });
      
      const component = page.rootInstance;
      await component.open();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should close dialog via close method', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const component = page.rootInstance;
      await component.close();
      
      expect(page.rootInstance.visible).toBe(false);
    });
  });

  // ==================== FOOTER SLOT TESTS ====================
  describe('footer slot', () => {
    it('should render footer slot content', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: `
          <r-dialog visible>
            Content
            <div slot="footer">
              <button>Cancel</button>
              <button>OK</button>
            </div>
          </r-dialog>
        `,
      });
      
      const footer = page.root.querySelector('.r-dialog__footer');
      expect(footer).not.toBeNull();
      
      const buttons = footer.querySelectorAll('button');
      expect(buttons.length).toBe(2);
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe('accessibility', () => {
    it('should have role="dialog"', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog');
      expect(dialog.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-modal="true"', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog');
      expect(dialog.getAttribute('aria-modal')).toBe('true');
    });

    it('should have aria-labelledby pointing to title', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible dialog-title="Test">Content</r-dialog>',
      });
      
      const dialog = page.root.querySelector('.r-dialog');
      expect(dialog.getAttribute('aria-labelledby')).toBe('dialog-title');
      
      const title = page.root.querySelector('#dialog-title');
      expect(title).not.toBeNull();
    });
  });

  // ==================== LOCK SCROLL TESTS ====================
  describe('lock scroll', () => {
    it('should lock body scroll when opened', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog>Content</r-dialog>',
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should unlock body scroll when closed', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog visible>Content</r-dialog>',
      });
      
      page.rootInstance.visible = false;
      await page.waitForChanges();
      
      expect(document.body.style.overflow).toBe('');
    });

    it('should not lock scroll when lock-scroll is false', async () => {
      page = await newSpecPage({
        components: [RDialog],
        html: '<r-dialog lock-scroll="false">Content</r-dialog>',
      });
      
      const originalOverflow = document.body.style.overflow;
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      expect(document.body.style.overflow).toBe(originalOverflow);
    });
  });
});
