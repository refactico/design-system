import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RInput } from './r-input';

describe('r-input', () => {
  let page: SpecPage;

  // ==================== RENDERING TESTS ====================
  describe('rendering', () => {
    it('should render with default props', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input></r-input>',
      });
      
      const input = page.root.querySelector('.r-input');
      expect(input).not.toBeNull();
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput).not.toBeNull();
      expect(innerInput.getAttribute('type')).toBe('text');
    });

    it('should render input wrapper', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input></r-input>',
      });
      
      const wrapper = page.root.querySelector('.r-input__wrapper');
      expect(wrapper).not.toBeNull();
    });
  });

  // ==================== TYPE TESTS ====================
  describe('types', () => {
    const types = ['text', 'password', 'email', 'number', 'tel', 'url'];

    types.forEach(type => {
      it(`should render ${type} type`, async () => {
        page = await newSpecPage({
          components: [RInput],
          html: `<r-input type="${type}"></r-input>`,
        });
        
        const innerInput = page.root.querySelector('.r-input__inner');
        expect(innerInput.getAttribute('type')).toBe(type);
      });
    });

    it('should render textarea when type is textarea', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input type="textarea"></r-input>',
      });
      
      const textarea = page.root.querySelector('.r-textarea');
      expect(textarea).not.toBeNull();
      
      const textareaInner = page.root.querySelector('.r-textarea__inner');
      expect(textareaInner).not.toBeNull();
      expect(textareaInner.tagName.toLowerCase()).toBe('textarea');
    });
  });

  // ==================== SIZE TESTS ====================
  describe('sizes', () => {
    it('should render default size', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input></r-input>',
      });
      
      const input = page.root.querySelector('.r-input');
      expect(input.classList.contains('r-input--default')).toBe(true);
    });

    it('should render large size', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input size="large"></r-input>',
      });
      
      const input = page.root.querySelector('.r-input');
      expect(input.classList.contains('r-input--large')).toBe(true);
    });

    it('should render small size', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input size="small"></r-input>',
      });
      
      const input = page.root.querySelector('.r-input');
      expect(input.classList.contains('r-input--small')).toBe(true);
    });
  });

  // ==================== VALUE TESTS ====================
  describe('value', () => {
    it('should render with initial value', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input value="test value"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      expect(innerInput.value).toBe('test value');
    });

    it('should update value on input', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      innerInput.value = 'new value';
      innerInput.dispatchEvent(new Event('input'));
      
      await page.waitForChanges();
      
      expect(page.rootInstance.value).toBe('new value');
    });

    it('should handle numeric value', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input type="number" value="123"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      expect(innerInput.value).toBe('123');
    });
  });

  // ==================== PLACEHOLDER TESTS ====================
  describe('placeholder', () => {
    it('should render placeholder', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input placeholder="Enter text"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('placeholder')).toBe('Enter text');
    });
  });

  // ==================== DISABLED TESTS ====================
  describe('disabled', () => {
    it('should render disabled state', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input disabled></r-input>',
      });
      
      const input = page.root.querySelector('.r-input');
      expect(input.classList.contains('r-input--disabled')).toBe(true);
      
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      expect(innerInput.disabled).toBe(true);
      
      const wrapper = page.root.querySelector('.r-input__wrapper');
      expect(wrapper.classList.contains('r-input__wrapper--disabled')).toBe(true);
    });
  });

  // ==================== READONLY TESTS ====================
  describe('readonly', () => {
    it('should render readonly state', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input readonly></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      expect(innerInput.readOnly).toBe(true);
    });
  });

  // ==================== CLEARABLE TESTS ====================
  describe('clearable', () => {
    it('should not show clear button when empty', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input clearable></r-input>',
      });
      
      const clearBtn = page.root.querySelector('.r-input__clear');
      expect(clearBtn).toBeNull();
    });

    it('should show clear button when has value', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input clearable value="test"></r-input>',
      });
      
      const clearBtn = page.root.querySelector('.r-input__clear');
      expect(clearBtn).not.toBeNull();
    });

    it('should clear value when clear button is clicked', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input clearable value="test"></r-input>',
      });
      
      const clearBtn = page.root.querySelector('.r-input__clear') as HTMLElement;
      clearBtn.click();
      
      await page.waitForChanges();
      
      expect(page.rootInstance.value).toBe('');
    });

    it('should emit cleared event when cleared', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input clearable value="test"></r-input>',
      });
      
      const clearedSpy = jest.fn();
      page.root.addEventListener('cleared', clearedSpy);
      
      const clearBtn = page.root.querySelector('.r-input__clear') as HTMLElement;
      clearBtn.click();
      
      expect(clearedSpy).toHaveBeenCalledTimes(1);
    });

    it('should not show clear button when disabled', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input clearable value="test" disabled></r-input>',
      });
      
      const clearBtn = page.root.querySelector('.r-input__clear');
      expect(clearBtn).toBeNull();
    });

    it('should not show clear button when readonly', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input clearable value="test" readonly></r-input>',
      });
      
      const clearBtn = page.root.querySelector('.r-input__clear');
      expect(clearBtn).toBeNull();
    });
  });

  // ==================== PASSWORD TESTS ====================
  describe('show-password', () => {
    it('should render password input', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input type="password" show-password value="secret"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('type')).toBe('password');
    });

    it('should show password toggle button', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input type="password" show-password value="secret"></r-input>',
      });
      
      const toggleBtn = page.root.querySelector('.r-input__password');
      expect(toggleBtn).not.toBeNull();
    });

    it('should toggle password visibility', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input type="password" show-password value="secret"></r-input>',
      });
      
      const toggleBtn = page.root.querySelector('.r-input__password') as HTMLElement;
      const innerInput = page.root.querySelector('.r-input__inner');
      
      expect(innerInput.getAttribute('type')).toBe('password');
      
      toggleBtn.click();
      await page.waitForChanges();
      
      expect(innerInput.getAttribute('type')).toBe('text');
      
      toggleBtn.click();
      await page.waitForChanges();
      
      expect(innerInput.getAttribute('type')).toBe('password');
    });

    it('should not show toggle when empty', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input type="password" show-password></r-input>',
      });
      
      const toggleBtn = page.root.querySelector('.r-input__password');
      expect(toggleBtn).toBeNull();
    });
  });

  // ==================== PREFIX/SUFFIX TESTS ====================
  describe('prefix and suffix', () => {
    it('should render prefix icon', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input prefix-icon="🔍"></r-input>',
      });
      
      const prefix = page.root.querySelector('.r-input__prefix');
      expect(prefix).not.toBeNull();
      expect(prefix.textContent).toBe('🔍');
    });

    it('should render suffix icon', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input suffix-icon="✓"></r-input>',
      });
      
      const suffix = page.root.querySelector('.r-input__suffix');
      expect(suffix).not.toBeNull();
      expect(suffix.textContent).toContain('✓');
    });

    it('should render prefix slot', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input><span slot="prefix">$</span></r-input>',
      });
      
      const prefix = page.root.querySelector('.r-input__prefix');
      expect(prefix).not.toBeNull();
    });

    it('should render suffix slot', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input><span slot="suffix">.com</span></r-input>',
      });
      
      const suffix = page.root.querySelector('.r-input__suffix');
      expect(suffix).not.toBeNull();
    });
  });

  // ==================== PREPEND/APPEND TESTS ====================
  describe('prepend and append', () => {
    it('should render prepend slot', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input><span slot="prepend">http://</span></r-input>',
      });
      
      const prepend = page.root.querySelector('.r-input__prepend');
      expect(prepend).not.toBeNull();
      
      const input = page.root.querySelector('.r-input');
      expect(input.classList.contains('r-input--prepend')).toBe(true);
    });

    it('should render append slot', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input><span slot="append">.com</span></r-input>',
      });
      
      const append = page.root.querySelector('.r-input__append');
      expect(append).not.toBeNull();
      
      const input = page.root.querySelector('.r-input');
      expect(input.classList.contains('r-input--append')).toBe(true);
    });
  });

  // ==================== MAXLENGTH/MINLENGTH TESTS ====================
  describe('maxlength and minlength', () => {
    it('should set maxlength attribute', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input maxlength="10"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('maxlength')).toBe('10');
    });

    it('should set minlength attribute', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input minlength="5"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('minlength')).toBe('5');
    });
  });

  // ==================== WORD LIMIT TESTS ====================
  describe('show-word-limit', () => {
    it('should show word count when enabled', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input show-word-limit maxlength="20" value="hello"></r-input>',
      });
      
      const count = page.root.querySelector('.r-input__count');
      expect(count).not.toBeNull();
      expect(count.textContent).toBe('5 / 20');
    });

    it('should not show word count without maxlength', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input show-word-limit value="hello"></r-input>',
      });
      
      const count = page.root.querySelector('.r-input__count');
      expect(count).toBeNull();
    });

    it('should update word count on input', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input show-word-limit maxlength="20" value="hi"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      innerInput.value = 'hello world';
      innerInput.dispatchEvent(new Event('input'));
      
      await page.waitForChanges();
      
      const count = page.root.querySelector('.r-input__count');
      expect(count.textContent).toBe('11 / 20');
    });
  });

  // ==================== TEXTAREA TESTS ====================
  describe('textarea', () => {
    it('should render textarea with rows', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input type="textarea" rows="5"></r-input>',
      });
      
      const textarea = page.root.querySelector('.r-textarea__inner');
      expect(textarea.getAttribute('rows')).toBe('5');
    });

    it('should render textarea with resize', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input type="textarea" resize="none"></r-input>',
      });
      
      const textarea = page.root.querySelector('.r-textarea__inner') as HTMLElement;
      expect(textarea.style.resize).toBe('none');
    });

    it('should show word count in textarea', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input type="textarea" show-word-limit maxlength="100" value="test"></r-input>',
      });
      
      const count = page.root.querySelector('.r-textarea__count');
      expect(count).not.toBeNull();
      expect(count.textContent).toBe('4 / 100');
    });

    it('should apply autosize styles', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input type="textarea" autosize=\'{"minRows": 2, "maxRows": 6}\'></r-input>',
      });
      
      const textarea = page.root.querySelector('.r-textarea__inner') as HTMLElement;
      expect(textarea.style.minHeight).toBeTruthy();
      expect(textarea.style.maxHeight).toBeTruthy();
    });
  });

  // ==================== FOCUS/BLUR TESTS ====================
  describe('focus and blur', () => {
    it('should add focused class on focus', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      innerInput.dispatchEvent(new FocusEvent('focus'));
      
      await page.waitForChanges();
      
      const wrapper = page.root.querySelector('.r-input__wrapper');
      expect(wrapper.classList.contains('r-input__wrapper--focused')).toBe(true);
    });

    it('should remove focused class on blur', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      innerInput.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      
      innerInput.dispatchEvent(new FocusEvent('blur'));
      await page.waitForChanges();
      
      const wrapper = page.root.querySelector('.r-input__wrapper');
      expect(wrapper.classList.contains('r-input__wrapper--focused')).toBe(false);
    });
  });

  // ==================== METHOD TESTS ====================
  describe('methods', () => {
    it('should focus input via setFocus method', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input></r-input>',
      });
      
      const component = page.rootInstance;
      const focusSpy = jest.fn();
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      innerInput.focus = focusSpy;
      
      await component.setFocus();
      
      expect(focusSpy).toHaveBeenCalled();
    });

    it('should blur input via setBlur method', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input></r-input>',
      });
      
      const component = page.rootInstance;
      const blurSpy = jest.fn();
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      innerInput.blur = blurSpy;
      
      await component.setBlur();
      
      expect(blurSpy).toHaveBeenCalled();
    });

    it('should clear input via clear method', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input value="test"></r-input>',
      });
      
      const component = page.rootInstance;
      const clearedSpy = jest.fn();
      page.root.addEventListener('cleared', clearedSpy);
      
      await component.clear();
      
      expect(component.value).toBe('');
      expect(clearedSpy).toHaveBeenCalled();
    });

    it('should select text via select method', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input value="test"></r-input>',
      });
      
      const component = page.rootInstance;
      const selectSpy = jest.fn();
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      innerInput.select = selectSpy;
      
      await component.select();
      
      expect(selectSpy).toHaveBeenCalled();
    });
  });

  // ==================== NATIVE ATTRIBUTES TESTS ====================
  describe('native attributes', () => {
    it('should set autocomplete attribute', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input autocomplete="on"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('autocomplete')).toBe('on');
    });

    it('should set name attribute', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input name="username"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('name')).toBe('username');
    });

    it('should set autofocus attribute', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input autofocus></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.hasAttribute('autofocus')).toBe(true);
    });

    it('should set aria-label attribute', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input aria-label="Search input"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('aria-label')).toBe('Search input');
    });

    it('should set tabindex attribute', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input input-tabindex="2"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('tabindex')).toBe('2');
    });
  });

  // ==================== ACCESSIBILITY TESTS ====================
  describe('accessibility', () => {
    it('should be focusable', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner') as HTMLInputElement;
      expect(innerInput.tabIndex).not.toBe(-1);
    });

    it('should support aria-label', async () => {
      page = await newSpecPage({
        components: [RInput],
        html: '<r-input aria-label="Email address"></r-input>',
      });
      
      const innerInput = page.root.querySelector('.r-input__inner');
      expect(innerInput.getAttribute('aria-label')).toBe('Email address');
    });
  });
});
