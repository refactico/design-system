import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';

@Component({
  tag: 'r-buttons',
  styleUrl: 'r-buttons.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RButtons {
  /**
   * The slot where the buttons should be placed.
   * Can be "start", "end", or "primary" (default).
   */
  @Prop() slot?: string;

  /**
   * If true, the buttons will collapse when the content scrolls.
   */
  @Prop() collapse?: boolean;

  render() {
    const buttonsProps: any = {
      slot: this.slot,
      collapse: this.collapse,
    };

    // Remove undefined props
    Object.keys(buttonsProps).forEach(key => {
      if (buttonsProps[key] === undefined) {
        delete buttonsProps[key];
      }
    });

    return (
      <ion-buttons {...buttonsProps}>
        <slot></slot>
      </ion-buttons>
    );
  }
}

