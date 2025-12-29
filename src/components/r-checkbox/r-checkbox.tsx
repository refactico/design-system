import { Component, Host, h, Prop, Event, EventEmitter, Element, State, Watch, Method } from '@stencil/core';

/**
 * r-checkbox
 * Accessible checkbox component with indeterminate state support
 */
@Component({
  tag: 'r-checkbox',
  styleUrl: 'r-checkbox.css',
  shadow: true,
})
export class RCheckbox {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() label?: string;
  @Prop() helperText?: string;
  @Prop() error: boolean = false;
  @Prop() name?: string;
  @Prop() value?: string;
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop({ mutable: true }) indeterminate: boolean = false;
  @Prop() inputId?: string;

  @State() isFocused: boolean = false;

  @Event() rChange: EventEmitter<boolean>;
  @Event() rFocus: EventEmitter<FocusEvent>;
  @Event() rBlur: EventEmitter<FocusEvent>;

  private inputElement?: HTMLInputElement;

  @Watch('indeterminate')
  handleIndeterminateChange(newValue: boolean) {
    if (this.inputElement) {
      this.inputElement.indeterminate = newValue;
    }
  }

  componentDidLoad() {
    if (this.inputElement) {
      this.inputElement.indeterminate = this.indeterminate;
    }
  }

  /**
   * Programmatically focus the checkbox
   */
  @Method()
  async setFocus() {
    this.inputElement?.focus();
  }

  /**
   * Programmatically toggle the checkbox
   */
  @Method()
  async toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.indeterminate = false;
      this.rChange.emit(this.checked);
    }
  }

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false; // Clear indeterminate when user interacts
    this.rChange.emit(this.checked);
  };

  private handleFocus = (event: FocusEvent) => {
    this.isFocused = true;
    this.rFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.isFocused = false;
    this.rBlur.emit(event);
  };

  render() {
    const checkboxId = this.inputId || `r-checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const hasHelper = !!this.helperText;
    const describedBy = hasHelper ? 'checkbox-helper' : undefined;

    return (
      <Host
        class={{
          'size-sm': this.size === 'sm',
          'size-md': this.size === 'md',
          'size-lg': this.size === 'lg',
          focused: this.isFocused,
          disabled: this.disabled,
          error: this.error,
        }}
      >
        <div class="checkbox-container">
          <label class="checkbox-wrapper" htmlFor={checkboxId}>
            <input
              ref={(el) => (this.inputElement = el)}
              id={checkboxId}
              type="checkbox"
              class="checkbox-input"
              checked={this.checked}
              disabled={this.disabled}
              required={this.required}
              name={this.name}
              value={this.value}
              aria-invalid={this.error ? 'true' : 'false'}
              aria-describedby={describedBy}
              aria-required={this.required ? 'true' : 'false'}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <span class="checkbox-checkmark"></span>
            {this.label && (
              <span class="checkbox-label">
                {this.label}
                {this.required && <span class="required">*</span>}
              </span>
            )}
          </label>
          {hasHelper && (
            <div
              id="checkbox-helper"
              class={`checkbox-helper ${this.error ? 'error' : ''}`}
            >
              {this.helperText}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
