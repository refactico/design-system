import { Component, Prop, h, Element } from '@stencil/core';

export type CardShadow = 'always' | 'hover' | 'never';

@Component({
  tag: 'r-card',
  styleUrl: 'r-card.css',
  shadow: false,
})
export class RCard {
  @Element() el: HTMLElement;

  /** Title of the card */
  @Prop() header: string;

  /** Footer of the card */
  @Prop() footer: string;

  /** When to show card shadow */
  @Prop() shadow: CardShadow = 'always';

  /** Custom class name of card header */
  @Prop() headerClass: string = '';

  /** Custom class name of card body */
  @Prop() bodyClass: string = '';

  /** Custom class name of card footer */
  @Prop() footerClass: string = '';

  private hasSlot(name: string): boolean {
    return !!this.el.querySelector(`[slot="${name}"]`);
  }

  render() {
    const hasHeader = this.header || this.hasSlot('header');
    const hasFooter = this.footer || this.hasSlot('footer');

    return (
      <div class={`r-card r-card--shadow-${this.shadow}`}>
        {hasHeader && (
          <div class={`r-card__header ${this.headerClass}`}>
            <slot name="header">{this.header}</slot>
          </div>
        )}
        <div class={`r-card__body ${this.bodyClass}`}>
          <slot></slot>
        </div>
        {hasFooter && (
          <div class={`r-card__footer ${this.footerClass}`}>
            <slot name="footer">{this.footer}</slot>
          </div>
        )}
      </div>
    );
  }
}
