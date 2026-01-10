import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending' },
];

const columns = [
  { prop: 'id', label: 'ID', width: '80px' },
  { prop: 'name', label: 'Name', sortable: true },
  { prop: 'email', label: 'Email' },
  { prop: 'role', label: 'Role', width: '120px' },
  { prop: 'status', label: 'Status', width: '100px' },
];

const meta: Meta = {
  title: 'Components/Table',
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    border: { control: 'boolean' },
    stripe: { control: 'boolean' },
    highlightCurrentRow: { control: 'boolean' },
  },
  args: { onRowClick: fn(), onSortChange: fn(), onCurrentChange: fn() },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <r-table
      .data=${sampleData}
      .columns=${columns}
      @rowClick=${args.onRowClick}
    ></r-table>
  `,
};

export const WithBorder: Story = {
  render: () => html`
    <r-table
      .data=${sampleData}
      .columns=${columns}
      border
    ></r-table>
  `,
};

export const Striped: Story = {
  render: () => html`
    <r-table
      .data=${sampleData}
      .columns=${columns}
      stripe
    ></r-table>
  `,
};

export const BorderAndStripe: Story = {
  render: () => html`
    <r-table
      .data=${sampleData}
      .columns=${columns}
      border
      stripe
    ></r-table>
  `,
};

export const Sortable: Story = {
  render: (args) => html`
    <r-table
      .data=${sampleData}
      .columns=${[
        { prop: 'id', label: 'ID', width: '80px', sortable: true },
        { prop: 'name', label: 'Name', sortable: true },
        { prop: 'email', label: 'Email', sortable: true },
        { prop: 'role', label: 'Role', width: '120px' },
        { prop: 'status', label: 'Status', width: '100px' },
      ]}
      @sortChange=${args.onSortChange}
    ></r-table>
  `,
};

export const HighlightCurrentRow: Story = {
  render: (args) => html`
    <r-table
      .data=${sampleData}
      .columns=${columns}
      highlight-current-row
      @currentChange=${args.onCurrentChange}
    ></r-table>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="margin-bottom: 8px;">Large</h4>
        <r-table .data=${sampleData.slice(0, 3)} .columns=${columns} size="large"></r-table>
      </div>
      <div>
        <h4 style="margin-bottom: 8px;">Default</h4>
        <r-table .data=${sampleData.slice(0, 3)} .columns=${columns} size="default"></r-table>
      </div>
      <div>
        <h4 style="margin-bottom: 8px;">Small</h4>
        <r-table .data=${sampleData.slice(0, 3)} .columns=${columns} size="small"></r-table>
      </div>
    </div>
  `,
};

export const EmptyState: Story = {
  render: () => html`
    <r-table
      .data=${[]}
      .columns=${columns}
      empty-text="No users found"
    ></r-table>
  `,
};

export const Loading: Story = {
  render: () => html`
    <r-table
      .data=${sampleData}
      .columns=${columns}
      loading
    ></r-table>
  `,
};

export const ColumnAlignment: Story = {
  render: () => html`
    <r-table
      .data=${[
        { id: 1, product: 'Widget A', quantity: 100, price: 29.99, total: 2999.00 },
        { id: 2, product: 'Widget B', quantity: 50, price: 49.99, total: 2499.50 },
        { id: 3, product: 'Widget C', quantity: 200, price: 9.99, total: 1998.00 },
      ]}
      .columns=${[
        { prop: 'id', label: 'ID', width: '80px', align: 'center' },
        { prop: 'product', label: 'Product', align: 'left' },
        { prop: 'quantity', label: 'Quantity', align: 'center' },
        { prop: 'price', label: 'Price', align: 'right' },
        { prop: 'total', label: 'Total', align: 'right' },
      ]}
      border
    ></r-table>
  `,
};

export const WithActions: Story = {
  render: () => html`
    <r-table
      .data=${sampleData}
      .columns=${[
        { prop: 'name', label: 'Name' },
        { prop: 'email', label: 'Email' },
        { prop: 'role', label: 'Role' },
        { 
          prop: 'actions', 
          label: 'Actions', 
          width: '200px',
          formatter: () => html`
            <r-button size="small" type="primary" text>Edit</r-button>
            <r-button size="small" type="danger" text>Delete</r-button>
          `
        },
      ]}
    ></r-table>
  `,
};
