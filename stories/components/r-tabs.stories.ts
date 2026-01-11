import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['line', 'card', 'border-card'] },
    tabPosition: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    stretch: { control: 'boolean' },
    closable: { control: 'boolean' },
    addable: { control: 'boolean' },
  },
  args: { onTabChange: fn(), onTabRemove: fn(), onTabAdd: fn() },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <r-tabs value="user" @tabChange=${args.onTabChange}>
      <r-tab-pane name="user" label="User">User content</r-tab-pane>
      <r-tab-pane name="config" label="Config">Config content</r-tab-pane>
      <r-tab-pane name="role" label="Role">Role content</r-tab-pane>
      <r-tab-pane name="task" label="Task">Task content</r-tab-pane>
    </r-tabs>
  `,
};

export const CardType: Story = {
  render: (args) => html`
    <r-tabs value="user" type="card" @tabChange=${args.onTabChange}>
      <r-tab-pane name="user" label="User">User content</r-tab-pane>
      <r-tab-pane name="config" label="Config">Config content</r-tab-pane>
      <r-tab-pane name="role" label="Role">Role content</r-tab-pane>
      <r-tab-pane name="task" label="Task">Task content</r-tab-pane>
    </r-tabs>
  `,
};

export const BorderCardType: Story = {
  render: (args) => html`
    <r-tabs value="user" type="border-card" @tabChange=${args.onTabChange}>
      <r-tab-pane name="user" label="User">
        <p>User management content goes here.</p>
      </r-tab-pane>
      <r-tab-pane name="config" label="Config">
        <p>Configuration settings content goes here.</p>
      </r-tab-pane>
      <r-tab-pane name="role" label="Role">
        <p>Role management content goes here.</p>
      </r-tab-pane>
    </r-tabs>
  `,
};

export const DisabledTab: Story = {
  render: (args) => html`
    <r-tabs value="user" @tabChange=${args.onTabChange}>
      <r-tab-pane name="user" label="User">User content</r-tab-pane>
      <r-tab-pane name="config" label="Config" disabled>Config content</r-tab-pane>
      <r-tab-pane name="role" label="Role">Role content</r-tab-pane>
    </r-tabs>
  `,
};

export const ClosableTabs: Story = {
  render: (args) => html`
    <r-tabs value="tab1" type="card" closable @tabChange=${args.onTabChange} @tabRemove=${args.onTabRemove}>
      <r-tab-pane name="tab1" label="Tab 1">Content of Tab 1</r-tab-pane>
      <r-tab-pane name="tab2" label="Tab 2">Content of Tab 2</r-tab-pane>
      <r-tab-pane name="tab3" label="Tab 3">Content of Tab 3</r-tab-pane>
    </r-tabs>
  `,
};

export const AddableTabs: Story = {
  render: (args) => html`
    <r-tabs 
      value="tab1" 
      type="card" 
      closable 
      addable 
      @tabChange=${args.onTabChange} 
      @tabRemove=${args.onTabRemove}
      @tabAdd=${args.onTabAdd}
    >
      <r-tab-pane name="tab1" label="Tab 1">Content of Tab 1</r-tab-pane>
      <r-tab-pane name="tab2" label="Tab 2">Content of Tab 2</r-tab-pane>
    </r-tabs>
  `,
};

export const WithContent: Story = {
  render: (args) => html`
    <r-tabs value="overview" @tabChange=${args.onTabChange}>
      <r-tab-pane name="overview" label="Overview">
        <r-card>
          <h3 style="margin: 0 0 16px;">Project Overview</h3>
          <p style="color: var(--r-color-text-secondary); margin: 0;">
            This is the overview section with detailed information about the project.
          </p>
        </r-card>
      </r-tab-pane>
      <r-tab-pane name="settings" label="Settings">
        <r-form label-position="top">
          <r-form-item label="Project Name">
            <r-input placeholder="Enter project name"></r-input>
          </r-form-item>
          <r-form-item label="Description">
            <r-input type="textarea" placeholder="Enter description"></r-input>
          </r-form-item>
          <r-form-item>
            <r-button type="primary">Save</r-button>
          </r-form-item>
        </r-form>
      </r-tab-pane>
      <r-tab-pane name="members" label="Members">
        <div style="display: flex; gap: 16px;">
          <r-avatar src="https://i.pravatar.cc/150?img=1"></r-avatar>
          <r-avatar src="https://i.pravatar.cc/150?img=2"></r-avatar>
          <r-avatar src="https://i.pravatar.cc/150?img=3"></r-avatar>
        </div>
      </r-tab-pane>
    </r-tabs>
  `,
};
