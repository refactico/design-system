import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Design System/r-input',
  component: 'r-input',
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
type Story = StoryObj;

const createInput = (args: any) => {
  const input = document.createElement('r-input');
  if (args.type) input.setAttribute('type', args.type);
  if (args.label) input.setAttribute('label', args.label);
  if (args.placeholder) input.setAttribute('placeholder', args.placeholder);
  if (args.value) input.setAttribute('value', args.value);
  if (args.disabled) input.setAttribute('disabled', '');
  if (args.readonly) input.setAttribute('readonly', '');
  if (args.required) input.setAttribute('required', '');
  if (args.showPasswordToggle !== undefined) input.setAttribute('show-password-toggle', args.showPasswordToggle.toString());
  if (args.fill) input.setAttribute('fill', args.fill);
  if (args.error) input.setAttribute('error', '');
  if (args.errorText) input.setAttribute('error-text', args.errorText);
  if (args.helperText) input.setAttribute('helper-text', args.helperText);
  if (args.name) input.setAttribute('name', args.name);
  if (args.autocomplete) input.setAttribute('autocomplete', args.autocomplete);
  return input;
};

export const Basic: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'text',
    label: 'Name',
    placeholder: 'Enter your name',
  },
};

export const WithPlaceholder: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'text',
    placeholder: 'Enter text here',
  },
};

export const Password: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
  },
};

export const PasswordWithoutToggle: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    showPasswordToggle: false,
  },
};

export const Email: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    autocomplete: 'email',
  },
};

export const Number: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
  },
};

export const Disabled: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'text',
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const Readonly: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'text',
    label: 'Readonly Input',
    value: 'This is readonly',
    readonly: true,
  },
};

export const Required: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'text',
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const WithError: Story = {
  render: (args) => createInput(args),
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
  render: (args) => createInput(args),
  args: {
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Username must be at least 3 characters long',
  },
};

export const OutlineFill: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'text',
    label: 'Outline Style',
    placeholder: 'Enter text',
    fill: 'outline',
  },
};

export const SolidFill: Story = {
  render: (args) => createInput(args),
  args: {
    type: 'text',
    label: 'Solid Style',
    placeholder: 'Enter text',
    fill: 'solid',
  },
};

export const AllTypes: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '20px';
    container.style.padding = '20px';
    container.style.maxWidth = '500px';

    const types = [
      { type: 'text', label: 'Text Input', placeholder: 'Enter text' },
      { type: 'email', label: 'Email Input', placeholder: 'Enter email' },
      { type: 'password', label: 'Password Input', placeholder: 'Enter password' },
      { type: 'number', label: 'Number Input', placeholder: 'Enter number' },
      { type: 'tel', label: 'Phone Input', placeholder: 'Enter phone number' },
      { type: 'url', label: 'URL Input', placeholder: 'Enter URL' },
      { type: 'search', label: 'Search Input', placeholder: 'Search...' },
    ];

    types.forEach(({ type, label, placeholder }) => {
      const input = createInput({ type, label, placeholder, showPasswordToggle: type === 'password' });
      container.appendChild(input);
    });

    return container;
  },
};

