import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';

@Component({
  tag: 'r-input',
  styleUrl: 'r-input.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RInput {
  /**
   * The input type (text, password, email, number, tel, url, search, etc.)
   */
  @Prop() type: string = 'text';

  /**
   * The input value
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * The input placeholder
   */
  @Prop() placeholder?: string;

  /**
   * The input label
   */
  @Prop() label?: string;

  /**
   * If true, the input is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the input is readonly
   */
  @Prop() readonly: boolean = false;

  /**
   * If true, the input is required
   */
  @Prop() required: boolean = false;

  /**
   * The input name
   */
  @Prop() name?: string;

  /**
   * The input autocomplete attribute
   */
  @Prop() autocomplete?: string;

  /**
   * The input color (Ionic color)
   */
  @Prop() color?: string;

  /**
   * If true, shows password toggle button (only for password type)
   */
  @Prop() showPasswordToggle: boolean = true;

  /**
   * The input fill style
   */
  @Prop() fill?: 'outline' | 'solid';

  /**
   * The input shape
   */
  @Prop() shape?: 'round';

  /**
   * If true, clears the input on edit
   */
  @Prop() clearOnEdit?: boolean;

  /**
   * If true, the input has error state
   */
  @Prop() error: boolean = false;

  /**
   * Error message to display
   */
  @Prop() errorText?: string;

  /**
   * Helper text to display
   */
  @Prop() helperText?: string;

  /**
   * Maximum length of the input
   */
  @Prop() maxlength?: number;

  /**
   * Minimum length of the input
   */
  @Prop() minlength?: number;

  /**
   * Pattern for validation
   */
  @Prop() pattern?: string;

  /**
   * Internal state for password visibility
   */
  @State() showPassword: boolean = false;

  /**
   * Emitted when the input value changes
   */
  @Event() rInput: EventEmitter<CustomEvent>;

  /**
   * Emitted when the input is focused
   */
  @Event() rFocus: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input is blurred
   */
  @Event() rBlur: EventEmitter<FocusEvent>;

  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.rInput.emit(event as CustomEvent);
  };

  private handleFocus = (event: FocusEvent) => {
    this.rFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.rBlur.emit(event);
  };

  private togglePasswordVisibility = () => {
    this.showPassword = !this.showPassword;
  };

  render() {
    const isPassword = this.type === 'password';
    const inputType = isPassword && this.showPassword ? 'text' : this.type;

    const inputProps: any = {
      type: inputType,
      value: this.value,
      placeholder: this.placeholder,
      disabled: this.disabled,
      readonly: this.readonly,
      required: this.required,
      name: this.name,
      autocomplete: this.autocomplete,
      color: this.color,
      fill: this.fill,
      shape: this.shape,
      clearOnEdit: this.clearOnEdit,
      maxlength: this.maxlength,
      minlength: this.minlength,
      pattern: this.pattern,
      onInput: this.handleInput,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };

    // Remove undefined props
    Object.keys(inputProps).forEach(key => {
      if (inputProps[key] === undefined) {
        delete inputProps[key];
      }
    });

    return (
      <ion-item class={{ 'item-has-error': this.error }} lines={this.fill === 'outline' ? 'none' : 'full'}>
        {this.label && (
          <ion-label position={this.fill === 'outline' ? 'stacked' : 'floating'}>
            {this.label}
          </ion-label>
        )}
        <ion-input {...inputProps}>
          <slot></slot>
        </ion-input>
        {isPassword && this.showPasswordToggle && (
          <ion-button
            fill="clear"
            slot="end"
            onClick={this.togglePasswordVisibility}
            aria-label={this.showPassword ? 'Hide password' : 'Show password'}
          >
            <ion-icon
              slot="icon-only"
              name={this.showPassword ? 'eye-off-outline' : 'eye-outline'}
            ></ion-icon>
          </ion-button>
        )}
        {this.error && this.errorText && (
          <ion-note slot="error" color="danger">
            {this.errorText}
          </ion-note>
        )}
        {!this.error && this.helperText && (
          <ion-note slot="helper">
            {this.helperText}
          </ion-note>
        )}
      </ion-item>
    );
  }
}

