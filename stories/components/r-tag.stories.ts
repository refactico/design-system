import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Tag',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['', 'primary', 'success', 'warning', 'danger', 'info'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    effect: { control: 'select', options: ['light', 'dark', 'plain'] },
    closable: { control: 'boolean' },
    round: { control: 'boolean' },
  },
  args: { onClose: fn(), onClick: fn() },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<r-tag>Tag</r-tag>`,
};

export const Types: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <r-tag>Default</r-tag>
      <r-tag type="primary">Primary</r-tag>
      <r-tag type="success">Success</r-tag>
      <r-tag type="warning">Warning</r-tag>
      <r-tag type="danger">Danger</r-tag>
      <r-tag type="info">Info</r-tag>
    </div>
  `,
};

export const Effects: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Light (default)</p>
        <div style="display: flex; gap: 8px;">
          <r-tag type="primary" effect="light">Primary</r-tag>
          <r-tag type="success" effect="light">Success</r-tag>
          <r-tag type="warning" effect="light">Warning</r-tag>
          <r-tag type="danger" effect="light">Danger</r-tag>
        </div>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Dark</p>
        <div style="display: flex; gap: 8px;">
          <r-tag type="primary" effect="dark">Primary</r-tag>
          <r-tag type="success" effect="dark">Success</r-tag>
          <r-tag type="warning" effect="dark">Warning</r-tag>
          <r-tag type="danger" effect="dark">Danger</r-tag>
        </div>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Plain</p>
        <div style="display: flex; gap: 8px;">
          <r-tag type="primary" effect="plain">Primary</r-tag>
          <r-tag type="success" effect="plain">Success</r-tag>
          <r-tag type="warning" effect="plain">Warning</r-tag>
          <r-tag type="danger" effect="plain">Danger</r-tag>
        </div>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 8px;">
      <r-tag size="large" type="primary">Large</r-tag>
      <r-tag size="default" type="primary">Default</r-tag>
      <r-tag size="small" type="primary">Small</r-tag>
    </div>
  `,
};

export const Closable: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 8px;">
      <r-tag closable @close=${args.onClose}>Tag 1</r-tag>
      <r-tag closable type="primary" @close=${args.onClose}>Tag 2</r-tag>
      <r-tag closable type="success" @close=${args.onClose}>Tag 3</r-tag>
      <r-tag closable type="warning" @close=${args.onClose}>Tag 4</r-tag>
    </div>
  `,
};

export const Round: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px;">
      <r-tag round>Default</r-tag>
      <r-tag round type="primary">Primary</r-tag>
      <r-tag round type="success">Success</r-tag>
      <r-tag round type="warning">Warning</r-tag>
      <r-tag round type="danger">Danger</r-tag>
    </div>
  `,
};

export const CustomColor: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px;">
      <r-tag color="#8b5cf6">Purple</r-tag>
      <r-tag color="#ec4899">Pink</r-tag>
      <r-tag color="#06b6d4">Cyan</r-tag>
      <r-tag color="#84cc16">Lime</r-tag>
    </div>
  `,
};

export const UseCases: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Status Tags</p>
        <div style="display: flex; gap: 8px;">
          <r-tag type="success" effect="dark">Published</r-tag>
          <r-tag type="warning" effect="dark">Draft</r-tag>
          <r-tag type="danger" effect="dark">Archived</r-tag>
          <r-tag type="info" effect="dark">Pending</r-tag>
        </div>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Category Tags</p>
        <div style="display: flex; gap: 8px;">
          <r-tag round type="primary">JavaScript</r-tag>
          <r-tag round type="success">TypeScript</r-tag>
          <r-tag round type="warning">Python</r-tag>
          <r-tag round type="info">Go</r-tag>
        </div>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Removable Tags</p>
        <div style="display: flex; gap: 8px;">
          <r-tag closable size="small">frontend</r-tag>
          <r-tag closable size="small">backend</r-tag>
          <r-tag closable size="small">devops</r-tag>
          <r-tag closable size="small">design</r-tag>
        </div>
      </div>
    </div>
  `,
};
