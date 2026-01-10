import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Loading',
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    text: { control: 'text' },
    spinnerSize: { control: 'select', options: ['small', 'default', 'large'] },
    background: { control: 'select', options: ['light', 'dark'] },
    fullscreen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <r-loading loading>
      <div style="padding: 40px; background: var(--r-color-fill-light); border-radius: var(--r-radius-base);">
        <p>This content is loading...</p>
        <p>More content here.</p>
      </div>
    </r-loading>
  `,
};

export const WithText: Story = {
  render: () => html`
    <r-loading loading text="Loading data...">
      <div style="padding: 40px; background: var(--r-color-fill-light); border-radius: var(--r-radius-base);">
        <p>This content is loading...</p>
      </div>
    </r-loading>
  `,
};

export const SpinnerSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px;">
      <r-loading loading spinner-size="small">
        <div style="padding: 40px; background: var(--r-color-fill-light); border-radius: var(--r-radius-base);">
          Small
        </div>
      </r-loading>
      <r-loading loading spinner-size="default">
        <div style="padding: 40px; background: var(--r-color-fill-light); border-radius: var(--r-radius-base);">
          Default
        </div>
      </r-loading>
      <r-loading loading spinner-size="large">
        <div style="padding: 40px; background: var(--r-color-fill-light); border-radius: var(--r-radius-base);">
          Large
        </div>
      </r-loading>
    </div>
  `,
};

export const DarkBackground: Story = {
  render: () => html`
    <r-loading loading background="dark" text="Loading...">
      <div style="padding: 40px; background: var(--r-color-fill-light); border-radius: var(--r-radius-base);">
        <p>Content with dark loading overlay</p>
      </div>
    </r-loading>
  `,
};

export const CustomBackground: Story = {
  render: () => html`
    <r-loading loading custom-background="rgba(99, 102, 241, 0.8)" text="Processing...">
      <div style="padding: 40px; background: var(--r-color-fill-light); border-radius: var(--r-radius-base);">
        <p>Content with custom background color</p>
      </div>
    </r-loading>
  `,
};

export const OnCard: Story = {
  render: () => html`
    <r-loading loading text="Fetching data...">
      <r-card header="User Profile">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        <p>Role: Administrator</p>
      </r-card>
    </r-loading>
  `,
};

export const OnTable: Story = {
  render: () => html`
    <r-loading loading>
      <r-table
        .data=${[
          { id: 1, name: 'John', email: 'john@example.com' },
          { id: 2, name: 'Jane', email: 'jane@example.com' },
        ]}
        .columns=${[
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' },
          { prop: 'email', label: 'Email' },
        ]}
      ></r-table>
    </r-loading>
  `,
};

export const Spinner: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <r-spinner size="small"></r-spinner>
      <r-spinner size="default"></r-spinner>
      <r-spinner size="large"></r-spinner>
    </div>
  `,
};

export const SpinnerColors: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <r-spinner color="primary"></r-spinner>
      <r-spinner color="success"></r-spinner>
      <r-spinner color="warning"></r-spinner>
      <r-spinner color="danger"></r-spinner>
      <r-spinner color="info"></r-spinner>
      <div style="background: var(--r-color-text-primary); padding: 16px; border-radius: var(--r-radius-base);">
        <r-spinner color="white"></r-spinner>
      </div>
    </div>
  `,
};

export const SpinnerInButton: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <r-button type="primary" disabled>
        <r-spinner size="small" color="white"></r-spinner>
        <span style="margin-left: 8px;">Loading...</span>
      </r-button>
      <r-button disabled>
        <r-spinner size="small" color="primary"></r-spinner>
        <span style="margin-left: 8px;">Processing</span>
      </r-button>
    </div>
  `,
};
