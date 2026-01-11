import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Collapse',
  tags: ['autodocs'],
  argTypes: {
    accordion: {
      control: 'boolean',
      description: 'Whether to activate accordion mode',
    },
    expandIconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Set expand icon position',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj;

// Basic collapse
export const Default: Story = {
  render: (args) => html`
    <r-collapse @change=${args.onChange}>
      <r-collapse-item name="1" panel-title="Consistency">
        <p style="margin: 0;">
          Consistent with real life: in line with the process and logic of real life, and comply
          with languages and habits that the users are used to.
        </p>
      </r-collapse-item>
      <r-collapse-item name="2" panel-title="Feedback">
        <p style="margin: 0;">
          Operation feedback: enable the users to clearly perceive their operations by style
          updates and interactive effects.
        </p>
      </r-collapse-item>
      <r-collapse-item name="3" panel-title="Efficiency">
        <p style="margin: 0;">
          Simplify the process: keep operating process simple and intuitive. Definite and clear:
          enunciate your intentions clearly so that the users can quickly understand and make
          decisions.
        </p>
      </r-collapse-item>
    </r-collapse>
  `,
};

// Accordion mode
export const Accordion: Story = {
  render: (args) => html`
    <r-collapse accordion @change=${args.onChange}>
      <r-collapse-item name="1" panel-title="Consistency">
        <p style="margin: 0;">
          Consistent with real life: in line with the process and logic of real life, and comply
          with languages and habits that the users are used to.
        </p>
      </r-collapse-item>
      <r-collapse-item name="2" panel-title="Feedback">
        <p style="margin: 0;">
          Operation feedback: enable the users to clearly perceive their operations by style
          updates and interactive effects.
        </p>
      </r-collapse-item>
      <r-collapse-item name="3" panel-title="Efficiency">
        <p style="margin: 0;">
          Simplify the process: keep operating process simple and intuitive.
        </p>
      </r-collapse-item>
    </r-collapse>
  `,
};

// Icon position left
export const IconPositionLeft: Story = {
  render: (args) => html`
    <r-collapse expand-icon-position="left" @change=${args.onChange}>
      <r-collapse-item name="1" panel-title="Consistency">
        <p style="margin: 0;">
          Consistent with real life: in line with the process and logic of real life.
        </p>
      </r-collapse-item>
      <r-collapse-item name="2" panel-title="Feedback">
        <p style="margin: 0;">
          Operation feedback: enable the users to clearly perceive their operations.
        </p>
      </r-collapse-item>
      <r-collapse-item name="3" panel-title="Efficiency">
        <p style="margin: 0;">
          Simplify the process: keep operating process simple and intuitive.
        </p>
      </r-collapse-item>
    </r-collapse>
  `,
};

// With disabled item
export const WithDisabledItem: Story = {
  render: (args) => html`
    <r-collapse @change=${args.onChange}>
      <r-collapse-item name="1" panel-title="Consistency">
        <p style="margin: 0;">
          Consistent with real life: in line with the process and logic of real life.
        </p>
      </r-collapse-item>
      <r-collapse-item name="2" panel-title="Feedback (Disabled)" disabled>
        <p style="margin: 0;">This item is disabled and cannot be expanded.</p>
      </r-collapse-item>
      <r-collapse-item name="3" panel-title="Efficiency">
        <p style="margin: 0;">
          Simplify the process: keep operating process simple and intuitive.
        </p>
      </r-collapse-item>
    </r-collapse>
  `,
};

// Custom title slot
export const CustomTitleSlot: Story = {
  render: (args) => html`
    <r-collapse @change=${args.onChange}>
      <r-collapse-item name="1">
        <div slot="title" style="display: flex; align-items: center; gap: 8px;">
          <span>📋</span>
          <span>Custom Title with Icon</span>
          <r-badge value="new" type="primary" style="margin-left: auto;"></r-badge>
        </div>
        <p style="margin: 0;">Content with a custom title that includes an icon and badge.</p>
      </r-collapse-item>
      <r-collapse-item name="2">
        <div slot="title" style="display: flex; align-items: center; gap: 8px;">
          <span>⚙️</span>
          <span>Settings</span>
        </div>
        <p style="margin: 0;">Settings panel content goes here.</p>
      </r-collapse-item>
    </r-collapse>
  `,
};

// FAQ example
export const FAQExample: Story = {
  render: (args) => html`
    <div style="max-width: 600px;">
      <h3 style="margin: 0 0 16px 0;">Frequently Asked Questions</h3>
      <r-collapse accordion @change=${args.onChange}>
        <r-collapse-item name="1" panel-title="What is your return policy?">
          <p style="margin: 0;">
            We offer a 30-day return policy for all unused items in their original packaging. Simply
            contact our support team to initiate a return.
          </p>
        </r-collapse-item>
        <r-collapse-item name="2" panel-title="How long does shipping take?">
          <p style="margin: 0;">
            Standard shipping takes 5-7 business days. Express shipping is available for 2-3
            business day delivery at an additional cost.
          </p>
        </r-collapse-item>
        <r-collapse-item name="3" panel-title="Do you ship internationally?">
          <p style="margin: 0;">
            Yes, we ship to over 50 countries worldwide. International shipping times vary by
            location, typically 10-21 business days.
          </p>
        </r-collapse-item>
        <r-collapse-item name="4" panel-title="How can I track my order?">
          <p style="margin: 0;">
            Once your order ships, you'll receive an email with a tracking number. You can use this
            to track your package on our website or the carrier's site.
          </p>
        </r-collapse-item>
      </r-collapse>
    </div>
  `,
};

// With rich content
export const WithRichContent: Story = {
  render: (args) => html`
    <r-collapse @change=${args.onChange}>
      <r-collapse-item name="1" panel-title="User Profile">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
          <r-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            .size=${64}
          ></r-avatar>
          <div>
            <h4 style="margin: 0 0 4px 0;">John Doe</h4>
            <p style="margin: 0; color: var(--r-color-text-secondary);">Software Engineer</p>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <r-button type="primary" size="small">Edit Profile</r-button>
          <r-button size="small">View Activity</r-button>
        </div>
      </r-collapse-item>
      <r-collapse-item name="2" panel-title="Account Settings">
        <p style="margin: 0 0 12px 0;">Manage your account preferences and security settings.</p>
        <r-button size="small">Go to Settings</r-button>
      </r-collapse-item>
    </r-collapse>
  `,
};
