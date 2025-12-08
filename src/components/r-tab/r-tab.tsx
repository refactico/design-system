import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, IonicMode } from '../../utils';

@Component({
  tag: 'r-tab',
  styleUrl: 'r-tab.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RTab {
  /**
   * The tab identifier
   */
  @Prop() tab: string;

  /**
   * The tab component to render
   */
  @Prop() component?: string;

  /**
   * The tab component props
   */
  @Prop() componentProps?: any;

  /**
   * The tab color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The tab mode (ios or md)
   */
  @Prop() mode?: IonicMode;

  render() {
    const tabProps = removeUndefinedProps({
      tab: this.tab,
      component: this.component,
      componentProps: this.componentProps,
      color: this.color,
      mode: this.mode,
    });

    return (
      <ion-tab {...tabProps}>
        <slot></slot>
      </ion-tab>
    );
  }
}

