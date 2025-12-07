import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, IonicMode } from '../../utils';

@Component({
  tag: 'r-header',
  styleUrl: 'r-header.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RHeader {
  /**
   * The header title text
   */
  @Prop() title?: string;

  /**
   * The header color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * If true, the header is translucent
   */
  @Prop() translucent: boolean = false;

  /**
   * If true, the header collapses on scroll
   */
  @Prop() collapse?: 'condense' | 'fade';

  /**
   * The header mode (ios or md)
   */
  @Prop() mode?: IonicMode;

  /**
   * If true, the header has a border
   */
  @Prop() noBorder: boolean = false;

  render() {
    const headerProps = removeUndefinedProps({
      translucent: this.translucent,
      collapse: this.collapse,
      mode: this.mode,
    });

    return (
      <ion-header {...headerProps} class={this.noBorder ? 'header-no-border' : ''}>
        <ion-toolbar color={this.color}>
          <slot name="start"></slot>
          {this.title && <ion-title>{this.title}</ion-title>}
          <slot name="end"></slot>
          <slot></slot>
        </ion-toolbar>
      </ion-header>
    );
  }
}

