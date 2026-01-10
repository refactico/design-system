import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/ButtonGroup',
  component: 'r-button-group',
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Display direction',
    },
  },
  args: {
    direction: 'horizontal',
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj;

// Helper to create a button with event listener
const createButton = (
  label: string,
  attrs: Record<string, string | boolean> = {},
  onClick?: (info: any) => void,
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
    button.addEventListener('click', () => {
      onClick({
        label,
        type: attrs.type || 'default',
        ...attrs,
      });
    });
  }
  return button;
};

// Helper to create a button group
const createButtonGroup = (
  buttons: Array<{ label: string; attrs?: Record<string, string | boolean> }>,
  groupAttrs: Record<string, string> = {},
  onClick?: (info: any) => void,
) => {
  const group = document.createElement('r-button-group');
  Object.entries(groupAttrs).forEach(([key, value]) => {
    group.setAttribute(key, value);
  });
  buttons.forEach(({ label, attrs }) => {
    group.appendChild(createButton(label, attrs || {}, onClick));
  });
  return group;
};

// Helper to create multiple groups in a column
const createGroupColumn = (
  groups: Array<{
    buttons: Array<{ label: string; attrs?: Record<string, string | boolean> }>;
    groupAttrs?: Record<string, string>;
  }>,
  onClick?: (info: any) => void,
) => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  groups.forEach(({ buttons, groupAttrs }) => {
    container.appendChild(createButtonGroup(buttons, groupAttrs, onClick));
  });
  return container;
};

export const Horizontal: Story = {
  render: (args) =>
    createButtonGroup(
      [
        { label: 'Previous', attrs: { type: 'primary' } },
        { label: 'Next', attrs: { type: 'primary' } },
      ],
      { direction: args.direction },
      args.onClick,
    ),
};

export const MultipleButtons: Story = {
  render: (args) =>
    createButtonGroup(
      [
        { label: 'One', attrs: {} },
        { label: 'Two', attrs: {} },
        { label: 'Three', attrs: {} },
        { label: 'Four', attrs: {} },
      ],
      { direction: args.direction },
      args.onClick,
    ),
};

export const Vertical: Story = {
  render: (args) =>
    createButtonGroup(
      [
        { label: 'Top', attrs: { type: 'primary' } },
        { label: 'Middle', attrs: { type: 'primary' } },
        { label: 'Bottom', attrs: { type: 'primary' } },
      ],
      { direction: 'vertical' },
      args.onClick,
    ),
  args: {
    direction: 'vertical',
  },
};

export const DifferentTypes: Story = {
  render: (args) =>
    createGroupColumn(
      [
        {
          buttons: [
            { label: 'Primary 1', attrs: { type: 'primary' } },
            { label: 'Primary 2', attrs: { type: 'primary' } },
          ],
        },
        {
          buttons: [
            { label: 'Success 1', attrs: { type: 'success' } },
            { label: 'Success 2', attrs: { type: 'success' } },
          ],
        },
        {
          buttons: [
            { label: 'Warning 1', attrs: { type: 'warning' } },
            { label: 'Warning 2', attrs: { type: 'warning' } },
          ],
        },
        {
          buttons: [
            { label: 'Danger 1', attrs: { type: 'danger' } },
            { label: 'Danger 2', attrs: { type: 'danger' } },
          ],
        },
        {
          buttons: [
            { label: 'Info 1', attrs: { type: 'info' } },
            { label: 'Info 2', attrs: { type: 'info' } },
          ],
        },
      ],
      args.onClick,
    ),
};

export const MixedTypes: Story = {
  render: (args) =>
    createButtonGroup(
      [
        { label: 'Edit', attrs: { type: 'primary' } },
        { label: 'Share', attrs: { type: 'warning' } },
        { label: 'Delete', attrs: { type: 'danger' } },
      ],
      {},
      args.onClick,
    ),
};

export const WithIcons: Story = {
  render: (args) =>
    createButtonGroup(
      [
        { label: '← Prev', attrs: { type: 'primary' } },
        { label: 'Next →', attrs: { type: 'primary' } },
      ],
      {},
      args.onClick,
    ),
};

export const PaginationExample: Story = {
  render: (args) =>
    createButtonGroup(
      [
        { label: 'Page 1', attrs: {} },
        { label: 'Page 2', attrs: {} },
        { label: 'Page 3 (active)', attrs: { type: 'primary' } },
        { label: 'Page 4', attrs: {} },
        { label: 'Page 5', attrs: {} },
      ],
      {},
      args.onClick,
    ),
};

export const PlainButtons: Story = {
  render: (args) =>
    createButtonGroup(
      [
        { label: 'Plain 1', attrs: { type: 'primary', plain: true } },
        { label: 'Plain 2', attrs: { type: 'primary', plain: true } },
        { label: 'Plain 3', attrs: { type: 'primary', plain: true } },
      ],
      {},
      args.onClick,
    ),
};

export const RoundButtons: Story = {
  render: (args) =>
    createButtonGroup(
      [
        { label: 'Round 1', attrs: { type: 'primary', round: true } },
        { label: 'Round 2', attrs: { type: 'primary', round: true } },
        { label: 'Round 3', attrs: { type: 'primary', round: true } },
      ],
      {},
      args.onClick,
    ),
};

export const Sizes: Story = {
  render: (args) =>
    createGroupColumn(
      [
        {
          buttons: [
            { label: 'Large 1', attrs: { type: 'primary', size: 'large' } },
            { label: 'Large 2', attrs: { type: 'primary', size: 'large' } },
          ],
        },
        {
          buttons: [
            { label: 'Default 1', attrs: { type: 'primary' } },
            { label: 'Default 2', attrs: { type: 'primary' } },
          ],
        },
        {
          buttons: [
            { label: 'Small 1', attrs: { type: 'primary', size: 'small' } },
            { label: 'Small 2', attrs: { type: 'primary', size: 'small' } },
          ],
        },
      ],
      args.onClick,
    ),
};
