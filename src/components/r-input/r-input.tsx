import { Component, Prop, Event, EventEmitter, Watch, h, Element } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle } from '../../utils';
import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-input',
  styleUrl: 'r-input.css',
  shadow: false,
})
export class RInput {
  @Prop() type: string = 'text';
  @Prop({ mutable: true }) value?: string;
  @Prop() placeholder?: string;
  @Prop() label?: string;
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;
  @Prop() name?: string;
  @Prop() autocomplete?: string;
  @Prop() color?: IonicColor;
  @Prop() fill?: FillStyle;
  @Prop() shape?: 'round';
  @Prop() clearOnEdit?: boolean;
  @Prop() error: boolean = false;
  @Prop() errorText?: string;
  @Prop() helperText?: string;
  @Prop() maxlength?: number;
  @Prop() minlength?: number;
  @Prop() pattern?: string;

  @Element() el!: HTMLElement;

  @Event() rInput: EventEmitter<CustomEvent>;
  @Event() rFocus: EventEmitter<FocusEvent>;
  @Event() rBlur: EventEmitter<FocusEvent>;

  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.rInput.emit(event as CustomEvent);
  };

  private handleFocus = (event: FocusEvent) => {
    // For password fields, ensure value is preserved on focus (browsers sometimes clear it)
    if (this.type === 'password' && this.value) {
      requestAnimationFrame(() => {
        const ionInput = this.el.querySelector('ion-input') as any;
        if (ionInput) {
          const currentValue = this.value;
          // Restore the value if it was cleared
          if (!ionInput.value || ionInput.value !== currentValue) {
            ionInput.value = currentValue;
          }
          // Also sync the native input
          const nativeInput = ionInput.querySelector('input');
          if (nativeInput && (!nativeInput.value || nativeInput.value !== currentValue)) {
            nativeInput.value = currentValue;
          }
        }
      });
    }
    this.rFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    // For password fields, preserve the value on blur (browsers sometimes clear it)
    if (this.type === 'password') {
      requestAnimationFrame(() => {
        const ionInput = this.el.querySelector('ion-input') as any;
        if (ionInput && this.value) {
          const currentValue = this.value;
          // Ensure the value is preserved
          if (ionInput.value !== currentValue) {
            ionInput.value = currentValue;
          }
          // Also sync the native input
          const nativeInput = ionInput.querySelector('input');
          if (nativeInput && nativeInput.value !== currentValue) {
            nativeInput.value = currentValue;
          }
        }
      });
    }
    this.rBlur.emit(event);
  };

  @Watch('value')
  valueChanged(newValue: string | undefined, oldValue: string | undefined) {
    // Only sync if the value actually changed
    if (newValue !== oldValue) {
      requestAnimationFrame(() => {
        const ionInput = this.el.querySelector('ion-input') as any;
        if (ionInput) {
          const newValueStr = newValue || '';
          // For password fields, be more careful - only update if prop is explicitly set
          if (this.type === 'password') {
            // For password, preserve the actual input value unless prop is explicitly different
            const currentInputValue = ionInput.value || '';
            if (newValueStr !== currentInputValue && newValue !== undefined) {
              ionInput.value = newValueStr;
              // Also sync the native input inside ion-input
              const nativeInput = ionInput.querySelector('input');
              if (nativeInput) {
                nativeInput.value = newValueStr;
              }
            }
          } else {
            // For non-password fields, sync normally
            if (ionInput.value !== newValueStr) {
              ionInput.value = newValueStr;
            }
          }
        }
      });
    }
  }

  render() {
    const hasError = this.error;
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
      type: this.type,
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
        </ion-input>
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

