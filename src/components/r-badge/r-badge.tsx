import { Component, Host, h, Prop, State, Element } from '@stencil/core';

/**
 * r-badge
 * Flexible badge component with dot variant and icon support
 */
@Component({
  tag: 'r-badge',
  styleUrl: 'r-badge.css',
  shadow: true,
})
export class RBadge {
  @Element() el!: HTMLElement;

  @Prop() variant: 'solid' | 'outline' | 'ghost' | 'dot' = 'solid';
  @Prop() color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'primary';
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() pill: boolean = false;

  @State() hasIcon = false;
  @State() hasContent = false;

  componentDidLoad() {
    this.checkSlots();
  }

  componentDidUpdate() {
    this.checkSlots();
  }

  private checkSlots() {
    const defaultSlot = this.el.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    const iconSlot = this.el.shadowRoot?.querySelector('slot[name="icon"]') as HTMLSlotElement | null;
    
    if (defaultSlot) {
      const nodes = defaultSlot.assignedNodes();
      this.hasContent = nodes.length > 0 && nodes.some(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent?.trim() !== '';
        }
        return true;
      });
    }
    
    if (iconSlot) {
      this.hasIcon = iconSlot.assignedElements().length > 0;
    }
  }

  private onSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    const nodes = slot.assignedNodes();
    this.hasContent = nodes.length > 0 && nodes.some(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent?.trim() !== '';
      }
      return true;
    });
  };

  private onIconSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasIcon = slot.assignedElements().length > 0;
  };

  render() {
    const isDot = this.variant === 'dot';
    // For non-dot variants, always show content slot (it will be empty if no content)
    const showContent = !isDot;

    return (
      <Host>
        <span
          class={{
            badge: true,
            [this.variant]: true,
            [`color-${this.color}`]: true,
            [`size-${this.size}`]: true,
            pill: this.pill,
            dot: isDot,
            'has-icon': this.hasIcon,
          }}
          role={isDot ? 'status' : undefined}
          aria-label={isDot ? 'Status indicator' : undefined}
        >
          {isDot ? (
            <span class="badge-dot" aria-hidden="true"></span>
          ) : (
            <>
              <span class="badge-icon" aria-hidden="true" hidden={!this.hasIcon}>
                <slot name="icon" onSlotchange={this.onIconSlotChange} />
              </span>
              <span class="badge-content">
                <slot onSlotchange={this.onSlotChange} />
              </span>
            </>
          )}
        </span>
      </Host>
    );
  }
}
