import { Component, Prop, h, Event, EventEmitter, State } from '@stencil/core';

export type AvatarSize = 'large' | 'default' | 'small' | number;
export type AvatarShape = 'circle' | 'square';
export type AvatarFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

@Component({
  tag: 'r-avatar',
  styleUrl: 'r-avatar.css',
  shadow: false,
})
export class RAvatar {
  /** Icon to display (when no image or slot content) */
  @Prop() icon: string;

  /** Avatar size - can be 'large', 'default', 'small' or a number (px) */
  @Prop() size: AvatarSize = 'default';

  /** Avatar shape */
  @Prop() shape: AvatarShape = 'circle';

  /** Image source URL */
  @Prop() src: string;

  /** Native srcset attribute for responsive images */
  @Prop() srcSet: string;

  /** Alt text for image */
  @Prop() alt: string = '';

  /** How the image fits its container */
  @Prop() fit: AvatarFit = 'cover';

  /** Track if image failed to load */
  @State() hasError: boolean = false;

  /** Emitted when image fails to load */
  @Event({ bubbles: true, composed: true }) error: EventEmitter<Event>;

  private handleImageError = (e: Event) => {
    this.hasError = true;
    this.error.emit(e);
  };

  private getSizeStyle(): { [key: string]: string } | undefined {
    if (typeof this.size === 'number') {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        fontSize: `${this.size / 2}px`,
      };
    }
    return undefined;
  }

  private renderContent() {
    // If src is provided and no error, show image
    if (this.src && !this.hasError) {
      return (
        <img
          src={this.src}
          srcset={this.srcSet}
          alt={this.alt}
          class="r-avatar__image"
          style={{ objectFit: this.fit }}
          onError={this.handleImageError}
        />
      );
    }

    // If icon is provided, show icon
    if (this.icon) {
      return <span class="r-avatar__icon">{this.icon}</span>;
    }

    // Otherwise show slot content (initials, custom content)
    return (
      <span class="r-avatar__text">
        <slot></slot>
      </span>
    );
  }

  render() {
    const classes = {
      'r-avatar': true,
      [`r-avatar--${this.shape}`]: true,
      [`r-avatar--${this.size}`]: typeof this.size === 'string',
    };

    const classString = Object.entries(classes)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');

    return (
      <span class={classString} style={this.getSizeStyle()}>
        {this.renderContent()}
      </span>
    );
  }
}
