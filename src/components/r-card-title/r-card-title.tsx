import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor } from '../../utils';

@Component({
  tag: 'r-card-title',
  styleUrl: 'r-card-title.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RCardTitle {
  /**
   * The card title color (Ionic color)
   */
  @Prop() color?: IonicColor;

  render() {
    const titleProps = removeUndefinedProps({
      color: this.color,
    });

    return (
      <ion-card-title {...titleProps}>
        <slot></slot>
      </ion-card-title>
    );
  }
}

