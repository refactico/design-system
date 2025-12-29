import { Component, Host, h, Prop, Event, EventEmitter, Element, State, Method } from '@stencil/core';

/**
 * r-switch
 * Accessible switch/toggle component
 */
@Component({
  tag: 'r-switch',
  styleUrl: 'r-switch.css',
  shadow: true,
})
export class RSwitch {
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
  @Prop() color: 'primary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';
  @Prop() switchId?: string;

  @State() isFocused: boolean = false;

  @Event() rChange: EventEmitter<boolean>;
  @Event() rFocus: EventEmitter<FocusEvent>;
  @Event() rBlur: EventEmitter<FocusEvent>;

  private inputElement?: HTMLInputElement;

  /**
   * Programmatically focus the switch
   */
  @Method()
  async setFocus() {
    this.inputElement?.focus();
  }

  /**
   * Programmatically toggle the switch
   */
  @Method()
  async toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.rChange.emit(this.checked);
    }
  }

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
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
    const switchId = this.switchId || `r-switch-${Math.random().toString(36).substr(2, 9)}`;
    const hasHelper = !!this.helperText;
    const describedBy = hasHelper ? 'switch-helper' : undefined;

    return (
      <Host
        class={{
          'size-sm': this.size === 'sm',
          'size-md': this.size === 'md',
          'size-lg': this.size === 'lg',
          [`color-${this.color}`]: true,
          focused: this.isFocused,
          disabled: this.disabled,
          error: this.error,
        }}
      >
        <div class="switch-container">
          <label class="switch-wrapper" htmlFor={switchId}>
            <input
              ref={(el) => (this.inputElement = el)}
              id={switchId}
              type="checkbox"
              class="switch-input"
              checked={this.checked}
              disabled={this.disabled}
              required={this.required}
              name={this.name}
              value={this.value}
              role="switch"
              aria-checked={this.checked ? 'true' : 'false'}
              aria-invalid={this.error ? 'true' : 'false'}
              aria-describedby={describedBy}
              aria-required={this.required ? 'true' : 'false'}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <span class="switch-track">
              <span class="switch-thumb"></span>
            </span>
            {this.label && (
              <span class="switch-label">
                {this.label}
                {this.required && <span class="required">*</span>}
              </span>
            )}
          </label>
          {hasHelper && (
            <div
              id="switch-helper"
              class={`switch-helper ${this.error ? 'error' : ''}`}
            >
              {this.helperText}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
