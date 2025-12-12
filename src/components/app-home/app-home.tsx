import { Component, State, h } from '@stencil/core';
import { componentExamples } from './examples';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false,
})
export class AppHome {
  @State() selectedComponent: string | null = null;
  @State() sidebarCollapsed: boolean = false;
  @State() alertStates: { [key: string]: boolean } = {};
  @State() activeTabs: { [key: string]: string } = {}; // Track active tab for each tabs instance

  private menuItems = [
    { id: 'r-button', name: 'Button', description: 'Button component that wraps Ionic button' },
    { id: 'r-input', name: 'Input', description: 'Input field component with password visibility toggle and validation support' },
    { id: 'r-textarea', name: 'Textarea', description: 'Textarea component that wraps Ionic textarea with validation, error handling, and auto-grow support' },
    { id: 'r-range', name: 'Range', description: 'Range slider component that wraps Ionic range with validation, error handling, dual knob support, and tick marks' },
    { id: 'r-file-upload', name: 'File Upload', description: 'File upload component with drag and drop support, file preview, validation, and error handling' },
    { id: 'r-currency-input', name: 'Currency Input', description: 'Currency input component with automatic formatting, locale support, and validation' },
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
    { id: 'r-radio-group', name: 'Radio Group', description: 'Radio group component for selecting a single option from a list, with form field styling, validation, and accessibility support' },
    { id: 'r-toggle', name: 'Toggle', description: 'Toggle switch component that wraps Ionic toggle with design system styling, supporting standalone and form field modes with comprehensive props' },
    { id: 'r-tabs', name: 'Tabs', description: 'Tabs navigation component family that wraps Ionic tabs, tab, tab-bar, and tab-button for complete tab-based navigation' },
    { id: 'r-tab', name: 'Tab', description: 'Individual tab component that wraps Ionic tab. Contains the content for a specific tab view. Used inside r-tabs container.' },
    { id: 'r-tab-bar', name: 'Tab Bar', description: 'Tab bar container component that wraps Ionic tab-bar. Contains r-tab-button components and positions them at the top or bottom of the tabs container.' },
    { id: 'r-tab-button', name: 'Tab Button', description: 'Tab button component that wraps Ionic tab-button. Used inside r-tab-bar to create clickable tab buttons with icons and labels.' },
    { id: 'r-heading', name: 'Heading', description: 'Heading component for displaying headings with different levels (1-6) and colors' },
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
                      {componentExamples[this.selectedComponent] && componentExamples[this.selectedComponent]({
                        alertStates: this.alertStates,
                        openAlert: this.openAlert,
                        closeAlert: this.closeAlert,
                      })}
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
