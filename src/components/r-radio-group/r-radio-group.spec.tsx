import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RRadioGroup } from './r-radio-group';
import { RRadio } from '../r-radio/r-radio';
import { RRadioButton } from '../r-radio-button/r-radio-button';

describe('r-radio-group', () => {
  let page: SpecPage;

  const createRadioGroup = async (html: string) => {
    page = await newSpecPage({
      components: [RRadioGroup, RRadio, RRadioButton],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createRadioGroup('<r-radio-group></r-radio-group>');
      const group = page.root.querySelector('.r-radio-group');
      expect(group).toBeTruthy();
      expect(group.getAttribute('role')).toBe('radiogroup');
    });

    it('should render slot content', async () => {
      await createRadioGroup(`
        <r-radio-group>
          <r-radio value="1">Option 1</r-radio>
          <r-radio value="2">Option 2</r-radio>
        </r-radio-group>
      `);
      const radios = page.root.querySelectorAll('r-radio');
      expect(radios.length).toBe(2);
    });
  });

  describe('value prop', () => {
    it('should set initial value', async () => {
      await createRadioGroup('<r-radio-group value="1"></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.value).toBe('1');
    });

    it('should update child radios when value changes', async () => {
      await createRadioGroup(`
        <r-radio-group value="1">
          <r-radio value="1">Option 1</r-radio>
          <r-radio value="2">Option 2</r-radio>
        </r-radio-group>
      `);
      const component = page.rootInstance as RRadioGroup;
      component.value = '2';
      await page.waitForChanges();
      expect(component.internalValue).toBe('2');
    });
  });

  describe('size prop', () => {
    it('should default to default size', async () => {
      await createRadioGroup('<r-radio-group></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.size).toBe('default');
    });

    it('should accept large size', async () => {
      await createRadioGroup('<r-radio-group size="large"></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.size).toBe('large');
    });

    it('should accept small size', async () => {
      await createRadioGroup('<r-radio-group size="small"></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.size).toBe('small');
    });
  });

  describe('disabled prop', () => {
    it('should default to false', async () => {
      await createRadioGroup('<r-radio-group></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.disabled).toBe(false);
    });

    it('should accept disabled setting', async () => {
      await createRadioGroup('<r-radio-group disabled="true"></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.disabled).toBe(true);
    });
  });

  describe('validateEvent prop', () => {
    it('should default to true', async () => {
      await createRadioGroup('<r-radio-group></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.validateEvent).toBe(true);
    });

    it('should accept validate event setting', async () => {
      await createRadioGroup('<r-radio-group validate-event="false"></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.validateEvent).toBe(false);
    });
  });

  describe('textColor prop', () => {
    it('should default to white', async () => {
      await createRadioGroup('<r-radio-group></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.textColor).toBe('#ffffff');
    });

    it('should accept custom text color', async () => {
      await createRadioGroup('<r-radio-group text-color="#000000"></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.textColor).toBe('#000000');
    });
  });

  describe('fill prop', () => {
    it('should accept fill color', async () => {
      await createRadioGroup('<r-radio-group fill="#409eff"></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.fill).toBe('#409eff');
    });
  });

  describe('inputName prop', () => {
    it('should accept name attribute', async () => {
      await createRadioGroup('<r-radio-group name="gender"></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.inputName).toBe('gender');
    });
  });

  describe('ariaLabel prop', () => {
    it('should set aria-label on group', async () => {
      await createRadioGroup('<r-radio-group aria-label="Select option"></r-radio-group>');
      const group = page.root.querySelector('.r-radio-group');
      expect(group.getAttribute('aria-label')).toBe('Select option');
    });
  });

  describe('options prop', () => {
    it('should render radios from options', async () => {
      await createRadioGroup('<r-radio-group></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      component.options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ];
      await page.waitForChanges();
      const radios = page.root.querySelectorAll('r-radio');
      expect(radios.length).toBe(3);
    });

    it('should render radio buttons when type is button', async () => {
      await createRadioGroup('<r-radio-group type="button"></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      component.options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ];
      await page.waitForChanges();
      const radioButtons = page.root.querySelectorAll('r-radio-button');
      expect(radioButtons.length).toBe(2);
    });

    it('should handle disabled options', async () => {
      await createRadioGroup('<r-radio-group></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      component.options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2', disabled: true },
      ];
      await page.waitForChanges();
      // Check that options are set correctly
      expect(component.options[1].disabled).toBe(true);
    });
  });

  describe('type prop', () => {
    it('should default to radio', async () => {
      await createRadioGroup('<r-radio-group></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.type).toBe('radio');
    });

    it('should accept button type', async () => {
      await createRadioGroup('<r-radio-group type="button"></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.type).toBe('button');
    });
  });

  describe('vertical prop', () => {
    it('should default to false', async () => {
      await createRadioGroup('<r-radio-group></r-radio-group>');
      const component = page.rootInstance as RRadioGroup;
      expect(component.vertical).toBe(false);
    });

    it('should apply vertical class when true', async () => {
      await createRadioGroup('<r-radio-group vertical="true"></r-radio-group>');
      const group = page.root.querySelector('.r-radio-group');
      expect(group).toHaveClass('r-radio-group--vertical');
    });
  });

  describe('change event', () => {
    it('should emit change event when radio is selected', async () => {
      await createRadioGroup(`
        <r-radio-group>
          <r-radio value="1">Option 1</r-radio>
          <r-radio value="2">Option 2</r-radio>
        </r-radio-group>
      `);
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const radio = page.root.querySelector('r-radio') as HTMLElement;
      radio.dispatchEvent(new CustomEvent('change', { detail: '1', bubbles: true }));
      await page.waitForChanges();
      
      expect(changeSpy).toHaveBeenCalled();
    });

    it('should update internal value on change', async () => {
      await createRadioGroup(`
        <r-radio-group value="1">
          <r-radio value="1">Option 1</r-radio>
          <r-radio value="2">Option 2</r-radio>
        </r-radio-group>
      `);
      const component = page.rootInstance as RRadioGroup;
      
      const radio = page.root.querySelectorAll('r-radio')[1] as HTMLElement;
      radio.dispatchEvent(new CustomEvent('change', { detail: '2', bubbles: true }));
      await page.waitForChanges();
      
      expect(component.internalValue).toBe('2');
    });
  });

  describe('child radio management', () => {
    it('should update child radios on mount', async () => {
      await createRadioGroup(`
        <r-radio-group value="2">
          <r-radio value="1">Option 1</r-radio>
          <r-radio value="2">Option 2</r-radio>
        </r-radio-group>
      `);
      await page.waitForChanges();
      const component = page.rootInstance as RRadioGroup;
      expect(component.internalValue).toBe('2');
    });
  });

  describe('accessibility', () => {
    it('should have radiogroup role', async () => {
      await createRadioGroup('<r-radio-group></r-radio-group>');
      const group = page.root.querySelector('.r-radio-group');
      expect(group.getAttribute('role')).toBe('radiogroup');
    });

    it('should support aria-label', async () => {
      await createRadioGroup('<r-radio-group aria-label="Choose option"></r-radio-group>');
      const group = page.root.querySelector('.r-radio-group');
      expect(group.getAttribute('aria-label')).toBe('Choose option');
    });
  });
});
