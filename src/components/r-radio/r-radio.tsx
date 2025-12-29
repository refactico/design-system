import { Component, Host, h, Prop, Event, EventEmitter, Element, State, Method, Listen } from '@stencil/core';

/**
 * r-radio
 * Accessible radio button component with group support
 */
@Component({
  tag: 'r-radio',
  styleUrl: 'r-radio.css',
  shadow: true,
})
export class RRadio {
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
  @Prop() radioId?: string;

  @State() isFocused: boolean = false;

  @Event() rChange: EventEmitter<string>;
  @Event() rFocus: EventEmitter<FocusEvent>;
  @Event() rBlur: EventEmitter<FocusEvent>;

  private inputElement?: HTMLInputElement;

  @Listen('rRadioChange', { target: 'body' })
  handleRadioChange(event: CustomEvent) {
    // Uncheck this radio if another radio in the same group was selected
    if (event.detail.name === this.name && event.detail.value !== this.value) {
      this.checked = false;
    }
  }

  /**
   * Programmatically focus the radio
   */
  @Method()
  async setFocus() {
    this.inputElement?.focus();
  }

  /**
   * Programmatically select the radio
   */
  @Method()
  async select() {
    if (!this.disabled && !this.checked) {
      this.checked = true;
      this.handleChange();
    }
  }

  private handleChange = (event?: Event) => {
    if (event) {
      const target = event.target as HTMLInputElement;
      if (target.checked) {
        this.checked = true;
        // Dispatch custom event to notify other radios in the group
        const customEvent = new CustomEvent('rRadioChange', {
          detail: { name: this.name, value: this.value },
          bubbles: true,
          composed: true,
        });
        this.el.dispatchEvent(customEvent);
        this.rChange.emit(this.value);
      }
    } else {
      // Called programmatically
      this.checked = true;
      const customEvent = new CustomEvent('rRadioChange', {
        detail: { name: this.name, value: this.value },
        bubbles: true,
        composed: true,
      });
      this.el.dispatchEvent(customEvent);
      this.rChange.emit(this.value);
    }
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
    const radioId = this.radioId || `r-radio-${Math.random().toString(36).substr(2, 9)}`;
    const hasHelper = !!this.helperText;
    const describedBy = hasHelper ? 'radio-helper' : undefined;

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
        <div class="radio-container">
          <label class="radio-wrapper" htmlFor={radioId}>
            <input
              ref={(el) => (this.inputElement = el)}
              id={radioId}
              type="radio"
              class="radio-input"
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
            <span class="radio-checkmark"></span>
            {this.label && (
              <span class="radio-label">
                {this.label}
                {this.required && <span class="required">*</span>}
              </span>
            )}
          </label>
          {hasHelper && (
            <div
              id="radio-helper"
              class={`radio-helper ${this.error ? 'error' : ''}`}
            >
              {this.helperText}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
