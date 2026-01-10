import { Component, Prop, h, Event, EventEmitter, Element, State } from '@stencil/core';

export type RadioButtonSize = 'large' | 'default' | 'small';

@Component({
  tag: 'r-radio-button',
  styleUrl: 'r-radio-button.css',
  shadow: false,
})
export class RRadioButton {
  @Element() el: HTMLElement;

  /** The value of the radio button */
  @Prop() value: string | number | boolean;

  /** The label text (display text) */
  @Prop() label: string;

  /** Whether the radio button is disabled */
  @Prop() disabled: boolean = false;

  /** Size of the radio button */
  @Prop() size: RadioButtonSize = 'default';

  /** Native name attribute */
  @Prop({ attribute: 'name' }) inputName: string;

  /** Whether the radio button is checked (controlled by radio-group) */
  @Prop({ mutable: true }) checked: boolean = false;

  @State() focused: boolean = false;

  @Event({ bubbles: true, composed: true }) change: EventEmitter<string | number | boolean>;

  private handleClick = () => {
    if (this.disabled) return;
    if (!this.checked) {
      this.checked = true;
      this.change.emit(this.value);
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
          'r-radio-button': true,
          'r-radio-button--checked': this.checked,
          'r-radio-button--disabled': this.disabled,
          'r-radio-button--focused': this.focused,
          [`r-radio-button--${this.size}`]: this.size !== 'default',
        }}
        onClick={this.handleClick}
      >
        <input
          type="radio"
          class="r-radio-button__original"
          name={this.inputName}
          value={String(this.value)}
          checked={this.checked}
          disabled={this.disabled}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeydown}
        />
        <span class="r-radio-button__inner">
          <slot>{this.label}</slot>
        </span>
      </label>
    );
  }
}
