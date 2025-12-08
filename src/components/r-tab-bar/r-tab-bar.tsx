import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, IonicMode } from '../../utils';

@Component({
  tag: 'r-tab-bar',
  styleUrl: 'r-tab-bar.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RTabBar {
  /**
   * The tab bar position (top or bottom)
   */
  @Prop() position: 'top' | 'bottom' = 'bottom';

  /**
   * The tab bar color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The tab bar mode (ios or md)
   */
  @Prop() mode?: IonicMode;

  /**
   * If true, the tab bar is translucent
   */
  @Prop() translucent: boolean = false;

  /**
   * The selected tab
   */
  @Prop() selectedTab?: string;

  render() {
    const tabBarProps = removeUndefinedProps({
      slot: this.position,
      color: this.color,
      mode: this.mode,
      translucent: this.translucent,
      selectedTab: this.selectedTab,
    });

    return (
      <ion-tab-bar {...tabBarProps}>
        <slot></slot>
      </ion-tab-bar>
    );
  }
}

