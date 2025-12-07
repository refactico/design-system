import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';

@Component({
  tag: 'r-toolbar',
  styleUrl: 'r-toolbar.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RToolbar {
  /**
   * The toolbar color (Ionic color)
   */
  @Prop() color?: string;

  /**
   * If true, the toolbar is translucent
   */
  @Prop() translucent: boolean = false;

  /**
   * The toolbar mode (ios or md)
   */
  @Prop() mode?: 'ios' | 'md';

  /**
   * If true, the toolbar has no border
   */
  @Prop() noBorder: boolean = false;

  render() {
    const toolbarProps: any = {
      color: this.color,
      translucent: this.translucent,
      mode: this.mode,
    };

    // Remove undefined props
    Object.keys(toolbarProps).forEach(key => {
      if (toolbarProps[key] === undefined) {
        delete toolbarProps[key];
      }
    });

    return (
      <ion-toolbar
        {...toolbarProps}
        class={this.noBorder ? 'toolbar-no-border' : ''}
      >
        <slot name="start"></slot>
        <slot name="end"></slot>
        <slot></slot>
      </ion-toolbar>
    );
  }
}

