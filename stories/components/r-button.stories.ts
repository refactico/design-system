import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Button',
  component: 'r-button',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: 'Button type (color theme)',
    },
    size: {
      control: 'select',
      options: ['large', 'default', 'small'],
      description: 'Button size',
    },
    plain: { control: 'boolean', description: 'Plain style' },
    text: { control: 'boolean', description: 'Text button' },
    bg: { control: 'boolean', description: 'Text button with background' },
    link: { control: 'boolean', description: 'Link button style' },
    round: { control: 'boolean', description: 'Round button' },
    circle: { control: 'boolean', description: 'Circle button' },
    loading: { control: 'boolean', description: 'Loading state' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    color: { control: 'color', description: 'Custom button color' },
    label: { control: 'text', description: 'Button label' },
  },
  args: {
    type: 'default',
    size: 'default',
    plain: false,
    text: false,
    bg: false,
    link: false,
    round: false,
    circle: false,
    loading: false,
    disabled: false,
    label: 'Button',
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj;

// Helper to create a button with event listener
const createButton = (
  label: string,
  attrs: Record<string, string | boolean> = {},
  onClick?: (e: Event) => void,
) => {
  const button = document.createElement('r-button');
  Object.entries(attrs).forEach(([key, value]) => {
    if (typeof value === 'boolean' && value) {
      button.setAttribute(key, '');
    } else if (typeof value === 'string') {
      button.setAttribute(key, value);
    }
  });
  button.textContent = label;
  if (onClick) {
    const handler = () => {
      // Call onClick with button info
      onClick({
        label,
        type: attrs.type || 'default',
        ...attrs,
      } as any);
    };
    button.addEventListener('click', handler);
  }
  return button;
};

// Helper to create a row of buttons
const createButtonRow = (
  buttons: Array<{ label: string; attrs?: Record<string, string | boolean> }>,
  onClick?: (e: Event) => void,
) => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 12px; flex-wrap: wrap; align-items: center;';
  buttons.forEach(({ label, attrs }) => {
    container.appendChild(createButton(label, attrs || {}, onClick));
  });
  return container;
};

// Helper to create multiple rows
const createButtonGrid = (
  rows: Array<Array<{ label: string; attrs?: Record<string, string | boolean> }>>,
  onClick?: (e: Event) => void,
) => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  rows.forEach((buttons) => {
    container.appendChild(createButtonRow(buttons, onClick));
  });
  return container;
};

// Single button template
const singleButtonTemplate = (args: any) => {
  const attrs: Record<string, string | boolean> = {
    type: args.type || 'default',
    size: args.size || 'default',
  };
  if (args.plain) attrs.plain = true;
  if (args.text) attrs.text = true;
  if (args.bg) attrs.bg = true;
  if (args.link) attrs.link = true;
  if (args.round) attrs.round = true;
  if (args.circle) attrs.circle = true;
  if (args.loading) attrs.loading = true;
  if (args.disabled) attrs.disabled = true;
  if (args.color) attrs.color = args.color;

  return createButton(args.label || 'Button', attrs, args.onClick);
};

// === INDIVIDUAL BUTTON STORIES ===

export const Default: Story = {
  render: singleButtonTemplate,
  args: { label: 'Default Button' },
};

export const Primary: Story = {
  render: singleButtonTemplate,
  args: { type: 'primary', label: 'Primary Button' },
};

export const Success: Story = {
  render: singleButtonTemplate,
  args: { type: 'success', label: 'Success Button' },
};

export const Warning: Story = {
  render: singleButtonTemplate,
  args: { type: 'warning', label: 'Warning Button' },
};

export const Danger: Story = {
  render: singleButtonTemplate,
  args: { type: 'danger', label: 'Danger Button' },
};

export const Info: Story = {
  render: singleButtonTemplate,
  args: { type: 'info', label: 'Info Button' },
};

// === GALLERY STORIES ===

export const AllTypes: Story = {
  render: (args) =>
    createButtonRow(
      [
        { label: 'Default', attrs: {} },
        { label: 'Primary', attrs: { type: 'primary' } },
        { label: 'Success', attrs: { type: 'success' } },
        { label: 'Warning', attrs: { type: 'warning' } },
        { label: 'Danger', attrs: { type: 'danger' } },
        { label: 'Info', attrs: { type: 'info' } },
      ],
      args.onClick,
    ),
};

export const Plain: Story = {
  render: (args) =>
    createButtonRow(
      [
        { label: 'Default', attrs: { plain: true } },
        { label: 'Primary', attrs: { type: 'primary', plain: true } },
        { label: 'Success', attrs: { type: 'success', plain: true } },
        { label: 'Warning', attrs: { type: 'warning', plain: true } },
        { label: 'Danger', attrs: { type: 'danger', plain: true } },
        { label: 'Info', attrs: { type: 'info', plain: true } },
      ],
      args.onClick,
    ),
};

export const Round: Story = {
  render: (args) =>
    createButtonRow(
      [
        { label: 'Default', attrs: { round: true } },
        { label: 'Primary', attrs: { type: 'primary', round: true } },
        { label: 'Success', attrs: { type: 'success', round: true } },
        { label: 'Warning', attrs: { type: 'warning', round: true } },
        { label: 'Danger', attrs: { type: 'danger', round: true } },
        { label: 'Info', attrs: { type: 'info', round: true } },
      ],
      args.onClick,
    ),
};

export const Circle: Story = {
  render: (args) =>
    createButtonRow(
      [
        { label: '+', attrs: { circle: true } },
        { label: '✓', attrs: { type: 'primary', circle: true } },
        { label: '★', attrs: { type: 'success', circle: true } },
        { label: '!', attrs: { type: 'warning', circle: true } },
        { label: '✕', attrs: { type: 'danger', circle: true } },
        { label: '?', attrs: { type: 'info', circle: true } },
      ],
      args.onClick,
    ),
};

export const Disabled: Story = {
  render: (args) =>
    createButtonGrid(
      [
        [
          { label: 'Default', attrs: { disabled: true } },
          { label: 'Primary', attrs: { type: 'primary', disabled: true } },
          { label: 'Success', attrs: { type: 'success', disabled: true } },
          { label: 'Warning', attrs: { type: 'warning', disabled: true } },
          { label: 'Danger', attrs: { type: 'danger', disabled: true } },
          { label: 'Info', attrs: { type: 'info', disabled: true } },
        ],
        [
          { label: 'Plain', attrs: { plain: true, disabled: true } },
          { label: 'Primary Plain', attrs: { type: 'primary', plain: true, disabled: true } },
        ],
      ],
      args.onClick,
    ),
};

export const Text: Story = {
  render: (args) =>
    createButtonGrid(
      [
        [
          { label: 'Default', attrs: { text: true } },
          { label: 'Primary', attrs: { type: 'primary', text: true } },
          { label: 'Success', attrs: { type: 'success', text: true } },
          { label: 'Warning', attrs: { type: 'warning', text: true } },
          { label: 'Danger', attrs: { type: 'danger', text: true } },
          { label: 'Info', attrs: { type: 'info', text: true } },
        ],
        [
          { label: 'With Background', attrs: { text: true, bg: true } },
          { label: 'Primary BG', attrs: { type: 'primary', text: true, bg: true } },
        ],
        [
          { label: 'Disabled', attrs: { text: true, disabled: true } },
          { label: 'Primary Disabled', attrs: { type: 'primary', text: true, disabled: true } },
        ],
      ],
      args.onClick,
    ),
};

export const Link: Story = {
  render: (args) =>
    createButtonGrid(
      [
        [
          { label: 'Default', attrs: { link: true } },
          { label: 'Primary', attrs: { type: 'primary', link: true } },
          { label: 'Success', attrs: { type: 'success', link: true } },
          { label: 'Warning', attrs: { type: 'warning', link: true } },
          { label: 'Danger', attrs: { type: 'danger', link: true } },
          { label: 'Info', attrs: { type: 'info', link: true } },
        ],
        [
          { label: 'Disabled', attrs: { link: true, disabled: true } },
          { label: 'Primary Disabled', attrs: { type: 'primary', link: true, disabled: true } },
        ],
      ],
      args.onClick,
    ),
};

export const Loading: Story = {
  render: (args) =>
    createButtonRow(
      [
        { label: 'Loading', attrs: { loading: true } },
        { label: 'Loading', attrs: { type: 'primary', loading: true } },
        { label: 'Loading', attrs: { type: 'success', loading: true } },
      ],
      args.onClick,
    ),
};

export const Sizes: Story = {
  render: (args) =>
    createButtonGrid(
      [
        [
          { label: 'Large', attrs: { size: 'large' } },
          { label: 'Default', attrs: {} },
          { label: 'Small', attrs: { size: 'small' } },
        ],
        [
          { label: 'Large', attrs: { type: 'primary', size: 'large' } },
          { label: 'Default', attrs: { type: 'primary' } },
          { label: 'Small', attrs: { type: 'primary', size: 'small' } },
        ],
        [
          { label: 'Large Round', attrs: { type: 'primary', size: 'large', round: true } },
          { label: 'Default Round', attrs: { type: 'primary', round: true } },
          { label: 'Small Round', attrs: { type: 'primary', size: 'small', round: true } },
        ],
        [
          { label: '+', attrs: { type: 'primary', size: 'large', circle: true } },
          { label: '+', attrs: { type: 'primary', circle: true } },
          { label: '+', attrs: { type: 'primary', size: 'small', circle: true } },
        ],
      ],
      args.onClick,
    ),
};

export const CustomColor: Story = {
  render: (args) =>
    createButtonGrid(
      [
        [
          { label: 'Purple', attrs: { color: '#8b5cf6' } },
          { label: 'Pink', attrs: { color: '#ec4899' } },
          { label: 'Cyan', attrs: { color: '#06b6d4' } },
          { label: 'Lime', attrs: { color: '#84cc16' } },
        ],
        [
          { label: 'Purple Plain', attrs: { color: '#8b5cf6', plain: true } },
          { label: 'Pink Plain', attrs: { color: '#ec4899', plain: true } },
          { label: 'Cyan Plain', attrs: { color: '#06b6d4', plain: true } },
          { label: 'Lime Plain', attrs: { color: '#84cc16', plain: true } },
        ],
      ],
      args.onClick,
    ),
};

export const CustomTag: Story = {
  render: (args) =>
    createButtonRow(
      [
        { label: 'Link as Button', attrs: { tag: 'a' } },
        { label: 'Div as Button', attrs: { type: 'primary', tag: 'div' } },
      ],
      args.onClick,
    ),
};
