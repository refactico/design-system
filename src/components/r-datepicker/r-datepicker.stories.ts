import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RDatepicker } from './r-datepicker';

const meta: Meta = {
  title: 'Components/r-datepicker',
  component: RDatepicker,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The datepicker label',
    },
    placeholder: {
      control: 'text',
      description: 'The datepicker placeholder',
    },
    value: {
      control: 'text',
      description: 'The datepicker value (ISO string)',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the datepicker is disabled',
    },
    required: {
      control: 'boolean',
      description: 'If true, the datepicker is required',
    },
    fill: {
      control: 'select',
      options: ['outline', 'solid'],
      description: 'The datepicker fill style',
    },
    presentation: {
      control: 'select',
      options: ['date', 'time', 'date-time', 'month', 'year', 'month-year', 'time-date'],
      description: 'Presentation style',
    },
    error: {
      control: 'boolean',
      description: 'If true, the datepicker has error state',
    },
    errorText: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display',
    },
    min: {
      control: 'text',
      description: 'Minimum date (ISO string)',
    },
    max: {
      control: 'text',
      description: 'Maximum date (ISO string)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Datepicker component that wraps Ionic datetime with validation, error handling, and various presentation styles.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RDatepicker>;

export const Basic: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Select Date',
    placeholder: 'Choose a date',
    presentation: 'date',
  },
};

export const WithLabel: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Birth Date',
    placeholder: 'Select your birth date',
    presentation: 'date',
  },
};

export const WithDefaultValue: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Event Date',
    value: '2024-12-25',
    presentation: 'date',
  },
};

export const Disabled: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Disabled Datepicker',
    placeholder: 'This datepicker is disabled',
    disabled: true,
    presentation: 'date',
  },
};

export const Required: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Appointment Date',
    placeholder: 'Select a date',
    required: true,
    presentation: 'date',
  },
};

export const WithError: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Required Field',
    placeholder: 'Select a date',
    error: true,
    errorText: 'This field is required',
    presentation: 'date',
  },
};

export const WithHelperText: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Event Date',
    placeholder: 'Select a date',
    helperText: 'Please select a date for your event',
    presentation: 'date',
  },
};

export const TimePicker: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Time',
    placeholder: 'Select a time',
    presentation: 'time',
  },
};

export const DateTimePicker: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Date & Time',
    placeholder: 'Select date and time',
    presentation: 'date-time',
  },
};

export const WithMinMax: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Date Range',
    placeholder: 'Select a date',
    min: '2024-01-01',
    max: '2024-12-31',
    presentation: 'date',
  },
};

export const OutlineFill: Story = {
  render: (props) => h('r-datepicker', props),
  args: {
    label: 'Outline Style',
    placeholder: 'Select a date',
    fill: 'outline',
    presentation: 'date',
  },
};

