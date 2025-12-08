import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, IonicMode } from '../../utils';

@Component({
  tag: 'r-tab-button',
  styleUrl: 'r-tab-button.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RTabButton {
  /**
   * The tab identifier this button corresponds to
   */
  @Prop() tab: string;

  /**
   * If true, the tab button is selected
   */
  @Prop() selected: boolean = false;

  /**
   * If true, the tab button is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * The tab button color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The tab button mode (ios or md)
   */
  @Prop() mode?: IonicMode;

  /**
   * The tab button layout (icon-top, icon-start, icon-end, icon-bottom, icon-hide, label-hide)
   */
  @Prop() layout?: 'icon-top' | 'icon-start' | 'icon-end' | 'icon-bottom' | 'icon-hide' | 'label-hide';

  /**
   * The tab button badge
   */
  @Prop() badge?: string;

  /**
   * The tab button badge color
   */
  @Prop() badgeColor?: IonicColor;

  render() {
    const tabButtonProps = removeUndefinedProps({
      tab: this.tab,
      selected: this.selected,
      disabled: this.disabled,
      color: this.color,
      mode: this.mode,
      layout: this.layout,
      badge: this.badge,
      badgeColor: this.badgeColor,
    });

    return (
      <ion-tab-button {...tabButtonProps}>
        <slot></slot>
      </ion-tab-button>
    );
  }
}

