import { Component, Prop, h, Element, State } from "@stencil/core";
import { AvatarSize, AvatarShape } from "../r-avatar/r-avatar";

export type TooltipEffect = "dark" | "light";
export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

@Component({
  tag: "r-avatar-group",
  styleUrl: "r-avatar-group.css",
  shadow: false,
})
export class RAvatarGroup {
  @Element() el: HTMLElement;

  /** Control the size of avatars in this group */
  @Prop({ mutable: true }) size: AvatarSize = "default";

  /** Control the shape of avatars in this group */
  @Prop() shape: AvatarShape = "circle";

  /** Whether to collapse avatars */
  @Prop() collapseAvatars: boolean = false;

  /** Show tooltip with all collapsed avatars on hover */
  @Prop() collapseAvatarsTooltip: boolean = false;

  /** Max avatars to show before collapsing */
  @Prop() maxCollapseAvatars: number = 3;

  /** Tooltip theme */
  @Prop() effect: TooltipEffect = "light";

  /** Tooltip placement */
  @Prop() placement: TooltipPlacement = "top";

  /** Custom class for tooltip */
  @Prop() popperClass: string = "";

  /** Custom class for collapse avatar */
  @Prop() collapseClass: string = "";

  /** Track hover state for tooltip */
  @State() showTooltip: boolean = false;

  /** Store collapsed avatar info */
  @State() collapsedAvatars: Array<{ src?: string; text?: string }> = [];

  componentWillLoad() {
    // Convert string numeric size to number
    if (
      typeof this.size === "string" &&
      !isNaN(Number(this.size)) &&
      this.size !== "large" &&
      this.size !== "default" &&
      this.size !== "small"
    ) {
      this.size = Number(this.size) as AvatarSize;
    }
    this.processAvatars();
  }

  componentDidLoad() {
    // Re-process in case DOM wasn't ready
    // this.processAvatars();
  }

  private processAvatars() {
    if (!this.collapseAvatars) return;

    const avatars = this.el.querySelectorAll(
      "r-avatar"
    ) as NodeListOf<HTMLElement>;
    const total = avatars.length;

    if (total <= this.maxCollapseAvatars) return;

    // Store info about collapsed avatars for tooltip
    this.collapsedAvatars = [];
    avatars.forEach((avatar, index) => {
      if (index >= this.maxCollapseAvatars) {
        this.collapsedAvatars.push({
          src: avatar.getAttribute("src") || undefined,
          text: avatar.textContent?.trim() || undefined,
        });
        avatar.style.display = "none";
      }
    });
  }

  private getSizeStyle(): { [key: string]: string } | undefined {
    if (typeof this.size === "number") {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      };
    }
    return undefined;
  }

  private renderCollapseAvatar() {
    if (!this.collapseAvatars || this.collapsedAvatars.length === 0)
      return null;

    const count = this.collapsedAvatars.length;
    const sizeStyle = this.getSizeStyle();

    return (
      <div
        class={`r-avatar-group__collapse ${this.collapseClass}`}
        style={sizeStyle}
        onMouseEnter={() => (this.showTooltip = true)}
        onMouseLeave={() => (this.showTooltip = false)}
      >
        <span
          class={`r-avatar r-avatar--${this.shape} r-avatar--${
            typeof this.size === "string" ? this.size : "default"
          } r-avatar-group__collapse-avatar`}
          style={sizeStyle}
        >
          +{count}
        </span>

        {this.collapseAvatarsTooltip && this.showTooltip && (
          <div
            class={`r-avatar-group__tooltip r-avatar-group__tooltip--${this.effect} r-avatar-group__tooltip--${this.placement} ${this.popperClass}`}
          >
            <div class="r-avatar-group__tooltip-content">
              {this.collapsedAvatars.map((avatar) => (
                <span
                  class={`r-avatar r-avatar--${this.shape} r-avatar--small`}
                  title={avatar.text}
                >
                  {avatar.src ? (
                    <img
                      src={avatar.src}
                      class="r-avatar__image"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <span class="r-avatar__text">
                      {avatar.text?.charAt(0) || "?"}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    const classes = {
      "r-avatar-group": true,
      [`r-avatar-group--${this.size}`]: typeof this.size === "string",
    };

    const classString = Object.entries(classes)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(" ");

    return (
      <div class={classString}>
        <slot></slot>
        {this.renderCollapseAvatar()}
      </div>
    );
  }
}
