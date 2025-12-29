import { Component, Prop, Event, EventEmitter, h, Host, State, Element, Method } from '@stencil/core';

/**
 * r-button
 * Minimal, flexible, accessible button component with industry-standard features
 */
@Component({
  tag: 'r-button',
  styleUrl: 'r-button.css',
  shadow: true,
})
export class RButton {
  @Element() el!: HTMLElement;

  @State() hasLeftIcon = false;
  @State() hasRightIcon = false;

  /** Native button type */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Visual variant */
  @Prop() variant: 'solid' | 'outline' | 'ghost' | 'link' = 'solid';

  /** Size variant */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Color scheme */
  @Prop() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral' = 'primary';

  /** Disabled state */
  @Prop() disabled = false;

  /** Full width button */
  @Prop() block = false;

  /** Loading state */
  @Prop() loading = false;

  /** Icon-only button (square) */
  @Prop() iconOnly = false;

  /** Button label for accessibility */
  @Prop() label?: string;

  /** Form ID to associate with */
  @Prop() form?: string;

  /** Emit click events */
  @Event() rClick!: EventEmitter<MouseEvent>;

  /** Emit focus events */
  @Event() rFocus!: EventEmitter<FocusEvent>;

  /** Emit blur events */
  @Event() rBlur!: EventEmitter<FocusEvent>;

  private buttonElement?: HTMLButtonElement;

  /**
   * Programmatically focus the button
   */
  @Method()
  async setFocus() {
    this.buttonElement?.focus();
  }

  /**
   * Programmatically trigger a click on the button
   */
  @Method()
  async triggerClick() {
    this.buttonElement?.click();
  }

  private onClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.rClick.emit(event);
  };

  private onFocus = (event: FocusEvent) => {
    this.rFocus.emit(event);
  };

  private onBlur = (event: FocusEvent) => {
    this.rBlur.emit(event);
  };

  private get isDisabled() {
    return this.disabled || this.loading;
  }

  private onLeftIconSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasLeftIcon = slot.assignedElements().length > 0;
  };

  private onRightIconSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasRightIcon = slot.assignedElements().length > 0;
  };

  componentDidLoad() {
    // Check for icon-only button - slots will be detected via slotchange events
  }

  render() {
    const hasAnyIcon = this.hasLeftIcon || this.hasRightIcon;
    const hasTextContent = this.el.textContent?.trim() !== '';
    const isIconOnly = this.iconOnly || (hasAnyIcon && !hasTextContent);

    return (
      <Host>
        <button
          ref={(el) => (this.buttonElement = el)}
          type={this.type}
          form={this.form}
          class={{
            'btn': true,
            [`variant-${this.variant}`]: true,
            [`size-${this.size}`]: true,
            [`color-${this.color}`]: true,
            'block': this.block,
            'loading': this.loading,
            'icon-only': isIconOnly,
          }}
          disabled={this.isDisabled}
          aria-busy={this.loading ? 'true' : 'false'}
          aria-label={this.label}
          aria-disabled={this.isDisabled ? 'true' : 'false'}
          onClick={this.onClick}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        >
          {/* Left icon */}
          <span class={this.hasLeftIcon ? 'icon left' : ''} aria-hidden="true" hidden={!this.hasLeftIcon}>
            <slot name="icon-left" onSlotchange={this.onLeftIconSlotChange} />
          </span>

          {/* Content */}
          <span class="content">
            <slot />
          </span>
          {/* Right icon */}
          <span class={this.hasRightIcon ? 'icon right' : ''} aria-hidden="true" hidden={!this.hasRightIcon}>
            <slot name="icon-right" onSlotchange={this.onRightIconSlotChange} />
          </span>

          {/* Loading spinner */}
          {this.loading && <span class="spinner" aria-hidden="true" />}
        </button>
      </Host>
    );
  }
}
