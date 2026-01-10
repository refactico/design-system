import { Component, Prop, h, Event, EventEmitter, State, Method, Element } from '@stencil/core';

export type InputNumberSize = 'large' | 'default' | 'small';
export type ControlsPosition = '' | 'right';

@Component({
  tag: 'r-input-number',
  styleUrl: 'r-input-number.css',
  shadow: false,
})
export class RInputNumber {
  @Element() el: HTMLElement;

  /** Binding value */
  @Prop({ mutable: true }) value: number | null = null;

  /** Minimum allowed value */
  @Prop() min: number = Number.MIN_SAFE_INTEGER;

  /** Maximum allowed value */
  @Prop() max: number = Number.MAX_SAFE_INTEGER;

  /** Incremental step */
  @Prop() step: number = 1;

  /** Whether input value can only be multiple of step */
  @Prop() stepStrictly: boolean = false;

  /** Precision of input value */
  @Prop() precision: number;

  /** Size of the component */
  @Prop() size: InputNumberSize = 'default';

  /** Whether the component is disabled */
  @Prop() disabled: boolean = false;

  /** Whether the component is readonly */
  @Prop() readonly: boolean = false;

  /** Whether to enable control buttons */
  @Prop() controls: boolean = true;

  /** Position of control buttons */
  @Prop() controlsPosition: ControlsPosition = '';

  /** Placeholder text */
  @Prop() placeholder: string = '';

  /** Name attribute */
  @Prop({ attribute: 'name' }) inputName: string;

  /** Aria label */
  @Prop() ariaLabel: string;

  /** Input focus state */
  @State() isFocused: boolean = false;

  /** Display value in input */
  @State() displayValue: string = '';

  private inputRef: HTMLRInputElement;

  @Event({ bubbles: true, composed: true }) change: EventEmitter<number | null>;

  componentWillLoad() {
    this.updateDisplayValue();
  }

  /** Focus the input */
  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.setFocus();
  }

  /** Blur the input */
  @Method()
  async setBlur(): Promise<void> {
    this.inputRef?.setBlur();
  }

  private updateDisplayValue() {
    if (this.value === null || this.value === undefined || isNaN(this.value)) {
      this.displayValue = '';
    } else {
      this.displayValue = this.formatValue(this.value);
    }
  }

  private formatValue(val: number): string {
    if (this.precision !== undefined) {
      return val.toFixed(this.precision);
    }
    return String(val);
  }

  private parseValue(val: string): number | null {
    if (val === '' || val === null || val === undefined) {
      return null;
    }
    const num = parseFloat(val);
    if (isNaN(num)) {
      return null;
    }
    return num;
  }

  private clampValue(val: number): number {
    let result = val;

    // Apply precision
    if (this.precision !== undefined) {
      result = parseFloat(result.toFixed(this.precision));
    }

    // Apply step strictly
    if (this.stepStrictly) {
      result = Math.round(result / this.step) * this.step;
      if (this.precision !== undefined) {
        result = parseFloat(result.toFixed(this.precision));
      }
    }

    // Clamp to min/max
    result = Math.max(this.min, Math.min(this.max, result));

    return result;
  }

  private setValue(val: number | null) {
    const newValue = val === null ? null : this.clampValue(val);
    if (newValue !== this.value) {
      this.value = newValue;
      this.change.emit(newValue);
    }
    this.updateDisplayValue();
  }

  private handleIncrease = () => {
    if (this.disabled || this.readonly) return;
    const currentValue = this.value ?? 0;
    const newValue = currentValue + this.step;
    if (newValue <= this.max) {
      this.setValue(newValue);
    }
  };

  private handleDecrease = () => {
    if (this.disabled || this.readonly) return;
    const currentValue = this.value ?? 0;
    const newValue = currentValue - this.step;
    if (newValue >= this.min) {
      this.setValue(newValue);
    }
  };

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.displayValue = target.value;
  };

  private handleChange = () => {
    const parsed = this.parseValue(this.displayValue);
    this.setValue(parsed);
  };

  private handleFocus = () => {
    this.isFocused = true;
  };

  private handleBlur = () => {
    this.isFocused = false;
    this.handleChange();
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.handleIncrease();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.handleDecrease();
    } else if (e.key === 'Enter') {
      this.handleChange();
    }
  };

  private get isDecreaseDisabled(): boolean {
    return this.disabled || this.readonly || (this.value !== null && this.value <= this.min);
  }

  private get isIncreaseDisabled(): boolean {
    return this.disabled || this.readonly || (this.value !== null && this.value >= this.max);
  }

  private renderControls() {
    if (!this.controls) return null;

    if (this.controlsPosition === 'right') {
      return (
        <div class="r-input-number__controls-right">
          <button
            class={{
              'r-input-number__btn': true,
              'r-input-number__btn--up': true,
              'r-input-number__btn--disabled': this.isIncreaseDisabled,
            }}
            disabled={this.isIncreaseDisabled}
            onClick={this.handleIncrease}
            tabindex={-1}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
          <button
            class={{
              'r-input-number__btn': true,
              'r-input-number__btn--down': true,
              'r-input-number__btn--disabled': this.isDecreaseDisabled,
            }}
            disabled={this.isDecreaseDisabled}
            onClick={this.handleDecrease}
            tabindex={-1}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      );
    }

    return null;
  }

  render() {
    const showSideControls = this.controls && this.controlsPosition !== 'right';

    return (
      <div
        class={{
          'r-input-number': true,
          [`r-input-number--${this.size}`]: true,
          'r-input-number--disabled': this.disabled,
          'r-input-number--controls-right': this.controlsPosition === 'right',
          'r-input-number--no-controls': !this.controls,
        }}
        onKeyDown={this.handleKeydown}
      >
        {showSideControls && (
          <button
            class={{
              'r-input-number__decrease': true,
              'r-input-number__btn--disabled': this.isDecreaseDisabled,
            }}
            disabled={this.isDecreaseDisabled}
            onClick={this.handleDecrease}
            tabindex={-1}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        )}

        <r-input
          ref={(el) => (this.inputRef = el)}
          class="r-input-number__input"
          value={this.displayValue}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readonly={this.readonly}
          size={this.size}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="suffix" slot="suffix"></slot>
        </r-input>

        {showSideControls && (
          <button
            class={{
              'r-input-number__increase': true,
              'r-input-number__btn--disabled': this.isIncreaseDisabled,
            }}
            disabled={this.isIncreaseDisabled}
            onClick={this.handleIncrease}
            tabindex={-1}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        )}

        {this.renderControls()}
      </div>
    );
  }
}
