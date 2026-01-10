import { Component, Prop, h, Event, EventEmitter, Element, State, Watch } from '@stencil/core';

export type CheckboxSize = 'large' | 'default' | 'small';

@Component({
  tag: 'r-checkbox',
  styleUrl: 'r-checkbox.css',
  shadow: false,
})
export class RCheckbox {
  @Element() el: HTMLElement;

  /** The value of the checkbox (used in checkbox-group) */
  @Prop() value: string | number | boolean;

  /** The label text */
  @Prop() label: string;

  /** Whether the checkbox is checked */
  @Prop({ mutable: true }) checked: boolean = false;

  /** Whether the checkbox is in indeterminate state */
  @Prop({ mutable: true }) indeterminate: boolean = false;

  /** Whether the checkbox is disabled */
  @Prop() disabled: boolean = false;

  /** Whether to add a border around the checkbox */
  @Prop() border: boolean = false;

  /** Size of the checkbox */
  @Prop() size: CheckboxSize = 'default';

  /** Native name attribute */
  @Prop({ attribute: 'name' }) inputName: string;

  /** True value for v-model */
  @Prop() trueValue: any = true;

  /** False value for v-model */
  @Prop() falseValue: any = false;

  @State() focused: boolean = false;

  @Event({ bubbles: true, composed: true }) change: EventEmitter<boolean>;

  @Watch('checked')
  handleCheckedChange(newValue: boolean) {
    this.change.emit(newValue);
  }

  private handleClick = () => {
    if (this.disabled) return;
    this.indeterminate = false;
    this.checked = !this.checked;
  };

  private handleFocus = () => {
    this.focused = true;
  };

  private handleBlur = () => {
    this.focused = false;
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.handleClick();
    }
  };

  render() {
    return (
      <label
        class={{
          'r-checkbox': true,
          'r-checkbox--checked': this.checked,
          'r-checkbox--indeterminate': this.indeterminate,
          'r-checkbox--disabled': this.disabled,
          'r-checkbox--border': this.border,
          'r-checkbox--focused': this.focused,
          [`r-checkbox--${this.size}`]: this.size !== 'default',
        }}
        onClick={this.handleClick}
      >
        <span class="r-checkbox__input">
          <span class="r-checkbox__inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <input
            type="checkbox"
            class="r-checkbox__original"
            name={this.inputName}
            value={String(this.value)}
            checked={this.checked}
            disabled={this.disabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeydown}
          />
        </span>
        <span class="r-checkbox__label">
          <slot>{this.label}</slot>
        </span>
      </label>
    );
  }
}
