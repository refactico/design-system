import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderTabButtonExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div style={{ padding: '16px', marginBottom: '24px', background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px' }}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#856404' }}>⚠️ Important Note:</strong>
        <p style={{ margin: '0', color: '#856404', fontSize: '14px' }}>
          r-tab-button must be used inside r-tab-bar, which is inside r-tabs container.
        </p>
      </div>
      <div class="example-group">
        <h3>Basic Tab Button</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
          <r-tabs style={{ height: '400px', display: 'block', width: '100%' }}>
            <r-tab tab="home">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
                <h4>Home Tab</h4>
                <p>This is a basic tab button example.</p>
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
      <div class="example-group">
        <h3>Tab Button with Badge</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
          <r-tabs style={{ height: '400px', display: 'block', width: '100%' }}>
            <r-tab tab="notifications">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
                <h4>Notifications</h4>
                <p>This tab button has a badge showing notification count.</p>
              </div>
            </r-tab>
            <r-tab-bar position="bottom">
              <r-tab-button tab="notifications" badge="3" badge-color="danger">
                <ion-icon name="notifications"></ion-icon>
                <ion-label>Notifications</ion-label>
              </r-tab-button>
            </r-tab-bar>
          </r-tabs>
        </div>
      </div>
      <div class="example-group">
        <h3>Disabled Tab Button</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
          <r-tabs style={{ height: '400px', display: 'block', width: '100%' }}>
            <r-tab tab="enabled">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
                <h4>Enabled Tab</h4>
                <p>The disabled tab button cannot be clicked.</p>
              </div>
            </r-tab>
            <r-tab-bar position="bottom">
              <r-tab-button tab="enabled">
                <ion-icon name="checkmark"></ion-icon>
                <ion-label>Enabled</ion-label>
              </r-tab-button>
              <r-tab-button tab="disabled" disabled>
                <ion-icon name="close"></ion-icon>
                <ion-label>Disabled</ion-label>
              </r-tab-button>
            </r-tab-bar>
          </r-tabs>
        </div>
      </div>
    </div>
  );
}

