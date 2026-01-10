import { Component, Prop, h, Event, EventEmitter, Element, Watch, Method } from '@stencil/core';

@Component({
  tag: 'r-dialog',
  styleUrl: 'r-dialog.css',
  shadow: false,
})
export class RDialog {
  @Element() el: HTMLElement;

  /** Whether dialog is visible */
  @Prop({ mutable: true }) visible: boolean = false;

  /** Dialog title */
  @Prop() dialogTitle: string;

  /** Dialog width */
  @Prop() width: string = '500px';

  /** Whether dialog is fullscreen */
  @Prop() fullscreen: boolean = false;

  /** Whether to show close button */
  @Prop() showClose: boolean = true;

  /** Whether clicking overlay closes dialog */
  @Prop() closeOnClickOverlay: boolean = true;

  /** Whether pressing ESC closes dialog */
  @Prop() closeOnPressEscape: boolean = true;

  /** Whether to center dialog vertically */
  @Prop() center: boolean = false;

  /** Whether to align header/footer center */
  @Prop() alignCenter: boolean = false;

  /** Whether to destroy content on close */
  @Prop() destroyOnClose: boolean = false;

  /** Whether to append to body */
  @Prop() appendToBody: boolean = false;

  /** Whether to lock body scroll */
  @Prop() lockScroll: boolean = true;

  /** Custom class for dialog */
  @Prop() customClass: string;

  /** Whether dialog is draggable */
  @Prop() isDraggable: boolean = false;

  @Event({ bubbles: true, composed: true }) dialogOpen: EventEmitter<void>;
  @Event({ bubbles: true, composed: true }) dialogClose: EventEmitter<void>;
  @Event({ bubbles: true, composed: true }) dialogOpened: EventEmitter<void>;
  @Event({ bubbles: true, composed: true }) dialogClosed: EventEmitter<void>;

  private hasRendered: boolean = false;

  @Watch('visible')
  handleVisibleChange(newValue: boolean) {
    if (newValue) {
      this.hasRendered = true;
      this.dialogOpen.emit();
      if (this.lockScroll) {
        document.body.style.overflow = 'hidden';
      }
      if (this.closeOnPressEscape) {
        document.addEventListener('keydown', this.handleKeydown);
      }
      setTimeout(() => this.dialogOpened.emit(), 300);
    } else {
      this.dialogClose.emit();
      if (this.lockScroll) {
        document.body.style.overflow = '';
      }
      document.removeEventListener('keydown', this.handleKeydown);
      setTimeout(() => this.dialogClosed.emit(), 300);
    }
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeydown);
    if (this.lockScroll) {
      document.body.style.overflow = '';
    }
  }

  /** Open dialog */
  @Method()
  async open() {
    this.visible = true;
  }

  /** Close dialog */
  @Method()
  async close() {
    this.visible = false;
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.closeOnPressEscape) {
      this.visible = false;
    }
  };

  private handleOverlayClick = () => {
    if (this.closeOnClickOverlay) {
      this.visible = false;
    }
  };

  private handleCloseClick = () => {
    this.visible = false;
  };

  render() {
    if (this.destroyOnClose && !this.visible && !this.hasRendered) {
      return null;
    }

    const dialogStyles: { [key: string]: string } = {};
    if (!this.fullscreen && this.width) {
      dialogStyles['--r-dialog-width'] = this.width;
    }

    return (
      <div
        class={{
          'r-dialog-wrapper': true,
          'r-dialog-wrapper--visible': this.visible,
          'r-dialog-wrapper--center': this.center,
        }}
      >
        <div class="r-dialog__overlay" onClick={this.handleOverlayClick}></div>

        <div
          class={{
            'r-dialog': true,
            'r-dialog--fullscreen': this.fullscreen,
            'r-dialog--center': this.alignCenter,
            'r-dialog--draggable': this.isDraggable,
            [this.customClass || '']: !!this.customClass,
          }}
          style={dialogStyles}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <div class="r-dialog__header">
            <span class="r-dialog__title" id="dialog-title">
              <slot name="title">{this.dialogTitle}</slot>
            </span>
            {this.showClose && (
              <button class="r-dialog__close" onClick={this.handleCloseClick} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          <div class="r-dialog__body">
            <slot></slot>
          </div>

          <div class="r-dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    );
  }
}
