import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderTabsExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div style={{ padding: '16px', marginBottom: '24px', background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px' }}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#856404' }}>⚠️ Important Note:</strong>
        <p style={{ margin: '0', color: '#856404', fontSize: '14px' }}>
          Ionic tabs require routing setup to be fully functional. In a real application, tabs work with your router (Angular Router, React Router, Vue Router, etc.). 
          The examples below show the component structure and styling, but tab switching requires proper routing integration.
        </p>
      </div>
      <div class="example-group">
        <h3>Basic Tabs Structure</h3>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          Tabs require all components working together: r-tabs, r-tab, r-tab-bar, and r-tab-button.
        </p>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
          <r-tabs style={{ height: '400px', display: 'block', width: '100%' }}>
            <r-tab tab="home">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
                <h4>Home Tab Content</h4>
                <p>This is the home tab content area.</p>
                <p style={{ color: '#666', fontSize: '14px' }}>This demonstrates the tabs structure. In a real app with routing, clicking tab buttons would navigate between views.</p>
              </div>
            </r-tab>
            <r-tab tab="settings">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
                <h4>Settings Tab Content</h4>
                <p>This is the settings tab content area.</p>
                <p style={{ color: '#666', fontSize: '14px' }}>This demonstrates the tabs structure. In a real app with routing, clicking tab buttons would navigate between views.</p>
              </div>
            </r-tab>
            <r-tab-bar position="bottom">
              <r-tab-button tab="home">
                <ion-icon name="home"></ion-icon>
                <ion-label>Home</ion-label>
              </r-tab-button>
              <r-tab-button tab="settings">
                <ion-icon name="settings"></ion-icon>
                <ion-label>Settings</ion-label>
              </r-tab-button>
            </r-tab-bar>
          </r-tabs>
        </div>
      </div>
      <div class="example-group">
        <h3>Tab Button with Badge</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <r-tabs style={{ height: '300px', display: 'block' }}>
            <r-tab tab="notifications">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
                <h4>Notifications</h4>
                <p>Tab button with badge showing notification count.</p>
              </div>
            </r-tab>
            <r-tab-bar position="bottom">
              <r-tab-button tab="notifications" badge="5" badge-color="danger">
                <ion-icon name="notifications"></ion-icon>
                <ion-label>Notifications</ion-label>
              </r-tab-button>
            </r-tab-bar>
          </r-tabs>
        </div>
      </div>
      <div class="example-group">
        <h3>Tab Button Layouts</h3>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          Different layout options for tab buttons
        </p>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <r-tabs style={{ height: '300px', display: 'block' }}>
            <r-tab tab="tab1">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>Tab 1</div>
            </r-tab>
            <r-tab-bar position="bottom">
              <r-tab-button tab="tab1" layout="icon-top">
                <ion-icon name="home"></ion-icon>
                <ion-label>Icon Top</ion-label>
              </r-tab-button>
            </r-tab-bar>
          </r-tabs>
        </div>
      </div>
      <div class="example-group">
        <h3>Disabled Tab Button</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <r-tabs style={{ height: '300px', display: 'block' }}>
            <r-tab tab="enabled">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>Enabled Tab</div>
            </r-tab>
            <r-tab tab="disabled">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>Disabled Tab</div>
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
      <div class="example-group">
        <h3>Tabs with Color</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <r-tabs color="primary" style={{ height: '400px', display: 'block' }}>
            <r-tab tab="colored">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>Colored Tabs</div>
            </r-tab>
            <r-tab-bar position="bottom" color="primary">
              <r-tab-button tab="colored" color="primary">
                <ion-icon name="color-palette"></ion-icon>
                <ion-label>Colored</ion-label>
              </r-tab-button>
            </r-tab-bar>
          </r-tabs>
        </div>
      </div>
      <div class="example-group">
        <h3>Top Tab Bar</h3>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <r-tabs style={{ height: '300px', display: 'block' }}>
            <r-tab tab="top-tab">
              <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>Top Tab Bar Example</div>
            </r-tab>
            <r-tab-bar position="top">
              <r-tab-button tab="top-tab">
                <ion-icon name="arrow-up"></ion-icon>
                <ion-label>Top</ion-label>
              </r-tab-button>
            </r-tab-bar>
          </r-tabs>
        </div>
      </div>
    </div>
  );
}

