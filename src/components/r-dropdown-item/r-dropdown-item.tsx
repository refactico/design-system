import { Component, Prop, h, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'r-dropdown-item',
  styleUrl: 'r-dropdown-item.css',
  shadow: false,
})
export class RDropdownItem {
  @Element() el: HTMLElement;

  /** Command value */
  @Prop() command: string | number;

  /** Whether item is disabled */
  @Prop() disabled: boolean = false;

  /** Whether to show divider above */
  @Prop() divided: boolean = false;

  /** Icon name or slot */
  @Prop() icon: string;

  @Event({ bubbles: true, composed: true }) itemClick: EventEmitter<string | number>;

  private handleClick = () => {
    if (this.disabled) return;
    this.itemClick.emit(this.command);
  };

  render() {
    return (
      <li
        class={{
          'r-dropdown-item': true,
          'r-dropdown-item--disabled': this.disabled,
          'r-dropdown-item--divided': this.divided,
        }}
        role="menuitem"
        tabindex={this.disabled ? -1 : 0}
        onClick={this.handleClick}
      >
        {this.icon && <span class="r-dropdown-item__icon">{this.icon}</span>}
        <slot name="icon"></slot>
        <slot></slot>
      </li>
    );
  }
}
