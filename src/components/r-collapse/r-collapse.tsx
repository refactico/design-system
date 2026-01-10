import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Watch,
  Method,
  State,
  Listen,
  Element,
} from '@stencil/core';

export type ExpandIconPosition = 'left' | 'right';

@Component({
  tag: 'r-collapse',
  styleUrl: 'r-collapse.css',
  shadow: false,
})
export class RCollapse {
  @Element() el: HTMLElement;

  /** Currently active panel names */
  @Prop({ mutable: true }) value: string | string[] = [];

  /** Whether to activate accordion mode (only one panel open at a time) */
  @Prop() accordion: boolean = false;

  /** Set expand icon position */
  @Prop() expandIconPosition: ExpandIconPosition = 'right';

  /** Track active names internally */
  @State() activeNames: string[] = [];

  /** Emitted when active panels change */
  @Event({ bubbles: true, composed: true }) change: EventEmitter<string | string[]>;

  componentWillLoad() {
    this.syncActiveNames();
  }

  componentDidLoad() {
    this.updateChildItems();
  }

  @Watch('value')
  valueChanged() {
    this.syncActiveNames();
  }

  @Watch('activeNames')
  activeNamesChanged() {
    this.updateChildItems();
  }

  private syncActiveNames() {
    if (Array.isArray(this.value)) {
      this.activeNames = [...this.value];
    } else if (this.value) {
      this.activeNames = [this.value];
    } else {
      this.activeNames = [];
    }
  }

  private updateChildItems() {
    const items = this.el.querySelectorAll('r-collapse-item');
    items.forEach((item: any) => {
      if (item.setActive) {
        const name = item.getAttribute('name');
        item.setActive(this.activeNames.includes(name));
      }
    });
  }

  /** Get currently active panel names */
  @Method()
  async getActiveNames(): Promise<string[]> {
    return this.activeNames;
  }

  /** Set active panel names */
  @Method()
  async setActiveNames(names: string | string[]): Promise<void> {
    if (Array.isArray(names)) {
      this.activeNames = [...names];
    } else {
      this.activeNames = [names];
    }
    this.emitChange();
  }

  @Listen('itemToggle')
  handleItemToggle(event: CustomEvent<string>) {
    const name = event.detail;
    event.stopPropagation();

    if (this.accordion) {
      if (this.activeNames.includes(name)) {
        this.activeNames = [];
      } else {
        this.activeNames = [name];
      }
    } else {
      if (this.activeNames.includes(name)) {
        this.activeNames = this.activeNames.filter((n) => n !== name);
      } else {
        this.activeNames = [...this.activeNames, name];
      }
    }
    this.emitChange();
  }

  private emitChange() {
    const value = this.accordion ? this.activeNames[0] || '' : this.activeNames;
    this.value = value;
    this.change.emit(value);
  }

  render() {
    return (
      <div class={`r-collapse r-collapse--icon-${this.expandIconPosition}`}>
        <slot></slot>
      </div>
    );
  }
}
