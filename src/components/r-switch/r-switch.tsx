import { Component, Prop, h, Event, EventEmitter, Element, State, Watch } from '@stencil/core';

export type SwitchSize = 'large' | 'default' | 'small';

@Component({
  tag: 'r-switch',
  styleUrl: 'r-switch.css',
  shadow: false,
})
export class RSwitch {
  @Element() el: HTMLElement;

  /** Whether switch is on */
  @Prop({ mutable: true }) checked: boolean = false;

  /** Whether switch is disabled */
  @Prop() disabled: boolean = false;

  /** Whether switch is loading */
  @Prop() loading: boolean = false;

  /** Size of the switch */
  @Prop() size: SwitchSize = 'default';

  /** Text displayed when on */
  @Prop() activeText: string;

  /** Text displayed when off */
  @Prop() inactiveText: string;

  /** Whether to show text inside switch */
  @Prop() inlinePrompt: boolean = false;

  /** Value when on */
  @Prop() activeValue: any = true;

  /** Value when off */
  @Prop() inactiveValue: any = false;

  /** Background color when on */
  @Prop() activeColor: string;

  /** Background color when off */
  @Prop() inactiveColor: string;

  /** Native name attribute */
  @Prop({ attribute: 'name' }) inputName: string;

  /** Aria label */
  @Prop() ariaLabel: string;

  @State() focused: boolean = false;

  @Event({ bubbles: true, composed: true }) change: EventEmitter<boolean>;

  @Watch('checked')
  handleCheckedChange(newValue: boolean) {
    this.change.emit(newValue);
  }

  private handleClick = () => {
    if (this.disabled || this.loading) return;
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
    const customStyles: { [key: string]: string } = {};
    if (this.activeColor) {
      customStyles['--r-switch-active-color'] = this.activeColor;
    }
    if (this.inactiveColor) {
      customStyles['--r-switch-inactive-color'] = this.inactiveColor;
    }

    return (
      <label
        class={{
          'r-switch': true,
          'r-switch--checked': this.checked,
          'r-switch--disabled': this.disabled,
          'r-switch--loading': this.loading,
          'r-switch--focused': this.focused,
          'r-switch--inline-prompt': this.inlinePrompt,
          'r-switch--custom-active': !!this.activeColor,
          'r-switch--custom-inactive': !!this.inactiveColor,
          [`r-switch--${this.size}`]: this.size !== 'default',
        }}
        style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
        onClick={this.handleClick}
      >
        {!this.inlinePrompt && this.inactiveText && (
          <span class="r-switch__label">{this.inactiveText}</span>
        )}

        <span class="r-switch__core">
          {this.inlinePrompt && (
            <span class="r-switch__inner r-switch__inner--active">
              {this.activeText}
            </span>
          )}
          {this.inlinePrompt && (
            <span class="r-switch__inner r-switch__inner--inactive">
              {this.inactiveText}
            </span>
          )}
          <span class="r-switch__thumb"></span>
          <input
            type="checkbox"
            class="r-switch__input"
            name={this.inputName}
            checked={this.checked}
            disabled={this.disabled || this.loading}
            aria-label={this.ariaLabel}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeydown}
          />
        </span>

        {!this.inlinePrompt && this.activeText && (
          <span class="r-switch__label">{this.activeText}</span>
        )}
      </label>
    );
  }
}
