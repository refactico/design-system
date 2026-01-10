# r-pagination



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute             | Description                             | Type                              | Default                     |
| ------------------ | --------------------- | --------------------------------------- | --------------------------------- | --------------------------- |
| `background`       | `background`          | Whether buttons have background color   | `boolean`                         | `false`                     |
| `currentPage`      | `current-page`        | Current page number                     | `number`                          | `1`                         |
| `disabled`         | `disabled`            | Whether pagination is disabled          | `boolean`                         | `false`                     |
| `hideOnSinglePage` | `hide-on-single-page` | Hide when only one page                 | `boolean`                         | `false`                     |
| `layout`           | `layout`              | Layout of pagination elements           | `string`                          | `'prev, pager, next'`       |
| `nextText`         | `next-text`           | Text for next button                    | `string`                          | `''`                        |
| `pageCount`        | `page-count`          | Total page count (alternative to total) | `number`                          | `undefined`                 |
| `pageSize`         | `page-size`           | Item count of each page                 | `number`                          | `10`                        |
| `pageSizes`        | --                    | Options for page size selector          | `number[]`                        | `[10, 20, 30, 40, 50, 100]` |
| `pagerCount`       | `pager-count`         | Number of pagers before collapsing      | `number`                          | `7`                         |
| `prevText`         | `prev-text`           | Text for prev button                    | `string`                          | `''`                        |
| `size`             | `size`                | Pagination size                         | `"default" \| "large" \| "small"` | `'default'`                 |
| `total`            | `total`               | Total item count                        | `number`                          | `0`                         |


## Events

| Event           | Description | Type                                                      |
| --------------- | ----------- | --------------------------------------------------------- |
| `change`        |             | `CustomEvent<{ currentPage: number; pageSize: number; }>` |
| `currentChange` |             | `CustomEvent<number>`                                     |
| `nextClick`     |             | `CustomEvent<number>`                                     |
| `prevClick`     |             | `CustomEvent<number>`                                     |
| `sizeChange`    |             | `CustomEvent<number>`                                     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
