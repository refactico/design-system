import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  State,
  Watch,
  Method,
  Element,
  Listen,
} from '@stencil/core';

export type SelectSize = 'large' | 'default' | 'small';
export type TagType = 'success' | 'info' | 'warning' | 'danger';

export interface SelectOption {
  value: string | number | boolean;
  label: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface SelectOptionGroup {
  label: string;
  disabled?: boolean;
  options: SelectOption[];
}

export interface SelectProps {
  value?: string;
  label?: string;
  disabled?: string;
  options?: string;
}

@Component({
  tag: 'r-select',
  styleUrl: 'r-select.css',
  shadow: false,
})
export class RSelect {
  @Element() el: HTMLElement;

  /** Binding value (single or array for multiple) */
  @Prop({ mutable: true }) value: any = '';

  /** Whether multiple select is activated */
  @Prop() multiple: boolean = false;

  /** Data of the options */
  @Prop({ mutable: true }) options: (SelectOption | SelectOptionGroup)[] = [];

  /** Configuration for option keys */
  @Prop() props: SelectProps = {
    value: 'value',
    label: 'label',
    disabled: 'disabled',
    options: 'options',
  };

  /** Whether Select is disabled */
  @Prop() disabled: boolean = false;

  /** Unique identity key name for value when value is an object */
  @Prop() valueKey: string = 'value';

  /** Size of input */
  @Prop() size: SelectSize = 'default';

  /** Whether select can be cleared */
  @Prop() clearable: boolean = false;

  /** Whether to collapse tags when multiple */
  @Prop() collapseTags: boolean = false;

  /** Show all tags on hover when collapsed */
  @Prop() collapseTagsTooltip: boolean = false;

  /** Max tags to show when collapsed */
  @Prop() maxCollapseTags: number = 1;

  /** Maximum options user can select (0 = no limit) */
  @Prop() multipleLimit: number = 0;

  /** Placeholder text */
  @Prop() placeholder: string = 'Select';

  /** Whether Select is filterable */
  @Prop() filterable: boolean = false;

  /** Whether creating new items is allowed */
  @Prop() allowCreate: boolean = false;

  /** Whether options are loaded from server */
  @Prop() remote: boolean = false;

  /** Whether Select is loading data */
  @Prop() loading: boolean = false;

  /** Text while loading */
  @Prop() loadingText: string = 'Loading...';

  /** Text when no match */
  @Prop() noMatchText: string = 'No matching data';

  /** Text when no data */
  @Prop() noDataText: string = 'No data';

  /** Select first option on enter */
  @Prop() defaultFirstOption: boolean = false;

  /** Tag type for multiple select */
  @Prop() tagType: TagType = 'info';

  /** Dropdown visible state */
  @State() visible: boolean = false;

  /** Filter query */
  @State() query: string = '';

  /** Focused option index */
  @State() focusedIndex: number = -1;

  /** Hover state for clear button */
  @State() hovering: boolean = false;

  /** Created options (for allow-create) */
  @State() createdOptions: SelectOption[] = [];

  /** Cached flat filtered options for performance */
  @State() cachedFlatFilteredOptions: SelectOption[] = [];

  /** Unique ID for accessibility */
  private selectId = `r-select-${Math.random().toString(36).substr(2, 9)}`;

  private inputRef: HTMLRInputElement;

  @Event({ bubbles: true, composed: true }) change: EventEmitter<any>;
  @Event({ bubbles: true, composed: true }) visibleChange: EventEmitter<boolean>;
  @Event({ bubbles: true, composed: true }) removeTag: EventEmitter<any>;
  @Event({ bubbles: true, composed: true }) clear: EventEmitter<void>;

  @Watch('visible')
  visibleChanged(newVal: boolean) {
    this.visibleChange.emit(newVal);
    if (!newVal) {
      this.query = '';
      this.focusedIndex = -1;
    } else {
      // Update cached options when dropdown opens
      this.updateCachedFilteredOptions();
    }
  }

  @Watch('query')
  @Watch('options')
  @Watch('createdOptions')
  updateCachedFilteredOptions() {
    this.cachedFlatFilteredOptions = this.computeFlatFilteredOptions();
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(e: MouseEvent) {
    const target = e.target as Node;
    // Don't close if clicking inside the select or dropdown
    if (this.el.contains(target)) {
      return;
    }
    this.visible = false;
  }

  /** Focus the select */
  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.setFocus();
  }

  /** Blur the select */
  @Method()
  async setBlur(): Promise<void> {
    this.inputRef?.setBlur();
    this.visible = false;
  }

  private get flatOptions(): SelectOption[] {
    const flat: SelectOption[] = [];
    const valueKey = this.props.value || 'value';
    const labelKey = this.props.label || 'label';
    const disabledKey = this.props.disabled || 'disabled';
    const optionsKey = this.props.options || 'options';

    flat.push(...this.createdOptions);

    for (const opt of this.options) {
      if ((opt as SelectOptionGroup)[optionsKey]) {
        const group = opt as SelectOptionGroup;
        for (const child of group[optionsKey] || []) {
          flat.push({
            value: child[valueKey],
            label: child[labelKey],
            disabled: child[disabledKey] || group.disabled,
          });
        }
      } else {
        flat.push({
          value: (opt as SelectOption)[valueKey],
          label: (opt as SelectOption)[labelKey],
          disabled: (opt as SelectOption)[disabledKey],
        });
      }
    }
    return flat;
  }

  private get filteredOptions(): (SelectOption | SelectOptionGroup)[] {
    if (!this.filterable || !this.query) {
      return [...this.createdOptions.map((o) => ({ ...o })), ...this.options];
    }

    const query = this.query.toLowerCase();
    const labelKey = this.props.label || 'label';
    const optionsKey = this.props.options || 'options';

    const filtered: (SelectOption | SelectOptionGroup)[] = [];

    for (const opt of this.createdOptions) {
      if (opt.label.toLowerCase().includes(query)) {
        filtered.push(opt);
      }
    }

    for (const opt of this.options) {
      if ((opt as SelectOptionGroup)[optionsKey]) {
        const group = opt as SelectOptionGroup;
        const filteredChildren = (group[optionsKey] || []).filter((child: any) =>
          String(child[labelKey]).toLowerCase().includes(query)
        );
        if (filteredChildren.length > 0) {
          filtered.push({ ...group, [optionsKey]: filteredChildren });
        }
      } else {
        const option = opt as SelectOption;
        if (String(option[labelKey]).toLowerCase().includes(query)) {
          filtered.push(option);
        }
      }
    }

    return filtered;
  }

  private get selectedOptions(): SelectOption[] {
    if (this.multiple) {
      const values = Array.isArray(this.value) ? this.value : [];
      return values
        .map((v) => this.flatOptions.find((o) => o.value === v))
        .filter(Boolean) as SelectOption[];
    }
    const found = this.flatOptions.find((o) => o.value === this.value);
    return found ? [found] : [];
  }

  private get displayValue(): string {
    if (this.filterable && this.visible) {
      return this.query;
    }
    if (this.multiple) return '';
    const selected = this.selectedOptions[0];
    return selected ? selected.label : '';
  }

  private get inputPlaceholder(): string {
    if (this.multiple && this.selectedOptions.length > 0) {
      return '';
    }
    if (!this.multiple && this.selectedOptions.length > 0 && !this.visible) {
      return '';
    }
    return this.placeholder;
  }

  private get showClear(): boolean {
    return (
      this.clearable &&
      !this.disabled &&
      this.hovering &&
      (this.multiple
        ? (this.value as any[])?.length > 0
        : this.value !== '' && this.value !== null && this.value !== undefined)
    );
  }

  private handleTriggerClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled) return;
    
    // Simply open the dropdown on click
    this.visible = true;
    
    if (this.filterable) {
      setTimeout(() => this.inputRef?.setFocus(), 0);
    }
  };

  private handleOptionClick = (option: SelectOption) => {
    if (option.disabled) return;

    if (this.multiple) {
      const values = Array.isArray(this.value) ? [...this.value] : [];
      const index = values.indexOf(option.value);
      if (index > -1) {
        values.splice(index, 1);
        this.removeTag.emit(option.value);
      } else {
        if (this.multipleLimit > 0 && values.length >= this.multipleLimit) return;
        values.push(option.value);
      }
      this.value = values;
    } else {
      this.value = option.value;
      this.visible = false;
    }
    this.query = '';
    this.change.emit(this.value);
  };

  private handleClear = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    this.value = this.multiple ? [] : '';
    this.query = '';
    this.clear.emit();
    this.change.emit(this.value);
  };

  private handleRemoveTag = (e: Event, val: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (this.disabled) return;
    const values = Array.isArray(this.value) ? [...this.value] : [];
    const index = values.indexOf(val);
    if (index > -1) {
      values.splice(index, 1);
      this.value = values;
      this.removeTag.emit(val);
      this.change.emit(this.value);
    }
  };

  private handleInputEvent = (e: Event) => {
    e.stopPropagation();
    if (this.filterable) {
      const target = e.target as HTMLInputElement;
      this.query = target.value;
      if (!this.visible) {
        this.visible = true;
      }
    }
  };

  private handleInputFocus = (e: Event) => {
    e.stopPropagation();
    // Native focus event bubbles
  };

  private handleInputBlur = (e: Event) => {
    e.stopPropagation();
    // Native blur event bubbles
  };

  private handleKeydown = (e: KeyboardEvent) => {
    const flatFiltered = this.cachedFlatFilteredOptions;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.visible) {
          this.visible = true;
        } else {
          this.focusedIndex = Math.min(this.focusedIndex + 1, flatFiltered.length - 1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (!this.visible) {
          this.visible = true;
        } else if (this.focusedIndex >= 0 && flatFiltered[this.focusedIndex]) {
          this.handleOptionClick(flatFiltered[this.focusedIndex]);
        } else if (this.allowCreate && this.query) {
          this.createOption(this.query);
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.visible = false;
        break;
      case 'Tab':
        this.visible = false;
        break;
    }
  };

  /** Get the ID for a specific option */
  private getOptionId(index: number): string {
    return `${this.selectId}-option-${index}`;
  }

  /** Get the currently focused option ID for aria-activedescendant */
  private get focusedOptionId(): string | undefined {
    if (this.focusedIndex >= 0) {
      return this.getOptionId(this.focusedIndex);
    }
    return undefined;
  }

  private computeFlatFilteredOptions(): SelectOption[] {
    const flat: SelectOption[] = [];
    const optionsKey = this.props.options || 'options';
    const valueKey = this.props.value || 'value';
    const labelKey = this.props.label || 'label';
    const disabledKey = this.props.disabled || 'disabled';

    for (const opt of this.filteredOptions) {
      if ((opt as SelectOptionGroup)[optionsKey]) {
        const group = opt as SelectOptionGroup;
        for (const child of group[optionsKey] as any[]) {
          flat.push({
            value: child[valueKey],
            label: child[labelKey],
            disabled: child[disabledKey],
          });
        }
      } else {
        const option = opt as SelectOption;
        flat.push({
          value: option[valueKey],
          label: option[labelKey],
          disabled: option[disabledKey],
        });
      }
    }
    return flat;
  }

  componentWillLoad() {
    this.updateCachedFilteredOptions();
  }

  private createOption(label: string) {
    const newOption: SelectOption = { value: label, label };
    this.createdOptions = [...this.createdOptions, newOption];
    this.handleOptionClick(newOption);
  }

  private isSelected(value: any): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.includes(value);
    }
    return this.value === value;
  }

  private renderTags() {
    const selected = this.selectedOptions;
    if (selected.length === 0) return null;

    if (this.collapseTags && selected.length > this.maxCollapseTags) {
      const visible = selected.slice(0, this.maxCollapseTags);
      const hidden = selected.slice(this.maxCollapseTags);

      return (
        <div class="r-select__tags">
          {visible.map((opt) => (
            <span class={`r-select__tag r-select__tag--${this.tagType}`}>
              <span class="r-select__tag-text">{opt.label}</span>
              <span class="r-select__tag-close" onClick={(e) => this.handleRemoveTag(e, opt.value)}>
                ×
              </span>
            </span>
          ))}
          <span
            class={`r-select__tag r-select__tag--${this.tagType} r-select__tag--collapse`}
            title={hidden.map((o) => o.label).join(', ')}
          >
            +{hidden.length}
          </span>
        </div>
      );
    }

    return (
      <div class="r-select__tags">
        {selected.map((opt) => (
          <span class={`r-select__tag r-select__tag--${this.tagType}`}>
            <span class="r-select__tag-text">{opt.label}</span>
            <span class="r-select__tag-close" onClick={(e) => this.handleRemoveTag(e, opt.value)}>
              ×
            </span>
          </span>
        ))}
      </div>
    );
  }

  private renderOptions() {
    const optionsKey = this.props.options || 'options';
    const labelKey = this.props.label || 'label';
    const valueKey = this.props.value || 'value';
    const disabledKey = this.props.disabled || 'disabled';
    const flatFiltered = this.cachedFlatFilteredOptions;

    if (this.loading) {
      return <div class="r-select__loading">{this.loadingText}</div>;
    }

    if (flatFiltered.length === 0) {
      if (this.allowCreate && this.query) {
        return (
          <div class="r-select__create-option" onClick={() => this.createOption(this.query)}>
            Create "{this.query}"
          </div>
        );
      }
      return <div class="r-select__empty">{this.query ? this.noMatchText : this.noDataText}</div>;
    }

    let optionIndex = 0;

    return this.filteredOptions.map((opt) => {
      if ((opt as SelectOptionGroup)[optionsKey]) {
        const group = opt as SelectOptionGroup;
        return (
          <div class="r-select__group" role="group" aria-label={group[labelKey] || group.label}>
            <div class="r-select__group-label">{group[labelKey] || group.label}</div>
            {(group[optionsKey] as any[]).map((child) => {
              const idx = optionIndex++;
              const optionId = this.getOptionId(idx);
              return (
                <div
                  id={optionId}
                  role="option"
                  aria-selected={this.isSelected(child[valueKey]) ? 'true' : 'false'}
                  aria-disabled={child[disabledKey] ? 'true' : undefined}
                  class={{
                    'r-select__option': true,
                    'r-select__option--selected': this.isSelected(child[valueKey]),
                    'r-select__option--disabled': child[disabledKey],
                    'r-select__option--focused': this.focusedIndex === idx,
                  }}
                  onClick={() =>
                    this.handleOptionClick({
                      value: child[valueKey],
                      label: child[labelKey],
                      disabled: child[disabledKey],
                    })
                  }
                >
                  <span>{child[labelKey]}</span>
                  {this.isSelected(child[valueKey]) && <span class="r-select__option-check">✓</span>}
                </div>
              );
            })}
          </div>
        );
      } else {
        const option = opt as any;
        const idx = optionIndex++;
        const optionId = this.getOptionId(idx);
        return (
          <div
            id={optionId}
            role="option"
            aria-selected={this.isSelected(option[valueKey]) ? 'true' : 'false'}
            aria-disabled={option[disabledKey] ? 'true' : undefined}
            class={{
              'r-select__option': true,
              'r-select__option--selected': this.isSelected(option[valueKey]),
              'r-select__option--disabled': option[disabledKey],
              'r-select__option--focused': this.focusedIndex === idx,
            }}
            onClick={() =>
              this.handleOptionClick({
                value: option[valueKey],
                label: option[labelKey],
                disabled: option[disabledKey],
              })
            }
          >
            <span>{option[labelKey]}</span>
            {this.isSelected(option[valueKey]) && <span class="r-select__option-check">✓</span>}
          </div>
        );
      }
    });
  }

  private renderSuffixIcon() {
    if (this.showClear) {
      return (
        <span class="r-select__clear" onClick={this.handleClear}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </span>
      );
    }
    return (
      <span class={{ 'r-select__arrow': true, 'r-select__arrow--open': this.visible }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    );
  }

  render() {
    return (
      <div
        class={{
          'r-select': true,
          [`r-select--${this.size}`]: true,
          'r-select--disabled': this.disabled,
          'r-select--multiple': this.multiple,
          'r-select--open': this.visible,
        }}
        onMouseEnter={() => (this.hovering = true)}
        onMouseLeave={() => (this.hovering = false)}
        onKeyDown={this.handleKeydown}
      >
        <div
          class="r-select__trigger"
          role="combobox"
          aria-expanded={this.visible ? 'true' : 'false'}
          aria-haspopup="listbox"
          aria-controls={`${this.selectId}-listbox`}
          aria-activedescendant={this.visible ? this.focusedOptionId : undefined}
          onClick={this.handleTriggerClick}
        >
          {this.multiple && this.renderTags()}

          <r-input
            ref={(el) => (this.inputRef = el)}
            class="r-select__input"
            value={this.displayValue}
            placeholder={this.inputPlaceholder}
            disabled={this.disabled}
            readonly={!this.filterable}
            size={this.size}
            onInput={this.handleInputEvent}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          >
            <span slot="suffix" class="r-select__suffix">
              {this.renderSuffixIcon()}
            </span>
          </r-input>
        </div>

        {this.visible && (
          <div class="r-select__dropdown">
            <slot name="header"></slot>
            <div
              id={`${this.selectId}-listbox`}
              class="r-select__options"
              role="listbox"
              aria-multiselectable={this.multiple ? 'true' : undefined}
            >
              {this.renderOptions()}
            </div>
            <slot name="footer"></slot>
          </div>
        )}
      </div>
    );
  }
}
