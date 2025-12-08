import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, IonicMode } from '../../utils';

@Component({
  tag: 'r-tabs',
  styleUrl: 'r-tabs.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RTabs {
  /**
   * The tabs color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The tabs mode (ios or md)
   */
  @Prop() mode?: IonicMode;

  /**
   * If true, the tabs are translucent
   */
  @Prop() translucent: boolean = false;

  render() {
    const tabsProps = removeUndefinedProps({
      color: this.color,
      mode: this.mode,
      translucent: this.translucent,
    });

    return (
      <ion-tabs {...tabsProps}>
        <slot></slot>
      </ion-tabs>
    );
  }
}

