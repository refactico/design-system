import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Alert',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['success', 'warning', 'error', 'info'] },
    effect: { control: 'select', options: ['light', 'dark'] },
    closable: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    center: { control: 'boolean' },
  },
  args: { onClose: fn() },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<r-alert alert-title="This is an info alert"></r-alert>`,
};

export const Types: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-alert type="success" alert-title="Success! Your changes have been saved."></r-alert>
      <r-alert type="warning" alert-title="Warning! Please review your input."></r-alert>
      <r-alert type="error" alert-title="Error! Something went wrong."></r-alert>
      <r-alert type="info" alert-title="Info: This is a helpful tip."></r-alert>
    </div>
  `,
};

export const WithDescription: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-alert 
        type="success" 
        alert-title="Success" 
        description="Your account has been created successfully. You can now log in with your credentials."
      ></r-alert>
      <r-alert 
        type="warning" 
        alert-title="Warning" 
        description="Your session will expire in 5 minutes. Please save your work."
      ></r-alert>
      <r-alert 
        type="error" 
        alert-title="Error" 
        description="Failed to connect to the server. Please check your internet connection and try again."
      ></r-alert>
    </div>
  `,
};

export const DarkEffect: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-alert type="success" effect="dark" alert-title="Success alert with dark effect"></r-alert>
      <r-alert type="warning" effect="dark" alert-title="Warning alert with dark effect"></r-alert>
      <r-alert type="error" effect="dark" alert-title="Error alert with dark effect"></r-alert>
      <r-alert type="info" effect="dark" alert-title="Info alert with dark effect"></r-alert>
    </div>
  `,
};

export const NotClosable: Story = {
  render: () => html`
    <r-alert 
      type="info" 
      alert-title="This alert cannot be closed" 
      .closable=${false}
    ></r-alert>
  `,
};

export const NoIcon: Story = {
  render: () => html`
    <r-alert 
      type="success" 
      alert-title="Alert without icon" 
      .showIcon=${false}
    ></r-alert>
  `,
};

export const Centered: Story = {
  render: () => html`
    <r-alert 
      type="success" 
      alert-title="Centered alert" 
      center
    ></r-alert>
  `,
};

export const CustomContent: Story = {
  render: () => html`
    <r-alert type="info">
      <span slot="title">
        <strong>Custom Title</strong> with HTML
      </span>
      <span slot="description">
        This alert has <a href="#" style="color: inherit; text-decoration: underline;">custom content</a> 
        including links and other elements.
      </span>
    </r-alert>
  `,
};
