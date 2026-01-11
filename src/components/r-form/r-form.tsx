import { Component, Prop, h, Method, Element, Event, EventEmitter } from '@stencil/core';

export type LabelPosition = 'left' | 'right' | 'top';
export type FormSize = 'large' | 'default' | 'small';
export type RequireAsteriskPosition = 'left' | 'right';

export interface FormRules {
  [key: string]: FormRule | FormRule[];
}

export interface FormRule {
  required?: boolean;
  message?: string;
  trigger?: 'blur' | 'change';
  min?: number;
  max?: number;
  type?: 'string' | 'number' | 'email' | 'url' | 'array';
  pattern?: RegExp;
  validator?: (rule: FormRule, value: any, callback: (error?: Error) => void) => void;
}

@Component({
  tag: 'r-form',
  styleUrl: 'r-form.css',
  shadow: false,
})
export class RForm {
  @Element() el: HTMLElement;

  /** Data of form component */
  @Prop({ mutable: true }) model: { [key: string]: any } = {};

  /** Validation rules */
  @Prop({ mutable: true }) rules: FormRules = {};

  /** Whether the form is inline */
  @Prop() inline: boolean = false;

  /** Position of label */
  @Prop() labelPosition: LabelPosition = 'right';

  /** Width of label */
  @Prop() labelWidth: string = '';

  /** Suffix of the label */
  @Prop() labelSuffix: string = '';

  /** Whether to hide required asterisk */
  @Prop() hideRequiredAsterisk: boolean = false;

  /** Position of asterisk */
  @Prop() requireAsteriskPosition: RequireAsteriskPosition = 'left';

  /** Whether to show error message */
  @Prop() showMessage: boolean = true;

  /** Whether to display error message inline */
  @Prop() inlineMessage: boolean = false;

  /** Whether to show status icon */
  @Prop() statusIcon: boolean = false;

  /** Control the size of components */
  @Prop() size: FormSize = 'default';

  /** Whether to disable all components */
  @Prop() disabled: boolean = false;

  /** Emitted after a form item is validated */
  @Event({ bubbles: true, composed: true }) validate: EventEmitter<{
    prop: string;
    valid: boolean;
    message: string;
  }>;

  /** Validate the whole form */
  @Method()
  async validateForm(): Promise<boolean> {
    const formItems = this.el.querySelectorAll('r-form-item');
    const results: boolean[] = [];

    for (const item of Array.from(formItems)) {
      const formItem = item as any;
      if (formItem.validateField) {
        const result = await formItem.validateField();
        results.push(result);
      }
    }

    return results.every((r) => r);
  }

  /** Validate specified fields */
  @Method()
  async validateField(props: string | string[]): Promise<boolean> {
    const propsArray = Array.isArray(props) ? props : [props];
    const formItems = this.el.querySelectorAll('r-form-item');
    const results: boolean[] = [];

    for (const item of Array.from(formItems)) {
      const formItem = item as any;
      const prop = formItem.getAttribute('prop');
      if (prop && propsArray.includes(prop) && formItem.validateField) {
        const result = await formItem.validateField();
        results.push(result);
      }
    }

    return results.every((r) => r);
  }

  /** Reset all fields */
  @Method()
  async resetFields(): Promise<void> {
    const formItems = this.el.querySelectorAll('r-form-item');
    for (const item of Array.from(formItems)) {
      const formItem = item as any;
      if (formItem.resetField) {
        await formItem.resetField();
      }
    }
  }

  /** Clear validation messages */
  @Method()
  async clearValidate(props?: string | string[]): Promise<void> {
    const formItems = this.el.querySelectorAll('r-form-item');
    const propsArray = props ? (Array.isArray(props) ? props : [props]) : null;

    for (const item of Array.from(formItems)) {
      const formItem = item as any;
      const prop = formItem.getAttribute('prop');
      if (!propsArray || (prop && propsArray.includes(prop))) {
        if (formItem.clearValidate) {
          await formItem.clearValidate();
        }
      }
    }
  }

  render() {
    return (
      <form
        class={{
          'r-form': true,
          'r-form--inline': this.inline,
          [`r-form--label-${this.labelPosition}`]: true,
          [`r-form--${this.size}`]: true,
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <slot></slot>
      </form>
    );
  }
}
