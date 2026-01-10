import { Component, Prop, h, Event, EventEmitter, State, Method, Element } from '@stencil/core';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'textarea';
export type InputSize = 'large' | 'default' | 'small';
export type InputResize = 'none' | 'both' | 'horizontal' | 'vertical';

@Component({
  tag: 'r-input',
  styleUrl: 'r-input.css',
  shadow: false,
})
export class RInput {
  @Element() el: HTMLElement;

  /** Type of input */
  @Prop() type: InputType = 'text';

  /** Binding value */
  @Prop({ mutable: true }) value: string | number = '';

  /** Placeholder text */
  @Prop() placeholder: string = '';

  /** Whether input is disabled */
  @Prop() disabled: boolean = false;

  /** Whether input is readonly */
  @Prop() readonly: boolean = false;

  /** Whether to show clear button */
  @Prop() clearable: boolean = false;

  /** Whether to show password toggle */
  @Prop() showPassword: boolean = false;

  /** Size of input */
  @Prop() size: InputSize = 'default';

  /** Prefix icon (emoji or text) */
  @Prop() prefixIcon: string;

  /** Suffix icon (emoji or text) */
  @Prop() suffixIcon: string;

  /** Max length */
  @Prop() maxlength: number;

  /** Min length */
  @Prop() minlength: number;

  /** Show word count */
  @Prop() showWordLimit: boolean = false;

  /** Number of rows for textarea */
  @Prop() rows: number = 2;

  /** Textarea resize behavior */
  @Prop() resize: InputResize = 'vertical';

  /** Autosize for textarea */
  @Prop() autosize: boolean | { minRows?: number; maxRows?: number } = false;

  /** Native autocomplete */
  @Prop() autocomplete: string = 'off';

  /** Native name */
  @Prop({ attribute: 'name' }) inputName: string;

  /** Native autofocus */
  @Prop() autofocus: boolean = false;

  /** Aria label */
  @Prop() ariaLabel: string;

  /** Tab index */
  @Prop() inputTabindex: string | number;

  /** Password visibility state */
  @State() passwordVisible: boolean = false;

  /** Focus state */
  @State() isFocused: boolean = false;

  private inputEl: HTMLInputElement | HTMLTextAreaElement;

  @Event({ bubbles: true, composed: true }) cleared: EventEmitter<void>;

  /** Focus the input */
  @Method()
  async setFocus(): Promise<void> {
    this.inputEl?.focus();
  }

  /** Blur the input */
  @Method()
  async setBlur(): Promise<void> {
    this.inputEl?.blur();
  }

  /** Clear the input */
  @Method()
  async clear(): Promise<void> {
    this.value = '';
    this.cleared.emit();
  }

  /** Select text in input */
  @Method()
  async select(): Promise<void> {
    this.inputEl?.select();
  }

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    // Native input event bubbles naturally
  };

  private handleChange = () => {
    // Native change event bubbles naturally
  };

  private handleFocus = (_e: FocusEvent) => {
    this.isFocused = true;
    // Native focus event bubbles naturally
  };

  private handleBlur = (_e: FocusEvent) => {
    this.isFocused = false;
    // Native blur event bubbles naturally
  };

  private handleKeydown = (_e: KeyboardEvent) => {
    // Native keydown event bubbles naturally
  };

  private handleClear = (e: Event) => {
    e.stopPropagation();
    this.clear();
    this.inputEl?.focus();
  };

  private togglePassword = (e: Event) => {
    e.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
  };

  private get showClear(): boolean {
    return this.clearable && !this.disabled && !this.readonly && String(this.value).length > 0;
  }

  private get showPasswordToggle(): boolean {
    return this.showPassword && !this.disabled && !this.readonly && String(this.value).length > 0;
  }

  private get currentLength(): number {
    return String(this.value).length;
  }

  private hasSlot(name: string): boolean {
    return !!this.el.querySelector(`[slot="${name}"]`);
  }

  private renderInput() {
    const inputType = this.showPassword ? (this.passwordVisible ? 'text' : 'password') : this.type;
    const hasPrefixSlot = this.hasSlot('prefix');
    const hasSuffixSlot = this.hasSlot('suffix');
    const showPrefix = this.prefixIcon || hasPrefixSlot;
    const showSuffix =
      this.suffixIcon || hasSuffixSlot || this.showClear || this.showPasswordToggle;

    return (
      <div
        class={{
          'r-input__wrapper': true,
          'r-input__wrapper--focused': this.isFocused,
          'r-input__wrapper--disabled': this.disabled,
        }}
      >
        {showPrefix && (
          <span class="r-input__prefix">
            {hasPrefixSlot ? <slot name="prefix"></slot> : this.prefixIcon}
          </span>
        )}
        <input
          ref={(el) => (this.inputEl = el)}
          class="r-input__inner"
          type={inputType}
          value={String(this.value)}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readonly={this.readonly}
          maxlength={this.maxlength}
          minlength={this.minlength}
          autocomplete={this.autocomplete}
          name={this.inputName}
          autofocus={this.autofocus}
          aria-label={this.ariaLabel}
          tabindex={this.inputTabindex}
          onInput={this.handleInput}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeydown}
        />
        {showSuffix && (
          <span class="r-input__suffix">
            {this.showClear && (
              <span class="r-input__clear" onClick={this.handleClear} title="Clear">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </span>
            )}
            {this.showPasswordToggle && (
              <span class="r-input__password" onClick={this.togglePassword} title="Toggle password">
                {this.passwordVisible ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </span>
            )}
            {hasSuffixSlot ? <slot name="suffix"></slot> : this.suffixIcon && !this.showClear && !this.showPasswordToggle ? this.suffixIcon : null}
          </span>
        )}
      </div>
    );
  }

  private renderTextarea() {
    const autosizeStyle: { [key: string]: string } = {};
    if (typeof this.autosize === 'object') {
      if (this.autosize.minRows) {
        autosizeStyle.minHeight = `${this.autosize.minRows * 24}px`;
      }
      if (this.autosize.maxRows) {
        autosizeStyle.maxHeight = `${this.autosize.maxRows * 24}px`;
      }
    }

    return (
      <div
        class={{
          'r-textarea__wrapper': true,
          'r-textarea__wrapper--focused': this.isFocused,
          'r-textarea__wrapper--disabled': this.disabled,
        }}
      >
        <textarea
          ref={(el) => (this.inputEl = el)}
          class="r-textarea__inner"
          value={String(this.value)}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readonly={this.readonly}
          maxlength={this.maxlength}
          minlength={this.minlength}
          rows={this.rows}
          autocomplete={this.autocomplete}
          name={this.inputName}
          autofocus={this.autofocus}
          aria-label={this.ariaLabel}
          tabindex={this.inputTabindex}
          style={{ resize: this.resize, ...autosizeStyle }}
          onInput={this.handleInput}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeydown}
        ></textarea>
        {this.showWordLimit && this.maxlength && (
          <span class="r-textarea__count">
            {this.currentLength} / {this.maxlength}
          </span>
        )}
      </div>
    );
  }

  render() {
    const hasPrepend = this.hasSlot('prepend');
    const hasAppend = this.hasSlot('append');
    const isTextarea = this.type === 'textarea';

    if (isTextarea) {
      return (
        <div
          class={{
            'r-textarea': true,
            'r-textarea--disabled': this.disabled,
          }}
        >
          {this.renderTextarea()}
        </div>
      );
    }

    return (
      <div
        class={{
          'r-input': true,
          [`r-input--${this.size}`]: true,
          'r-input--disabled': this.disabled,
          'r-input--prepend': hasPrepend,
          'r-input--append': hasAppend,
        }}
      >
        {hasPrepend && (
          <div class="r-input__prepend">
            <slot name="prepend"></slot>
          </div>
        )}
        {this.renderInput()}
        {hasAppend && (
          <div class="r-input__append">
            <slot name="append"></slot>
          </div>
        )}
        {this.showWordLimit && this.maxlength && this.type === 'text' && (
          <span class="r-input__count">
            {this.currentLength} / {this.maxlength}
          </span>
        )}
      </div>
    );
  }
}
