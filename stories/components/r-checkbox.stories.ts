import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: 'Checked state' },
    indeterminate: { control: 'boolean', description: 'Indeterminate state' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    border: { control: 'boolean', description: 'Show border' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <r-checkbox @change=${args.onChange}>Option</r-checkbox>
  `,
};

export const Checked: Story = {
  render: () => html`<r-checkbox checked>Checked</r-checkbox>`,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <r-checkbox disabled>Disabled</r-checkbox>
      <r-checkbox disabled checked>Disabled Checked</r-checkbox>
    </div>
  `,
};

export const Indeterminate: Story = {
  render: () => html`<r-checkbox indeterminate>Indeterminate</r-checkbox>`,
};

export const WithBorder: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 16px;">
      <r-checkbox border @change=${args.onChange}>Option A</r-checkbox>
      <r-checkbox border checked @change=${args.onChange}>Option B</r-checkbox>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-checkbox size="large" border>Large</r-checkbox>
      <r-checkbox size="default" border>Default</r-checkbox>
      <r-checkbox size="small" border>Small</r-checkbox>
    </div>
  `,
};

export const CheckboxGroup: Story = {
  render: (args) => html`
    <r-checkbox-group .value=${['a', 'c']} @change=${args.onChange}>
      <r-checkbox value="a">Option A</r-checkbox>
      <r-checkbox value="b">Option B</r-checkbox>
      <r-checkbox value="c">Option C</r-checkbox>
      <r-checkbox value="d" disabled>Disabled</r-checkbox>
    </r-checkbox-group>
  `,
};

export const GroupWithOptions: Story = {
  render: (args) => html`
    <r-checkbox-group
      .value=${['vue']}
      .options=${[
        { label: 'Vue', value: 'vue' },
        { label: 'React', value: 'react' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte', disabled: true },
      ]}
      @change=${args.onChange}
    ></r-checkbox-group>
  `,
};

export const GroupMinMax: Story = {
  render: (args) => html`
    <div>
      <p style="margin-bottom: 8px; color: var(--r-color-text-secondary);">Min: 1, Max: 3</p>
      <r-checkbox-group .value=${['a']} .min=${1} .max=${3} @change=${args.onChange}>
        <r-checkbox value="a">Option A</r-checkbox>
        <r-checkbox value="b">Option B</r-checkbox>
        <r-checkbox value="c">Option C</r-checkbox>
        <r-checkbox value="d">Option D</r-checkbox>
        <r-checkbox value="e">Option E</r-checkbox>
      </r-checkbox-group>
    </div>
  `,
};

export const VerticalGroup: Story = {
  render: (args) => html`
    <r-checkbox-group .value=${['email']} vertical @change=${args.onChange}>
      <r-checkbox value="email">Email notifications</r-checkbox>
      <r-checkbox value="sms">SMS notifications</r-checkbox>
      <r-checkbox value="push">Push notifications</r-checkbox>
    </r-checkbox-group>
  `,
};
