import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderBadgeExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Badge</h3>
        <r-badge>5</r-badge>
      </div>
      <div class="example-group">
        <h3>Badge with Color</h3>
        <r-badge color="primary">12</r-badge>
      </div>
      <div class="example-group">
        <h3>Danger Badge</h3>
        <r-badge color="danger">99+</r-badge>
      </div>
      <div class="example-group">
        <h3>Success Badge</h3>
        <r-badge color="success">New</r-badge>
      </div>
      <div class="example-group">
        <h3>Badge on Button</h3>
        <ion-button color="primary">
          <ion-icon slot="icon-only" name="notifications-outline"></ion-icon>
          <r-badge color="danger">5</r-badge>
        </ion-button>
      </div>
      <div class="example-group">
        <h3>Color Variants</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <r-badge color="primary">Primary</r-badge>
          <r-badge color="secondary">Secondary</r-badge>
          <r-badge color="success">Success</r-badge>
          <r-badge color="warning">Warning</r-badge>
          <r-badge color="danger">Danger</r-badge>
        </div>
      </div>
    </div>
  );
}

