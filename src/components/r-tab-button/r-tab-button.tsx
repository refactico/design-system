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
    const tabButtonProps: any = removeUndefinedProps({
      tab: this.tab,
      selected: this.selected,
      disabled: this.disabled,
      color: this.color,
      mode: this.mode,
      layout: this.layout,
    });

    // Ionic tab-button supports badge and badge-color as attributes
    // Also add as child component for better compatibility
    if (this.badge) {
      tabButtonProps.badge = this.badge;
    }
    if (this.badgeColor) {
      tabButtonProps['badge-color'] = this.badgeColor;
    }

    // Build children - slot content plus optional badge
    const children: any[] = [];
    
    // Add slot content
    children.push(<slot></slot>);
    
    // Add badge as child component if provided
    // Ionic tab-button can use badge attribute OR ion-badge child component
    if (this.badge) {
      const badgeProps: any = {};
      if (this.badgeColor) {
        badgeProps.color = this.badgeColor;
      }
      // Add badge as a child - Ionic will position it automatically
      children.push(
        <ion-badge {...badgeProps}>{this.badge}</ion-badge>
      );
    }

    return (
      <ion-tab-button {...tabButtonProps}>
        {children}
      </ion-tab-button>
    );
  }
}

