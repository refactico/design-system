import { Component, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';

@Component({
  tag: 'r-card-content',
  styleUrl: 'r-card-content.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RCardContent {
  render() {
    return (
      <ion-card-content>
        <slot></slot>
      </ion-card-content>
    );
  }
}

