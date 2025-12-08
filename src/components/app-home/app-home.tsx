import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false,
})
export class AppHome {
  @State() selectedComponent: string | null = null;
  @State() sidebarCollapsed: boolean = false;
  @State() alertStates: { [key: string]: boolean } = {};

  private menuItems = [
    { id: 'r-button', name: 'Button', description: 'Button component that wraps Ionic button' },
    { id: 'r-input', name: 'Input', description: 'Input field component with password visibility toggle and validation support' },
    { id: 'r-dropdown', name: 'Dropdown', description: 'Dropdown component that wraps Ionic select with validation, error handling, and multiple selection support' },
    { id: 'r-datepicker', name: 'Datepicker', description: 'Datepicker component that wraps Ionic datetime with validation, error handling, and various presentation styles' },
    { id: 'r-alert', name: 'Alert', description: 'Alert component that wraps Ionic alert with inline usage support' },
    { id: 'r-header', name: 'Header', description: 'Header component that wraps Ionic header with toolbar and title support' },
    { id: 'r-toolbar', name: 'Toolbar', description: 'Toolbar component that wraps Ionic toolbar with support for buttons and content slots' },
    { id: 'r-title', name: 'Title', description: 'Title component that wraps Ionic title for use in toolbars and headers' },
    { id: 'r-buttons', name: 'Buttons', description: 'Buttons container component that wraps Ionic buttons with design system spacing' },
    { id: 'r-badge', name: 'Badge', description: 'Badge component that wraps Ionic badge for displaying notification counts, status indicators, or labels' },
    { id: 'r-card', name: 'Card', description: 'Card component that wraps Ionic card with design system styling and support for clickable cards' },
    { id: 'r-checkbox', name: 'Checkbox', description: 'Checkbox component that wraps Ionic checkbox with design system styling, supporting standalone and form field modes with comprehensive props' },
    { id: 'r-toggle', name: 'Toggle', description: 'Toggle switch component that wraps Ionic toggle with design system styling, supporting standalone and form field modes with comprehensive props' },
    { id: 'r-tabs', name: 'Tabs', description: 'Tabs navigation component family that wraps Ionic tabs, tab, tab-bar, and tab-button for complete tab-based navigation' },
    // Add more components here as they are created
  ];

  private handleItemClick = (itemId: string) => {
    this.selectedComponent = itemId;
  };

  private handleHomeClick = () => {
    this.selectedComponent = 'home';
  };

  private toggleSidebar = () => {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  };

  private openAlert = (alertId: string) => {
    this.alertStates = { ...this.alertStates, [alertId]: true };
  };

  private closeAlert = (alertId: string) => {
    this.alertStates = { ...this.alertStates, [alertId]: false };
  };

  render() {
    return (
      <div class="app-home-container">
        {/* Left Sidebar - Menu List */}
        <div class={{
          'app-home-sidebar': true,
          'app-home-sidebar--collapsed': this.sidebarCollapsed,
        }}>
          <button 
            class="sidebar-toggle"
            onClick={this.toggleSidebar}
            aria-label={this.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ion-icon name={this.sidebarCollapsed ? 'chevron-forward-outline' : 'chevron-back-outline'}></ion-icon>
          </button>
          {!this.sidebarCollapsed && (
            <>
              <h2 
                class={{
                  'sidebar-title': true,
                  'sidebar-title--active': this.selectedComponent === 'home' || !this.selectedComponent,
                }}
                onClick={this.handleHomeClick}
              >
                COMPONENTS
              </h2>
              <ul class="menu-list">
                {this.menuItems.map(item => (
                  <li
                    key={item.id}
                    class={{
                      'menu-item': true,
                      'menu-item--active': this.selectedComponent === item.id,
                    }}
                    onClick={() => this.handleItemClick(item.id)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Right Content Area */}
        <div class="app-home-content">
          {this.selectedComponent === 'home' || !this.selectedComponent ? (
            <div class="welcome-message">
              <h1>Hi</h1>
              <p>Welcome to Refactico. Select a component from the left to view its details.</p>
            </div>
          ) : (
            <div class="component-details">
              {this.menuItems
                .filter(item => item.id === this.selectedComponent)
                .map(item => (
                  <div key={item.id}>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    <div class="component-preview">
                      {this.selectedComponent === 'r-button' && (
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
                      )}
                      {this.selectedComponent === 'r-input' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic Input</h3>
                            <r-input label="Name" placeholder="Enter your name"></r-input>
                          </div>
                          <div class="example-group">
                            <h3>Email Input</h3>
                            <r-input type="email" label="Email" placeholder="Enter your email"></r-input>
                          </div>
                          <div class="example-group">
                            <h3>Password Input with Toggle</h3>
                            <r-input type="password" label="Password" placeholder="Enter your password" show-password-toggle></r-input>
                          </div>
                          <div class="example-group">
                            <h3>Input with Error</h3>
                            <r-input type="email" label="Email" value="invalid-email" error error-text="Please enter a valid email address"></r-input>
                          </div>
                          <div class="example-group">
                            <h3>Input with Helper Text</h3>
                            <r-input label="Username" placeholder="Enter username" helper-text="Username must be at least 3 characters"></r-input>
                          </div>
                          <div class="example-group">
                            <h3>Outline Style</h3>
                            <r-input label="Outline Input" placeholder="Enter text" fill="outline"></r-input>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-dropdown' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic Dropdown</h3>
                            <r-dropdown label="Country" placeholder="Select a country">
                              <ion-select-option value="us">United States</ion-select-option>
                              <ion-select-option value="uk">United Kingdom</ion-select-option>
                              <ion-select-option value="ca">Canada</ion-select-option>
                              <ion-select-option value="au">Australia</ion-select-option>
                            </r-dropdown>
                          </div>
                          <div class="example-group">
                            <h3>Dropdown with Default Value</h3>
                            <r-dropdown label="Size" value="medium">
                              <ion-select-option value="small">Small</ion-select-option>
                              <ion-select-option value="medium">Medium</ion-select-option>
                              <ion-select-option value="large">Large</ion-select-option>
                            </r-dropdown>
                          </div>
                          <div class="example-group">
                            <h3>Required Dropdown</h3>
                            <r-dropdown label="Favorite Color" placeholder="Select a color" required>
                              <ion-select-option value="red">Red</ion-select-option>
                              <ion-select-option value="green">Green</ion-select-option>
                              <ion-select-option value="blue">Blue</ion-select-option>
                            </r-dropdown>
                          </div>
                          <div class="example-group">
                            <h3>Dropdown with Error</h3>
                            <r-dropdown label="Required Field" placeholder="Select an option" error error-text="This field is required">
                              <ion-select-option value="option1">Option 1</ion-select-option>
                              <ion-select-option value="option2">Option 2</ion-select-option>
                            </r-dropdown>
                          </div>
                          <div class="example-group">
                            <h3>Dropdown with Helper Text</h3>
                            <r-dropdown label="Experience Level" placeholder="Select your level" helper-text="Choose the level that best describes your experience">
                              <ion-select-option value="beginner">Beginner</ion-select-option>
                              <ion-select-option value="intermediate">Intermediate</ion-select-option>
                              <ion-select-option value="advanced">Advanced</ion-select-option>
                            </r-dropdown>
                          </div>
                          <div class="example-group">
                            <h3>Multiple Selection</h3>
                            <r-dropdown label="Select Frameworks" placeholder="Choose multiple options" multiple>
                              <ion-select-option value="react">React</ion-select-option>
                              <ion-select-option value="vue">Vue</ion-select-option>
                              <ion-select-option value="angular">Angular</ion-select-option>
                              <ion-select-option value="svelte">Svelte</ion-select-option>
                            </r-dropdown>
                          </div>
                          <div class="example-group">
                            <h3>Outline Style</h3>
                            <r-dropdown label="Outline Style" placeholder="Select an option" fill="outline">
                              <ion-select-option value="option1">Option 1</ion-select-option>
                              <ion-select-option value="option2">Option 2</ion-select-option>
                            </r-dropdown>
                          </div>
                          <div class="example-group">
                            <h3>Disabled Dropdown</h3>
                            <r-dropdown label="Disabled Dropdown" placeholder="This dropdown is disabled" disabled>
                              <ion-select-option value="option1">Option 1</ion-select-option>
                              <ion-select-option value="option2">Option 2</ion-select-option>
                            </r-dropdown>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-datepicker' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic Datepicker</h3>
                            <r-datepicker label="Select Date" placeholder="Choose a date" presentation="date"></r-datepicker>
                          </div>
                          <div class="example-group">
                            <h3>Datepicker with Default Value</h3>
                            <r-datepicker label="Event Date" value="2024-12-25" presentation="date"></r-datepicker>
                          </div>
                          <div class="example-group">
                            <h3>Required Datepicker</h3>
                            <r-datepicker label="Appointment Date" placeholder="Select a date" required presentation="date"></r-datepicker>
                          </div>
                          <div class="example-group">
                            <h3>Datepicker with Error</h3>
                            <r-datepicker label="Required Field" placeholder="Select a date" error error-text="This field is required" presentation="date"></r-datepicker>
                          </div>
                          <div class="example-group">
                            <h3>Datepicker with Helper Text</h3>
                            <r-datepicker label="Event Date" placeholder="Select a date" helper-text="Please select a date for your event" presentation="date"></r-datepicker>
                          </div>
                          <div class="example-group">
                            <h3>Time Picker</h3>
                            <r-datepicker label="Time" placeholder="Select a time" presentation="time"></r-datepicker>
                          </div>
                          <div class="example-group">
                            <h3>Date & Time Picker</h3>
                            <r-datepicker label="Date & Time" placeholder="Select date and time" presentation="date-time"></r-datepicker>
                          </div>
                          <div class="example-group">
                            <h3>With Min/Max Date</h3>
                            <r-datepicker label="Date Range" placeholder="Select a date" min="2024-01-01" max="2024-12-31" presentation="date"></r-datepicker>
                          </div>
                          <div class="example-group">
                            <h3>Outline Style</h3>
                            <r-datepicker label="Outline Style" placeholder="Select a date" fill="outline" presentation="date"></r-datepicker>
                          </div>
                          <div class="example-group">
                            <h3>Disabled Datepicker</h3>
                            <r-datepicker label="Disabled Datepicker" placeholder="This datepicker is disabled" disabled presentation="date"></r-datepicker>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-alert' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic Alert</h3>
                            <r-button onClick={() => this.openAlert('basic')}>Open Basic Alert</r-button>
                            <r-alert
                              isOpen={this.alertStates['basic'] || false}
                              header="Alert"
                              message="This is a basic alert message."
                              buttons="OK"
                              onRDidDismiss={() => this.closeAlert('basic')}
                            ></r-alert>
                          </div>
                          <div class="example-group">
                            <h3>Alert with SubHeader</h3>
                            <r-button onClick={() => this.openAlert('subheader')}>Open Alert with SubHeader</r-button>
                            <r-alert
                              isOpen={this.alertStates['subheader'] || false}
                              header="Alert Title"
                              subHeader="Subheader"
                              message="This alert has a subheader."
                              buttons="OK"
                              onRDidDismiss={() => this.closeAlert('subheader')}
                            ></r-alert>
                          </div>
                          <div class="example-group">
                            <h3>Alert with Multiple Buttons</h3>
                            <r-button onClick={() => this.openAlert('multiple')}>Open Alert with Multiple Buttons</r-button>
                            <r-alert
                              isOpen={this.alertStates['multiple'] || false}
                              header="Confirm"
                              message="Are you sure you want to proceed?"
                              buttons={[
                                { text: 'Cancel', role: 'cancel' },
                                { text: 'OK', role: 'confirm' }
                              ]}
                              onRDidDismiss={() => this.closeAlert('multiple')}
                            ></r-alert>
                          </div>
                          <div class="example-group">
                            <h3>Destructive Alert</h3>
                            <r-button color="danger" onClick={() => this.openAlert('destructive')}>Open Destructive Alert</r-button>
                            <r-alert
                              isOpen={this.alertStates['destructive'] || false}
                              header="Delete Item"
                              message="This action cannot be undone."
                              color="danger"
                              buttons={[
                                { text: 'Cancel', role: 'cancel' },
                                { text: 'Delete', role: 'destructive' }
                              ]}
                              onRDidDismiss={() => this.closeAlert('destructive')}
                            ></r-alert>
                          </div>
                          <div class="example-group">
                            <h3>Success Alert</h3>
                            <r-button color="success" onClick={() => this.openAlert('success')}>Open Success Alert</r-button>
                            <r-alert
                              isOpen={this.alertStates['success'] || false}
                              header="Success!"
                              message="Your action was completed successfully."
                              color="success"
                              buttons="OK"
                              onRDidDismiss={() => this.closeAlert('success')}
                            ></r-alert>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-header' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic Header</h3>
                            <r-header title="My App"></r-header>
                          </div>
                          <div class="example-group">
                            <h3>Header with Color</h3>
                            <r-header title="Colored Header" color="primary"></r-header>
                          </div>
                          <div class="example-group">
                            <h3>Header with Buttons</h3>
                            <r-header title="Header with Buttons">
                              <ion-buttons slot="start">
                                <ion-button>
                                  <ion-icon slot="icon-only" name="menu-outline"></ion-icon>
                                </ion-button>
                              </ion-buttons>
                              <ion-buttons slot="end">
                                <ion-button>
                                  <ion-icon slot="icon-only" name="search-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="more-outline"></ion-icon>
                                </ion-button>
                              </ion-buttons>
                            </r-header>
                          </div>
                          <div class="example-group">
                            <h3>Header with Multiple Buttons</h3>
                            <r-header title="Multiple Buttons">
                              <ion-buttons slot="start">
                                <ion-button>
                                  <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="menu-outline"></ion-icon>
                                </ion-button>
                              </ion-buttons>
                              <ion-buttons slot="end">
                                <ion-button>
                                  <ion-icon slot="icon-only" name="search-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="notifications-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="settings-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="more-outline"></ion-icon>
                                </ion-button>
                              </ion-buttons>
                            </r-header>
                          </div>
                          <div class="example-group">
                            <h3>Translucent Header</h3>
                            <div style={{ background: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)', padding: '20px', minHeight: '100px', borderRadius: '8px' }}>
                              <r-header title="Translucent Header" translucent></r-header>
                              <div style={{ padding: '20px', color: 'white' }}>Content below translucent header</div>
                            </div>
                          </div>
                          <div class="example-group">
                            <h3>Header Without Border</h3>
                            <r-header title="Header Without Border" no-border></r-header>
                          </div>
                          <div class="example-group">
                            <h3>Secondary Color Header</h3>
                            <r-header title="Secondary Header" color="secondary"></r-header>
                          </div>
                          <div class="example-group">
                            <h3>Danger Color Header</h3>
                            <r-header title="Danger Header" color="danger"></r-header>
                          </div>
                          <div class="example-group">
                            <h3>Success Color Header</h3>
                            <r-header title="Success Header" color="success"></r-header>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-toolbar' && (
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
                                <ion-button>
                                  <ion-icon slot="icon-only" name="more-outline"></ion-icon>
                                </ion-button>
                              </ion-buttons>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Toolbar with Multiple Buttons</h3>
                            <r-toolbar color="primary">
                              <ion-title>Multiple Buttons</ion-title>
                              <ion-buttons slot="start">
                                <ion-button>
                                  <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="menu-outline"></ion-icon>
                                </ion-button>
                              </ion-buttons>
                              <ion-buttons slot="end">
                                <ion-button>
                                  <ion-icon slot="icon-only" name="search-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="notifications-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="settings-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="more-outline"></ion-icon>
                                </ion-button>
                              </ion-buttons>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Translucent Toolbar</h3>
                            <div style={{ background: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)', padding: '20px', minHeight: '100px', borderRadius: '8px' }}>
                              <r-toolbar color="primary" translucent>
                                <ion-title>Translucent Toolbar</ion-title>
                              </r-toolbar>
                              <div style={{ padding: '20px', color: 'white' }}>Content below translucent toolbar</div>
                            </div>
                          </div>
                          <div class="example-group">
                            <h3>Toolbar Without Border</h3>
                            <r-toolbar color="primary" no-border>
                              <ion-title>Toolbar Without Border</ion-title>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Secondary Color Toolbar</h3>
                            <r-toolbar color="secondary">
                              <ion-title>Secondary Toolbar</ion-title>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Danger Color Toolbar</h3>
                            <r-toolbar color="danger">
                              <ion-title>Danger Toolbar</ion-title>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Success Color Toolbar</h3>
                            <r-toolbar color="success">
                              <ion-title>Success Toolbar</ion-title>
                            </r-toolbar>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-title' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic Title</h3>
                            <r-toolbar color="primary">
                              <r-title text="Page Title"></r-title>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Title with Slot</h3>
                            <r-toolbar color="primary">
                              <r-title>Title from Slot</r-title>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Size Comparison (Side by Side)</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              <r-toolbar color="primary">
                                <r-title text="Large Title (36px)" size="large"></r-title>
                              </r-toolbar>
                              <r-toolbar color="primary">
                                <r-title text="Default Title (20px)"></r-title>
                              </r-toolbar>
                              <r-toolbar color="primary">
                                <r-title text="Small Title (12px)" size="small"></r-title>
                              </r-toolbar>
                            </div>
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
                            <h3>Title in Header</h3>
                            <r-header color="primary">
                              <r-toolbar color="primary">
                                <r-title text="Header Title"></r-title>
                                <ion-buttons slot="end">
                                  <ion-button>
                                    <ion-icon slot="icon-only" name="more-outline"></ion-icon>
                                  </ion-button>
                                </ion-buttons>
                              </r-toolbar>
                            </r-header>
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
                          <div class="example-group">
                            <h3>Long Title</h3>
                            <r-toolbar color="primary">
                              <r-title text="This is a Very Long Title That Should Wrap or Truncate Properly"></r-title>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Secondary Color Title</h3>
                            <r-toolbar color="secondary">
                              <r-title text="Secondary Title"></r-title>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Danger Color Title</h3>
                            <r-toolbar color="danger">
                              <r-title text="Danger Title"></r-title>
                            </r-toolbar>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-buttons' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic R-Buttons</h3>
                            <r-toolbar color="primary">
                              <r-title text="R-Buttons Example"></r-title>
                              <r-buttons slot="end">
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
                              <r-buttons slot="start">
                                <ion-button>
                                  <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="menu-outline"></ion-icon>
                                </ion-button>
                              </r-buttons>
                              <r-title text="Multiple R-Buttons"></r-title>
                              <r-buttons slot="end">
                                <ion-button>
                                  <ion-icon slot="icon-only" name="search-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="notifications-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="settings-outline"></ion-icon>
                                </ion-button>
                              </r-buttons>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Text Buttons</h3>
                            <r-toolbar color="primary">
                              <r-title text="Text Buttons"></r-title>
                              <r-buttons slot="end">
                                <ion-button fill="clear">Save</ion-button>
                                <ion-button fill="clear">Cancel</ion-button>
                              </r-buttons>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>Collapsible Buttons</h3>
                            <r-toolbar color="primary">
                              <r-title text="Collapsible Buttons"></r-title>
                              <r-buttons slot="end" collapse>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="search-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="notifications-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="settings-outline"></ion-icon>
                                </ion-button>
                                <ion-button>
                                  <ion-icon slot="icon-only" name="more-outline"></ion-icon>
                                </ion-button>
                              </r-buttons>
                            </r-toolbar>
                          </div>
                          <div class="example-group">
                            <h3>In Header</h3>
                            <r-header color="primary">
                              <r-toolbar color="primary">
                                <r-buttons slot="start">
                                  <ion-button>
                                    <ion-icon slot="icon-only" name="menu-outline"></ion-icon>
                                  </ion-button>
                                </r-buttons>
                                <r-title text="Header with Buttons"></r-title>
                                <r-buttons slot="end">
                                  <ion-button>
                                    <ion-icon slot="icon-only" name="search-outline"></ion-icon>
                                  </ion-button>
                                  <ion-button>
                                    <ion-icon slot="icon-only" name="more-outline"></ion-icon>
                                  </ion-button>
                                </r-buttons>
                              </r-toolbar>
                            </r-header>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-badge' && (
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
                            <h3>Secondary Badge</h3>
                            <r-badge color="secondary">3</r-badge>
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
                            <h3>Warning Badge</h3>
                            <r-badge color="warning">!</r-badge>
                          </div>
                          <div class="example-group">
                            <h3>Badge on Button</h3>
                            <ion-button color="primary">
                              <ion-icon slot="icon-only" name="notifications-outline"></ion-icon>
                              <r-badge color="danger">5</r-badge>
                            </ion-button>
                          </div>
                          <div class="example-group">
                            <h3>Badge on Icon</h3>
                            <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                              <ion-icon name="mail-outline" style={{ fontSize: '32px' }}></ion-icon>
                              <r-badge color="primary" style={{ position: 'absolute', top: '10px', right: '10px' }}>3</r-badge>
                            </div>
                          </div>
                          <div class="example-group">
                            <h3>Large Number Badge</h3>
                            <r-badge color="primary">999</r-badge>
                          </div>
                          <div class="example-group">
                            <h3>Text Badge</h3>
                            <r-badge color="success">New</r-badge>
                          </div>
                          <div class="example-group">
                            <h3>Color Variants</h3>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              <r-badge color="primary">Primary</r-badge>
                              <r-badge color="secondary">Secondary</r-badge>
                              <r-badge color="tertiary">Tertiary</r-badge>
                              <r-badge color="success">Success</r-badge>
                              <r-badge color="warning">Warning</r-badge>
                              <r-badge color="danger">Danger</r-badge>
                              <r-badge color="light">Light</r-badge>
                              <r-badge color="medium">Medium</r-badge>
                              <r-badge color="dark">Dark</r-badge>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-card' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic Card</h3>
                            <r-card>
                              <r-card-header>
                                <r-card-title>Card Title</r-card-title>
                                <r-card-subtitle>Card Subtitle</r-card-subtitle>
                              </r-card-header>
                              <r-card-content>
                                <p>This is a basic card with header and content.</p>
                              </r-card-content>
                            </r-card>
                          </div>
                          <div class="example-group">
                            <h3>Card with Color</h3>
                            <r-card color="primary">
                              <r-card-header>
                                <r-card-title>Colored Card</r-card-title>
                              </r-card-header>
                              <r-card-content>
                                <p>This card has a primary color applied.</p>
                              </r-card-content>
                            </r-card>
                          </div>
                          <div class="example-group">
                            <h3>Clickable Card (Button)</h3>
                            <r-card button>
                              <r-card-header>
                                <r-card-title>Clickable Card</r-card-title>
                              </r-card-header>
                              <r-card-content>
                                <p>This card acts as a button and is clickable. Hover to see the effect.</p>
                              </r-card-content>
                            </r-card>
                          </div>
                          <div class="example-group">
                            <h3>Card with Image</h3>
                            <r-card>
                              <img src="https://via.placeholder.com/400x200?text=Card+Image" alt="Card Image" style={{ width: '100%', height: 'auto' }} />
                              <r-card-header>
                                <r-card-title>Card with Image</r-card-title>
                                <r-card-subtitle>Image Subtitle</r-card-subtitle>
                              </r-card-header>
                              <r-card-content>
                                <p>This card includes an image at the top.</p>
                              </r-card-content>
                            </r-card>
                          </div>
                          <div class="example-group">
                            <h3>Card with Buttons</h3>
                            <r-card>
                              <r-card-header>
                                <r-card-title>Card with Actions</r-card-title>
                              </r-card-header>
                              <r-card-content>
                                <p>This card has action buttons at the bottom.</p>
                              </r-card-content>
                              <r-card-footer>
                                <r-button fill="clear">Action 1</r-button>
                                <r-button fill="clear">Action 2</r-button>
                              </r-card-footer>
                            </r-card>
                          </div>
                          <div class="example-group">
                            <h3>Disabled Card</h3>
                            <r-card button disabled>
                              <r-card-header>
                                <r-card-title>Disabled Card</r-card-title>
                              </r-card-header>
                              <r-card-content>
                                <p>This card is disabled and cannot be interacted with.</p>
                              </r-card-content>
                            </r-card>
                          </div>
                          <div class="example-group">
                            <h3>Card Color Variants</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              <r-card color="primary">
                                <r-card-header>
                                  <r-card-title>Primary Card</r-card-title>
                                </r-card-header>
                                <r-card-content>
                                  <p>Primary colored card.</p>
                                </r-card-content>
                              </r-card>
                              <r-card color="secondary">
                                <r-card-header>
                                  <r-card-title>Secondary Card</r-card-title>
                                </r-card-header>
                                <r-card-content>
                                  <p>Secondary colored card.</p>
                                </r-card-content>
                              </r-card>
                              <r-card color="success">
                                <r-card-header>
                                  <r-card-title>Success Card</r-card-title>
                                </r-card-header>
                                <r-card-content>
                                  <p>Success colored card.</p>
                                </r-card-content>
                              </r-card>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-checkbox' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic Checkbox</h3>
                            <r-checkbox>Accept Terms and Conditions</r-checkbox>
                          </div>
                          <div class="example-group">
                            <h3>Checked Checkbox</h3>
                            <r-checkbox checked>Already Checked</r-checkbox>
                          </div>
                          <div class="example-group">
                            <h3>Disabled Checkbox</h3>
                            <r-checkbox disabled>Disabled Checkbox</r-checkbox>
                          </div>
                          <div class="example-group">
                            <h3>Disabled and Checked</h3>
                            <r-checkbox disabled checked>Disabled and Checked</r-checkbox>
                          </div>
                          <div class="example-group">
                            <h3>Checkbox with Color</h3>
                            <r-checkbox color="primary" checked>Primary Checkbox</r-checkbox>
                          </div>
                          <div class="example-group">
                            <h3>Indeterminate State (Select All)</h3>
                            <r-checkbox indeterminate>Select All</r-checkbox>
                          </div>
                          <div class="example-group">
                            <h3>Form Field Mode</h3>
                            <r-checkbox form-field label="Agree to Terms" helper-text="You must agree to continue">
                              I agree to the terms and conditions
                            </r-checkbox>
                          </div>
                          <div class="example-group">
                            <h3>Form Field with Error</h3>
                            <r-checkbox form-field label="Required Field" error error-text="This field is required">
                              Required checkbox
                            </r-checkbox>
                          </div>
                          <div class="example-group">
                            <h3>Required Checkbox</h3>
                            <r-checkbox required label="I agree to the terms">
                              Required checkbox
                            </r-checkbox>
                          </div>
                          <div class="example-group">
                            <h3>Checkbox List</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <r-checkbox value="option1" checked>Option 1</r-checkbox>
                              <r-checkbox value="option2">Option 2</r-checkbox>
                              <r-checkbox value="option3" checked>Option 3</r-checkbox>
                              <r-checkbox value="option4">Option 4</r-checkbox>
                            </div>
                          </div>
                          <div class="example-group">
                            <h3>Select All Pattern</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <r-checkbox indeterminate justify="space-between">Select All</r-checkbox>
                              <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <r-checkbox value="item1" checked>Item 1</r-checkbox>
                                <r-checkbox value="item2" checked>Item 2</r-checkbox>
                                <r-checkbox value="item3">Item 3</r-checkbox>
                              </div>
                            </div>
                          </div>
                          <div class="example-group">
                            <h3>Label Placement Variants</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <r-checkbox label-placement="start" checked>Label on Start</r-checkbox>
                              <r-checkbox label-placement="end" checked>Label on End (Default)</r-checkbox>
                              <r-checkbox label-placement="fixed" checked>Label Fixed</r-checkbox>
                              <r-checkbox label-placement="stacked" checked>Label Stacked</r-checkbox>
                            </div>
                          </div>
                          <div class="example-group">
                            <h3>Color Variants</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <r-checkbox color="primary" checked>Primary</r-checkbox>
                              <r-checkbox color="secondary" checked>Secondary</r-checkbox>
                              <r-checkbox color="success" checked>Success</r-checkbox>
                              <r-checkbox color="warning" checked>Warning</r-checkbox>
                              <r-checkbox color="danger" checked>Danger</r-checkbox>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-toggle' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic Toggle</h3>
                            <r-toggle>Enable Notifications</r-toggle>
                          </div>
                          <div class="example-group">
                            <h3>Checked Toggle</h3>
                            <r-toggle checked>Already Enabled</r-toggle>
                          </div>
                          <div class="example-group">
                            <h3>Disabled Toggle</h3>
                            <r-toggle disabled>Disabled Toggle</r-toggle>
                          </div>
                          <div class="example-group">
                            <h3>Disabled and Checked</h3>
                            <r-toggle disabled checked>Disabled and Checked</r-toggle>
                          </div>
                          <div class="example-group">
                            <h3>Toggle with Color</h3>
                            <r-toggle color="primary" checked>Primary Toggle</r-toggle>
                          </div>
                          <div class="example-group">
                            <h3>Toggle with On/Off Labels</h3>
                            <r-toggle enable-on-off-labels checked>Toggle with Labels</r-toggle>
                          </div>
                          <div class="example-group">
                            <h3>Form Field Mode</h3>
                            <r-toggle form-field label="Enable Feature" helper-text="Turn this feature on or off">
                              Enable notifications
                            </r-toggle>
                          </div>
                          <div class="example-group">
                            <h3>Form Field with Error</h3>
                            <r-toggle form-field label="Required Field" error error-text="This field is required">
                              Required toggle
                            </r-toggle>
                          </div>
                          <div class="example-group">
                            <h3>Required Toggle</h3>
                            <r-toggle required label="I agree to the terms">
                              Required toggle
                            </r-toggle>
                          </div>
                          <div class="example-group">
                            <h3>Toggle List</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <r-toggle value="option1" checked>Enable Option 1</r-toggle>
                              <r-toggle value="option2">Enable Option 2</r-toggle>
                              <r-toggle value="option3" checked>Enable Option 3</r-toggle>
                              <r-toggle value="option4">Enable Option 4</r-toggle>
                            </div>
                          </div>
                          <div class="example-group">
                            <h3>Settings Panel Pattern</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <r-toggle justify="space-between" checked>Push Notifications</r-toggle>
                              <r-toggle justify="space-between" checked>Email Notifications</r-toggle>
                              <r-toggle justify="space-between">SMS Notifications</r-toggle>
                              <r-toggle justify="space-between" checked>Marketing Emails</r-toggle>
                            </div>
                          </div>
                          <div class="example-group">
                            <h3>Label Placement Variants</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <r-toggle label-placement="start" checked>Label on Start</r-toggle>
                              <r-toggle label-placement="end" checked>Label on End (Default)</r-toggle>
                              <r-toggle label-placement="fixed" checked>Label Fixed</r-toggle>
                              <r-toggle label-placement="stacked" checked>Label Stacked</r-toggle>
                            </div>
                          </div>
                          <div class="example-group">
                            <h3>Color Variants</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <r-toggle color="primary" checked>Primary</r-toggle>
                              <r-toggle color="secondary" checked>Secondary</r-toggle>
                              <r-toggle color="success" checked>Success</r-toggle>
                              <r-toggle color="warning" checked>Warning</r-toggle>
                              <r-toggle color="danger" checked>Danger</r-toggle>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.selectedComponent === 'r-tabs' && (
                        <div class="preview-examples">
                          <h2>Examples</h2>
                          <div class="example-group">
                            <h3>Basic Tabs Structure</h3>
                            <p style={{ marginBottom: '16px', color: '#666' }}>
                              Tabs require all components working together: r-tabs, r-tab, r-tab-bar, and r-tab-button
                            </p>
                            <r-tabs>
                              <r-tab tab="home">
                                <div style={{ padding: '20px' }}>
                                  <h4>Home Tab Content</h4>
                                  <p>This is the home tab content area.</p>
                                </div>
                              </r-tab>
                              <r-tab tab="settings">
                                <div style={{ padding: '20px' }}>
                                  <h4>Settings Tab Content</h4>
                                  <p>This is the settings tab content area.</p>
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
                          <div class="example-group">
                            <h3>Tab Button with Badge</h3>
                            <r-tabs>
                              <r-tab tab="notifications">
                                <div style={{ padding: '20px' }}>
                                  <h4>Notifications</h4>
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
                          <div class="example-group">
                            <h3>Tab Button Layouts</h3>
                            <p style={{ marginBottom: '16px', color: '#666' }}>
                              Different layout options for tab buttons
                            </p>
                            <r-tabs>
                              <r-tab tab="tab1">
                                <div style={{ padding: '20px' }}>Tab 1</div>
                              </r-tab>
                              <r-tab-bar position="bottom">
                                <r-tab-button tab="tab1" layout="icon-top">
                                  <ion-icon name="home"></ion-icon>
                                  <ion-label>Icon Top</ion-label>
                                </r-tab-button>
                              </r-tab-bar>
                            </r-tabs>
                          </div>
                          <div class="example-group">
                            <h3>Disabled Tab Button</h3>
                            <r-tabs>
                              <r-tab tab="enabled">
                                <div style={{ padding: '20px' }}>Enabled Tab</div>
                              </r-tab>
                              <r-tab tab="disabled">
                                <div style={{ padding: '20px' }}>Disabled Tab</div>
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
                          <div class="example-group">
                            <h3>Tabs with Color</h3>
                            <r-tabs color="primary">
                              <r-tab tab="colored">
                                <div style={{ padding: '20px' }}>Colored Tabs</div>
                              </r-tab>
                              <r-tab-bar slot="bottom" color="primary">
                                <r-tab-button tab="colored" color="primary">
                                  <ion-icon name="color-palette"></ion-icon>
                                  <ion-label>Colored</ion-label>
                                </r-tab-button>
                              </r-tab-bar>
                            </r-tabs>
                          </div>
                          <div class="example-group">
                            <h3>Top Tab Bar</h3>
                            <r-tabs>
                              <r-tab tab="top-tab">
                                <div style={{ padding: '20px' }}>Top Tab Bar Example</div>
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
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

