import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderTabExamples(_context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div style={{ padding: '16px', marginBottom: '24px', background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px' }}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#856404' }}>⚠️ Important Note:</strong>
        <p style={{ margin: '0', color: '#856404', fontSize: '14px' }}>
          r-tab must be used inside r-tabs container. This example shows a single tab within a tabs container.
        </p>
      </div>
      <div class="example-group">
        <h3>Basic Tab</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
          <r-tabs style={{ height: '400px', display: 'block', width: '100%' }}>
            <r-tab tab="home">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
                <h4>Tab Content</h4>
                <p>This is the content for this tab.</p>
              </div>
            </r-tab>
            <r-tab-bar position="bottom">
              <r-tab-button tab="home">
                <ion-icon name="home"></ion-icon>
                <ion-label>Home</ion-label>
              </r-tab-button>
            </r-tab-bar>
          </r-tabs>
        </div>
      </div>
    </div>
  );
}

