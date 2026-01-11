import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text', description: 'Tooltip content' },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    effect: { control: 'select', options: ['dark', 'light'] },
    trigger: { control: 'select', options: ['hover', 'click', 'focus'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="padding: 50px; text-align: center;">
      <r-tooltip content="This is a tooltip">
        <r-button>Hover me</r-button>
      </r-tooltip>
    </div>
  `,
};

export const Placements: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; align-items: center; gap: 40px; padding: 60px;">
      <r-tooltip content="Top tooltip" placement="top">
        <r-button>Top</r-button>
      </r-tooltip>
      <div style="display: flex; gap: 100px;">
        <r-tooltip content="Left tooltip" placement="left">
          <r-button>Left</r-button>
        </r-tooltip>
        <r-tooltip content="Right tooltip" placement="right">
          <r-button>Right</r-button>
        </r-tooltip>
      </div>
      <r-tooltip content="Bottom tooltip" placement="bottom">
        <r-button>Bottom</r-button>
      </r-tooltip>
    </div>
  `,
};

export const Effects: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; padding: 50px;">
      <r-tooltip content="Dark tooltip (default)" effect="dark">
        <r-button>Dark</r-button>
      </r-tooltip>
      <r-tooltip content="Light tooltip" effect="light">
        <r-button>Light</r-button>
      </r-tooltip>
    </div>
  `,
};

export const Triggers: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; padding: 50px;">
      <r-tooltip content="Hover to show" trigger="hover">
        <r-button>Hover</r-button>
      </r-tooltip>
      <r-tooltip content="Click to show" trigger="click">
        <r-button>Click</r-button>
      </r-tooltip>
      <r-tooltip content="Focus to show" trigger="focus">
        <r-input placeholder="Focus me"></r-input>
      </r-tooltip>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="padding: 50px;">
      <r-tooltip content="This won't show" disabled>
        <r-button>Disabled tooltip</r-button>
      </r-tooltip>
    </div>
  `,
};

export const WithMaxWidth: Story = {
  render: () => html`
    <div style="padding: 50px;">
      <r-tooltip 
        content="This is a very long tooltip content that will wrap to multiple lines because we set a max width on it."
        .maxWidth=${200}
      >
        <r-button>Long content</r-button>
      </r-tooltip>
    </div>
  `,
};

export const OnIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; padding: 50px;">
      <r-tooltip content="Edit">
        <r-button circle>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </r-button>
      </r-tooltip>
      <r-tooltip content="Delete">
        <r-button circle type="danger">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </r-button>
      </r-tooltip>
      <r-tooltip content="Download">
        <r-button circle type="success">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </r-button>
      </r-tooltip>
    </div>
  `,
};
