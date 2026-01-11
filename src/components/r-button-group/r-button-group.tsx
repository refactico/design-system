import { Component, Prop, h } from '@stencil/core';
import { ButtonType, ButtonSize } from '../r-button/r-button';

export type ButtonGroupDirection = 'horizontal' | 'vertical';

@Component({
  tag: 'r-button-group',
  styleUrl: 'r-button-group.css',
  shadow: false,
})
export class RButtonGroup {
  /** Control the size of buttons in this group */
  @Prop() size: ButtonSize;

  /** Control the type of buttons in this group */
  @Prop() type: ButtonType;

  /** Display direction */
  @Prop() direction: ButtonGroupDirection = 'horizontal';

  render() {
    const classes = {
      'r-button-group': true,
      [`r-button-group--${this.direction}`]: true,
    };

    const classString = Object.entries(classes)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');

    return (
      <div class={classString} role="group">
        <slot></slot>
      </div>
    );
  }
}
