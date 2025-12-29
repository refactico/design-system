import { Component, Prop, Event, EventEmitter, h, Host, State, Method, Element } from '@stencil/core';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

/**
 * r-select
 * Accessible select component with enhanced features
 */
@Component({
  tag: 'r-select',
  styleUrl: 'r-select.css',
  shadow: true,
})
export class RSelect {
  @Element() el!: HTMLElement;

  /** Options for the select (can be JSON string or array) */
  @Prop() options: SelectOption[] | string = [];

  /** Selected value */
  @Prop({ mutable: true }) value?: string;

  /** Label text */
  @Prop() label?: string;

  /** Placeholder (renders as disabled option) */
  @Prop() placeholder?: string;

  /** Size variant */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Disabled state */
  @Prop() disabled = false;

  /** Required */
  @Prop() required = false;

  /** Error state */
  @Prop() error = false;

  /** Error message (overrides helperText when error is true) */
  @Prop() errorMessage?: string;

  /** Helper text */
  @Prop() helperText?: string;

  /** Name (for form submission) */
  @Prop() name?: string;

  /** Select ID */
  @Prop() selectId?: string;

  /** Autofocus */
  @Prop() autofocus = false;

  @State() isFocused = false;

  /** Emit change event */
  @Event() rChange!: EventEmitter<string>;

  /** Emit focus event */
  @Event() rFocus!: EventEmitter<FocusEvent>;

  /** Emit blur event */
  @Event() rBlur!: EventEmitter<FocusEvent>;

  private selectElement?: HTMLSelectElement;
  private parsedOptionsCache: SelectOption[] = [];

  componentWillLoad() {
    this.parseOptions();
  }

  componentWillUpdate() {
    this.parseOptions();
  }

  componentDidUpdate() {
    // Update select value if it changed
    if (this.selectElement && this.value !== undefined) {
      this.selectElement.value = this.value || '';
    }
  }

  private parseOptions() {
    if (typeof this.options === 'string') {
      try {
        this.parsedOptionsCache = JSON.parse(this.options);
      } catch (e) {
        console.warn('r-select: Invalid options JSON', e);
        this.parsedOptionsCache = [];
      }
    } else {
      this.parsedOptionsCache = this.options || [];
    }
  }

  /**
   * Programmatically focus the select
   */
  @Method()
  async setFocus() {
    this.selectElement?.focus();
  }

  private onChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    this.rChange.emit(this.value);
  };

  private onFocus = (event: FocusEvent) => {
    this.isFocused = true;
    this.rFocus.emit(event);
  };

  private onBlur = (event: FocusEvent) => {
    this.isFocused = false;
    this.rBlur.emit(event);
  };

  private get displayHelperText() {
    if (this.error && this.errorMessage) {
      return this.errorMessage;
    }
    return this.helperText;
  }

  private get groupedOptions() {
    const groups = new Map<string, SelectOption[]>();
    const ungrouped: SelectOption[] = [];
    const options = this.parsedOptionsCache;

    options.forEach(opt => {
      if (opt.group) {
        if (!groups.has(opt.group)) {
          groups.set(opt.group, []);
        }
        groups.get(opt.group)!.push(opt);
      } else {
        ungrouped.push(opt);
      }
    });

    return { groups, ungrouped };
  }

  render() {
    const hasLabel = !!this.label;
    const hasHelper = !!this.displayHelperText;
    const selectId = this.selectId || `r-select-${Math.random().toString(36).substr(2, 9)}`;
    const { groups, ungrouped } = this.groupedOptions;

    return (
      <Host
        class={{
          'size-sm': this.size === 'sm',
          'size-md': this.size === 'md',
          'size-lg': this.size === 'lg',
          disabled: this.disabled,
          error: this.error,
          focused: this.isFocused,
        }}
      >
        <div class="select-container">
          {hasLabel && (
            <label class="select-label" htmlFor={selectId}>
              {this.label}
              {this.required && <span class="required">*</span>}
            </label>
          )}

          <div class="select-wrapper">
            <select
              ref={(el) => {
                this.selectElement = el;
                if (el && this.value !== undefined) {
                  el.value = this.value || '';
                }
              }}
              id={selectId}
              class="select"
              name={this.name}
              disabled={this.disabled}
              required={this.required}
              autofocus={this.autofocus}
              aria-invalid={this.error ? 'true' : 'false'}
              aria-describedby={hasHelper ? 'select-helper' : undefined}
              aria-required={this.required ? 'true' : 'false'}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            >
              {this.placeholder && (
                <option
                  value=""
                  disabled
                >
                  {this.placeholder}
                </option>
              )}

              {Array.from(groups.entries()).map(([groupName, groupOptions]) => (
                <optgroup key={groupName} label={groupName}>
                  {groupOptions.map(opt => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                    >
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))}

              {ungrouped.map(opt => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </option>
              ))}
            </select>

            <span class="chevron" aria-hidden="true">
              ▾
            </span>
          </div>

          {hasHelper && (
            <div
              id="select-helper"
              class={{
                'select-helper': true,
                'error': this.error,
              }}
            >
              {this.displayHelperText}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
