import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RInputNumber } from './r-input-number';
import { RInput } from '../r-input/r-input';

describe('r-input-number', () => {
  let page: SpecPage;

  const createInputNumber = async (html: string) => {
    page = await newSpecPage({
      components: [RInputNumber, RInput],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const inputNumber = page.root.querySelector('.r-input-number');
      expect(inputNumber).toBeTruthy();
      expect(inputNumber).toHaveClass('r-input-number--default');
    });

    it('should render decrease button', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const decrease = page.root.querySelector('.r-input-number__decrease');
      expect(decrease).toBeTruthy();
    });

    it('should render increase button', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const increase = page.root.querySelector('.r-input-number__increase');
      expect(increase).toBeTruthy();
    });

    it('should render input element', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const input = page.root.querySelector('r-input');
      expect(input).toBeTruthy();
    });
  });

  describe('value prop', () => {
    it('should display initial value', async () => {
      await createInputNumber('<r-input-number value="5"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.value).toBe(5);
    });

    it('should handle null value', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.value).toBeNull();
    });

    it('should update display value when value changes', async () => {
      await createInputNumber('<r-input-number value="10"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      component.value = 20;
      await page.waitForChanges();
      expect(component.displayValue).toBe('20');
    });
  });

  describe('min and max props', () => {
    it('should respect min value', async () => {
      await createInputNumber('<r-input-number min="0" value="5"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.min).toBe(0);
    });

    it('should respect max value', async () => {
      await createInputNumber('<r-input-number max="100" value="50"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.max).toBe(100);
    });

    it('should clamp value to min', async () => {
      await createInputNumber('<r-input-number min="0" value="-5"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      // Value should be clamped on initialization
      expect(component.value).toBe(0);
    });

    it('should clamp value to max', async () => {
      await createInputNumber('<r-input-number max="10" value="15"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.value).toBe(10);
    });

    it('should disable decrease button at min', async () => {
      await createInputNumber('<r-input-number min="0" value="0"></r-input-number>');
      const decrease = page.root.querySelector('.r-input-number__decrease') as HTMLButtonElement;
      expect(decrease).toHaveClass('r-input-number__btn--disabled');
      expect(decrease.getAttribute('disabled')).not.toBeNull();
    });

    it('should disable increase button at max', async () => {
      await createInputNumber('<r-input-number max="10" value="10"></r-input-number>');
      const increase = page.root.querySelector('.r-input-number__increase') as HTMLButtonElement;
      expect(increase).toHaveClass('r-input-number__btn--disabled');
      expect(increase.getAttribute('disabled')).not.toBeNull();
    });
  });

  describe('step prop', () => {
    it('should use default step of 1', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.step).toBe(1);
    });

    it('should accept custom step', async () => {
      await createInputNumber('<r-input-number step="5"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.step).toBe(5);
    });

    it('should accept decimal step', async () => {
      await createInputNumber('<r-input-number step="0.1"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.step).toBe(0.1);
    });
  });

  describe('stepStrictly prop', () => {
    it('should default to false', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.stepStrictly).toBe(false);
    });

    it('should accept step strictly setting', async () => {
      await createInputNumber('<r-input-number step-strictly="true"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.stepStrictly).toBe(true);
    });
  });

  describe('precision prop', () => {
    it('should format value with precision', async () => {
      await createInputNumber('<r-input-number precision="2" value="3.1"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.displayValue).toBe('3.10');
    });

    it('should round value to precision', async () => {
      await createInputNumber('<r-input-number precision="1" value="3.16"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      expect(component.displayValue).toBe('3.2');
    });
  });

  describe('size prop', () => {
    it('should apply large size class', async () => {
      await createInputNumber('<r-input-number size="large"></r-input-number>');
      const inputNumber = page.root.querySelector('.r-input-number');
      expect(inputNumber).toHaveClass('r-input-number--large');
    });

    it('should apply default size class', async () => {
      await createInputNumber('<r-input-number size="default"></r-input-number>');
      const inputNumber = page.root.querySelector('.r-input-number');
      expect(inputNumber).toHaveClass('r-input-number--default');
    });

    it('should apply small size class', async () => {
      await createInputNumber('<r-input-number size="small"></r-input-number>');
      const inputNumber = page.root.querySelector('.r-input-number');
      expect(inputNumber).toHaveClass('r-input-number--small');
    });
  });

  describe('disabled prop', () => {
    it('should apply disabled class', async () => {
      await createInputNumber('<r-input-number disabled="true"></r-input-number>');
      const inputNumber = page.root.querySelector('.r-input-number');
      expect(inputNumber).toHaveClass('r-input-number--disabled');
    });

    it('should disable buttons when disabled', async () => {
      await createInputNumber('<r-input-number disabled="true"></r-input-number>');
      const decrease = page.root.querySelector('.r-input-number__decrease') as HTMLButtonElement;
      const increase = page.root.querySelector('.r-input-number__increase') as HTMLButtonElement;
      expect(decrease.getAttribute('disabled')).not.toBeNull();
      expect(increase.getAttribute('disabled')).not.toBeNull();
    });

    it('should pass disabled to input', async () => {
      await createInputNumber('<r-input-number disabled="true"></r-input-number>');
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('disabled')).not.toBeNull();
    });
  });

  describe('readonly prop', () => {
    it('should pass readonly to input', async () => {
      await createInputNumber('<r-input-number readonly="true"></r-input-number>');
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('readonly')).not.toBeNull();
    });

    it('should disable buttons when readonly', async () => {
      await createInputNumber('<r-input-number readonly="true" value="5"></r-input-number>');
      const decrease = page.root.querySelector('.r-input-number__decrease') as HTMLButtonElement;
      const increase = page.root.querySelector('.r-input-number__increase') as HTMLButtonElement;
      expect(decrease.getAttribute('disabled')).not.toBeNull();
      expect(increase.getAttribute('disabled')).not.toBeNull();
    });
  });

  describe('controls prop', () => {
    it('should show controls by default', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const decrease = page.root.querySelector('.r-input-number__decrease');
      const increase = page.root.querySelector('.r-input-number__increase');
      expect(decrease).toBeTruthy();
      expect(increase).toBeTruthy();
    });

    it('should hide controls when controls is false', async () => {
      await createInputNumber('<r-input-number controls="false"></r-input-number>');
      const inputNumber = page.root.querySelector('.r-input-number');
      expect(inputNumber).toHaveClass('r-input-number--no-controls');
      const decrease = page.root.querySelector('.r-input-number__decrease');
      const increase = page.root.querySelector('.r-input-number__increase');
      expect(decrease).toBeFalsy();
      expect(increase).toBeFalsy();
    });
  });

  describe('controlsPosition prop', () => {
    it('should render side controls by default', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const decrease = page.root.querySelector('.r-input-number__decrease');
      const increase = page.root.querySelector('.r-input-number__increase');
      expect(decrease).toBeTruthy();
      expect(increase).toBeTruthy();
    });

    it('should render right controls when position is right', async () => {
      await createInputNumber('<r-input-number controls-position="right"></r-input-number>');
      const inputNumber = page.root.querySelector('.r-input-number');
      expect(inputNumber).toHaveClass('r-input-number--controls-right');
      const controlsRight = page.root.querySelector('.r-input-number__controls-right');
      expect(controlsRight).toBeTruthy();
    });

    it('should render up/down buttons for right position', async () => {
      await createInputNumber('<r-input-number controls-position="right"></r-input-number>');
      const upBtn = page.root.querySelector('.r-input-number__btn--up');
      const downBtn = page.root.querySelector('.r-input-number__btn--down');
      expect(upBtn).toBeTruthy();
      expect(downBtn).toBeTruthy();
    });
  });

  describe('placeholder prop', () => {
    it('should pass placeholder to input', async () => {
      await createInputNumber('<r-input-number placeholder="Enter number"></r-input-number>');
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('placeholder')).toBe('Enter number');
    });
  });

  describe('increase/decrease functionality', () => {
    it('should increase value on increase button click', async () => {
      await createInputNumber('<r-input-number value="5"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      const increase = page.root.querySelector('.r-input-number__increase') as HTMLButtonElement;
      increase.click();
      await page.waitForChanges();
      expect(component.value).toBe(6);
    });

    it('should decrease value on decrease button click', async () => {
      await createInputNumber('<r-input-number value="5"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      const decrease = page.root.querySelector('.r-input-number__decrease') as HTMLButtonElement;
      decrease.click();
      await page.waitForChanges();
      expect(component.value).toBe(4);
    });

    it('should not increase beyond max', async () => {
      await createInputNumber('<r-input-number value="10" max="10"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      const increase = page.root.querySelector('.r-input-number__increase') as HTMLButtonElement;
      increase.click();
      await page.waitForChanges();
      expect(component.value).toBe(10);
    });

    it('should not decrease below min', async () => {
      await createInputNumber('<r-input-number value="0" min="0"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      const decrease = page.root.querySelector('.r-input-number__decrease') as HTMLButtonElement;
      decrease.click();
      await page.waitForChanges();
      expect(component.value).toBe(0);
    });

    it('should increase by step amount', async () => {
      await createInputNumber('<r-input-number value="5" step="5"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      const increase = page.root.querySelector('.r-input-number__increase') as HTMLButtonElement;
      increase.click();
      await page.waitForChanges();
      expect(component.value).toBe(10);
    });

    it('should decrease by step amount', async () => {
      await createInputNumber('<r-input-number value="10" step="5"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      const decrease = page.root.querySelector('.r-input-number__decrease') as HTMLButtonElement;
      decrease.click();
      await page.waitForChanges();
      expect(component.value).toBe(5);
    });
  });

  describe('change event', () => {
    it('should emit change event on value change', async () => {
      await createInputNumber('<r-input-number value="5"></r-input-number>');
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      const increase = page.root.querySelector('.r-input-number__increase') as HTMLButtonElement;
      increase.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.mock.calls[0][0].detail).toBe(6);
    });

    it('should not emit change event when value does not change', async () => {
      await createInputNumber('<r-input-number value="10" max="10"></r-input-number>');
      const changeSpy = jest.fn();
      page.root.addEventListener('change', changeSpy);
      const increase = page.root.querySelector('.r-input-number__increase') as HTMLButtonElement;
      increase.click();
      await page.waitForChanges();
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('should increase on ArrowUp', async () => {
      await createInputNumber('<r-input-number value="5"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      const inputNumber = page.root.querySelector('.r-input-number');
      inputNumber.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await page.waitForChanges();
      expect(component.value).toBe(6);
    });

    it('should decrease on ArrowDown', async () => {
      await createInputNumber('<r-input-number value="5"></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      const inputNumber = page.root.querySelector('.r-input-number');
      inputNumber.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();
      expect(component.value).toBe(4);
    });
  });

  describe('methods', () => {
    it('should focus input via setFocus method', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      await component.setFocus();
      // Method should complete without error
      expect(true).toBe(true);
    });

    it('should blur input via setBlur method', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const component = page.rootInstance as RInputNumber;
      await component.setBlur();
      // Method should complete without error
      expect(true).toBe(true);
    });
  });

  describe('slots', () => {
    it('should render prefix slot', async () => {
      await createInputNumber('<r-input-number><span slot="prefix">$</span></r-input-number>');
      const prefix = page.root.querySelector('[slot="prefix"]');
      expect(prefix).toBeTruthy();
      expect(prefix.textContent).toBe('$');
    });

    it('should render suffix slot', async () => {
      await createInputNumber('<r-input-number><span slot="suffix">kg</span></r-input-number>');
      const suffix = page.root.querySelector('[slot="suffix"]');
      expect(suffix).toBeTruthy();
      expect(suffix.textContent).toBe('kg');
    });
  });

  describe('button icons', () => {
    it('should render minus icon in decrease button', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const decrease = page.root.querySelector('.r-input-number__decrease');
      const svg = decrease.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should render plus icon in increase button', async () => {
      await createInputNumber('<r-input-number></r-input-number>');
      const increase = page.root.querySelector('.r-input-number__increase');
      const svg = increase.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should render up/down icons for right controls', async () => {
      await createInputNumber('<r-input-number controls-position="right"></r-input-number>');
      const upBtn = page.root.querySelector('.r-input-number__btn--up');
      const downBtn = page.root.querySelector('.r-input-number__btn--down');
      expect(upBtn.querySelector('svg')).toBeTruthy();
      expect(downBtn.querySelector('svg')).toBeTruthy();
    });
  });
});
