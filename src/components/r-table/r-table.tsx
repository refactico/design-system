import { Component, Prop, h, Element, Event, EventEmitter, State, Watch } from '@stencil/core';

export interface TableColumn {
  prop: string;
  label: string;
  width?: string;
  minWidth?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  fixed?: 'left' | 'right';
  formatter?: (row: any, column: TableColumn, cellValue: any, index: number) => any;
}

export type TableSize = 'large' | 'default' | 'small';

@Component({
  tag: 'r-table',
  styleUrl: 'r-table.css',
  shadow: false,
})
export class RTable {
  @Element() el: HTMLElement;

  /** Table data */
  @Prop() data: any[] = [];

  /** Table columns */
  @Prop() columns: TableColumn[] = [];

  /** Table size */
  @Prop() size: TableSize = 'default';

  /** Whether to show border */
  @Prop() border: boolean = false;

  /** Whether to show stripe */
  @Prop() stripe: boolean = false;

  /** Whether to highlight current row */
  @Prop() highlightCurrentRow: boolean = false;

  /** Row key for unique identification */
  @Prop() rowKey: string = 'id';

  /** Empty text */
  @Prop() emptyText: string = 'No data';

  /** Whether to show header */
  @Prop() showHeader: boolean = true;

  /** Max height for scrollable table */
  @Prop() maxHeight: string;

  /** Loading state */
  @Prop() loading: boolean = false;

  @State() currentRowKey: string | number | null = null;
  @State() sortProp: string = '';
  @State() sortOrder: 'ascending' | 'descending' | null = null;

  @Event({ bubbles: true, composed: true }) rowClick: EventEmitter<{ row: any; index: number }>;
  @Event({ bubbles: true, composed: true }) cellClick: EventEmitter<{ row: any; column: TableColumn; cellValue: any; index: number }>;
  @Event({ bubbles: true, composed: true }) sortChange: EventEmitter<{ prop: string; order: 'ascending' | 'descending' | null }>;
  @Event({ bubbles: true, composed: true }) currentChange: EventEmitter<any>;

  @Watch('data')
  handleDataChange() {
    this.currentRowKey = null;
  }

  private handleRowClick = (row: any, index: number) => {
    if (this.highlightCurrentRow) {
      const key = row[this.rowKey];
      this.currentRowKey = key;
      this.currentChange.emit(row);
    }
    this.rowClick.emit({ row, index });
  };

  private handleCellClick = (row: any, column: TableColumn, cellValue: any, index: number) => {
    this.cellClick.emit({ row, column, cellValue, index });
  };

  private handleSort = (column: TableColumn) => {
    if (!column.sortable) return;

    if (this.sortProp !== column.prop) {
      this.sortProp = column.prop;
      this.sortOrder = 'ascending';
    } else if (this.sortOrder === 'ascending') {
      this.sortOrder = 'descending';
    } else if (this.sortOrder === 'descending') {
      this.sortOrder = null;
      this.sortProp = '';
    } else {
      this.sortOrder = 'ascending';
    }

    this.sortChange.emit({ prop: this.sortProp, order: this.sortOrder });
  };

  private getSortedData(): any[] {
    if (!this.sortProp || !this.sortOrder) {
      return this.data;
    }

    return [...this.data].sort((a, b) => {
      const aVal = a[this.sortProp];
      const bVal = b[this.sortProp];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      const result = aVal < bVal ? -1 : 1;
      return this.sortOrder === 'ascending' ? result : -result;
    });
  }

  private getCellValue(row: any, column: TableColumn, index: number): any {
    const value = row[column.prop];
    if (column.formatter) {
      return column.formatter(row, column, value, index);
    }
    return value;
  }

  render() {
    const sortedData = this.getSortedData();
    const tableStyles: { [key: string]: string } = {};
    if (this.maxHeight) {
      tableStyles['max-height'] = this.maxHeight;
    }

    return (
      <r-loading loading={this.loading}>
        <div
          class={{
            'r-table': true,
            [`r-table--${this.size}`]: this.size !== 'default',
            'r-table--border': this.border,
            'r-table--stripe': this.stripe,
          }}
          style={Object.keys(tableStyles).length > 0 ? tableStyles : undefined}
        >
          <table class="r-table__inner">
            {this.showHeader && (
              <thead class="r-table__header">
                <tr>
                  {this.columns.map((column) => (
                    <th
                      class={{
                        'r-table__cell': true,
                        'r-table__cell--sortable': column.sortable,
                        'r-table__cell--sorted': this.sortProp === column.prop,
                        [`r-table__cell--${column.align || 'left'}`]: true,
                      }}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                      }}
                      onClick={() => this.handleSort(column)}
                    >
                      <span class="r-table__cell-content">
                        {column.label}
                        {column.sortable && (
                          <span class="r-table__sort">
                            <svg
                              class={{
                                'r-table__sort-icon': true,
                                'r-table__sort-icon--asc': true,
                                'r-table__sort-icon--active': this.sortProp === column.prop && this.sortOrder === 'ascending',
                              }}
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 5l6 6H6z" />
                            </svg>
                            <svg
                              class={{
                                'r-table__sort-icon': true,
                                'r-table__sort-icon--desc': true,
                                'r-table__sort-icon--active': this.sortProp === column.prop && this.sortOrder === 'descending',
                              }}
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 19l-6-6h12z" />
                            </svg>
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            <tbody class="r-table__body">
              {sortedData.length === 0 ? (
                <tr class="r-table__empty-row">
                  <td colSpan={this.columns.length} class="r-table__empty">
                    <slot name="empty">{this.emptyText}</slot>
                  </td>
                </tr>
              ) : (
                sortedData.map((row, index) => (
                  <tr
                    class={{
                      'r-table__row': true,
                      'r-table__row--current': this.highlightCurrentRow && row[this.rowKey] === this.currentRowKey,
                    }}
                    onClick={() => this.handleRowClick(row, index)}
                  >
                    {this.columns.map((column) => {
                      const cellValue = this.getCellValue(row, column, index);
                      return (
                        <td
                          class={{
                            'r-table__cell': true,
                            [`r-table__cell--${column.align || 'left'}`]: true,
                          }}
                          onClick={() => this.handleCellClick(row, column, cellValue, index)}
                        >
                          {cellValue}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </r-loading>
    );
  }
}
