import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RAvatar } from './r-avatar';

describe('r-avatar', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar>JD</r-avatar>',
      });
      
      const avatar = page.root.querySelector('.r-avatar');
      expect(avatar).not.toBeNull();
      expect(avatar.tagName.toLowerCase()).toBe('span');
    });

    it('should render slot content (initials)', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar>JD</r-avatar>',
      });
      
      const text = page.root.querySelector('.r-avatar__text');
      expect(text).not.toBeNull();
      expect(text.textContent).toContain('JD');
    });
  });

  // ==================== IMAGE TESTS ====================
  describe('image', () => {
    it('should render image when src is provided', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar src="https://example.com/avatar.jpg"></r-avatar>',
      });
      
      const img = page.root.querySelector('.r-avatar__image');
      expect(img).not.toBeNull();
      expect(img.getAttribute('src')).toBe('https://example.com/avatar.jpg');
    });

    it('should set alt attribute', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar src="https://example.com/avatar.jpg" alt="User Avatar"></r-avatar>',
      });
      
      const img = page.root.querySelector('.r-avatar__image');
      expect(img.getAttribute('alt')).toBe('User Avatar');
    });

    it('should set srcset attribute', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar src="https://example.com/avatar.jpg" src-set="https://example.com/avatar@2x.jpg 2x"></r-avatar>',
      });
      
      const img = page.root.querySelector('.r-avatar__image');
      expect(img.getAttribute('srcset')).toBe('https://example.com/avatar@2x.jpg 2x');
    });

    it('should apply fit style', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar src="https://example.com/avatar.jpg" fit="contain"></r-avatar>',
      });
      
      const img = page.root.querySelector('.r-avatar__image') as HTMLElement;
      expect(img.style.objectFit).toBe('contain');
    });

    it('should emit error event on image load failure', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar src="https://example.com/invalid.jpg"></r-avatar>',
      });
      
      const errorSpy = jest.fn();
      page.root.addEventListener('error', errorSpy);
      
      const img = page.root.querySelector('.r-avatar__image') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));
      
      await page.waitForChanges();
      
      expect(errorSpy).toHaveBeenCalled();
    });

    it('should show fallback content on image error', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar src="https://example.com/invalid.jpg">JD</r-avatar>',
      });
      
      const img = page.root.querySelector('.r-avatar__image') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));
      
      await page.waitForChanges();
      
      const text = page.root.querySelector('.r-avatar__text');
      expect(text).not.toBeNull();
    });
  });

  // ==================== ICON TESTS ====================
  describe('icon', () => {
    it('should render icon when provided', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar icon="👤"></r-avatar>',
      });
      
      const icon = page.root.querySelector('.r-avatar__icon');
      expect(icon).not.toBeNull();
      expect(icon.textContent).toBe('👤');
    });

    it('should prefer image over icon', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar src="https://example.com/avatar.jpg" icon="👤"></r-avatar>',
      });
      
      const img = page.root.querySelector('.r-avatar__image');
      const icon = page.root.querySelector('.r-avatar__icon');
      
      expect(img).not.toBeNull();
      expect(icon).toBeNull();
    });
  });

  // ==================== SIZE TESTS ====================
  describe('sizes', () => {
    it('should render default size', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar>JD</r-avatar>',
      });
      
      const avatar = page.root.querySelector('.r-avatar');
      expect(avatar.classList.contains('r-avatar--default')).toBe(true);
    });

    it('should render large size', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar size="large">JD</r-avatar>',
      });
      
      const avatar = page.root.querySelector('.r-avatar');
      expect(avatar.classList.contains('r-avatar--large')).toBe(true);
    });

    it('should render small size', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar size="small">JD</r-avatar>',
      });
      
      const avatar = page.root.querySelector('.r-avatar');
      expect(avatar.classList.contains('r-avatar--small')).toBe(true);
    });

    it('should render custom numeric size', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar size="64">JD</r-avatar>',
      });
      
      const avatar = page.root.querySelector('.r-avatar') as HTMLElement;
      expect(avatar.style.width).toBe('64px');
      expect(avatar.style.height).toBe('64px');
      expect(avatar.style.fontSize).toBe('32px');
    });
  });

  // ==================== SHAPE TESTS ====================
  describe('shapes', () => {
    it('should render circle shape by default', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar>JD</r-avatar>',
      });
      
      const avatar = page.root.querySelector('.r-avatar');
      expect(avatar.classList.contains('r-avatar--circle')).toBe(true);
    });

    it('should render square shape', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar shape="square">JD</r-avatar>',
      });
      
      const avatar = page.root.querySelector('.r-avatar');
      expect(avatar.classList.contains('r-avatar--square')).toBe(true);
    });
  });

  // ==================== FIT TESTS ====================
  describe('fit', () => {
    const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'];

    fits.forEach(fit => {
      it(`should apply ${fit} fit`, async () => {
        page = await newSpecPage({
          components: [RAvatar],
          html: `<r-avatar src="https://example.com/avatar.jpg" fit="${fit}"></r-avatar>`,
        });
        
        const img = page.root.querySelector('.r-avatar__image') as HTMLElement;
        expect(img.style.objectFit).toBe(fit);
      });
    });
  });

  // ==================== COMBINED TESTS ====================
  describe('combined props', () => {
    it('should render with all props', async () => {
      page = await newSpecPage({
        components: [RAvatar],
        html: '<r-avatar size="large" shape="square" src="https://example.com/avatar.jpg" alt="User" fit="cover"></r-avatar>',
      });
      
      const avatar = page.root.querySelector('.r-avatar');
      expect(avatar.classList.contains('r-avatar--large')).toBe(true);
      expect(avatar.classList.contains('r-avatar--square')).toBe(true);
      
      const img = page.root.querySelector('.r-avatar__image') as HTMLElement;
      expect(img.getAttribute('src')).toBe('https://example.com/avatar.jpg');
      expect(img.getAttribute('alt')).toBe('User');
      expect(img.style.objectFit).toBe('cover');
    });
  });
});
