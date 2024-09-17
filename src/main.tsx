import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './components/app';
import './index.css';

// This enables Vite's error overlay for runtime errors as well as static ones
// credit: https://github.com/vitejs/vite/issues/2076#issuecomment-1500765186
if (import.meta.env.DEV) {
  window.onerror = (...args) => {
    const [, , , , err] = args;
    const ErrorOverlay = customElements.get('vite-error-overlay');
    if (ErrorOverlay) {
      document.body.appendChild(new ErrorOverlay(err));
    }
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
