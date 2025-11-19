/**
 * Theme management utilities
 */

export type Theme = 'light' | 'dark';

export class ThemeManager {
  private currentTheme: Theme = 'light';
  
  /**
   * Initialize theme from localStorage or system preference
   */
  init(): void {
    const saved = localStorage.getItem('refactico-theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (saved) {
      this.switchTheme(saved);
    } else if (systemPrefersDark) {
      this.switchTheme('dark');
    } else {
      this.switchTheme('light');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('refactico-theme')) {
        this.switchTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  /**
   * Switch theme
   */
  switchTheme(theme: Theme): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('refactico-theme', theme);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('refactico-theme-change', { detail: { theme } }));
  }
  
  /**
   * Get current theme
   */
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }
  
  /**
   * Toggle between light and dark
   */
  toggleTheme(): void {
    this.switchTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }
}

// Singleton instance
export const themeManager = new ThemeManager();

// Auto-initialize on load
if (typeof window !== 'undefined') {
  themeManager.init();
}

