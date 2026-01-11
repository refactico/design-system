import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'textarea'],
      description: 'Input type',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Input size',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
    showPassword: {
      control: 'boolean',
      description: 'Show password toggle',
    },
    maxlength: {
      control: 'number',
      description: 'Max length',
    },
    showWordLimit: {
      control: 'boolean',
      description: 'Show word count',
    },
  },
  args: {
    onInput: fn(),
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClear: fn(),
  },
};

export default meta;
type Story = StoryObj;

// Basic input
export const Default: Story = {
  render: (args) => html`
    <r-input
      placeholder="Please input"
      @input=${args.onInput}
      @change=${args.onChange}
    ></r-input>
  `,
};

// Disabled
export const Disabled: Story = {
  render: () => html` <r-input placeholder="Disabled input" disabled value="Disabled"></r-input> `,
};

// Readonly
export const Readonly: Story = {
  render: () => html`
    <r-input placeholder="Readonly input" readonly value="Readonly content"></r-input>
  `,
};

// Clearable
export const Clearable: Story = {
  render: (args) => html`
    <r-input
      placeholder="Type something..."
      clearable
      value="Clear me"
      @clear=${args.onClear}
    ></r-input>
  `,
};

// Password
export const Password: Story = {
  render: () => html`
    <r-input type="password" placeholder="Enter password" show-password></r-input>
  `,
};

// With icons
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-input placeholder="Search..." prefix-icon="🔍"></r-input>
      <r-input placeholder="Enter date" suffix-icon="📅"></r-input>
      <r-input placeholder="Email" prefix-icon="✉️" suffix-icon="✓"></r-input>
    </div>
  `,
};

// Sizes
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-input size="large" placeholder="Large input"></r-input>
      <r-input size="default" placeholder="Default input"></r-input>
      <r-input size="small" placeholder="Small input"></r-input>
    </div>
  `,
};

// With prepend/append
export const WithPrependAppend: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-input placeholder="website">
        <span slot="prepend">https://</span>
      </r-input>
      <r-input placeholder="domain">
        <span slot="append">.com</span>
      </r-input>
      <r-input placeholder="website">
        <span slot="prepend">https://</span>
        <span slot="append">.com</span>
      </r-input>
    </div>
  `,
};

// Word limit
export const WordLimit: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <r-input
        placeholder="Max 10 characters"
        .maxlength=${10}
        show-word-limit
        style="margin-bottom: 8px;"
      ></r-input>
    </div>
  `,
};

// Textarea
export const Textarea: Story = {
  render: (args) => html`
    <r-input
      type="textarea"
      placeholder="Enter your message..."
      .rows=${4}
      @input=${args.onInput}
    ></r-input>
  `,
};

// Textarea with word limit
export const TextareaWithLimit: Story = {
  render: () => html`
    <r-input
      type="textarea"
      placeholder="Enter description (max 100 characters)"
      .maxlength=${100}
      show-word-limit
      .rows=${4}
    ></r-input>
  `,
};

// All features combined
export const AllFeatures: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <div>
        <label
          style="display: block; margin-bottom: 8px; font-weight: 500; color: var(--r-color-text-primary);"
          >Username</label
        >
        <r-input placeholder="Enter username" prefix-icon="👤" clearable></r-input>
      </div>
      <div>
        <label
          style="display: block; margin-bottom: 8px; font-weight: 500; color: var(--r-color-text-primary);"
          >Password</label
        >
        <r-input
          type="password"
          placeholder="Enter password"
          prefix-icon="🔒"
          show-password
        ></r-input>
      </div>
      <div>
        <label
          style="display: block; margin-bottom: 8px; font-weight: 500; color: var(--r-color-text-primary);"
          >Email</label
        >
        <r-input type="email" placeholder="Enter email" prefix-icon="✉️" clearable></r-input>
      </div>
      <div>
        <label
          style="display: block; margin-bottom: 8px; font-weight: 500; color: var(--r-color-text-primary);"
          >Website</label
        >
        <r-input placeholder="yoursite">
          <span slot="prepend">https://</span>
          <span slot="append">.com</span>
        </r-input>
      </div>
      <div>
        <label
          style="display: block; margin-bottom: 8px; font-weight: 500; color: var(--r-color-text-primary);"
          >Bio</label
        >
        <r-input
          type="textarea"
          placeholder="Tell us about yourself..."
          .maxlength=${200}
          show-word-limit
          .rows=${3}
        ></r-input>
      </div>
      <r-button type="primary" @click=${args.onInput}>Submit</r-button>
    </div>
  `,
};

// In a card
export const InCard: Story = {
  render: () => html`
    <r-card header="Login" style="max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <r-input placeholder="Email" prefix-icon="✉️" clearable></r-input>
        <r-input type="password" placeholder="Password" prefix-icon="🔒" show-password></r-input>
        <r-button type="primary" style="margin-top: 8px;">Sign In</r-button>
      </div>
    </r-card>
  `,
};
