import { Component, Prop, h } from '@stencil/core';

export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  tag: 'r-badge',
  styleUrl: 'r-badge.css',
  shadow: false,
})
export class RBadge {
  /** Display value */
  @Prop() value: string | number = '';

  /** Maximum value, shows {max}+ when exceeded (only works if value is a number) */
  @Prop() max: number = 99;

  /** If a little dot is displayed instead of value */
  @Prop() isDot: boolean = false;

  /** Hidden badge */
  @Prop() hidden: boolean = false;

  /** Badge type */
  @Prop() type: BadgeType = 'danger';

  /** Whether to show badge when value is zero */
  @Prop() showZero: boolean = true;

  /** Background color of the badge */
  @Prop() color: string;

  /** Offset of badge [x, y] */
  @Prop() offset: [number, number];

  private getDisplayValue(): string {
    if (this.isDot) return '';

    if (typeof this.value === 'number') {
      if (this.value === 0 && !this.showZero) return '';
      return this.value > this.max ? `${this.max}+` : String(this.value);
    }

    return String(this.value);
  }

  private shouldShowBadge(): boolean {
    if (this.hidden) return false;
    if (this.isDot) return true;
    if (typeof this.value === 'number' && this.value === 0 && !this.showZero) return false;
    if (this.value === '' || this.value === undefined || this.value === null) return false;
    return true;
  }

  private getBadgeStyle(): { [key: string]: string } | undefined {
    const style: { [key: string]: string } = {};

    if (this.color) {
      style.backgroundColor = this.color;
    }

    if (this.offset && this.offset.length === 2) {
      style.marginTop = `${this.offset[1]}px`;
      style.marginRight = `${-this.offset[0]}px`;
    }

    return Object.keys(style).length > 0 ? style : undefined;
  }

  render() {
    const showBadge = this.shouldShowBadge();
    const displayValue = this.getDisplayValue();

    const badgeClasses = {
      'r-badge__content': true,
      [`r-badge__content--${this.type}`]: true,
      'r-badge__content--dot': this.isDot,
      'r-badge__content--fixed': true,
    };

    const badgeClassString = Object.entries(badgeClasses)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');

    return (
      <div class="r-badge">
        <slot></slot>
        {showBadge && (
          <sup class={badgeClassString} style={this.getBadgeStyle()}>
            <slot name="content">{displayValue}</slot>
          </sup>
        )}
      </div>
    );
  }
}
