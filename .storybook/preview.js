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
        }
      `;
      document.head.appendChild(style);
      
      // Load Ionic CSS
      const ionicCSS = document.createElement('link');
      ionicCSS.rel = 'stylesheet';
      ionicCSS.href = 'https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css';
      document.head.appendChild(ionicCSS);
      
      // Load the Stencil components
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/build/design-system.esm.js';
      document.head.appendChild(script);
      
      const scriptNoModule = document.createElement('script');
      scriptNoModule.setAttribute('nomodule', '');
      scriptNoModule.src = '/build/design-system.js';
      document.head.appendChild(scriptNoModule);
      
      // Load Ionic JS
      const ionicScript = document.createElement('script');
      ionicScript.type = 'module';
      ionicScript.src = 'https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.esm.js';
      document.head.appendChild(ionicScript);
      
      const ionicScriptNoModule = document.createElement('script');
      ionicScriptNoModule.setAttribute('nomodule', '');
      ionicScriptNoModule.src = 'https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.js';
      document.head.appendChild(ionicScriptNoModule);
      
      return story();
    },
  ],
};

export default preview;

