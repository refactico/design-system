import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderCurrencyInputExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>💰 Currency Input Component Examples</h2>

      <div class="example-group">
        <h3>💵 Price Entry Form</h3>
        <p>Enter product price with automatic currency formatting.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <r-currency-input
            label="Product Price"
            currency-code="USD"
            placeholder="Enter price"
            required
            helper-text="Enter the product price in USD"
          ></r-currency-input>
          <r-buttons position="end">
            <r-button color="primary" type="submit">Save Price</r-button>
          </r-buttons>
        </form>
      </div>

      <div class="example-group">
        <h3>🌍 Multi-Currency Support</h3>
        <p>Currency inputs for different currencies with locale formatting.</p>
        <r-currency-input
          label="Price (USD)"
          currency-code="USD"
          value={99.99}
          helper-text="US Dollar format"
        ></r-currency-input>
        <r-currency-input
          label="Price (EUR)"
          currency-code="EUR"
          value={99.99}
          locale="en-GB"
          helper-text="Euro format"
        ></r-currency-input>
        <r-currency-input
          label="Price (GBP)"
          currency-code="GBP"
          value={99.99}
          locale="en-GB"
          helper-text="British Pound format"
        ></r-currency-input>
        <r-currency-input
          label="Price (JPY)"
          currency-code="JPY"
          value={10000}
          precision={0}
          helper-text="Japanese Yen (no decimals)"
        ></r-currency-input>
      </div>

      <div class="example-group">
        <h3>📊 Budget Form</h3>
        <p>Complete budget form with multiple currency fields.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <r-currency-input
            label="Monthly Income"
            currency-code="USD"
            required
            helper-text="Your monthly income"
          ></r-currency-input>
          <r-currency-input
            label="Monthly Expenses"
            currency-code="USD"
            required
            helper-text="Your monthly expenses"
          ></r-currency-input>
          <r-currency-input
            label="Savings Goal"
            currency-code="USD"
            helper-text="Target savings amount"
          ></r-currency-input>
          <r-buttons position="end">
            <r-button color="primary" type="submit">Calculate Budget</r-button>
          </r-buttons>
        </form>
      </div>

      <div class="example-group">
        <h3>⚠️ Currency Input with Error</h3>
        <p>Demonstrates a currency input with validation error.</p>
        <r-currency-input
          label="Price"
          currency-code="USD"
          value={-10}
          error
          error-text="Amount must be greater than 0"
        ></r-currency-input>
      </div>

      <div class="example-group">
        <h3>🔒 Readonly Currency Display</h3>
        <p>A readonly currency input displaying a calculated total.</p>
        <r-currency-input
          label="Total Amount"
          currency-code="USD"
          value={299.99}
          readonly
          helper-text="Calculated total"
        ></r-currency-input>
      </div>

      <div class="example-group">
        <h3>📏 Price Range Validation</h3>
        <p>Currency input with min and max value constraints.</p>
        <r-currency-input
          label="Bid Amount"
          currency-code="USD"
          min={10}
          max={1000}
          helper-text="Enter amount between $10 and $1,000"
        ></r-currency-input>
      </div>

      <div class="example-group">
        <h3>🎨 Different Fill Styles</h3>
        <p>Currency inputs with different fill styles.</p>
        <r-currency-input
          label="Outline Style"
          currency-code="USD"
          fill="outline"
        ></r-currency-input>
        <r-currency-input
          label="Solid Style"
          currency-code="USD"
          fill="solid"
        ></r-currency-input>
      </div>

      <div class="example-group">
        <h3>🔢 Custom Precision</h3>
        <p>Currency inputs with different decimal precision.</p>
        <r-currency-input
          label="Price (2 decimals)"
          currency-code="USD"
          value={99.99}
          precision={2}
          helper-text="Standard precision"
        ></r-currency-input>
        <r-currency-input
          label="Price (3 decimals)"
          currency-code="USD"
          value={99.999}
          precision={3}
          helper-text="High precision"
        ></r-currency-input>
        <r-currency-input
          label="Price (0 decimals)"
          currency-code="USD"
          value={100}
          precision={0}
          helper-text="No decimals"
        ></r-currency-input>
      </div>
    </div>
  );
}

