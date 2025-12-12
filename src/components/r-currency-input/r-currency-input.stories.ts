import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RCurrencyInput } from './r-currency-input';

const meta: Meta = {
  title: 'Components/r-currency-input',
  component: RCurrencyInput,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The currency input label',
    },
    value: {
      control: 'number',
      description: 'The currency value (number)',
    },
    currencyCode: {
      control: 'text',
      description: 'ISO currency code (e.g., "USD", "EUR", "GBP")',
    },
    precision: {
      control: 'number',
      description: 'Number of decimal places (default: 2)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the currency input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'If true, the currency input is readonly',
    },
    required: {
      control: 'boolean',
      description: 'If true, the currency input is required',
    },
    locale: {
      control: 'text',
      description: 'Locale for formatting (e.g., "en-US", "en-GB")',
    },
    fill: {
      control: 'select',
      options: ['outline', 'solid'],
      description: 'The currency input fill style',
    },
    error: {
      control: 'boolean',
      description: 'If true, the currency input has error state',
    },
    errorText: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Currency input component with automatic formatting, locale support, and validation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RCurrencyInput>;

export const Basic: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price',
    currencyCode: 'USD',
    value: 100,
  },
};

export const WithLabel: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Amount',
    currencyCode: 'USD',
    placeholder: 'Enter amount',
  },
};

export const USD: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price (USD)',
    currencyCode: 'USD',
    value: 99.99,
  },
};

export const EUR: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price (EUR)',
    currencyCode: 'EUR',
    value: 99.99,
    locale: 'en-GB',
  },
};

export const GBP: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price (GBP)',
    currencyCode: 'GBP',
    value: 99.99,
    locale: 'en-GB',
  },
};

export const JPY: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price (JPY)',
    currencyCode: 'JPY',
    value: 1000,
    precision: 0,
  },
};

export const CustomPrecision: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price',
    currencyCode: 'USD',
    value: 99.999,
    precision: 3,
  },
};

export const WithMinMax: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price',
    currencyCode: 'USD',
    min: 0,
    max: 1000,
    helperText: 'Enter amount between $0 and $1,000',
  },
};

export const Required: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price',
    currencyCode: 'USD',
    required: true,
    helperText: 'This field is required',
  },
};

export const WithError: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price',
    currencyCode: 'USD',
    value: -10,
    error: true,
    errorText: 'Amount must be greater than 0',
  },
};

export const Disabled: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price',
    currencyCode: 'USD',
    value: 100,
    disabled: true,
  },
};

export const Readonly: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Total Price',
    currencyCode: 'USD',
    value: 199.99,
    readonly: true,
  },
};

export const OutlineFill: Story = {
  render: (props) => h('r-currency-input', props),
  args: {
    label: 'Price',
    currencyCode: 'USD',
    fill: 'outline',
  },
};

export const AllCurrencies: Story = {
  render: () => {
    const currencies = [
      { code: 'USD', label: 'US Dollar', value: 100 },
      { code: 'EUR', label: 'Euro', value: 100 },
      { code: 'GBP', label: 'British Pound', value: 100 },
      { code: 'JPY', label: 'Japanese Yen', value: 10000, precision: 0 },
      { code: 'CAD', label: 'Canadian Dollar', value: 100 },
    ];
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' } }, [
      ...currencies.map(({ code, label, value, precision }) =>
        h('r-currency-input', {
          label: `${label} (${code})`,
          currencyCode: code,
          value: value,
          precision: precision || 2,
        })
      ),
    ]);
  },
};

