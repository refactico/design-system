import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

const disabledOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
  { value: 'option5', label: 'Option 5' },
];

const groupedOptions = [
  {
    label: 'Popular Cities',
    options: [
      { value: 'new-york', label: 'New York' },
      { value: 'los-angeles', label: 'Los Angeles' },
      { value: 'chicago', label: 'Chicago' },
    ],
  },
  {
    label: 'Other Cities',
    options: [
      { value: 'austin', label: 'Austin' },
      { value: 'seattle', label: 'Seattle' },
      { value: 'denver', label: 'Denver' },
    ],
  },
];

const meta: Meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Select size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
    multiple: {
      control: 'boolean',
      description: 'Multiple selection mode',
    },
    filterable: {
      control: 'boolean',
      description: 'Enable filtering',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  args: {
    onChange: fn(),
    onVisibleChange: fn(),
    onClear: fn(),
  },
};

export default meta;
type Story = StoryObj;

// Basic select
export const Default: Story = {
  render: (args) => html`
    <div style="width: 300px;">
      <r-select
        placeholder="Select an option"
        .options=${basicOptions}
        @change=${args.onChange}
      ></r-select>
    </div>
  `,
};

// With disabled options
export const DisabledOptions: Story = {
  render: (args) => html`
    <r-select
      placeholder="Some options are disabled"
      .options=${disabledOptions}
      @change=${args.onChange}
    ></r-select>
  `,
};

// Disabled select
export const DisabledSelect: Story = {
  render: () => html`
    <r-select placeholder="Disabled select" .options=${basicOptions} disabled></r-select>
  `,
};

// Clearable
export const Clearable: Story = {
  render: (args) => html`
    <r-select
      placeholder="Clearable select"
      .options=${basicOptions}
      clearable
      value="option2"
      @change=${args.onChange}
      @clear=${args.onClear}
    ></r-select>
  `,
};

// Sizes
export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-select
        size="large"
        placeholder="Large select"
        .options=${basicOptions}
        @change=${args.onChange}
      ></r-select>
      <r-select
        size="default"
        placeholder="Default select"
        .options=${basicOptions}
        @change=${args.onChange}
      ></r-select>
      <r-select
        size="small"
        placeholder="Small select"
        .options=${basicOptions}
        @change=${args.onChange}
      ></r-select>
    </div>
  `,
};

// Multiple select
export const Multiple: Story = {
  render: (args) => html`
    <r-select
      placeholder="Select multiple options"
      .options=${basicOptions}
      multiple
      @change=${args.onChange}
    ></r-select>
  `,
};

// Multiple with collapse tags
export const MultipleCollapseTags: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 8px; color: var(--r-color-text-secondary);">Default (show all tags)</p>
        <r-select
          placeholder="Select options"
          .options=${basicOptions}
          multiple
          .value=${['option1', 'option2', 'option3', 'option4']}
          @change=${args.onChange}
        ></r-select>
      </div>
      <div>
        <p style="margin: 0 0 8px; color: var(--r-color-text-secondary);">Collapse tags (max 2)</p>
        <r-select
          placeholder="Select options"
          .options=${basicOptions}
          multiple
          collapse-tags
          .maxCollapseTags=${2}
          .value=${['option1', 'option2', 'option3', 'option4']}
          @change=${args.onChange}
        ></r-select>
      </div>
    </div>
  `,
};

// Grouped options
export const GroupedOptions: Story = {
  render: (args) => html`
    <r-select
      placeholder="Select a city"
      .options=${groupedOptions}
      @change=${args.onChange}
    ></r-select>
  `,
};

// Filterable
export const Filterable: Story = {
  render: (args) => html`
    <r-select
      placeholder="Type to filter"
      .options=${basicOptions}
      filterable
      @change=${args.onChange}
    ></r-select>
  `,
};

// Filterable multiple
export const FilterableMultiple: Story = {
  render: (args) => html`
    <r-select
      placeholder="Type to filter and select multiple"
      .options=${basicOptions}
      filterable
      multiple
      @change=${args.onChange}
    ></r-select>
  `,
};

// Allow create
export const AllowCreate: Story = {
  render: (args) => html`
    <r-select
      placeholder="Type to create new options"
      .options=${basicOptions}
      filterable
      allow-create
      @change=${args.onChange}
    ></r-select>
  `,
};

// Loading state
export const Loading: Story = {
  render: () => html`
    <r-select placeholder="Loading..." .options=${[]} loading loading-text="Fetching data..."></r-select>
  `,
};

// Custom no data text
export const NoData: Story = {
  render: () => html`
    <r-select placeholder="Select" .options=${[]} no-data-text="No options available"></r-select>
  `,
};

// Tag types
export const TagTypes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <r-select
        placeholder="Info tags (default)"
        .options=${basicOptions}
        multiple
        tag-type="info"
        .value=${['option1', 'option2']}
        @change=${args.onChange}
      ></r-select>
      <r-select
        placeholder="Success tags"
        .options=${basicOptions}
        multiple
        tag-type="success"
        .value=${['option1', 'option2']}
        @change=${args.onChange}
      ></r-select>
      <r-select
        placeholder="Warning tags"
        .options=${basicOptions}
        multiple
        tag-type="warning"
        .value=${['option1', 'option2']}
        @change=${args.onChange}
      ></r-select>
      <r-select
        placeholder="Danger tags"
        .options=${basicOptions}
        multiple
        tag-type="danger"
        .value=${['option1', 'option2']}
        @change=${args.onChange}
      ></r-select>
    </div>
  `,
};

// In a form
export const InForm: Story = {
  render: (args) => html`
    <r-card header="User Settings" style="max-width: 500px;">
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: var(--r-color-text-primary);">
            Country
          </label>
          <r-select
            placeholder="Select your country"
            .options=${[
              { value: 'us', label: 'United States' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'ca', label: 'Canada' },
              { value: 'au', label: 'Australia' },
              { value: 'de', label: 'Germany' },
            ]}
            clearable
            @change=${args.onChange}
          ></r-select>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: var(--r-color-text-primary);">
            Interests
          </label>
          <r-select
            placeholder="Select your interests"
            .options=${[
              { value: 'tech', label: 'Technology' },
              { value: 'sports', label: 'Sports' },
              { value: 'music', label: 'Music' },
              { value: 'travel', label: 'Travel' },
              { value: 'food', label: 'Food' },
            ]}
            multiple
            filterable
            @change=${args.onChange}
          ></r-select>
        </div>
        <r-button type="primary">Save Settings</r-button>
      </div>
    </r-card>
  `,
};
