import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Display value',
    },
    max: {
      control: 'number',
      description: 'Maximum value, shows {max}+ when exceeded',
    },
    isDot: {
      control: 'boolean',
      description: 'Display as a dot',
    },
    hidden: {
      control: 'boolean',
      description: 'Hide the badge',
    },
    type: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
      description: 'Badge type',
    },
    showZero: {
      control: 'boolean',
      description: 'Show badge when value is zero',
    },
    color: {
      control: 'color',
      description: 'Custom background color',
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic badge
export const Default: Story = {
  render: () => html`
    <r-badge value="12">
      <r-button>Comments</r-button>
    </r-badge>
  `,
};

// Badge types
export const Types: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <r-badge value="12" type="primary">
        <r-button>Primary</r-button>
      </r-badge>
      <r-badge value="12" type="success">
        <r-button>Success</r-button>
      </r-badge>
      <r-badge value="12" type="warning">
        <r-button>Warning</r-button>
      </r-badge>
      <r-badge value="12" type="danger">
        <r-button>Danger</r-button>
      </r-badge>
      <r-badge value="12" type="info">
        <r-button>Info</r-button>
      </r-badge>
    </div>
  `,
};

// Max value
export const MaxValue: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <r-badge .value=${10} .max=${10}>
        <r-button>Max 10</r-button>
      </r-badge>
      <r-badge .value=${99} .max=${99}>
        <r-button>Max 99</r-button>
      </r-badge>
      <r-badge .value=${100} .max=${99}>
        <r-button>Exceeds 99</r-button>
      </r-badge>
      <r-badge .value=${200} .max=${99}>
        <r-button>200 items</r-button>
      </r-badge>
    </div>
  `,
};

// Dot badge
export const DotBadge: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <r-badge is-dot type="danger">
        <r-button>Messages</r-button>
      </r-badge>
      <r-badge is-dot type="primary">
        <r-button>Notifications</r-button>
      </r-badge>
      <r-badge is-dot type="success">
        <r-button>Updates</r-button>
      </r-badge>
    </div>
  `,
};

// Show zero
export const ShowZero: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <r-badge .value=${0} show-zero>
        <r-button>Show Zero</r-button>
      </r-badge>
      <r-badge .value=${0} .showZero=${false}>
        <r-button>Hide Zero</r-button>
      </r-badge>
    </div>
  `,
};

// Custom color
export const CustomColor: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <r-badge value="new" color="#8b5cf6">
        <r-button>Purple</r-button>
      </r-badge>
      <r-badge value="hot" color="#ec4899">
        <r-button>Pink</r-button>
      </r-badge>
      <r-badge value="5" color="#06b6d4">
        <r-button>Cyan</r-button>
      </r-badge>
    </div>
  `,
};

// With offset
export const WithOffset: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <r-badge value="8" .offset=${[0, 0]}>
        <r-button>Default</r-button>
      </r-badge>
      <r-badge value="8" .offset=${[-10, 0]}>
        <r-button>Left offset</r-button>
      </r-badge>
      <r-badge value="8" .offset=${[0, 10]}>
        <r-button>Down offset</r-button>
      </r-badge>
    </div>
  `,
};

// Text value
export const TextValue: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <r-badge value="new">
        <r-button>New</r-button>
      </r-badge>
      <r-badge value="hot" type="warning">
        <r-button>Hot</r-button>
      </r-badge>
      <r-badge value="beta" type="info">
        <r-button>Beta</r-button>
      </r-badge>
    </div>
  `,
};

// On avatars
export const OnAvatars: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <r-badge value="5" type="danger">
        <r-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
      </r-badge>
      <r-badge is-dot type="success">
        <r-avatar>JD</r-avatar>
      </r-badge>
      <r-badge value="99+" type="primary">
        <r-avatar icon="👤"></r-avatar>
      </r-badge>
    </div>
  `,
};

// Hidden badge
export const HiddenBadge: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <r-badge value="12">
        <r-button>Visible</r-button>
      </r-badge>
      <r-badge value="12" hidden>
        <r-button>Hidden</r-button>
      </r-badge>
    </div>
  `,
};
