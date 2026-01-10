import { Component, Prop, h, Event, EventEmitter, Element, Watch, Listen, State } from '@stencil/core';

export type CheckboxGroupSize = 'large' | 'default' | 'small';

export interface CheckboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

@Component({
  tag: 'r-checkbox-group',
  styleUrl: 'r-checkbox-group.css',
  shadow: false,
})
export class RCheckboxGroup {
  @Element() el: HTMLElement;

  /** Binding value (array of selected values) */
  @Prop({ mutable: true }) value: (string | number)[] = [];

  /** Size of checkboxes */
  @Prop() size: CheckboxGroupSize = 'default';

  /** Whether all checkboxes are disabled */
  @Prop() disabled: boolean = false;

  /** Minimum number of checkboxes that must be checked */
  @Prop() min: number;

  /** Maximum number of checkboxes that can be checked */
  @Prop() max: number;

  /** Options data for quick setup */
  @Prop() options: CheckboxOption[] = [];

  /** Vertical layout */
  @Prop() vertical: boolean = false;

  @State() internalValue: (string | number)[] = [];

  @Event({ bubbles: true, composed: true }) change: EventEmitter<(string | number)[]>;

  componentWillLoad() {
    this.internalValue = [...(this.value || [])];
  }

  componentDidLoad() {
    this.updateChildCheckboxes();
  }

  @Watch('value')
  handleValueChange(newValue: (string | number)[]) {
    this.internalValue = [...(newValue || [])];
    this.updateChildCheckboxes();
  }

  @Listen('change')
  handleCheckboxChange(event: CustomEvent<boolean>) {
    event.stopPropagation();

    const target = event.target as HTMLElement & { value: string | number; checked: boolean };
    if (!target || target.tagName.toLowerCase() !== 'r-checkbox') return;

    const checkboxValue = target.value;
    const isChecked = target.checked;
    let newValue = [...this.internalValue];

    if (isChecked) {
      if (this.max !== undefined && newValue.length >= this.max) {
        target.checked = false;
        return;
      }
      if (!newValue.includes(checkboxValue)) {
        newValue.push(checkboxValue);
      }
    } else {
      if (this.min !== undefined && newValue.length <= this.min) {
        target.checked = true;
        return;
      }
      newValue = newValue.filter((v) => v !== checkboxValue);
    }

    this.internalValue = newValue;
    this.value = newValue;
    this.change.emit(newValue);
    this.updateChildCheckboxes();
  }

  private updateChildCheckboxes() {
    const checkboxes = this.el.querySelectorAll('r-checkbox');
    checkboxes.forEach((checkbox: HTMLElement & { checked: boolean; disabled: boolean; size: string; value: any }) => {
      checkbox.checked = this.internalValue.includes(checkbox.value);
      if (this.disabled) checkbox.disabled = true;
      if (this.size !== 'default') checkbox.size = this.size;
    });
  }

  private renderOptions() {
    if (!this.options || this.options.length === 0) return null;

    return this.options.map((option) => (
      <r-checkbox
        value={option.value}
        disabled={option.disabled || this.disabled}
        checked={this.internalValue.includes(option.value)}
        size={this.size}
      >
        {option.label}
      </r-checkbox>
    ));
  }

  render() {
    return (
      <div
        class={{
          'r-checkbox-group': true,
          'r-checkbox-group--vertical': this.vertical,
        }}
        role="group"
      >
        {this.renderOptions()}
        <slot></slot>
      </div>
    );
  }
}
