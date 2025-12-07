import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RCheckbox } from './r-checkbox';

const meta: Meta = {
  title: 'Components/r-checkbox',
  component: RCheckbox,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The checkbox color (Ionic color)',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md'],
      description: 'The checkbox mode (ios or md)',
    },
    checked: {
      control: 'boolean',
      description: 'If true, the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the checkbox is disabled',
    },
    indeterminate: {
      control: 'boolean',
      description: 'If true, the checkbox is in an indeterminate state',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'fixed', 'stacked'],
      description: 'Label placement relative to the checkbox',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'space-between'],
      description: 'Justify content',
    },
    alignment: {
      control: 'select',
      options: ['start', 'center'],
      description: 'Checkbox alignment',
    },
    formField: {
      control: 'boolean',
      description: 'If true, wraps checkbox in ion-item for form field styling',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Checkbox component that wraps Ionic checkbox with design system styling. Supports both standalone and form field modes with comprehensive props for all use cases.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RCheckbox>;

export const Basic: Story = {
  render: (props) => h('r-checkbox', props, 'Accept Terms and Conditions'),
  args: {},
};

export const Checked: Story = {
  render: (props) => h('r-checkbox', props, 'Already Checked'),
  args: {
    checked: true,
  },
};

export const WithColor: Story = {
  render: (props) => h('r-checkbox', props, 'Colored Checkbox'),
  args: {
    color: 'primary',
    checked: true,
  },
};

export const Disabled: Story = {
  render: (props) => h('r-checkbox', props, 'Disabled Checkbox'),
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: (props) => h('r-checkbox', props, 'Disabled and Checked'),
  args: {
    disabled: true,
    checked: true,
  },
};

export const Indeterminate: Story = {
  render: (props) => h('r-checkbox', props, 'Select All'),
  args: {
    indeterminate: true,
  },
};

export const LabelPlacement: Story = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } }, [
    h('r-checkbox', { labelPlacement: 'start' }, 'Label on Start'),
    h('r-checkbox', { labelPlacement: 'end', checked: true }, 'Label on End (Default)'),
    h('r-checkbox', { labelPlacement: 'fixed', checked: true }, 'Label Fixed'),
    h('r-checkbox', { labelPlacement: 'stacked', checked: true }, 'Label Stacked'),
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Different label placement options for checkbox.',
      },
    },
  },
};

export const FormField: Story = {
  render: (props) => h('r-checkbox', props, 'Form Field Checkbox'),
  args: {
    formField: true,
    label: 'Agree to Terms',
    helperText: 'You must agree to continue',
  },
};

export const FormFieldWithError: Story = {
  render: (props) => h('r-checkbox', props, 'Form Field with Error'),
  args: {
    formField: true,
    label: 'Required Field',
    error: true,
    errorText: 'This field is required',
  },
};

export const Required: Story = {
  render: (props) => h('r-checkbox', props, 'Required Checkbox'),
  args: {
    required: true,
    label: 'I agree to the terms',
  },
};

export const ColorVariants: Story = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } }, [
    h('r-checkbox', { color: 'primary', checked: true }, 'Primary'),
    h('r-checkbox', { color: 'secondary', checked: true }, 'Secondary'),
    h('r-checkbox', { color: 'success', checked: true }, 'Success'),
    h('r-checkbox', { color: 'warning', checked: true }, 'Warning'),
    h('r-checkbox', { color: 'danger', checked: true }, 'Danger'),
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with different color variants.',
      },
    },
  },
};

export const CheckboxList: Story = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } }, [
    h('r-checkbox', { value: 'option1', checked: true }, 'Option 1'),
    h('r-checkbox', { value: 'option2' }, 'Option 2'),
    h('r-checkbox', { value: 'option3', checked: true }, 'Option 3'),
    h('r-checkbox', { value: 'option4' }, 'Option 4'),
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Multiple checkboxes in a list for selecting multiple options.',
      },
    },
  },
};

export const SelectAllPattern: Story = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } }, [
    h('r-checkbox', { indeterminate: true, justify: 'space-between' }, 'Select All'),
    h('div', { style: { marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' } }, [
      h('r-checkbox', { value: 'item1', checked: true }, 'Item 1'),
      h('r-checkbox', { value: 'item2', checked: true }, 'Item 2'),
      h('r-checkbox', { value: 'item3' }, 'Item 3'),
    ]),
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Select All pattern with indeterminate state for parent checkbox.',
      },
    },
  },
};

