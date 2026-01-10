import { Component, Prop, h, Event, EventEmitter, Element, State, Method, Listen } from '@stencil/core';

export type DropdownTrigger = 'hover' | 'click' | 'contextmenu';
export type DropdownPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';

@Component({
  tag: 'r-dropdown',
  styleUrl: 'r-dropdown.css',
  shadow: false,
})
export class RDropdown {
  @Element() el: HTMLElement;

  /** Trigger mode */
  @Prop() trigger: DropdownTrigger = 'hover';

  /** Dropdown placement */
  @Prop() placement: DropdownPlacement = 'bottom';

  /** Whether dropdown is disabled */
  @Prop() disabled: boolean = false;

  /** Whether to hide on click */
  @Prop() hideOnClick: boolean = true;

  /** Show timeout (ms) */
  @Prop() showTimeout: number = 150;

  /** Hide timeout (ms) */
  @Prop() hideTimeout: number = 150;

  /** Max height of dropdown menu */
  @Prop() maxHeight: string;

  /** Split button mode */
  @Prop() splitButton: boolean = false;

  /** Button type for split button */
  @Prop() type: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'default';

  /** Button size for split button */
  @Prop() size: 'large' | 'default' | 'small' = 'default';

  @State() visible: boolean = false;

  private showTimer: ReturnType<typeof setTimeout>;
  private hideTimer: ReturnType<typeof setTimeout>;

  @Event({ bubbles: true, composed: true }) command: EventEmitter<string | number>;
  @Event({ bubbles: true, composed: true }) visibleChange: EventEmitter<boolean>;
  @Event({ bubbles: true, composed: true }) click: EventEmitter<MouseEvent>;

  @Listen('click', { target: 'document' })
  handleDocumentClick(e: MouseEvent) {
    if (!this.el.contains(e.target as Node)) {
      this.hide();
    }
  }

  @Listen('itemClick')
  handleItemClick(e: CustomEvent<string | number>) {
    this.command.emit(e.detail);
    if (this.hideOnClick) {
      this.hide();
    }
  }

  /** Show dropdown */
  @Method()
  async show() {
    if (this.disabled) return;
    clearTimeout(this.hideTimer);
    this.showTimer = setTimeout(() => {
      this.visible = true;
      this.visibleChange.emit(true);
    }, this.showTimeout);
  }

  /** Hide dropdown */
  @Method()
  async hide() {
    clearTimeout(this.showTimer);
    this.hideTimer = setTimeout(() => {
      this.visible = false;
      this.visibleChange.emit(false);
    }, this.hideTimeout);
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

  private handleClick = (e: MouseEvent) => {
    if (this.trigger === 'click') {
      if (this.visible) {
        this.hide();
      } else {
        this.show();
      }
    }
    if (this.splitButton) {
      this.click.emit(e);
    }
  };

  private handleContextMenu = (e: MouseEvent) => {
    if (this.trigger === 'contextmenu') {
      e.preventDefault();
      this.show();
    }
  };

  private handleArrowClick = () => {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  };

  render() {
    const menuStyles: { [key: string]: string } = {};
    if (this.maxHeight) {
      menuStyles['max-height'] = this.maxHeight;
      menuStyles['overflow-y'] = 'auto';
    }

    return (
      <div
        class={{
          'r-dropdown': true,
          'r-dropdown--disabled': this.disabled,
          'r-dropdown--split': this.splitButton,
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onContextMenu={this.handleContextMenu}
      >
        {this.splitButton ? (
          <r-button-group>
            <r-button type={this.type} size={this.size} onClick={this.handleClick}>
              <slot></slot>
            </r-button>
            <r-button type={this.type} size={this.size} onClick={this.handleArrowClick}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </r-button>
          </r-button-group>
        ) : (
          <div class="r-dropdown__trigger" onClick={this.handleClick}>
            <slot></slot>
          </div>
        )}

        <div
          class={{
            'r-dropdown__menu': true,
            'r-dropdown__menu--visible': this.visible,
            [`r-dropdown__menu--${this.placement}`]: true,
          }}
          style={Object.keys(menuStyles).length > 0 ? menuStyles : undefined}
        >
          <slot name="dropdown"></slot>
        </div>
      </div>
    );
  }
}
