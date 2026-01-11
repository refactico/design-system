import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Input Number',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Current value',
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
      description: 'Step increment',
    },
    precision: {
      control: 'number',
      description: 'Decimal precision',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Input size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
    },
    controls: {
      control: 'boolean',
      description: 'Show control buttons',
    },
    controlsPosition: {
      control: 'select',
      options: ['', 'right'],
      description: 'Position of controls',
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <r-input-number
      .value=${10}
      @change=${args.onChange}
      @focus=${args.onFocus}
      @blur=${args.onBlur}
    ></r-input-number>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <r-input-number .value=${5} disabled></r-input-number>
  `,
};

export const MinMax: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Range: 1-10</label>
        <r-input-number .value=${5} .min=${1} .max=${10} @change=${args.onChange}></r-input-number>
      </div>
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Range: -5 to 5</label>
        <r-input-number .value=${0} .min=${-5} .max=${5} @change=${args.onChange}></r-input-number>
      </div>
    </div>
  `,
};
