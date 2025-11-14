import { defineCustomElements } from '@ionic/core/loader';

/**
 * Initialize Ionic components globally
 * Call this function to make all Ionic components available
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

