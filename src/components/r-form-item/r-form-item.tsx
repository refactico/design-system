import { Component, Prop, h, State, Method, Element, Watch } from '@stencil/core';
import { FormRule, LabelPosition, FormSize } from '../r-form/r-form';

export type ValidateState = '' | 'success' | 'error' | 'validating';

@Component({
  tag: 'r-form-item',
  styleUrl: 'r-form-item.css',
  shadow: false,
})
export class RFormItem {
  @Element() el: HTMLElement;

  /** Property name in form model */
  @Prop() prop: string = '';

  /** Label text */
  @Prop({ attribute: 'label' }) labelText: string = '';

  /** Position of label (overrides form) */
  @Prop() labelPosition: LabelPosition | '' = '';

  /** Width of label */
  @Prop() labelWidth: string = '';

  /** Whether field is required */
  @Prop() required: boolean = false;

  /** Validation rules for this field */
  @Prop() rules: FormRule | FormRule[];

  /** Error message to display */
  @Prop() error: string = '';

  /** Whether to show error message */
  @Prop() showMessage: boolean = true;

  /** Inline error message */
  @Prop() inlineMessage: boolean = false;

  /** Size of form item */
  @Prop() size: FormSize | '' = '';

  /** Validation state */
  @State() validateState: ValidateState = '';

  /** Validation message */
  @State() validateMessage: string = '';

  @Watch('error')
  errorChanged(newVal: string) {
    this.validateMessage = newVal;
    this.validateState = newVal ? 'error' : '';
  }

  componentWillLoad() {
    // Initialize from error prop
    if (this.error) {
      this.validateMessage = this.error;
      this.validateState = 'error';
    }
  }

  private getFormContext(): any {
    return this.el.closest('r-form');
  }

  private getFieldValue(): any {
    const form = this.getFormContext();
    if (!form || !this.prop) return undefined;
    const model = form.model || {};
    return this.prop.split('.').reduce((obj, key) => obj?.[key], model);
  }

  private getFieldRules(): FormRule[] {
    const form = this.getFormContext();
    const formRules = form?.rules?.[this.prop];
    const selfRules = this.rules;

    const rules: FormRule[] = [];

    if (formRules) {
      rules.push(...(Array.isArray(formRules) ? formRules : [formRules]));
    }
    if (selfRules) {
      rules.push(...(Array.isArray(selfRules) ? selfRules : [selfRules]));
    }

    if (this.required && !rules.some((r) => r.required)) {
      rules.push({ required: true, message: `${this.labelText || this.prop} is required` });
    }

    return rules;
  }

  private async validateRule(rule: FormRule, value: any): Promise<string | null> {
    // Required check
    if (rule.required) {
      if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        return rule.message || `${this.labelText || this.prop} is required`;
      }
    }

    // Skip other validations if value is empty and not required
    if (value === undefined || value === null || value === '') {
      return null;
    }

    // Type check
    if (rule.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return rule.message || 'Please enter a valid email';
      }
    }

    if (rule.type === 'url') {
      try {
        new URL(value);
      } catch {
        return rule.message || 'Please enter a valid URL';
      }
    }

    // Min/Max length
    if (rule.min !== undefined && String(value).length < rule.min) {
      return rule.message || `Minimum length is ${rule.min}`;
    }

    if (rule.max !== undefined && String(value).length > rule.max) {
      return rule.message || `Maximum length is ${rule.max}`;
    }

    // Pattern
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Invalid format';
    }

    // Custom validator
    if (rule.validator) {
      return new Promise((resolve) => {
        rule.validator(rule, value, (error?: Error) => {
          resolve(error ? error.message : null);
        });
      });
    }

    return null;
  }

  /** Validate this field */
  @Method()
  async validateField(): Promise<boolean> {
    const rules = this.getFieldRules();
    if (rules.length === 0) {
      this.validateState = '';
      this.validateMessage = '';
      return true;
    }

    this.validateState = 'validating';
    const value = this.getFieldValue();

    for (const rule of rules) {
      const error = await this.validateRule(rule, value);
      if (error) {
        this.validateState = 'error';
        this.validateMessage = error;
        return false;
      }
    }

    this.validateState = 'success';
    this.validateMessage = '';
    return true;
  }

  /** Reset this field */
  @Method()
  async resetField(): Promise<void> {
    this.validateState = '';
    this.validateMessage = '';
  }

  /** Clear validation */
  @Method()
  async clearValidate(): Promise<void> {
    this.validateState = '';
    this.validateMessage = '';
  }

  private getLabelPosition(): LabelPosition {
    if (this.labelPosition) return this.labelPosition;
    const form = this.getFormContext();
    return form?.labelPosition || 'right';
  }

  private getLabelWidth(): string {
    if (this.labelWidth) return this.labelWidth;
    const form = this.getFormContext();
    return form?.labelWidth || '';
  }

  private isRequired(): boolean {
    if (this.required) return true;
    const rules = this.getFieldRules();
    return rules.some((r) => r.required);
  }

  private shouldHideAsterisk(): boolean {
    const form = this.getFormContext();
    return form?.hideRequiredAsterisk || false;
  }

  private getAsteriskPosition(): 'left' | 'right' {
    const form = this.getFormContext();
    return form?.requireAsteriskPosition || 'left';
  }

  private shouldShowMessage(): boolean {
    if (!this.showMessage) return false;
    const form = this.getFormContext();
    return form?.showMessage !== false;
  }

  render() {
    const labelPosition = this.getLabelPosition();
    const labelWidth = this.getLabelWidth();
    const isRequired = this.isRequired();
    const hideAsterisk = this.shouldHideAsterisk();
    const asteriskPosition = this.getAsteriskPosition();
    const showMessage = this.shouldShowMessage();
    const form = this.getFormContext();
    const labelSuffix = form?.labelSuffix || '';

    const labelStyle: { [key: string]: string } = {};
    if (labelWidth && labelPosition !== 'top') {
      labelStyle.width = labelWidth;
    }

    return (
      <div
        class={{
          'r-form-item': true,
          [`r-form-item--${labelPosition}`]: true,
          'r-form-item--error': this.validateState === 'error',
          'r-form-item--success': this.validateState === 'success',
          'r-form-item--validating': this.validateState === 'validating',
          'r-form-item--required': isRequired && !hideAsterisk,
        }}
      >
        {this.labelText && (
          <label class="r-form-item__label" style={labelStyle}>
            {isRequired && !hideAsterisk && asteriskPosition === 'left' && (
              <span class="r-form-item__asterisk">*</span>
            )}
            <span>{this.labelText}</span>
            {labelSuffix}
            {isRequired && !hideAsterisk && asteriskPosition === 'right' && (
              <span class="r-form-item__asterisk">*</span>
            )}
          </label>
        )}
        <div class="r-form-item__content">
          <slot></slot>
          {showMessage && this.validateState === 'error' && this.validateMessage && (
            <div class="r-form-item__error">{this.validateMessage}</div>
          )}
        </div>
      </div>
    );
  }
}
