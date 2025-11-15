// Import theme CSS
import '../src/global/theme.css';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (story) => {
      // Add CSS overrides for scrolling
      const style = document.createElement('style');
      style.textContent = `
        html, body {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          height: auto !important;
        }
        ion-app {
          overflow-y: visible !important;
          height: auto !important;
        }
        #storybook-root {
          overflow-y: auto !important;
          height: auto !important;
        }
        .sb-story {
          overflow-y: visible !important;
          min-height: auto !important;
        }
        .docs-story {
          min-height: auto !important;
          overflow: visible !important;
        }
      `;
      document.head.appendChild(style);
      
      // Initialize theme (default to light)
      if (!document.documentElement.getAttribute('data-theme')) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      
      // Load Ionic CSS (theme CSS is already loaded via import above)
      const ionicCSS = document.createElement('link');
      ionicCSS.rel = 'stylesheet';
      ionicCSS.href = 'https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css';
      document.head.appendChild(ionicCSS);
      
      // Load Ionic JS first (required for components to work)
      const ionicScript = document.createElement('script');
      ionicScript.type = 'module';
      ionicScript.src = 'https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.esm.js';
      document.head.appendChild(ionicScript);
      
      const ionicScriptNoModule = document.createElement('script');
      ionicScriptNoModule.setAttribute('nomodule', '');
      ionicScriptNoModule.src = 'https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.js';
      document.head.appendChild(ionicScriptNoModule);
      
      // Load the Stencil components
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/build/refactico.esm.js';
      document.head.appendChild(script);
      
      const scriptNoModule = document.createElement('script');
      scriptNoModule.setAttribute('nomodule', '');
      scriptNoModule.src = '/build/refactico.js';
      document.head.appendChild(scriptNoModule);
      
      // Wrap story in ion-app for proper Ionic styling
      const wrapper = document.createElement('ion-app');
      const storyContent = story();
      if (storyContent) {
        wrapper.appendChild(storyContent);
        return wrapper;
      }
      return story();
    },
  ],
};

export default preview;

