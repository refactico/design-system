import { Component, Prop, Event, EventEmitter, Watch, State, h, Element } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor, FillStyle } from '../../utils';
import { buildFormFieldProps, getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-currency-input',
  styleUrl: 'r-currency-input.css',
  shadow: false,
})
export class RCurrencyInput {
  /**
   * The currency value (number)
   */
  @Prop({ mutable: true }) value?: number;

  /**
   * ISO currency code (e.g., "USD", "EUR", "GBP")
   */
  @Prop() currencyCode: string = 'USD';

  /**
   * Number of decimal places (default: 2)
   * Set to 0 for currencies without decimals (e.g., JPY)
   * Set to higher values for more precision (e.g., 3 for some cryptocurrencies)
   * The input will enforce this limit during typing
   */
  @Prop() precision: number = 2;

  /**
   * If true, allows decimal values (default: true)
   */
  @Prop() allowDecimals: boolean = true;

  /**
   * If true, allows negative values (default: true)
   */
  @Prop() allowNegativeValue: boolean = true;

  /**
   * Character used as decimal separator (default: based on locale)
   */
  @Prop() decimalSeparator?: string;

  /**
   * Character used as thousands/group separator (default: based on locale)
   */
  @Prop() groupSeparator?: string;

  /**
   * If true, disables automatic insertion of group separators
   */
  @Prop() turnOffSeparators: boolean = false;

  /**
   * If true, ensures the value always has a fixed number of decimal places
   */
  @Prop() fixedDecimalLength: boolean = false;

  /**
   * The currency input label
   */
  @Prop() label?: string;

  /**
   * Placeholder text
   */
  @Prop() placeholder?: string;

  /**
   * Minimum value
   */
  @Prop() min?: number;

  /**
   * Maximum value
   */
  @Prop() max?: number;

  /**
   * If true, the currency input is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the currency input is readonly
   */
  @Prop() readonly: boolean = false;

  /**
   * If true, the currency input is required
   */
  @Prop() required: boolean = false;

  /**
   * The currency input name (for form submission)
   */
  @Prop() name?: string;

  /**
   * The currency input color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The fill style
   */
  @Prop() fill?: FillStyle;

  /**
   * The shape
   */
  @Prop() shape?: 'round';

  /**
   * If true, the currency input has error state
   */
  @Prop() error: boolean = false;

  /**
   * Error message to display
   */
  @Prop() errorText?: string;

  /**
   * Helper text to display
   */
  @Prop() helperText?: string;

  /**
   * Locale for formatting (e.g., "en-US", "en-GB")
   */
  @Prop() locale?: string;

  @Element() el!: HTMLElement;

  @State() displayValue: string = '';
  @State() isFocused: boolean = false;

  /**
   * Emitted when the currency input value changes
   */
  @Event() rInput: EventEmitter<CustomEvent<number>>;

  /**
   * Emitted when the currency input receives focus
   */
  @Event() rFocus: EventEmitter<FocusEvent>;

  /**
   * Emitted when the currency input loses focus
   */
  @Event() rBlur: EventEmitter<FocusEvent>;

  /**
   * Emitted when the currency input value changes (alias for rInput)
   */
  @Event() rChange: EventEmitter<CustomEvent<number>>;

  private getLocaleInfo() {
    const locale = this.locale || 'en-US';
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currencyCode,
      minimumFractionDigits: this.precision,
      maximumFractionDigits: this.precision,
    });
    
    // Get decimal and group separators from formatted number
    const parts = formatter.formatToParts(1234.56);
    const decimalSeparator = this.decimalSeparator || parts.find(p => p.type === 'decimal')?.value || '.';
    const groupSeparator = this.groupSeparator || parts.find(p => p.type === 'group')?.value || ',';
    
    return { decimalSeparator, groupSeparator, locale };
  }

  private formatCurrency(value: number | undefined): string {
    if (value === undefined || value === null || isNaN(value)) {
      return '';
    }

    try {
      const localeInfo = this.getLocaleInfo();
      const formatter = new Intl.NumberFormat(localeInfo.locale, {
        style: 'currency',
        currency: this.currencyCode,
        minimumFractionDigits: this.fixedDecimalLength ? this.precision : 0,
        maximumFractionDigits: this.precision,
      });
      
      let formatted = formatter.format(value);
      
      // If separators are turned off, remove them
      if (this.turnOffSeparators) {
        formatted = formatted.replace(new RegExp(`\\${localeInfo.groupSeparator}`, 'g'), '');
      }
      
      return formatted;
    } catch (error) {
      // Fallback formatting if Intl.NumberFormat fails
      return `${this.currencyCode} ${value.toFixed(this.precision)}`;
    }
  }

  private parseCurrency(value: string): number | undefined {
    if (!value || value.trim() === '') {
      return undefined;
    }

    const { decimalSeparator, groupSeparator } = this.getLocaleInfo();
    
    // Remove currency symbols, spaces, and group separators
    let cleaned = value
      .replace(/[^\d.,-]/g, '') // Remove all non-numeric except digits, dots, commas, minus
      .replace(new RegExp(`\\${groupSeparator}`, 'g'), ''); // Remove group separators
    
    // Normalize decimal separator to dot
    if (decimalSeparator !== '.') {
      cleaned = cleaned.replace(new RegExp(`\\${decimalSeparator}`, 'g'), '.');
    }
    
    // Remove any remaining commas (fallback)
    cleaned = cleaned.replace(/,/g, '');

    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? undefined : parsed;
  }

  private formatNumberForInput(value: number | undefined): string {
    if (value === undefined || value === null || isNaN(value)) {
      return '';
    }

    const { decimalSeparator } = this.getLocaleInfo();
    
    if (this.precision > 0 && this.allowDecimals) {
      const fixed = this.fixedDecimalLength 
        ? value.toFixed(this.precision)
        : value.toString();
      return fixed.replace('.', decimalSeparator);
    } else {
      return Math.round(value).toString();
    }
  }

  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    let inputValue = input.value;
    
    // Get locale-specific separators
    const localeInfo = this.getLocaleInfo();
    const { decimalSeparator, groupSeparator } = localeInfo;
    
    // Remove all non-numeric characters except decimal separator and minus
    const escapedDecimal = decimalSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const allowedChars = new RegExp(`[^\\d\\${escapedDecimal}-]`, 'g');
    inputValue = inputValue.replace(allowedChars, '');
    
    // Remove group separators if they exist (user might paste formatted value)
    if (!this.turnOffSeparators) {
      inputValue = inputValue.replace(new RegExp(`\\${groupSeparator}`, 'g'), '');
    }
    
    // Ensure only one decimal separator
    const parts = inputValue.split(decimalSeparator);
    if (parts.length > 2) {
      inputValue = parts[0] + decimalSeparator + parts.slice(1).join('');
    }
    
    // Handle negative sign - only at the start
    if (!this.allowNegativeValue) {
      inputValue = inputValue.replace(/-/g, '');
    } else {
      if (inputValue.includes('-') && !inputValue.startsWith('-')) {
        inputValue = inputValue.replace(/-/g, '');
      }
    }
    
    // Handle decimals
    if (!this.allowDecimals || this.precision <= 0) {
      // Remove decimal separator if decimals not allowed
      inputValue = inputValue.replace(new RegExp(`\\${decimalSeparator}`, 'g'), '');
    } else {
      // Limit decimal places
      const decimalIndex = inputValue.indexOf(decimalSeparator);
      if (decimalIndex !== -1) {
        const integerPart = inputValue.substring(0, decimalIndex);
        let decimalPart = inputValue.substring(decimalIndex + 1);
        
        // Limit decimal part to precision
        if (decimalPart.length > this.precision) {
          decimalPart = decimalPart.substring(0, this.precision);
        }
        
        inputValue = integerPart + decimalSeparator + decimalPart;
      }
    }
    
    // Update display value (raw number while typing)
    this.displayValue = inputValue;

    // Parse the input value to a number
    const numericValue = this.parseCurrency(inputValue);
    
    // Apply min/max constraints
    let constrainedValue = numericValue;
    if (constrainedValue !== undefined) {
      if (this.min !== undefined && constrainedValue < this.min) {
        constrainedValue = this.min;
      }
      if (this.max !== undefined && constrainedValue > this.max) {
        constrainedValue = this.max;
      }
    }
    
    this.value = constrainedValue;

    // Emit events
    this.rInput.emit(new CustomEvent('rInput', { detail: constrainedValue }));
    this.rChange.emit(new CustomEvent('rChange', { detail: constrainedValue }));
  };

  private handleFocus = (event: FocusEvent) => {
    this.isFocused = true;
    // Show raw numeric value when focused for easier editing
    if (this.value !== undefined && !isNaN(this.value)) {
      this.displayValue = this.formatNumberForInput(this.value);
      requestAnimationFrame(() => {
        const ionInput = this.el.querySelector('ion-input') as any;
        if (ionInput) {
          ionInput.value = this.displayValue;
        }
      });
    } else {
      this.displayValue = '';
    }
    this.rFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.isFocused = false;
    // Format the value when blurring
    if (this.value !== undefined && !isNaN(this.value)) {
      this.displayValue = this.formatCurrency(this.value);
      requestAnimationFrame(() => {
        const ionInput = this.el.querySelector('ion-input') as any;
        if (ionInput) {
          ionInput.value = this.displayValue;
        }
      });
    } else {
      this.displayValue = '';
    }
    this.rBlur.emit(event);
  };

  @Watch('value')
  valueChanged(newValue: number | undefined, oldValue: number | undefined) {
    if (newValue !== oldValue) {
      if (this.isFocused) {
        // When focused, show raw number formatted for input
        this.displayValue = this.formatNumberForInput(newValue);
      } else {
        // When not focused, show formatted currency
        this.displayValue = this.formatCurrency(newValue);
      }

      requestAnimationFrame(() => {
        const ionInput = this.el.querySelector('ion-input') as any;
        if (ionInput) {
          ionInput.value = this.displayValue;
        }
      });
    }
  }

  componentWillLoad() {
    // Initialize display value
    this.displayValue = this.formatCurrency(this.value);
  }

  render() {
    const hasError = this.error;
    const placeholder = this.placeholder || `Enter amount in ${this.currencyCode}`;

    const inputProps = removeUndefinedProps({
      ...buildFormFieldProps({
        placeholder: placeholder,
        disabled: this.disabled,
        required: this.required,
        name: this.name,
        color: this.color,
        fill: this.fill,
        shape: this.shape,
      }),
      type: 'text',
      inputmode: 'decimal',
      value: this.displayValue,
      readonly: this.readonly,
      onInput: this.handleInput,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    });

    return (
      <ion-item class={{ 'item-has-error': hasError }} lines={getItemLines(this.fill)}>
        {this.label && (
          <ion-label position={getLabelPosition(this.fill, 'floating')}>
            {this.label}
          </ion-label>
        )}
        <ion-input {...inputProps}>
          <slot></slot>
        </ion-input>
        {hasError && this.errorText && (
          <ion-note slot="error" color="danger">
            {this.errorText}
          </ion-note>
        )}
        {!hasError && this.helperText && (
          <ion-note slot="helper">
            {this.helperText}
          </ion-note>
        )}
      </ion-item>
    );
  }
}
