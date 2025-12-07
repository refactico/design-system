import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';

@Component({
  tag: 'r-badge',
  styleUrl: 'r-badge.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RBadge {
  /**
   * The badge color (Ionic color)
   */
  @Prop() color?: string;

  /**
   * The badge mode (ios or md)
   */
  @Prop() mode?: 'ios' | 'md';

  render() {
    const badgeProps: any = {
      color: this.color,
      mode: this.mode,
    };

    // Remove undefined props
    Object.keys(badgeProps).forEach(key => {
      if (badgeProps[key] === undefined) {
        delete badgeProps[key];
      }
    });

    return (
      <ion-badge {...badgeProps}>
        <slot></slot>
      </ion-badge>
    );
  }
}

