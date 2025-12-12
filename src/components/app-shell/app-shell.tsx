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

        {/* Alert Banner */}
        <div class="app-shell-alert">
          <ion-alert-controller></ion-alert-controller>
          <div class="alert-banner">
            <ion-icon name="information-circle-outline" class="alert-icon"></ion-icon>
            <div class="alert-content">
              <strong>Alignment Fix Required:</strong> Need to fix the alignment of datepicker and other components properly. Please check each component.
            </div>
          </div>
        </div>

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

