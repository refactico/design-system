import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Form',
  tags: ['autodocs'],
  argTypes: {
    inline: {
      control: 'boolean',
      description: 'Inline form layout',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right', 'top'],
      description: 'Label position',
    },
    labelWidth: {
      control: 'text',
      description: 'Label width',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Form size',
    },
  },
  args: {
    onValidate: fn(),
  },
};

export default meta;
type Story = StoryObj;

// Basic form
export const Default: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <r-form label-width="120px">
        <r-form-item label="Username" prop="username">
          <r-input placeholder="Enter username"></r-input>
        </r-form-item>
        <r-form-item label="Email" prop="email">
          <r-input placeholder="Enter email"></r-input>
        </r-form-item>
        <r-form-item label="Password" prop="password">
          <r-input type="password" placeholder="Enter password" show-password></r-input>
        </r-form-item>
        <r-form-item>
          <r-button type="primary">Submit</r-button>
          <r-button style="margin-left: 12px;">Cancel</r-button>
        </r-form-item>
      </r-form>
    </div>
  `,
};

// Inline form
export const InlineForm: Story = {
  render: () => html`
    <r-form inline>
      <r-form-item label="Name">
        <r-input placeholder="Name" style="width: 150px;"></r-input>
      </r-form-item>
      <r-form-item label="Email">
        <r-input placeholder="Email" style="width: 200px;"></r-input>
      </r-form-item>
      <r-form-item>
        <r-button type="primary">Search</r-button>
      </r-form-item>
    </r-form>
  `,
};

// Label positions
export const LabelPositions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px;">
      <div>
        <h4 style="margin: 0 0 16px; color: var(--r-color-text-secondary);">Label Right (default)</h4>
        <r-form label-position="right" label-width="100px" style="max-width: 400px;">
          <r-form-item label="Name">
            <r-input placeholder="Name"></r-input>
          </r-form-item>
          <r-form-item label="Email">
            <r-input placeholder="Email"></r-input>
          </r-form-item>
        </r-form>
      </div>
      <div>
        <h4 style="margin: 0 0 16px; color: var(--r-color-text-secondary);">Label Left</h4>
        <r-form label-position="left" label-width="100px" style="max-width: 400px;">
          <r-form-item label="Name">
            <r-input placeholder="Name"></r-input>
          </r-form-item>
          <r-form-item label="Email">
            <r-input placeholder="Email"></r-input>
          </r-form-item>
        </r-form>
      </div>
      <div>
        <h4 style="margin: 0 0 16px; color: var(--r-color-text-secondary);">Label Top</h4>
        <r-form label-position="top" style="max-width: 400px;">
          <r-form-item label="Name">
            <r-input placeholder="Name"></r-input>
          </r-form-item>
          <r-form-item label="Email">
            <r-input placeholder="Email"></r-input>
          </r-form-item>
        </r-form>
      </div>
    </div>
  `,
};

// Required fields
export const RequiredFields: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <r-form label-width="120px">
        <r-form-item label="Username" prop="username" required>
          <r-input placeholder="Required field"></r-input>
        </r-form-item>
        <r-form-item label="Nickname" prop="nickname">
          <r-input placeholder="Optional field"></r-input>
        </r-form-item>
        <r-form-item label="Email" prop="email" required>
          <r-input placeholder="Required field"></r-input>
        </r-form-item>
      </r-form>
    </div>
  `,
};

// With validation error
export const WithError: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <r-form label-width="120px">
        <r-form-item label="Username" prop="username" error="Username is required" required>
          <r-input placeholder="Enter username"></r-input>
        </r-form-item>
        <r-form-item label="Email" prop="email" error="Please enter a valid email address" required>
          <r-input placeholder="Enter email" value="invalid-email"></r-input>
        </r-form-item>
        <r-form-item label="Password" prop="password" error="Password must be at least 8 characters" required>
          <r-input type="password" placeholder="Enter password" value="123"></r-input>
        </r-form-item>
        <r-form-item label="Website" prop="website">
          <r-input placeholder="No error on this field"></r-input>
        </r-form-item>
      </r-form>
    </div>
  `,
};

// Multiple error types
export const ValidationStates: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <r-form label-position="top">
        <r-form-item label="Error State" error="This field has an error">
          <r-input placeholder="Error input" value="Invalid value"></r-input>
        </r-form-item>
        <r-form-item label="Required Field" required>
          <r-input placeholder="This field is required"></r-input>
        </r-form-item>
        <r-form-item label="Normal Field">
          <r-input placeholder="Normal input"></r-input>
        </r-form-item>
        <r-form-item label="With Select Error" error="Please select an option" required>
          <r-select
            placeholder="Select an option"
            .options=${[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
          ></r-select>
        </r-form-item>
        <r-form-item label="Textarea Error" error="Description is too short">
          <r-input type="textarea" placeholder="Enter description" value="Hi" .rows=${3}></r-input>
        </r-form-item>
      </r-form>
    </div>
  `,
};

// Asterisk positions
export const AsteriskPositions: Story = {
  render: () => html`
    <div style="display: flex; gap: 40px;">
      <div style="flex: 1;">
        <h4 style="margin: 0 0 16px; color: var(--r-color-text-secondary);">Asterisk Left (default)</h4>
        <r-form label-position="top" require-asterisk-position="left">
          <r-form-item label="Username" required>
            <r-input placeholder="Username"></r-input>
          </r-form-item>
          <r-form-item label="Email" required>
            <r-input placeholder="Email"></r-input>
          </r-form-item>
        </r-form>
      </div>
      <div style="flex: 1;">
        <h4 style="margin: 0 0 16px; color: var(--r-color-text-secondary);">Asterisk Right</h4>
        <r-form label-position="top" require-asterisk-position="right">
          <r-form-item label="Username" required>
            <r-input placeholder="Username"></r-input>
          </r-form-item>
          <r-form-item label="Email" required>
            <r-input placeholder="Email"></r-input>
          </r-form-item>
        </r-form>
      </div>
    </div>
  `,
};

// With select
export const WithSelect: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <r-form label-width="120px" label-position="top">
        <r-form-item label="Country" prop="country" required>
          <r-select
            placeholder="Select country"
            .options=${[
              { value: 'us', label: 'United States' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'ca', label: 'Canada' },
            ]}
          ></r-select>
        </r-form-item>
        <r-form-item label="City" prop="city">
          <r-input placeholder="Enter city"></r-input>
        </r-form-item>
        <r-form-item label="Interests" prop="interests">
          <r-select
            placeholder="Select interests"
            multiple
            .options=${[
              { value: 'tech', label: 'Technology' },
              { value: 'sports', label: 'Sports' },
              { value: 'music', label: 'Music' },
            ]}
          ></r-select>
        </r-form-item>
        <r-form-item>
          <r-button type="primary">Submit</r-button>
        </r-form-item>
      </r-form>
    </div>
  `,
};

// Complete form example
export const CompleteForm: Story = {
  render: () => html`
    <r-card header="User Registration" style="max-width: 600px;">
      <r-form label-position="top">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px;">
          <r-form-item label="First Name" prop="firstName" required>
            <r-input placeholder="First name"></r-input>
          </r-form-item>
          <r-form-item label="Last Name" prop="lastName" required>
            <r-input placeholder="Last name"></r-input>
          </r-form-item>
        </div>
        <r-form-item label="Email" prop="email" required>
          <r-input placeholder="your@email.com" prefix-icon="✉️"></r-input>
        </r-form-item>
        <r-form-item label="Password" prop="password" required>
          <r-input type="password" placeholder="Create a password" show-password></r-input>
        </r-form-item>
        <r-form-item label="Country" prop="country">
          <r-select
            placeholder="Select your country"
            .options=${[
              { value: 'us', label: 'United States' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'ca', label: 'Canada' },
              { value: 'au', label: 'Australia' },
            ]}
          ></r-select>
        </r-form-item>
        <r-form-item label="Bio" prop="bio">
          <r-input type="textarea" placeholder="Tell us about yourself..." .rows=${3}></r-input>
        </r-form-item>
        <r-form-item>
          <div style="display: flex; gap: 12px;">
            <r-button type="primary">Create Account</r-button>
            <r-button>Cancel</r-button>
          </div>
        </r-form-item>
      </r-form>
    </r-card>
  `,
};
