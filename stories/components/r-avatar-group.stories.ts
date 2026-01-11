import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Avatar Group',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'default', 'small'],
      description: 'Size of avatars in the group',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Shape of avatars in the group',
    },
    collapseAvatars: {
      control: 'boolean',
      description: 'Whether to collapse excess avatars',
    },
    maxCollapseAvatars: {
      control: 'number',
      description: 'Max avatars to show before collapsing',
    },
    collapseAvatarsTooltip: {
      control: 'boolean',
      description: 'Show tooltip with collapsed avatars on hover',
    },
    effect: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Tooltip theme',
    },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'],
      description: 'Tooltip placement',
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic avatar group
export const Default: Story = {
  render: () => html`
    <r-avatar-group>
      <r-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
      <r-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></r-avatar>
      <r-avatar>AB</r-avatar>
      <r-avatar icon="👤"></r-avatar>
    </r-avatar-group>
  `,
};

// Different sizes
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: var(--r-color-text-secondary);">Large</h4>
        <r-avatar-group size="large">
          <r-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
          <r-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></r-avatar>
          <r-avatar>AB</r-avatar>
        </r-avatar-group>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: var(--r-color-text-secondary);">Default</h4>
        <r-avatar-group size="default">
          <r-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
          <r-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></r-avatar>
          <r-avatar>AB</r-avatar>
        </r-avatar-group>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: var(--r-color-text-secondary);">Small</h4>
        <r-avatar-group size="small">
          <r-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
          <r-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></r-avatar>
          <r-avatar>AB</r-avatar>
        </r-avatar-group>
      </div>
    </div>
  `,
};

// With collapse
export const WithCollapse: Story = {
  render: () => html`
    <r-avatar-group collapse-avatars max-collapse-avatars="3">
      <r-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
      <r-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></r-avatar>
      <r-avatar>AB</r-avatar>
      <r-avatar>CD</r-avatar>
      <r-avatar>EF</r-avatar>
      <r-avatar>GH</r-avatar>
    </r-avatar-group>
  `,
};

// With collapse and tooltip
export const WithCollapseTooltip: Story = {
  render: () => html`
    <div style="padding: 60px 20px;">
      <r-avatar-group 
        collapse-avatars 
        collapse-avatars-tooltip 
        max-collapse-avatars="3"
        effect="light"
        placement="top"
      >
        <r-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
        <r-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></r-avatar>
        <r-avatar>AB</r-avatar>
        <r-avatar>CD</r-avatar>
        <r-avatar>EF</r-avatar>
        <r-avatar>GH</r-avatar>
      </r-avatar-group>
      <p style="margin-top: 16px; font-size: 14px; color: var(--r-color-text-secondary);">
        Hover over the +3 to see collapsed avatars
      </p>
    </div>
  `,
};

// Square shape group
export const SquareShape: Story = {
  render: () => html`
    <r-avatar-group shape="square">
      <r-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
      <r-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></r-avatar>
      <r-avatar>AB</r-avatar>
      <r-avatar icon="👤"></r-avatar>
    </r-avatar-group>
  `,
};

// Team members example
export const TeamMembers: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 12px;">
      <r-avatar-group collapse-avatars collapse-avatars-tooltip max-collapse-avatars="4">
        <r-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
        <r-avatar>JD</r-avatar>
        <r-avatar>SM</r-avatar>
        <r-avatar>AK</r-avatar>
        <r-avatar>LM</r-avatar>
        <r-avatar>RW</r-avatar>
        <r-avatar>TC</r-avatar>
      </r-avatar-group>
      <span style="font-size: 14px; color: var(--r-color-text-regular);">7 team members</span>
    </div>
  `,
};
