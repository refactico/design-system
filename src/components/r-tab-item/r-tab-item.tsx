import { Component, Prop, h, Event, EventEmitter, Element } from '@stencil/core';

export type TabItemType = 'line' | 'card' | 'border-card';

@Component({
  tag: 'r-tab-item',
  styleUrl: 'r-tab-item.css',
  shadow: false,
})
export class RTabItem {
  @Element() el: HTMLElement;

  /** Tab name (identifier) */
  @Prop() name: string;

  /** Tab label (display text) */
  @Prop() label: string;

  /** Whether tab is active */
  @Prop() active: boolean = false;

  /** Whether tab is disabled */
  @Prop() disabled: boolean = false;

  /** Whether tab can be closed */
  @Prop() closable: boolean = false;

  /** Tab type (inherited from parent) */
  @Prop() type: TabItemType = 'line';

  @Event({ bubbles: true, composed: true }) close: EventEmitter<MouseEvent>;

  private handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    this.close.emit(e);
  };

  render() {
    return (
      <div
        class={{
          'r-tab-item': true,
          'r-tab-item--active': this.active,
          'r-tab-item--disabled': this.disabled,
          [`r-tab-item--${this.type}`]: true,
        }}
        role="tab"
        aria-selected={this.active ? 'true' : 'false'}
        aria-disabled={this.disabled ? 'true' : 'false'}
        tabindex={this.disabled ? -1 : 0}
      >
        <span class="r-tab-item__label">
          <slot>{this.label}</slot>
        </span>
        {this.closable && (
          <span class="r-tab-item__close" onClick={this.handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        )}
      </div>
    );
  }
}
