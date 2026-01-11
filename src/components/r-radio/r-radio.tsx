import { Component, Prop, h, Event, EventEmitter, Element, State, Watch } from '@stencil/core';

export type RadioSize = 'large' | 'default' | 'small';

@Component({
  tag: 'r-radio',
  styleUrl: 'r-radio.css',
  shadow: false,
})
export class RRadio {
  @Element() el: HTMLElement;

  /** The value of the radio */
  @Prop() value: string | number | boolean;

  /** The label text (display text) */
  @Prop() label: string;

  /** Whether the radio is disabled */
  @Prop() disabled: boolean = false;

  /** Whether to add a border around the radio */
  @Prop() border: boolean = false;

  /** Size of the radio */
  @Prop() size: RadioSize = 'default';

  /** Native name attribute */
  @Prop({ attribute: 'name' }) inputName: string;

  /** Whether the radio is checked (controlled by radio-group) */
  @Prop({ mutable: true }) checked: boolean = false;

  @State() focused: boolean = false;

  @Event({ bubbles: true, composed: true }) change: EventEmitter<string | number | boolean>;

  @Watch('checked')
  handleCheckedChange(newValue: boolean) {
    if (newValue) {
      this.change.emit(this.value);
    }
  }

  private handleClick = () => {
    if (this.disabled) return;
    if (!this.checked) {
      this.checked = true;
    }
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
          'r-radio': true,
          'r-radio--checked': this.checked,
          'r-radio--disabled': this.disabled,
          'r-radio--border': this.border,
          'r-radio--focused': this.focused,
          [`r-radio--${this.size}`]: this.size !== 'default',
        }}
        onClick={this.handleClick}
      >
        <span class="r-radio__input">
          <span class="r-radio__inner"></span>
          <input
            type="radio"
            class="r-radio__original"
            name={this.inputName}
            value={String(this.value)}
            checked={this.checked}
            disabled={this.disabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeydown}
          />
        </span>
        <span class="r-radio__label">
          <slot>{this.label}</slot>
        </span>
      </label>
    );
  }
}
