import { defineCustomElements } from '@ionic/core/loader';

/**
 * Initialize Ionic components with lazy loading
 * Components are registered but only loaded when actually used in the DOM
 * This keeps bundle size small - only components you use are loaded
 */
export const initIonic = () => {
  if (typeof window !== 'undefined') {
    defineCustomElements(window);
  }
};

// Auto-initialize on import
if (typeof window !== 'undefined') {
  initIonic();
}

