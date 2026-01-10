import { Component, Prop, h, Event, EventEmitter, Element, State } from '@stencil/core';

export type AlertType = 'success' | 'warning' | 'error' | 'info';
export type AlertEffect = 'light' | 'dark';

@Component({
  tag: 'r-alert',
  styleUrl: 'r-alert.css',
  shadow: false,
})
export class RAlert {
  @Element() el: HTMLElement;

  /** Alert type */
  @Prop() type: AlertType = 'info';

  /** Alert title */
  @Prop() alertTitle: string;

  /** Alert description */
  @Prop() description: string;

  /** Whether alert can be closed */
  @Prop() closable: boolean = true;

  /** Custom close text */
  @Prop() closeText: string;

  /** Whether to show icon */
  @Prop() showIcon: boolean = true;

  /** Whether to center content */
  @Prop() center: boolean = false;

  /** Alert effect/theme */
  @Prop() effect: AlertEffect = 'light';

  @State() visible: boolean = true;
  @State() closing: boolean = false;

  @Event({ bubbles: true, composed: true }) close: EventEmitter<void>;

  private handleClose = () => {
    this.closing = true;
    setTimeout(() => {
      this.visible = false;
      this.close.emit();
    }, 200);
  };

  private renderIcon() {
    const icons: Record<AlertType, any> = {
      success: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      warning: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      error: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      ),
      info: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
    };
    return icons[this.type];
  }

  render() {
    if (!this.visible) return null;

    const hasDescription = !!this.description || !!this.el.querySelector('[slot="description"]');

    return (
      <div
        class={{
          'r-alert': true,
          [`r-alert--${this.type}`]: true,
          [`r-alert--${this.effect}`]: true,
          'r-alert--center': this.center,
          'r-alert--closing': this.closing,
          'r-alert--with-description': hasDescription,
          'r-alert--big-icon': hasDescription,
        }}
        role="alert"
      >
        {this.showIcon && <span class="r-alert__icon">{this.renderIcon()}</span>}

        <div class="r-alert__content">
          {this.alertTitle && <p class="r-alert__title">{this.alertTitle}</p>}
          <slot name="title"></slot>

          {this.description && <p class="r-alert__description">{this.description}</p>}
          <slot name="description"></slot>
          <slot></slot>
        </div>

        {this.closable && (
          <span class="r-alert__close" onClick={this.handleClose}>
            {this.closeText || (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            )}
          </span>
        )}
      </div>
    );
  }
}
