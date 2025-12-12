import { Component, Prop, Event, EventEmitter, Watch, h, Element } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor } from '../../utils';
import { getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-range',
  styleUrl: 'r-range.css',
  shadow: false,
})
export class RRange {
  /**
   * The range value (number for single knob, { lower: number, upper: number } for dual knobs)
   */
  @Prop({ mutable: true }) value?: number | { lower: number; upper: number };

  /**
   * The range label
   */
  @Prop() label?: string;

  /**
   * Minimum value
   */
  @Prop() min: number = 0;

  /**
   * Maximum value
   */
  @Prop() max: number = 100;

  /**
   * Step value
   */
  @Prop() step: number = 1;

  /**
   * If true, shows two knobs for range selection
   */
  @Prop() dualKnobs: boolean = false;

  /**
   * If true, shows value pin on drag
   */
  @Prop() pin: boolean = false;

  /**
   * If true, snaps to step values
   */
  @Prop() snaps: boolean = false;

  /**
   * If true, shows tick marks
   */
  @Prop() ticks: boolean = false;

  /**
   * If true, the range is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the range is required
   */
  @Prop() required: boolean = false;

  /**
   * The range name (for form submission)
   */
  @Prop() name?: string;

  /**
   * The range color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The fill style
   */
  @Prop() fill?: 'outline' | 'solid';

  /**
   * If true, the range has error state
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
   * Emitted when the range value changes
   */
  @Event() rChange: EventEmitter<CustomEvent>;

  /**
   * Emitted when the range receives focus
   */
  @Event() rFocus: EventEmitter<CustomEvent>;

  /**
   * Emitted when the range loses focus
   */
  @Event() rBlur: EventEmitter<CustomEvent>;

  private handleChange = (event: CustomEvent) => {
    const detail = event.detail;
    if (this.dualKnobs) {
      this.value = { lower: detail.value.lower, upper: detail.value.upper };
    } else {
      this.value = detail.value;
    }
    this.rChange.emit(event);
  };

  private handleFocus = (event: CustomEvent) => {
    this.rFocus.emit(event);
  };

  private handleBlur = (event: CustomEvent) => {
    this.rBlur.emit(event);
  };

  @Watch('value')
  valueChanged(newValue: number | { lower: number; upper: number } | undefined) {
    requestAnimationFrame(() => {
      const ionRange = this.el.querySelector('ion-range') as any;
      if (ionRange) {
        if (this.dualKnobs && typeof newValue === 'object' && newValue !== null) {
          ionRange.value = { lower: newValue.lower, upper: newValue.upper };
        } else if (!this.dualKnobs && typeof newValue === 'number') {
          ionRange.value = newValue;
        }
      }
    });
  }

  render() {
    const hasError = this.error;
    
    // Prepare value for ion-range
    let rangeValue: number | { lower: number; upper: number } | undefined;
    if (this.dualKnobs) {
      if (typeof this.value === 'object' && this.value !== null) {
        rangeValue = { lower: this.value.lower, upper: this.value.upper };
      } else {
        // Default dual knob values
        rangeValue = { lower: this.min, upper: this.max };
      }
    } else {
      rangeValue = typeof this.value === 'number' ? this.value : this.min;
    }

    const rangeProps = removeUndefinedProps({
      value: rangeValue,
      min: this.min,
      max: this.max,
      step: this.step,
      disabled: this.disabled,
      name: this.name,
      color: this.color,
      dualKnobs: this.dualKnobs,
      pin: this.pin,
      snaps: this.snaps,
      ticks: this.ticks,
      onIonChange: this.handleChange,
      onIonFocus: this.handleFocus,
      onIonBlur: this.handleBlur,
    });

    return (
      <ion-item class={{ 'item-has-error': hasError }} lines={getItemLines(this.fill)}>
        {this.label && (
          <ion-label position={getLabelPosition(this.fill, 'stacked')}>
            {this.label}
            {this.required && <span style={{ color: 'var(--r-color-danger)' }}> *</span>}
          </ion-label>
        )}
        <ion-range {...rangeProps}>
          <slot></slot>
        </ion-range>
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

