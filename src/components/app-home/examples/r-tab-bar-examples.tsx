import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderTabBarExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div style={{ padding: '16px', marginBottom: '24px', background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px' }}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#856404' }}>⚠️ Important Note:</strong>
        <p style={{ margin: '0', color: '#856404', fontSize: '14px' }}>
          r-tab-bar must be used inside r-tabs container. It contains r-tab-button components.
        </p>
      </div>
      <div class="example-group">
        <h3>Bottom Tab Bar</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
          <r-tabs style={{ height: '400px', display: 'block', width: '100%' }}>
            <r-tab tab="tab1">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
                <h4>Tab 1 Content</h4>
                <p>This tab bar is positioned at the bottom.</p>
              </div>
            </r-tab>
            <r-tab tab="tab2">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
                <h4>Tab 2 Content</h4>
                <p>This tab bar is positioned at the bottom.</p>
              </div>
            </r-tab>
            <r-tab-bar position="bottom">
              <r-tab-button tab="tab1">
                <ion-icon name="home"></ion-icon>
                <ion-label>Home</ion-label>
              </r-tab-button>
              <r-tab-button tab="tab2">
                <ion-icon name="settings"></ion-icon>
                <ion-label>Settings</ion-label>
              </r-tab-button>
            </r-tab-bar>
          </r-tabs>
        </div>
      </div>
      <div class="example-group">
        <h3>Top Tab Bar</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
          <r-tabs style={{ height: '400px', display: 'block', width: '100%' }}>
            <r-tab-bar position="top">
              <r-tab-button tab="tab1">
                <ion-icon name="arrow-up"></ion-icon>
                <ion-label>Top</ion-label>
              </r-tab-button>
            </r-tab-bar>
            <r-tab tab="tab1">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
                <h4>Top Tab Bar</h4>
                <p>This tab bar is positioned at the top.</p>
              </div>
            </r-tab>
          </r-tabs>
        </div>
      </div>
    </div>
  );
}

