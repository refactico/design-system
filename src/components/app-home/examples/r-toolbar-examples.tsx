import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderToolbarExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Toolbar</h3>
        <r-toolbar></r-toolbar>
      </div>
      <div class="example-group">
        <h3>Toolbar with Color</h3>
        <r-toolbar color="primary">
          <ion-title>Colored Toolbar</ion-title>
        </r-toolbar>
      </div>
      <div class="example-group">
        <h3>Toolbar with Buttons</h3>
        <r-toolbar color="primary">
          <ion-title>Toolbar with Buttons</ion-title>
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
        </r-toolbar>
      </div>
    </div>
  );
}

