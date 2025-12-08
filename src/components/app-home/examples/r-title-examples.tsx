import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderTitleExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Title</h3>
        <r-toolbar color="primary">
          <r-title text="Page Title"></r-title>
        </r-toolbar>
      </div>
      <div class="example-group">
        <h3>Large Title</h3>
        <r-toolbar color="primary">
          <r-title text="Large Title" size="large"></r-title>
        </r-toolbar>
      </div>
      <div class="example-group">
        <h3>Small Title</h3>
        <r-toolbar color="primary">
          <r-title text="Small Title" size="small"></r-title>
        </r-toolbar>
      </div>
      <div class="example-group">
        <h3>Title with Buttons</h3>
        <r-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button>
              <ion-icon slot="icon-only" name="menu-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
          <r-title text="Title with Buttons"></r-title>
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

