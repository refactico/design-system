import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RTextarea } from './r-textarea';

const meta: Meta = {
  title: 'Components/r-textarea',
  component: RTextarea,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The textarea label',
    },
    placeholder: {
      control: 'text',
      description: 'The textarea placeholder',
    },
    value: {
      control: 'text',
      description: 'The textarea value',
    },
    rows: {
      control: 'number',
      description: 'Number of visible rows',
    },
    maxlength: {
      control: 'number',
      description: 'Maximum number of characters',
    },
    minlength: {
      control: 'number',
      description: 'Minimum number of characters',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the textarea is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'If true, the textarea is readonly',
    },
    required: {
      control: 'boolean',
      description: 'If true, the textarea is required',
    },
    autoGrow: {
      control: 'boolean',
      description: 'If true, the textarea will auto-grow as the user types',
    },
    fill: {
      control: 'select',
      options: ['outline', 'solid'],
      description: 'The textarea fill style',
    },
    error: {
      control: 'boolean',
      description: 'If true, the textarea has error state',
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
        component: 'Textarea component that wraps Ionic textarea with validation, error handling, and auto-grow support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RTextarea>;

export const Basic: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments here',
    rows: 4,
  },
};

export const WithPlaceholder: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const WithValue: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Description',
    value: 'This is a pre-filled textarea with some content.',
    rows: 4,
  },
};

export const AutoGrow: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Auto-growing Textarea',
    placeholder: 'Type here and watch it grow...',
    autoGrow: true,
    rows: 3,
  },
};

export const WithMaxLength: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Limited Text',
    placeholder: 'Maximum 100 characters',
    maxlength: 100,
    rows: 4,
    helperText: '100 characters maximum',
  },
};

export const Disabled: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Disabled Textarea',
    value: 'This textarea is disabled and cannot be edited.',
    disabled: true,
    rows: 4,
  },
};

export const Readonly: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Readonly Textarea',
    value: 'This textarea is readonly and cannot be edited.',
    readonly: true,
    rows: 4,
  },
};

export const Required: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    rows: 4,
  },
};

export const WithError: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments',
    value: 'Too short',
    error: true,
    errorText: 'Please enter at least 10 characters',
    rows: 4,
  },
};

export const WithHelperText: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Feedback',
    placeholder: 'Enter your feedback',
    helperText: 'Please provide detailed feedback (minimum 20 characters)',
    rows: 4,
  },
};

export const OutlineFill: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Outline Style',
    placeholder: 'Enter text',
    fill: 'outline',
    rows: 4,
  },
};

export const SolidFill: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Solid Style',
    placeholder: 'Enter text',
    fill: 'solid',
    rows: 4,
  },
};

export const LargeTextarea: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Large Textarea',
    placeholder: 'Enter a lot of text here...',
    rows: 10,
  },
};

export const SmallTextarea: Story = {
  render: (props) => h('r-textarea', props),
  args: {
    label: 'Small Textarea',
    placeholder: 'Brief description',
    rows: 2,
  },
};

