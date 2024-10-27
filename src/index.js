import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from './ThemeProvider'
import { LanguageProvider } from './LanguageContext';
import App from './App';
import './components/css/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
          <App />
        </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;