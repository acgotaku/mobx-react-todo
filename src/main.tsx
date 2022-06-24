import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider, store } from './stores';
import App from './App';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
