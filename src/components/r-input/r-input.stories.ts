import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RInput } from './r-input';

const meta: Meta = {
  title: 'Components/r-input',
  component: RInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'The input type',
    },
    label: {
      control: 'text',
      description: 'The input label',
    },
    placeholder: {
      control: 'text',
      description: 'The input placeholder',
    },
    value: {
      control: 'text',
      description: 'The input value',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'If true, the input is readonly',
    },
    required: {
      control: 'boolean',
      description: 'If true, the input is required',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'If true, shows password toggle button (only for password type)',
    },
    fill: {
      control: 'select',
      options: ['outline', 'solid'],
      description: 'The input fill style',
    },
    error: {
      control: 'boolean',
      description: 'If true, the input has error state',
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
        component: 'Input field component that wraps Ionic input with password visibility toggle, validation, and error handling.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RInput>;

export const Basic: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'text',
    label: 'Name',
    placeholder: 'Enter your name',
  },
};

export const WithPlaceholder: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'text',
    placeholder: 'Enter text here',
  },
};

export const Password: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
  },
};

export const PasswordWithoutToggle: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    showPasswordToggle: false,
  },
};

export const Email: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    autocomplete: 'email',
  },
};

export const Number: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
  },
};

export const Disabled: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'text',
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const Readonly: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'text',
    label: 'Readonly Input',
    value: 'This is readonly',
    readonly: true,
  },
};

export const Required: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'text',
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const WithError: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    error: true,
    errorText: 'Please enter a valid email address',
  },
};

export const WithHelperText: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Username must be at least 3 characters long',
  },
};

export const OutlineFill: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'text',
    label: 'Outline Style',
    placeholder: 'Enter text',
    fill: 'outline',
  },
};

export const SolidFill: Story = {
  render: (props) => h('r-input', props),
  args: {
    type: 'text',
    label: 'Solid Style',
    placeholder: 'Enter text',
    fill: 'solid',
  },
};

export const AllTypes: Story = {
  render: () => {
    const types = [
      { type: 'text', label: 'Text Input', placeholder: 'Enter text' },
      { type: 'email', label: 'Email Input', placeholder: 'Enter email' },
      { type: 'password', label: 'Password Input', placeholder: 'Enter password' },
      { type: 'number', label: 'Number Input', placeholder: 'Enter number' },
      { type: 'tel', label: 'Phone Input', placeholder: 'Enter phone number' },
      { type: 'url', label: 'URL Input', placeholder: 'Enter URL' },
      { type: 'search', label: 'Search Input', placeholder: 'Search...' },
    ];

    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', maxWidth: '500px' } }, [
      ...types.map(({ type, label, placeholder }) =>
        h('r-input', { type, label, placeholder, showPasswordToggle: type === 'password' })
      )
    ]);
  },
};
