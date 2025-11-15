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

