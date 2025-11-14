import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false,
})
export class AppHome {
  @State() selectedComponent: string | null = null;

  private menuItems = [
    { id: 'r-button', name: 'Button', description: 'Button component that wraps Ionic button' },
    // Add more components here as they are created
  ];

  private handleItemClick = (itemId: string) => {
    this.selectedComponent = itemId;
  };

  private handleHomeClick = () => {
    this.selectedComponent = 'home';
  };

  render() {
    return (
      <div class="app-home-container">
        {/* Left Sidebar - Menu List */}
        <div class="app-home-sidebar">
          <h2 
            class={{
              'sidebar-title': true,
              'sidebar-title--active': this.selectedComponent === 'home' || !this.selectedComponent,
            }}
            onClick={this.handleHomeClick}
          >
            HOME
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
        </div>

        {/* Right Content Area */}
        <div class="app-home-content">
          {this.selectedComponent === 'home' || !this.selectedComponent ? (
            <div class="welcome-message">
              <h1>Hi</h1>
              <p>Welcome to the Design System. Select a component from the left to view its details.</p>
            </div>
          ) : (
            <div class="component-details">
              {this.menuItems
                .filter(item => item.id === this.selectedComponent)
                .map(item => (
                  <div key={item.id}>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    {/* Component preview/explanation will go here */}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

