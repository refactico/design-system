import { Component, Prop, h, Element, State, Method } from '@stencil/core';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipEffect = 'dark' | 'light';
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

@Component({
  tag: 'r-tooltip',
  styleUrl: 'r-tooltip.css',
  shadow: false,
})
export class RTooltip {
  @Element() el: HTMLElement;

  /** Tooltip content */
  @Prop() content: string;

  /** Tooltip placement */
  @Prop() placement: TooltipPlacement = 'top';

  /** Tooltip effect/theme */
  @Prop() effect: TooltipEffect = 'dark';

  /** Whether tooltip is disabled */
  @Prop() disabled: boolean = false;

  /** Trigger mode */
  @Prop() trigger: TooltipTrigger = 'hover';

  /** Delay before showing (ms) */
  @Prop() showDelay: number = 0;

  /** Delay before hiding (ms) */
  @Prop() hideDelay: number = 200;

  /** Whether mouse can enter tooltip */
  @Prop() enterable: boolean = true;

  /** Show arrow */
  @Prop() showArrow: boolean = true;

  /** Raw content (allow HTML) - WARNING: Use with caution, may expose XSS vulnerabilities */
  @Prop() rawContent: boolean = false;

  /** Max width for wrapping */
  @Prop() maxWidth: number;

  @State() visible: boolean = false;

  private showTimeout: ReturnType<typeof setTimeout>;
  private hideTimeout: ReturnType<typeof setTimeout>;
  private tooltipId = `r-tooltip-${Math.random().toString(36).substr(2, 9)}`;

  /** Show tooltip programmatically */
  @Method()
  async show() {
    if (this.disabled) return;
    clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(() => {
      this.visible = true;
    }, this.showDelay);
  }

  /** Hide tooltip programmatically */
  @Method()
  async hide() {
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => {
      this.visible = false;
    }, this.hideDelay);
  }

  private handleMouseEnter = () => {
    if (this.trigger === 'hover') {
      this.show();
    }
  };

  private handleMouseLeave = () => {
    if (this.trigger === 'hover') {
      this.hide();
    }
  };

  private handleClick = () => {
    if (this.trigger === 'click') {
      this.visible = !this.visible;
    }
  };

  private handleFocus = () => {
    if (this.trigger === 'focus') {
      this.show();
    }
  };

  private handleBlur = () => {
    if (this.trigger === 'focus') {
      this.hide();
    }
  };

  private handleContentMouseEnter = () => {
    if (this.enterable && this.trigger === 'hover') {
      clearTimeout(this.hideTimeout);
    }
  };

  private handleContentMouseLeave = () => {
    if (this.trigger === 'hover') {
      this.hide();
    }
  };

  render() {
    const contentStyles: { [key: string]: string } = {};
    if (this.maxWidth) {
      contentStyles['max-width'] = `${this.maxWidth}px`;
    }

    return (
      <div
        class={{
          'r-tooltip': true,
          'r-tooltip--disabled': this.disabled,
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <span
          class="r-tooltip__trigger"
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          aria-describedby={this.visible ? this.tooltipId : undefined}
        >
          <slot></slot>
        </span>

        <div
          id={this.tooltipId}
          class={{
            'r-tooltip__content': true,
            'r-tooltip__content--visible': this.visible,
            [`r-tooltip__content--${this.placement}`]: true,
            [`r-tooltip__content--${this.effect}`]: true,
            'r-tooltip__content--enterable': this.enterable,
            'r-tooltip__content--wrap': !!this.maxWidth,
          }}
          style={Object.keys(contentStyles).length > 0 ? contentStyles : undefined}
          onMouseEnter={this.handleContentMouseEnter}
          onMouseLeave={this.handleContentMouseLeave}
          role="tooltip"
          aria-hidden={!this.visible}
        >
          {this.showArrow && <span class="r-tooltip__arrow"></span>}
          {this.rawContent ? <span innerHTML={this.content}></span> : this.content}
          <slot name="content"></slot>
        </div>
      </div>
    );
  }
}
