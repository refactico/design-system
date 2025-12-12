import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RRange } from './r-range';

const meta: Meta = {
  title: 'Components/r-range',
  component: RRange,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The range label',
    },
    value: {
      control: 'number',
      description: 'The range value (number for single knob, object for dual knobs)',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step value',
    },
    dualKnobs: {
      control: 'boolean',
      description: 'If true, shows two knobs for range selection',
    },
    pin: {
      control: 'boolean',
      description: 'If true, shows value pin on drag',
    },
    snaps: {
      control: 'boolean',
      description: 'If true, snaps to step values',
    },
    ticks: {
      control: 'boolean',
      description: 'If true, shows tick marks',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the range is disabled',
    },
    required: {
      control: 'boolean',
      description: 'If true, the range is required',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'dark', 'medium', 'light'],
      description: 'The range color (Ionic color)',
    },
    error: {
      control: 'boolean',
      description: 'If true, the range has error state',
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
        component: 'Range slider component that wraps Ionic range with validation, error handling, and dual knob support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RRange>;

export const Basic: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    value: 50,
  },
};

export const WithLabel: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Volume Control',
    min: 0,
    max: 100,
    value: 75,
  },
};

export const WithPin: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    value: 50,
    pin: true,
  },
};

export const WithSnaps: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    value: 50,
    step: 10,
    snaps: true,
  },
};

export const WithTicks: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    value: 50,
    step: 10,
    ticks: true,
  },
};

export const DualKnobs: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Price Range',
    min: 0,
    max: 1000,
    dualKnobs: true,
  },
};

export const DualKnobsWithPin: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Price Range',
    min: 0,
    max: 1000,
    dualKnobs: true,
    pin: true,
  },
};

export const Disabled: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    value: 50,
    disabled: true,
  },
};

export const Required: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    value: 50,
    required: true,
  },
};

export const WithError: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    value: 50,
    error: true,
    errorText: 'Please select a value',
  },
};

export const WithHelperText: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    value: 50,
    helperText: 'Adjust the volume level (0-100)',
  },
};

export const CustomRange: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Rating',
    min: 1,
    max: 5,
    value: 3,
    step: 1,
    snaps: true,
    ticks: true,
    pin: true,
  },
};

export const PriceFilter: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Price Range ($)',
    min: 0,
    max: 1000,
    value: 500,
    step: 50,
    pin: true,
    helperText: 'Select your price range',
  },
};

export const AllFeatures: Story = {
  render: (props) => h('r-range', props),
  args: {
    label: 'Volume Control',
    min: 0,
    max: 100,
    value: 50,
    step: 5,
    pin: true,
    snaps: true,
    ticks: true,
    helperText: 'Drag to adjust volume',
  },
};

