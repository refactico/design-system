import { Component, Prop, h, Event, EventEmitter, Element, Watch, Listen, State } from '@stencil/core';

export type RadioGroupSize = 'large' | 'default' | 'small';

export interface RadioOption {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
}

@Component({
  tag: 'r-radio-group',
  styleUrl: 'r-radio-group.css',
  shadow: false,
})
export class RRadioGroup {
  @Element() el: HTMLElement;

  /** Binding value */
  @Prop({ mutable: true }) value: string | number | boolean;

  /** Size of radio buttons */
  @Prop() size: RadioGroupSize = 'default';

  /** Whether the nesting radios are disabled */
  @Prop() disabled: boolean = false;

  /** Whether to trigger form validation */
  @Prop() validateEvent: boolean = true;

  /** Font color when button is active */
  @Prop() textColor: string = '#ffffff';

  /** Border and background color when button is active */
  @Prop() fill: string;

  /** Native name attribute */
  @Prop({ attribute: 'name' }) inputName: string;

  /** Aria label */
  @Prop() ariaLabel: string;

  /** Options data for quick setup */
  @Prop() options: RadioOption[] = [];

  /** Component type to render options ('radio' or 'button') */
  @Prop() type: 'radio' | 'button' = 'radio';

  /** Vertical layout */
  @Prop() vertical: boolean = false;

  @State() internalValue: string | number | boolean;

  @Event({ bubbles: true, composed: true }) change: EventEmitter<string | number | boolean>;

  componentWillLoad() {
    this.internalValue = this.value;
  }

  componentDidLoad() {
    this.updateChildRadios();
  }

  @Watch('value')
  handleValueChange(newValue: string | number | boolean) {
    this.internalValue = newValue;
    this.updateChildRadios();
  }

  @Listen('change')
  handleRadioChange(event: CustomEvent<string | number | boolean>) {
    // Prevent the child event from bubbling further
    event.stopPropagation();
    
    const newValue = event.detail;
    if (newValue !== this.internalValue) {
      this.internalValue = newValue;
      this.value = newValue;
      this.change.emit(newValue);
      this.updateChildRadios();
    }
  }

  private updateChildRadios() {
    // Update r-radio children
    const radios = this.el.querySelectorAll('r-radio');
    radios.forEach((radio: HTMLElement & { checked: boolean; disabled: boolean; size: string; inputName: string; value: any }) => {
      radio.checked = radio.value === this.internalValue;
      if (this.disabled) radio.disabled = true;
      if (this.size !== 'default') radio.size = this.size;
      if (this.inputName) radio.inputName = this.inputName;
    });

    // Update r-radio-button children
    const radioButtons = this.el.querySelectorAll('r-radio-button');
    radioButtons.forEach((btn: HTMLElement & { checked: boolean; disabled: boolean; size: string; inputName: string; value: any }) => {
      btn.checked = btn.value === this.internalValue;
      if (this.disabled) btn.disabled = true;
      if (this.size !== 'default') btn.size = this.size;
      if (this.inputName) btn.inputName = this.inputName;
    });
  }

  private renderOptions() {
    if (!this.options || this.options.length === 0) return null;

    if (this.type === 'button') {
      return this.options.map((option) => (
        <r-radio-button
          value={option.value}
          disabled={option.disabled || this.disabled}
          checked={option.value === this.internalValue}
          size={this.size}
          inputName={this.inputName}
        >
          {option.label}
        </r-radio-button>
      ));
    }

    return this.options.map((option) => (
      <r-radio
        value={option.value}
        disabled={option.disabled || this.disabled}
        checked={option.value === this.internalValue}
        size={this.size}
        inputName={this.inputName}
      >
        {option.label}
      </r-radio>
    ));
  }

  render() {
    return (
      <div
        class={{
          'r-radio-group': true,
          'r-radio-group--vertical': this.vertical,
        }}
        role="radiogroup"
        aria-label={this.ariaLabel}
      >
        {this.renderOptions()}
        <slot></slot>
      </div>
    );
  }
}
