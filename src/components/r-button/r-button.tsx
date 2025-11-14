import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'r-button',
  styleUrl: 'r-button.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RButton {
  /**
   * The button color (Ionic color)
   */
  @Prop() color?: string;

  /**
   * The button size
   */
  @Prop() size?: 'small' | 'default' | 'large';

  /**
   * If true, the button is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the button takes full width
   */
  @Prop() expand?: 'full' | 'block';

  /**
   * The button type (button, submit, reset)
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Button fill style
   */
  @Prop() fill?: 'clear' | 'outline' | 'solid' | 'default';

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
    const buttonProps: any = {
      color: this.color,
      size: this.size,
      disabled: this.disabled,
      expand: this.expand,
      type: this.type,
      fill: this.fill,
      shape: this.shape,
      onClick: this.handleClick,
    };

    // Remove undefined props
    Object.keys(buttonProps).forEach(key => {
      if (buttonProps[key] === undefined) {
        delete buttonProps[key];
      }
    });

    return (
      <ion-button {...buttonProps}>
        {this.icon && this.iconPosition !== 'end' && (
          <ion-icon name={this.icon} slot="start"></ion-icon>
        )}
        <slot></slot>
        {this.icon && this.iconPosition === 'end' && (
          <ion-icon name={this.icon} slot="end"></ion-icon>
        )}
        {this.iconOnly && this.icon && !this.iconPosition && (
          <ion-icon name={this.icon}></ion-icon>
        )}
      </ion-button>
    );
  }
}

