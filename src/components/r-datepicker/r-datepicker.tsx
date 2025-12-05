import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';

@Component({
  tag: 'r-datepicker',
  styleUrl: 'r-datepicker.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RDatepicker {
  /**
   * The datepicker value (ISO string format)
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * The datepicker label
   */
  @Prop() label?: string;

  /**
   * The datepicker placeholder
   */
  @Prop() placeholder?: string;

  /**
   * If true, the datepicker is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the datepicker is required
   */
  @Prop() required: boolean = false;

  /**
   * The datepicker name
   */
  @Prop() name?: string;

  /**
   * The datepicker color (Ionic color)
   */
  @Prop() color?: string;

  /**
   * The datepicker fill style
   */
  @Prop() fill?: 'outline' | 'solid';

  /**
   * The datepicker shape
   */
  @Prop() shape?: 'round';

  /**
   * If true, the datepicker has error state
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
   * Presentation style (date, time, date-time)
   */
  @Prop() presentation?: 'date' | 'time' | 'date-time' | 'month' | 'year' | 'month-year' | 'time-date';

  /**
   * Minimum date (ISO string)
   */
  @Prop() min?: string;

  /**
   * Maximum date (ISO string)
   */
  @Prop() max?: string;

  /**
   * Preferred format for display
   */
  @Prop() preferWheel?: boolean;

  /**
   * If true, shows multiple date selection
   */
  @Prop() multiple?: boolean;

  /**
   * Emitted when the datepicker value changes
   */
  @Event() rChange: EventEmitter<CustomEvent>;

  /**
   * Emitted when the datepicker is focused
   */
  @Event() rFocus: EventEmitter<CustomEvent>;

  /**
   * Emitted when the datepicker is blurred
   */
  @Event() rBlur: EventEmitter<CustomEvent>;

  private handleChange = (event: CustomEvent) => {
    this.value = event.detail.value as string;
    this.rChange.emit(event);
  };

  private handleFocus = (event: CustomEvent) => {
    this.rFocus.emit(event);
  };

  private handleBlur = (event: CustomEvent) => {
    this.rBlur.emit(event);
  };

  render() {
    const datetimeProps: any = {
      value: this.value,
      placeholder: this.placeholder,
      disabled: this.disabled,
      required: this.required,
      name: this.name,
      color: this.color,
      fill: this.fill,
      shape: this.shape,
      presentation: this.presentation,
      min: this.min,
      max: this.max,
      preferWheel: this.preferWheel,
      multiple: this.multiple,
      onIonChange: this.handleChange,
      onIonFocus: this.handleFocus,
      onIonBlur: this.handleBlur,
    };

    // Remove undefined props
    Object.keys(datetimeProps).forEach(key => {
      if (datetimeProps[key] === undefined) {
        delete datetimeProps[key];
      }
    });

    return (
      <ion-item class={{ 'item-has-error': this.error }} lines={this.fill === 'outline' ? 'none' : 'full'}>
        {this.label && (
          <ion-label position="stacked">
            {this.label}
          </ion-label>
        )}
        <ion-datetime {...datetimeProps}></ion-datetime>
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

