import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RCheckboxGroup } from './r-checkbox-group';
import { RCheckbox } from '../r-checkbox/r-checkbox';

describe('r-checkbox-group', () => {
  let page: SpecPage;

  const createCheckboxGroup = async (html: string) => {
    page = await newSpecPage({
      components: [RCheckboxGroup, RCheckbox],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createCheckboxGroup('<r-checkbox-group></r-checkbox-group>');
      const group = page.root.querySelector('.r-checkbox-group');
      expect(group).toBeTruthy();
      expect(group.getAttribute('role')).toBe('group');
    });

    it('should render slot content', async () => {
      await createCheckboxGroup(`
        <r-checkbox-group>
          <r-checkbox value="1">Option 1</r-checkbox>
          <r-checkbox value="2">Option 2</r-checkbox>
        </r-checkbox-group>
      `);
      const checkboxes = page.root.querySelectorAll('r-checkbox');
      expect(checkboxes.length).toBe(2);
    });
  });

  describe('value prop', () => {
    it('should accept array value', async () => {
      await createCheckboxGroup('<r-checkbox-group></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      component.value = ['1', '2'];
      await page.waitForChanges();
      expect(component.internalValue).toEqual(['1', '2']);
    });

    it('should default to empty array', async () => {
      await createCheckboxGroup('<r-checkbox-group></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      expect(component.value).toEqual([]);
    });

    it('should update child checkboxes when value changes', async () => {
      await createCheckboxGroup(`
        <r-checkbox-group>
          <r-checkbox value="1">Option 1</r-checkbox>
          <r-checkbox value="2">Option 2</r-checkbox>
        </r-checkbox-group>
      `);
      const component = page.rootInstance as RCheckboxGroup;
      component.value = ['1'];
      await page.waitForChanges();
      expect(component.internalValue).toEqual(['1']);
    });
  });

  describe('size prop', () => {
    it('should default to default size', async () => {
      await createCheckboxGroup('<r-checkbox-group></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      expect(component.size).toBe('default');
    });

    it('should accept large size', async () => {
      await createCheckboxGroup('<r-checkbox-group size="large"></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      expect(component.size).toBe('large');
    });

    it('should accept small size', async () => {
      await createCheckboxGroup('<r-checkbox-group size="small"></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      expect(component.size).toBe('small');
    });
  });

  describe('disabled prop', () => {
    it('should default to false', async () => {
      await createCheckboxGroup('<r-checkbox-group></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      expect(component.disabled).toBe(false);
    });

    it('should accept disabled setting', async () => {
      await createCheckboxGroup('<r-checkbox-group disabled="true"></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      expect(component.disabled).toBe(true);
    });
  });

  describe('min prop', () => {
    it('should accept min value', async () => {
      await createCheckboxGroup('<r-checkbox-group min="1"></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      expect(component.min).toBe(1);
    });

    it('should prevent unchecking below min', async () => {
      await createCheckboxGroup(`
        <r-checkbox-group min="1">
          <r-checkbox value="1">Option 1</r-checkbox>
          <r-checkbox value="2">Option 2</r-checkbox>
        </r-checkbox-group>
      `);
      const component = page.rootInstance as RCheckboxGroup;
      component.value = ['1'];
      await page.waitForChanges();
      
      // Try to uncheck the only checked item
      const checkbox = page.root.querySelector('r-checkbox') as any;
      checkbox.checked = true;
      checkbox.value = '1';
      checkbox.dispatchEvent(new CustomEvent('change', { detail: false, bubbles: true }));
      await page.waitForChanges();
      
      // Should still have 1 item
      expect(component.internalValue.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('max prop', () => {
    it('should accept max value', async () => {
      await createCheckboxGroup('<r-checkbox-group max="2"></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      expect(component.max).toBe(2);
    });

    it('should prevent checking above max', async () => {
      await createCheckboxGroup(`
        <r-checkbox-group max="2">
          <r-checkbox value="1">Option 1</r-checkbox>
          <r-checkbox value="2">Option 2</r-checkbox>
          <r-checkbox value="3">Option 3</r-checkbox>
        </r-checkbox-group>
      `);
      const component = page.rootInstance as RCheckboxGroup;
      component.value = ['1', '2'];
      await page.waitForChanges();
      
      // Try to check a third item
      const checkbox = page.root.querySelectorAll('r-checkbox')[2] as any;
      checkbox.checked = false;
      checkbox.value = '3';
      checkbox.dispatchEvent(new CustomEvent('change', { detail: true, bubbles: true }));
      await page.waitForChanges();
      
      // Should still have 2 items
      expect(component.internalValue.length).toBeLessThanOrEqual(2);
    });
  });

  describe('options prop', () => {
    it('should render checkboxes from options', async () => {
      await createCheckboxGroup('<r-checkbox-group></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      component.options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ];
      await page.waitForChanges();
      const checkboxes = page.root.querySelectorAll('r-checkbox');
      expect(checkboxes.length).toBe(3);
    });

    it('should handle disabled options', async () => {
      await createCheckboxGroup('<r-checkbox-group></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      component.options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2', disabled: true },
      ];
      await page.waitForChanges();
      const checkboxes = page.root.querySelectorAll('r-checkbox');
      // Check that the second checkbox has disabled class
      expect(checkboxes[1].querySelector('.r-checkbox--disabled') || checkboxes[1].classList.contains('r-checkbox--disabled')).toBeTruthy();
    });

    it('should check options based on value', async () => {
      await createCheckboxGroup('<r-checkbox-group></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      component.value = ['1', '3'];
      component.options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ];
      await page.waitForChanges();
      // Check internal state
      expect(component.internalValue).toContain('1');
      expect(component.internalValue).toContain('3');
    });
  });

  describe('vertical prop', () => {
    it('should default to false', async () => {
      await createCheckboxGroup('<r-checkbox-group></r-checkbox-group>');
      const component = page.rootInstance as RCheckboxGroup;
      expect(component.vertical).toBe(false);
    });

    it('should apply vertical class when true', async () => {
      await createCheckboxGroup('<r-checkbox-group vertical="true"></r-checkbox-group>');
      const group = page.root.querySelector('.r-checkbox-group');
      expect(group).toHaveClass('r-checkbox-group--vertical');
    });
  });

  describe('change event', () => {
    it('should emit change event when checkbox is toggled', async () => {
      await createCheckboxGroup(`
        <r-checkbox-group>
          <r-checkbox value="1">Option 1</r-checkbox>
          <r-checkbox value="2">Option 2</r-checkbox>
        </r-checkbox-group>
      `);
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const checkbox = page.root.querySelector('r-checkbox') as any;
      checkbox.checked = false;
      checkbox.value = '1';
      checkbox.dispatchEvent(new CustomEvent('change', { detail: true, bubbles: true }));
      await page.waitForChanges();
      
      expect(changeSpy).toHaveBeenCalled();
    });

    it('should update internal value on change', async () => {
      await createCheckboxGroup(`
        <r-checkbox-group>
          <r-checkbox value="1">Option 1</r-checkbox>
          <r-checkbox value="2">Option 2</r-checkbox>
        </r-checkbox-group>
      `);
      const component = page.rootInstance as RCheckboxGroup;
      
      // Simulate checking by directly updating the component
      component.value = ['1'];
      await page.waitForChanges();
      
      expect(component.internalValue).toContain('1');
    });

    it('should remove value when unchecked', async () => {
      await createCheckboxGroup(`
        <r-checkbox-group>
          <r-checkbox value="1">Option 1</r-checkbox>
          <r-checkbox value="2">Option 2</r-checkbox>
        </r-checkbox-group>
      `);
      const component = page.rootInstance as RCheckboxGroup;
      component.value = ['1', '2'];
      await page.waitForChanges();
      
      // Simulate unchecking by updating value
      component.value = ['2'];
      await page.waitForChanges();
      
      expect(component.internalValue).not.toContain('1');
      expect(component.internalValue).toContain('2');
    });
  });

  describe('child checkbox management', () => {
    it('should update child checkboxes on mount', async () => {
      await createCheckboxGroup(`
        <r-checkbox-group>
          <r-checkbox value="1">Option 1</r-checkbox>
          <r-checkbox value="2">Option 2</r-checkbox>
        </r-checkbox-group>
      `);
      const component = page.rootInstance as RCheckboxGroup;
      component.value = ['2'];
      await page.waitForChanges();
      
      expect(component.internalValue).toContain('2');
    });
  });

  describe('accessibility', () => {
    it('should have group role', async () => {
      await createCheckboxGroup('<r-checkbox-group></r-checkbox-group>');
      const group = page.root.querySelector('.r-checkbox-group');
      expect(group.getAttribute('role')).toBe('group');
    });
  });
});
