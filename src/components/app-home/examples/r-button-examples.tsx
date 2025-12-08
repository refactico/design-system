import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderButtonExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Primary Button</h3>
        <r-button color="primary">Primary Button</r-button>
      </div>
      <div class="example-group">
        <h3>Secondary Button</h3>
        <r-button color="secondary">Secondary Button</r-button>
      </div>
      <div class="example-group">
        <h3>Danger Button</h3>
        <r-button color="danger">Danger Button</r-button>
      </div>
      <div class="example-group">
        <h3>Disabled Button</h3>
        <r-button disabled>Disabled Button</r-button>
      </div>
      <div class="example-group">
        <h3>Button with Icon</h3>
        <r-button icon="star" icon-position="start">Button with Icon</r-button>
      </div>
    </div>
  );
}

