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

