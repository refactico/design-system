import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element,
  State,
  Watch,
} from "@stencil/core";

export type TabsType = "line" | "card" | "border-card";
export type TabsPosition = "top" | "bottom" | "left" | "right";

@Component({
  tag: "r-tabs",
  styleUrl: "r-tabs.css",
  shadow: false,
})
export class RTabs {
  @Element() el: HTMLElement;

  /** Currently active tab */
  @Prop({ mutable: true }) value: string;

  /** Tab type */
  @Prop() type: TabsType = "line";

  /** Tab position */
  @Prop() tabPosition: TabsPosition = "top";

  /** Whether tabs stretch to fill container */
  @Prop() stretch: boolean = false;

  /** Whether tabs can be closed */
  @Prop() closable: boolean = false;

  /** Whether tabs can be added */
  @Prop() addable: boolean = false;

  @State() activeBarStyle: { [key: string]: string } = {};
  @State() tabs: {
    name: string;
    label: string;
    disabled: boolean;
    closable: boolean;
  }[] = [];
  @State() internalValue: string;

  @Event({ bubbles: true, composed: true }) tabChange: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) tabRemove: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) tabAdd: EventEmitter<void>;

  componentWillLoad() {
    this.internalValue = this.value;
    this.collectTabs();
  }

  componentDidLoad() {
    this.updateActiveBar();
  }

  @Watch("value")
  handleValueChange(newValue: string) {
    this.internalValue = newValue;
    this.updatePanes();
    this.updateActiveBar();
  }

  private collectTabs() {
    const panes = this.el.querySelectorAll("r-tab-pane");
    this.tabs = Array.from(panes).map(
      (
        pane: HTMLElement & {
          name: string;
          label: string;
          disabled: boolean;
          closable: boolean;
        }
      ) => ({
        name: pane.getAttribute("name") || "",
        label: pane.getAttribute("label") || "",
        disabled: pane.hasAttribute("disabled"),
        closable: pane.hasAttribute("closable") || this.closable,
      })
    );

    // Set first tab as active if no value
    if (!this.internalValue && this.tabs.length > 0) {
      this.internalValue = this.tabs[0].name;
      this.value = this.internalValue;
    }

    this.updatePanes();
  }

  private updatePanes() {
    const panes = this.el.querySelectorAll("r-tab-pane");
    panes.forEach((pane: HTMLElement & { active: boolean; name: string }) => {
      pane.active = pane.getAttribute("name") === this.internalValue;
    });
  }

  private updateActiveBar() {
    if (this.type !== "line") return;

    requestAnimationFrame(() => {
      const activeTab = this.el.querySelector(
        `.r-tab-item--active`
      ) as HTMLElement;
      if (!activeTab) return;

      const isVertical =
        this.tabPosition === "left" || this.tabPosition === "right";

      if (isVertical) {
        this.activeBarStyle = {
          height: `${activeTab.offsetHeight}px`,
          transform: `translateY(${activeTab.offsetTop}px)`,
        };
      } else {
        this.activeBarStyle = {
          width: `${activeTab.offsetWidth}px`,
          transform: `translateX(${activeTab.offsetLeft}px)`,
        };
      }
    });
  }

  private setActiveTab(name: string, emit = true) {
    const target = this.tabs.find((tab) => tab.name === name && !tab.disabled);
    if (!target) return;

    this.internalValue = target.name;
    this.value = target.name;

    if (emit) {
      this.tabChange.emit(target.name);
    }

    this.updatePanes();
    this.updateActiveBar();

    const targetEl = this.el.querySelector(
      `r-tab-item[name="${target.name}"]`
    ) as HTMLElement;
    targetEl?.focus();
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const enabledTabs = this.tabs.filter((tab) => !tab.disabled);
    if (enabledTabs.length === 0) return;

    const currentIndex = enabledTabs.findIndex(
      (tab) => tab.name === this.internalValue
    );

    let nextIndex = currentIndex;
    const horizontal =
      this.tabPosition === "top" || this.tabPosition === "bottom";

    switch (event.key) {
      case "ArrowRight":
        if (!horizontal) break;
        nextIndex =
          (currentIndex + 1 + enabledTabs.length) % enabledTabs.length;
        break;
      case "ArrowLeft":
        if (!horizontal) break;
        nextIndex =
          (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
        break;
      case "ArrowDown":
        if (horizontal) break;
        nextIndex =
          (currentIndex + 1 + enabledTabs.length) % enabledTabs.length;
        break;
      case "ArrowUp":
        if (horizontal) break;
        nextIndex =
          (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = enabledTabs.length - 1;
        break;
      case "Enter":
      case " ":
        // Space/Enter on a focused tab should activate it
        if (currentIndex >= 0) {
          this.setActiveTab(enabledTabs[currentIndex].name, true);
          event.preventDefault();
        }
        return;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      this.setActiveTab(enabledTabs[nextIndex].name, true);
    }
  };

  private handleTabClick = (name: string, disabled: boolean) => {
    if (disabled) return;
    this.setActiveTab(name, true);
  };

  private handleTabRemove = (e: MouseEvent, name: string) => {
    e.stopPropagation();
    this.tabRemove.emit(name);
  };

  private handleTabAdd = () => {
    this.tabAdd.emit();
  };

  render() {
    return (
      <div
        class={{
          "r-tabs": true,
          [`r-tabs--${this.type}`]: true,
          [`r-tabs--${this.tabPosition}`]: true,
          "r-tabs--stretch": this.stretch,
        }}
      >
        <div class="r-tabs__header">
          <div class="r-tabs__nav-wrap">
            <div
              class="r-tabs__nav"
              role="tablist"
              aria-orientation={
                this.tabPosition === "left" || this.tabPosition === "right"
                  ? "vertical"
                  : "horizontal"
              }
              onKeyDown={this.handleKeyDown}
            >
              {this.tabs.map((tab) => (
                <r-tab-item
                  name={tab.name}
                  label={tab.label}
                  active={this.internalValue === tab.name}
                  disabled={tab.disabled}
                  closable={tab.closable}
                  type={this.type}
                  onClick={() => this.handleTabClick(tab.name, tab.disabled)}
                  onClose={(e: CustomEvent) =>
                    this.handleTabRemove(e.detail, tab.name)
                  }
                ></r-tab-item>
              ))}
              {this.type === "line" && (
                <div
                  class="r-tabs__active-bar"
                  style={this.activeBarStyle}
                ></div>
              )}
            </div>
          </div>

          {this.addable && (
            <div class="r-tabs__extra">
              <r-button size="small" onClick={this.handleTabAdd}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </r-button>
            </div>
          )}

          <slot name="extra"></slot>
        </div>

        <div class="r-tabs__content">
          <slot></slot>
        </div>
      </div>
    );
  }
}
