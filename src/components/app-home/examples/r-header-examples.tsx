import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderHeaderExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Header</h3>
        <r-header header-title="My App"></r-header>
      </div>
      <div class="example-group">
        <h3>Header with Color</h3>
        <r-header header-title="Colored Header" color="primary"></r-header>
      </div>
      <div class="example-group">
        <h3>Header with Buttons</h3>
        <r-header header-title="Header with Buttons">
          <ion-buttons slot="start">
            <ion-button>
              <ion-icon slot="icon-only" name="menu-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button>
              <ion-icon slot="icon-only" name="search-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </r-header>
      </div>
      <div class="example-group">
        <h3>Translucent Header</h3>
        <div style={{ background: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)', padding: '20px', minHeight: '100px', borderRadius: '8px' }}>
          <r-header header-title="Translucent Header" translucent></r-header>
          <div style={{ padding: '20px', color: 'white' }}>Content below translucent header</div>
        </div>
      </div>
    </div>
  );
}

