import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RTag } from './r-tag';

describe('r-tag', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag>Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag).not.toBeNull();
      expect(tag.tagName.toLowerCase()).toBe('span');
    });

    it('should render content', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag>My Tag</r-tag>',
      });
      
      const content = page.root.querySelector('.r-tag__content');
      expect(content.textContent).toContain('My Tag');
    });
  });

  // ==================== TYPE TESTS ====================
  describe('types', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info'];

    types.forEach(type => {
      it(`should render ${type} type`, async () => {
        page = await newSpecPage({
          components: [RTag],
          html: `<r-tag type="${type}">Tag</r-tag>`,
        });
        
        const tag = page.root.querySelector('.r-tag');
        expect(tag.classList.contains(`r-tag--${type}`)).toBe(true);
      });
    });

    it('should not add type class for default type', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag>Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--primary')).toBe(false);
    });
  });

  // ==================== SIZE TESTS ====================
  describe('sizes', () => {
    it('should render default size', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag>Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--large')).toBe(false);
      expect(tag.classList.contains('r-tag--small')).toBe(false);
    });

    it('should render large size', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag size="large">Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--large')).toBe(true);
    });

    it('should render small size', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag size="small">Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--small')).toBe(true);
    });
  });

  // ==================== EFFECT TESTS ====================
  describe('effects', () => {
    it('should render light effect by default', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag>Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--light')).toBe(true);
    });

    it('should render dark effect', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag effect="dark">Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--dark')).toBe(true);
    });

    it('should render plain effect', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag effect="plain">Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--plain')).toBe(true);
    });
  });

  // ==================== CLOSABLE TESTS ====================
  describe('closable', () => {
    it('should not show close button by default', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag>Tag</r-tag>',
      });
      
      const closeBtn = page.root.querySelector('.r-tag__close');
      expect(closeBtn).toBeNull();
    });

    it('should show close button when closable', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag closable>Tag</r-tag>',
      });
      
      const closeBtn = page.root.querySelector('.r-tag__close');
      expect(closeBtn).not.toBeNull();
    });

    it('should add closable class', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag closable>Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--closable')).toBe(true);
    });

    it('should emit close event on close click', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag closable>Tag</r-tag>',
      });
      
      const closeSpy = jest.fn();
      page.root.addEventListener('close', closeSpy);
      
      const closeBtn = page.root.querySelector('.r-tag__close') as HTMLElement;
      closeBtn.click();
      
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should stop propagation on close click', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag closable>Tag</r-tag>',
      });
      
      const clickSpy = jest.fn();
      page.root.addEventListener('click', clickSpy);
      
      const closeBtn = page.root.querySelector('.r-tag__close') as HTMLElement;
      closeBtn.click();
      
      // Click should not bubble to tag
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  // ==================== ROUND TESTS ====================
  describe('round', () => {
    it('should not be round by default', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag>Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--round')).toBe(false);
    });

    it('should be round when enabled', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag round>Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--round')).toBe(true);
    });
  });

  // ==================== CUSTOM COLOR TESTS ====================
  describe('custom color', () => {
    it('should apply custom color', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag color="#ff0000">Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag') as HTMLElement;
      expect(tag.classList.contains('r-tag--custom')).toBe(true);
      expect(tag.style.getPropertyValue('--r-tag-custom-color')).toBe('#ff0000');
    });
  });

  // ==================== DISABLE TRANSITIONS TESTS ====================
  describe('disable transitions', () => {
    it('should have transitions by default', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag>Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--no-transition')).toBe(false);
    });

    it('should disable transitions when enabled', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag disable-transitions>Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--no-transition')).toBe(true);
    });
  });

  // ==================== CLICK EVENT TESTS ====================
  describe('click event', () => {
    it('should emit click event', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag>Tag</r-tag>',
      });
      
      const clickSpy = jest.fn();
      page.root.addEventListener('click', clickSpy);
      
      const tag = page.root.querySelector('.r-tag') as HTMLElement;
      tag.click();
      
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('should receive event on click', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag>Tag</r-tag>',
      });
      
      let receivedEvent: Event;
      page.root.addEventListener('click', (e: Event) => {
        receivedEvent = e;
      });
      
      const tag = page.root.querySelector('.r-tag') as HTMLElement;
      tag.click();
      
      expect(receivedEvent).toBeDefined();
      expect(receivedEvent.type).toBe('click');
    });
  });

  // ==================== COMBINED PROPS TESTS ====================
  describe('combined props', () => {
    it('should render with all props combined', async () => {
      page = await newSpecPage({
        components: [RTag],
        html: '<r-tag type="success" size="large" effect="dark" round closable>Success Tag</r-tag>',
      });
      
      const tag = page.root.querySelector('.r-tag');
      expect(tag.classList.contains('r-tag--success')).toBe(true);
      expect(tag.classList.contains('r-tag--large')).toBe(true);
      expect(tag.classList.contains('r-tag--dark')).toBe(true);
      expect(tag.classList.contains('r-tag--round')).toBe(true);
      expect(tag.classList.contains('r-tag--closable')).toBe(true);
      
      const closeBtn = page.root.querySelector('.r-tag__close');
      expect(closeBtn).not.toBeNull();
    });
  });
});
