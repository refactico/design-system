import { Component, Prop, h, Element, Watch } from '@stencil/core';

@Component({
  tag: 'r-loading',
  styleUrl: 'r-loading.css',
  shadow: false,
})
export class RLoading {
  @Element() el: HTMLElement;

  /** Whether loading is visible */
  @Prop() loading: boolean = false;

  /** Loading text */
  @Prop() text: string;

  /** Spinner size */
  @Prop() spinnerSize: 'small' | 'default' | 'large' = 'default';

  /** Whether to show fullscreen */
  @Prop() fullscreen: boolean = false;

  /** Whether to lock body scroll */
  @Prop() lock: boolean = true;

  /** Background style */
  @Prop() background: 'light' | 'dark' = 'light';

  /** Custom background color */
  @Prop() customBackground: string;

  @Watch('loading')
  handleLoadingChange(newValue: boolean) {
    if (this.fullscreen && this.lock) {
      if (newValue) {
        document.body.classList.add('r-loading-lock');
      } else {
        document.body.classList.remove('r-loading-lock');
      }
    }
  }

  disconnectedCallback() {
    document.body.classList.remove('r-loading-lock');
  }

  render() {
    const maskStyles: { [key: string]: string } = {};
    if (this.customBackground) {
      maskStyles['background-color'] = this.customBackground;
    }

    return (
      <div class="r-loading">
        <slot></slot>

        <div
          class={{
            'r-loading__mask': true,
            'r-loading__mask--visible': this.loading,
            'r-loading__mask--fullscreen': this.fullscreen,
            'r-loading__mask--dark': this.background === 'dark',
          }}
          style={Object.keys(maskStyles).length > 0 ? maskStyles : undefined}
        >
          <r-spinner
            size={this.spinnerSize}
            color={this.background === 'dark' ? 'white' : 'primary'}
          ></r-spinner>
          {this.text && <span class="r-loading__text">{this.text}</span>}
        </div>
      </div>
    );
  }
}
