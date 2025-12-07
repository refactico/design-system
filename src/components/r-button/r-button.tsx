import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle, ButtonSize, ButtonType, ExpandOption } from '../../utils';

@Component({
  tag: 'r-button',
  styleUrl: 'r-button.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RButton {
  /**
   * The button color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The button size
   */
  @Prop() size?: ButtonSize;

  /**
   * If true, the button is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the button takes full width
   */
  @Prop() expand?: ExpandOption;

  /**
   * The button type (button, submit, reset)
   */
  @Prop() type: ButtonType = 'button';

  /**
   * Button fill style
   */
  @Prop() fill?: FillStyle;

  /**
   * Button shape
   */
  @Prop() shape?: 'round';

  /**
   * If true, shows only the icon (icon-only button)
   */
  @Prop() iconOnly: boolean = false;

  /**
   * Icon name (Ionic icon name)
   */
  @Prop() icon?: string;

  /**
   * Icon position
   */
  @Prop() iconPosition?: 'start' | 'end';

  /**
   * Emitted when the button is clicked
   */
  @Event() rClick: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled) {
      this.rClick.emit(event);
    }
  };

  render() {
    const buttonProps = removeUndefinedProps({
      color: this.color,
      size: this.size,
      disabled: this.disabled,
      expand: this.expand,
      type: this.type,
      fill: this.fill,
      shape: this.shape,
      onClick: this.handleClick,
    });

    if (this.iconOnly && this.icon) {
      return (
        <ion-button {...buttonProps}>
          <ion-icon name={this.icon} slot="icon-only"></ion-icon>
        </ion-button>
      );
    }

    return (
      <ion-button {...buttonProps}>
        {this.icon && this.iconPosition !== 'end' && (
          <ion-icon name={this.icon} slot="start"></ion-icon>
        )}
        <slot></slot>
        {this.icon && this.iconPosition === 'end' && (
          <ion-icon name={this.icon} slot="end"></ion-icon>
        )}
      </ion-button>
    );
  }
}

