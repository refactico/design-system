import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Dropdown',
  tags: ['autodocs'],
  argTypes: {
    trigger: { control: 'select', options: ['hover', 'click', 'contextmenu'] },
    placement: { control: 'select', options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'] },
    disabled: { control: 'boolean' },
    hideOnClick: { control: 'boolean' },
    splitButton: { control: 'boolean' },
  },
  args: { onCommand: fn(), onClick: fn() },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <r-dropdown @command=${args.onCommand}>
      <r-button>
        Dropdown Menu
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 4px;">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </r-button>
      <r-dropdown-menu slot="dropdown">
        <r-dropdown-item command="a">Action 1</r-dropdown-item>
        <r-dropdown-item command="b">Action 2</r-dropdown-item>
        <r-dropdown-item command="c">Action 3</r-dropdown-item>
        <r-dropdown-item command="d" disabled>Disabled</r-dropdown-item>
        <r-dropdown-item command="e" divided>Divided Item</r-dropdown-item>
      </r-dropdown-menu>
    </r-dropdown>
  `,
};

export const ClickTrigger: Story = {
  render: (args) => html`
    <r-dropdown trigger="click" @command=${args.onCommand}>
      <r-button type="primary">
        Click to open
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 4px;">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </r-button>
      <r-dropdown-menu slot="dropdown">
        <r-dropdown-item command="edit">Edit</r-dropdown-item>
        <r-dropdown-item command="duplicate">Duplicate</r-dropdown-item>
        <r-dropdown-item command="archive">Archive</r-dropdown-item>
        <r-dropdown-item command="delete" divided>Delete</r-dropdown-item>
      </r-dropdown-menu>
    </r-dropdown>
  `,
};

export const SplitButton: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 16px;">
      <r-dropdown split-button type="primary" @command=${args.onCommand} @click=${args.onClick}>
        Primary Action
        <r-dropdown-menu slot="dropdown">
          <r-dropdown-item command="a">Option A</r-dropdown-item>
          <r-dropdown-item command="b">Option B</r-dropdown-item>
          <r-dropdown-item command="c">Option C</r-dropdown-item>
        </r-dropdown-menu>
      </r-dropdown>
      <r-dropdown split-button type="success" @command=${args.onCommand} @click=${args.onClick}>
        Success Action
        <r-dropdown-menu slot="dropdown">
          <r-dropdown-item command="a">Option A</r-dropdown-item>
          <r-dropdown-item command="b">Option B</r-dropdown-item>
        </r-dropdown-menu>
      </r-dropdown>
    </div>
  `,
};

export const Placements: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap; padding: 100px 50px;">
      <r-dropdown placement="top-start" @command=${args.onCommand}>
        <r-button>top-start</r-button>
        <r-dropdown-menu slot="dropdown">
          <r-dropdown-item command="1">Item 1</r-dropdown-item>
          <r-dropdown-item command="2">Item 2</r-dropdown-item>
        </r-dropdown-menu>
      </r-dropdown>
      <r-dropdown placement="top" @command=${args.onCommand}>
        <r-button>top</r-button>
        <r-dropdown-menu slot="dropdown">
          <r-dropdown-item command="1">Item 1</r-dropdown-item>
          <r-dropdown-item command="2">Item 2</r-dropdown-item>
        </r-dropdown-menu>
      </r-dropdown>
      <r-dropdown placement="top-end" @command=${args.onCommand}>
        <r-button>top-end</r-button>
        <r-dropdown-menu slot="dropdown">
          <r-dropdown-item command="1">Item 1</r-dropdown-item>
          <r-dropdown-item command="2">Item 2</r-dropdown-item>
        </r-dropdown-menu>
      </r-dropdown>
      <r-dropdown placement="bottom-start" @command=${args.onCommand}>
        <r-button>bottom-start</r-button>
        <r-dropdown-menu slot="dropdown">
          <r-dropdown-item command="1">Item 1</r-dropdown-item>
          <r-dropdown-item command="2">Item 2</r-dropdown-item>
        </r-dropdown-menu>
      </r-dropdown>
      <r-dropdown placement="bottom" @command=${args.onCommand}>
        <r-button>bottom</r-button>
        <r-dropdown-menu slot="dropdown">
          <r-dropdown-item command="1">Item 1</r-dropdown-item>
          <r-dropdown-item command="2">Item 2</r-dropdown-item>
        </r-dropdown-menu>
      </r-dropdown>
      <r-dropdown placement="bottom-end" @command=${args.onCommand}>
        <r-button>bottom-end</r-button>
        <r-dropdown-menu slot="dropdown">
          <r-dropdown-item command="1">Item 1</r-dropdown-item>
          <r-dropdown-item command="2">Item 2</r-dropdown-item>
        </r-dropdown-menu>
      </r-dropdown>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <r-dropdown disabled>
      <r-button>
        Disabled Dropdown
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 4px;">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </r-button>
      <r-dropdown-menu slot="dropdown">
        <r-dropdown-item command="a">Action 1</r-dropdown-item>
        <r-dropdown-item command="b">Action 2</r-dropdown-item>
      </r-dropdown-menu>
    </r-dropdown>
  `,
};

export const WithMaxHeight: Story = {
  render: (args) => html`
    <r-dropdown max-height="200px" @command=${args.onCommand}>
      <r-button>
        Scrollable Menu
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 4px;">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </r-button>
      <r-dropdown-menu slot="dropdown">
        <r-dropdown-item command="1">Item 1</r-dropdown-item>
        <r-dropdown-item command="2">Item 2</r-dropdown-item>
        <r-dropdown-item command="3">Item 3</r-dropdown-item>
        <r-dropdown-item command="4">Item 4</r-dropdown-item>
        <r-dropdown-item command="5">Item 5</r-dropdown-item>
        <r-dropdown-item command="6">Item 6</r-dropdown-item>
        <r-dropdown-item command="7">Item 7</r-dropdown-item>
        <r-dropdown-item command="8">Item 8</r-dropdown-item>
        <r-dropdown-item command="9">Item 9</r-dropdown-item>
        <r-dropdown-item command="10">Item 10</r-dropdown-item>
      </r-dropdown-menu>
    </r-dropdown>
  `,
};

export const UserMenu: Story = {
  render: (args) => html`
    <r-dropdown trigger="click" @command=${args.onCommand}>
      <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <r-avatar src="https://i.pravatar.cc/150?img=5" size="small"></r-avatar>
        <span>John Doe</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      <r-dropdown-menu slot="dropdown">
        <r-dropdown-item command="profile">Profile</r-dropdown-item>
        <r-dropdown-item command="settings">Settings</r-dropdown-item>
        <r-dropdown-item command="help">Help</r-dropdown-item>
        <r-dropdown-item command="logout" divided>Logout</r-dropdown-item>
      </r-dropdown-menu>
    </r-dropdown>
  `,
};
