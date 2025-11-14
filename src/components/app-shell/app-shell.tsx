import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-shell',
  styleUrl: 'app-shell.css',
  shadow: false,
})
export class AppShell {
  @State() currentRoute: string = 'home';

  private handleRouteChange = (route: string) => {
    this.currentRoute = route;
  };

  render() {
    return (
      <div class="app-shell-container">
        {/* Header */}
        <header class="app-shell-header">
          <div class="header-content">
            <h1 class="header-title">Design System</h1>
            <nav class="header-nav">
              <a 
                class={{ 'nav-link': true, 'nav-link--active': this.currentRoute === 'home' }}
                onClick={() => this.handleRouteChange('home')}
              >
                Home
              </a>
              <a 
                class={{ 'nav-link': true, 'nav-link--active': this.currentRoute === 'components' }}
                onClick={() => this.handleRouteChange('components')}
              >
                Components
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main class="app-shell-main">
          {this.currentRoute === 'home' && <app-home></app-home>}
          {this.currentRoute === 'components' && <app-home></app-home>}
        </main>

        {/* Footer */}
        <footer class="app-shell-footer">
          <div class="footer-content">
            <p>&copy; 2024 Design System. Built with Stencil & Ionic.</p>
          </div>
        </footer>
      </div>
    );
  }
}

