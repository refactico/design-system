import {
  Component,
  Prop,
  h,
  Element,
  Event,
  EventEmitter,
  Method,
  State,
} from "@stencil/core";

export type ButtonType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type ButtonSize = "large" | "default" | "small";
export type ButtonNativeType = "button" | "submit" | "reset";

@Component({
  tag: "r-button",
  styleUrl: "r-button.css",
  shadow: false,
})
export class RButton {
  @Element() el: HTMLElement;

  /** Button size */
  @Prop() size: ButtonSize = "default";

  /** Button type (color theme) */
  @Prop() type: ButtonType = "default";

  /** Plain style (lighter background) */
  @Prop() plain: boolean = false;

  /** Text button (no background/border) */
  @Prop() text: boolean = false;

  /** Text button with background on hover */
  @Prop() bg: boolean = false;

  /** Link button style */
  @Prop() link: boolean = false;

  /** Round button */
  @Prop() round: boolean = false;

  /** Circle button (for icon-only) */
  @Prop() circle: boolean = false;

  /** Loading state */
  @Prop() loading: boolean = false;

  /** Custom loading icon (slot name or icon name) */
  @Prop() loadingIcon: string;

  /** Disabled state */
  @Prop() disabled: boolean = false;

  /** Icon (renders before text) */
  @Prop() icon: string;

  /** Native button autofocus */
  @Prop() autofocus: boolean = false;

  /** Native button type */
  @Prop() nativeType: ButtonNativeType = "button";

  /** Auto insert space between two Chinese characters */
  @Prop() autoInsertSpace: boolean = false;

  /** Custom button color */
  @Prop() color: string;

  /** Dark mode (auto-adjusts custom color) */
  @Prop() dark: boolean = false;

  /** Custom HTML tag */
  @Prop() tag: string = "button";

  /** Aria label for accessibility - renamed from ariaLabel to avoid collision with Element.ariaLabel */
  @Prop({ attribute: "aria-label" }) accessibleName: string;

  /** Internal state for space insertion */
  @State() shouldAddSpace: boolean = false;

  private buttonRef: HTMLElement;

  /** Expose button element ref */
  @Method()
  async getRef(): Promise<HTMLElement> {
    return this.buttonRef;
  }

  /** Expose size */
  @Method()
  async getSize(): Promise<ButtonSize> {
    return this.size;
  }

  /** Expose type */
  @Method()
  async getType(): Promise<ButtonType> {
    return this.type;
  }

  /** Expose disabled state */
  @Method()
  async getDisabled(): Promise<boolean> {
    return this.disabled;
  }

  /** Click event */
  @Event({ bubbles: true, composed: true }) clicked: EventEmitter<MouseEvent>;

  componentWillLoad() {
    this.checkAutoInsertSpace();
  }

  componentDidUpdate() {
    this.checkAutoInsertSpace();
  }

  private checkAutoInsertSpace() {
    if (!this.autoInsertSpace) {
      this.shouldAddSpace = false;
      return;
    }
    const defaultSlot = this.el.textContent?.trim() || "";
    // Check if exactly 2 Chinese characters
    const isTwoChineseChars = /^[\u4e00-\u9fa5]{2}$/.test(defaultSlot);
    this.shouldAddSpace = isTwoChineseChars;
  }

  private handleClick = (e: MouseEvent) => {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.clicked.emit(e);
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled || this.loading) return;

    // Simulate click on Enter or Space for non-button tags
    if (this.tag !== "button" && this.tag !== "a") {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.clicked.emit(e as any);
      }
    }
  };

  private getCustomColorStyles(): { [key: string]: string } | undefined {
    if (!this.color) return undefined;

    const color = this.color;

    // Calculate hover and active colors
    const hoverColor = this.adjustColor(color, this.dark ? 0.2 : -0.1);
    const activeColor = this.adjustColor(color, this.dark ? 0.3 : -0.2);
    const disabledColor = this.adjustColor(color, 0.4);

    if (this.plain) {
      return {
        "--r-button-custom-bg": this.adjustColor(color, 0.9),
        "--r-button-custom-text": color,
        "--r-button-custom-border": this.adjustColor(color, 0.5),
        "--r-button-custom-hover-bg": this.adjustColor(color, 0.8),
        "--r-button-custom-hover-text": color,
        "--r-button-custom-hover-border": color,
        "--r-button-custom-active-bg": this.adjustColor(color, 0.7),
      };
    }

    return {
      "--r-button-custom-bg": color,
      "--r-button-custom-text": "#ffffff",
      "--r-button-custom-border": color,
      "--r-button-custom-hover-bg": hoverColor,
      "--r-button-custom-hover-text": "#ffffff",
      "--r-button-custom-hover-border": hoverColor,
      "--r-button-custom-active-bg": activeColor,
      "--r-button-custom-disabled-bg": disabledColor,
      "--r-button-custom-disabled-border": disabledColor,
    };
  }

  private adjustColor(hex: string, amount: number): string {
    // Simple color adjustment - lighten (positive) or darken (negative)
    let color = hex.replace("#", "");
    if (color.length === 3) {
      color = color
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const num = parseInt(color, 16);
    let r = (num >> 16) + Math.round(255 * amount);
    let g = ((num >> 8) & 0x00ff) + Math.round(255 * amount);
    let b = (num & 0x0000ff) + Math.round(255 * amount);

    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }

  private renderLoadingIcon() {
    return (
      <span class="r-button__loading-icon">
        <svg class="r-button__loading-spinner" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            opacity="0.25"
          />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </span>
    );
  }

  render() {
    const Tag = this.tag as any;

    const classes = {
      "r-button": true,
      [`r-button--${this.type}`]: this.type !== "default",
      [`r-button--${this.size}`]: this.size !== "default",
      "r-button--plain": this.plain,
      "r-button--text": this.text,
      "r-button--text-bg": this.text && this.bg,
      "r-button--link": this.link,
      "r-button--round": this.round,
      "r-button--circle": this.circle,
      "r-button--loading": this.loading,
      "r-button--disabled": this.disabled,
      "r-button--custom-color": !!this.color,
      "r-button--has-space": this.shouldAddSpace,
    };

    const classString = Object.entries(classes)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(" ");

    const customStyles = this.getCustomColorStyles();

    const isNativeButton = this.tag === "button";
    const isLink = this.tag === "a";
    const isInteractive = !this.disabled && !this.loading;

    const buttonProps: any = {
      class: classString,
      style: customStyles,
      autofocus: this.autofocus,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      ref: (el: HTMLElement) => (this.buttonRef = el),
    };

    // Accessibility attributes
    if (this.accessibleName) {
      buttonProps["aria-label"] = this.accessibleName;
    }

    // Loading state
    if (this.loading) {
      buttonProps["aria-busy"] = "true";
      buttonProps["aria-label"] = this.accessibleName
        ? `${this.accessibleName} (Loading)`
        : "Loading";
    }

    if (isNativeButton) {
      buttonProps.type = this.nativeType;
      buttonProps.disabled = !isInteractive;
      buttonProps["aria-disabled"] = !isInteractive ? "true" : undefined;
      buttonProps.tabIndex = !isInteractive ? -1 : 0;
    } else if (isLink) {
      // For links
      buttonProps["aria-disabled"] = !isInteractive ? "true" : undefined;
      // Remove href if disabled to prevent navigation (common pattern) or handle in click
      if (this.disabled) {
        buttonProps.role = "link"; // explicit role sometimes helps
        buttonProps["aria-disabled"] = "true";
        buttonProps.tabIndex = -1;
      }
    } else {
      // For div/span/etc acting as button
      buttonProps.role = "button";
      buttonProps.tabIndex = isInteractive ? 0 : -1;
      buttonProps["aria-disabled"] = !isInteractive ? "true" : undefined;
    }

    return (
      <Tag {...buttonProps}>
        {this.loading && this.renderLoadingIcon()}
        {this.icon && !this.loading && (
          <span class="r-button__icon">
            <slot name="icon">{this.icon}</slot>
          </span>
        )}
        <span class="r-button__content">
          <slot></slot>
        </span>
      </Tag>
    );
  }
}
