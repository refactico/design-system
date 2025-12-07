import { Component, Prop, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';

@Component({
  tag: 'r-title',
  styleUrl: 'r-title.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RTitle {
  @Prop({ reflect: true }) size?: 'large' | 'small';
  /**
   * The title text
   */
  @Prop() text?: string;

  private getTextStyle(): any {
    const styles: any = {};
    
    if (this.size === 'large') {
      styles['font-size'] = '36px';
      styles['font-weight'] = '700';
      styles['line-height'] = '1.2';
    } else if (this.size === 'small') {
      styles['font-size'] = '12px';
      styles['font-weight'] = '500';
      styles['line-height'] = '1.3';
    } else {
      styles['font-size'] = '20px';
      styles['font-weight'] = '600';
      styles['line-height'] = '1.25';
    }
    
    return styles;
  }

  render() {
    const titleProps: any = {
      size: this.size,
    };

    // Remove undefined props
    Object.keys(titleProps).forEach(key => {
      if (titleProps[key] === undefined) {
        delete titleProps[key];
      }
    });

    const textContent = this.text ? this.text : <slot></slot>;
    const textStyle = this.getTextStyle();

    return (
      <ion-title {...titleProps}>
        <span style={textStyle} class="r-title-text">
          {textContent}
        </span>
      </ion-title>
    );
  }
}

