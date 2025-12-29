import { Component, Prop, Event, EventEmitter, h, Host, Element, Listen, Method, State, Watch } from '@stencil/core';

/**
 * r-modal
 * Accessible, flexible modal/dialog component with focus trap
 */
@Component({
  tag: 'r-modal',
  styleUrl: 'r-modal.css',
  shadow: true,
})
export class RModal {
  @Element() el!: HTMLElement;

  /** Open state */
  @Prop({ mutable: true }) open = false;

  /** Modal title */
  @Prop() modalTitle?: string;

  /** Modal size */
  @Prop() size: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen' = 'md';

  /** Close on backdrop click */
  @Prop() backdropClosable = true;

  /** Close on escape key */
  @Prop() escapeClosable = true;

  /** Show close button */
  @Prop() closable = true;

  /** Center modal vertically */
  @Prop() centered = true;

  /** Scrollable body content */
  @Prop() scrollable = true;

  /** Trap focus within modal */
  @Prop() focusTrap = true;

  @State() previousActiveElement?: HTMLElement;

  /** Emit close events */
  @Event() rClose!: EventEmitter<void>;

  /** Fired when modal opens */
  @Event() rOpen!: EventEmitter<void>;

  private modalContent?: HTMLElement;
  private focusableElements: HTMLElement[] = [];

  @Watch('open')
  handleOpenChange(isOpen: boolean) {
    if (isOpen) {
      this.previousActiveElement = document.activeElement as HTMLElement;
      this.rOpen.emit();
      if (this.focusTrap) {
        setTimeout(() => this.trapFocus(), 0);
      }
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      // Restore focus
      if (this.previousActiveElement) {
        this.previousActiveElement.focus();
      }
    }
  }

  /**
   * Programmatically open the modal
   */
  @Method()
  async show() {
    this.open = true;
  }

  /**
   * Programmatically close the modal
   */
  @Method()
  async hide() {
    this.open = false;
  }

  private trapFocus() {
    if (!this.modalContent) return;

    // Get all focusable elements
    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    this.focusableElements = Array.from(
      this.modalContent.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];

    // Focus first element
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
  }

  private onClose = () => {
    this.open = false;
    this.rClose.emit();
  };

  private onBackdropClick = (event: MouseEvent) => {
    if (this.backdropClosable && event.target === event.currentTarget) {
      this.onClose();
    }
  };

  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (!this.open) return;

    if (this.escapeClosable && event.key === 'Escape') {
      this.onClose();
      return;
    }

    if (this.focusTrap && event.key === 'Tab') {
      if (this.focusableElements.length === 0) return;

      const firstElement = this.focusableElements[0];
      const lastElement = this.focusableElements[this.focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  componentDidUpdate() {
    if (this.open && this.focusTrap) {
      setTimeout(() => this.trapFocus(), 0);
    }
  }

  render() {
    const modalId = `r-modal-${Math.random().toString(36).substr(2, 9)}`;
    const titleId = this.modalTitle ? `${modalId}-title` : undefined;
    const describedBy = this.el.querySelector('[slot="description"]') ? `${modalId}-description` : undefined;

    return (
      <Host>
        {this.open && (
          <div
            class={{
              'modal-overlay': true,
              'centered': this.centered,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={describedBy}
            onClick={this.onBackdropClick}
          >
            <div
              ref={(el) => (this.modalContent = el)}
              class={{
                'modal-content': true,
                [`size-${this.size}`]: true,
                'scrollable': this.scrollable,
              }}
            >
              <header class="modal-header">
                {this.modalTitle && (
                  <h2 id={titleId} class="modal-title">
                    {this.modalTitle}
                  </h2>
                )}
                {this.closable && (
                  <button
                    class="modal-close"
                    aria-label="Close modal"
                    onClick={this.onClose}
                  >
                    &times;
                  </button>
                )}
              </header>
              {describedBy && (
                <div id={describedBy} class="modal-description" hidden>
                  <slot name="description" />
                </div>
              )}
              <section class="modal-body">
                <slot />
              </section>
              <footer class="modal-footer">
                <slot name="footer" />
              </footer>
            </div>
          </div>
        )}
      </Host>
    );
  }
}
