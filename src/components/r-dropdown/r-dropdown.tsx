import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle } from '../../utils';
import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-dropdown',
  styleUrl: 'r-dropdown.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RDropdown {
  /**
   * The dropdown value
   */
  @Prop({ mutable: true }) value?: string | number;

  /**
   * The dropdown label
   */
  @Prop() label?: string;

  /**
   * The dropdown placeholder
   */
  @Prop() placeholder?: string;

  /**
   * If true, the dropdown is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the dropdown is required
   */
  @Prop() required: boolean = false;

  /**
   * The dropdown name
   */
  @Prop() name?: string;

  /**
   * The dropdown color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The dropdown fill style
   */
  @Prop() fill?: FillStyle;

  /**
   * The dropdown shape
   */
  @Prop() shape?: 'round';

  /**
   * If true, allows multiple selections
   */
  @Prop() multiple: boolean = false;

  /**
   * If true, the dropdown has error state
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
   * Interface style (action-sheet, popover, alert)
   */
  @Prop() interface?: 'action-sheet' | 'popover' | 'alert';

  /**
   * If true, the interface is cancelable
   */
  @Prop() cancelable: boolean = true;

  /**
   * Emitted when the dropdown value changes
   */
  @Event() rChange: EventEmitter<CustomEvent>;

  /**
   * Emitted when the dropdown is focused
   */
  @Event() rFocus: EventEmitter<CustomEvent>;

  /**
   * Emitted when the dropdown is blurred
   */
  @Event() rBlur: EventEmitter<CustomEvent>;

  private handleChange = (event: CustomEvent) => {
    this.value = event.detail.value as string | number;
    this.rChange.emit(event);
  };

  private handleFocus = (event: CustomEvent) => {
    this.rFocus.emit(event);
  };

  private handleBlur = (event: CustomEvent) => {
    this.rBlur.emit(event);
  };

  render() {
    const selectProps = removeUndefinedProps({
      ...buildFormFieldProps({
        placeholder: this.placeholder,
        disabled: this.disabled,
        required: this.required,
        name: this.name,
        color: this.color,
        fill: this.fill,
        shape: this.shape,
      }),
      value: this.value,
      multiple: this.multiple,
      interface: this.interface,
      cancelable: this.cancelable,
      onIonChange: this.handleChange,
      onIonFocus: this.handleFocus,
      onIonBlur: this.handleBlur,
    });

    return (
      <ion-item class={{ 'item-has-error': this.error }} lines={getItemLines(this.fill)}>
        {this.label && (
          <ion-label position={getLabelPosition(this.fill, 'floating')}>
            {this.label}
          </ion-label>
        )}
        <ion-select {...selectProps}>
          <slot></slot>
        </ion-select>
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

