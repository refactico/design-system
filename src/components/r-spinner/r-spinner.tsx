import { Component, Prop, h, Element } from '@stencil/core';

export type SpinnerSize = 'small' | 'default' | 'large';
export type SpinnerColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'white' | '';

@Component({
  tag: 'r-spinner',
  styleUrl: 'r-spinner.css',
  shadow: false,
})
export class RSpinner {
  @Element() el: HTMLElement;

  /** Spinner size */
  @Prop() size: SpinnerSize = 'default';

  /** Spinner color */
  @Prop() color: SpinnerColor = 'primary';

  /** Custom size in pixels */
  @Prop() customSize: number;

  /** Stroke width */
  @Prop() strokeWidth: number = 4;

  render() {
    const sizeMap = {
      small: 16,
      default: 24,
      large: 32,
    };

    const actualSize = this.customSize || sizeMap[this.size];

    return (
      <span
        class={{
          'r-spinner': true,
          [`r-spinner--${this.size}`]: !this.customSize,
          [`r-spinner--${this.color}`]: !!this.color,
        }}
        style={this.customSize ? { width: `${this.customSize}px`, height: `${this.customSize}px` } : undefined}
        role="status"
        aria-label="Loading"
      >
        <svg class="r-spinner__circle" viewBox="0 0 50 50" width={actualSize} height={actualSize}>
          <circle
            class="r-spinner__path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width={this.strokeWidth}
          />
        </svg>
      </span>
    );
  }
}
