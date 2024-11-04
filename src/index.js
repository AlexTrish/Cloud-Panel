import React from 'react';
import { createRoot } from 'react-dom/client';
import ThemeProvider from './ThemeProvider'
import App from './App';
import './i18n';
import './components/css/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <ThemeProvider>
          <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;