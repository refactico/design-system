import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'r-dropdown-menu',
  styleUrl: 'r-dropdown-menu.css',
  shadow: false,
})
export class RDropdownMenu {
  @Element() el: HTMLElement;

  render() {
    return (
      <ul class="r-dropdown-menu" role="menu">
        <slot></slot>
      </ul>
    );
  }
}
