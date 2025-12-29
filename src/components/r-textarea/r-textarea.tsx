import { Component, Host, h, Prop, Event, EventEmitter, Element, State, Watch, Method } from '@stencil/core';

/**
 * r-textarea
 * Accessible textarea component with auto-resize and character counter
 */
@Component({
  tag: 'r-textarea',
  styleUrl: 'r-textarea.css',
  shadow: true,
})
export class RTextarea {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) value: string = '';
  @Prop() label?: string;
  @Prop() placeholder?: string;
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() error: boolean = false;
  @Prop() errorMessage?: string;
  @Prop() helperText?: string;
  @Prop() name?: string;
  @Prop() rows: number = 4;
  @Prop() maxlength?: number;
  @Prop() minlength?: number;
  @Prop() readonly: boolean = false;
  @Prop() resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';
  @Prop() autoResize: boolean = false;
  @Prop() showCounter: boolean = false;
  @Prop() textareaId?: string;

  @State() isFocused: boolean = false;
  @State() internalValue: string = '';

  @Event() rInput: EventEmitter<string>;
  @Event() rBlur: EventEmitter<FocusEvent>;
  @Event() rFocus: EventEmitter<FocusEvent>;
  @Event() rChange: EventEmitter<string>;

  private textareaElement?: HTMLTextAreaElement;

  @Watch('value')
  valueChanged(newValue: string) {
    if (newValue !== this.internalValue) {
      this.internalValue = newValue ?? '';
      if (this.textareaElement && this.textareaElement.value !== newValue) {
        this.textareaElement.value = newValue ?? '';
      }
      if (this.autoResize) {
        this.adjustHeight();
      }
    }
  }

  componentWillLoad() {
    this.internalValue = this.value ?? '';
  }

  componentDidLoad() {
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  /**
   * Programmatically focus the textarea
   */
  @Method()
  async setFocus() {
    this.textareaElement?.focus();
  }

  private adjustHeight() {
    if (this.textareaElement) {
      this.textareaElement.style.height = 'auto';
      this.textareaElement.style.height = `${this.textareaElement.scrollHeight}px`;
    }
  }

  private handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.internalValue = target.value;
    this.value = target.value;
    if (this.autoResize) {
      this.adjustHeight();
    }
    this.rInput.emit(this.value);
  };

  private handleChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.internalValue = target.value;
    this.value = target.value;
    this.rChange.emit(this.value);
  };

  private handleFocus = (event: FocusEvent) => {
    this.isFocused = true;
    this.rFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.isFocused = false;
    this.rBlur.emit(event);
  };

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

  render() {
    const hasHelper = !!this.displayHelperText;
    const hasCounter = this.showCounter;
    const textareaId = this.textareaId || `r-textarea-${Math.random().toString(36).substr(2, 9)}`;
    const describedBy = [hasHelper ? 'textarea-helper' : '', hasCounter ? 'textarea-counter' : ''].filter(Boolean).join(' ') || undefined;

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
        <div class="textarea-container">
          {this.label && (
            <label class="textarea-label" htmlFor={textareaId}>
              {this.label}
              {this.required && <span class="required">*</span>}
            </label>
          )}

          <div class="textarea-wrapper">
            <textarea
              ref={(el) => (this.textareaElement = el)}
              id={textareaId}
              class={`textarea-input ${this.error ? 'error' : ''}`}
              value={this.internalValue}
              placeholder={this.placeholder}
              disabled={this.disabled}
              required={this.required}
              name={this.name}
              rows={this.rows}
              maxlength={this.maxlength}
              minlength={this.minlength}
              readonly={this.readonly}
              aria-invalid={this.error ? 'true' : 'false'}
              aria-describedby={describedBy}
              aria-required={this.required ? 'true' : 'false'}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            ></textarea>
          </div>

          {(hasHelper || hasCounter) && (
            <div class="textarea-footer">
              {hasHelper && (
                <div
                  id="textarea-helper"
                  class={`textarea-helper ${this.error ? 'error' : ''}`}
                >
                  {this.displayHelperText}
                </div>
              )}
              {hasCounter && (
                <div
                  id="textarea-counter"
                  class={{
                    'textarea-counter': true,
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
