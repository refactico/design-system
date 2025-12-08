import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderCardExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Card</h3>
        <r-card>
          <r-card-header>
            <r-card-title>Card Title</r-card-title>
            <r-card-subtitle>Card Subtitle</r-card-subtitle>
          </r-card-header>
          <r-card-content>
            <p>This is a basic card with header and content.</p>
          </r-card-content>
        </r-card>
      </div>
      <div class="example-group">
        <h3>Card with Color</h3>
        <r-card color="primary">
          <r-card-header>
            <r-card-title>Colored Card</r-card-title>
          </r-card-header>
          <r-card-content>
            <p>This card has a primary color applied.</p>
          </r-card-content>
        </r-card>
      </div>
      <div class="example-group">
        <h3>Clickable Card</h3>
        <r-card button>
          <r-card-header>
            <r-card-title>Clickable Card</r-card-title>
          </r-card-header>
          <r-card-content>
            <p>This card acts as a button and is clickable.</p>
          </r-card-content>
        </r-card>
      </div>
      <div class="example-group">
        <h3>Card with Image</h3>
        <r-card>
          <img src="https://via.placeholder.com/400x200?text=Card+Image" alt="Card Image" style={{ width: '100%', height: 'auto' }} />
          <r-card-header>
            <r-card-title>Card with Image</r-card-title>
          </r-card-header>
          <r-card-content>
            <p>This card includes an image at the top.</p>
          </r-card-content>
        </r-card>
      </div>
      <div class="example-group">
        <h3>Card with Buttons</h3>
        <r-card>
          <r-card-header>
            <r-card-title>Card with Actions</r-card-title>
          </r-card-header>
          <r-card-content>
            <p>This card has action buttons at the bottom.</p>
          </r-card-content>
          <r-card-footer>
            <r-button fill="clear">Action 1</r-button>
            <r-button fill="clear">Action 2</r-button>
          </r-card-footer>
        </r-card>
      </div>
    </div>
  );
}

