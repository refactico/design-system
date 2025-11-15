import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-shell',
  styleUrl: 'app-shell.css',
  shadow: false,
})
export class AppShell {
  render() {
    return (
      <div class="app-shell-container">
        {/* Header */}
        <header class="app-shell-header">
          <div class="header-content">
            <h1 class="header-title">Refactico Design System</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main class="app-shell-main">
          <app-home></app-home>
          {/* Footer */}
          <footer class="app-shell-footer">
            <div class="footer-content">
              <p>&copy; 2024 Refactico. Built with Stencil & Ionic.</p>
            </div>
          </footer>
        </main>
      </div>
    );
  }
}

