import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'Title of the card',
    },
    footer: {
      control: 'text',
      description: 'Footer of the card',
    },
    shadow: {
      control: 'select',
      options: ['always', 'hover', 'never'],
      description: 'When to show card shadow',
    },
    headerClass: {
      control: 'text',
      description: 'Custom class for header',
    },
    bodyClass: {
      control: 'text',
      description: 'Custom class for body',
    },
    footerClass: {
      control: 'text',
      description: 'Custom class for footer',
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic card
export const Default: Story = {
  render: () => html`
    <r-card header="Card Title" style="width: 400px;">
      <p style="margin: 0;">This is some card content. Cards are used to group related information together.</p>
    </r-card>
  `,
};

// Simple card (no header)
export const SimpleCard: Story = {
  render: () => html`
    <r-card style="width: 400px;">
      <p style="margin: 0;">A simple card without a header. Just content inside a bordered container.</p>
    </r-card>
  `,
};

// With header and footer
export const WithHeaderAndFooter: Story = {
  render: () => html`
    <r-card header="Card Title" footer="Card Footer" style="width: 400px;">
      <p style="margin: 0;">Card content goes here. This card has both a header and a footer.</p>
    </r-card>
  `,
};

// Shadow variants
export const ShadowVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap;">
      <r-card header="Always Shadow" shadow="always" style="width: 280px;">
        <p style="margin: 0;">This card always has a shadow.</p>
      </r-card>
      <r-card header="Hover Shadow" shadow="hover" style="width: 280px;">
        <p style="margin: 0;">Hover over this card to see the shadow.</p>
      </r-card>
      <r-card header="No Shadow" shadow="never" style="width: 280px;">
        <p style="margin: 0;">This card never has a shadow.</p>
      </r-card>
    </div>
  `,
};

// Custom header slot
export const CustomHeaderSlot: Story = {
  render: () => html`
    <r-card style="width: 400px;">
      <div slot="header" style="display: flex; justify-content: space-between; align-items: center;">
        <span>Custom Header</span>
        <r-button size="small" type="primary">Action</r-button>
      </div>
      <p style="margin: 0;">This card uses a custom header slot with a button.</p>
    </r-card>
  `,
};

// Custom footer slot
export const CustomFooterSlot: Story = {
  render: () => html`
    <r-card header="Card with Actions" style="width: 400px;">
      <p style="margin: 0;">This card has action buttons in the footer.</p>
      <div slot="footer" style="display: flex; gap: 12px; justify-content: flex-end;">
        <r-button>Cancel</r-button>
        <r-button type="primary">Confirm</r-button>
      </div>
    </r-card>
  `,
};

// Image card
export const ImageCard: Story = {
  render: () => html`
    <r-card style="width: 320px;" shadow="hover">
      <img 
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" 
        alt="Landscape"
        style="width: 100%; height: 200px; object-fit: cover; margin: -20px -20px 16px -20px; width: calc(100% + 40px);"
      />
      <h3 style="margin: 0 0 8px 0; font-size: 18px;">Beautiful Landscape</h3>
      <p style="margin: 0; color: var(--r-color-text-secondary);">
        A stunning view of mountains and valleys captured during golden hour.
      </p>
    </r-card>
  `,
};

// User profile card
export const ProfileCard: Story = {
  render: () => html`
    <r-card style="width: 320px; text-align: center;">
      <r-avatar 
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        .size=${80}
        style="margin-bottom: 16px;"
      ></r-avatar>
      <h3 style="margin: 0 0 4px 0;">John Doe</h3>
      <p style="margin: 0 0 16px 0; color: var(--r-color-text-secondary);">Software Engineer</p>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <r-button type="primary">Follow</r-button>
        <r-button>Message</r-button>
      </div>
    </r-card>
  `,
};

// Stats card
export const StatsCard: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px;">
      <r-card style="width: 200px; text-align: center;">
        <div style="font-size: 32px; font-weight: 600; color: var(--r-color-primary);">128</div>
        <div style="color: var(--r-color-text-secondary); margin-top: 8px;">Total Users</div>
      </r-card>
      <r-card style="width: 200px; text-align: center;">
        <div style="font-size: 32px; font-weight: 600; color: var(--r-color-success);">$12.5k</div>
        <div style="color: var(--r-color-text-secondary); margin-top: 8px;">Revenue</div>
      </r-card>
      <r-card style="width: 200px; text-align: center;">
        <div style="font-size: 32px; font-weight: 600; color: var(--r-color-warning);">89%</div>
        <div style="color: var(--r-color-text-secondary); margin-top: 8px;">Completion</div>
      </r-card>
    </div>
  `,
};
