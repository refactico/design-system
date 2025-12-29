import { Component, Host, h, Prop, Element, State, Method, Listen } from '@stencil/core';

/**
 * r-tooltip
 * Accessible tooltip component with multiple trigger options
 */
@Component({
  tag: 'r-tooltip',
  styleUrl: 'r-tooltip.css',
  shadow: true,
})
export class RTooltip {
  @Element() el: HTMLElement;

  @Prop() content?: string;
  @Prop() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Prop() delay: number = 300;
  @Prop() disabled: boolean = false;
  @Prop() trigger: 'hover' | 'focus' | 'click' | 'manual' = 'hover';
  @Prop() showArrow: boolean = true;
  @Prop() maxWidth: string = '200px';

  @State() isVisible: boolean = false;

  private showTimeout: number;
  private hideTimeout: number;
  private tooltipElement?: HTMLElement;

  /**
   * Programmatically show the tooltip
   */
  @Method()
  async show() {
    if (!this.disabled && this.content) {
      clearTimeout(this.hideTimeout);
      this.showTimeout = window.setTimeout(() => {
        this.isVisible = true;
        this.updatePosition();
      }, this.delay);
    }
  }

  /**
   * Programmatically hide the tooltip
   */
  @Method()
  async hide() {
    clearTimeout(this.showTimeout);
    this.hideTimeout = window.setTimeout(() => {
      this.isVisible = false;
    }, 150);
  }

  /**
   * Programmatically toggle the tooltip
   */
  @Method()
  async toggle() {
    if (this.isVisible) {
      await this.hide();
    } else {
      await this.show();
    }
  }

  private updatePosition() {
    if (!this.tooltipElement || !this.isVisible) return;

    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      const triggerSlot = this.el.querySelector('[slot="trigger"]');
      const trigger = triggerSlot ? triggerSlot.parentElement : this.el.firstElementChild as HTMLElement;
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = this.tooltipElement.getBoundingClientRect();
      const gap = 8;
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      let top = 0;
      let left = 0;

      switch (this.position) {
        case 'top':
          top = triggerRect.top + scrollY - tooltipRect.height - gap;
          left = triggerRect.left + scrollX + (triggerRect.width / 2);
          this.tooltipElement.style.transform = 'translateX(-50%) translateY(calc(-100% - 8px))';
          break;
        case 'bottom':
          top = triggerRect.bottom + scrollY + gap;
          left = triggerRect.left + scrollX + (triggerRect.width / 2);
          this.tooltipElement.style.transform = 'translateX(-50%) translateY(8px)';
          break;
        case 'left':
          top = triggerRect.top + scrollY + (triggerRect.height / 2);
          left = triggerRect.left + scrollX - tooltipRect.width - gap;
          this.tooltipElement.style.transform = 'translateX(calc(-100% - 8px)) translateY(-50%)';
          break;
        case 'right':
          top = triggerRect.top + scrollY + (triggerRect.height / 2);
          left = triggerRect.right + scrollX + gap;
          this.tooltipElement.style.transform = 'translateX(8px) translateY(-50%)';
          break;
      }

      // Keep tooltip within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (left < scrollX + gap) left = scrollX + gap;
      if (left + tooltipRect.width > scrollX + viewportWidth) left = scrollX + viewportWidth - tooltipRect.width - gap;
      if (top < scrollY + gap) top = scrollY + gap;
      if (top + tooltipRect.height > scrollY + viewportHeight) top = scrollY + viewportHeight - tooltipRect.height - gap;

      this.tooltipElement.style.top = `${top}px`;
      this.tooltipElement.style.left = `${left}px`;
      this.tooltipElement.style.opacity = '1';
    });
  }

  private handleMouseEnter = () => {
    if (this.disabled || this.trigger !== 'hover') return;
    this.show();
  };

  private handleMouseLeave = () => {
    if (this.trigger !== 'hover') return;
    this.hide();
  };

  private handleFocus = () => {
    if (this.disabled || (this.trigger !== 'focus' && this.trigger !== 'hover')) return;
    this.show();
  };

  private handleBlur = () => {
    if (this.trigger === 'focus' || this.trigger === 'hover') {
      this.hide();
    }
  };

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.trigger !== 'click') return;
    event.stopPropagation();
    this.toggle();
  };

  @Listen('click', { target: 'window' })
  handleOutsideClick(event: MouseEvent) {
    if (this.trigger === 'click' && this.isVisible && !this.el.contains(event.target as Node)) {
      this.hide();
    }
  }

  componentDidUpdate() {
    if (this.isVisible && this.tooltipElement) {
      this.updatePosition();
    }
  }

  componentDidLoad() {
    if (this.isVisible) {
      this.updatePosition();
    }
  }

  render() {
    const tooltipId = `r-tooltip-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <Host>
        <div
          class="tooltip-trigger"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          tabindex={this.disabled ? -1 : (this.trigger === 'focus' || this.trigger === 'click' ? 0 : -1)}
          aria-describedby={this.isVisible ? tooltipId : undefined}
        >
          <slot name="trigger">
            <slot></slot>
          </slot>
        </div>

        {this.isVisible && this.content && (
          <div
            ref={(el) => (this.tooltipElement = el)}
            id={tooltipId}
            class={{
              'tooltip-content': true,
              [`position-${this.position}`]: true,
              'has-arrow': this.showArrow,
            }}
            role="tooltip"
            style={{
              maxWidth: this.maxWidth,
            }}
          >
            {this.showArrow && <span class="tooltip-arrow" aria-hidden="true"></span>}
            <span class="tooltip-text">{this.content}</span>
          </div>
        )}
      </Host>
    );
  }
}
