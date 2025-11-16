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
      source: {
        // Exclude decorators (like ion-app) from code examples
        excludeDecorators: true,
        // Transform the source to remove ion-app wrapper and unnecessary divs
        transform: (code, storyContext) => {
          if (!code) return code;
          
          let transformed = code;
          
          // Remove <ion-app> wrapper (with any attributes, including data-storybook-decorator)
          transformed = transformed.replace(/<ion-app[^>]*>/gi, '');
          transformed = transformed.replace(/<\/ion-app>/gi, '');
          
          // Remove wrapper divs that only contain a single component
          // Pattern: <div>...single component...</div>
          transformed = transformed.replace(/<div[^>]*>\s*(<r-[^>]+>[\s\S]*?<\/r-[^>]+>)\s*<\/div>/gi, '$1');
          
          // Remove empty divs
          transformed = transformed.replace(/<div[^>]*>\s*<\/div>/gi, '');
          
          // Clean up extra whitespace and newlines
          transformed = transformed.replace(/\n\s*\n\s*\n/g, '\n\n');
          transformed = transformed.trim();
          
          return transformed;
        },
      },
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
      // Mark it with data attribute so Storybook can exclude it from code examples
      const wrapper = document.createElement('ion-app');
      wrapper.setAttribute('data-storybook-decorator', 'true');
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

