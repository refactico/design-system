import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RToggle } from './r-toggle';

const meta: Meta = {
  title: 'Components/r-toggle',
  component: RToggle,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The toggle color (Ionic color)',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md'],
      description: 'The toggle mode (ios or md)',
    },
    checked: {
      control: 'boolean',
      description: 'If true, the toggle is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the toggle is disabled',
    },
    enableOnOffLabels: {
      control: 'boolean',
      description: 'If true, displays "on" and "off" labels within the toggle for accessibility',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'fixed', 'stacked'],
      description: 'Label placement relative to the toggle',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'space-between'],
      description: 'Justify content',
    },
    alignment: {
      control: 'select',
      options: ['start', 'center'],
      description: 'Toggle alignment',
    },
    formField: {
      control: 'boolean',
      description: 'If true, wraps toggle in ion-item for form field styling',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Toggle switch component that wraps Ionic toggle with design system styling. Supports both standalone and form field modes with comprehensive props for all use cases.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RToggle>;

export const Basic: Story = {
  render: (props) => h('r-toggle', props, 'Enable Notifications'),
  args: {},
};

export const Checked: Story = {
  render: (props) => h('r-toggle', props, 'Already Enabled'),
  args: {
    checked: true,
  },
};

export const WithColor: Story = {
  render: (props) => h('r-toggle', props, 'Colored Toggle'),
  args: {
    color: 'primary',
    checked: true,
  },
};

export const Disabled: Story = {
  render: (props) => h('r-toggle', props, 'Disabled Toggle'),
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: (props) => h('r-toggle', props, 'Disabled and Checked'),
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithOnOffLabels: Story = {
  render: (props) => h('r-toggle', props, 'Toggle with Labels'),
  args: {
    enableOnOffLabels: true,
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle with "on" and "off" labels for improved accessibility.',
      },
    },
  },
};

export const LabelPlacement: Story = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } }, [
    h('r-toggle', { labelPlacement: 'start' }, 'Label on Start'),
    h('r-toggle', { labelPlacement: 'end', checked: true }, 'Label on End (Default)'),
    h('r-toggle', { labelPlacement: 'fixed', checked: true }, 'Label Fixed'),
    h('r-toggle', { labelPlacement: 'stacked', checked: true }, 'Label Stacked'),
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Different label placement options for toggle.',
      },
    },
  },
};

export const FormField: Story = {
  render: (props) => h('r-toggle', props, 'Form Field Toggle'),
  args: {
    formField: true,
    label: 'Enable Feature',
    helperText: 'Turn this feature on or off',
  },
};

export const FormFieldWithError: Story = {
  render: (props) => h('r-toggle', props, 'Form Field with Error'),
  args: {
    formField: true,
    label: 'Required Field',
    error: true,
    errorText: 'This field is required',
  },
};

export const Required: Story = {
  render: (props) => h('r-toggle', props, 'Required Toggle'),
  args: {
    required: true,
    label: 'I agree to the terms',
  },
};

export const ColorVariants: Story = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } }, [
    h('r-toggle', { color: 'primary', checked: true }, 'Primary'),
    h('r-toggle', { color: 'secondary', checked: true }, 'Secondary'),
    h('r-toggle', { color: 'success', checked: true }, 'Success'),
    h('r-toggle', { color: 'warning', checked: true }, 'Warning'),
    h('r-toggle', { color: 'danger', checked: true }, 'Danger'),
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Toggle with different color variants.',
      },
    },
  },
};

export const ToggleList: Story = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } }, [
    h('r-toggle', { value: 'option1', checked: true }, 'Enable Option 1'),
    h('r-toggle', { value: 'option2' }, 'Enable Option 2'),
    h('r-toggle', { value: 'option3', checked: true }, 'Enable Option 3'),
    h('r-toggle', { value: 'option4' }, 'Enable Option 4'),
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Multiple toggles in a list for enabling/disabling multiple options.',
      },
    },
  },
};

export const SettingsPanel: Story = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' } }, [
    h('h3', { style: { margin: '0 0 8px 0' } }, 'Notification Settings'),
    h('r-toggle', { justify: 'space-between', checked: true }, 'Push Notifications'),
    h('r-toggle', { justify: 'space-between', checked: true }, 'Email Notifications'),
    h('r-toggle', { justify: 'space-between' }, 'SMS Notifications'),
    h('r-toggle', { justify: 'space-between', checked: true }, 'Marketing Emails'),
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Settings panel pattern with multiple toggles using space-between justify.',
      },
    },
  },
};

