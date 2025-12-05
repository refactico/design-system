import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RDropdown } from './r-dropdown';

const meta: Meta = {
  title: 'Components/r-dropdown',
  component: RDropdown,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The dropdown label',
    },
    placeholder: {
      control: 'text',
      description: 'The dropdown placeholder',
    },
    value: {
      control: 'text',
      description: 'The dropdown value',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the dropdown is disabled',
    },
    required: {
      control: 'boolean',
      description: 'If true, the dropdown is required',
    },
    fill: {
      control: 'select',
      options: ['outline', 'solid'],
      description: 'The dropdown fill style',
    },
    multiple: {
      control: 'boolean',
      description: 'If true, allows multiple selections',
    },
    error: {
      control: 'boolean',
      description: 'If true, the dropdown has error state',
    },
    errorText: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display',
    },
    interface: {
      control: 'select',
      options: ['action-sheet', 'popover', 'alert'],
      description: 'Interface style',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Dropdown component that wraps Ionic select with validation, error handling, and multiple selection support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RDropdown>;

export const Basic: Story = {
  render: (props) => h('r-dropdown', props, [
    h('ion-select-option', { value: 'option1' }, 'Option 1'),
    h('ion-select-option', { value: 'option2' }, 'Option 2'),
    h('ion-select-option', { value: 'option3' }, 'Option 3'),
  ]),
  args: {
    label: 'Select Option',
    placeholder: 'Choose an option',
  },
};

export const WithLabel: Story = {
  render: (props) => h('r-dropdown', props, [
    h('ion-select-option', { value: 'us' }, 'United States'),
    h('ion-select-option', { value: 'uk' }, 'United Kingdom'),
    h('ion-select-option', { value: 'ca' }, 'Canada'),
    h('ion-select-option', { value: 'au' }, 'Australia'),
  ]),
  args: {
    label: 'Country',
    placeholder: 'Select a country',
  },
};

export const WithDefaultValue: Story = {
  render: (props) => h('r-dropdown', props, [
    h('ion-select-option', { value: 'small' }, 'Small'),
    h('ion-select-option', { value: 'medium' }, 'Medium'),
    h('ion-select-option', { value: 'large' }, 'Large'),
  ]),
  args: {
    label: 'Size',
    value: 'medium',
  },
};

export const Disabled: Story = {
  render: (props) => h('r-dropdown', props, [
    h('ion-select-option', { value: 'option1' }, 'Option 1'),
    h('ion-select-option', { value: 'option2' }, 'Option 2'),
  ]),
  args: {
    label: 'Disabled Dropdown',
    placeholder: 'This dropdown is disabled',
    disabled: true,
  },
};

export const Required: Story = {
  render: (props) => h('r-dropdown', props, [
    h('ion-select-option', { value: 'red' }, 'Red'),
    h('ion-select-option', { value: 'green' }, 'Green'),
    h('ion-select-option', { value: 'blue' }, 'Blue'),
  ]),
  args: {
    label: 'Favorite Color',
    placeholder: 'Select a color',
    required: true,
  },
};

export const WithError: Story = {
  render: (props) => h('r-dropdown', props, [
    h('ion-select-option', { value: 'option1' }, 'Option 1'),
    h('ion-select-option', { value: 'option2' }, 'Option 2'),
  ]),
  args: {
    label: 'Required Field',
    placeholder: 'Select an option',
    error: true,
    errorText: 'This field is required',
  },
};

export const WithHelperText: Story = {
  render: (props) => h('r-dropdown', props, [
    h('ion-select-option', { value: 'beginner' }, 'Beginner'),
    h('ion-select-option', { value: 'intermediate' }, 'Intermediate'),
    h('ion-select-option', { value: 'advanced' }, 'Advanced'),
  ]),
  args: {
    label: 'Experience Level',
    placeholder: 'Select your level',
    helperText: 'Choose the level that best describes your experience',
  },
};

export const MultipleSelection: Story = {
  render: (props) => h('r-dropdown', props, [
    h('ion-select-option', { value: 'react' }, 'React'),
    h('ion-select-option', { value: 'vue' }, 'Vue'),
    h('ion-select-option', { value: 'angular' }, 'Angular'),
    h('ion-select-option', { value: 'svelte' }, 'Svelte'),
  ]),
  args: {
    label: 'Select Frameworks',
    placeholder: 'Choose multiple options',
    multiple: true,
  },
};

export const OutlineFill: Story = {
  render: (props) => h('r-dropdown', props, [
    h('ion-select-option', { value: 'option1' }, 'Option 1'),
    h('ion-select-option', { value: 'option2' }, 'Option 2'),
  ]),
  args: {
    label: 'Outline Style',
    placeholder: 'Select an option',
    fill: 'outline',
  },
};

export const SolidFill: Story = {
  render: (props) => h('r-dropdown', props, [
    h('ion-select-option', { value: 'option1' }, 'Option 1'),
    h('ion-select-option', { value: 'option2' }, 'Option 2'),
  ]),
  args: {
    label: 'Solid Style',
    placeholder: 'Select an option',
    fill: 'solid',
  },
};

