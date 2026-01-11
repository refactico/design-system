import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RForm } from './r-form';
import { RFormItem } from '../r-form-item/r-form-item';

describe('r-form', () => {
  let page: SpecPage;

  // Helper to create form page
  const createForm = async (html: string) => {
    page = await newSpecPage({
      components: [RForm, RFormItem],
      html,
    });
    return page;
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      await createForm('<r-form></r-form>');
      const form = page.root.querySelector('form');
      expect(form).toBeTruthy();
      expect(form).toHaveClass('r-form');
      expect(form).toHaveClass('r-form--label-right');
      expect(form).toHaveClass('r-form--default');
    });

    it('should render slot content', async () => {
      await createForm('<r-form><div class="test-content">Form Content</div></r-form>');
      const content = page.root.querySelector('.test-content');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Form Content');
    });

    it('should prevent default form submission', async () => {
      await createForm('<r-form></r-form>');
      const form = page.root.querySelector('form');
      const submitEvent = new Event('submit', { cancelable: true });
      form.dispatchEvent(submitEvent);
      expect(submitEvent.defaultPrevented).toBe(true);
    });
  });

  describe('inline prop', () => {
    it('should apply inline class when inline is true', async () => {
      await createForm('<r-form inline="true"></r-form>');
      const form = page.root.querySelector('form');
      expect(form).toHaveClass('r-form--inline');
    });

    it('should not apply inline class when inline is false', async () => {
      await createForm('<r-form inline="false"></r-form>');
      const form = page.root.querySelector('form');
      expect(form).not.toHaveClass('r-form--inline');
    });
  });

  describe('labelPosition prop', () => {
    it('should apply label-left class', async () => {
      await createForm('<r-form label-position="left"></r-form>');
      const form = page.root.querySelector('form');
      expect(form).toHaveClass('r-form--label-left');
    });

    it('should apply label-right class (default)', async () => {
      await createForm('<r-form label-position="right"></r-form>');
      const form = page.root.querySelector('form');
      expect(form).toHaveClass('r-form--label-right');
    });

    it('should apply label-top class', async () => {
      await createForm('<r-form label-position="top"></r-form>');
      const form = page.root.querySelector('form');
      expect(form).toHaveClass('r-form--label-top');
    });
  });

  describe('size prop', () => {
    it('should apply large size class', async () => {
      await createForm('<r-form size="large"></r-form>');
      const form = page.root.querySelector('form');
      expect(form).toHaveClass('r-form--large');
    });

    it('should apply default size class', async () => {
      await createForm('<r-form size="default"></r-form>');
      const form = page.root.querySelector('form');
      expect(form).toHaveClass('r-form--default');
    });

    it('should apply small size class', async () => {
      await createForm('<r-form size="small"></r-form>');
      const form = page.root.querySelector('form');
      expect(form).toHaveClass('r-form--small');
    });
  });

  describe('model prop', () => {
    it('should accept model data', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      formComponent.model = { username: 'test', email: 'test@example.com' };
      await page.waitForChanges();
      expect(formComponent.model.username).toBe('test');
      expect(formComponent.model.email).toBe('test@example.com');
    });

    it('should default to empty object', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.model).toEqual({});
    });
  });

  describe('rules prop', () => {
    it('should accept validation rules', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      formComponent.rules = {
        username: { required: true, message: 'Username is required' },
        email: [
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Invalid email format' },
        ],
      };
      await page.waitForChanges();
      expect(formComponent.rules.username).toBeDefined();
      expect(formComponent.rules.email).toHaveLength(2);
    });

    it('should default to empty object', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.rules).toEqual({});
    });
  });

  describe('labelWidth prop', () => {
    it('should accept label width', async () => {
      await createForm('<r-form label-width="120px"></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.labelWidth).toBe('120px');
    });

    it('should default to empty string', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.labelWidth).toBe('');
    });
  });

  describe('labelSuffix prop', () => {
    it('should accept label suffix', async () => {
      await createForm('<r-form label-suffix=":"></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.labelSuffix).toBe(':');
    });

    it('should default to empty string', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.labelSuffix).toBe('');
    });
  });

  describe('hideRequiredAsterisk prop', () => {
    it('should accept hide required asterisk setting', async () => {
      await createForm('<r-form hide-required-asterisk="true"></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.hideRequiredAsterisk).toBe(true);
    });

    it('should default to false', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.hideRequiredAsterisk).toBe(false);
    });
  });

  describe('requireAsteriskPosition prop', () => {
    it('should accept left position', async () => {
      await createForm('<r-form require-asterisk-position="left"></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.requireAsteriskPosition).toBe('left');
    });

    it('should accept right position', async () => {
      await createForm('<r-form require-asterisk-position="right"></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.requireAsteriskPosition).toBe('right');
    });

    it('should default to left', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.requireAsteriskPosition).toBe('left');
    });
  });

  describe('showMessage prop', () => {
    it('should accept show message setting', async () => {
      await createForm('<r-form show-message="false"></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.showMessage).toBe(false);
    });

    it('should default to true', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.showMessage).toBe(true);
    });
  });

  describe('inlineMessage prop', () => {
    it('should accept inline message setting', async () => {
      await createForm('<r-form inline-message="true"></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.inlineMessage).toBe(true);
    });

    it('should default to false', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.inlineMessage).toBe(false);
    });
  });

  describe('statusIcon prop', () => {
    it('should accept status icon setting', async () => {
      await createForm('<r-form status-icon="true"></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.statusIcon).toBe(true);
    });

    it('should default to false', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.statusIcon).toBe(false);
    });
  });

  describe('disabled prop', () => {
    it('should accept disabled setting', async () => {
      await createForm('<r-form disabled="true"></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.disabled).toBe(true);
    });

    it('should default to false', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      expect(formComponent.disabled).toBe(false);
    });
  });

  describe('validateForm method', () => {
    it('should return true when no form items', async () => {
      await createForm('<r-form></r-form>');
      const formComponent = page.rootInstance as RForm;
      const result = await formComponent.validateForm();
      expect(result).toBe(true);
    });

    it('should validate all form items', async () => {
      await createForm(`
        <r-form>
          <r-form-item prop="username" label="Username"></r-form-item>
          <r-form-item prop="email" label="Email"></r-form-item>
        </r-form>
      `);
      const formComponent = page.rootInstance as RForm;
      const result = await formComponent.validateForm();
      expect(result).toBe(true);
    });
  });

  describe('validateField method', () => {
    it('should validate specific field by prop name', async () => {
      await createForm(`
        <r-form>
          <r-form-item prop="username" label="Username"></r-form-item>
          <r-form-item prop="email" label="Email"></r-form-item>
        </r-form>
      `);
      const formComponent = page.rootInstance as RForm;
      const result = await formComponent.validateField('username');
      expect(result).toBe(true);
    });

    it('should validate multiple fields by prop names array', async () => {
      await createForm(`
        <r-form>
          <r-form-item prop="username" label="Username"></r-form-item>
          <r-form-item prop="email" label="Email"></r-form-item>
        </r-form>
      `);
      const formComponent = page.rootInstance as RForm;
      const result = await formComponent.validateField(['username', 'email']);
      expect(result).toBe(true);
    });
  });

  describe('resetFields method', () => {
    it('should reset all form items', async () => {
      await createForm(`
        <r-form>
          <r-form-item prop="username" label="Username"></r-form-item>
        </r-form>
      `);
      const formComponent = page.rootInstance as RForm;
      await formComponent.resetFields();
      // Method should complete without error
      expect(true).toBe(true);
    });
  });

  describe('clearValidate method', () => {
    it('should clear validation for all fields', async () => {
      await createForm(`
        <r-form>
          <r-form-item prop="username" label="Username"></r-form-item>
        </r-form>
      `);
      const formComponent = page.rootInstance as RForm;
      await formComponent.clearValidate();
      // Method should complete without error
      expect(true).toBe(true);
    });

    it('should clear validation for specific fields', async () => {
      await createForm(`
        <r-form>
          <r-form-item prop="username" label="Username"></r-form-item>
          <r-form-item prop="email" label="Email"></r-form-item>
        </r-form>
      `);
      const formComponent = page.rootInstance as RForm;
      await formComponent.clearValidate(['username']);
      // Method should complete without error
      expect(true).toBe(true);
    });

    it('should clear validation for single field string', async () => {
      await createForm(`
        <r-form>
          <r-form-item prop="username" label="Username"></r-form-item>
        </r-form>
      `);
      const formComponent = page.rootInstance as RForm;
      await formComponent.clearValidate('username');
      // Method should complete without error
      expect(true).toBe(true);
    });
  });

  describe('combined class application', () => {
    it('should apply multiple classes correctly', async () => {
      await createForm('<r-form inline="true" label-position="top" size="large"></r-form>');
      const form = page.root.querySelector('form');
      expect(form).toHaveClass('r-form');
      expect(form).toHaveClass('r-form--inline');
      expect(form).toHaveClass('r-form--label-top');
      expect(form).toHaveClass('r-form--large');
    });
  });
});
