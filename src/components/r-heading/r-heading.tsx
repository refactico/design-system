import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor } from '../../utils';

@Component({
  tag: 'r-heading',
  styleUrl: 'r-heading.css',
  shadow: false,
})
export class RHeading {
  /**
   * The heading text
   */
  @Prop() text?: string;

  /**
   * The heading level (1-6, default: 2)
   */
  @Prop() level: number = 2;

  /**
   * The heading color (Ionic color)
   */
  @Prop() color?: IonicColor;

  render() {
    const HeadingTag = `h${Math.min(Math.max(this.level, 1), 6)}` as keyof JSX.IntrinsicElements;
    const headingProps = removeUndefinedProps({
      class: {
        'r-heading': true,
        [`r-heading-level-${this.level}`]: true,
        [`color-${this.color}`]: this.color ? true : false,
      },
    });

    const textContent = this.text || <slot></slot>;

    return (
      <HeadingTag {...headingProps}>
        {textContent}
      </HeadingTag>
    );
  }
}

