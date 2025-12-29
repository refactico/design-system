import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  h,
  Host,
  Element,
  Watch,
} from '@stencil/core';

/**
 * r-input
 * A high-quality, accessible input component inspired by Material UI behavior.
 */
@Component({
  tag: 'r-input',
  styleUrl: 'r-input.css',
  shadow: true,
})
export class RInput {
  @Element() el!: HTMLElement;

  // -----------------------------
  // Props
  // -----------------------------

  /** Input type */
  @Prop() type: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' = 'text';

  /** Input value (controlled or uncontrolled) */
  @Prop({ mutable: true }) value: string = '';

  /** Input label */
  @Prop() label?: string;

  /** Placeholder text */
  @Prop() placeholder?: string;

  /** Size variant */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Disabled state */
  @Prop() disabled = false;

  /** Readonly state */
  @Prop() readonly = false;

  /** Required flag */
  @Prop() required = false;

  /** Error state */
  @Prop() error = false;

  /** Error message (overrides helperText when error is true) */
  @Prop() errorMessage?: string;

  /** Helper / supporting text */
  @Prop() helperText?: string;

  /** Name attribute (for forms) */
  @Prop() name?: string;

  /** Autocomplete attribute */
  @Prop() autocomplete?: string;

  /** Autofocus */
  @Prop() autofocus = false;

  /** Max length */
  @Prop() maxlength?: number;

  /** Min length */
  @Prop() minlength?: number;

  /** Pattern */
  @Prop() pattern?: string;

  /** Clearable input (shows clear icon when value exists) */
  @Prop() clearable = false;

  /** Show character counter */
  @Prop() showCounter = false;

  /** Input ID */
  @Prop() inputId?: string;

  // -----------------------------
  // State
  // -----------------------------

  @State() focused = false;
  @State() internalValue = '';

  // -----------------------------
  // Events
  // -----------------------------

  /** Fired on every input change */
  @Event() rInput!: EventEmitter<string>;

  /** Fired on blur */
  @Event() rBlur!: EventEmitter<void>;

  /** Fired on focus */
  @Event() rFocus!: EventEmitter<void>;

  /** Fired when value is cleared */
  @Event() rClear!: EventEmitter<void>;

  /** Fired on keydown */
  @Event() rKeyDown!: EventEmitter<KeyboardEvent>;

  // -----------------------------
  // Watchers
  // -----------------------------

  @Watch('value')
  syncValue(newValue: string) {
    if (newValue !== this.internalValue) {
      this.internalValue = newValue ?? '';
    }
  }

  // -----------------------------
  // Lifecycle
  // -----------------------------

  componentWillLoad() {
    this.internalValue = this.value ?? '';
  }

  // -----------------------------
  // Handlers
  // -----------------------------

  private onInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    this.internalValue = target.value;
    this.value = target.value;
    this.rInput.emit(this.internalValue);
  };

  private onFocus = () => {
    this.focused = true;
    this.rFocus.emit();
  };

  private onBlur = () => {
    this.focused = false;
    this.rBlur.emit();
  };

  private clearValue = () => {
    if (this.disabled || this.readonly) return;
    this.internalValue = '';
    this.value = '';
    this.rClear.emit();
    this.rInput.emit('');
  };

  // -----------------------------
  // Derived state
  // -----------------------------

  private get showClear() {
    return (
      this.clearable &&
      this.internalValue.length > 0 &&
      !this.disabled &&
      !this.readonly
    );
  }

  private get displayHelperText() {
    if (this.error && this.errorMessage) {
      return this.errorMessage;
    }
    return this.helperText;
  }

  private get characterCount() {
    return this.internalValue.length;
  }

  private get characterCountText() {
    if (this.maxlength) {
      return `${this.characterCount}/${this.maxlength}`;
    }
    return `${this.characterCount}`;
  }

  private onKeyDown = (event: KeyboardEvent) => {
    this.rKeyDown.emit(event);
  };

  // -----------------------------
  // Render
  // -----------------------------

  render() {
    const hasHelper = !!this.displayHelperText;
    const hasCounter = this.showCounter;
    const describedBy = hasHelper || hasCounter 
      ? [hasHelper ? 'helper-text' : '', hasCounter ? 'input-counter' : ''].filter(Boolean).join(' ') 
      : undefined;
    const inputId = this.inputId || `r-input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <Host
        class={{
          focused: this.focused,
          disabled: this.disabled,
          error: this.error,
          [`size-${this.size}`]: true,
        }}
      >
        <div class="input-root">
          {this.label && (
            <label class="label" htmlFor={inputId}>
              {this.label}
              {this.required && <span class="required">*</span>}
            </label>
          )}

          <div class="input-wrapper">
            <slot name="prefix" />
            <input
              id={inputId}
              class="input"
              type={this.type}
              value={this.internalValue}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readonly={this.readonly}
              required={this.required}
              name={this.name}
              autocomplete={this.autocomplete}
              autofocus={this.autofocus}
              maxlength={this.maxlength}
              minlength={this.minlength}
              pattern={this.pattern}
              aria-invalid={this.error ? 'true' : 'false'}
              aria-describedby={describedBy}
              aria-required={this.required ? 'true' : 'false'}
              onInput={this.onInput}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onKeyDown={this.onKeyDown}
            />
            <slot name="suffix" />

            {this.showClear && (
              <button
                type="button"
                class="clear-button"
                tabindex={-1}
                aria-label="Clear input"
                onClick={this.clearValue}
              >
                ×
              </button>
            )}
          </div>

          {(hasHelper || hasCounter) && (
            <div class="input-footer">
              {hasHelper && (
                <div
                  id="helper-text"
                  class={{
                    helper: true,
                    error: this.error,
                  }}
                >
                  {this.displayHelperText}
                </div>
              )}
              {hasCounter && (
                <div
                  id="input-counter"
                  class={{
                    counter: true,
                    'counter-error': this.maxlength ? this.characterCount > this.maxlength : false,
                  }}
                >
                  {this.characterCountText}
                </div>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}