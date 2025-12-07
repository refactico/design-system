import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, IonicMode } from '../../utils';
import { getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-checkbox',
  styleUrl: 'r-checkbox.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RCheckbox {
  /**
   * If true, the checkbox is checked
   */
  @Prop({ mutable: true }) checked: boolean = false;

  /**
   * If true, the checkbox is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * The checkbox value
   */
  @Prop() value?: string;

  /**
   * The checkbox name (for form submission)
   */
  @Prop() name?: string;

  /**
   * The checkbox color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The checkbox mode (ios or md)
   */
  @Prop() mode?: IonicMode;

  /**
   * If true, the checkbox is in an indeterminate state (useful for "select all" scenarios)
   */
  @Prop() indeterminate: boolean = false;

  /**
   * The checkbox label
   */
  @Prop() label?: string;

  /**
   * If true, the checkbox is required
   */
  @Prop() required: boolean = false;

  /**
   * Label placement relative to the checkbox
   */
  @Prop() labelPlacement?: 'start' | 'end' | 'fixed' | 'stacked';

  /**
   * Justify content (start, end, space-between)
   */
  @Prop() justify?: 'start' | 'end' | 'space-between';

  /**
   * Checkbox alignment (start or center)
   */
  @Prop() alignment?: 'start' | 'center';

  /**
   * If true, the checkbox has error state
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
   * If true, wraps checkbox in ion-item for form field styling
   */
  @Prop() formField: boolean = false;

  /**
   * The fill style (only applies when formField is true)
   */
  @Prop() fill?: 'outline' | 'solid' | 'clear' | 'default';

  /**
   * Emitted when the checkbox checked state changes
   */
  @Event() rChange: EventEmitter<CustomEvent>;

  /**
   * Emitted when the checkbox is focused
   */
  @Event() rFocus: EventEmitter<CustomEvent>;

  /**
   * Emitted when the checkbox is blurred
   */
  @Event() rBlur: EventEmitter<CustomEvent>;

  private handleChange = (event: CustomEvent) => {
    this.checked = event.detail.checked as boolean;
    this.rChange.emit(event);
  };

  private handleFocus = (event: CustomEvent) => {
    this.rFocus.emit(event);
  };

  private handleBlur = (event: CustomEvent) => {
    this.rBlur.emit(event);
  };

  render() {
    // Ensure checkbox has a color for checkmark visibility (default to primary if not specified)
    const checkboxColor = this.color || 'primary';
    
    const checkboxProps = removeUndefinedProps({
      checked: this.checked,
      disabled: this.disabled,
      value: this.value,
      name: this.name,
      color: checkboxColor,
      mode: this.mode,
      indeterminate: this.indeterminate,
      labelPlacement: this.labelPlacement,
      justify: this.justify,
      alignment: this.alignment,
      onIonChange: this.handleChange,
      onIonFocus: this.handleFocus,
      onIonBlur: this.handleBlur,
    });

    // If formField is true, wrap in ion-item for form field styling
    if (this.formField) {
      return (
        <ion-item class={{ 'item-has-error': this.error }} lines={getItemLines(this.fill)}>
          {this.label && (
            <ion-label position={this.fill === 'outline' ? 'stacked' : 'floating'}>
              {this.label}
            </ion-label>
          )}
          <ion-checkbox {...checkboxProps}>
            <slot></slot>
          </ion-checkbox>
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

    // Standalone checkbox (no ion-item wrapper)
    return (
      <ion-checkbox {...checkboxProps}>
        {this.label || <slot></slot>}
      </ion-checkbox>
    );
  }
}

