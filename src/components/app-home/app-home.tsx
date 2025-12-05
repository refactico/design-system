import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false,
})
export class AppHome {
  @State() selectedComponent: string | null = null;
  @State() sidebarCollapsed: boolean = false;

  private menuItems = [
    { id: 'r-button', name: 'Button', description: 'Button component that wraps Ionic button' },
    { id: 'r-input', name: 'Input', description: 'Input field component with password visibility toggle and validation support' },
    { id: 'r-dropdown', name: 'Dropdown', description: 'Dropdown component that wraps Ionic select with validation, error handling, and multiple selection support' },
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

