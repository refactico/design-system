import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle } from '../../utils';
import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';

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
  @Prop() color?: IonicColor;

  /**
   * If true, shows password toggle button (only for password type)
   */
  @Prop() showPasswordToggle: boolean = true;

  /**
   * The input fill style
   */
  @Prop() fill?: FillStyle;

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
   * Internal state to track if field has been touched (for validation)
   */
  @State() touched: boolean = false;

  /**
   * Internal state for automatic email validation
   */
  @State() internalEmailError: boolean = false;

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

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    if (!email || email.trim() === '') return true; // Empty is valid (handled by required)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Validate input based on type
   */
  private validateInput() {
    if (this.type === 'email' && this.touched && this.value) {
      this.internalEmailError = !this.isValidEmail(this.value);
    } else {
      this.internalEmailError = false;
    }
  }

  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    
    // Auto-validate email as user types (if touched)
    if (this.type === 'email' && this.touched) {
      this.validateInput();
    }
    
    this.rInput.emit(event as CustomEvent);
  };

  private handleFocus = (event: FocusEvent) => {
    this.rFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.touched = true;
    
    // Validate on blur
    if (this.type === 'email') {
      this.validateInput();
    }
    
    this.rBlur.emit(event);
  };

  private togglePasswordVisibility = () => {
    this.showPassword = !this.showPassword;
  };

  render() {
    const isPassword = this.type === 'password';
    const inputType = isPassword && this.showPassword ? 'text' : this.type;
    
    // Determine error state: use explicit error prop if provided, otherwise use internal validation
    const hasError = this.error !== undefined ? this.error : (this.type === 'email' ? this.internalEmailError : false);
    
    // Determine error text: use explicit errorText if provided, otherwise use internal validation message
    const errorMessage = this.errorText || (this.type === 'email' && this.internalEmailError && this.touched 
      ? 'Please enter a valid email address (e.g., user@example.com)' 
      : undefined);

    const inputProps = removeUndefinedProps({
      ...buildFormFieldProps({
        placeholder: this.placeholder,
        disabled: this.disabled,
        required: this.required,
        name: this.name,
        color: this.color,
        fill: this.fill,
        shape: this.shape,
      }),
      type: inputType,
      value: this.value,
      readonly: this.readonly,
      autocomplete: this.autocomplete,
      clearOnEdit: this.clearOnEdit,
      maxlength: this.maxlength,
      minlength: this.minlength,
      pattern: this.pattern,
      onInput: this.handleInput,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    });

    return (
      <ion-item class={{ 'item-has-error': hasError }} lines={getItemLines(this.fill)}>
        {this.label && (
          <ion-label position={getLabelPosition(this.fill, 'floating')}>
            {this.label}
          </ion-label>
        )}
        <ion-input {...inputProps}>
          <slot></slot>
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
        </ion-input>
        {hasError && errorMessage && (
          <ion-note slot="error" color="danger">
            {errorMessage}
          </ion-note>
        )}
        {!hasError && this.helperText && (
          <ion-note slot="helper">
            {this.helperText}
          </ion-note>
        )}
      </ion-item>
    );
  }
}

