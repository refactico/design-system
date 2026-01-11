import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RPagination } from './r-pagination';

describe('r-pagination', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const pagination = page.root.querySelector('.r-pagination');
      expect(pagination).not.toBeNull();
    });

    it('should render prev button', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const prevBtn = page.root.querySelector('.r-pagination__prev');
      expect(prevBtn).not.toBeNull();
    });

    it('should render next button', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const nextBtn = page.root.querySelector('.r-pagination__next');
      expect(nextBtn).not.toBeNull();
    });

    it('should render pager', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const pager = page.root.querySelector('.r-pagination__pager');
      expect(pager).not.toBeNull();
    });

    it('should render page numbers', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const numbers = page.root.querySelectorAll('.r-pagination__number');
      expect(numbers.length).toBeGreaterThan(0);
    });
  });

  // ==================== SIZE TESTS ====================
  describe('sizes', () => {
    it('should render default size', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const pagination = page.root.querySelector('.r-pagination');
      expect(pagination.classList.contains('r-pagination--default')).toBe(true);
    });

    it('should render small size', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" size="small"></r-pagination>',
      });
      
      const pagination = page.root.querySelector('.r-pagination');
      expect(pagination.classList.contains('r-pagination--small')).toBe(true);
    });

    it('should render large size', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" size="large"></r-pagination>',
      });
      
      const pagination = page.root.querySelector('.r-pagination');
      expect(pagination.classList.contains('r-pagination--large')).toBe(true);
    });
  });

  // ==================== BACKGROUND TESTS ====================
  describe('background', () => {
    it('should not have background by default', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const pagination = page.root.querySelector('.r-pagination');
      expect(pagination.classList.contains('r-pagination--background')).toBe(false);
    });

    it('should have background when enabled', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" background></r-pagination>',
      });
      
      const pagination = page.root.querySelector('.r-pagination');
      expect(pagination.classList.contains('r-pagination--background')).toBe(true);
    });
  });

  // ==================== CURRENT PAGE TESTS ====================
  describe('current page', () => {
    it('should start at page 1 by default', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const activeNumber = page.root.querySelector('.r-pagination__number--active');
      expect(activeNumber.textContent).toBe('1');
    });

    it('should start at specified current page', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" current-page="5"></r-pagination>',
      });
      
      const activeNumber = page.root.querySelector('.r-pagination__number--active');
      expect(activeNumber.textContent).toBe('5');
    });

    it('should update current page on click', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const numbers = page.root.querySelectorAll('.r-pagination__number');
      (numbers[1] as HTMLElement).click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.currentPage).toBe(2);
    });
  });

  // ==================== PREV/NEXT TESTS ====================
  describe('prev/next navigation', () => {
    it('should disable prev button on first page', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" current-page="1"></r-pagination>',
      });
      
      const prevBtn = page.root.querySelector('.r-pagination__prev');
      expect(prevBtn.classList.contains('r-pagination__btn--disabled')).toBe(true);
    });

    it('should enable prev button on page > 1', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" current-page="5"></r-pagination>',
      });
      
      const prevBtn = page.root.querySelector('.r-pagination__prev');
      expect(prevBtn.classList.contains('r-pagination__btn--disabled')).toBe(false);
    });

    it('should disable next button on last page', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" page-size="10" current-page="10"></r-pagination>',
      });
      
      const nextBtn = page.root.querySelector('.r-pagination__next');
      expect(nextBtn.classList.contains('r-pagination__btn--disabled')).toBe(true);
    });

    it('should go to previous page on prev click', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" current-page="5"></r-pagination>',
      });
      
      const prevBtn = page.root.querySelector('.r-pagination__prev') as HTMLElement;
      prevBtn.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.currentPage).toBe(4);
    });

    it('should go to next page on next click', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" current-page="5"></r-pagination>',
      });
      
      const nextBtn = page.root.querySelector('.r-pagination__next') as HTMLElement;
      nextBtn.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.currentPage).toBe(6);
    });

    it('should render custom prev text', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" prev-text="Previous"></r-pagination>',
      });
      
      const prevBtn = page.root.querySelector('.r-pagination__prev');
      expect(prevBtn.textContent).toBe('Previous');
    });

    it('should render custom next text', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" next-text="Next"></r-pagination>',
      });
      
      const nextBtn = page.root.querySelector('.r-pagination__next');
      expect(nextBtn.textContent).toBe('Next');
    });
  });

  // ==================== PAGE SIZE TESTS ====================
  describe('page size', () => {
    it('should calculate total pages based on page size', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" page-size="20"></r-pagination>',
      });
      
      // 100 / 20 = 5 pages
      const numbers = page.root.querySelectorAll('.r-pagination__number');
      expect(numbers.length).toBe(5);
    });

    it('should render sizes selector when in layout', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" layout="sizes, prev, pager, next"></r-pagination>',
      });
      
      const sizes = page.root.querySelector('.r-pagination__sizes');
      expect(sizes).not.toBeNull();
    });

    it('should change page size on selection', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" layout="sizes, prev, pager, next"></r-pagination>',
      });
      
      // Open dropdown
      const sizesSelect = page.root.querySelector('.r-pagination__sizes-select') as HTMLElement;
      sizesSelect.click();
      await page.waitForChanges();
      
      // Select new size
      const options = page.root.querySelectorAll('.r-pagination__sizes-option');
      (options[1] as HTMLElement).click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.pageSize).toBe(20);
    });
  });

  // ==================== TOTAL TESTS ====================
  describe('total', () => {
    it('should render total when in layout', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" layout="total, prev, pager, next"></r-pagination>',
      });
      
      const total = page.root.querySelector('.r-pagination__total');
      expect(total).not.toBeNull();
      expect(total.textContent).toBe('Total 100');
    });
  });

  // ==================== JUMPER TESTS ====================
  describe('jumper', () => {
    it('should render jumper when in layout', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" layout="prev, pager, next, jumper"></r-pagination>',
      });
      
      const jumper = page.root.querySelector('.r-pagination__jumper');
      expect(jumper).not.toBeNull();
    });

    it('should jump to page on Enter', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" layout="prev, pager, next, jumper"></r-pagination>',
      });
      
      const input = page.root.querySelector('.r-pagination__jumper-input') as HTMLInputElement;
      input.value = '5';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      
      await page.waitForChanges();
      
      expect(page.rootInstance.currentPage).toBe(5);
    });

    it('should clamp jumper value to valid range', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" page-size="10" layout="prev, pager, next, jumper"></r-pagination>',
      });
      
      const input = page.root.querySelector('.r-pagination__jumper-input') as HTMLInputElement;
      input.value = '999';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      
      await page.waitForChanges();
      
      expect(page.rootInstance.currentPage).toBe(10); // Max page
    });
  });

  // ==================== ELLIPSIS TESTS ====================
  describe('ellipsis', () => {
    it('should show ellipsis for many pages', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="1000" page-size="10"></r-pagination>',
      });
      
      const ellipsis = page.root.querySelectorAll('.r-pagination__ellipsis');
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it('should jump pages on ellipsis click', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="1000" page-size="10" current-page="50"></r-pagination>',
      });
      
      const ellipsis = page.root.querySelector('.r-pagination__ellipsis') as HTMLElement;
      ellipsis.click();
      
      await page.waitForChanges();
      
      // Should jump by pagerCount - 2
      expect(page.rootInstance.currentPage).toBeLessThan(50);
    });
  });

  // ==================== DISABLED TESTS ====================
  describe('disabled', () => {
    it('should disable all controls when disabled', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" disabled></r-pagination>',
      });
      
      const pagination = page.root.querySelector('.r-pagination');
      expect(pagination.classList.contains('r-pagination--disabled')).toBe(true);
    });

    it('should not navigate when disabled', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" current-page="5" disabled></r-pagination>',
      });
      
      const nextBtn = page.root.querySelector('.r-pagination__next') as HTMLElement;
      nextBtn.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.currentPage).toBe(5);
    });
  });

  // ==================== HIDE ON SINGLE PAGE TESTS ====================
  describe('hide on single page', () => {
    it('should hide when only one page and hide-on-single-page is true', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="5" page-size="10" hide-on-single-page></r-pagination>',
      });
      
      const pagination = page.root.querySelector('.r-pagination');
      expect(pagination).toBeNull();
    });

    it('should show when multiple pages even with hide-on-single-page', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" page-size="10" hide-on-single-page></r-pagination>',
      });
      
      const pagination = page.root.querySelector('.r-pagination');
      expect(pagination).not.toBeNull();
    });
  });

  // ==================== EVENT TESTS ====================
  describe('events', () => {
    it('should emit currentChange on page change', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const changeSpy = jest.fn();
      page.root.addEventListener('currentChange', changeSpy);
      
      const numbers = page.root.querySelectorAll('.r-pagination__number');
      (numbers[1] as HTMLElement).click();
      
      await page.waitForChanges();
      
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.mock.calls[0][0].detail).toBe(2);
    });

    it('should emit sizeChange on page size change', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" layout="sizes, prev, pager, next"></r-pagination>',
      });
      
      const changeSpy = jest.fn();
      page.root.addEventListener('sizeChange', changeSpy);
      
      // Open dropdown
      const sizesSelect = page.root.querySelector('.r-pagination__sizes-select') as HTMLElement;
      sizesSelect.click();
      await page.waitForChanges();
      
      // Select new size
      const options = page.root.querySelectorAll('.r-pagination__sizes-option');
      (options[1] as HTMLElement).click();
      
      await page.waitForChanges();
      
      expect(changeSpy).toHaveBeenCalled();
    });

    it('should emit change event with both currentPage and pageSize', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const numbers = page.root.querySelectorAll('.r-pagination__number');
      (numbers[1] as HTMLElement).click();
      
      await page.waitForChanges();
      
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.mock.calls[0][0].detail).toEqual({
        currentPage: 2,
        pageSize: 10,
      });
    });

    it('should emit prevClick on prev button click', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" current-page="5"></r-pagination>',
      });
      
      const prevClickSpy = jest.fn();
      page.root.addEventListener('prevClick', prevClickSpy);
      
      const prevBtn = page.root.querySelector('.r-pagination__prev') as HTMLElement;
      prevBtn.click();
      
      await page.waitForChanges();
      
      expect(prevClickSpy).toHaveBeenCalled();
    });

    it('should emit nextClick on next button click', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" current-page="5"></r-pagination>',
      });
      
      const nextClickSpy = jest.fn();
      page.root.addEventListener('nextClick', nextClickSpy);
      
      const nextBtn = page.root.querySelector('.r-pagination__next') as HTMLElement;
      nextBtn.click();
      
      await page.waitForChanges();
      
      expect(nextClickSpy).toHaveBeenCalled();
    });
  });

  // ==================== LAYOUT TESTS ====================
  describe('layout', () => {
    it('should render elements in specified order', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" layout="total, prev, pager, next, sizes, jumper"></r-pagination>',
      });
      
      const left = page.root.querySelector('.r-pagination__left');
      expect(left.children.length).toBeGreaterThan(0);
    });

    it('should support right-aligned elements with ->', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100" layout="prev, pager, next, ->, total"></r-pagination>',
      });
      
      const right = page.root.querySelector('.r-pagination__right');
      expect(right).not.toBeNull();
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe('accessibility', () => {
    it('should have aria-label on prev button', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const prevBtn = page.root.querySelector('.r-pagination__prev');
      expect(prevBtn.getAttribute('aria-label')).toBe('Previous page');
    });

    it('should have aria-label on next button', async () => {
      page = await newSpecPage({
        components: [RPagination],
        html: '<r-pagination total="100"></r-pagination>',
      });
      
      const nextBtn = page.root.querySelector('.r-pagination__next');
      expect(nextBtn.getAttribute('aria-label')).toBe('Next page');
    });
  });
});
