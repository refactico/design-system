import { Component, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';

@Component({
  tag: 'r-card-footer',
  styleUrl: 'r-card-footer.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RCardFooter {
  render() {
    return (
      <ion-card-footer>
        <slot></slot>
      </ion-card-footer>
    );
  }
}

