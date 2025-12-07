import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, IonicMode } from '../../utils';

@Component({
  tag: 'r-card',
  styleUrl: 'r-card.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RCard {
  /**
   * The card color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The card mode (ios or md)
   */
  @Prop() mode?: IonicMode;

  /**
   * If true, the card acts as a button and becomes clickable
   */
  @Prop() button: boolean = false;

  /**
   * If true, the card is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * The URL to navigate to when the card is clicked (only works if button is true)
   */
  @Prop() href?: string;

  /**
   * The router direction (forward, back, root) for navigation
   */
  @Prop() routerDirection?: 'forward' | 'back' | 'root';

  /**
   * The download attribute for links
   */
  @Prop() download?: string;

  /**
   * The rel attribute for links
   */
  @Prop() rel?: string;

  /**
   * The target attribute for links
   */
  @Prop() target?: string;

  render() {
    const cardProps = removeUndefinedProps({
      color: this.color,
      mode: this.mode,
      button: this.button,
      disabled: this.disabled,
      href: this.href,
      routerDirection: this.routerDirection,
      download: this.download,
      rel: this.rel,
      target: this.target,
    });

    return (
      <ion-card {...cardProps}>
        <slot></slot>
      </ion-card>
    );
  }
}

