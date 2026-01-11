import { Component, Prop, h, Event, EventEmitter, Element } from '@stencil/core';

export type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | '';
export type TagSize = 'large' | 'default' | 'small';
export type TagEffect = 'dark' | 'light' | 'plain';

@Component({
  tag: 'r-tag',
  styleUrl: 'r-tag.css',
  shadow: false,
})
export class RTag {
  @Element() el: HTMLElement;

  /** Tag type */
  @Prop() type: TagType = '';

  /** Tag size */
  @Prop() size: TagSize = 'default';

  /** Tag effect/theme */
  @Prop() effect: TagEffect = 'light';

  /** Whether tag can be closed */
  @Prop() closable: boolean = false;

  /** Whether tag has rounded corners */
  @Prop() round: boolean = false;

  /** Custom background color */
  @Prop() color: string;

  /** Disable transitions */
  @Prop() disableTransitions: boolean = false;

  @Event({ bubbles: true, composed: true }) close: EventEmitter<void>;

  private handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    this.close.emit();
  };

  render() {
    const customStyles: { [key: string]: string } = {};
    if (this.color) {
      customStyles['--r-tag-custom-color'] = this.color;
    }

    return (
      <span
        class={{
          'r-tag': true,
          [`r-tag--${this.type}`]: !!this.type,
          [`r-tag--${this.size}`]: this.size !== 'default',
          [`r-tag--${this.effect}`]: true,
          'r-tag--round': this.round,
          'r-tag--closable': this.closable,
          'r-tag--custom': !!this.color,
          'r-tag--no-transition': this.disableTransitions,
        }}
        style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
      >
        <span class="r-tag__content">
          <slot></slot>
        </span>
        {this.closable && (
          <span class="r-tag__close" onClick={this.handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        )}
      </span>
    );
  }
}
