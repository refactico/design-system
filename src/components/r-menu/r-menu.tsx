import { Component, Prop, Event, EventEmitter, h, Host, State, Element, Listen, Method } from '@stencil/core';

export interface MenuItem {
  label: string;
  value: string;
  disabled?: boolean;
  divider?: boolean;
  icon?: string;
}

/**
 * r-menu
 * Accessible, flexible menu component with keyboard navigation
 */
@Component({
  tag: 'r-menu',
  styleUrl: 'r-menu.css',
  shadow: true,
})
export class RMenu {
  @Element() el!: HTMLElement;

  /** Menu items (can be JSON string or array) */
  @Prop() items: MenuItem[] | string = [];

  /** Menu label for accessibility */
  @Prop() label?: string;

  /** Disabled state */
  @Prop() disabled = false;

  /** Placement relative to trigger */
  @Prop() placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';

  @State() isOpen = false;
  @State() focused = false;
  @State() focusedIndex = -1;

  private menuList?: HTMLElement;
  private menuItems: HTMLElement[] = [];
  private parsedItemsCache: MenuItem[] = [];

  componentWillLoad() {
    this.parseItems();
  }

  componentWillUpdate() {
    this.parseItems();
  }

  private parseItems() {
    if (typeof this.items === 'string') {
      try {
        this.parsedItemsCache = JSON.parse(this.items);
      } catch (e) {
        console.warn('r-menu: Invalid items JSON', e);
        this.parsedItemsCache = [];
      }
    } else {
      this.parsedItemsCache = this.items || [];
    }
  }

  /** Emit select events */
  @Event() rSelect!: EventEmitter<string>;

  /** Fired on focus */
  @Event() rFocus!: EventEmitter<FocusEvent>;

  /** Fired on blur */
  @Event() rBlur!: EventEmitter<FocusEvent>;

  /**
   * Programmatically open the menu
   */
  @Method()
  async open() {
    if (!this.disabled) {
      this.isOpen = true;
      this.onFocus();
    }
  }

  /**
   * Programmatically close the menu
   */
  @Method()
  async close() {
    this.isOpen = false;
    this.focusedIndex = -1;
    this.onBlur();
  }

  /**
   * Programmatically toggle the menu
   */
  @Method()
  async toggle() {
    if (this.isOpen) {
      await this.close();
    } else {
      await this.open();
    }
  }

  private get enabledItems() {
    return this.parsedItemsCache.filter(item => !item.disabled && !item.divider);
  }

  private onSelect = (value: string) => {
    this.rSelect.emit(value);
    this.isOpen = false;
    this.focusedIndex = -1;
    this.onBlur();
  };

  private toggleOpen = () => {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.onFocus();
        setTimeout(() => {
          this.focusedIndex = 0;
          this.focusItem(0);
        }, 0);
      } else {
        this.focusedIndex = -1;
        this.onBlur();
      }
    }
  };

  private onFocus = () => {
    this.focused = true;
    const event = new FocusEvent('focus');
    this.rFocus.emit(event);
  };

  private onBlur = () => {
    this.focused = false;
    const event = new FocusEvent('blur');
    this.rBlur.emit(event);
  };

  private focusItem(index: number) {
    const enabled = this.enabledItems;
    if (index >= 0 && index < enabled.length && this.menuItems[index]) {
      this.menuItems[index].focus();
      this.focusedIndex = index;
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;

    switch (event.key) {
      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.isOpen = false;
          this.focusedIndex = -1;
          this.onBlur();
        }
        break;
      case 'Enter':
      case ' ':
        if (!this.isOpen) {
          event.preventDefault();
          this.toggleOpen();
        } else if (this.focusedIndex >= 0) {
          event.preventDefault();
          const enabled = this.enabledItems;
          if (enabled[this.focusedIndex]) {
            this.onSelect(enabled[this.focusedIndex].value);
          }
        }
        break;
      case 'ArrowDown':
        if (this.isOpen) {
          event.preventDefault();
          const enabled = this.enabledItems;
          const nextIndex = (this.focusedIndex + 1) % enabled.length;
          this.focusItem(nextIndex);
        } else {
          this.toggleOpen();
        }
        break;
      case 'ArrowUp':
        if (this.isOpen) {
          event.preventDefault();
          const enabled = this.enabledItems;
          const prevIndex = this.focusedIndex <= 0 ? enabled.length - 1 : this.focusedIndex - 1;
          this.focusItem(prevIndex);
        } else {
          this.toggleOpen();
        }
        break;
      case 'Home':
        if (this.isOpen) {
          event.preventDefault();
          this.focusItem(0);
        }
        break;
      case 'End':
        if (this.isOpen) {
          event.preventDefault();
          const enabled = this.enabledItems;
          this.focusItem(enabled.length - 1);
        }
        break;
    }
  };

  @Listen('click', { target: 'window' })
  handleOutsideClick(event: MouseEvent) {
    if (this.isOpen && !this.el.contains(event.target as Node)) {
      this.isOpen = false;
      this.focusedIndex = -1;
      this.onBlur();
    }
  }

  componentDidUpdate() {
    if (this.isOpen && this.menuList) {
      // Update menu items array
      this.menuItems = Array.from(
        this.menuList.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')
      ) as HTMLElement[];
    }
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'menu-container': true,
            'disabled': this.disabled,
            'focused': this.focused,
            'open': this.isOpen,
            [`placement-${this.placement}`]: true,
          }}
        >
          <button
            class="menu-trigger"
            aria-label={this.label || 'Menu'}
            aria-haspopup="menu"
            aria-expanded={this.isOpen ? 'true' : 'false'}
            disabled={this.disabled}
            onClick={this.toggleOpen}
            onKeyDown={this.handleKeyDown}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          >
            <slot name="trigger">Menu</slot>
          </button>
          {this.isOpen && (
            <ul
              ref={(el) => (this.menuList = el)}
              class="menu-list"
              role="menu"
            >
              {this.parsedItemsCache.map((item, index) => {
                if (item.divider) {
                  return <li key={index} class="menu-divider" role="separator" />;
                }
                const isEnabled = !item.disabled;
                const isFocused = this.focusedIndex === this.enabledItems.findIndex(i => i.value === item.value);
                return (
                  <li
                    key={item.value}
                    role="menuitem"
                    tabindex={isEnabled ? (isFocused ? 0 : -1) : undefined}
                    aria-disabled={item.disabled ? 'true' : 'false'}
                    class={{
                      'menu-item': true,
                      disabled: !!item.disabled,
                      focused: isFocused,
                    }}
                    onClick={() => isEnabled && this.onSelect(item.value)}
                    onMouseEnter={() => isEnabled && (this.focusedIndex = this.enabledItems.findIndex(i => i.value === item.value))}
                  >
                    {item.icon && <span class="menu-item-icon" aria-hidden="true">{item.icon}</span>}
                    <span class="menu-item-label">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Host>
    );
  }
}
