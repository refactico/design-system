import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderButtonsExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic R-Buttons</h3>
        <r-toolbar color="primary">
          <r-title text="R-Buttons Example"></r-title>
          <r-buttons position="end">
            <ion-button>
              <ion-icon slot="icon-only" name="search-outline"></ion-icon>
            </ion-button>
            <ion-button>
              <ion-icon slot="icon-only" name="more-outline"></ion-icon>
            </ion-button>
          </r-buttons>
        </r-toolbar>
      </div>
      <div class="example-group">
        <h3>R-Buttons with Multiple Buttons</h3>
        <r-toolbar color="primary">
          <r-buttons position="start">
            <ion-button>
              <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
            </ion-button>
          </r-buttons>
          <r-title text="Multiple R-Buttons"></r-title>
          <r-buttons position="end">
            <ion-button>
              <ion-icon slot="icon-only" name="search-outline"></ion-icon>
            </ion-button>
            <ion-button>
              <ion-icon slot="icon-only" name="notifications-outline"></ion-icon>
            </ion-button>
          </r-buttons>
        </r-toolbar>
      </div>
      <div class="example-group">
        <h3>Collapsible Buttons</h3>
        <r-toolbar color="primary">
          <r-title text="Collapsible Buttons"></r-title>
          <r-buttons position="end" collapse>
            <ion-button>
              <ion-icon slot="icon-only" name="search-outline"></ion-icon>
            </ion-button>
            <ion-button>
              <ion-icon slot="icon-only" name="notifications-outline"></ion-icon>
            </ion-button>
          </r-buttons>
        </r-toolbar>
      </div>
    </div>
  );
}

