import { Component, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'r-tab-pane',
  styleUrl: 'r-tab-pane.css',
  shadow: false,
})
export class RTabPane {
  @Element() el: HTMLElement;

  /** Tab pane name (identifier) */
  @Prop() name: string;

  /** Tab pane label (display text) */
  @Prop() label: string;

  /** Whether tab pane is disabled */
  @Prop() disabled: boolean = false;

  /** Whether tab pane can be closed */
  @Prop() closable: boolean = false;

  /** Whether tab pane is lazy loaded */
  @Prop() lazy: boolean = false;

  /** Whether tab pane is active (set by parent) */
  @Prop({ mutable: true }) active: boolean = false;

  private hasRendered: boolean = false;

  render() {
    // For lazy loading, only render content once it's been active
    if (this.lazy && !this.active && !this.hasRendered) {
      return null;
    }

    if (this.active) {
      this.hasRendered = true;
    }

    return (
      <div
        class={{
          'r-tab-pane': true,
          'r-tab-pane--active': this.active,
        }}
        role="tabpanel"
        aria-hidden={this.active ? 'false' : 'true'}
      >
        <slot></slot>
      </div>
    );
  }
}
