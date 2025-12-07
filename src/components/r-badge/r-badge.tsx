import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, IonicMode } from '../../utils';

@Component({
  tag: 'r-badge',
  styleUrl: 'r-badge.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RBadge {
  /**
   * The badge color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The badge mode (ios or md)
   */
  @Prop() mode?: IonicMode;

  render() {
    const badgeProps = removeUndefinedProps({
      color: this.color,
      mode: this.mode,
    });

    return (
      <ion-badge {...badgeProps}>
        <slot></slot>
      </ion-badge>
    );
  }
}

