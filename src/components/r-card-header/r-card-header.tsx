import { Component, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';

@Component({
  tag: 'r-card-header',
  styleUrl: 'r-card-header.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RCardHeader {
  render() {
    return (
      <ion-card-header>
        <slot></slot>
      </ion-card-header>
    );
  }
}

