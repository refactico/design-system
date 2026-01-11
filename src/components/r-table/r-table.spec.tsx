import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RTable } from './r-table';
import { RLoading } from '../r-loading/r-loading';
import { RSpinner } from '../r-spinner/r-spinner';

describe('r-table', () => {
  let page: SpecPage;

  const defaultColumns = [
    { prop: 'name', label: 'Name' },
    { prop: 'age', label: 'Age' },
    { prop: 'email', label: 'Email' },
  ];

  const defaultData = [
    { id: 1, name: 'John', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Bob', age: 35, email: 'bob@example.com' },
  ];

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      const table = page.root.querySelector('.r-table');
      expect(table).not.toBeNull();
    });

    it('should render table element', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      const tableInner = page.root.querySelector('.r-table__inner');
      expect(tableInner).not.toBeNull();
      expect(tableInner.tagName.toLowerCase()).toBe('table');
    });

    it('should render header', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      await page.waitForChanges();
      
      const header = page.root.querySelector('.r-table__header');
      expect(header).not.toBeNull();
    });

    it('should render body', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      const body = page.root.querySelector('.r-table__body');
      expect(body).not.toBeNull();
    });

    it('should render column headers', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      await page.waitForChanges();
      
      const headers = page.root.querySelectorAll('.r-table__header th');
      expect(headers.length).toBe(3);
      expect(headers[0].textContent).toContain('Name');
      expect(headers[1].textContent).toContain('Age');
      expect(headers[2].textContent).toContain('Email');
    });

    it('should render data rows', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const rows = page.root.querySelectorAll('.r-table__body .r-table__row');
      expect(rows.length).toBe(3);
    });

    it('should render cell values', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const cells = page.root.querySelectorAll('.r-table__body .r-table__row:first-child td');
      expect(cells[0].textContent).toBe('John');
      expect(cells[1].textContent).toBe('30');
      expect(cells[2].textContent).toBe('john@example.com');
    });
  });

  // ==================== SIZE TESTS ====================
  describe('sizes', () => {
    it('should render default size', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      const table = page.root.querySelector('.r-table');
      expect(table.classList.contains('r-table--large')).toBe(false);
      expect(table.classList.contains('r-table--small')).toBe(false);
    });

    it('should render large size', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table size="large"></r-table>',
      });
      
      const table = page.root.querySelector('.r-table');
      expect(table.classList.contains('r-table--large')).toBe(true);
    });

    it('should render small size', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table size="small"></r-table>',
      });
      
      const table = page.root.querySelector('.r-table');
      expect(table.classList.contains('r-table--small')).toBe(true);
    });
  });

  // ==================== BORDER TESTS ====================
  describe('border', () => {
    it('should not have border by default', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      const table = page.root.querySelector('.r-table');
      expect(table.classList.contains('r-table--border')).toBe(false);
    });

    it('should have border when enabled', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table border></r-table>',
      });
      
      const table = page.root.querySelector('.r-table');
      expect(table.classList.contains('r-table--border')).toBe(true);
    });
  });

  // ==================== STRIPE TESTS ====================
  describe('stripe', () => {
    it('should not have stripe by default', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      const table = page.root.querySelector('.r-table');
      expect(table.classList.contains('r-table--stripe')).toBe(false);
    });

    it('should have stripe when enabled', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table stripe></r-table>',
      });
      
      const table = page.root.querySelector('.r-table');
      expect(table.classList.contains('r-table--stripe')).toBe(true);
    });
  });

  // ==================== EMPTY STATE TESTS ====================
  describe('empty state', () => {
    it('should show empty text when no data', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      page.rootInstance.data = [];
      await page.waitForChanges();
      
      const empty = page.root.querySelector('.r-table__empty');
      expect(empty).not.toBeNull();
      expect(empty.textContent).toBe('No data');
    });

    it('should show custom empty text', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table empty-text="No records found"></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      page.rootInstance.data = [];
      await page.waitForChanges();
      
      const empty = page.root.querySelector('.r-table__empty');
      expect(empty.textContent).toBe('No records found');
    });

    it('should render empty slot', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table><span slot="empty">Custom empty</span></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      page.rootInstance.data = [];
      await page.waitForChanges();
      
      const slotContent = page.root.querySelector('[slot="empty"]');
      expect(slotContent).not.toBeNull();
    });
  });

  // ==================== HEADER VISIBILITY TESTS ====================
  describe('header visibility', () => {
    it('should show header by default', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      await page.waitForChanges();
      
      const header = page.root.querySelector('.r-table__header');
      expect(header).not.toBeNull();
    });

    it('should hide header when show-header is false', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table show-header="false"></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      await page.waitForChanges();
      
      const header = page.root.querySelector('.r-table__header');
      expect(header).toBeNull();
    });
  });

  // ==================== SORTING TESTS ====================
  describe('sorting', () => {
    it('should render sortable column', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { prop: 'name', label: 'Name', sortable: true },
        { prop: 'age', label: 'Age' },
      ];
      await page.waitForChanges();
      
      const sortableCell = page.root.querySelector('.r-table__cell--sortable');
      expect(sortableCell).not.toBeNull();
    });

    it('should render sort icons for sortable columns', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { prop: 'name', label: 'Name', sortable: true },
      ];
      await page.waitForChanges();
      
      const sortIcons = page.root.querySelectorAll('.r-table__sort-icon');
      expect(sortIcons.length).toBe(2); // asc and desc icons
    });

    it('should sort ascending on first click', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { prop: 'name', label: 'Name', sortable: true },
      ];
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const sortableCell = page.root.querySelector('.r-table__cell--sortable') as HTMLElement;
      sortableCell.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.sortOrder).toBe('ascending');
      expect(page.rootInstance.sortProp).toBe('name');
    });

    it('should sort descending on second click', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { prop: 'name', label: 'Name', sortable: true },
      ];
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const sortableCell = page.root.querySelector('.r-table__cell--sortable') as HTMLElement;
      sortableCell.click();
      await page.waitForChanges();
      
      sortableCell.click();
      await page.waitForChanges();
      
      expect(page.rootInstance.sortOrder).toBe('descending');
    });

    it('should clear sort on third click', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { prop: 'name', label: 'Name', sortable: true },
      ];
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const sortableCell = page.root.querySelector('.r-table__cell--sortable') as HTMLElement;
      sortableCell.click();
      await page.waitForChanges();
      sortableCell.click();
      await page.waitForChanges();
      sortableCell.click();
      await page.waitForChanges();
      
      expect(page.rootInstance.sortOrder).toBeNull();
      expect(page.rootInstance.sortProp).toBe('');
    });

    it('should emit sortChange event', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { prop: 'name', label: 'Name', sortable: true },
      ];
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const sortChangeSpy = jest.fn();
      page.root.addEventListener('sortChange', sortChangeSpy);
      
      const sortableCell = page.root.querySelector('.r-table__cell--sortable') as HTMLElement;
      sortableCell.click();
      
      await page.waitForChanges();
      
      expect(sortChangeSpy).toHaveBeenCalled();
      expect(sortChangeSpy.mock.calls[0][0].detail).toEqual({
        prop: 'name',
        order: 'ascending',
      });
    });
  });

  // ==================== HIGHLIGHT CURRENT ROW TESTS ====================
  describe('highlight current row', () => {
    it('should highlight row on click when enabled', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table highlight-current-row></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const row = page.root.querySelector('.r-table__row') as HTMLElement;
      row.click();
      
      await page.waitForChanges();
      
      expect(row.classList.contains('r-table__row--current')).toBe(true);
    });

    it('should emit currentChange event', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table highlight-current-row></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const currentChangeSpy = jest.fn();
      page.root.addEventListener('currentChange', currentChangeSpy);
      
      const row = page.root.querySelector('.r-table__row') as HTMLElement;
      row.click();
      
      await page.waitForChanges();
      
      expect(currentChangeSpy).toHaveBeenCalled();
      expect(currentChangeSpy.mock.calls[0][0].detail).toEqual(defaultData[0]);
    });
  });

  // ==================== ROW CLICK TESTS ====================
  describe('row click', () => {
    it('should emit rowClick event', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const rowClickSpy = jest.fn();
      page.root.addEventListener('rowClick', rowClickSpy);
      
      const row = page.root.querySelector('.r-table__row') as HTMLElement;
      row.click();
      
      await page.waitForChanges();
      
      expect(rowClickSpy).toHaveBeenCalled();
      expect(rowClickSpy.mock.calls[0][0].detail).toEqual({
        row: defaultData[0],
        index: 0,
      });
    });
  });

  // ==================== CELL CLICK TESTS ====================
  describe('cell click', () => {
    it('should emit cellClick event', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const cellClickSpy = jest.fn();
      page.root.addEventListener('cellClick', cellClickSpy);
      
      const cell = page.root.querySelector('.r-table__body td') as HTMLElement;
      cell.click();
      
      await page.waitForChanges();
      
      expect(cellClickSpy).toHaveBeenCalled();
    });
  });

  // ==================== COLUMN WIDTH TESTS ====================
  describe('column width', () => {
    it('should apply column width', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { prop: 'name', label: 'Name', width: '200px' },
        { prop: 'age', label: 'Age' },
      ];
      await page.waitForChanges();
      
      const header = page.root.querySelector('.r-table__header th') as HTMLElement;
      expect(header.style.width).toBe('200px');
    });

    it('should apply column min-width', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { prop: 'name', label: 'Name', minWidth: '100px' },
        { prop: 'age', label: 'Age' },
      ];
      await page.waitForChanges();
      
      const header = page.root.querySelector('.r-table__header th') as HTMLElement;
      expect(header.style.minWidth).toBe('100px');
    });
  });

  // ==================== COLUMN ALIGNMENT TESTS ====================
  describe('column alignment', () => {
    it('should apply left alignment by default', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = defaultColumns;
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const cell = page.root.querySelector('.r-table__body td');
      expect(cell.classList.contains('r-table__cell--left')).toBe(true);
    });

    it('should apply center alignment', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { prop: 'name', label: 'Name', align: 'center' },
      ];
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const cell = page.root.querySelector('.r-table__body td');
      expect(cell.classList.contains('r-table__cell--center')).toBe(true);
    });

    it('should apply right alignment', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { prop: 'name', label: 'Name', align: 'right' },
      ];
      page.rootInstance.data = defaultData;
      await page.waitForChanges();
      
      const cell = page.root.querySelector('.r-table__body td');
      expect(cell.classList.contains('r-table__cell--right')).toBe(true);
    });
  });

  // ==================== FORMATTER TESTS ====================
  describe('formatter', () => {
    it('should apply column formatter', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table></r-table>',
      });
      
      page.rootInstance.columns = [
        { 
          prop: 'age', 
          label: 'Age',
          formatter: (_row, _column, value) => `${value} years old`,
        },
      ];
      page.rootInstance.data = [{ id: 1, age: 30 }];
      await page.waitForChanges();
      
      const cell = page.root.querySelector('.r-table__body td');
      expect(cell.textContent).toBe('30 years old');
    });
  });

  // ==================== MAX HEIGHT TESTS ====================
  describe('max height', () => {
    it('should apply max height', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table max-height="300px"></r-table>',
      });
      
      const table = page.root.querySelector('.r-table') as HTMLElement;
      expect(table.style.maxHeight).toBe('300px');
    });
  });

  // ==================== LOADING TESTS ====================
  describe('loading', () => {
    it('should show loading state', async () => {
      page = await newSpecPage({
        components: [RTable, RLoading, RSpinner],
        html: '<r-table loading="true"></r-table>',
      });
      
      const loading = page.root.querySelector('r-loading');
      expect(loading).not.toBeNull();
      // Check that loading prop is passed
      const loadingMask = page.root.querySelector('.r-loading__mask--visible');
      expect(loadingMask).toBeTruthy();
    });
  });
});
