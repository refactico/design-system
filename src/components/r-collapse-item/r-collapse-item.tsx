import { Component, Prop, h, Element, State, Method, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'r-collapse-item',
  styleUrl: 'r-collapse-item.css',
  shadow: false,
})
export class RCollapseItem {
  @Element() el: HTMLElement;

  /** Unique identification of the panel */
  @Prop() name: string = '';

  /** Title of the panel */
  @Prop() panelTitle: string = '';

  /** Disable the collapse item */
  @Prop() disabled: boolean = false;

  /** Whether this item is active */
  @State() isActive: boolean = false;

  /** Internal event to communicate with parent */
  @Event({ bubbles: true, composed: true }) itemToggle: EventEmitter<string>;

  private contentEl: HTMLElement;

  /** Set active state (called by parent) */
  @Method()
  async setActive(active: boolean): Promise<void> {
    this.isActive = active;
  }

  /** Check if the current collapse item is active */
  @Method()
  async getIsActive(): Promise<boolean> {
    return this.isActive;
  }

  private handleClick = () => {
    if (this.disabled) return;
    this.itemToggle.emit(this.name);
  };

  private hasSlot(name: string): boolean {
    return !!this.el.querySelector(`[slot="${name}"]`);
  }

  private getContentHeight(): string {
    if (!this.isActive) return '0px';
    if (this.contentEl) {
      return `${this.contentEl.scrollHeight}px`;
    }
    return '500px';
  }

  render() {
    const hasIconSlot = this.hasSlot('icon');
    const hasTitleSlot = this.hasSlot('title');

    return (
      <div
        class={{
          'r-collapse-item': true,
          'r-collapse-item--active': this.isActive,
          'r-collapse-item--disabled': this.disabled,
        }}
      >
        <div
          class="r-collapse-item__header"
          role="button"
          tabindex={this.disabled ? -1 : 0}
          aria-expanded={this.isActive ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : 'false'}
          onClick={this.handleClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.handleClick();
            }
          }}
        >
          <span class="r-collapse-item__arrow">
            {hasIconSlot ? (
              <slot name="icon"></slot>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            )}
          </span>
          <span class="r-collapse-item__title">
            {hasTitleSlot ? <slot name="title"></slot> : this.panelTitle}
          </span>
        </div>
        <div
          class="r-collapse-item__wrap"
          ref={(el) => (this.contentEl = el)}
          style={{ maxHeight: this.getContentHeight() }}
        >
          <div class="r-collapse-item__content">
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }
}
