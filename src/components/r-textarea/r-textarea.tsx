import { Component, Prop, Event, EventEmitter, Watch, h, Element } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle } from '../../utils';
import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-textarea',
  styleUrl: 'r-textarea.css',
  shadow: false,
})
export class RTextarea {
  /**
   * The textarea value
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * The textarea label
   */
  @Prop() label?: string;

  /**
   * Placeholder text
   */
  @Prop() placeholder?: string;

  /**
   * Number of visible rows
   */
  @Prop() rows?: number;

  /**
   * Maximum number of characters
   */
  @Prop() maxlength?: number;

  /**
   * Minimum number of characters
   */
  @Prop() minlength?: number;

  /**
   * If true, the textarea is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the textarea is readonly
   */
  @Prop() readonly: boolean = false;

  /**
   * If true, the textarea is required
   */
  @Prop() required: boolean = false;

  /**
   * The textarea name (for form submission)
   */
  @Prop() name?: string;

  /**
   * If true, the textarea will auto-grow as the user types
   */
  @Prop() autoGrow: boolean = false;

  /**
   * The textarea color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The fill style
   */
  @Prop() fill?: FillStyle;

  /**
   * If true, the textarea has error state
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

  @Element() el!: HTMLElement;

  /**
   * Emitted when the textarea value changes
   */
  @Event() rInput: EventEmitter<CustomEvent>;

  /**
   * Emitted when the textarea receives focus
   */
  @Event() rFocus: EventEmitter<FocusEvent>;

  /**
   * Emitted when the textarea loses focus
   */
  @Event() rBlur: EventEmitter<FocusEvent>;

  /**
   * Emitted when the textarea value changes (alias for rInput)
   */
  @Event() rChange: EventEmitter<CustomEvent>;

  private handleInput = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.rInput.emit(event as CustomEvent);
    this.rChange.emit(event as CustomEvent);
  };

  private handleFocus = (event: FocusEvent) => {
    this.rFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.rBlur.emit(event);
  };

  @Watch('value')
  valueChanged(newValue: string | undefined, oldValue: string | undefined) {
    // Only sync if the value actually changed
    if (newValue !== oldValue) {
      requestAnimationFrame(() => {
        const ionTextarea = this.el.querySelector('ion-textarea') as any;
        if (ionTextarea) {
          const newValueStr = newValue || '';
          if (ionTextarea.value !== newValueStr) {
            ionTextarea.value = newValueStr;
          }
        }
      });
    }
  }

  render() {
    const hasError = this.error;
    const textareaProps = removeUndefinedProps({
      ...buildFormFieldProps({
        placeholder: this.placeholder,
        disabled: this.disabled,
        required: this.required,
        name: this.name,
        color: this.color,
        fill: this.fill,
      }),
      value: this.value,
      rows: this.rows,
      readonly: this.readonly,
      maxlength: this.maxlength,
      minlength: this.minlength,
      autoGrow: this.autoGrow,
      onInput: this.handleInput,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    });

    return (
      <ion-item class={{ 'item-has-error': hasError }} lines={getItemLines(this.fill)}>
        {this.label && (
          <ion-label position={getLabelPosition(this.fill, 'stacked')}>
            {this.label}
          </ion-label>
        )}
        <ion-textarea {...textareaProps}>
          <slot></slot>
        </ion-textarea>
        {hasError && this.errorText && (
          <ion-note slot="error" color="danger">
            {this.errorText}
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

