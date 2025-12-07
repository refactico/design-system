import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor } from '../../utils';

@Component({
  tag: 'r-card-subtitle',
  styleUrl: 'r-card-subtitle.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RCardSubtitle {
  /**
   * The card subtitle color (Ionic color)
   */
  @Prop() color?: IonicColor;

  render() {
    const subtitleProps = removeUndefinedProps({
      color: this.color,
    });

    return (
      <ion-card-subtitle {...subtitleProps}>
        <slot></slot>
      </ion-card-subtitle>
    );
  }
}

