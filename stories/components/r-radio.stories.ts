import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Radio',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected value',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Radio size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    border: {
      control: 'boolean',
      description: 'Show border',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <r-radio-group .value=${'option1'} @change=${args.onChange}>
      <r-radio value="option1">Option 1</r-radio>
      <r-radio value="option2">Option 2</r-radio>
      <r-radio value="option3">Option 3</r-radio>
    </r-radio-group>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <r-radio-group .value=${'option1'}>
      <r-radio value="option1">Selected</r-radio>
      <r-radio value="option2" disabled>Disabled</r-radio>
      <r-radio value="option3">Option 3</r-radio>
    </r-radio-group>
  `,
};

export const DisabledGroup: Story = {
  render: () => html`
    <r-radio-group .value=${'option1'} disabled>
      <r-radio value="option1">Option 1</r-radio>
      <r-radio value="option2">Option 2</r-radio>
      <r-radio value="option3">Option 3</r-radio>
    </r-radio-group>
  `,
};

export const WithBorder: Story = {
  render: (args) => html`
    <r-radio-group .value=${'option1'} @change=${args.onChange}>
      <r-radio value="option1" border>Option 1</r-radio>
      <r-radio value="option2" border>Option 2</r-radio>
      <r-radio value="option3" border>Option 3</r-radio>
    </r-radio-group>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Large</label>
        <r-radio-group .value=${'option1'} size="large" @change=${args.onChange}>
          <r-radio value="option1" border>Option 1</r-radio>
          <r-radio value="option2" border>Option 2</r-radio>
        </r-radio-group>
      </div>
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Default</label>
        <r-radio-group .value=${'option1'} @change=${args.onChange}>
          <r-radio value="option1" border>Option 1</r-radio>
          <r-radio value="option2" border>Option 2</r-radio>
        </r-radio-group>
      </div>
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Small</label>
        <r-radio-group .value=${'option1'} size="small" @change=${args.onChange}>
          <r-radio value="option1" border>Option 1</r-radio>
          <r-radio value="option2" border>Option 2</r-radio>
        </r-radio-group>
      </div>
    </div>
  `,
};

export const RadioButton: Story = {
  render: (args) => html`
    <r-radio-group .value=${'new-york'} @change=${args.onChange}>
      <r-radio-button value="new-york">New York</r-radio-button>
      <r-radio-button value="washington">Washington</r-radio-button>
      <r-radio-button value="los-angeles">Los Angeles</r-radio-button>
      <r-radio-button value="chicago">Chicago</r-radio-button>
    </r-radio-group>
  `,
};

export const RadioButtonSizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Large</label>
        <r-radio-group .value=${'option1'} size="large" @change=${args.onChange}>
          <r-radio-button value="option1">Option 1</r-radio-button>
          <r-radio-button value="option2">Option 2</r-radio-button>
          <r-radio-button value="option3">Option 3</r-radio-button>
        </r-radio-group>
      </div>
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Default</label>
        <r-radio-group .value=${'option1'} @change=${args.onChange}>
          <r-radio-button value="option1">Option 1</r-radio-button>
          <r-radio-button value="option2">Option 2</r-radio-button>
          <r-radio-button value="option3">Option 3</r-radio-button>
        </r-radio-group>
      </div>
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Small</label>
        <r-radio-group .value=${'option1'} size="small" @change=${args.onChange}>
          <r-radio-button value="option1">Option 1</r-radio-button>
          <r-radio-button value="option2">Option 2</r-radio-button>
          <r-radio-button value="option3">Option 3</r-radio-button>
        </r-radio-group>
      </div>
    </div>
  `,
};

export const RadioButtonDisabled: Story = {
  render: () => html`
    <r-radio-group .value=${'option1'}>
      <r-radio-button value="option1">Option 1</r-radio-button>
      <r-radio-button value="option2" disabled>Disabled</r-radio-button>
      <r-radio-button value="option3">Option 3</r-radio-button>
    </r-radio-group>
  `,
};

export const WithOptions: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Radio with options</label>
        <r-radio-group 
          .value=${'a'} 
          .options=${[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
            { label: 'Option C', value: 'c', disabled: true },
          ]}
          @change=${args.onChange}
        ></r-radio-group>
      </div>
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Button with options</label>
        <r-radio-group 
          .value=${'a'} 
          type="button"
          .options=${[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
            { label: 'Option C', value: 'c' },
          ]}
          @change=${args.onChange}
        ></r-radio-group>
      </div>
    </div>
  `,
};

export const Vertical: Story = {
  render: (args) => html`
    <r-radio-group .value=${'option1'} vertical @change=${args.onChange}>
      <r-radio value="option1">Option 1</r-radio>
      <r-radio value="option2">Option 2</r-radio>
      <r-radio value="option3">Option 3</r-radio>
      <r-radio value="option4">Option 4</r-radio>
    </r-radio-group>
  `,
};

export const InForm: Story = {
  render: (args) => html`
    <r-card header="User Preferences" style="max-width: 400px;">
      <r-form label-position="top">
        <r-form-item label="Notification Frequency" prop="frequency" required>
          <r-radio-group .value=${'daily'} @change=${args.onChange}>
            <r-radio value="realtime">Real-time</r-radio>
            <r-radio value="daily">Daily</r-radio>
            <r-radio value="weekly">Weekly</r-radio>
            <r-radio value="never">Never</r-radio>
          </r-radio-group>
        </r-form-item>
        <r-form-item label="Theme" prop="theme">
          <r-radio-group .value=${'system'} @change=${args.onChange}>
            <r-radio-button value="light">Light</r-radio-button>
            <r-radio-button value="dark">Dark</r-radio-button>
            <r-radio-button value="system">System</r-radio-button>
          </r-radio-group>
        </r-form-item>
        <r-form-item>
          <r-button type="primary">Save Preferences</r-button>
        </r-form-item>
      </r-form>
    </r-card>
  `,
};
