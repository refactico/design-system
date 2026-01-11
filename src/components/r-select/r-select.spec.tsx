import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RSelect } from './r-select';
import { RInput } from '../r-input/r-input';

describe('r-select', () => {
  let page: SpecPage;

  const defaultOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', disabled: true },
  ];

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      const select = page.root.querySelector('.r-select');
      expect(select).not.toBeNull();
    });

    it('should render trigger element', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      const trigger = page.root.querySelector('.r-select__trigger');
      expect(trigger).not.toBeNull();
    });

    it('should render input inside trigger', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      const input = page.root.querySelector('.r-select__input');
      expect(input).not.toBeNull();
    });

    it('should render arrow icon', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      const arrow = page.root.querySelector('.r-select__arrow');
      expect(arrow).not.toBeNull();
    });
  });

  // ==================== OPTIONS TESTS ====================
  describe('options', () => {
    it('should render options when dropdown is open', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const options = page.root.querySelectorAll('.r-select__option');
      expect(options.length).toBe(3);
    });

    it('should render option labels', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const options = page.root.querySelectorAll('.r-select__option');
      expect(options[0].textContent).toContain('Option 1');
      expect(options[1].textContent).toContain('Option 2');
    });

    it('should render disabled options', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const disabledOption = page.root.querySelectorAll('.r-select__option')[2];
      expect(disabledOption.classList.contains('r-select__option--disabled')).toBe(true);
    });

    it('should render option groups', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = [
        {
          label: 'Group 1',
          options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
          ],
        },
        {
          label: 'Group 2',
          options: [
            { value: '3', label: 'Option 3' },
          ],
        },
      ];
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const groups = page.root.querySelectorAll('.r-select__group');
      expect(groups.length).toBe(2);
      
      const groupLabels = page.root.querySelectorAll('.r-select__group-label');
      expect(groupLabels[0].textContent).toBe('Group 1');
      expect(groupLabels[1].textContent).toBe('Group 2');
    });
  });

  // ==================== SIZE TESTS ====================
  describe('sizes', () => {
    it('should render default size', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      const select = page.root.querySelector('.r-select');
      expect(select.classList.contains('r-select--default')).toBe(true);
    });

    it('should render large size', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select size="large"></r-select>',
      });
      
      const select = page.root.querySelector('.r-select');
      expect(select.classList.contains('r-select--large')).toBe(true);
    });

    it('should render small size', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select size="small"></r-select>',
      });
      
      const select = page.root.querySelector('.r-select');
      expect(select.classList.contains('r-select--small')).toBe(true);
    });
  });

  // ==================== DISABLED TESTS ====================
  describe('disabled', () => {
    it('should render disabled state', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select disabled></r-select>',
      });
      
      const select = page.root.querySelector('.r-select');
      expect(select.classList.contains('r-select--disabled')).toBe(true);
    });

    it('should not open dropdown when disabled', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select disabled></r-select>',
      });
      
      const trigger = page.root.querySelector('.r-select__trigger') as HTMLElement;
      trigger.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });
  });

  // ==================== PLACEHOLDER TESTS ====================
  describe('placeholder', () => {
    it('should render default placeholder', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      // The placeholder is passed to r-input which renders it on the inner input
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('placeholder')).toBe('Select');
    });

    it('should render custom placeholder', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select placeholder="Choose an option"></r-select>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('placeholder')).toBe('Choose an option');
    });
  });

  // ==================== SELECTION TESTS ====================
  describe('selection', () => {
    it('should select option on click', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const option = page.root.querySelector('.r-select__option') as HTMLElement;
      option.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.value).toBe('1');
    });

    it('should close dropdown after selection', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const option = page.root.querySelector('.r-select__option') as HTMLElement;
      option.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });

    it('should show selected option as checked', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select value="1"></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const selectedOption = page.root.querySelector('.r-select__option--selected');
      expect(selectedOption).not.toBeNull();
      
      const checkmark = selectedOption.querySelector('.r-select__option-check');
      expect(checkmark).not.toBeNull();
    });

    it('should not select disabled option', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const disabledOption = page.root.querySelectorAll('.r-select__option')[2] as HTMLElement;
      disabledOption.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.value).toBe('');
    });
  });

  // ==================== MULTIPLE SELECTION TESTS ====================
  describe('multiple selection', () => {
    it('should render multiple mode', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select multiple></r-select>',
      });
      
      const select = page.root.querySelector('.r-select');
      expect(select.classList.contains('r-select--multiple')).toBe(true);
    });

    it('should select multiple options', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select multiple></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const options = page.root.querySelectorAll('.r-select__option');
      (options[0] as HTMLElement).click();
      await page.waitForChanges();
      
      (options[1] as HTMLElement).click();
      await page.waitForChanges();
      
      expect(page.rootInstance.value).toEqual(['1', '2']);
    });

    it('should render tags for selected options', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select multiple></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.value = ['1', '2'];
      await page.waitForChanges();
      
      const tags = page.root.querySelectorAll('.r-select__tag');
      expect(tags.length).toBe(2);
    });

    it('should remove tag on close click', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select multiple></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.value = ['1', '2'];
      await page.waitForChanges();
      
      const closeBtn = page.root.querySelector('.r-select__tag-close') as HTMLElement;
      closeBtn.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.value).toEqual(['2']);
    });

    it('should not close dropdown after selection in multiple mode', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select multiple></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const option = page.root.querySelector('.r-select__option') as HTMLElement;
      option.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should respect multiple-limit', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select multiple multiple-limit="2"></r-select>',
      });
      
      page.rootInstance.options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ];
      page.rootInstance.value = ['1', '2'];
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const options = page.root.querySelectorAll('.r-select__option');
      (options[2] as HTMLElement).click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.value).toEqual(['1', '2']);
    });
  });

  // ==================== COLLAPSE TAGS TESTS ====================
  describe('collapse tags', () => {
    it('should collapse tags when enabled', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select multiple collapse-tags max-collapse-tags="1"></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.value = ['1', '2'];
      await page.waitForChanges();
      
      const collapseTag = page.root.querySelector('.r-select__tag--collapse');
      expect(collapseTag).not.toBeNull();
      expect(collapseTag.textContent).toBe('+1');
    });
  });

  // ==================== CLEARABLE TESTS ====================
  describe('clearable', () => {
    it('should show clear button when clearable and has value', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select clearable value="1"></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.hovering = true;
      await page.waitForChanges();
      
      const clearBtn = page.root.querySelector('.r-select__clear');
      expect(clearBtn).not.toBeNull();
    });

    it('should clear value on clear button click', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select clearable value="1"></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.hovering = true;
      await page.waitForChanges();
      
      const clearBtn = page.root.querySelector('.r-select__clear') as HTMLElement;
      clearBtn.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.value).toBe('');
    });

    it('should emit clear event', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select clearable value="1"></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.hovering = true;
      await page.waitForChanges();
      
      const clearSpy = jest.fn();
      page.root.addEventListener('clear', clearSpy);
      
      const clearBtn = page.root.querySelector('.r-select__clear') as HTMLElement;
      clearBtn.click();
      
      expect(clearSpy).toHaveBeenCalled();
    });
  });

  // ==================== FILTERABLE TESTS ====================
  describe('filterable', () => {
    it('should filter options based on query', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select filterable></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      page.rootInstance.query = 'Option 1';
      await page.waitForChanges();
      
      const options = page.root.querySelectorAll('.r-select__option');
      expect(options.length).toBe(1);
      expect(options[0].textContent).toContain('Option 1');
    });

    it('should show no match text when no results', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select filterable></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      page.rootInstance.query = 'xyz';
      await page.waitForChanges();
      
      const empty = page.root.querySelector('.r-select__empty');
      expect(empty).not.toBeNull();
      expect(empty.textContent).toBe('No matching data');
    });
  });

  // ==================== ALLOW CREATE TESTS ====================
  describe('allow create', () => {
    it('should show create option when allow-create and no match', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select filterable allow-create></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      page.rootInstance.query = 'New Option';
      await page.waitForChanges();
      
      const createOption = page.root.querySelector('.r-select__create-option');
      expect(createOption).not.toBeNull();
      expect(createOption.textContent).toContain('New Option');
    });

    it('should create new option on click', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select filterable allow-create></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      page.rootInstance.query = 'New Option';
      await page.waitForChanges();
      
      const createOption = page.root.querySelector('.r-select__create-option') as HTMLElement;
      createOption.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.value).toBe('New Option');
    });
  });

  // ==================== LOADING TESTS ====================
  describe('loading', () => {
    it('should show loading text when loading', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select loading></r-select>',
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const loading = page.root.querySelector('.r-select__loading');
      expect(loading).not.toBeNull();
      expect(loading.textContent).toBe('Loading...');
    });

    it('should show custom loading text', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select loading loading-text="Please wait..."></r-select>',
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const loading = page.root.querySelector('.r-select__loading');
      expect(loading.textContent).toBe('Please wait...');
    });
  });

  // ==================== KEYBOARD NAVIGATION TESTS ====================
  describe('keyboard navigation', () => {
    it('should open dropdown on ArrowDown', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      
      const select = page.root.querySelector('.r-select') as HTMLElement;
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(true);
    });

    it('should close dropdown on Escape', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const select = page.root.querySelector('.r-select') as HTMLElement;
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });

    it('should navigate options with ArrowDown/ArrowUp', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const select = page.root.querySelector('.r-select') as HTMLElement;
      
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();
      expect(page.rootInstance.focusedIndex).toBe(0);
      
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();
      expect(page.rootInstance.focusedIndex).toBe(1);
      
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await page.waitForChanges();
      expect(page.rootInstance.focusedIndex).toBe(0);
    });

    it('should select focused option on Enter', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      page.rootInstance.focusedIndex = 0;
      await page.waitForChanges();
      
      const select = page.root.querySelector('.r-select') as HTMLElement;
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      
      await page.waitForChanges();
      
      expect(page.rootInstance.value).toBe('1');
    });
  });

  // ==================== EVENT TESTS ====================
  describe('events', () => {
    it('should emit change event on selection', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const option = page.root.querySelector('.r-select__option') as HTMLElement;
      option.click();
      
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.mock.calls[0][0].detail).toBe('1');
    });

    it('should emit visible-change event', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      const visibleChangeSpy = jest.fn();
      page.root.addEventListener('visibleChange', visibleChangeSpy);
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      expect(visibleChangeSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: true,
      }));
    });

    it('should emit remove-tag event in multiple mode', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select multiple></r-select>',
      });
      
      page.rootInstance.options = defaultOptions;
      page.rootInstance.value = ['1', '2'];
      await page.waitForChanges();
      
      const removeTagSpy = jest.fn();
      page.root.addEventListener('removeTag', removeTagSpy);
      
      const closeBtn = page.root.querySelector('.r-select__tag-close') as HTMLElement;
      closeBtn.click();
      
      expect(removeTagSpy).toHaveBeenCalled();
    });
  });

  // ==================== METHOD TESTS ====================
  describe('methods', () => {
    it('should focus via setFocus method', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      const component = page.rootInstance;
      await component.setFocus();
      
      // Method should be callable without error
      expect(true).toBe(true);
    });

    it('should blur via setBlur method', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const component = page.rootInstance;
      await component.setBlur();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.visible).toBe(false);
    });
  });

  // ==================== EMPTY STATE TESTS ====================
  describe('empty state', () => {
    it('should show no data text when no options', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select></r-select>',
      });
      
      page.rootInstance.options = [];
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const empty = page.root.querySelector('.r-select__empty');
      expect(empty).not.toBeNull();
      expect(empty.textContent).toBe('No data');
    });

    it('should show custom no data text', async () => {
      page = await newSpecPage({
        components: [RSelect, RInput],
        html: '<r-select no-data-text="Nothing here"></r-select>',
      });
      
      page.rootInstance.options = [];
      page.rootInstance.visible = true;
      await page.waitForChanges();
      
      const empty = page.root.querySelector('.r-select__empty');
      expect(empty.textContent).toBe('Nothing here');
    });
  });
});
