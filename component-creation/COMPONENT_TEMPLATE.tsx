/**
 * COMPONENT TEMPLATE
 * 
 * Copy this file when creating a new component.
 * Replace "r-your-component" with your component name.
 * Follow the guidelines in COMPONENT_CREATION_GUIDE.md
 */

import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle, IonicMode } from '../../utils';
// For form field components, also import:
// import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-your-component',
  styleUrl: 'r-your-component.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RYourComponent {
  /**
   * Component prop description
   * Use IonicColor type for color props
   */
  @Prop() color?: IonicColor;

  /**
   * Use FillStyle type for fill props
   */
  @Prop() fill?: FillStyle;

  /**
   * Use IonicMode type for mode props
   */
  @Prop() mode?: IonicMode;

  /**
   * Add other props as needed
   */
  @Prop() disabled: boolean = false;

  /**
   * Emitted when event occurs
   * Use CustomEvent for Ionic events, MouseEvent for clicks, FocusEvent for focus/blur
   */
  @Event() rEventName: EventEmitter<CustomEvent>;

  /**
   * Event handler - always use arrow functions
   */
  private handleEvent = (event: CustomEvent) => {
    this.rEventName.emit(event);
  };

  render() {
    // ALWAYS use removeUndefinedProps for props passed to Ionic components
    const componentProps = removeUndefinedProps({
      color: this.color,
      fill: this.fill,
      mode: this.mode,
      disabled: this.disabled,
      // Add event handlers
      onIonEvent: this.handleEvent,
    });

    return (
      <ion-your-component {...componentProps}>
        <slot></slot>
      </ion-your-component>
    );
  }
}

/**
 * FORM FIELD COMPONENT TEMPLATE (Alternative)
 * 
 * Use this template if your component is a form field (input, dropdown, datepicker, etc.)
 * 
 * Uncomment and modify as needed:
 */

/*
import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle } from '../../utils';
import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-your-field',
  styleUrl: 'r-your-field.css',
  shadow: false,
})
export class RYourField {
  @Prop({ mutable: true }) value?: string | number;
  @Prop() label?: string;
  @Prop() placeholder?: string;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() name?: string;
  @Prop() color?: IonicColor;
  @Prop() fill?: FillStyle;
  @Prop() error: boolean = false;
  @Prop() errorText?: string;
  @Prop() helperText?: string;

  @Event() rChange: EventEmitter<CustomEvent>;
  @Event() rFocus: EventEmitter<CustomEvent>;
  @Event() rBlur: EventEmitter<CustomEvent>;

  private handleChange = (event: CustomEvent) => {
    this.value = event.detail.value;
    this.rChange.emit(event);
  };

  private handleFocus = (event: CustomEvent) => {
    this.rFocus.emit(event);
  };

  private handleBlur = (event: CustomEvent) => {
    this.rBlur.emit(event);
  };

  render() {
    const fieldProps = removeUndefinedProps({
      ...buildFormFieldProps({
        placeholder: this.placeholder,
        disabled: this.disabled,
        required: this.required,
        name: this.name,
        color: this.color,
        fill: this.fill,
      }),
      value: this.value,
      onIonChange: this.handleChange,
      onIonFocus: this.handleFocus,
      onIonBlur: this.handleBlur,
    });

    return (
      <ion-item class={{ 'item-has-error': this.error }} lines={getItemLines(this.fill)}>
        {this.label && (
          <ion-label position={getLabelPosition(this.fill, 'stacked')}>
            {this.label}
          </ion-label>
        )}
        <ion-your-field {...fieldProps}>
          <slot></slot>
        </ion-your-field>
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
*/

