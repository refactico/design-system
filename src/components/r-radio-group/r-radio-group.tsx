import { Component, Prop, Event, EventEmitter, h, Element } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle, IonicMode } from '../../utils';
import { getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-radio-group',
  styleUrl: 'r-radio-group.css',
  shadow: false,
})
export class RRadioGroup {
  /**
   * The selected value
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * The radio group name (for form submission)
   */
  @Prop() name?: string;

  /**
   * The radio group label
   */
  @Prop() label?: string;

  /**
   * If true, the radio group is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the radio group is required
   */
  @Prop() required: boolean = false;

  /**
   * The radio group color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The fill style
   */
  @Prop() fill?: FillStyle;

  /**
   * If true, the radio group has error state
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
   * Radio options (array of { value: string, label: string })
   */
  @Prop() options?: string | Array<{ value: string; label: string }>;

  /**
   * If true, allows deselecting the selected option
   */
  @Prop() allowEmptySelection: boolean = false;

  /**
   * Controls the alignment of the radio and label on the cross axis
   */
  @Prop() alignment?: 'start' | 'center';

  /**
   * Determines how the label and radio are packed within a line
   */
  @Prop() justify?: 'start' | 'end' | 'space-between';

  /**
   * Specifies the label's position relative to the radio
   */
  @Prop() labelPlacement?: 'start' | 'end' | 'fixed' | 'stacked';

  /**
   * Chooses the platform styles to use
   */
  @Prop() mode?: IonicMode;

  @Element() el!: HTMLElement;

  @Event() rChange: EventEmitter<CustomEvent>;
  @Event() rFocus: EventEmitter<CustomEvent>;
  @Event() rBlur: EventEmitter<CustomEvent>;

  private handleChange = (event: CustomEvent) => {
    const selectedValue = event.detail.value;
    this.value = selectedValue;
    this.rChange.emit(event);
  };

  private handleFocus = (event: CustomEvent) => {
    this.rFocus.emit(event);
  };

  private handleBlur = (event: CustomEvent) => {
    this.rBlur.emit(event);
  };

  private parseOptions(): Array<{ value: string; label: string }> {
    if (!this.options) {
      return [];
    }

    if (typeof this.options === 'string') {
      try {
        const parsed = JSON.parse(this.options);
        // If parsed is an array of strings, convert to {value, label} format
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (typeof parsed[0] === 'string') {
            return (parsed as string[]).map(opt => ({ value: opt, label: opt }));
          }
          // If array of objects, ensure they have value and label
          return (parsed as Array<{ value: string; label: string }>).map(opt => ({
            value: opt.value || String(opt),
            label: opt.label || opt.value || String(opt),
          }));
        }
        return [];
      } catch {
        // If parsing fails, treat as comma-separated string
        return this.options.split(',').map(opt => ({
          value: opt.trim(),
          label: opt.trim(),
        }));
      }
    }

    // If it's already an array
    if (Array.isArray(this.options)) {
      // If array of strings, convert to {value, label} format
      if (this.options.length > 0 && typeof this.options[0] === 'string') {
        return (this.options as unknown as string[]).map(opt => ({ value: opt, label: opt }));
      }
      // If array of objects, ensure they have value and label
      return (this.options as Array<{ value: string; label: string }>).map(opt => ({
        value: opt.value || String(opt),
        label: opt.label || opt.value || String(opt),
      }));
    }

    return [];
  }

  render() {
    const parsedOptions = this.parseOptions();
    const hasError = this.error;
    const radioColor = this.color || 'primary';

    const radioGroupProps = removeUndefinedProps({
      value: this.value,
      disabled: this.disabled,
      allowEmptySelection: this.allowEmptySelection,
      onIonChange: this.handleChange,
      onIonFocus: this.handleFocus,
      onIonBlur: this.handleBlur,
    });

    return (
      <ion-item class={{ 'item-has-error': hasError }} lines={getItemLines(this.fill)}>
        {this.label && (
          <ion-label position={getLabelPosition(this.fill, 'floating')}>
            {this.label}
            {this.required && <span style={{ color: 'var(--r-color-danger)' }}> *</span>}
          </ion-label>
        )}
        <ion-radio-group {...radioGroupProps}>
          {parsedOptions.map((option, index) => {
            const optionValue = option.value;
            const optionLabel = option.label;
            const radioId = `${this.name || 'radio'}-${index}`;

            const radioProps = removeUndefinedProps({
              value: optionValue,
              color: radioColor,
              disabled: this.disabled,
              alignment: this.alignment,
              justify: this.justify,
              labelPlacement: this.labelPlacement,
              mode: this.mode,
            });

            return (
              <ion-item key={radioId} lines="none">
                <ion-radio {...radioProps}>
                  <ion-label>{optionLabel}</ion-label>
                </ion-radio>
              </ion-item>
            );
          })}
          <slot></slot>
        </ion-radio-group>
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

