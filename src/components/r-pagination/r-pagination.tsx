import { Component, Prop, h, Event, EventEmitter, State, Watch } from '@stencil/core';

export type PaginationSize = 'small' | 'default' | 'large';

@Component({
  tag: 'r-pagination',
  styleUrl: 'r-pagination.css',
  shadow: false,
})
export class RPagination {
  /** Pagination size */
  @Prop() size: PaginationSize = 'default';

  /** Whether buttons have background color */
  @Prop() background: boolean = false;

  /** Item count of each page */
  @Prop({ mutable: true }) pageSize: number = 10;

  /** Total item count */
  @Prop() total: number = 0;

  /** Total page count (alternative to total) */
  @Prop() pageCount: number;

  /** Number of pagers before collapsing */
  @Prop() pagerCount: number = 7;

  /** Current page number */
  @Prop({ mutable: true }) currentPage: number = 1;

  /** Layout of pagination elements */
  @Prop() layout: string = 'prev, pager, next';

  /** Options for page size selector */
  @Prop() pageSizes: number[] = [10, 20, 30, 40, 50, 100];

  /** Text for prev button */
  @Prop() prevText: string = '';

  /** Text for next button */
  @Prop() nextText: string = '';

  /** Whether pagination is disabled */
  @Prop() disabled: boolean = false;

  /** Hide when only one page */
  @Prop() hideOnSinglePage: boolean = false;

  /** Jumper input value */
  @State() jumperValue: string = '';

  /** Show size dropdown */
  @State() showSizeDropdown: boolean = false;

  /** Cached pager numbers for performance */
  @State() cachedPagerNumbers: (number | string)[] = [];

  @Event({ bubbles: true, composed: true }) sizeChange: EventEmitter<number>;
  @Event({ bubbles: true, composed: true }) currentChange: EventEmitter<number>;
  @Event({ bubbles: true, composed: true }) change: EventEmitter<{ currentPage: number; pageSize: number }>;
  @Event({ bubbles: true, composed: true }) prevClick: EventEmitter<number>;
  @Event({ bubbles: true, composed: true }) nextClick: EventEmitter<number>;

  @Watch('currentPage')
  currentPageChanged(newVal: number) {
    this.jumperValue = String(newVal);
    this.updatePagerNumbers();
  }

  @Watch('total')
  @Watch('pageSize')
  @Watch('pageCount')
  @Watch('pagerCount')
  updatePagerNumbers() {
    this.cachedPagerNumbers = this.computePagerNumbers();
  }

  componentWillLoad() {
    this.jumperValue = String(this.currentPage);
    this.updatePagerNumbers();
  }

  private get totalPages(): number {
    if (this.pageCount !== undefined && this.pageCount > 0) {
      return this.pageCount;
    }
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  private get shouldHide(): boolean {
    return this.hideOnSinglePage && this.totalPages <= 1;
  }

  private handlePrev = () => {
    if (this.disabled || this.currentPage <= 1) return;
    this.currentPage = this.currentPage - 1;
    this.currentChange.emit(this.currentPage);
    this.prevClick.emit(this.currentPage);
    this.change.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
  };

  private handleNext = () => {
    if (this.disabled || this.currentPage >= this.totalPages) return;
    this.currentPage = this.currentPage + 1;
    this.currentChange.emit(this.currentPage);
    this.nextClick.emit(this.currentPage);
    this.change.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
  };

  private handlePageClick = (page: number) => {
    if (this.disabled || page === this.currentPage) return;
    this.currentPage = page;
    this.currentChange.emit(this.currentPage);
    this.change.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
  };

  private handleSizeChange = (size: number) => {
    if (this.disabled) return;
    this.pageSize = size;
    this.showSizeDropdown = false;
    // Reset to page 1 if current page exceeds new total
    const newTotalPages = Math.max(1, Math.ceil(this.total / size));
    if (this.currentPage > newTotalPages) {
      this.currentPage = newTotalPages;
      this.currentChange.emit(this.currentPage);
    }
    this.sizeChange.emit(this.pageSize);
    this.change.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
  };

  private handleJumperKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.handleJump();
    }
  };

  private handleJump = () => {
    const page = parseInt(this.jumperValue, 10);
    if (isNaN(page) || this.disabled) return;
    const validPage = Math.max(1, Math.min(page, this.totalPages));
    if (validPage !== this.currentPage) {
      this.currentPage = validPage;
      this.currentChange.emit(this.currentPage);
      this.change.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
    }
    this.jumperValue = String(this.currentPage);
  };

  private computePagerNumbers(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const count = this.pagerCount;

    if (total <= count) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(count / 2);
    const pages: (number | string)[] = [];

    let start = Math.max(2, current - half + 1);
    let end = Math.min(total - 1, current + half - 1);

    if (current <= half) {
      end = count - 2;
    } else if (current >= total - half) {
      start = total - count + 3;
    }

    pages.push(1);

    if (start > 2) {
      pages.push('prev-ellipsis');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 1) {
      pages.push('next-ellipsis');
    }

    if (total > 1) {
      pages.push(total);
    }

    return pages;
  }

  private handleEllipsisClick = (type: 'prev' | 'next') => {
    if (this.disabled) return;
    const jump = this.pagerCount - 2;
    if (type === 'prev') {
      this.handlePageClick(Math.max(1, this.currentPage - jump));
    } else {
      this.handlePageClick(Math.min(this.totalPages, this.currentPage + jump));
    }
  };

  private renderPrev() {
    const isDisabled = this.disabled || this.currentPage <= 1;
    return (
      <button
        class={{
          'r-pagination__btn': true,
          'r-pagination__prev': true,
          'r-pagination__btn--disabled': isDisabled,
        }}
        disabled={isDisabled}
        onClick={this.handlePrev}
        aria-label="Previous page"
      >
        {this.prevText || (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        )}
      </button>
    );
  }

  private renderNext() {
    const isDisabled = this.disabled || this.currentPage >= this.totalPages;
    return (
      <button
        class={{
          'r-pagination__btn': true,
          'r-pagination__next': true,
          'r-pagination__btn--disabled': isDisabled,
        }}
        disabled={isDisabled}
        onClick={this.handleNext}
        aria-label="Next page"
      >
        {this.nextText || (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        )}
      </button>
    );
  }

  private renderPager() {
    const pages = this.cachedPagerNumbers;
    return (
      <ul class="r-pagination__pager" role="list">
        {pages.map((page) => {
          if (page === 'prev-ellipsis') {
            return (
              <li
                class="r-pagination__ellipsis"
                onClick={() => this.handleEllipsisClick('prev')}
                title={`Previous ${this.pagerCount - 2} pages`}
              >
                <span class="r-pagination__ellipsis-dots">•••</span>
                <span class="r-pagination__ellipsis-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                  </svg>
                </span>
              </li>
            );
          }
          if (page === 'next-ellipsis') {
            return (
              <li
                class="r-pagination__ellipsis"
                onClick={() => this.handleEllipsisClick('next')}
                title={`Next ${this.pagerCount - 2} pages`}
              >
                <span class="r-pagination__ellipsis-dots">•••</span>
                <span class="r-pagination__ellipsis-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                </span>
              </li>
            );
          }
          return (
            <li
              class={{
                'r-pagination__number': true,
                'r-pagination__number--active': page === this.currentPage,
              }}
              aria-current={page === this.currentPage ? 'page' : undefined}
              onClick={() => this.handlePageClick(page as number)}
            >
              {page}
            </li>
          );
        })}
      </ul>
    );
  }

  private renderTotal() {
    return <span class="r-pagination__total">Total {this.total}</span>;
  }

  private renderSizes() {
    return (
      <div class="r-pagination__sizes">
        <div
          class="r-pagination__sizes-select"
          onClick={() => !this.disabled && (this.showSizeDropdown = !this.showSizeDropdown)}
        >
          <span>{this.pageSize} / page</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        {this.showSizeDropdown && (
          <ul class="r-pagination__sizes-dropdown">
            {this.pageSizes.map((size) => (
              <li
                class={{
                  'r-pagination__sizes-option': true,
                  'r-pagination__sizes-option--active': size === this.pageSize,
                }}
                onClick={() => this.handleSizeChange(size)}
              >
                {size} / page
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  private renderJumper() {
    return (
      <div class="r-pagination__jumper">
        <span>Go to</span>
        <input
          type="text"
          class="r-pagination__jumper-input"
          value={this.jumperValue}
          onInput={(e) => (this.jumperValue = (e.target as HTMLInputElement).value)}
          onKeyDown={this.handleJumperKeydown}
          onBlur={this.handleJump}
          disabled={this.disabled}
        />
      </div>
    );
  }

  render() {
    if (this.shouldHide) return null;

    const layoutItems = this.layout.split(',').map((item) => item.trim());
    const leftItems: string[] = [];
    const rightItems: string[] = [];
    let isRight = false;

    layoutItems.forEach((item) => {
      if (item === '->') {
        isRight = true;
      } else if (isRight) {
        rightItems.push(item);
      } else {
        leftItems.push(item);
      }
    });

    const renderItem = (item: string) => {
      switch (item) {
        case 'prev':
          return this.renderPrev();
        case 'next':
          return this.renderNext();
        case 'pager':
          return this.renderPager();
        case 'total':
          return this.renderTotal();
        case 'sizes':
          return this.renderSizes();
        case 'jumper':
          return this.renderJumper();
        case 'slot':
          return <slot></slot>;
        default:
          return null;
      }
    };

    return (
      <div
        class={{
          'r-pagination': true,
          [`r-pagination--${this.size}`]: true,
          'r-pagination--background': this.background,
          'r-pagination--disabled': this.disabled,
        }}
      >
        <div class="r-pagination__left">{leftItems.map(renderItem)}</div>
        {rightItems.length > 0 && (
          <div class="r-pagination__right">{rightItems.map(renderItem)}</div>
        )}
      </div>
    );
  }
}
