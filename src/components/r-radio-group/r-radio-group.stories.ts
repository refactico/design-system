import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RRadioGroup } from './r-radio-group';

const meta: Meta = {
  title: 'Components/r-radio-group',
  component: RRadioGroup,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The radio group color (Ionic color)',
    },
    fill: {
      control: 'select',
      options: ['outline', 'solid', 'clear', 'default'],
      description: 'The fill style',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the radio group is disabled',
    },
    required: {
      control: 'boolean',
      description: 'If true, the radio group is required',
    },
    error: {
      control: 'boolean',
      description: 'If true, the radio group has error state',
    },
    allowEmptySelection: {
      control: 'boolean',
      description: 'If true, allows deselecting the selected option',
    },
    alignment: {
      control: 'select',
      options: ['start', 'center'],
      description: 'Controls the alignment of the radio and label on the cross axis',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'space-between'],
      description: 'Determines how the label and radio are packed within a line',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'fixed', 'stacked'],
      description: 'Specifies the label\'s position relative to the radio',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md'],
      description: 'Chooses the platform styles to use',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Radio group component for selecting a single option from a list. Supports form field styling, validation, error handling, and accessibility features.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RRadioGroup>;

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Basic: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Choose an option',
    name: 'basic-choice',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const WithSelectedValue: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Pre-selected Option',
    name: 'preselected-choice',
    value: 'option2',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const Required: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Required Selection',
    name: 'required-choice',
    required: true,
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const WithColor: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Choose Color',
    name: 'color-choice',
    color: 'primary',
    options: JSON.stringify([
      { value: 'primary', label: 'Primary' },
      { value: 'secondary', label: 'Secondary' },
      { value: 'danger', label: 'Danger' },
    ]),
  }),
  args: {},
};

export const Disabled: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Disabled Selection',
    name: 'disabled-choice',
    disabled: true,
    value: 'option1',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const WithHelperText: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Select Option',
    name: 'helper-choice',
    helperText: 'Please select one of the available options',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const WithError: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Required Field',
    name: 'error-choice',
    required: true,
    error: true,
    errorText: 'Please select an option',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const OutlineFill: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Outline Style',
    name: 'outline-choice',
    fill: 'outline',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const AllowEmptySelection: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Optional Selection',
    name: 'empty-choice',
    allowEmptySelection: true,
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const LabelPlacementStart: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Label on Start',
    name: 'label-start-choice',
    labelPlacement: 'start',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const LabelPlacementEnd: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Label on End',
    name: 'label-end-choice',
    labelPlacement: 'end',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const JustifySpaceBetween: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Space Between',
    name: 'justify-choice',
    justify: 'space-between',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const AlignmentCenter: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Center Alignment',
    name: 'alignment-choice',
    alignment: 'center',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const MaterialDesignMode: Story = {
  render: (props) => h('r-radio-group', {
    ...props,
    label: 'Material Design Style',
    name: 'mode-choice',
    mode: 'md',
    options: JSON.stringify(defaultOptions),
  }),
  args: {},
};

export const ColorVariants: Story = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } }, [
    h('r-radio-group', {
      label: 'Primary Color',
      name: 'primary-choice',
      color: 'primary',
      options: JSON.stringify(defaultOptions),
    }),
    h('r-radio-group', {
      label: 'Secondary Color',
      name: 'secondary-choice',
      color: 'secondary',
      options: JSON.stringify(defaultOptions),
    }),
    h('r-radio-group', {
      label: 'Danger Color',
      name: 'danger-choice',
      color: 'danger',
      options: JSON.stringify(defaultOptions),
    }),
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Radio groups with different color variants.',
      },
    },
  },
};


