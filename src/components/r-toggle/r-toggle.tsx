import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, IonicMode } from '../../utils';
import { getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-toggle',
  styleUrl: 'r-toggle.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RToggle {
  /**
   * If true, the toggle is checked
   */
  @Prop({ mutable: true }) checked: boolean = false;

  /**
   * If true, the toggle is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * The toggle value
   */
  @Prop() value?: string;

  /**
   * The toggle name (for form submission)
   */
  @Prop() name?: string;

  /**
   * The toggle color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The toggle mode (ios or md)
   */
  @Prop() mode?: IonicMode;

  /**
   * The toggle label
   */
  @Prop() label?: string;

  /**
   * If true, the toggle is required
   */
  @Prop() required: boolean = false;

  /**
   * Label placement relative to the toggle
   */
  @Prop() labelPlacement?: 'start' | 'end' | 'fixed' | 'stacked';

  /**
   * Justify content (start, end, space-between)
   */
  @Prop() justify?: 'start' | 'end' | 'space-between';

  /**
   * Toggle alignment (start or center)
   */
  @Prop() alignment?: 'start' | 'center';

  /**
   * If true, displays "on" and "off" labels within the toggle for accessibility
   */
  @Prop() enableOnOffLabels: boolean = false;

  /**
   * If true, the toggle has error state
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
   * If true, wraps toggle in ion-item for form field styling
   */
  @Prop() formField: boolean = false;

  /**
   * The fill style (only applies when formField is true)
   */
  @Prop() fill?: 'outline' | 'solid' | 'clear' | 'default';

  /**
   * Emitted when the toggle checked state changes
   */
  @Event() rChange: EventEmitter<CustomEvent>;

  /**
   * Emitted when the toggle is focused
   */
  @Event() rFocus: EventEmitter<CustomEvent>;

  /**
   * Emitted when the toggle is blurred
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
    // Ensure toggle has a color for visibility (default to primary if not specified)
    const toggleColor = this.color || 'primary';
    
    const toggleProps = removeUndefinedProps({
      checked: this.checked,
      disabled: this.disabled,
      value: this.value,
      name: this.name,
      color: toggleColor,
      mode: this.mode,
      labelPlacement: this.labelPlacement,
      justify: this.justify,
      alignment: this.alignment,
      enableOnOffLabels: this.enableOnOffLabels,
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
          <ion-toggle {...toggleProps}>
            <slot></slot>
          </ion-toggle>
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

    // Standalone toggle (no ion-item wrapper)
    return (
      <ion-toggle {...toggleProps}>
        {this.label || <slot></slot>}
      </ion-toggle>
    );
  }
}

