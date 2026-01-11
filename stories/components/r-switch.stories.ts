import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Switch',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: 'Checked state' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    loading: { control: 'boolean', description: 'Loading state' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    activeText: { control: 'text', description: 'Text when on' },
    inactiveText: { control: 'text', description: 'Text when off' },
  },
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <r-switch @change=${args.onChange}></r-switch>
  `,
};

export const Checked: Story = {
  render: () => html`<r-switch checked></r-switch>`,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <r-switch disabled></r-switch>
      <r-switch disabled checked></r-switch>
    </div>
  `,
};

export const Loading: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <r-switch loading></r-switch>
      <r-switch loading checked></r-switch>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 24px;">
      <r-switch size="large" checked></r-switch>
      <r-switch size="default" checked></r-switch>
      <r-switch size="small" checked></r-switch>
    </div>
  `,
};

export const WithText: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-switch active-text="On" inactive-text="Off" @change=${args.onChange}></r-switch>
      <r-switch active-text="Yes" inactive-text="No" checked @change=${args.onChange}></r-switch>
    </div>
  `,
};

export const InlinePrompt: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-switch inline-prompt active-text="Y" inactive-text="N" @change=${args.onChange}></r-switch>
      <r-switch inline-prompt active-text="开" inactive-text="关" checked @change=${args.onChange}></r-switch>
    </div>
  `,
};

export const CustomColors: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-switch active-color="#13ce66" inactive-color="#ff4949" @change=${args.onChange}></r-switch>
      <r-switch active-color="#409eff" inactive-color="#c0ccda" checked @change=${args.onChange}></r-switch>
    </div>
  `,
};

export const InForm: Story = {
  render: (args) => html`
    <r-card header="Notification Settings" style="max-width: 400px;">
      <r-form label-position="left" label-width="180px">
        <r-form-item label="Email notifications">
          <r-switch checked @change=${args.onChange}></r-switch>
        </r-form-item>
        <r-form-item label="Push notifications">
          <r-switch @change=${args.onChange}></r-switch>
        </r-form-item>
        <r-form-item label="Marketing emails">
          <r-switch @change=${args.onChange}></r-switch>
        </r-form-item>
      </r-form>
    </r-card>
  `,
};
