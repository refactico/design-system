import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RRadioButton } from './r-radio-button';

describe('r-radio-button', () => {
  let page: SpecPage;

  const createRadioButton = async (html: string) => {
    page = await newSpecPage({
      components: [RRadioButton],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createRadioButton('<r-radio-button></r-radio-button>');
      const radioButton = page.root.querySelector('.r-radio-button');
      expect(radioButton).toBeTruthy();
    });

    it('should render native radio input', async () => {
      await createRadioButton('<r-radio-button></r-radio-button>');
      const input = page.root.querySelector('input[type="radio"]');
      expect(input).toBeTruthy();
      expect(input).toHaveClass('r-radio-button__original');
    });

    it('should render inner span', async () => {
      await createRadioButton('<r-radio-button></r-radio-button>');
      const inner = page.root.querySelector('.r-radio-button__inner');
      expect(inner).toBeTruthy();
    });

    it('should render slot content', async () => {
      await createRadioButton('<r-radio-button>Option A</r-radio-button>');
      const inner = page.root.querySelector('.r-radio-button__inner');
      expect(inner.textContent).toContain('Option A');
    });

    it('should render label prop as fallback', async () => {
      await createRadioButton('<r-radio-button label="Option B"></r-radio-button>');
      const inner = page.root.querySelector('.r-radio-button__inner');
      expect(inner.textContent).toContain('Option B');
    });
  });

  describe('value prop', () => {
    it('should accept string value', async () => {
      await createRadioButton('<r-radio-button value="option1"></r-radio-button>');
      const component = page.rootInstance as RRadioButton;
      expect(component.value).toBe('option1');
    });

    it('should accept number value', async () => {
      await createRadioButton('<r-radio-button value="1"></r-radio-button>');
      const component = page.rootInstance as RRadioButton;
      expect(component.value).toBe('1');
    });

    it('should set value on native input', async () => {
      await createRadioButton('<r-radio-button value="test"></r-radio-button>');
      const input = page.root.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('test');
    });
  });

  describe('label prop', () => {
    it('should display label text', async () => {
      await createRadioButton('<r-radio-button label="My Label"></r-radio-button>');
      const inner = page.root.querySelector('.r-radio-button__inner');
      expect(inner.textContent).toContain('My Label');
    });
  });

  describe('disabled prop', () => {
    it('should default to false', async () => {
      await createRadioButton('<r-radio-button></r-radio-button>');
      const component = page.rootInstance as RRadioButton;
      expect(component.disabled).toBe(false);
    });

    it('should apply disabled class', async () => {
      await createRadioButton('<r-radio-button disabled="true"></r-radio-button>');
      const radioButton = page.root.querySelector('.r-radio-button');
      expect(radioButton).toHaveClass('r-radio-button--disabled');
    });

    it('should disable native input', async () => {
      await createRadioButton('<r-radio-button disabled="true"></r-radio-button>');
      const input = page.root.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('should not emit change when disabled', async () => {
      await createRadioButton('<r-radio-button disabled="true" value="test"></r-radio-button>');
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const label = page.root.querySelector('.r-radio-button') as HTMLElement;
      label.click();
      await page.waitForChanges();
      
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('size prop', () => {
    it('should default to default size', async () => {
      await createRadioButton('<r-radio-button></r-radio-button>');
      const component = page.rootInstance as RRadioButton;
      expect(component.size).toBe('default');
    });

    it('should apply large size class', async () => {
      await createRadioButton('<r-radio-button size="large"></r-radio-button>');
      const radioButton = page.root.querySelector('.r-radio-button');
      expect(radioButton).toHaveClass('r-radio-button--large');
    });

    it('should apply small size class', async () => {
      await createRadioButton('<r-radio-button size="small"></r-radio-button>');
      const radioButton = page.root.querySelector('.r-radio-button');
      expect(radioButton).toHaveClass('r-radio-button--small');
    });

    it('should not apply size class for default', async () => {
      await createRadioButton('<r-radio-button size="default"></r-radio-button>');
      const radioButton = page.root.querySelector('.r-radio-button');
      expect(radioButton).not.toHaveClass('r-radio-button--default');
    });
  });

  describe('inputName prop', () => {
    it('should set name on native input', async () => {
      await createRadioButton('<r-radio-button name="gender"></r-radio-button>');
      const input = page.root.querySelector('input') as HTMLInputElement;
      expect(input.name).toBe('gender');
    });
  });

  describe('checked prop', () => {
    it('should default to false', async () => {
      await createRadioButton('<r-radio-button></r-radio-button>');
      const component = page.rootInstance as RRadioButton;
      expect(component.checked).toBe(false);
    });

    it('should apply checked class', async () => {
      await createRadioButton('<r-radio-button checked="true"></r-radio-button>');
      const radioButton = page.root.querySelector('.r-radio-button');
      expect(radioButton).toHaveClass('r-radio-button--checked');
    });

    it('should set checked on native input', async () => {
      await createRadioButton('<r-radio-button checked="true"></r-radio-button>');
      const input = page.root.querySelector('input') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });
  });

  describe('click handling', () => {
    it('should emit change event on click', async () => {
      await createRadioButton('<r-radio-button value="test"></r-radio-button>');
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const label = page.root.querySelector('.r-radio-button') as HTMLElement;
      label.click();
      await page.waitForChanges();
      
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.mock.calls[0][0].detail).toBe('test');
    });

    it('should set checked to true on click', async () => {
      await createRadioButton('<r-radio-button value="test"></r-radio-button>');
      const component = page.rootInstance as RRadioButton;
      
      const label = page.root.querySelector('.r-radio-button') as HTMLElement;
      label.click();
      await page.waitForChanges();
      
      expect(component.checked).toBe(true);
    });

    it('should not emit change if already checked', async () => {
      await createRadioButton('<r-radio-button value="test" checked="true"></r-radio-button>');
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const label = page.root.querySelector('.r-radio-button') as HTMLElement;
      label.click();
      await page.waitForChanges();
      
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('focus handling', () => {
    it('should apply focused class on focus', async () => {
      await createRadioButton('<r-radio-button></r-radio-button>');
      const input = page.root.querySelector('input');
      
      input.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      
      const radioButton = page.root.querySelector('.r-radio-button');
      expect(radioButton).toHaveClass('r-radio-button--focused');
    });

    it('should remove focused class on blur', async () => {
      await createRadioButton('<r-radio-button></r-radio-button>');
      const component = page.rootInstance as RRadioButton;
      component.focused = true;
      await page.waitForChanges();
      
      const input = page.root.querySelector('input');
      input.dispatchEvent(new FocusEvent('blur'));
      await page.waitForChanges();
      
      const radioButton = page.root.querySelector('.r-radio-button');
      expect(radioButton).not.toHaveClass('r-radio-button--focused');
    });
  });

  describe('keyboard handling', () => {
    it('should trigger click on Space key', async () => {
      await createRadioButton('<r-radio-button value="test"></r-radio-button>');
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const input = page.root.querySelector('input');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      await page.waitForChanges();
      
      expect(changeSpy).toHaveBeenCalled();
    });

    it('should trigger click on Enter key', async () => {
      await createRadioButton('<r-radio-button value="test"></r-radio-button>');
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const input = page.root.querySelector('input');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();
      
      expect(changeSpy).toHaveBeenCalled();
    });

    it('should not trigger on other keys', async () => {
      await createRadioButton('<r-radio-button value="test"></r-radio-button>');
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      
      const input = page.root.querySelector('input');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      await page.waitForChanges();
      
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('combined states', () => {
    it('should handle checked and disabled', async () => {
      await createRadioButton('<r-radio-button checked="true" disabled="true"></r-radio-button>');
      const radioButton = page.root.querySelector('.r-radio-button');
      expect(radioButton).toHaveClass('r-radio-button--checked');
      expect(radioButton).toHaveClass('r-radio-button--disabled');
    });

    it('should handle checked and focused', async () => {
      await createRadioButton('<r-radio-button checked="true"></r-radio-button>');
      const component = page.rootInstance as RRadioButton;
      component.focused = true;
      await page.waitForChanges();
      
      const radioButton = page.root.querySelector('.r-radio-button');
      expect(radioButton).toHaveClass('r-radio-button--checked');
      expect(radioButton).toHaveClass('r-radio-button--focused');
    });
  });
});
