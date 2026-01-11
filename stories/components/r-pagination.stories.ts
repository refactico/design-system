import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  argTypes: {
    total: {
      control: 'number',
      description: 'Total item count',
    },
    pageSize: {
      control: 'number',
      description: 'Items per page',
    },
    currentPage: {
      control: 'number',
      description: 'Current page number',
    },
    pagerCount: {
      control: 'number',
      description: 'Number of pagers before collapsing',
    },
    background: {
      control: 'boolean',
      description: 'Show background on buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable pagination',
    },
    hideOnSinglePage: {
      control: 'boolean',
      description: 'Hide when only one page',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Pagination size',
    },
    layout: {
      control: 'text',
      description: 'Layout of pagination elements',
    },
  },
  args: {
    onCurrentChange: fn(),
    onSizeChange: fn(),
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj;

// Basic pagination
export const Default: Story = {
  render: (args) => html`
    <r-pagination
      .total=${100}
      .currentPage=${1}
      @currentChange=${args.onCurrentChange}
    ></r-pagination>
  `,
};

// Few pages
export const FewPages: Story = {
  render: (args) => html`
    <r-pagination
      .total=${50}
      .pageSize=${10}
      .currentPage=${1}
      @currentChange=${args.onCurrentChange}
    ></r-pagination>
  `,
};

// Many pages
export const ManyPages: Story = {
  render: (args) => html`
    <r-pagination
      .total=${1000}
      .pageSize=${10}
      .currentPage=${5}
      @currentChange=${args.onCurrentChange}
    ></r-pagination>
  `,
};

// With background
export const WithBackground: Story = {
  render: (args) => html`
    <r-pagination
      .total=${500}
      .currentPage=${3}
      background
      @currentChange=${args.onCurrentChange}
    ></r-pagination>
  `,
};

// Small size
export const SmallSize: Story = {
  render: (args) => html`
    <r-pagination
      .total=${500}
      .currentPage=${1}
      size="small"
      background
      @currentChange=${args.onCurrentChange}
    ></r-pagination>
  `,
};

// Large size
export const LargeSize: Story = {
  render: (args) => html`
    <r-pagination
      .total=${500}
      .currentPage=${1}
      size="large"
      background
      @currentChange=${args.onCurrentChange}
    ></r-pagination>
  `,
};

// With total
export const WithTotal: Story = {
  render: (args) => html`
    <r-pagination
      .total=${1000}
      .currentPage=${1}
      layout="total, prev, pager, next"
      @currentChange=${args.onCurrentChange}
    ></r-pagination>
  `,
};

// With sizes selector
export const WithSizes: Story = {
  render: (args) => html`
    <r-pagination
      .total=${400}
      .currentPage=${1}
      .pageSize=${20}
      layout="sizes, prev, pager, next"
      @currentChange=${args.onCurrentChange}
      @sizeChange=${args.onSizeChange}
    ></r-pagination>
  `,
};

// With jumper
export const WithJumper: Story = {
  render: (args) => html`
    <r-pagination
      .total=${500}
      .currentPage=${1}
      layout="prev, pager, next, jumper"
      @currentChange=${args.onCurrentChange}
    ></r-pagination>
  `,
};

// Full featured
export const FullFeatured: Story = {
  render: (args) => html`
    <r-pagination
      .total=${400}
      .currentPage=${1}
      .pageSize=${20}
      layout="total, sizes, prev, pager, next, jumper"
      background
      @currentChange=${args.onCurrentChange}
      @sizeChange=${args.onSizeChange}
      @change=${args.onChange}
    ></r-pagination>
  `,
};

// With right alignment
export const WithRightAlignment: Story = {
  render: (args) => html`
    <r-pagination
      .total=${400}
      .currentPage=${1}
      layout="prev, pager, next, ->, total"
      @currentChange=${args.onCurrentChange}
    ></r-pagination>
  `,
};

// Disabled
export const Disabled: Story = {
  render: () => html`
    <r-pagination .total=${500} .currentPage=${3} disabled background></r-pagination>
  `,
};

// Hide on single page
export const HideOnSinglePage: Story = {
  render: () => html`
    <div>
      <p style="margin-bottom: 16px; color: var(--r-color-text-secondary);">
        With 5 items and 10 per page, pagination is hidden:
      </p>
      <r-pagination .total=${5} .pageSize=${10} hide-on-single-page></r-pagination>
      <p style="margin: 16px 0; color: var(--r-color-text-secondary);">
        With 50 items and 10 per page, pagination is shown:
      </p>
      <r-pagination .total=${50} .pageSize=${10} hide-on-single-page></r-pagination>
    </div>
  `,
};

// Custom pager count
export const CustomPagerCount: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <p style="margin-bottom: 8px; color: var(--r-color-text-secondary);">Pager count: 5</p>
        <r-pagination
          .total=${1000}
          .currentPage=${10}
          .pagerCount=${5}
          @currentChange=${args.onCurrentChange}
        ></r-pagination>
      </div>
      <div>
        <p style="margin-bottom: 8px; color: var(--r-color-text-secondary);">Pager count: 7 (default)</p>
        <r-pagination
          .total=${1000}
          .currentPage=${10}
          .pagerCount=${7}
          @currentChange=${args.onCurrentChange}
        ></r-pagination>
      </div>
      <div>
        <p style="margin-bottom: 8px; color: var(--r-color-text-secondary);">Pager count: 11</p>
        <r-pagination
          .total=${1000}
          .currentPage=${10}
          .pagerCount=${11}
          @currentChange=${args.onCurrentChange}
        ></r-pagination>
      </div>
    </div>
  `,
};

// In a card
export const InCard: Story = {
  render: (args) => html`
    <r-card header="User List" style="max-width: 800px;">
      <div style="margin-bottom: 16px;">
        <p style="margin: 0; color: var(--r-color-text-secondary);">
          Showing users 1-20 of 400 total
        </p>
      </div>
      <r-pagination
        .total=${400}
        .currentPage=${1}
        .pageSize=${20}
        layout="total, ->, sizes, prev, pager, next, jumper"
        background
        @currentChange=${args.onCurrentChange}
        @sizeChange=${args.onSizeChange}
      ></r-pagination>
    </r-card>
  `,
};
